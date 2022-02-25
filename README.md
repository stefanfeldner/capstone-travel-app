# Travel Planner Application

This app combines all the knowledge gained from my learning experience at Udacity.

It's a travel and weather application, combining the data from 3 different APIs to show the weather forecast, an image of the destination, and the geolocation.

All of it is running asynchronously and with webpack and service workers installed.

## Built With

- JS / HTML / CSS
  
- [Webpack](https://webpack.js.org/)
  
- [Node.JS](https://nodejs.org/en/)
  
- [Express.JS](https://expressjs.com/)
  
- [Geonames API](https://www.geonames.org/) - Coordinates for the weather API
  
- [Pixabay API](https://pixabay.com/de/) - Image source
  
- [Weatherbit API](https://www.weatherbit.io/) - Weather forecast
  

## Getting Started

To get this project up and runnig locally you can follow these instructions.

### Installation & Prerequisites

1. Get a free API Key at [http://www.geonames.org/](GeoNames)
  
2. Get a free API Key at [https://pixabay.com/](PixaBay)
  
3. Get a free API Key at [https://www.weatherbit.io/](Wheaterbit)
  
4. Clone the repo
  
  ```sh
  git clone https://github.com/stefanfeldner/capstone-travel-app.git
  ```
  
5. Install NPM packages
  
  ```sh
  npm install
  ```
  
6. Create a `.env` file in the root folder and add your API Keys and the Port you want to use
  
  ```js
  geonameUser = "##########################"
  weatherbitApiKey = "##########################"
  pixabayApiKey = "##########################"
  PORT = "8000"
  ```
  
7. Run `npm run start` to start the server.
  

## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

Stefan Feldner
