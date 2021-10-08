// Filename : forms.js
const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();

console.log('made it to forms router')

const forms_controller = require('../../controllers/forms.controller');

router.get(
    "/details",
    forms_controller.formDetails
)

router.get(
  "/user_form_list/:userId",
  forms_controller.addForm
);


router.post(
    "/add_form",
    forms_controller.addForm
);
  

module.exports = router;
