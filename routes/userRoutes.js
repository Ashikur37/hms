module.exports = app => {
  const userController = require("../controllers/userController");
  app.get("/user/changepassword", userController.changepassword);
  app.post("/user/changepassword", userController.updatepassword);
  app.get("/user/myappointment", userController.myappointment);
};
