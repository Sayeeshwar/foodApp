const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const session = require("express-session");

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); //to parse only form data and not json data from post requests

app.use(express.static("./public"));

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

const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

//DB schemas
const User = require("./userSchema");
const Donation = require("./donationSchema");

//DB init
mongoose.connect("mongodb://localhost/appDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("DB connected");
});

const sessionStore = new MongoStore({
  mongooseConnection: db,
  collection: "sessions",
});

//Passport config

const customFields = {
  usernameField: "email",
};

const VerifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username });

    if (!user) {
      console.log("no such user");
      return done(null, false);
    }
    if (await bcrypt.compare(password, user.password)) {
      console.log("login success");
      return done(null, user);
    } else {
      console.log("wrong pw");
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(customFields, VerifyCallback);

passport.use(strategy);

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
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    console.log(req.session.passport.user);
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
      //console.log("user=>", req.user, req.session, "json response with 1");

      res.json({ isLoggedin: "1", user: req.user });
    } else {
      res.json({ isLoggedin: "0" });
    }
  } catch {
    console.log("catch block triggered json response with False");
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
    console.log(savedUser);
  } catch (error) {
    console.log("Error: ", error);
  }

  return res.redirect("/welcome");
});

app.post("/add", async (req, res) => {
  try {
    donation = new Donation({
      donorName: req.user.username,
      latLocation: req.body.lat,
      longLocation: req.body.longt,
      dishName: req.body.dishName,
      isVeg: req.body.isVeg,
      quantity: req.body.quantity,
      expiry: req.body.expiry,
      isDonorVerified: req.user.isDonorVerified,
      donorRating: req.user.donorRating,
    });
    const savedDonation = await donation.save();
    console.log(savedDonation);
  } catch (err) {
    console.log(err);
  }
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
