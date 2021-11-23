const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const connetDB = require("./config/db");

const auth = require("./routes/auth");
const course = require("./routes/course");

dotenv.config({ path: "./config/config.env" });

connetDB();

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};

const app = express();

app.use(cors(corsOption));
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/course", course);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`.green));
