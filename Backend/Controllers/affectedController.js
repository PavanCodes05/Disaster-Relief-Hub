import Post from "../Models/postModel.js";
import User from "../Models/userModel.js";

const createPost = async (req, res) => {
  try {
    const { title, description, requiredResources, location } = req.body;
    if (!title || !requiredResources || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (requiredResources.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one resource is required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const newPost = new Post({
      title,
      description,
      requiredResources,
      user: req.user._id,
      location,
    });
    await newPost.save();

    user.affectedPosts.unshift(newPost._id);
    await user.save();

    return res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const posts = user.affectedPosts.map((postId) => postId);
    // console.log(posts);

    const postDetails = [];

    for (const id of posts) {
      const post = await Post.findById(id).populate("user");

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      postDetails.push({
        _id: post._id,
        title: post.title,
        description: post.description,
        requiredResources: post.requiredResources,
        location: post.location,
        username: post.user.name,
      });
    }

    console.log(postDetails);

    return res.status(200).json(postDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const populatePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createPost, getMyPosts, populatePosts };
