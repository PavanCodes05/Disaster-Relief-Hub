import Post from "../Models/postModel.js";
import User from "../Models/userModel.js";

const createPost = async (req, res) => {
  try {
    const { title, description, requiredResources, location } = req.body;
    if (!title || !description || !requiredResources || !location) {
      return res.status(400).json({ message: "All fields are required" });
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

    user.affectedPosts.push(newPost._id);
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
        donor.recommenededPosts.push(newPost._id);
        await donor.save();
      }
    }

    return res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPost };
