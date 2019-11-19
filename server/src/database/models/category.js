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
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_category',
      timestamps: false,
      paranoid: false,
      underscored: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Category.associate = ({ User, Mail, ClassificationPattern }) => {
    Category.belongsTo(User, { foreignKey: 'user_no', targetKey: 'no' });
    Category.hasMany(Mail, { foreignKey: 'category_no', sourceKey: 'no' });
    Category.hasMany(ClassificationPattern, { foreignKey: 'category_no', sourceKey: 'no' });
  };

  return Category;
};

export default model;
