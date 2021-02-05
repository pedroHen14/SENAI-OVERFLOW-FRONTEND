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
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { signOut, getUser } from "../../services/security";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Tag from "../../components/Tag";

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

function Question({ question }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const [newAnswers, setNewAnswers] = useState("");

  const [answers, setAnswers] = useState(question.Answers);

  const qtdeAnswers = answers.length;

  const handleAddAnswer = async (e) => {
    e.preventDefault();

    const questionId = question.id;

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
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
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
            minLength="10"
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

function NewQuestion() {
  const [categories, setCategories] = useState([]);

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

  return (
    <FormNewQuestion>
      <Input id="title" label="Título" />
      <Input id="description" label="Descrição" />
      <Input id="gist" label="Gist" />
      <Select id="categories" label="Categorias">
        <option value="">Selecione</option>
        {categories.map((c) => (
          <option value={c.id}>{c.description}</option>
        ))}
      </Select>
      <div>
        <Tag info="Nada" />
        <Tag info="Batatinha" />
      </div>
      <input type="file" />
      <button>Enviar</button>
    </FormNewQuestion>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await api.get("/feed");

      setQuestions(response.data);
    };

    loadQuestions();
  }, [reload]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setReload(Math.random());
  };

  return (
    <>
      <Modal title="Faça uma pergunta">
        <NewQuestion />
      </Modal>
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
              <Question question={q} />
            ))}
          </FeedContainer>
          <ActionsContainer>
            <button>Fazer uma pergunta</button>
          </ActionsContainer>
        </Content>
      </Container>
    </>
  );
}

export default Home;
