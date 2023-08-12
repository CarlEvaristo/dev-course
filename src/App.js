import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Header from "./components/Header";

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/courses" element={ <Courses /> } />
          <Route path="/courses/:id" element={ <Course /> } />
        </Routes>
      </main>
    </>


  );
}

export default App;
