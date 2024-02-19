import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Authentication from './pages/authentication';
import Dashboard from './pages/dashboard';

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
