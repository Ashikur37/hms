const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require("body-parser");
const adminController = require("./controllers/admin");
const userController = require("./controllers/user");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const fs = require("fs");
const hbs = require("hbs");
const connect = require("./data/Connect");
const doctor = connect.doctor;
const admin = connect.admin;
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(fileUpload());
app.use(session({ secret: "Shh, its a secret!" }));

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("app is running at port " + port);
});
require("./routes")(app);
app.get("/about-us", (req, res) => {
  res.render("aboutus");
});
app.get("/available_bed", (req, res) => {
  res.render("availablebed");
});

app.get("/ambulance", (req, res) => {
  res.render("ambulance");
});
app.get("/doctor/signin", (req, res) => {
  res.render("doctor/signin");
});
app.post("/doctor/signin", (req, res) => {
  res.render("doctor/signin");
});
app.get("/admin/signin", (req, res) => {
  res.render("admin/signin", { error: "", email: "" });
});
app.post("/admin/signin", (req, res) => {
  admin.findOne(
    { email: req.body.email, password: req.body.password },
    (err, admin) => {
      if (admin) {
        req.session.admin = admin;
        res.redirect("/admin");
      } else {
        res.render("admin/signin", {
          error: "Invalid email or password",
          email: req.body.email
        });
      }
    }
  );
});
app.get("/staff/signin", (req, res) => {
  res.render("staff/signin");
});
app.get("/health-tips", (req, res) => {
  res.render("healthtips");
});
app.get("/welcome-notes", (req, res) => {
  res.render("welcomenotes");
});

app.get("/visiting-hours", (req, res) => {
  res.render("visitinghours");
});

app.get("/parking", (req, res) => {
  res.render("parking");
});

app.get("/cafeteria", (req, res) => {
  res.render("cafeteria");
});
app.get("/location", (req, res) => {
  res.render("location");
});

app.get("/diagonostic", (req, res) => {
  res.render("diagonostic");
});
app.get("/pharmacy", (req, res) => {
  res.render("pharmacy");
});
app.get("/contact-us", (req, res) => {
  res.render("contactus");
});

app.get("/newappointment", (req, res) => {
  res.render("newAppointment");
});
doctorList = callback => {
  fs.readFile("./data/doctorList.txt", "utf-8", (err, data) => {
    if (!err) {
      callback(data);
    } else {
      console.log(err);
    }
  });
};
app.get("/viewdoctorlist", (req, res) => {
  doctor.find({}, (err, doctorList) => {
    console.log(doctorList);
    res.render("viewdoctorList", { doctors: doctorList });
  });
});

app.use(adminController);
app.use(userController);
