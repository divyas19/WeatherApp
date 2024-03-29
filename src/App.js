import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlaceBox from "../src/Components/WeatherContainer";
import Navbar from "../src/Components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <PlaceBox />

        <Routes>
          <Route path="/navbar" element={<Navbar />} />

          <Route path="/placebox" element={<PlaceBox />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
