import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  width: fit-content;
  padding: 2px 10px;
  border-radius: 4px;
  align-items: center;
  background-color: var(--darkGray);
  margin: 0px 10px 10px 0px;
  gap: 10px;

  > span {
    cursor: pointer;
    font-size: 20px;
    transition: 0.2s;

    :hover {
      color: var(--primary);
    }
  }
`;
