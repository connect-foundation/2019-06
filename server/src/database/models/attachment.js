const model = (sequelize, DataTypes) => {
  const Attachment = sequelize.define(
    'Attachment',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      mail_template_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      paranoid: false,
      underscored: true,
      tableName: 'tbl_attachment',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Attachment.associate = ({ MailTemplate }) => {
    Attachment.belongsTo(MailTemplate, { foreignKey: 'mail_template_id', targetKey: 'no' });
  };

  Attachment.findAllByMailTemplateNo = ({ no }) => {
    return Attachment.findAll({
      where: {
        mail_template_id: no,
      },
      attributes: { exclude: ['url'] },
      raw: true,
    });
  };

  Attachment.findAttachmentAndMailTemplateByPk = no => {
    return Attachment.findByPk(no, {
      include: [{ model: sequelize.models.MailTemplate }],
      raw: true,
    });
  };

  return Attachment;
};

export default model;
