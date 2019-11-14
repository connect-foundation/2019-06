const model = (sequelize, DataTypes) => {
  const ClassificationPatternType = sequelize.define(
    'ClassificationPatternType',
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
      tableName: 'tbl_classification_pattern_type',
      timestamps: false,
      paranoid: false,
    },
  );

  ClassificationPatternType.associate = ({ ClassificationPattern }) => {
    ClassificationPatternType.hasMany(ClassificationPattern, {
      foreignKey: 'pattern_type_no',
      sourceKey: 'no',
    });
  };

  return ClassificationPatternType;
};

export default model;
