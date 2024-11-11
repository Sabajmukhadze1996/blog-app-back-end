const Blog = require("../models/Blog");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const createBlog = async (req, res) => {
  const { title, description } = req.body;
  try {
    const blog = await Blog.create({
      title,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      author: req.user._id,
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createBlog };
