const moment = require("moment");
const { Op } = require("sequelize");
const { Appointment } = require("../models");

class AvaliableController {
  async index(req, res) {
    const date = moment(parseInt(req.query.date));
    const appoinments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        datee: {
          [Op.between]: [
            date.startOf("day").format(),
            date.endOf("day").format()
          ]
        }
      }
    });

    const schemas = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00"
    ];

    const avaliable = schemas.map(time => {
      const [hour, minute] = time.split(":");
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0);

      return {
        time,
        value: value.format(),
        avaliable:
          value.isAfter() &&
          !appoinments.find(a => moment(a.datee).format("HH:mm") === time)
      };
    });

    return res.render("avaliable/index", { avaliable });
  }
}

module.exports = new AvaliableController();
