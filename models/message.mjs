export default function messageModel(sequelize, DataTypes) {
  return sequelize.define(
    'message',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          as: 'receiver_id',
        },
      },
      sender_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          as: 'sender_id',
        },
      },
      message: {
        type: DataTypes.TEXT,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    },
  );
}