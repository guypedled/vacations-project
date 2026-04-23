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
import { useNavigate } from "react-router-dom";
import { addVacation } from "../Services/vacationService";

/*
  Decode JWT token safely
*/
function getTokenPayload() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function AddVacationPage() {
  const navigate = useNavigate();
  const payload = getTokenPayload();
  const isAdmin = payload?.role === "admin";

  const [form, setForm] = useState<any>({
    destination: "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    imageFile: null,
  });

  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  /*
    Cleanup preview URL (IMPORTANT FIX)
  */
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  if (!isAdmin) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error">
          Access denied. Only admin users can add vacations.
        </Alert>
      </Container>
    );
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0] || null;

    setForm({ ...form, imageFile: file });

    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
    } else {
      setPreviewUrl("");
    }
  };

  const validateForm = () => {
    if (
      !form.destination.trim() ||
      !form.description.trim() ||
      !form.startDate ||
      !form.endDate ||
      !form.price ||
      !form.imageFile
    ) {
      return "All fields are required, including the image.";
    }

    const priceNumber = Number(form.price.trim());

    if (Number.isNaN(priceNumber) || priceNumber < 0 || priceNumber > 10000) {
      return "Price must be between 0 and 10,000.";
    }

    if (form.startDate < today) {
      return "Start date cannot be in the past.";
    }

    if (form.endDate < today) {
      return "End date cannot be in the past.";
    }

    if (form.endDate < form.startDate) {
      return "End date cannot be earlier than start date.";
    }

    return "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("destination", form.destination.trim());
      formData.append("description", form.description.trim());
      formData.append("startDate", form.startDate);
      formData.append("endDate", form.endDate);
      formData.append("price", form.price.trim());

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }

      await addVacation(formData);

      navigate("/vacations");
    } catch {
      setError("Failed to add vacation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fbff 0%, #eef6fb 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            Add Vacation
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField name="destination" label="Destination" fullWidth required margin="normal" onChange={handleChange}/>
            <TextField name="description" label="Description" fullWidth required multiline minRows={3} margin="normal" onChange={handleChange}/>
            <TextField type="date" name="startDate" fullWidth required margin="normal" onChange={handleChange} inputProps={{ min: today }}/>
            <TextField type="date" name="endDate" fullWidth required margin="normal" onChange={handleChange} inputProps={{ min: form.startDate || today }}/>
            <TextField name="price" label="Price" type="number" fullWidth required margin="normal" onChange={handleChange} inputProps={{ min: 0, max: 10000 }}/>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            {previewUrl && (
              <img src={previewUrl} style={{ width: "100%", marginTop: 10 }} />
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              {isSubmitting ? "Adding..." : "Add Vacation"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddVacationPage;