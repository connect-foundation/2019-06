import bcrypt from 'bcrypt';

const { DEFAULT_DOMAIN_NAME, SALT_ROUND } = process.env;

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
        allowNull: false,
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

  User.beforeCreate(async instance => {
    const { user_id, password } = instance.dataValues;
    const round = parseInt(SALT_ROUND, 10);
    const salt = await bcrypt.genSalt(round);
    const hashedPassword = await bcrypt.hash(password, salt);

    instance.email = `${user_id}@${DEFAULT_DOMAIN_NAME}`;
    instance.password = hashedPassword;
  });

  User.associate = ({ Domain, Mail }) => {
    User.belongsTo(Domain, { foreignKey: 'domain_no', targetKey: 'no' });
    User.hasMany(Mail, { foreignKey: 'owner', sourceKey: 'no' });
  };

  return User;
};

export default model;
