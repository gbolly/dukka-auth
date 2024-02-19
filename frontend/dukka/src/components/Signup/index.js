import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { userSignUp } from "../../services/api";
import { cleanEmail } from "../../utils/util";
import SpeechMic from "../SpeechMic";
import PasswordToggle from "../PasswordToggle";

const SignUp = ({setActiveKey, setMsg}) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const commands = [
    {
      command: "my full name is *",
      callback: (name) => setFullname(name)
    },
    {
      command: "my email is *",
      callback: (email) => cleanEmail(email, setEmail)
    },
    {
      command: "my gender is *",
      callback: (sex) => setSex(sex.toLowerCase())
    },
    {
      command: "my phone number is *",
      callback: (num) => setPhone(num)
    },
    {
      command: "my country is *",
      callback: (country) => setCountry(country)
    },
    {
      command: "my password is *",
      callback: (password) => setPassword(password)
    },
    {
      command: "my password confirmation is *",
      callback: (password) => setPassword2(password)
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

  const validatePassword = (text) => {
    setPassword2(text);
    if (password === text) {
      setHasPasswordError(false);
    } else {
      setHasPasswordError(true);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
      sex,
      country,
      phone_number: phone,
      full_name: fullname
    };
    const res = await userSignUp(data);

    if (res.status !== 201) {
      console.log(res.data)
      setError(res.data[0])
    } else {
      setActiveKey("login");
      setMsg("Account created successfully, please login.")
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter full name"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
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

        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            value={password2}
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            onChange={(e) => validatePassword(e.target.value)}
          />
          {hasPasswordError && (
            <span style={{ color: "red", fontSize: 12 }}>
              Passwords does not match
            </span>
          )}
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Select value={sex} size="lg" onChange={(e) => setSex(e.target.value)}>
                <option>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Select value={country} size="lg" onChange={(e) => setCountry(e.target.value)}>
                <option>Select country</option>
                <option value="Algeria">Algeria</option>
                <option value="Canada">Canada</option>
                <option value="Ghana">Ghana</option>
                <option value="Nigeria">Nigeria</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button
          style={{ backgroundColor: "#E97D80" }}
          type="submit"
          className="w-75 mt-3 p-3 border-0"
          disabled={!email || !password || !phone || hasPasswordError} 
        >
          {isLoading ? <Spinner animation="border" role="status" /> : "Create Account"}
        </Button>
      </Form>
      <SpeechMic listening={listening}/>
      {error && (
        <Alert className="mt-5" variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>
      )}
    </div>
  )
};

export default SignUp;