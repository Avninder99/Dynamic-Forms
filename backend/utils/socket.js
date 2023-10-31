const Chat = require('../models/Chat');
const uuid = require('uuid');
const { validateToken } = require('../utils/auth');
const User = require('../models/User');
const Notification = require('../models/Notification');
const mongoose = require('mongoose');

// yet to add middlewares and validators in sockets
module.exports = (io) => {

    const connectedUsers = new Map();
    const usersSubscribedChats = new Map();

    // socket connection listener
    io.on('connection', async (socket) => {
        console.log('user connected');

        // validate the user that just connected to us (later to be moved to middlewares)
        try {
            const token = socket.handshake.auth.token;
            console.log("token -> ", token);
    
            const payload = validateToken(token);
            console.log(payload)
            if(!payload || !payload.id) {
                throw new Error('invalid token');
            }else {
                connectedUsers.set(payload.id, socket);

                const foundUser = await User.findById(payload.id);
                const formIdsHolder = [];
                if(!foundUser) {
                    throw new Error('user not found');
                }

                foundUser.subscribedToFormIds.forEach((formId) => {
                    console.log('subscribing user to notify room of form with id -> ', formId);
                    socket.join(`${formId}_notify`);
                    formIdsHolder.push(formId);
                })

                usersSubscribedChats.set(payload.id, formIdsHolder);
            }
        } catch (error) {
            console.log(error);
            console.log('disconnecting user socket')
            socket.disconnect();
        }



        socket.on('disconnect', function () {
            for (const [key, value] of connectedUsers.entries()) {
                if (value === socket) {
                    console.log('socket removed from the list of connected users')
                    connectedUsers.delete(key);
                    break;
                }
            }
            console.log('user disconnected');
        });

        socket.on('join_chat_CTS', ({ userId, formId }, cb) => {
            try {
                socket.join(`${formId}_chat`);
                socket.leave(`${formId}_notify`);
                console.log('user joined the chat room - ', formId);
                cb(true);
            } catch (error) {
                console.log(error);
                cb(false);
            }
        })

        socket.on('leave_chat_CTS', ({ userId, formId }, cb) => {
            try {
                socket.leave(`${formId}_chat`);
                const member = usersSubscribedChats.get(userId).some((subscribedFormId) => {
                    return subscribedFormId.equals(formId);
                });
                if(member) {
                    socket.join(`${formId}_notify`);
                }
                console.log('user left the chat room - ', formId);
                cb(true);
            } catch (error) {
                console.log(error);
                cb(false);
            }
        })

        socket.on('message_CTS', async ({ message, sender, form }, cb) => {
            // sender -> userId, name
            // form -> formId, formTitle
            try {
                console.log(message, sender, form);
                const newMessage = await Chat.create({
                    sender: sender.userId,
                    message,
                    formId: form.formId
                });
                console.log(newMessage);

                socket
                .to(`${form.formId}_chat`)
                .emit('message_STC', { 
                    message: newMessage.message, 
                    createdAt: newMessage.createdAt, 
                    sender: { 
                        _id: sender.userId, 
                        fullname: sender.name 
                    } 
                });

                
                socket
                .to(`${form.formId}_notify`)
                .emit('notify_STC', {
                    form: {
                        formId: form.formId,
                        formTitle: form.formTitle
                    }
                })
                
                cb(true);
                const subscribedUsers = await User.find({ subscribedToFormIds: form.formId }).select('_id').lean();
                console.log('subscribed users - ', subscribedUsers);
                subscribedUsers.forEach(async (user) => {
                    await Notification.create({
                        formId: form.formId,
                        reciever: user._id,
                        message
                    });
                })

            } catch(error) {
                console.log(error)
                cb(false);
            }
        })

        socket.on('notify_toggle_CTS', async ({ newState, userId, formId }, cb) => {
            try {
                const foundUser = await User.findById(userId);
                if(!foundUser) {
                    throw new Error('user not found');
                }

                const index = foundUser.subscribedToFormIds.indexOf(formId);
                console.log(index);

                if (index === -1 && newState) {
                    foundUser.subscribedToFormIds.push(formId);
                    usersSubscribedChats.set(userId, [ ...usersSubscribedChats.get(userId), new mongoose.Types.ObjectId(formId)]);
                } else if (index !== -1 && !newState) {
                    foundUser.subscribedToFormIds.splice(index, 1);
                    socket.leave(`${formId}_notify`);
                }

                await foundUser.save();

                cb(newState);
            } catch (error) {
                console.log(error);
                cb(!newState);
            }
        })
    })
}