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
      receiverId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'receiverId',
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'senderId',
        },
      },
      message: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    },
  );
}