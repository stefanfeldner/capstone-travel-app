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

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8081, function () {
    console.log('Example app listening on port 8081!');
});

// using variables saved in .env file to protect them
const geonamesUsername = process.env.geonameUser;
const weatherbitApiKey = process.env.weatherbitApiKey;
const pixabayApiKey = process.env.pixabayApiKey;;

let formData = {};
let geoData = {};
let weatherData = {};
let pixabayData = {};

app.post('/sendFormData', async (req, res) => {
    formData = {
        destination: req.body.destination,
        daysBetweenDates: req.body.daysBetweenDates
    }
    // if the travel date is further away than the 16 days forecast, set it to 15 and show the last forecast
    if(formData.daysBetweenDates > 16) {
        formData.daysBetweenDates = 15;
    }
    console.log(formData);
    await callApi(createGeonamesFetchLink(formData.destination, geonamesUsername));
    res.status(200).send({msg: 'Data received'});
});

// create the fetch links
const createGeonamesFetchLink = (destination) => {
    return `http://api.geonames.org/searchJSON?name=${destination}&maxRows=1&username=${geonamesUsername}`;
};
const createWeatherbitFetchLink = (lat, lng) => {
    return `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitApiKey}&lat=${lat}&lon=${lng}`;
};

const createPixabayFetchLink = (destination) => {
    return `https://pixabay.com/api/?key=${pixabayApiKey}&q=${destination}&image_type=photo&orientation=horizontal&min_width=1920`;
}

// function to fetch from different apis
const callApi = async url => {

    try {
        await fetch(url)
        .then(res => res.json())
        .then(async data => {
            // console.log(data);
            // check if we called geonames
            if('geonames' in data) {
                geoData = {
                    lat: data.geonames[0].lat,
                    lng: data.geonames[0].lng
                }
                console.log('Lat: ' + geoData.lat + ' Lng: ' + geoData.lng);
                await callApi(createWeatherbitFetchLink(geoData.lat, geoData.lng))
            }
            // check if we called weatherbit
            if('city_name' in data) {
                // console.log(data);
                console.log('DAYS BETWEEN DATES: ' + formData.daysBetweenDates)
                weatherData = {
                    // use the daysBetweenDates to find the weather of the planned day (-1 because arrays start at 0)
                    averageTemp: data.data[formData.daysBetweenDates].temp,
                    minTemp: data.data[formData.daysBetweenDates].min_temp,
                    maxTemp: data.data[formData.daysBetweenDates].max_temp,
                    iconCode: data.data[formData.daysBetweenDates].weather.icon,
                    tripLength: formData.daysBetweenDates
                }
                console.log(weatherData);
                await callApi(createPixabayFetchLink(formData.destination));
            }
            if('hits' in data) {
                pixabayData = {
                    imageUrl: data.hits[0].largeImageURL
                }
                console.log(pixabayData);
            }
        })
    } catch(err) {
        console.log('Error: ' + err);
    }
}

// GET data after the last fetch
app.get('/getData', (req, res) => {
    // sending data
    res.status(200).send([
        weatherData,
        pixabayData
    ]);
    console.log('SEND DATA');
});

module.exports = app;