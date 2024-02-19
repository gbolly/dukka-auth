import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Authentication from './pages/authentication';
import Dashboard from './pages/dashboard';
import CommandInstructions from './components/Command';

import "./App.css";

const App = () => {
  const [activeLink, setActiveLink] = useState("login");
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="App">
      <Container style={{ marginTop: "5rem" }}>
        <Row>
          {location.pathname === "/" && (
            <Col className="mx-auto p-5">
              <CommandInstructions activeLink={activeLink} />
            </Col>
          )}
          <Col>
            <Routes>
              <Route path="/" element={<Authentication setActiveLink={setActiveLink} />} />
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
