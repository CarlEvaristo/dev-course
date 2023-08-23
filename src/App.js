import React, { useRef } from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Login from "./pages/Login";
import Header from "./components/Header/Header"

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route path="/courses" element={ <Courses /> } />
            <Route path="/courses/:id" element={ <Course /> } />
            <Route path="/login" element={ <Login /> } />
          </Routes>
        </div>
      </main>
    </>


  );
}

export default App;
