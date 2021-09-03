/* Description */

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../modules/Post");
const User = require("../../modules/User");
const Profile = require("../../modules/Profile");
const { findById } = require("../../modules/User");

// @route POST APIs/posts
// @desc post something!
// @access Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const createPost = {
        text: req.body.text,
        postedBy: req.user.id,
      };

      post = new Post(createPost);

      await post.save();
      // Call populate in order to fetch postedBy from user schema
      post = await Post.findById(post._id).populate("postedBy", [
        "name",
        "avatar",
      ]);

      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET APIs/posts
// @desc Get posts
// @access Private
router.get("/", auth, async (reg, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", ["name", "avatar"])
      .sort({ date: -1 })
      .populate("comments.user", ["name", "avatar"]);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route GET APIs/posts/:post_id
// @desc Get posts
// @access Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)
      .populate("postedBy", ["name", "avatar"])
      .populate("comments.user", ["name", "avatar"]);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route DELETE APIs/posts/:post_id
// @desc delete post by id
// @access Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (req.user.id != post.postedBy) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await post.remove();

    res.json({ msg: "Deletion Successful" });
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }

    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route PUT APIs/posts/like/:post_id
// @desc Like a post
// @access Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const isLiked = post.likes.filter((like) => {
      return like.user == req.user.id ? true : false;
    });

    // Post liked by user?
    if (isLiked.length > 0) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    // Populate the likes.user to get info about people who liked the post
    // post = await Post.findById(req.params.post_id)
    //   .populate("likes.user", "name, avatar")

    res.json(post.likes);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }

    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route PUT APIs/posts/unlike/:post_id
// @desc Unlike a post
// @access Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const isLiked = post.likes.filter((like) => {
      return like.user == req.user.id ? true : false;
    });

    // Post liked by user?
    if (isLiked.length > 0) {
      post.likes = post.likes.filter((obj) => {
        return obj.user != req.user.id && true;
      });

      await post.save();
      res.json(post.likes);
    } else {
      return res.status(400).json({ msg: "Post is not liked" });
    }
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }

    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route PUT APIs/posts/comment/:post_id
// @desc Comment on a post
// @access Private
router.post(
  "/comment/:post_id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.post_id);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      const createComment = {
        text: req.body.text,
        user: req.user.id,
      };

      post.comments.unshift(createComment);
      await post.save();
      post = await Post.findById(req.params.post_id).populate("comments.user", [
        "name",
        "avatar",
      ]);
      res.json(post.comments);
    } catch (err) {
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "Post not found" });
      }

      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELET APIs/posts/:post_id/comment/:comment_id
// @desc delete a comment
// @access Private
router.delete("/:post_id/comment/:comment_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const comment = post.comments.find((obj) => {
      return obj.id == req.params.comment_id ? true : false;
    });

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    const commentOwner = comment.user;

    if (req.user.id == post.postedBy || req.user.id == commentOwner) {
      post.comments = post.comments.filter((obj) => {
        return obj.id != req.params.comment_id && true;
      });

      await post.save();
      post = await Post.findById(req.params.post_id).populate("comments.user", [
        "name",
        "avatar",
      ]);
      res.json(post.comments);
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
