const passport = require("passport");
const localSt = require("passport-local").Strategy
const adminSchema = require("../model/adminSchema");

passport.AuthenticateUser = (req , res , next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}

passport.use(
    "local" , 
    new localSt(
    {usernameField: "email"},
    async (email , password , done) =>{
        let admin = await adminSchema.findOne ({email:email});
        if(admin){
            if(admin.password == password){
                return done (null , admin);
            }
            else{
                return done(null , false);
            }
        }
        else{
            return done (null , false);
        }
    }
))

passport.serializeUser((user , done) =>{
    done(null , user.id)
});

passport.deserializeUser(async(userId , done) =>{
    let admin = await adminSchema.findById (userId);
    done(null , admin);
});


passport.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};


module.exports = passport;
