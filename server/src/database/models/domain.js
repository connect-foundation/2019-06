const model = (sequelize, DataTypes) => {
  const Domain = sequelize.define(
    'Domain',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_domain',
      timestamps: false,
      paranoid: false,
    },
  );

  Domain.associate = ({ User }) => {
    Domain.hasMany(User, { foreignKey: 'domain_no', sourceKey: 'no' });
  };

  return Domain;
};

export default model;
