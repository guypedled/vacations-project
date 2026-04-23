import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { askMcpQuestion } from "../Services/mcpService";

/*
  MCP Page

  Allows the user to ask questions about vacations data
  and receive an answer from the backend.
*/
function McpPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    try {
      const data = await askMcpQuestion(question);
      setAnswer(data.answer);
    } catch {
      alert("Failed to get MCP answer");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" align="center">
          MCP Questions
        </Typography>

        <Box sx={{ mt: 2 }}>
          <TextField
            label="Ask a question about vacations"
            fullWidth
            multiline
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Ask
          </Button>

          {answer && (
            <Typography sx={{ mt: 3 }}>
              {answer}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default McpPage;