/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
import bcrypt from 'bcrypt';

const { SALT_ROUND, DEFAULT_DOMAIN_NAME } = process.env;

const setUserIdByEmail = async instance => {
  const { user_id, password } = instance.dataValues;
  const round = parseInt(SALT_ROUND, 10);
  const salt = await bcrypt.genSalt(round);
  const hashedPassword = await bcrypt.hash(password, salt);
  instance.email = `${user_id}@${DEFAULT_DOMAIN_NAME}`;
  instance.password = hashedPassword;
};

const model = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
      domain_no: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
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

  User.checkIdAndCreate = ({ id, name, password, email }) =>
    User.findOrCreate({
      where: { user_id: id },
      defaults: {
        user_id: id,
        name,
        password,
        sub_email: email,
      },
    });

  User.findOneById = id => {
    return User.findOne({
      where: {
        user_id: id,
      },
      raw: true,
    });
  };

  User.beforeBulkCreate(async instances => {
    for (const instance of instances) {
      await setUserIdByEmail(instance);
    }
  });

  User.beforeCreate(async instance => {
    await setUserIdByEmail(instance);
  });

  User.associate = ({ Domain, Mail }) => {
    User.belongsTo(Domain, { foreignKey: 'domain_no', targetKey: 'no' });
    User.hasMany(Mail, { foreignKey: 'owner', sourceKey: 'no' });
  };

  return User;
};

export default model;
