const express = require("express");
const router = express.Router();

const {
  createCourse,
  addNotes,
  uploadReadingMaterial,
} = require("../controllers/course");

const upload = require("../middleware/upload");
const verifyToken = require("../middleware/verify-token");

router
  .route("/create")
  .post(verifyToken, upload.single("image_url"), createCourse);

router.route("/add-notes").put(verifyToken, addNotes);

router
  .route("/upload-material")
  .put(verifyToken, upload.array("reading_materials"), uploadReadingMaterial);

module.exports = router;
