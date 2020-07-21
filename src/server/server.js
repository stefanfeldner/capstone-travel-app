// Express to run server and routes
const express = require('express');
// Fetch for node to fetch API data
const fetch = require('node-fetch');

// Start up an instance of app
const app = express();

// Use path to work with files and directory paths
const path = require('path');

// Dependencies
const bodyParser = require('body-parser');
// Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
// connects the server-side code to our client-side code
app.use(express.static('dist'));

const dotenv = require('dotenv');
dotenv.config();

console.log('Geoname User: ' + process.env.geonameUser);

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

const username = process.env.geonameUser;

let formData = {};

app.post('/sendFormData', (req, res) => {
    formData = {
        destination: req.body.destination,
        date: req.body.date
    }
    console.log(formData, username);
    callGeonamesApi(createFetchLink(formData.destination, username));
});


// get the api username from the .env file and create the url to fetch the coordinates from
const createFetchLink = (destination) => {
    return `http://api.geonames.org/searchJSON?name=${destination}&maxRows=1&username=${username}`;
};

const callGeonamesApi = async (url) => {
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let geoData = {
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng
        }
        console.log('Lat: ' + geoData.lat + ' Lng: ' + geoData.lng);
    })
    .catch(error => console.log(err));
};