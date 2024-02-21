import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup"

import { userLogin } from "../../services/api";
import { cleanEmail } from "../../utils/util";
import { saveToStore } from "../../utils/storage-helpers";
import SpeechMic from '../SpeechMic';
import PasswordToggle from "../PasswordToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const commands = [
    {
      command: "my email is *",
      callback: (email) => cleanEmail(email, setEmail)
    },
    {
      command: "my password is *",
      callback: (password) => setPassword(password)
    },
  ];

  const {
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (finalTranscript !== "") {
      resetTranscript()
    }
  }, [finalTranscript, resetTranscript]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await userLogin({ email, password });
    if (res && res.status !== 200) {
      setError(res.data)
    } else {
      await saveToStore('accessToken', res.data.access_token);
      await saveToStore('user', res.data.user);
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <InputGroup className="mb-3">
          <Form.Control
            size="lg"
            value={password}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} />
        </InputGroup>

        <Button
          style={{ backgroundColor: "#E97D80" }}
          type="submit"
          className="w-75 mt-3 p-3 border-0"
          disabled={!email || !password}
        >
          {isLoading ? <Spinner animation="border" role="status" /> : "LOGIN"}
        </Button>
      </Form>
      <SpeechMic listening={listening}/>
      {error && (
        <Alert className="mt-5" variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>
      )}
    </div>
  )
};

export default Login;
