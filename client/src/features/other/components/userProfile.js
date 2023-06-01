import { useState } from "react";
import { FormTextField, FormSelect, Alert } from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";

const UserProfile = () => {
  const { user, updateUser, displayAlert, showAlert, isLoading } =
    useAppContext();

  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [role, setRole] = useState(user?.role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !role) {
      displayAlert();
      return;
    }
    updateUser({
      username,
      email,
      role,
    });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormTextField
            type="text"
            id="username"
            name="username"
            labelText="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormTextField
            type="email"
            id="email"
            name="email"
            labelText="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormSelect
            labelText="Role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { _id: 1, value: "Admin" },
              { _id: 2, value: "User" },
              { _id: 3, value: "Editor" },
            ]}
            //If user role is not admin, disable the select
            disabled={user?.role !== "Admin"}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update User"}
          </button>
          {/* TODO: Change password */}
        </div>
      </form>
    </Wrapper>
  );
};

export default UserProfile;
