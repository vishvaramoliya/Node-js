const express = require("express");
const port = 2001;
const app = express();
const path = require("path");

const db = require("./config/db");
const cookie = require("cookie-parser");
const session = require("express-session");
const passport = require("./middlewere/passport");

const flash = require("connect-flash")
const flashConnect = require("./middlewere/flashconnect")


app.use(session({
    name:"local",
    secret: 'rnw',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// use after session
app.use(flash()) 
app.use(flashConnect.setflash)

app.use(passport.AuthenticateUser)

app.use(cookie());


app.use(express.urlencoded());
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use("/uploads",express.static(path.join(__dirname ,'uploads')));


app.use("/" , require("./routes/route"));
app.use("/category" , require("./routes/category"))
app.use("/subCategory" , require("./routes/subcategory"))
app.use("/product" , require("./routes/product"))

app.listen(port , (err) =>{
    err ? console.log(err) : console.log("server started" + port);
});