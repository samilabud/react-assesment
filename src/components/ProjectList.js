import {
  Alert,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate a network request with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if projects are already in local storage
      const storedProjects = localStorage.getItem("projects");

      if (storedProjects) {
        // If found in local storage, parse and use them
        setProjects(JSON.parse(storedProjects));
      } else {
        // Otherwise, save mockProjects to local storage and use them
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
    <TableContainer>
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
    </TableContainer>
  );
};

export default ProjectList;
