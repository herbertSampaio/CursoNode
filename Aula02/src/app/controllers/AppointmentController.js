const { User, Appointment } = require("../models");

class AppointmentController {
  async create(req, res) {
    const provider = await User.findByPk(req.params.provider);
    return res.render("appointments/create", { provider });
  }

  async store(req, res) {
    console.log(req.body.date);
    await Appointment.create({
      user_id: req.session.user.id,
      provider_id: req.params.provider,
      datee: req.body.date
    });

    return res.redirect("/app/dashboard");
  }
}

module.exports = new AppointmentController();
