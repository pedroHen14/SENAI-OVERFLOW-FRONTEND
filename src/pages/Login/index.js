import { Container, FormLogin } from "./styles";

function Login() {
  return (
    <Container>
      <FormLogin>
        <h1>Bem vindo ao Senai Overflow</h1>
        <label>Email</label>
        <input type="email" />
        <label>Senha</label>
        <input type="password" />
        <button>Penetrar</button>
      </FormLogin>
    </Container>
  );
}

export default Login;
