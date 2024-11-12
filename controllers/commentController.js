const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;

    const newComment = new Comment({
      content,
      author: req.user._id,
      blog: blogId,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create comment", error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId }).populate(
      "author",
      "username"
    );
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    comment.content = req.body.content || comment.content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update comment", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await comment.remove();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
