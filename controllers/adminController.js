const express = require("express");
const fs = require("fs");
const router = express.Router();
const mongoose = require("mongoose");
const connect = require("../data/Connect");
const doctor = connect.doctor;
const admin = connect.admin;
const user = connect.user;
const appointment = connect.appointment;
const staff = connect.staff;
exports.viewstafflist = (req, res) => {
  staff.find().then(staffs => {
    res.render("admin/viewStaffList", { staffs });
  });
};
exports.newStaff = (req, res) => {
  res.render("admin/addStaff");
};
exports.addStaff = (req, res) => {
  Staff = new staff({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password,
    Join_date: req.body.Join_date,
    salary: req.body.salary,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    duty_days: req.body.days
  });
  Staff.save()
    .then(data => {
      id = data._id;
      let image = req.files.image;
      image.mv(`public/images/staff/${id}.jpg`, err => {});
      res.json(data);
      //res.redirect("/admin/viewdoctorlist");
    })
    .catch(err => {
      console.log(err);
    });
};
exports.changepassword = (req, res) => {
  admin.findById(req.session.admin._id).then(Admin => {
    pass = Admin.password;
    res.render("admin/changepassword", { err: "", pass });
  });
};
exports.appointmentlist = (req, res) => {
  appointment.find().then(list => {
    res.render("admin/viewappointment", { list });
  });
};
exports.updatepassword = (req, res) => {
  admin.findById(req.session.admin._id).then(Admin => {
    Admin.password = req.body.newpass;
    Admin.save().then(data => {
      req.session.admin = data;
      res.render("admin/changepassword", {
        err: "Password has been changed successfully",
        pass: data.password
      });
    });
  });
};
exports.users = (req, res) => {
  user.find().then(users => {
    res.render("admin/unaprovedUser", { users });
  });
};

exports.blockUser = (req, res) => {
  user.findById(req.query.id).then(User => {
    User.block = true;
    User.save().then(data => {
      res.redirect("/admin/users");
    });
  });
};
exports.unBlockUser = (req, res) => {
  user.findById(req.query.id).then(User => {
    User.block = false;
    User.save().then(data => {
      res.redirect("/admin/users");
    });
  });
};
