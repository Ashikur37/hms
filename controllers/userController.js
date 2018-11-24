const connect = require("../data/Connect");
const user = connect.user;
const doctor = connect.doctor;
const appointment = connect.appointment;

exports.changepassword = (req, res) => {
  user.findById(req.session.user._id).then(User => {
    pass = User.password;
    res.render("user/changepassword", { err: "", pass });
  });
};
exports.updatepassword = (req, res) => {
  user.findById(req.session.user._id).then(User => {
    User.password = req.body.newpass;
    User.save().then(data => {
      req.session.user = data;
      res.render("user/changepassword", {
        err: "Password has been changed successfully",
        pass: data.password
      });
    });
  });
};
exports.myappointment = (req, res) => {
  const id = req.session.user._id;
  appointment.find().then(list => {
    list = list.filter(ap => ap.user._id == id);
    res.render("user/myappointment", { list });
  });
};
