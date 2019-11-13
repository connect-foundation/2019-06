const model = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      domain_no: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      sub_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_user',
      timestamps: false,
      paranoid: false,
      underscored: true,
    },
  );

  User.associate = ({ Domain, Mail }) => {
    User.belongsTo(Domain, { foreignKey: 'domain_no', targetKey: 'no' });
    User.hasMany(Mail, { foreignKey: 'owner', sourceKey: 'no' });
  };

  return User;
};

export default model;
