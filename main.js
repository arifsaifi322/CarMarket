if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  // console.log(process.env.secret);
}


const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const {listingSchema ,reviewSchema} = require("./schema.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport")
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const userRouter = require("./routes/user.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const bookings = require("./routes/bookings.js");
const app = express();


// let mongoUrl = "mongodb://127.0.0.1:27017/AirBnB";

// let mongoUrl = process.env.ATLAS_DB;
let dbUrl = process.env.ATLAS_DB   
// let mongoUrl = mongoAtlasUrl;

app.engine("ejs",ejsMate);
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));


const store = MongoStore.create({
  mongoUrl : dbUrl,
  crypto : {
    secret : process.env.SECRET
  },
  touchAfter : 24*3600,
})

store.on("error",(err) => {
  console.log("Error in mongo Session store", err);
});

const sessionOptions = {
  store : store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7*24*60*60*1000,
  }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.errorr = req.flash("errorr");
  res.locals.currUser = req.user;
  next();
})

// app.use((err, req, res, next) => {
//   console.log("This is error:", err);
//   req.flash("error", err.message);   // ✅ correct place for flash
//   res.redirect("back");              // or render an error page
// });


// app.get("/demouser",async(req,res)=>{
//   let fakeUser = new User({
//     email : "abcd@gmail.com",
//     username : "abcd"
//   });
//     let registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// })


app.use("/home", listings);
app.use("/home/:id/review", reviews);
app.use("/home", bookings);
app.use("/",userRouter);


let port = 8080;
app.listen(port,()=>{
    console.log("App's Running on port : ",port);
})


// <==================================(Monog db)=================================> 
main()
.then((res)=>{
    console.log("Connection Sucessfull")
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dbUrl);
}

// async function main() {
//   try {
//     await mongoose.connect(mongoUrl, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 10000,
//     });
//     console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//   }
// }



// <=============================================================================>

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);  

  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);  
  } else {
    next();  
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema .validate(req.body);  

  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);  
  } else {
    next();  
  }
};




// // Error handeling 
// app.use((err,req,res,next)=>{
//     console.log("This is error  : ", err);
//     req.flash(err.message || "Something went wrong!");
//     res.redirect("/home.ejs");
//     next();
// })



// <-------------------------------------------apis----------------------------------------->




// app.get("/list/:id", async (req, res) => {
//     try {
//         let { id } = req.params;

//         // Use findById (short & safe)
//         let data = await List.findById(id);

//         if (!data) {
//             return res.status(404).send("List not found");
//         }

//         res.render("one.ejs", { data });

//     } catch (err) {
//         console.error("Error fetching single list:", err);
//         res.status(500).send("Server Error");
//     }
// });


// app.get("/list/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const list = await list.findById(id);

//         if (!list) {
//             return res.status(404).send("List not found");
//         }

//         // if you want to render an EJS page
//         res.render("show", { list });

//         // or if it's API only:
//         // res.json(list);

//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).send("Server Error");
//     }
// });


// app.get("/testing",(req,res)=>{
    
//     let l1 = new list ({
//         title : "My new Villa",
//         description : "by the beach",
//         price : 1200,
//         location : "Aicher",
//         country : "India"
//     })
//     l1.save()
//     .then((res)=>{
//         console.log(res)
//     })
//     .catch()
//     console.log(l1);
// })