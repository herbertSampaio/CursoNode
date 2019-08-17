const { User } = require("../models");

class SessionController {
  create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    const { email, password } = req.body;

    var user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash("error", "usuario nao encontrado");
      return res.redirect("/");
    }

    if (!(await user.checkPassword(password))) {
      req.flash("error", "Senha incorreta");
      return res.redirect("/");
    }
    req.session.user = user;
    return res.redirect("/app/dashboard");
  }

  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie("root");
      res.redirect("/");
    });
  }
}

module.exports = new SessionController();
