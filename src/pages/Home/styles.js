import styled from "styled-components";
import { FaSignOutAlt, FaGithub, FaSearch } from "react-icons/fa";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--dark);
  display: flex;
  justify-content: center;
`;

export const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary);
  border-bottom: 1px solid var(--darkGray);
  box-shadow: 0px 1px 5px var(--darkGray);
`;

export const Content = styled.div`
  width: 1280px;
  padding-top: 60px;
  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  margin-top: 10px;

  section {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
  }

  label {
    cursor: pointer;
    text-decoration: underline;
    transition: 0.2s;

    :hover {
      color: var(--primary);
    }
  }

  input[type="file"] {
    display: none;
  }

  img {
    width: 35%;
    align-self: center;
    border-radius: 50%;
  }
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  gap: 10px;
  overflow-y: auto;
`;

export const ActionsContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export const QuestionCard = styled.article`
  width: 80%;
  padding: 10px;
  background-color: var(--darkGray);
  border-radius: 4px;

  > header {
    display: flex;
    align-items: center;
    gap: 10px;

    > img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
    }
  }

  > section {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    flex-direction: column;

    > strong {
      font-size: 18px;
    }

    > p {
      font-size: 15px;
      padding: 10px 5px;
      border-left: 2px solid var(--primary);
    }

    > img {
      max-width: 100%;
      align-self: center;
    }
  }

  > footer {
    margin-top: 10px;

    > h1 {
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
      font-size: 18px;

      :hover {
        color: var(--primary);
      }
    }

    > section {
      margin-top: 10px;
      border-radius: 4px;
      padding: 5px;
      background-color: var(--dark);

      > header {
        display: flex;
        align-items: center;
        gap: 10px;

        > img {
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }
      }

      > p {
        margin-top: 5px;
        width: 100%;
        padding: 10px 5px;
        border-left: 2px solid var(--primary);
      }
    }

    > form {
      width: 100%;
      margin-top: 5px;
      display: flex;
      gap: 5px;
      margin-top: 20px;
      > textarea {
        flex: 1;
        border-radius: 3px;
      }
    }
  }
`;

export const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin: 20px;
  margin-top: 40px;
  border-radius: 50%;
  border: 2px solid var(--dark);
  box-shadow: 0px 0px 5px var(--dark);
  cursor: pointer;
  transition: 0.2s;

  :hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 15px var(--dark);
  }
`;

export const IconSignOut = styled(FaSignOutAlt)`
  font-size: 30px;
  cursor: pointer;
  transition: 0.2s;
  margin-right: 10px;

  :hover {
    color: var(--dark);
  }
`;

export const FormNewQuestion = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 300px;
  width: 450px;

  > div {
    display: flex;
    flex-wrap: wrap;
  }

  > img {
    align-self: center;
    max-width: 40%;
    display: none;
  }
`;

export const GistIcon = styled(FaGithub)`
  font-size: 30px;
  margin-right: 10px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    color: var(--primary);
  }

  :active {
    transform: scale(0.9);
  }
`;

export const ContainerGist = styled.section`
  margin-top: 10px;

  h2 {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: bold;
  }
`;
