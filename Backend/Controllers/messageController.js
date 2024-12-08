import User from "../Models/userModel.js";

const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("chats name");

    if (!user) {
      return res.status(404).json({ message: "No chats found" });
    }

    res.status(200).json({ chats: user.chats });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getChats };
