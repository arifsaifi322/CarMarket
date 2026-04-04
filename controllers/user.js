const User = require("../models/user.js");

module.exports.signupLink = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async(req,res)=>{
   try {
    let {username,email,password} = req.body;
    const newUser = new User({email,username});
    let registeredUser = await User.register(newUser,password);
    // console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if (err) {
            return next(err);
        }
        req.flash("success","Welcome back to WonderLust ");
        res.redirect("/home")
    });
   } catch (error) {
    req.flash("errorr",error.message);
    res.redirect("/signup");
   }
}

module.exports.loginLink = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = 
    async(req,res)=>{
   
        req.flash("success","Welcome back to WonderLust ");
        let redirectedUrl = res.locals.redirectUrl || "/home";
        res.redirect(redirectedUrl);
    
}

module.exports.logout = (req,res)=>{
        req.logOut((err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Logout Successfully!");
            res.redirect("/home");
        })
    }