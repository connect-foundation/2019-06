/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const DEFALT_PAGING = { offset: 0, limit: 100 };

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
    },
    {
      freezeTableName: true,
      timestamps: false,
      paranoid: false,
      underscored: true,
      tableName: 'tbl_mail',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Mail.associate = ({ User, MailTemplate, Category }) => {
    Mail.belongsTo(User, { foreignKey: 'owner', targetKey: 'no' });
    Mail.belongsTo(MailTemplate, { foreignKey: 'mail_template_id', targetKey: 'no' });
    Mail.belongsTo(Category, { foreignKey: 'category_no', targetKey: 'no' });
  };

  Mail.findAndCountAllFilteredMail = ({
    userNo,
    mailFilter = {},
    mailTemplateFilter = {},
    options = {},
    paging = DEFALT_PAGING,
  }) => {
    return Mail.findAndCountAll({
      distinct: true,
      ...paging,
      where: {
        owner: userNo,
        ...mailFilter,
      },
      order: [['no', 'DESC']],
      include: [
        {
          model: sequelize.models.MailTemplate,
          where: {
            ...mailTemplateFilter,
          },
          include: [
            {
              model: sequelize.models.Attachment,
            },
          ],
        },
      ],
      raw: true,
      ...options,
    });
  };

  return Mail;
};

export default model;
