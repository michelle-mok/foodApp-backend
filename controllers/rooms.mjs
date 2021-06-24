import sequelizePackage from 'sequelize';
const { Op } = sequelizePackage;

export default function initRoomsController(db) {
  const findOrCreateRoom = async (req, res) => {
    console.log(req.body);
    try {
      const chatRoom = await db.Room.findOrCreate({
        where: {
          name: req.body.name,
        }
        // include: [{
        //   model: db.User,
        //   where: {
        //     id: {
        //       [Op.and]: friendIds,
        //     }
        //   },
        // }]
      })
      console.log('chat room', chatRoom);
      if (chatRoom[1] === true) {
        const userRoomEntries = await chatRoom[0].addUsers(req.body.friendIds);
        console.log(userRoomEntries);
      }
      res.send(chatRoom);
    }
    catch (error) {
      console.log(error);
    }
  }

  const getChatRoom = async (req, res) => {
    console.log(req.body.id);
    console.log('is req.body an array',Array.isArray(req.body.id));
    try {
      let chatRoom;
      let displayName;
      let profilepic;
      let chatroomDetails;
      if (Array.isArray(req.body.id) === true) {
        chatRoom = await db.Room.findOne({
          include: [{
            model: db.User,
            where: {
              id: {
              [Op.and]: req.body.id,
              }
            }
          }]
        })
        console.log('chatRoom from array', chatRoom);
      } else {
        console.log('req.params is chatroom id');
        chatRoom = await db.Room.findOne({
          where: {
            id: req.body.id,
          },
          include: [{
            model:  db.User,
            attributes: ['id', 'username', 'profilePic']
          }]
        })
        console.log('chatroom', chatRoom);
        const roomUsers = [];
        chatRoom.users.forEach((user) => {
          if (user.id !== Number(req.cookies.userId)) {
            roomUsers.push(user.username);
          }
        })
        console.log('room users', roomUsers);
        if (roomUsers.length === 1) {
          displayName = roomUsers[0];
          profilepic = chatRoom.users[0].profilePic
        } else { 
        displayName = roomUsers.join(', ');
        profilepic = null;
        }
        chatroomDetails = {
        id: chatRoom.id,
        displayName,
        profilepic,
        }
      }
      
      console.log('chat room details', chatroomDetails);

      const messages = await db.Message.findAll({
        where: {
          roomId: chatRoom.id,
        },
        include: [{
          model: db.User,
          attributes:['username'],
        }],
        order: [['id', 'ASC']]
        })
        console.log('messages-----', messages);
        const messageArray = [];
        let singleMessage;
        messages.forEach((msg) => {
          const { userId, roomId, message, createdAt } = msg;
          const username = msg.user.username;
          singleMessage = {
            userId,
            roomId,
            message,
            username,
            createdAt,
          }
          messageArray.push(singleMessage);
          })
        res.send({chatroomDetails, messageArray});
    }
    catch (error) {
      console.log(error);
    }
  }

  const getRooms = async(req, res) => {
    console.log(req.body);

    try {
      const user = await db.User.findOne({
        where: {
          id: Number(req.cookies.userId)
        },
      })
      const rooms = await user.getRooms({
        include: [{
          model: db.Message,
          order: [[ 'id', 'DESC' ]],
          limit: 1,
        }, {
          model: db.User,
          attributes: ['id', 'username', 'profilePic'],
        }]
      })
      console.log(rooms);
      
      const roomDetails = [];
      rooms.forEach((room) => {
        let lastMessage;
        if (room.messages.length > 0) {
          lastMessage = room.messages[0].message;
        } else {
          lastMessage = '';
        }
        const { name, id } = room;
        console.log('users for 1 room', room.users);
        const roomUsers = [];
        room.users.forEach((user) => {
          if (user.id !== Number(req.cookies.userId)) {
            roomUsers.push(user.username);
          }
        })
        let displayName;
        let profilepic;
        if (roomUsers.length === 1) {
          displayName = roomUsers[0];
          profilepic = room.users[0].profilePic
        } else { 
        displayName = roomUsers.join(', ');
        profilepic = null;
        }
        const singleRoom = {
          id,
          name,
          lastMessage,
          displayName, 
          profilepic
        }
        roomDetails.push(singleRoom);
      })
      console.log('room details----', roomDetails);
      res.send(roomDetails);
    }
    catch(error) {
      console.log(error);
    }
  }

  return { findOrCreateRoom, getChatRoom, getRooms }
}