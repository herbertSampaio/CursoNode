const express = require("express");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);
const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const DashboardController = require("./app/controllers/DashboardController");
const FileController = require("./app/controllers/FileController");
const AppointmentController = require("./app/controllers/AppointmentController");
const AvaliableController = require("./app/controllers/AvaliableController");
const AuthMiddleware = require("./app/middleware/auth");
const GuestMiddleware = require("./app/middleware/guest");

var routes = express.Router();

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash("success");
  res.locals.flashError = req.flash("error");

  return next();
});

routes.use("/app", AuthMiddleware);

routes.get("/files/:file", FileController.show);
routes.get("/signup", GuestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

routes.get("/", GuestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

routes.get("/app/logout", SessionController.destroy);
routes.get("/app/dashboard", DashboardController.index);
routes.get("/app/appointments/new/:provider", AppointmentController.create);
routes.post("/app/appointments/new/:provider", AppointmentController.store);
routes.get("/app/avaliable/:provider", AvaliableController.index);

module.exports = routes;
