import { Container, FormLogin, Body, Header, Button } from "../Login/styles";
import Input from "../../components/Input";

function Register() {
  return (
    <Container>
      <FormLogin>
        <Header>
          <h1>Bem vindo ao Senai Overflow</h1>
          <h2>Para sua pergunta nós temos a resposta</h2>
        </Header>
        <Body>
          <Input id="ra" label="RA" type="text" />
          <Input id="name" label="Nome" type="text" />
          <Input id="email" label="E-mail" type="email" />
          <Input id="password" label="Senha" type="password" />
          <Input id="valid-password" label="Confirmar Senha" type="password" />
          <Button>Entrar</Button>
          <a href="#">Ou se ja tem cadastro clique aqui para entrar</a>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Register;
