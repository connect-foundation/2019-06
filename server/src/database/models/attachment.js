const model = (sequelize, DataTypes) => {
  const Attachment = sequelize.define(
    'Attachment',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      mail_id: {
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
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      paranoid: false,
      underscored: true,
      tableName: 'tbl_attachment',
    },
  );

  Attachment.associate = ({ Mail }) => {
    Attachment.belongsTo(Mail, { foreignKey: 'mail_id', targetKey: 'no' });
  };

  return Attachment;
};

export default model;
