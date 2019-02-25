'use strict';
module.exports = (sequelize, DataTypes) => {
  const AggregatedReport = sequelize.define('AggregatedReport', {
    title: DataTypes.STRING
  }, {});
  AggregatedReport.associate = function(models) {
    // associations can be defined here
  };
  return AggregatedReport;
};