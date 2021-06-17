import { resolve } from 'path';
import db from './models/index.mjs';

import initUsersController from './controllers/users.mjs';
import initMessagesController from './controllers/messages.mjs';
import initCuisinesController from './controllers/cuisines.mjs';

export default function routes(app) {
  
  const UsersController = initUsersController(db);
  app.get('/users', UsersController.index);
  app.post('/login', UsersController.login);
  app.post('/userinfo', UsersController.newUser);
  app.post('/everyonesCuisines', UsersController.getEveryonesCuisines);
  
  const MessagesController = initMessagesController(db); 
  app.get('/messages/:id', MessagesController.allMessages);
  app.post('/newMessage', MessagesController.newMessage);
  
  const CuisinesController = initCuisinesController(db);
  app.get('/cuisines', CuisinesController.index);
  app.get('/suggestedPeople', CuisinesController.suggestedPeople);

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
