const express = require("express");
const router = express.Router();
const User = require("../models/user.js");


//Expreess- validator
const { body, validationResult } = require("express-validator");

// For hashing and password securuty
const bcrypt = require("bcryptjs");

// JWT token for authentictaion
var jwt = require("jsonwebtoken"); //impoert jwt

// imort fetuser from middlewre which is used in Route 3 for get userinfo.
var fetchuser = require("../middleware/fetchuser.js")
const JWT_SECRET = "Shubhisa$comder"; //secret

//ROUTE 1 : post request : Create a user using : POST "/api/auth/createuser".No login required. 
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "password must be atleast 5 character").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    // console.log(req.body); //req    content print

    // const user = User(req.body);
    // user.save();
    let success = false;
    //if there are errrors ,  return Bad request and errrors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // check whether the user with same email email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry user with same email already exist" });
      }

      const salt = await bcrypt.genSalt(10); //it is also returning a promise , so we use hash here
      const secPass = await bcrypt.hash(req.body.password, salt); // hashing to our password, We make it await because internaly it return promise to us

      // Create a new user
      user = await User.create({
        name: req.body.name,
        // password: req.body.password, // This is not beneficial for security purpose because here we directly store pass into our database
        password: secPass,
        email: req.body.email,
      });

      // .then((user) => res.json(user))
      // .catch((err) => {
      //   console.error("Error creating user:", err);
      //   res
      //     .status(500)
      //     .json({
      //       error: "Please enter a unique value for email",
      //       message: err.message,
      //     });
      // });

      // res.send(req.body); // send request
      //this is now not newde becoz we already done res.json

      // cretee data for token . We made token using jwt.sign() whch requires data and secret
      const data = {
        user: {
          id: user.id,
        },
      };

      //JWT_SECRET help us to see whether someone (hacker) change our data or not
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(authtoken);

      // res.json(user);
      success=true
      res.json({ success,authtoken }); // here we send token (hashID) in response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error  occur ");
    }
  }
);

// ROUTE 2 : post request : Authenticate  a user using : POST "/api/auth/login".No login required.
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring ofemail and password

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // finding a user with that email

      if (!user) {
        // means if that user does not exist
        success=false;  
        return res
          .status(400)
          .json({ error: "Pleease try to login with correct credentials" });
      }

      //Means here we are try to compare whethr the password that user enter is correct withh mail or not. If mail exidt.
      const paasswordCompare = await bcrypt.compare(password, user.password);
      if (!paasswordCompare) {
        success=false;
        return res
          .status(400)
          .json({ success,error: "Pleease try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      // If all Credentials are correct

      //JWT_SECRET help us to see whether someone (hacker) change our data or not
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(authtoken);
      // res.json(user);
      success=true;
      res.json({success, authtoken }); // here we send token (hashID) in response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error  occur ");
    }
  }
);

// ROUTE 3 : Get logged in User Details using : POST "/api/auth/getiser". Login required.
// Middleware ek functiin h jo ki call kia jaaega , jb bhi loginrewuired waale jo routes h un par request bheji jaaegi
// Here fetchuser is a middleware 
router.post(
  "/getuser",fetchuser ,async(req, res) => {
    try {
      userId = req.user.id;  //We get our user from req.user an we get our id from req.user.id;
      const user = await User.findById(userId).select("-password"); //User ki id ki help se saara data nikalna except password 
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error  occur ");
    }
  }
);
module.exports = router;
