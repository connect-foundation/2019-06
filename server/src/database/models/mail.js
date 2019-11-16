/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
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
      category_no: {
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

  Mail.associate = ({ User, MailTemplate, Category }) => {
    Mail.belongsTo(User, { foreignKey: 'owner', targetKey: 'no' });
    Mail.belongsTo(MailTemplate, { foreignKey: 'mail_template_id', targetKey: 'no' });
    Mail.belongsTo(Category, { foreignKey: 'category_no', targetKey: 'no' });
  };

  Mail.findAllReceivedMail = (userNo, userEmail) => {
    return Mail.findAll({
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
  };

  return Mail;
};

export default model;
