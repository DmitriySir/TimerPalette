import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Timer from "./components/Timer/Timer";
import Palette from "./components/Pelette/Palette";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="link__container">
        <Link className="link" to="/palette">
          К палитре
        </Link>
        <Link className="link" to="/">
          К таймеру
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/palette" element={<Palette />} />
      </Routes>
    </Router>
  );
}

export default App;
