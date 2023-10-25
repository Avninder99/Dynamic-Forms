// const Form = require("../models/Form");
// const Response = require("../models/Response");
// const Request = require('../models/Request');
const Chat = require("../models/Chat");
const Conversation = require("../models/Conversation");

const chatControllers = {
    fetchAllMyConversations: async (req, res) => {
        try {
            const userId = req.body.decoded.id;
            const foundConversations = await Conversation.find({ $or: [ { formAuthor: userId }, { formResponder: userId } ]});
    
            return res.status(200).json({
                message: 'success', 
                chats: foundConversations
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },

    fetchMyChatsForSingleConversation: async (req, res) => {
        try {
            const userId = req.body.decoded.id;
            const conversationId = req.params.conversationId;

            const foundConversation = await Conversation.findById(conversationId);

            console.log(userId, foundConversation)


            if(!foundConversation || !(foundConversation.formAuthor.equals(userId) || foundConversation.formResponder.equals(userId))) {
                return res.status(404).json({
                    message: 'Conversation not found'
                })
            }

            const foundChats = await Chat.find({ conversationId });
    
            return res.status(200).json({
                message: 'success', 
                chats: foundChats
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