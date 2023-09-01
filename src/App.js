import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Login from "./pages/Login";
import Header from "./components/Header/Header"

import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <div className="container">
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route path="/courses" element={ <Courses /> } />
            <Route path="/courses/:courseid/:challengeid" element={ <Course /> } />
            <Route path="/login" element={ <Login /> } />
          </Routes>
        </div>
      </main>
    </>


  );
}

export default App;
