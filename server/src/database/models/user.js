/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
import bcrypt from 'bcrypt';

const { SALT_ROUND, DEFAULT_DOMAIN_NAME } = process.env;

const convertToUserModel = async instance => {
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
        validate: {
          is: {
            args: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/,
            msg: '아이디의 형식이 올바르지 않습니다.',
          },
          len: {
            args: [5, 20],
            msg: '아이디의 길이는 5이상 20이하 이어야 합니다.',
          },
        },
      },
      domain_no: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          is: {
            args: /[a-zA-Z가-힣 ]/,
            msg: '이름의 형식이 올바르지 않습니다.',
          },
          len: {
            args: [1, 10],
            msg: '이름의 길이는 1이상 10이하 이어야 합니다.',
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [8, 20],
            msg: 'password의 길이는 8이상 20이하 이어야 합니다.',
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
        validate: {
          is: {
            args: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}$/,
            msg: '이메일 형식이 올바르지 않습니다.',
          },
        },
      },
      sub_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          is: {
            args: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}$/,
            msg: 'sub email의 형식이 올바르지 않습니다.',
          },
        },
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_user',
      timestamps: false,
      paranoid: false,
      underscored: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

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
      await convertToUserModel(instance);
    }
  });

  User.beforeCreate(async instance => {
    await convertToUserModel(instance);
  });

  User.associate = ({ Domain, Mail, Address, Category }) => {
    User.belongsTo(Domain, { foreignKey: 'domain_no', targetKey: 'no' });
    User.hasMany(Mail, { foreignKey: 'owner', sourceKey: 'no' });
    User.hasMany(Address, { foreignKey: 'user_no', sourceKey: 'no' });
    User.hasMany(Category, { foreignKey: 'user_no', sourceKey: 'no' });
  };

  User.findOrCreateById = ({ user_id, name, password, sub_email }) => {
    return User.findOrCreate({
      where: { user_id },
      defaults: {
        user_id,
        name,
        password,
        sub_email,
      },
    });
  };

  return User;
};

export default model;
