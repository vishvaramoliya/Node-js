const express = require("express");
const route = express.Router();
const ctl = require("../../controller/Employee/ctl");

route.post("/addEmployee", ctl.addEmployee);
route.post("/loginEmployee", ctl.loginEmployee);
route.delete("/deleteEmployee", ctl.deleteEmployee);
route.post("/changePassword", ctl.changePassword);
route.post("/forgetPassword", ctl.forgetPassword);
route.post("/recoverPasswordWithOTP", ctl.recoverPasswordWithOTP);

module.exports = route;