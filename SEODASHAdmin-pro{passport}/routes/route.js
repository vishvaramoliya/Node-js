const express = require("express");
const route = express.Router();
const ctl = require("../controllers/ctl");
const upload = require("../middlewere/multer");
const passport = require("../middlewere/passport");
    
route.post(
    "/userLogin" ,
    passport.authenticate("local" , {failureRedirect : "/"}),
    ctl.userLogin
);


route.get("/" , ctl.login);
route.get("/logout" , ctl.logout);
route.get("/dashboard" ,passport.checkAuth, ctl.dashboard);
route.get("/profile" ,passport.checkAuth, ctl.profile);
route.get("/changepass" ,passport.checkAuth, ctl.changepass);
route.post("/changepass" , ctl.changepassword);

route.get("/lostpass" , ctl.lostpass);
route.post("/recoverpass" , ctl.recoverpass);
route.post("/verifypass" , ctl.verifypass);
 
route.get("/category" , ctl.category)

route.get("/addadmin" , passport.checkAuth , ctl.addadmin);
route.get("/viewadmin" , passport.checkAuth , ctl.viewadmin);

route.post("/addData" , upload ,  ctl.addadminData);
route.get("/deleteData" , upload ,  ctl.deleteData);
route.get("/editData" , upload , ctl.editData);
route.post("/updateData" , upload , ctl.updateData);

module.exports = route;