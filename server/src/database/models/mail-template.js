const model = (sequelize, DataTypes) => {
  const MailTemplate = sequelize.define(
    'MailTemplate',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      from: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      to: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: false,
      underscored: true,
      tableName: 'tbl_mail_template',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  MailTemplate.associate = ({ Mail, Attachment }) => {
    MailTemplate.hasMany(Mail, { foreignKey: 'mail_template_id', sourceKey: 'no' });
    MailTemplate.hasMany(Attachment, { foreignKey: 'mail_template_id', sourceKey: 'no' });
  };

  return MailTemplate;
};

export default model;
