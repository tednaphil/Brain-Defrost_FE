import React from "react";
import {Routes, Route} from "react-router-dom"
import "./App.css";
import Home from "../Home/Home";

function App() {
  return (
    <>
      <header>
        <h1 className="header-text">Brain Defrost</h1>
      </header>
      <Routes>
        <Route path = "/Brain-Defrost_FE" element = {<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
