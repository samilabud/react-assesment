import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

const mockProject = {
  id: "project_a",
  name: "Project A",
  description: "This is a sample project.",
  startDate: "2025-01-01",
  endDate: "2025-12-31",
  manager: "John Doe",
};

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(mockProject);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Project:", project);
    navigate("/");
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        label="Project ID"
        value={project.id}
        name="id"
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Project Name"
        value={project.name}
        name="name"
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Project Description"
        value={project.description}
        name="description"
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Start Date"
        value={project.startDate}
        name="startDate"
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="End Date"
        value={project.endDate}
        name="endDate"
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Project Manager"
        value={project.manager}
        name="manager"
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Update
      </Button>
    </Box>
  );
};

export default ProjectEdit;
