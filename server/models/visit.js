'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define('Visit', {
    startDate: {
      type: DataTypes.DATE,
      default: Date.now(),
    },
    endDate: {
      type: DataTypes.DATE,
      default: null,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Visit.associate = (models) => {
    Visit.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      onDelete: 'CASCADE'
    })
  };
  return Visit;
};