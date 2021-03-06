module.exports = app => {
  const adminController = require("../controllers/adminController");
  app.get("/admin/changepassword", adminController.changepassword);
  app.post("/admin/changepassword", adminController.updatepassword);
  app.get("/admin/users", adminController.users);
  app.get("/admin/blockuser", adminController.blockUser);
  app.get("/admin/unblockuser", adminController.unBlockUser);
  app.get("/admin/appointmentlist", adminController.appointmentlist);
  app.get("/admin/viewstafflist", adminController.viewstafflist);
  app.get("/admin/addstaff", adminController.newStaff);
  app.post("/admin/addstaff", adminController.addStaff);
};
