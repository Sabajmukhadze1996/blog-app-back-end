const express = require("express");
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:blogId", getComments);

router.post("/:blogId", protect, createComment);

router.put("/:commentId", protect, updateComment);

router.delete("/:commentId", protect, deleteComment);

module.exports = router;
