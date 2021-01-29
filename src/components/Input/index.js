import { Container } from "./styles";

function Input({ id, label, value, handler, ...rest }) {
  return (
    <Container>
      <input id={id} {...rest} placeholder=" "></input>
      <label htmlFor={id}>{label}</label>
    </Container>
  );
}

export default Input;
