import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import userModel from './user.mjs';
import cuisineModel from './cuisine.mjs';
import messageModel from './message.mjs';
import roomModel from './room.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = userModel(sequelize, Sequelize.DataTypes);
db.Cuisine = cuisineModel(sequelize, Sequelize.DataTypes);
db.Message = messageModel(sequelize, Sequelize.DataTypes);
db.Room = roomModel(sequelize, Sequelize.DataTypes);

db.User.belongsToMany(db.Cuisine, { through: 'user_cuisines' });
db.Cuisine.belongsToMany(db.User, { through: 'user_cuisines' });

db.User.hasMany(db.Message);
db.Message.belongsTo(db.User);

db.Room.hasMany(db.Message);
db.Message.belongsTo(db.Room);

db.Room.belongsToMany(db.User, { through: 'user_rooms' });
db.User.belongsToMany(db.Room, { through: 'user_rooms' }); 

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
