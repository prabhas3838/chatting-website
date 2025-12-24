import Message from "../models/message.js";
import User from "../models/user.js";
import cloudinary from "../lib/cloudinary.js";  


export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }
    }).select("-password");

    return res.status(200).json(filteredUsers);

  } catch (error) {
    console.error("Get all contacts error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getMessagesByUserId = async (req, res) => {
    try {
      const myId = req.user._id;
      const { id: userToChatId } = req.params;
  
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId }
        ]
      }).sort({ createdAt: 1 }); // optional but recommended
  
      return res.status(200).json(messages);
  
    } catch (error) {
      console.error("Get messages error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  

export const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      if (!text && !image) {
        return res.status(400).json({ message: "Message cannot be empty" });
      }
  
      const newMessage = new Message({
        senderId,        // ✅ MATCHES SCHEMA
        receiverId,      // ✅ MATCHES SCHEMA
        text,
        image,
      });
  
      await newMessage.save();
      return res.status(201).json(newMessage);
  
    } catch (error) {
      console.error("Send message error:", error);
      return res.status(500).json({ message: error.message });
    }
  };

  export const getChatPatners = async (req, res) => {
    try {
      const loggedInId = req.user._id;
  
      const messages = await Message.find({
        $or: [
          { senderId: loggedInId },
          { receiverId: loggedInId }
        ]
      });
  
      const partnerIds = [
        ...new Set(
          messages.map(msg =>
            msg.senderId.equals(loggedInId)
              ? msg.receiverId.toString()
              : msg.senderId.toString()
          )
        )
      ];

      const chatpatners=await User.find({_id:{$in:partnerIds}}).select("-password");
  
      return res.status(200).json(chatpatners);
  
    } catch (error) {
      console.error("Get chat partners error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  