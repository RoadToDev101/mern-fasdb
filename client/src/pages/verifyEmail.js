import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Logo } from "@components/index";
import Wrapper from "@wrappers/verifyEmailPage";
import axios from "axios";

const VerifyEmail = () => {
  const emailToken = useParams().emailToken;
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `/api/auth/verify-email?emailToken=${emailToken}`
        );
        setMessage(res.data.msg);
      } catch (err) {
        err.response.data.msg && setMessage(err.response.data.msg);
      }
    };
    verify();
  }, [emailToken]);

  return (
    <Wrapper className="full-page">
      <div>
        <Logo />
        <h1>{message}</h1>
        <Link to="/">Return to Home</Link>
      </div>
    </Wrapper>
  );
};

export default VerifyEmail;
