module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    datee: DataTypes.DATE
  });

  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { foreignKey: "user_id" });
    Appointment.belongsTo(models.User, { foreignKey: "provider_id" });
  };

  return Appointment;
};
