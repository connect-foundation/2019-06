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
        allowNull: false,
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

  Category.findOneByUserNoAndName = (user_no, name) => {
    return Category.findOne({
      where: { user_no, name },
      raw: true,
    });
  };

  Category.findAllByUserNo = user_no => {
    return Category.findAll({
      where: { user_no },
      raw: true,
    });
  };

  Category.findOneByNoAndUserNoAndName = (no, user_no, name) => {
    return Category.findOne({
      where: { no, user_no, name },
    });
  };

  Category.findOneByNoAndUserNo = (no, user_no) => {
    return Category.findOne({
      where: { no, user_no },
      raw: true,
    });
  };

  Category.associate = ({ User, Mail, ClassificationPattern }) => {
    Category.belongsTo(User, { foreignKey: 'user_no', targetKey: 'no' });
    Category.hasMany(Mail, { foreignKey: 'category_no', sourceKey: 'no' });
    Category.hasMany(ClassificationPattern, { foreignKey: 'category_no', sourceKey: 'no' });
  };

  return Category;
};

export default model;
