const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");

const Vacation = require("../models/Vacation");

/*
  GET USER ID FROM TOKEN
*/
function getUserIdFromRequest(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.id;
  } catch {
    return null;
  }
}

/*
  IMAGE UPLOAD
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/*
  GET ALL VACATIONS
*/
router.get("/", async (req, res) => {
  const userId = getUserIdFromRequest(req);
  const vacations = await Vacation.find();

  const result = vacations.map((v) => ({
    ...v._doc,
    id: v._id,
    isLiked: userId
      ? v.likedUsers.some((u) => String(u) === String(userId))
      : false,
  }));

  res.json(result);
});

/*
  GET BY ID
*/
router.get("/:id", async (req, res) => {
  const userId = getUserIdFromRequest(req);
  const vacation = await Vacation.findById(req.params.id);

  if (!vacation) return res.status(404).send("Not found");

  res.json({
    ...vacation._doc,
    id: vacation._id,
    isLiked: userId
      ? vacation.likedUsers.some((u) => String(u) === String(userId))
      : false,
  });
});

/*
  ADD
*/
router.post("/", upload.single("image"), async (req, res) => {
  const { destination, description, startDate, endDate, price } = req.body;

  const newVacation = new Vacation({
    destination,
    description,
    startDate,
    endDate,
    price: Number(price),
    image: req.file ? req.file.filename : "paris.jpg",
  });

  await newVacation.save();
  res.json(newVacation);
});

/*
  UPDATE
*/
router.put("/:id", upload.single("image"), async (req, res) => {
  const vacation = await Vacation.findById(req.params.id);
  if (!vacation) return res.status(404).send("Not found");

  const { destination, description, startDate, endDate, price } = req.body;

  vacation.destination = destination;
  vacation.description = description;
  vacation.startDate = startDate;
  vacation.endDate = endDate;
  vacation.price = Number(price);

  if (req.file) {
    vacation.image = req.file.filename;
  }

  await vacation.save();
  res.json(vacation);
});

/*
  DELETE
*/
router.delete("/:id", async (req, res) => {
  await Vacation.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

/*
  LIKE
*/
router.post("/:id/like", async (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).send("Unauthorized");

  const vacation = await Vacation.findById(req.params.id);
  if (!vacation) return res.status(404).send("Not found");

  const alreadyLiked = vacation.likedUsers.some(
    (u) => String(u) === String(userId)
  );

  if (alreadyLiked) {
    return res.status(400).send("Already liked");
  }

  vacation.likedUsers.push(userId);
  vacation.likes++;

  await vacation.save();
  res.send("Liked");
});

/*
  UNLIKE
*/
router.delete("/:id/like", async (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).send("Unauthorized");

  const vacation = await Vacation.findById(req.params.id);
  if (!vacation) return res.status(404).send("Not found");

  const hadLike = vacation.likedUsers.some(
    (u) => String(u) === String(userId)
  );

  vacation.likedUsers = vacation.likedUsers.filter(
    (u) => String(u) !== String(userId)
  );

  if (hadLike && vacation.likes > 0) {
    vacation.likes--;
  }

  await vacation.save();
  res.send("Unliked");
});

/*
  CSV
*/
router.get("/export/csv", async (req, res) => {
  const vacations = await Vacation.find();

  let csv = "Destination,Likes\n";
  vacations.forEach((v) => {
    csv += `${v.destination},${v.likes}\n`;
  });

  res.header("Content-Type", "text/csv");
  res.attachment("vacations.csv");
  res.send(csv);
});

module.exports = router;