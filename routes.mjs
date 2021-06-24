import { resolve } from 'path';
import db from './models/index.mjs';
import initUsersController from './controllers/users.mjs';
import initMessagesController from './controllers/messages.mjs';
import initCuisinesController from './controllers/cuisines.mjs';
import initRoomsController from './controllers/rooms.mjs';
import multer from 'multer';
import fs from 'fs';
import aws from 'aws-sdk';
import util from 'util';
import { uploadFile, getFileStream } from './s3.mjs';
import dotenv from 'dotenv';
dotenv.config();

const unlinkFile = util.promisify(fs.unlink);

const multerUpload = multer({dest: 'uploads/'});

const s3 = new aws.S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export default function routes(app) {
  
  const UsersController = initUsersController(db);
  app.get('/users', UsersController.index);
  app.post('/login', UsersController.login);
  app.post('/userinfo', UsersController.newUser);
  app.post('/everyonesCuisines', UsersController.getEveryonesCuisines);
  app.put('/updateUserInfo', UsersController.updateUser);
  
  const MessagesController = initMessagesController(db); 
  app.post('/newMessage', MessagesController.newMessage);
  
  const RoomsController = initRoomsController(db);
  app.post('/setupChatRoom', RoomsController.findOrCreateRoom);
  app.post('/getChatRoom', RoomsController.getChatRoom);
  app.get('/getRooms', RoomsController.getRooms);

  const CuisinesController = initCuisinesController(db);
  app.get('/cuisines', CuisinesController.index);
  app.get('/suggestedPeople', CuisinesController.suggestedPeople);

  // profilepic uploads with multer to s3
  app.post('/images', multerUpload.single('image'), async (req, res) => {
    try {
      console.log('req file', req.file);
      const file = req.file;
      const result = await uploadFile(file, s3);
      console.log(result);
      await unlinkFile(file.path);
      res.send(result.Location);
    }
    catch (error) {
      console.log(error);
    }
  })

  // getting the profile pic from s3
  app.get('/images/:key', (req, res) => {
    const key = req.params.key;
    console.log(key);

    const readStream = getFileStream(key);
    readStream.pipe(res);
  })
  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
