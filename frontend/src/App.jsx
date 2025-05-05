import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout children={<></>} />} />
        <Route path="/activity" element={<Layout children={<Home />} />} />
        <Route
          path="/education"
          element={<Layout children={<Education />} />}
        />
        <Route path="/projects" element={<Layout children={<Projects />} />} />
        <Route
          path="/experience"
          element={<Layout children={<Experience />} />}
        />
        <Route path="*" element={<Layout children={<NotFound />} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
