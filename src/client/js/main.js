const handleEvent = async (submitButton) => {

    submitButton.addEventListener('click', event => {
        event.preventDefault();
        handleSubmitData();
    })

    const handleSubmitData = async () => {
        // getting form data
        const destination = document.getElementById('destination').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        console.log(startDate, endDate);

        try {
            const [daysBetweenDates, tripLength] = calculateDaysBetweenDates(start, end);

            console.log('Days between dates: ' + daysBetweenDates);
            console.log('Trip Length: ' + tripLength);

            console.log('POSTING DATA TO SERVER');
            /* Function to POST data */
            const postData = async (url="", data = {}) => {
                console.log(data);
                const response = await fetch(url, {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // Body data type must match "Content-Type" header
                    body: JSON.stringify(data),
                });

                try {
                    const newData = await response.json();
                    return newData;
                } catch (error) {
                    console.log("Error: ", error);
                }
            };
            await postData('/sendFormData', {destination, startDate, endDate, tripLength, daysBetweenDates});
            console.log('GETTING DATA');
            getData('/getData');
        } catch (error) {
            alert(error);
        }
    };
};

// get the days between todays date and the travel date
const calcDaysBetweenDates = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date();
    const startDateFormat = new Date(startDate)
    const endDateDateFormat = new Date(endDate)
    const secondDate = new Date(startDate);

    // if secondDate lies in the past throw error
    if (firstDate > secondDate) {
        throw new Error('Choose a future date.');
    }

    // get the days between the days for the weather forecast
    let diffDays = Math.floor(Math.abs((firstDate - secondDate) / oneDay));
    // get the length of the trip
    let tripLength = Math.ceil(Math.abs((startDateFormat - endDateDateFormat) / oneDay));
    return [diffDays, tripLength];
};

const scrollToEntries = (scrollButton) => {
    scrollButton.addEventListener('click', () => {
        const mainSection = document.getElementById('main');
        mainSection.scrollIntoView();
    });
}

let uiData = {};

/*Function to GET data*/
const getData = async (url="") => {
    const response = await fetch(url, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        uiData.imageURL = data[1].imageUrl;
        uiData.avgTemp = data[0].averageTemp;
        uiData.maxTemp = data[0].maxTemp;
        uiData.minTemp = data[0].minTemp;
        uiData.iconCode = data[0].iconCode;

        console.log(uiData);
        updateUI(uiData.imageURL, uiData.avgTemp, uiData.maxTemp, uiData.minTemp, uiData.iconCode);
    }).catch(err => console.log(err));
};

const updateUI = (imageURL, avgTemp, maxTemp, minTemp, iconCode) => {
    const resultImage = document.getElementById('result_image');
    const resultIcon = document.getElementById('result_icon');
    const avgTempPlaceholder = document.getElementById('avg_temp');
    const maxTempPlaceholder = document.getElementById('max_temp');
    const minTempPlaceholder = document.getElementById('min_temp');
    const tripDuration = document.getElementById('trip_duration');

    resultImage.src = imageURL;
    resultIcon.src = `/weather_icons/${iconCode}.png`
    avgTempPlaceholder.textContent = avgTemp + '°C';
    maxTempPlaceholder.textContent = maxTemp + '°C';
    minTempPlaceholder.textContent = minTemp + '°C';
    tripDuration.textContent = tripLength + ' Days';
}

module.exports = {
    handleEvent,
    scrollToEntries,
    calcDaysBetweenDates
};