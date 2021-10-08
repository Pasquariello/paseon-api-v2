const { validationResult} = require("express-validator");
const Form = require("../models/Form");

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */

exports.formDetails = async function (req, res){ 
    try {
      console.log('Hit formDetails')
      // request.user is getting fetched from Middleware after token authentication
      const formDetails = await Form.findById(req.formId);
        
      res.json(form);
    } catch (e) {
      console.log(e)
      res.send({ message: "Error in Fetching user" });
    }
}

exports.getUserForms = async function (req, res){ 
    try {
      const userId = req.query.userId
      // request.user is getting fetched from Middleware after token authentication
      const formList = await Form.find({user_id: userId }).select("_id, name,");
    
      console.log('formList', formList)
      res.json(formList);
    } catch (e) {
      console.log(e)
      res.send({ message: "Error in Fetching user" });
    }
}

exports.addForm = async function (req, res){ 
    try {
      console.log('Hit Add formDetails')
      console.log('req', req.body)
      const formDetails = req.body;
     
      const form = new Form({
          user_id: '1',
          name: 'new form dude',
          rows: formDetails.rows,
          columns: formDetails.columns
      })

      await form.save((err, form) => {
        if(err) return console.log(err)
        return res.json();
      })
      // request.user is getting fetched from Middleware after token authentication
        
      res.json(form);
    } catch (e) {
      console.log(e)
      res.send({ message: "Error in Fetching user" });
    }
}



// https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i