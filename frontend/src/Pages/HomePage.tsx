import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  /*
    Check if user is logged in
  */
  const handleViewVacations = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate("/vacations");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fbff 0%, #eef6fb 100%)",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 5,
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(25,118,210,0.08), rgba(38,198,218,0.12))",
            border: "1px solid rgba(25,118,210,0.10)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: "#17324d",
              mb: 2,
              fontSize: { xs: "2.3rem", md: "3.4rem" },
            }}
          >
            VacationHub
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#1976d2",
              fontWeight: 800,
              mb: 2,
            }}
          >
            Explore real vacations, manage trips, and discover travel insights.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            This platform allows registered users to browse vacation cards,
            like vacations, get AI travel recommendations, and ask smart
            questions about vacation data. Admin users can add, manage, and
            analyze vacation content through reports and CSV export.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleViewVacations}
              sx={{
                px: 4,
                py: 1.4,
                borderRadius: 3,
                fontWeight: 800,
                background: "linear-gradient(90deg, #29b6f6 0%, #80deea 100%)",
                color: "#fff",
              }}
            >
              View Vacations
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                px: 4,
                py: 1.4,
                borderRadius: 3,
                fontWeight: 800,
              }}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                px: 4,
                py: 1.4,
                borderRadius: 3,
                fontWeight: 800,
              }}
            >
              Register
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default HomePage;