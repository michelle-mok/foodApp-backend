import sequelizePackage from 'sequelize';
const { Op } = sequelizePackage;
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: "1217708",
  key: "1a237dca1649981ed002",
  secret: "5af602b55f9625620aee",
  cluster: "ap1",
  useTLS: true
});

export default function initMessagesController(db) {
   
const allMessages = async (req, res) => {
  console.log('userId from cookie', req.cookies.userId);
  console.log('other user id', req.params.id);

  try {
    const messages = await db.Message.findAll({
      where: {
        [Op.or]: [{
          sender_id: Number(req.cookies.userId),
          receiver_id: Number(req.params.id),
        }, {
          sender_id: Number(req.params.id),
          receiver_id:Number(req.cookies.userId)
        }]
      }
    })
    console.log('messages ===', messages);
    res.send(messages);
  }
  catch (error) {
    console.log(error);
  }
}

const newMessage = async (req, res) => {
  console.log('new message', req.body);
        
  try {
    db.Message.afterCreate('after create', (messageInstance) => {
      console.log('inside after create hook');
      console.log(messageInstance);
      pusher.trigger("messages", "inserted", 
          {
            message: messageInstance.message
          }
        );
    })
    const insertedMessage = await db.Message.create({
      sender_id: Number(req.cookies.userId),
      receiver_id: Number(req.body.receiverId),
      message: req.body.message,
    })
    console.log('new entry to table', insertedMessage);
    res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
  }
}
  return {
    allMessages, newMessage
  };
}
