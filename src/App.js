import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProjectEdit from "./components/ProjectEdit";
import ProjectList from "./components/ProjectList";
import Sidebar from "./components/Sidebar";
import { SidebarRefreshProvider } from "./contexts/SidebarRefreshContext";

const App = () => {
  return (
    <SidebarRefreshProvider>
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
    </SidebarRefreshProvider>
  );
};

export default App;
