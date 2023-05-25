import React, { useState } from "react";

const UploadDrawing = () => {
  const [drawingName, setDrawingName] = useState("");
  const [version, setVersion] = useState("");
  const [revisedDate, setRevisedDate] = useState("");
  const [modelName, setModelName] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation on the input fields
    if (!drawingName || !version || !revisedDate || !modelName || !file) {
      setErrorMessage("Please fill in all the fields");
      return;
    }

    // Create a FormData object and append the input values
    const formData = new FormData();
    formData.append("drawingName", drawingName);
    formData.append("version", version);
    formData.append("revisedDate", revisedDate);
    formData.append("modelName", modelName);
    formData.append("file", file);

    // Send the form data to the server using an API request
    // Replace 'uploadDrawingURL' with the actual URL to the server endpoint
    fetch("/api/file/upload-drawing", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Drawing uploaded successfully, perform any necessary actions
          console.log("Drawing uploaded successfully");
        } else {
          // Handle error responses from the server
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <h1>Upload Drawing Page</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Drawing Name:
          <input
            type="text"
            value={drawingName}
            onChange={(event) => setDrawingName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Version:
          <input
            type="text"
            value={version}
            onChange={(event) => setVersion(event.target.value)}
          />
        </label>
        <br />
        <label>
          Revised Date:
          <input
            type="date"
            value={revisedDate}
            onChange={(event) => setRevisedDate(event.target.value)}
          />
        </label>
        <br />
        <label>
          Model Name:
          <input
            type="text"
            value={modelName}
            onChange={(event) => setModelName(event.target.value)}
          />
        </label>
        <br />
        <label>
          File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadDrawing;
