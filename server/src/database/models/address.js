const model = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_no: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      friend: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: false,
      underscored: true,
      tableName: 'tbl_address',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Address.associate = ({ User }) => {
    Address.belongsTo(User, { foreignKey: 'user_no', targetKey: 'no', onDelete: 'cascade' });
  };

  Address.findAllByUserNo = userNo => {
    return Address.findAll({
      where: {
        user_no: userNo,
      },
    });
  };

  return Address;
};

export default model;
