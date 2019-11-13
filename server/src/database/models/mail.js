import { Op } from 'Sequelize';

const model = (sequelize, DataTypes) => {
  const Mail = sequelize.define(
    'Mail',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      owner: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      mail_template_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      is_important: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_removed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      paranoid: false,
      underscored: true,
      tableName: 'tbl_mail',
    },
  );

  Mail.associate = ({ User, MailTemplate }) => {
    Mail.belongsTo(User, { foreignKey: 'owner', targetKey: 'no' });
    Mail.belongsTo(MailTemplate, { foreignKey: 'mail_template_id', targetKey: 'no' });
  };

  Mail.findAllReceiveMail = (userNo, userEmail, options = { raw: true }) =>
    Mail.findAll({
      where: {
        owner: userNo,
      },
      include: [
        {
          model: sequelize.models.MailTemplate,
          where: {
            from: {
              [Op.not]: userEmail,
            },
          },
        },
      ],
    });

  return Mail;
};

export default model;
