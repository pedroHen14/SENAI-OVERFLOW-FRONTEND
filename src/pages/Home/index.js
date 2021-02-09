import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCard,
  Logo,
  IconSignOut,
  FormNewQuestion,
} from "./styles";

import Input from "../../components/Input";
import { format } from "date-fns";
import imgProfile from "../../assets/foto_perfil.png";
import imgLogo from "../../assets/logo.png";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import { signOut, getUser } from "../../services/security";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Tag from "../../components/Tag";
import Loading from "../../components/Loading";

function Profile() {
  const student = getUser();

  return (
    <>
      <section>
        <img src={imgProfile} alt="Imagem de perfil" />
        <a href="#">Editar Foto</a>
      </section>
      <section>
        <strong>NOME:</strong>
        <p>{student.name}</p>
      </section>
      <section>
        <strong>RA:</strong>
        <p>{student.ra}</p>
      </section>
      <section>
        <strong>E-MAIL:</strong>
        <p>{student.email}</p>
      </section>
    </>
  );
}

function Answers({ answers }) {
  const student = getUser();

  return (
    <section>
      <header>
        <img src={imgProfile} alt="imagem de perfil" />
        <strong>
          por{" "}
          {student.studentId === answers.Student.id
            ? "Você"
            : answers.Student.name}
        </strong>
        <p> {format(new Date(answers.created_at), "dd/MM/yyyy 'às' HH:mm")}</p>
      </header>
      <p>{answers.description}</p>
    </section>
  );
}

function Question({ question, setLoading }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const [newAnswers, setNewAnswers] = useState("");

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(question.Answers);
  }, [question.Answers]);

  const qtdeAnswers = answers.length;

  const handleAddAnswer = async (e) => {
    e.preventDefault();

    const questionId = question.id;

    setLoading(true);

    try {
      const response = await api.post(`/questions/${questionId}/answers`, {
        description: newAnswers,
      });

      console.log(response.data);

      const aluno = getUser();

      const answerAdded = {
        id: response.data.id,
        description: newAnswers,
        created_at: response.data.createdAt,
        Student: {
          id: aluno.studentId,
          name: aluno.name,
        },
      };

      setAnswers([...answers, answerAdded]);

      setNewAnswers("");

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);

      setLoading(false);
    }
  };

  const student = getUser();

  return (
    <QuestionCard>
      <header>
        <img src={imgProfile} alt="imagem de perfil" />
        <strong>
          por{" "}
          {student.studentId === question.Student.id
            ? "Você"
            : question.Student.name}
        </strong>
        <p> {format(new Date(question.created_at), "dd/MM/yyyy 'às' HH:mm")}</p>
      </header>
      <section>
        <strong>{question.title}</strong>
        <p>{question.description}</p>
        <img src={question.image}></img>
      </section>
      <footer>
        <h1 onClick={() => setShowAnswers(!showAnswers)}>
          {qtdeAnswers === 0 ? (
            "Seja o primeiro a responder"
          ) : (
            <>
              {qtdeAnswers}
              {qtdeAnswers > 1 ? " Respostas" : " Resposta"}
            </>
          )}
        </h1>
        {showAnswers && (
          <>
            {answers.map((a) => (
              <Answers answers={a} />
            ))}
          </>
        )}
        <form onSubmit={handleAddAnswer}>
          <textarea
            minLength={2}
            onChange={(e) => setNewAnswers(e.target.value)}
            placeholder="Responda essa dúvida!"
            required
            value={newAnswers}
          ></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function NewQuestion({ handleReload, setLoading }) {
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    gist: "",
  });

  const [categories, setCategories] = useState([]);

  const [categoriesSel, setCategoriesSel] = useState([]);

  const [image, setImage] = useState(null);

  const imageRef = useRef();
  const categoriesRef = useRef();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data);
      } catch (error) {
        alert(error);
      }
    };

    loadCategories();
  }, []);

  const handleCategories = (e) => {
    const idSel = e.target.value;

    const categorySel = categories.find((c) => c.id == idSel);

    if (categorySel && !categoriesSel.includes(categorySel))
      setCategoriesSel([...categoriesSel, categorySel]);

    e.target[e.target.selectedIndex].disabled = true;
    e.target.value = "";
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0]);
      imageRef.current.style.display = "flex";
    } else {
      imageRef.current.src = "";
      imageRef.current.style.display = "none";
    }
    setImage(e.target.files[0]);
  };

  const handleUnselCategory = (idUnsel) => {
    setCategoriesSel(categoriesSel.filter((c) => c.id !== idUnsel));

    const { options } = categoriesRef.current;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === idUnsel.toString()) options[i].disabled = false;
    }
  };

  const handleInput = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.id]: e.target.value });
  };

  const handleAddNewQuestion = async (e) => {
    e.preventDefault();

    const data = new FormData();
    const categories = categoriesSel.reduce((s, c) => (s += c.id + ","), "");

    data.append("title", newQuestion.title);
    data.append("description", newQuestion.description);
    data.append("categories", categories.substr(0, categories.length - 1));

    if (image) data.append("image", image);
    if (newQuestion.gist) data.append("gist", newQuestion.gist);

    setLoading(true);

    try {
      await api.post("/questions", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      handleReload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <FormNewQuestion onSubmit={handleAddNewQuestion}>
      <Input
        id="title"
        label="Título"
        value={newQuestion.title}
        handler={handleInput}
        required
        minLength="3"
      />
      <Input
        id="description"
        label="Descrição"
        value={newQuestion.description}
        handler={handleInput}
        required
        minLength="10"
      />
      <Input
        id="gist"
        label="Gist"
        value={newQuestion.gist}
        handler={handleInput}
      />
      <Select
        id="categories"
        label="Categorias"
        handler={handleCategories}
        ref={categoriesRef}
      >
        <option value="">Selecione</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.description}
          </option>
        ))}
      </Select>
      <div>
        {categoriesSel.map((c) => (
          <Tag
            key={c.id}
            info={c.description}
            handleClose={() => handleUnselCategory(c.id)}
          />
        ))}
      </div>
      <input type="file" onChange={handleImage} />
      <img alt="Pré-visualização" ref={imageRef} />
      <button>Enviar</button>
    </FormNewQuestion>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(0);

  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);

      const response = await api.get("/feed");

      setQuestions(response.data);

      setLoading(false);
    };

    loadQuestions();
  }, [reload]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setShowNewQuestion(false);
    setReload(Math.random());
  };

  return (
    <>
      {loading && <Loading />}
      {showNewQuestion && (
        <Modal
          title="Faça uma pergunta"
          handleClose={() => setShowNewQuestion(false)}
        >
          <NewQuestion handleReload={handleReload} setLoading={setLoading} />
        </Modal>
      )}
      <Container>
        <Header>
          <Logo src={imgLogo} onClick={handleReload} />
          <IconSignOut onClick={handleSignOut} />
        </Header>
        <Content>
          <ProfileContainer>
            <Profile></Profile>
          </ProfileContainer>
          <FeedContainer>
            {questions.map((q) => (
              <Question question={q} setLoading={setLoading} />
            ))}
          </FeedContainer>
          <ActionsContainer>
            <button onClick={() => setShowNewQuestion(true)}>
              Fazer uma pergunta
            </button>
          </ActionsContainer>
        </Content>
      </Container>
    </>
  );
}

export default Home;
