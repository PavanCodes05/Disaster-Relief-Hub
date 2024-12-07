const getChats = async (req, res) => {
  try {
    const user = req.user;
    const chats = user.chats;
    res.status(200).json({ chats });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getChats };
