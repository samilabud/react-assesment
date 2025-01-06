import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProjectList from "./components/ProjectList";
import ProjectEdit from "./components/ProjectEdit";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/edit/:id" element={<ProjectEdit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
