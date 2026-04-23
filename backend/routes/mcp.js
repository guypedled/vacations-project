const express = require("express");
const router = express.Router();
const Vacation = require("../models/Vacation");

/*
  MCP QUESTION ENDPOINT

  This route receives a natural-language question
  and returns an answer based on vacations data from MongoDB.
*/
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    /*
      Validate input
    */
    if (!question || !question.trim()) {
      return res.status(400).send("Question is required");
    }

    const vacations = await Vacation.find();
    const lowerQuestion = question.toLowerCase();

    /*
      Question: How many active vacations are there?
    */
    if (
      lowerQuestion.includes("how many active") ||
      lowerQuestion.includes("active vacations") ||
      lowerQuestion.includes("כמה חופשות פעילות")
    ) {
      const today = new Date();

      const activeVacations = vacations.filter((vacation) => {
        const start = new Date(vacation.startDate);
        const end = new Date(vacation.endDate);

        return today >= start && today <= end;
      });

      return res.json({
        answer: `There are currently ${activeVacations.length} active vacations.`,
      });
    }

    /*
      Question: What is the average vacation price?
    */
    if (
      lowerQuestion.includes("average price") ||
      lowerQuestion.includes("average vacation price") ||
      lowerQuestion.includes("ממוצע מחירי")
    ) {
      if (vacations.length === 0) {
        return res.json({
          answer: "There are no vacations in the system.",
        });
      }

      const total = vacations.reduce(
        (sum, vacation) => sum + Number(vacation.price),
        0
      );

      const average = (total / vacations.length).toFixed(2);

      return res.json({
        answer: `The average vacation price is $${average}.`,
      });
    }

    /*
      Question: Which vacations are in Europe?
    */
    if (
      lowerQuestion.includes("europe") ||
      lowerQuestion.includes("european") ||
      lowerQuestion.includes("אירופה")
    ) {
      const europeanDestinations = [
        "paris",
        "london",
        "rome",
        "barcelona",
        "greece",
        "iceland",
      ];

      const europeanVacations = vacations.filter((vacation) =>
        europeanDestinations.includes(vacation.destination.toLowerCase())
      );

      if (europeanVacations.length === 0) {
        return res.json({
          answer: "No European vacations were found.",
        });
      }

      const names = europeanVacations.map((v) => v.destination).join(", ");

      return res.json({
        answer: `European vacations in the system: ${names}.`,
      });
    }

    /*
      Question: Which vacation has the most likes?
    */
    if (
      lowerQuestion.includes("most likes") ||
      lowerQuestion.includes("highest likes") ||
      lowerQuestion.includes("most popular") ||
      lowerQuestion.includes("הכי הרבה לייקים")
    ) {
      if (vacations.length === 0) {
        return res.json({
          answer: "There are no vacations in the system.",
        });
      }

      const topVacation = vacations.reduce((max, current) =>
        current.likes > max.likes ? current : max
      );

      return res.json({
        answer: `${topVacation.destination} has the highest number of likes with ${topVacation.likes} likes.`,
      });
    }

    /*
      Default fallback response
    */
    return res.json({
      answer:
        "I could not understand the question. Try asking about active vacations, average price, Europe vacations, or most liked vacation.",
    });
  } catch (error) {
    console.error("MCP error:", error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;