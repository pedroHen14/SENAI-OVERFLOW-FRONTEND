import { Container, FormLogin, Body, Header, Button } from "../Login/styles";
import Input from "../../components/Input";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";
import Login from "../Login";

function Register() {
  const history = useHistory();

  const [register, setRegister] = useState({
    ra: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/students", register);

      console.log(response.data);

      //Implementar a autorização

      history.push("/");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const handleInput = (e) => {
    setRegister({ ...register, [e.target.id]: e.target.value });
  };

  return (
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
            id="valid-password"
            label="Confirmar Senha"
            type="password"
            value={register.confirmPassword}
            handler={handleInput}
          />
          <Button>Entrar</Button>
          <Link to="/">Ou se ja tem cadastro clique aqui para entrar</Link>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Register;
