import { NavLink } from "react-router-dom";

const UploadFile = () => {
  return (
    <div>
      <h1>Upload File Page</h1>
      <p>This page will allow the user to upload a file</p>
      <NavLink to="/upload-drawing">Upload Drawing</NavLink>
      <br />
      <NavLink to="/upload-pss">Upload PSS</NavLink>
    </div>
  );
};

export default UploadFile;
