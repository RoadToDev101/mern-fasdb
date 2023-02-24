import styled from "styled-components";

const Wrapper = styled.main`
  background-color: #fff;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .full-page {
    text-align: center;
  }
  h1 {
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 1.2rem;
    font-weight: 400;
    margin: 1rem 0;
    padding: 0;
  }
  span {
    color: #fff;
    text-decoration: underline;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Wrapper;
