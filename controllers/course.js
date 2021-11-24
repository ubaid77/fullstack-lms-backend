const Course = require("../models/Course");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, category_id, instructor_id, tags } =
      req.body;

    const instructor = await User.findOne({ _id: instructor_id });

    try {
      let image_url = "";

      if (req.file) {
        image_url = req.file.location;
      }

      const course = await Course.create({
        title,
        description,
        price,
        image_url,
        category_id,
        instructor_id,
        tags,
      });

      instructor.courses_created.push(course._id);

      instructor.save();
      course.save();

      return res.status(201).json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);

        return res.status(400).json({
          success: false,
          error: messages,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "Something went wrong!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }
};

exports.addNotes = async (req, res) => {
  try {
    const { course_id, notes } = req.body;

    const course = await Course.findOneAndUpdate(
      { _id: course_id },
      { $set: { notes } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      success: false,
      error: "Course not found",
    });
  }
};

exports.uploadReadingMaterial = async (req, res) => {
  try {
    const { course_id } = req.body;

    const course = await Course.findById(course_id);

    try {
      let reading_materials = course.reading_materials;

      if (req.files.length > 0) {
        req.files.map((file) => {
          reading_materials.push(file.location);
        });
      }

      course.save();

      return res.status(201).json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        error: "Something went wrong!",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      success: false,
      error: "Course not found",
    });
  }
};
