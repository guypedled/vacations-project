import { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VacationCard from "../Components/VacationCard";
import {
  getVacations,
  likeVacation,
  unlikeVacation,
  deleteVacation,
  downloadCSV,
} from "../Services/vacationService";

/*
  Get user role from token
*/
function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.role;
}

function VacationsPage() {
  const [vacations, setVacations] = useState<any[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const vacationsPerPage = 9;

  const isAdmin = getUserRole() === "admin";
  const navigate = useNavigate();

  /*
    Load vacations ONLY if user is logged in
  */
  const loadVacations = async () => {
    const data = await getVacations();
    setVacations(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ❗ PROTECTION (REQUIREMENT)
    if (!token) {
      navigate("/login");
      return;
    }

    loadVacations();
  }, []);

  /*
    LIKE / UNLIKE
  */
  const handleLikeToggle = async (id: number, isLiked: boolean) => {
    if (isLiked) {
      await unlikeVacation(id);
    } else {
      await likeVacation(id);
    }
    loadVacations();
  };

  /*
    DELETE
  */
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vacation?"
    );

    if (!confirmDelete) return;

    await deleteVacation(id);
    loadVacations();
  };

  /*
    FILTER LOGIC
  */
  const filteredVacations = vacations.filter((v) => {
    const today = new Date();

    if (filter === "LIKED") return v.isLiked;

    if (filter === "ACTIVE") {
      return (
        new Date(v.startDate) <= today &&
        new Date(v.endDate) >= today
      );
    }

    if (filter === "UPCOMING") {
      return new Date(v.startDate) > today;
    }

    return true;
  });

  /*
    PAGINATION
  */
  const indexOfLast = currentPage * vacationsPerPage;
  const indexOfFirst = indexOfLast - vacationsPerPage;
  const currentVacations = filteredVacations.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredVacations.length / vacationsPerPage
  );

  return (
    <Container>
      <Typography variant="h3" align="center" sx={{ mt: 3 }}>
        Vacations
      </Typography>

      {/* FILTER BUTTONS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 3,
        }}
      >
        <Button
          variant={filter === "ALL" ? "contained" : "outlined"}
          onClick={() => {
            setFilter("ALL");
            setCurrentPage(1);
          }}
        >
          All
        </Button>

        <Button
          variant={filter === "LIKED" ? "contained" : "outlined"}
          onClick={() => {
            setFilter("LIKED");
            setCurrentPage(1);
          }}
        >
          My Likes
        </Button>

        <Button
          variant={filter === "ACTIVE" ? "contained" : "outlined"}
          onClick={() => {
            setFilter("ACTIVE");
            setCurrentPage(1);
          }}
        >
          Active
        </Button>

        <Button
          variant={filter === "UPCOMING" ? "contained" : "outlined"}
          onClick={() => {
            setFilter("UPCOMING");
            setCurrentPage(1);
          }}
        >
          Upcoming
        </Button>
      </Box>

      {/* ADMIN ACTIONS */}
      {isAdmin && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate("/add-vacation")}
          >
            Add Vacation
          </Button>

          <Button variant="outlined" onClick={downloadCSV}>
            Export CSV
          </Button>
        </Box>
      )}

      {/* VACATIONS GRID */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          mt: 4,
        }}
      >
        {currentVacations.map((vacation) => (
          <VacationCard
            key={vacation.id}
            vacation={vacation}
            isAdmin={isAdmin}
            onLikeToggle={handleLikeToggle}
            onDelete={handleDelete}
          />
        ))}
      </Box>

      {/* PAGINATION */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1 }}>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
    </Container>
  );
}

export default VacationsPage;