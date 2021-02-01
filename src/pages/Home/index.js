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

function Profile(params) {
  return (
    <>
      <section>
        <img src={imgProfile} />
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

function Home() {
  return (
    <Container>
      <Header>
        <Logo src={imgLogo} />
        <IconSignOut />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile></Profile>
        </ProfileContainer>
        <FeedContainer>
          <QuestionCard>
            <header>
              <img src={imgProfile} />
              <strong>por Cliclano da Silva</strong>
              <p>em 12/12/2012 as 12:12</p>
            </header>
            <section>
              <strong>Titulo</strong>
              <p>Descrição</p>
              <img src="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"></img>
            </section>
            <footer>
              <h1>11 Respostas</h1>
              <section>
                <header>
                  <img src={imgProfile} />
                  <strong>por Fulano</strong>
                  <p> 12/12/2012 as 12:12</p>
                </header>
                <p>Reposta para a pergunta.</p>
              </section>
              <form>
                <textarea placeholder="Responda essa dúvida!" required />
                <button>Enviar</button>
              </form>
            </footer>
          </QuestionCard>
          <QuestionCard>
            <header>
              <img src={imgProfile} />
              <strong>por Cliclano da Silva</strong>
              <p>em 12/12/2012 as 12:12</p>
            </header>
            <section>
              <strong>Titulo</strong>
              <p>Descrição</p>
              <img src="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"></img>
            </section>
            <footer>
              <h1>11 Respostas</h1>
              <section>
                <header>
                  <img src={imgProfile} />
                  <strong>por Fulano</strong>
                  <p> 12/12/2012 as 12:12</p>
                </header>
                <p>Reposta para a pergunta.</p>
              </section>
              <form>
                <textarea placeholder="Responda essa dúvida!" required />
                <button>Enviar</button>
              </form>
            </footer>
          </QuestionCard>
        </FeedContainer>
        <ActionsContainer>
          <button>Fazer uma pergunta</button>
        </ActionsContainer>
      </Content>
    </Container>
  );
}

export default Home;
