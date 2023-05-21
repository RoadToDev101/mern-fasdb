import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);

  h3 {
    margin-top: 0;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }

  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  .form-section {
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
  }

  .dropdown-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    width: 100%;
    cursor: pointer;
  }

  .dropdown.open .dropdown-toggle {
    background-color: var(--grey-200);
  }

  .dropdown-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border: 1px solid var(--grey-300);
    border-radius: var(--borderRadius);
    background-color: var(--white);
    transition: background-color 0.3s;
    cursor: pointer;
    width: 100%; /* Added width property */
  }

  .dropdown-menu {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid var(--grey-300);
    border-top: none;
    background-color: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    width: calc(100% - 2px); /* Added width property */
  }

  .checkbox-options {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    ); /* Adjust column width as needed */
    row-gap: 0.5rem;
    margin-top: 0.5rem;

    label {
      display: flex;
      align-items: center;
      cursor: pointer;

      input {
        margin-right: 0.5rem;
      }
    }
  }

  .arrow-icon {
    /* Add your arrow icon styles here */
  }

  .btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;

    button {
      height: 35px;
      width: 350px;
    }
  }

  .clear-btn {
    background: var(--grey-500);
  }

  .clear-btn:hover {
    background: var(--black);
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }

    .btn-container {
      margin-top: 0;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
