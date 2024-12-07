import Notification from "../Models/notificationModel.js";

const getAllNotifications = async (req, res) => {
  try {
    const user = req.user;
    const notifications = await Notification.find({ to: user._id }).populate(
      "from to"
    );

    return res.status(200).json({ notifications });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getAllNotifications };
