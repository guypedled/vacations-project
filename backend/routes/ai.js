const express = require("express");
const router = express.Router();
const axios = require("axios");

/*
  AI recommendation route
  This endpoint sends a prompt to OpenAI and returns a vacation recommendation
*/
router.post("/recommend", async (req, res) => {
  try {
    const { destination } = req.body;

    /*
      Send request to OpenAI API
      The API key is stored securely in .env
    */
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful travel assistant.",
          },
          {
            role: "user",
            content: `Give me a short travel recommendation for ${destination}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    /*
      Extract AI response text
    */
    const recommendation =
      response.data.choices[0].message.content;

    res.json({ recommendation });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("AI request failed");
  }
});

module.exports = router;