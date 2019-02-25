'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Patient.associate = (models) => {
    Patient.hasMany(models.Visit, {
      foreignKey: 'patientId',
      as: 'visits',
    });
  };
  return Patient;
};