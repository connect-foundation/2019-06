/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
import { createSalt, encrypt } from '../../libraries/crypto';

const { DEFAULT_DOMAIN_NAME } = process.env;

const convertToUserModel = async instance => {
  const { id, password } = instance.dataValues;

  const salt = await createSalt();
  const hashedPassword = await encrypt(password, salt);

  instance.email = `${id}@${DEFAULT_DOMAIN_NAME}`;
  instance.password = hashedPassword;
  instance.salt = salt;
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
      id: {
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
      salt: {
        type: DataTypes.STRING,
        allowNull: true,
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

  User.updatePassword = (no, password) => {
    return User.update(
      {
        password,
      },
      { where: { no }, validate: false },
    );
  };

  User.findOneById = id => {
    return User.findOne({
      where: { id },
      raw: true,
    });
  };

  User.findOneByEmail = email => {
    return User.findOne({
      where: {
        sub_email: email,
      },
      raw: true,
    });
  };

  User.findOneByIdAndSubEmail = (id, sub_email) => {
    return User.findOne({
      where: {
        id,
        sub_email,
      },
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
    User.hasMany(Category, { foreignKey: 'user_no', sourceKey: 'no' });
    User.hasMany(Address, { foreignKey: 'user_no', sourceKey: 'no' });
  };

  User.findOrCreateById = ({ id, name, password, sub_email }) => {
    return User.findOrCreate({
      where: { id },
      defaults: {
        id,
        name,
        password,
        sub_email,
      },
    });
  };
  return User;
};

export default model;
