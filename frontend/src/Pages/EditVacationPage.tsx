import { useEffect, useMemo, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  getVacationById,
  updateVacation,
} from "../Services/vacationService";

/*
  Decode token
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

function EditVacationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUserData();

  const isAdmin = user?.role === "admin";

  const [form, setForm] = useState<any>({
    destination: "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    imageFile: null,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const today = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  /*
    BLOCK non-admin
  */
  if (!isAdmin) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error">
          Access denied. Only admin users can edit vacations.
        </Alert>
      </Container>
    );
  }

  /*
    Load vacation
  */
  useEffect(() => {
    loadVacation();
  }, []);

  const loadVacation = async () => {
    try {
      const data = await getVacationById(id);
      setForm({
        ...data,
        imageFile: null,
      });
    } catch {
      setError("Failed to load vacation");
    } finally {
      setIsLoading(false);
    }
  };

  /*
    Handle input
  */
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*
    Handle image
  */
  const handleFileChange = (e: any) => {
    setForm({ ...form, imageFile: e.target.files[0] });
  };

  /*
    VALIDATION (FULL REQUIREMENTS)
  */
  const validateForm = () => {
    if (
      !form.destination.trim() ||
      !form.description.trim() ||
      !form.startDate ||
      !form.endDate ||
      !form.price
    ) {
      return "All fields are required.";
    }

    const price = Number(form.price);

    if (price < 0 || price > 10000) {
      return "Price must be between 0 and 10,000.";
    }

    if (form.startDate < today) {
      return "Start date cannot be in the past.";
    }

    if (form.endDate < today) {
      return "End date cannot be in the past.";
    }

    if (form.endDate < form.startDate) {
      return "End date must be after start date.";
    }

    return "";
  };

  /*
    Submit
  */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");

      const formData = new FormData();

      formData.append("destination", form.destination.trim());
      formData.append("description", form.description.trim());
      formData.append("startDate", form.startDate);
      formData.append("endDate", form.endDate);
      formData.append("price", form.price);

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }

      await updateVacation(id, formData);

      navigate("/vacations");
    } catch {
      setError("Failed to update vacation");
    }
  };

  if (isLoading) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" align="center">
          Edit Vacation
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Destination"
            name="destination"
            fullWidth
            required
            margin="normal"
            value={form.destination}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            required
            margin="normal"
            value={form.description}
            onChange={handleChange}
          />

          <TextField
            type="date"
            name="startDate"
            fullWidth
            required
            margin="normal"
            value={form.startDate}
            onChange={handleChange}
            inputProps={{ min: today }}
          />

          <TextField
            type="date"
            name="endDate"
            fullWidth
            required
            margin="normal"
            value={form.endDate}
            onChange={handleChange}
            inputProps={{ min: form.startDate || today }}
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            required
            margin="normal"
            value={form.price}
            onChange={handleChange}
          />

          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: "16px" }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Vacation
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditVacationPage;