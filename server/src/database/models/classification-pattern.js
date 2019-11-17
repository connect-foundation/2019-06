const model = (sequelize, DataTypes) => {
  const ClassificationPattern = sequelize.define(
    'ClassificationPattern',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      category_no: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      pattern: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_classification_pattern',
      timestamps: false,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  ClassificationPattern.associate = ({ Category, ClassificationPatternType }) => {
    Category.belongsTo(ClassificationPatternType, { foreignKey: 'category_no', targetKey: 'no' });
    ClassificationPattern.belongsTo(Category, { foreignKey: 'category_no', targetKey: 'no' });
  };

  return ClassificationPattern;
};

export default model;
