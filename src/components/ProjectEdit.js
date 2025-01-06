import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SidebarRefreshContext } from "../contexts/SidebarRefreshContext";

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { triggerRefresh } = useContext(SidebarRefreshContext);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate a network request delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 1. Check for the array of projects in localStorage
        const storedProjects = localStorage.getItem("projects");
        if (!storedProjects) {
          // If no projects in localStorage, redirect to home
          navigate("/");
          return;
        }

        // 2. Parse and find the specific project by ID
        const parsedProjects = JSON.parse(storedProjects);
        const foundProject = parsedProjects.find((proj) => proj.id === id);

        if (!foundProject) {
          // If the project doesn’t exist, redirect to home
          navigate("/");
          return;
        }

        // Convert date fields to Date objects
        const fixedProject = {
          ...foundProject,
          startDate: foundProject.startDate
            ? new Date(foundProject.startDate)
            : null,
          endDate: foundProject.endDate ? new Date(foundProject.endDate) : null,
          // In case isFavorite does not exist on older entries, default to false
          isFavorite: foundProject.isFavorite ?? false,
        };

        // 3. If everything is good, set the project to state
        setProject(fixedProject);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, dateValue) => {
    setProject({ ...project, [name]: dateValue });
  };

  const handleCheckChange = (e) => {
    // Toggle the isFavorite flag in state
    setProject({ ...project, isFavorite: e.target.checked });
  };

  const handleSave = () => {
    try {
      const storedProjects = localStorage.getItem("projects");
      if (!storedProjects) {
        // If not found, redirect to home
        navigate("/");
        return;
      }

      const parsedProjects = JSON.parse(storedProjects);
      const updatedProjects = parsedProjects.map((p) =>
        p.id === project.id ? project : p
      );

      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      // Refresh the sidebar
      triggerRefresh();

      // Navigate to project list
      navigate("/");
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  // Handle loading and error states
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!project) {
    // If for some reason project is still null, we can redirect or show an error
    return <Alert severity="error">Project not found</Alert>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Project ID"
          value={project.id}
          name="id"
          fullWidth
          margin="normal"
          inputProps={{ readOnly: true }}
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
        <DatePicker
          label="Start Date"
          value={project.startDate}
          onChange={(newDate) => handleDateChange("startDate", newDate)}
          renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" />
          )}
          sx={{ mt: 1 }}
        />
        <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
        <DatePicker
          label="End Date"
          value={project.endDate}
          onChange={(newDate) => handleDateChange("endDate", newDate)}
          renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" />
          )}
        />
        <TextField
          label="Project Manager"
          value={project.manager}
          name="manager"
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={project.isFavorite ?? false}
              onChange={handleCheckChange}
              name="isFavorite"
              color="primary"
            />
          }
          label="Favorite?"
        />

        <Divider variant="fullWidth" style={{ margin: "20px 0" }} />

        <Button variant="contained" color="primary" onClick={handleSave}>
          Update
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/")}
          style={{ marginLeft: "1em" }}
        >
          Cancel
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default ProjectEdit;
