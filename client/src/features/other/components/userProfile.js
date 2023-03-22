import { useState } from "react";
import { FormRow, Alert } from "../../../components/index";
import { useAppContext } from "../../../context/appContext";
import Wrapper from "../../../assets/wrappers/dashboardFormPage";

const UserProfile = () => {
  const { user, updateUser, displayAlert, showAlert, isLoading } =
    useAppContext();

  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email) {
      displayAlert();
      return;
    }
    updateUser({
      username,
      email,
    });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            id="username"
            name="username"
            labelText="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormRow
            type="email"
            id="email"
            name="email"
            labelText="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UserProfile;
