import styled from "styled-components";

const Wrapper = styled.main`
  background-color: #fff;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }

  .message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .return-link {
    font-size: 1.2rem;
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Wrapper;
