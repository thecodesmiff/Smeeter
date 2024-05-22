import * as pool from '../db/db.js';

export const sendMessage = async(req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id

        let convoId;

        const lookForConvo = await pool.query("SELECT * FROM conversations WHERE participants <@ array[$1, $2]::int[]", [receiverId, senderId]);
        // const convoId = lookForConvo.rows[0].conv_id;
        lookForConvo.rowCount !== 0 ? convoId = lookForConvo.rows[0].conv_id : convoId = 0;


        const createMessage = await pool.query("insert into messages (sender_id, receiver_id, message) values($1, $2, $3) RETURNING *", [senderId, receiverId, message]);
        const newMessage = await createMessage.rows[0].message;
        const messageId =  await createMessage.rows[0].msg_id;
        const fullMessage = await createMessage.rows[0];

        if(convoId === 0) {
            await pool.query("insert into conversations (participants, messages) values(array [$1::int, $2::int], array [$3::int])", [receiverId, senderId, messageId])
        }

        await pool.query("update conversations set messages = array_append(messages, $1) WHERE conv_id = $2", [messageId, convoId])
        res.status(201).json(fullMessage);

        //SOCKET.IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", fullMessage);
        }


    } catch (error) {
        console.log("Error in sendMessage controller:", error.message)
        res.status(500).json({ error: "Internal server error"});
    }
};

export const getMessages = async(req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;


        const lookForConvo = await pool.query("SELECT * FROM conversations WHERE participants <@ array[$1, $2]::int[]", [senderId, userToChatId]);

        if (lookForConvo.rowCount === 0) {
            res.status(200).json({ message: 'No messages found!'});
        } else {
            const convoId = lookForConvo.rows[0].conv_id; 
            
            const msgList = await pool.query(`
                select * from messages
                where msg_id IN (
                    select unnest (messages)
                    from conversations
                    where conv_id = $1)
                order by created_at asc;
            `, [convoId]);
    
            res.status(200).json(msgList.rows);
        }


    } catch (error) {
        console.log("Error in getMessages controller:", error.message)
        res.status(500).json({ error: "Internal server error"});
    }
} 