// Filename : forms.js
const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");


console.log('made it to forms router')

const forms_controller = require('../../controllers/forms.controller');

router.get(
    "/details/:formId",
    auth,
    forms_controller.formDetails
)

router.get(
  "/user_form_list/:userId",
  auth,
  forms_controller.getUserForms
);

router.delete(
  "/delete/:userId",
  auth,
  forms_controller.deleteOne
);


router.post(
    "/add_form/:userId",
    // auth,
    forms_controller.addForm
);
  

module.exports = router;
