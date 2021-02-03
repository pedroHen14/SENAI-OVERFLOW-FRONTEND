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
} from "./styles";

import imgProfile from "../../assets/foto_perfil.png";
import imgLogo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { signOut, getUser } from "../../services/security";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { render } from "react-dom";

function Profile() {
  return (
    <>
      <section>
        <img src={imgProfile} alt="Imagem de perfil" />
        <a href="#">Editar Foto</a>
      </section>
      <section>
        <strong>NOME:</strong>
        <p>Fulano de tal</p>
      </section>
      <section>
        <strong>RA:</strong>
        <p>1234567</p>
      </section>
      <section>
        <strong>E-MAIL:</strong>
        <p>fulanodetal@gmail.com</p>
      </section>
    </>
  );
}

function Answers({ answers }) {
  return (
    <section>
      <header>
        <img src={imgProfile} alt="imagem de perfil" />
        <strong>por {answers.Student.name}</strong>
        <p> {answers.created_at}</p>
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
          id: aluno.id,
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

  return (
    <QuestionCard>
      <header>
        <img src={imgProfile} alt="imagem de perfil" />
        <strong>por {question.Student.name}</strong>
        <p>em {question.created_at}</p>
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
          />
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await api.get("/feed");

      setQuestions(response.data);
    };

    loadQuestions();
  }, []);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  return (
    <Container>
      <Header>
        <Logo src={imgLogo} />
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
  );
}

export default Home;
