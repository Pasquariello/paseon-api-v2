const express = require('express');
const bodyParser = require('body-parser');
const InitiateMongoServer = require("./config/db");
const cors = require('cors');

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({credentials: true, origin: '*'}));

//Import  Routes
const user = require('./routes/api/user.route.js'); // Imports routes for the sendEmail
const forms = require('./routes/api/forms.routes.js'); // Imports routes for the sendEmail

//Use Routes
app.use('/user', user);
app.use('/forms', forms);




//dont need any more but hold for now
app.get('/', (req, res) => res.send('Entry Point'))


const port = process.env.PORT || 3001;

app.listen(port, () => {

    console.log(`Server is up and running on port: ${port}`);
});