import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import mockProjects from "../data/mockProjects";
import { SidebarRefreshContext } from "../contexts/SidebarRefreshContext";

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Sidebar = () => {
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const { refreshKey } = useContext(SidebarRefreshContext);

  useEffect(() => {
    const fetchFavoriteProjects = () => {
      // Fetch projects from localStorage
      const storedProjects = localStorage.getItem("projects");
      let projects;

      if (storedProjects) {
        // Use projects from localStorage if available
        projects = JSON.parse(storedProjects);
      } else {
        // If no projects in localStorage, fall back to mockProjects
        projects = mockProjects;
        localStorage.setItem("projects", JSON.stringify(mockProjects)); // Save mockProjects to localStorage
      }

      // Filter projects marked as favorites
      const favorites = projects.filter((project) => project.isFavorite);
      setFavoriteProjects(favorites);
    };

    fetchFavoriteProjects();
  }, [refreshKey]);

  return (
    <SidebarContainer>
      <h3>Favorite Projects</h3>
      {favoriteProjects.length > 0 ? (
        <ul>
          {favoriteProjects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      ) : (
        <p>No favorite projects.</p>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
