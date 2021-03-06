const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/ams",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
const schema = mongoose.Schema;
const appointmentSchema = new schema({
  date: String,
  time: String,
  appliedTime: {
    type: Date,
    default: Date.now()
  },
  doctor: Object,
  description: String,
  user: Object,
  status: String,
  serial: Number
});
appointmentSchema.methods.getTime = function() {
  const dt = new Date(this.appliedTime);
  return (
    dt.getDate() +
    "/" +
    dt.getMonth() +
    "/" +
    dt.getFullYear() +
    ": " +
    dt.getHours() +
    "-" +
    dt.getMinutes()
  );
};
const adminSchema = new schema({
  email: String,
  password: String
});
const doctorSchema = new schema({
  name: String,
  age: Number,
  email: String,
  gender: String,
  phone: String,
  address: String,
  password: String,
  designation: String,
  department: String,
  Join_date: String,
  fee: Number,
  start_time: String,
  end_time: String,
  available: Boolean,
  visiting_days: [String],
  fee: Number
});
const staffSchema = new schema({
  name: String,
  age: Number,
  email: String,
  gender: String,
  phone: String,
  address: String,
  password: String,
  Join_date: String,
  salary: Number,
  start_time: String,
  end_time: String,
  available: {
    type: Boolean,
    default: true
  },
  duty_days: [String]
});
const userSchema = new schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  gender: String,
  phone: String,
  address: String,
  block: {
    type: Boolean,
    default: false
  }
});

module.exports.user = mongoose.model("user", userSchema);
module.exports.doctor = mongoose.model("doctor", doctorSchema);
module.exports.appointment = mongoose.model("appointment", appointmentSchema);
module.exports.admin = mongoose.model("admin", adminSchema);
module.exports.staff = mongoose.model("staff", staffSchema);
db.on("error", err => {
  console.log("error");
});
db.once("open", () => {
  console.log("Successful");
});
