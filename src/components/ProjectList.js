import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mockProjects from "../data/mockProjects";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate a network request with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const storedProjects = localStorage.getItem("projects");

      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        localStorage.setItem("projects", JSON.stringify(mockProjects));
        setProjects(mockProjects);
      }
    } catch (err) {
      setError("Failed to fetch projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      {isMobile ? (
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} key={project.id}>
              <Paper style={{ padding: "16px" }}>
                <Typography variant="h6">{project.name}</Typography>
                <Typography>
                  <strong>Project ID:</strong> {project.id}
                </Typography>
                <Typography>
                  <strong>Start Date:</strong>{" "}
                  {new Date(project.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </Typography>
                <Typography>
                  <strong>End Date:</strong>{" "}
                  {new Date(project.endDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </Typography>
                <Typography>
                  <strong>Project Manager:</strong> {project.manager}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleEdit(project.id)}
                  style={{ marginTop: "8px" }}
                >
                  Edit
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Project ID</StyledTableCell>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Project Manager</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>
                  {new Date(project.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(project.endDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell>{project.manager}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(project.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ProjectList;
