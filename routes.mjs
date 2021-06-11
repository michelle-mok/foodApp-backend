import { resolve } from 'path';
import db from './models/index.mjs';

import initUsersController from './controllers/users.mjs';
import initMessagesController from './controllers/messages.mjs';

export default function routes(app) {
  
  const UsersController = initUsersController(db);
  app.get('/users', UsersController.index);

  const MessagesController = initMessagesController(db); 
  app.get('/messages/:id', MessagesController.allMessages);
  app.post('/newMessage', MessagesController.newMessage);
  

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
