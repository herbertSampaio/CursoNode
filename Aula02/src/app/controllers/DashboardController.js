const { User, Appointment } = require("../models");
const moment = require("moment");

class DashboardController {
  async index(req, res) {
    if (req.session.user.provider !== true) {
      const providers = await User.findAll({ where: { provider: true } });
      return res.render("dashboard", { providers });
    }
    const appoinments = await Appointment.findAll({
      where: { provider_id: req.session.user.id }
    });

    var users = [];

    for (let index = 0; index < appoinments.length; index++) {
      const element = appoinments[index];
      var user = await User.findOne({ where: { id: element.user_id } });
      user.dataAppoinment = moment(element.datee).format("DD/MM/YYYY");
      user.horaAppoinment = moment(element.datee).format("HH:mm");
      users.push(user);
    }

    return res.render("dashboardUser", { users });
  }
}

module.exports = new DashboardController();
