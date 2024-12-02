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

    const post = await Post.findById(newPost._id);

    const postDetails = {
      user: post.user,
      title: post.title,
      description: post.description,
      requiredResources: post.requiredResources,
      location: post.location,
      username: user.name,
    };

    // user.affectedPosts.push(postDetails);
    user.affectedPosts.splice(0, 0, postDetails);
    // user.affectedPosts.push(newPost._id);
    await user.save();

    // Recommendation System
    for (let i = 0; i < newPost.requiredResources.length; i++) {
      const resource = newPost.requiredResources[i].resource;
      const quantity = newPost.requiredResources[i].quantity;

      const donors = await User.find({
        inventory: { $elemMatch: { resource, quantity: { $gte: quantity } } },
      });
      for (let j = 0; j < donors.length; j++) {
        const donor = donors[j];
        // donor.recommendedPosts.push(postDetails);
        donor.recommendedPosts.splice(0, 0, postDetails);
        await donor.save();
      }
    }

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
    return res.status(200).json(user.affectedPosts);
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
