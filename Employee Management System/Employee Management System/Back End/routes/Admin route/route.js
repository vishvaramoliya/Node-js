const express = require("express");
const route = express.Router();
const ctl = require("../../controller/Admin Ctl/ctl")
const auth = require("../../middleware/jwtAuth")

route.post("/register", ctl.register);
route.post("/login", ctl.login);
route.get("/dashboard", auth, ctl.dashboard);
route.post("/changePassAdmin", ctl.changePassAdmin);
route.post("/forgetPass", ctl.forgetPass);
route.post("/changePassWithOtp", ctl.changePassWithOtp);

module.exports = route;