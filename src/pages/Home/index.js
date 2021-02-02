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
import { signOut } from "../../services/security";
import { Redirect, useHistory } from "react-router-dom";

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

function Question({ question }) {
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
        <h1>11 Respostas</h1>
        <section>
          <header>
            <img src={imgProfile} alt="imagem de perfil" />
            <strong>por Fulano</strong>
            <p> 12/12/2012 as 12:12</p>
          </header>
          <p>{question.Answers.description}</p>
        </section>
        <form>
          <textarea placeholder="Responda essa dúvida!" required />
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
