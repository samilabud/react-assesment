import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 10px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h3>Favorite Projects</h3>
      <ul>
        <li>Project A</li>
        <li>Project B</li>
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;
