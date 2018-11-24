const express = require("express");
const fs = require("fs");
const router = express.Router();
const mongoose = require("mongoose");
const connect = require("../data/Connect");
const user = connect.user;
const doctor = connect.doctor;
const appointment = connect.appointment;
userList = callback => {
  fs.readFile("./data/userList.txt", "utf-8", (err, data) => {
    if (!err) {
      callback(data);
    } else {
      console.log(err);
    }
  });
};
let appointList = callback => {
  fs.readFile("./data/appointmentList.txt", "utf-8", (err, data) => {
    if (!err) {
      callback(data);
    } else {
      console.log(err);
    }
  });
};
router.get("/signup", (req, res) => {
  res.render("user/signup");
});
router.get("/user/doctorlist", (req, res) => {
  doctor.find({}, (err, doctorList) => {
    res.render("user/doctorlist", {
      doctors: doctorList,
      user: req.session.user
    });
  });
});

router.get("/user/newappointment", (req, res) => {
  if (!req.session.user) {
    res.redirect("/signin");
    return;
  } else {
    res.render("user/Appointment", { user: req.session.user });
  }
});
router.get("/filterdoctor", (req, res) => {
  department = req.query.department;
  doctor.find({ department: department }, (err, doctorList) => {
    res.json(doctorList);
  });
});
router.post("/user/newappointment", (req, res) => {
  doctor.findById(req.body.doctor, (err, Doctor) => {
    appointment.find(
      { date: req.body.date, doctor: Doctor },
      (err, appointments) => {
        console.log(appointments.length);
        if (appointments.length <= 5) {
          Appointment = new appointment({
            date: req.body.date,
            time: req.body.time,
            doctor: Doctor,
            description: req.body.description,
            user: req.session.user,
            status: "applied",
            serial: appointments.length + 1
          });
          Appointment.save().then(err => {
            appointment.find(
              { date: req.body.date, doctor: Doctor },
              (err, appList) => {
                if (appList.length <= 5) {
                  let serial = appList.length;
                  res.render("user/successappointment", {
                    appointment: Appointment,
                    user: req.session.user
                  });
                }
              }
            );
          });
        } else {
          res.render("user/failureappointment");
        }
      }
    );
  });
});
router.get("/signin", (req, res) => {
  let message = "";
  req.query.u
    ? (message = "Your registration has been successfull")
    : (message = "");
  res.render("signin", { error: "", email: "", message: message });
});
router.get("/user/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/signin");
});
router.get("/user/home", (req, res) => {
  if (req.session.user) {
    res.render("user/home", { user: req.session.user });
  } else {
    res.redirect("/signin");
  }
});
router.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  user.find({}, (err, users) => {
    console.log(users);
  });
  user.findOne({ email: email, password: password }, (err, User) => {
    if (User) {
      req.session.user = User;
      if (User.block) res.render("user/blockeduser");
      else res.redirect("/user/home");
    } else {
      res.render("signin", {
        error: "Invalid email or password",
        email: email
      });
    }
  });
});
router.post("/signup", (req, res) => {
  User = new user({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address
  });
  User.save().then(data => {
    let image = req.files.image;
    image.mv(`./public/images/user/${data._id}.jpg`, err => {
      res.redirect("/signin?u=n");
    });
  });
});
module.exports = router;
