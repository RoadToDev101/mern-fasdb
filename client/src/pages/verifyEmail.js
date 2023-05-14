import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const emailToken = useParams().emailToken;
  // console.log(emailToken);
  const [message, setMessage] = useState("");
  // console.log(message);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `/api/auth/verify-email?emailToken=${emailToken}`
        );
        // console.log(res);
        setMessage(res.data.msg);
      } catch (err) {
        // console.log("Verify email error: ", err);
        err.response.data.msg && setMessage(err.response.data.msg);
      }
    };
    verify();
  }, [emailToken]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;
