const connect = require("../data/Connect");
const staff = connect.staff;
exports.home = (req, res) => {
  res.render("staff/home", { staff: req.session.staff });
};
exports.signin = (req, res) => {
  staff.findOne(
    { email: req.body.email, password: req.body.password },
    (err, Staff) => {
      if (Staff) {
        req.session.staff = Staff;
        res.redirect("/staff/home");
      } else {
        res.render("staff/signin", {
          error: "Invalid email or password",
          email: req.body.email
        });
      }
    }
  );
};
exports.changepassword = (req, res) => {
  staff.findById(req.session.staff._id).then(Staff => {
    pass = Staff.password;
    res.render("staff/changepassword", { err: "", pass });
  });
};
exports.updatepassword = (req, res) => {
  staff.findById(req.session.staff._id).then(Staff => {
    Staff.password = req.body.newpass;
    Staff.save().then(data => {
      req.session.staff = data;
      res.render("staff/changepassword", {
        err: "Password has been changed successfully",
        pass: data.password
      });
    });
  });
};
