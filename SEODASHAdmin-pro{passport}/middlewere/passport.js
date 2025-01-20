const passport = require("passport");
const localSt = require("passport-local").Strategy
// const schema = require("../model/adminSchema");
const adminSchema = require("../model/adminSchema");
// const { checkout } = require("../routes/route");
const checkAuth = require("../middlewere/checkAuth");

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



module.exports = passport;
