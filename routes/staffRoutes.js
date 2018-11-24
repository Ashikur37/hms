module.exports = app => {
  const staffController = require("../controllers/staff");
  app.post("/staff/signin", staffController.signin);
  app.get("/staff/changepassword", staffController.changepassword);
  app.post("/staff/changepassword", staffController.updatepassword);
  app.get("/staff/home", staffController.home);
};
