require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Vacation = require("./models/Vacation");
const User = require("./models/User");

/*
  Connect to MongoDB
*/
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Mongo connected");

    /*
      Clear vacations only
    */
    await Vacation.deleteMany();

    /*
      CREATE ADMIN (if not exists)
    */
    const existingAdmin = await User.findOne({
      email: "admin@test.com",
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("1234", 10);

      await User.create({
        firstName: "Admin",
        lastName: "User",
        email: "admin@test.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log("✔ Admin created");
    }

    /*
      Insert vacations with FUTURE dates + LIKES
    */
    await Vacation.insertMany([
      {
        destination: "Dubai",
        description: "Luxury and desert adventure",
        startDate: new Date("2026-08-01"),
        endDate: new Date("2026-08-05"),
        price: 1800,
        image: "dubai.jpg",
        likes: 2,
      },
      {
        destination: "Barcelona",
        description: "Sunny beaches and nightlife",
        startDate: new Date("2026-09-10"),
        endDate: new Date("2026-09-18"),
        price: 1300,
        image: "barcelona.jpg",
        likes: 4,
      },
      {
        destination: "London",
        description: "Amazing trip to London",
        startDate: new Date("2026-10-01"),
        endDate: new Date("2026-10-10"),
        price: 1500,
        image: "london.jpg",
        likes: 3,
      },
      {
        destination: "Iceland",
        description: "Nature and northern lights",
        startDate: new Date("2026-11-01"),
        endDate: new Date("2026-11-07"),
        price: 2200,
        image: "iceland.jpg",
        likes: 5,
      },
      {
        destination: "Hawaii",
        description: "Tropical paradise with beaches",
        startDate: new Date("2026-07-15"),
        endDate: new Date("2026-07-25"),
        price: 2100,
        image: "hawaii.jpg",
        likes: 6,
      },
      {
        destination: "Greece",
        description: "Beautiful islands and sea",
        startDate: new Date("2026-08-15"),
        endDate: new Date("2026-08-25"),
        price: 1600,
        image: "greece.jpg",
        likes: 2,
      },
      {
        destination: "Rome",
        description: "Historic city with amazing food",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2026-06-07"),
        price: 1100,
        image: "rome.jpg",
        likes: 1,
      },
      {
        destination: "Paris",
        description: "Beautiful city in France",
        startDate: new Date("2026-06-10"),
        endDate: new Date("2026-06-18"),
        price: 1200,
        image: "paris.jpg",
        likes: 3,
      },
      {
        destination: "New York",
        description: "The city that never sleeps",
        startDate: new Date("2026-09-01"),
        endDate: new Date("2026-09-08"),
        price: 2000,
        image: "newyork.jpg",
        likes: 7,
      },
      {
        destination: "Maldives",
        description: "Luxury islands and crystal clear water",
        startDate: new Date("2026-12-01"),
        endDate: new Date("2026-12-12"),
        price: 3000,
        image: "maldives.jpg",
        likes: 8,
      },
      {
        destination: "Tokyo",
        description: "Modern meets tradition",
        startDate: new Date("2026-10-15"),
        endDate: new Date("2026-10-25"),
        price: 2500,
        image: "tokyo.jpg",
        likes: 4,
      },
      {
        destination: "Thailand",
        description: "Tropical paradise",
        startDate: new Date("2026-11-15"),
        endDate: new Date("2026-11-25"),
        price: 1400,
        image: "thailand.jpg",
        likes: 5,
      },
    ]);

    console.log("✔ 12 vacations inserted (with likes)");

    process.exit();
  })
  .catch((err) => console.error(err));