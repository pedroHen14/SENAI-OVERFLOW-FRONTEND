import { Container } from "./styles";

import spinner from "../../assets/spin.png";

function Loading() {
  return (
    <Container>
      <img src={spinner}></img>
      Carregando...
    </Container>
  );
}

export default Loading;
