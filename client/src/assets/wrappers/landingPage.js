import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: var(--max-width);
    width: var(--fluid-width);
  }
  .page {
    display: grid;
    align-items: center;
  }
  .h1 {
    margin: 0;
    padding: 0;
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: var(--max-width);
    width: var(--fluid-width);
  }
  .info p {
    font-size: 1.2rem;
    font-weight: 400;
    margin: 1rem 0;
    padding: 0;
  }
  .btn-hero {
    margin-top: 1rem;
    margin: 1 auto;
    padding: 0.5rem 1rem;
    background-color: #ff5308;
    color: #ffffff;

    &:hover {
      background-color: #000000;
      color: #ffffff;
      cursor: pointer;
    }
  }
`;

export default Wrapper;
