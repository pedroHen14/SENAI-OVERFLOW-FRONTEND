import { Container, FormLogin, Body, Header, Button } from "../Login/styles";
import Input from "../../components/Input";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";
import Login from "../Login";
import Loading from "../../components/Loading";
import { signIn } from "../../services/security";

function Register() {
  const history = useHistory();

  const [register, setRegister] = useState({
    ra: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const validPassword = () => register.password === register.confirmPassword;

  const buttonDisabled = () => {
    const { ra, name, email, password } = register;

    if (!ra || !name || !email || !password || !validPassword()) return true;

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { ra, name, email, password } = register;

      const response = await api.post("/students", {
        ra,
        name,
        email,
        password,
      });

      signIn(response.data);

      setLoading(false);

      history.push("/home");

      //Implementar a autorização
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setRegister({ ...register, [e.target.id]: e.target.value });
  };

  return (
    <>
      {loading && <Loading />}
      <Container>
        <FormLogin onSubmit={handleSubmit}>
          <Header>
            <h1>Bem vindo ao Senai Overflow</h1>
            <h2>Para sua pergunta nós temos a resposta</h2>
          </Header>
          <Body>
            <Input
              id="ra"
              label="RA"
              type="text"
              value={register.ra}
              handler={handleInput}
            />
            <Input
              id="name"
              label="Nome"
              type="text"
              value={register.name}
              handler={handleInput}
            />
            <Input
              id="email"
              label="E-mail"
              type="email"
              value={register.email}
              handler={handleInput}
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              value={register.password}
              handler={handleInput}
            />
            <Input
              id="confirmPassword"
              label="Confirmar Senha"
              type="password"
              onBlur={(e) => {
                if (!validPassword()) alert("As senhas não coincidem");
                e.target.focus();
              }}
              value={register.confirmPassword}
              handler={handleInput}
            />
            <Button disabled={buttonDisabled()}>Entrar</Button>
            <Link to="/">Ou se ja tem cadastro clique aqui para entrar</Link>
          </Body>
        </FormLogin>
      </Container>
    </>
  );
}

export default Register;
