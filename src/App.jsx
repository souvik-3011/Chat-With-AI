import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Container, Box, TextField, Button } from "@mui/material";
import Dither from "./Dither";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("Loading...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCKjmBorXcKTEy0jbr2D4WmTnW1j29Z0DQ",
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });

      setAnswer(
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer found."
      );
    } catch (err) {
      setAnswer("Something went wrong!");
      console.error(err);
    }
  }

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden",position: "relative" }}>
      <Dither />
      <Container
        maxWidth="sm"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "16px",
          padding: "32px",
          zIndex: 1,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "16px" }}>Chat with AI</h1>

        <Box sx={{ marginBottom: "16px" }}>
          <TextField
            label="Ask a question"
            variant="outlined"
            color="success"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={generateAnswer}
          fullWidth
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          Generate Answer
        </Button>
          <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "16px",
            borderRadius: "8px",
            minHeight: "60px",
            maxHeight: "300px", // limit height so it scrolls if answer is too long
            overflowY: "auto",
            whiteSpace: "break-spaces",
          }}
        >
          <p style={{ margin: 0 }}>{answer}</p>
        </div>
      </Container>
    </div>
  );
}

export default App;
