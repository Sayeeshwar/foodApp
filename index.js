
const express = require("express"); //stores reference to express module
const app = express();//instantiates express object
const cors = require("cors"); //imports cors module for cross origin requests
const path = require("path"); //imports path to work with file paths and directories
const multer = require("multer");//imports multer middleware for uploading files
const mongoose = require("mongoose");//imports mongoose odm to use js to interact with mongodb

const bodyParser = require("body-parser");//used to extract body of request and expose it on req.body

const bcrypt = require("bcrypt");//library module to hash passwords before storing

const passport = require("passport");//module to help authenticate requests through various "strategies"- in this app, users on login
const LocalStrategy = require("passport-local").Strategy;//uses local method instead of e.g facebook login, to validate users

const session = require("express-session");//creates session middleware to create and work with sessions when users log in and out

const http = require("http"); //module for creating servers
const server = http.createServer(app); //creates a server object using http module binding it to the express app object
const io = require("socket.io")(server);//uses server created  and binds it with imported socket.io module to create io object for communication

app.use(cors());//executes cors code before executing further code
app.use(bodyParser.urlencoded({ extended: false })); //to parse only form data and not json data from post requests

app.use(express.static("./public/images"));//sets the default folder path to access files


//sets header attributes to allow cors requests
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});


//stores sessions inside MongoStore
const MongoStore = require("connect-mongo")(session);
//uses config details from .env file
require("dotenv").config();


//once socket io connects and socket disconnects
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("newDonation",()=>{
    console.log("New donation made!")
    socket.broadcast.emit('newDonation',{msg:"hi"})
  })
  socket.on("message",(message)=>{
    console.log("Incoming message: ",message)
    io.emit('message',message)
  })
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

//import DB schemas into variables
const User = require("./userSchema");
const Donation = require("./donationSchema");

//DB init and connects to local mongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://sai:sai1234@foodapp.59ugq.mongodb.net/<dbname>?retryWrites=true&w=majority" || "mongodb://localhost/appDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection; //uses db as cursor to mongoose DB connection 
db.on("error", console.error.bind(console, "connection error: "));//error handling
//on connecting, display success message
db.once("open", () => {
  console.log("DB connected");
});

const sessionStore = new MongoStore({//creates MongoStore obj to store sessions in sessionStore
  mongooseConnection: db,//database reference
  collection: "sessions",//db collection to store sessions
});

//Passport config

const customFields = {
  usernameField: "email",//uses username field called email
};

//takes 3 parameters - username , password and done function to handle the different outcomes
const VerifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username }); //queries db to check if user already exists in system

    if (!user) {
      console.log("no such user");
      return done(null, false);//if user doesn't exist, done function gets null and false to show that validation failed
    }
    if (await bcrypt.compare(password, user.password)) {
      console.log("login success");
      return done(null, user);//if hashed pw and given pw match, done func. gets null and user data to show that validation is successful
    } else {
      console.log("wrong pw");
      return done(null, false);//this condition shows that password is wrong since user exists but passwords don't match
    }
  } catch (err) {
    done(err);//err shown if any error occurs
  }
};

const strategy = new LocalStrategy(customFields, VerifyCallback);//localstrategy configured with customfields and the verification function given above

passport.use(strategy);//uses the strategy instantiated above

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    user = await User.findById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: process.env.SECRET,//uses secret key from .env
    resave: false,
    saveUninitialized: true,
    store: sessionStore,//defines where to store
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,//expires after a month
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    console.log("logged in user is: ",req.session.passport.user);
    res.redirect("/welcome");
  }
);

//logout
app.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

app.get("/isLoggedin", (req, res) => {
  try {
    if (req.user) {
      res.json({ isLoggedin: "1", user: req.user });
    } else {
      res.json({ isLoggedin: "0" });
    }
  } catch {
    res.json({ isLoggedin: "0" });
  }
});

//Sign up route
app.post("/signup", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      console.log(
        "user exists already with this email. Choose another email to register!",
        userExists
      );
      return res.redirect("/");
    }

    const hashPassword = await bcrypt.hash(req.body.pwd, 10);
    user = new User({
      username: req.body.uname,
      password: hashPassword,
      email: req.body.email,
      phone: req.body.phno,
      age: req.body.age,
    });
    const savedUser = await user.save();
    console.log("New user: ",savedUser);
  } catch (error) {
    console.log("Error in adding user: ", error);
  }

  return res.redirect("/welcome");
});

app.post("/add", async (req, res) => {
  try {
    console.log("donation from: ",req.user.username)
    donation = new Donation({
      donorName: req.user.username,
      donorPic:req.user.profile_pic,
      donorEmail:req.user.email,
      latLocation: req.body.lat,
      longLocation: req.body.longt,
      dishName: req.body.dishName,
      isVeg: req.body.isVeg,
      quantity: req.body.quantity,
      expiry: req.body.expiry,
      isDonorVerified: req.user.isDonorVerified,
      donorRating: req.user.donorRating,
      isAvailable: true,
      givenTo:"",
      listOfUsersInterested:[]
    });
    const savedDonation = await donation.save();
    console.log("Donation of ",savedDonation.dishName," has been added");
  } catch (err) {
    console.log("Error adding donation to system: ",err);
  }
  return res.redirect("/");
});

app.get("/getFood",async (req, res) => {
  let donations = await Donation.find().sort({donationTime:-1})
  return res.json({donation:donations})


})

if(process.env.NODE_ENV=="production"){
  app.use(express.static('./frontend/build'))
}
server.listen(5000 || process.env.PORT, () => {
  console.log("Server listening on port 5000");
});
