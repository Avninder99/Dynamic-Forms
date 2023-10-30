const Chat = require("../models/Chat");
const User = require("../models/User");

const chatControllers = {
    fetchSingleFormChats: async (req, res) => {
        try {
            const formId = req.params.formId, userId = req.body.decoded.id;

            const foundUser = await User.findById(userId);
            if(!foundUser) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            const subscribed = foundUser.subscribedToFormIds.some((id) => {
                return id.equals(formId);
            })

            const foundChats = await Chat.find({ formId }).select("-_id -__v -formId").populate('sender', 'fullname _id').lean();
            console.log(foundChats);

            return res.status(200).json({
                message: 'success',
                chats: foundChats,
                subscribed
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    }
}

module.exports = chatControllers;