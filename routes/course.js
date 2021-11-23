const express = require("express");
const router = express.Router();

const { createCourse } = require("../controllers/course");

const upload = require("../middleware/upload");
const verifyToken = require("../middleware/verify-token");

router
  .route("/create")
  .post(verifyToken, upload.single("image_url"), createCourse);

module.exports = router;
