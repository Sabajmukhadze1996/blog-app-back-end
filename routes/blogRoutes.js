const express = require("express");
const { createBlog } = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", protect, upload.single("image"), createBlog);

module.exports = router;
