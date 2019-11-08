const model = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      no: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      id: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_user',
      timestamps: true,
      paranoid: true,
    },
  );

  return User;
};

export default model;
