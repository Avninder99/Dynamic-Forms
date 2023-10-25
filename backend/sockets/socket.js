const Chat = require('../models/Chat');
const Conversation = require('../models/Conversation');
const uuid = require('uuid');
const { validateToken } = require('../utils/auth');

// yet to add middlewares and validators in sockets
module.exports = (io) => {

    const connectedUsers = new Map();





    io.on('connection', (socket) => {
        console.log('user connected');

        try {
            const userToken = socket.handshake.query.userToken;
            console.log(userToken);
    
            const payload = validateToken(userToken);
            if(!payload || payload.id) {
                throw new Error('invalid token');
            }           
            // to add more check if user exist in DB (incase deleted during validation above)

            connectedUsers.set(payload.id, socket);

        } catch (error) {
            console.log(error);
            socket.disconnect();
        }



        socket.on('disconnect', function () {
            for (const [key, value] of connectedUsers.entries()) {
                if (value === socket) {
                    users.delete(key);
                    break;
                }
            }
            console.log('user disconnected');
        });

        socket.on('initial_message_CTS', async ({ message, sender_id, reciever_id, form_id }, cb) => {
            // console.log(message, sender_id, reciever_id);
            try {

                







                const newConversation = await Conversation.create({
                    formResponder: sender_id,
                    formAuthor: reciever_id,
                    relatedForm: form_id
                    // conversationId: uuid.v4()
                });
                const newMessage = await Chat.create({
                    sender: sender_id,
                    reciever: reciever_id,
                    message,
                    conversationId: newConversation._id
                });
                console.log(newMessage);
                cb('recieved by server');
            } catch(error) {
                cb('An Error Occured');
            }
        })


        socket.on('message_CTS', async ({ message, reciever, sender}) => {

        })

        
    })
}