import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { emailToken } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post("/api/auth/verify-email", { emailToken });
        setMessage(res.data.message);
      } catch (err) {
        err.response.data.message && setMessage(err.response.data.message);
      }
    };
    verify();
  }, [emailToken]);

  return (
    <div className="verify-email">
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;
