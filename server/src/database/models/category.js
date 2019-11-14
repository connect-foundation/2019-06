const model = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_no: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_category',
      timestamps: false,
      paranoid: false,
      underscored: true,
    },
  );

  Category.associate = ({ User, Mail }) => {
    Category.belongsTo(User, { foreignKey: 'user_no', targetKey: 'no' });
    Category.hasMany(Mail, { foreignKey: 'category_no', sourceKey: 'no' });
  };

  return Category;
};

export default model;
