const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image_url: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category_id: {
    type: Number,
    required: true,
  },
  instructor_id: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  reading_materials: {
    type: Array,
    default: [],
  },
  notes: {
    type: String,
  },
  students_enrolled: {
    type: Number,
    default: 0,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
