import { resolve } from 'path';
import db from './models/index.mjs';

import initUsersController from './controllers/users.mjs';
import initMessagesController from './controllers/messages.mjs';
import initCuisinesController from './controllers/cuisines.mjs';
import initRoomsController from './controllers/rooms.mjs';

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

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
