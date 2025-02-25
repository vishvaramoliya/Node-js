const express = require("express");
const route = express.Router();
const ctl = require("../../controller/Manager/managerCtl");

route.post("/addManager", ctl.addManager);
route.post("/loginManager", ctl.loginManager);
route.delete("/deleteManager", ctl.deleteManager);
route.post("/changePassword", ctl.changePassword);
route.post("/forgetPass", ctl.forgetPass);
route.post("/recoverPasswithOTP", ctl.recoverPasswithOTP);

module.exports = route;