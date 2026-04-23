import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { getRecommendation } from "../Services/aiService";

/*
  AI Page
  Allows user to enter a destination and receive AI recommendation
*/
function AiPage() {
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const data = await getRecommendation(destination);
      setResult(data.recommendation);
    } catch {
      alert("Failed to get recommendation");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" align="center">
          AI Recommendation
        </Typography>

        <Box sx={{ mt: 2 }}>
          <TextField
            label="Destination"
            fullWidth
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Get Recommendation
          </Button>

          {result && (
            <Typography sx={{ mt: 3 }}>
              {result}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default AiPage;