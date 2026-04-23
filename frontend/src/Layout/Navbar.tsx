import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

/*
  Decode token to get role
*/
function getUserData() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

/*
  Navigation Bar

  ✔ Shows different buttons for admin / user
  ✔ Clean UX
*/
function Navbar() {
  const navigate = useNavigate();
  const user = getUserData();

  const isAdmin = user?.role === "admin";
  const isLoggedIn = !!user;

  /*
    Logout handler
  */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 800 }}
        >
          VacationHub
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {!isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>

              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/vacations">
                Vacations
              </Button>

              <Button color="inherit" component={Link} to="/ai">
                AI Recommendation
              </Button>

              <Button color="inherit" component={Link} to="/mcp">
                Smart Questions
              </Button>

              {/* Admin only */}
              {isAdmin && (
                <Button color="inherit" component={Link} to="/report">
                  Reports
                </Button>
              )}

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;