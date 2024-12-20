import Post from "../Models/postModel.js";
import User from "../Models/userModel.js";
import Notification from "../Models/notificationModel.js";

const getInventory = async (req, res) => {
  try {
    const donor = req.user;
    const inventory = donor.inventory;
    res.status(200).json({ resources: inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addInventory = async (req, res) => {
  try {
    const { resource, quantity } = req.body;
    const donor = req.user;

    for (let i = 0; i < donor.inventory.length; i++) {
      if (donor.inventory[i].resource === resource) {
        donor.inventory[i].quantity += Number(quantity);
        await donor.save();
        return res.status(200).json({ resources: donor.inventory });
      }
    }

    donor.inventory.push({ resource, quantity });

    await donor.save();

    return res.status(200).json({ resources: donor.inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const { resource } = req.body;
    const donor = req.user;
    const index = donor.inventory.findIndex(
      (item) => item.resource === resource
    );
    if (index === -1) {
      return res.status(404).json({ resources: donor.inventory });
      // return res.status(404).json({ message: "Resource not found" });
    }
    donor.inventory.splice(index, 1);
    await donor.save();

    res.status(200).json({ resources: donor.inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecommendedPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      requiredResources: {
        $elemMatch: {
          resource: { $in: req.user.inventory.map((item) => item.resource) },
        },
      },
    }).populate("user");

    const postDetails = [];

    for (const post of posts) {
      postDetails.push({
        _id: post._id,
        title: post.title,
        description: post.description,
        requiredResources: post.requiredResources,
        location: post.location,
        username: post.user.name,
      });
    }

    res.status(200).json({ posts: postDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const makeDonation = async (req, res) => {
  try {
    const { donations } = req.body;
    const { postId } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const donor = req.user;

    for (let i = 0; i < donations.length; i++) {
      for (let j = 0; j < donor.inventory.length; j++) {
        if (donor.inventory[j].resource === donations[i].resource) {
          if (donor.inventory[j].quantity < donations[i].quantity) {
            return res.status(400).json({ message: "Not enough resources" });
          }
        }
      }
    }
    for (let i = 0; i < donations.length; i++) {
      for (let j = 0; j < post.requiredResources.length; j++) {
        if (post.requiredResources[j].resource === donations[i].resource) {
          post.requiredResources[j].quantity -= donations[i].quantity;
          if (post.requiredResources[j].quantity <= 0) {
            post.requiredResources.splice(j, 1);
          }
        }
      }
    }

    // Explicitly mark the array as modified
    post.markModified("requiredResources");

    await post.save();

    for (let i = 0; i < donations.length; i++) {
      for (let j = 0; j < donor.inventory.length; j++) {
        if (donor.inventory[j].resource === donations[i].resource) {
          donor.inventory[j].quantity -= donations[i].quantity;
        }
      }
    }

    donor.donations += 1;

    const receiver = await User.findById(post.user._id);

    // console.log("pushing");
    // console.log(receiver.chats);
    // console.log(donor);
    // console.log(donor.chats);
    if (!donor.chats.includes(receiver._id)) {
      donor.chats.unshift(receiver._id);
    }
    if (!receiver.chats.includes(req.user._id)) {
      receiver.chats.unshift(req.user._id);
    }

    await post.save();
    await donor.save();
    await receiver.save();

    // Notification
    const affectedNotification = new Notification({
      title: "Donation",
      description: `${req.user.name} has donated you ${donations.map(
        (donation) => `${donation.quantity} ${donation.resource}`
      )}`,
      from: req.user._id,
      to: post.user._id,
      type: "donation",
    });

    const donorNotification = new Notification({
      title: "Donation Accepted",
      description: `${
        req.user.name
      } has accepted your donation of ${donations.map(
        (donation) => `${donation.quantity} ${donation.resource}`
      )}`,
      from: post.user._id,
      to: req.user._id,
      type: "donation",
    });

    await affectedNotification.save();
    await donorNotification.save();

    return res.status(200).json({ message: "Donation successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getInventory,
  addInventory,
  deleteInventory,
  getRecommendedPosts,
  makeDonation,
};
