// Filename : user.js

const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");

console.log('made it to auth router')

const user_controller = require('../../controllers/user.controller');

router.post(
    '/signup',
    [
        check("firstName", "Please Enter a Valid First Name"),
        check("lastName", "Please Enter a Valid Last Name")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    user_controller.signup
);

router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    user_controller.login
);

router.get("/me", auth, user_controller.loggedInUser);
  



module.exports = router;
