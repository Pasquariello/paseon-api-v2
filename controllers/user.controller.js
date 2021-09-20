const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult} = require("express-validator");
const User = require("../models/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
exports.signup = async function (req, res){ 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new User({
            firstName,
            lastName,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token,
                    user: {
                        id: user.id,
                        firstName,
                        lastName,
                        email,
                    }
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
}


/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
exports.login = async function (req, res){ 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
}


/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */


exports.loggedInUser = async function (req, res){ 
    try {
      // request.user is getting fetched from Middleware after token authentication
      const { firstName, lastName, email, _id } = await User.findById(req.user.id);

      res.json({
        firstName, lastName, email, id: _id
      });
    } catch (e) {
      console.log(e)
      res.send({ message: "Error in Fetching user" });
    }
}



// https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i