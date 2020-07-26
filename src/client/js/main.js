const handleEvent = async (submitButton) => {
    
    // // Create a new date instance dynamically with JS
    // let d = new Date();
    // let todaysDate = + d.getDate()+'.'+(d.getMonth()+1)+'.'+ d.getFullYear();

    // get the days between todays date and the travel date
    const calcDaysBetweenDates = (formDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date();
        const secondDate = new Date(formDate);
        
        // if secondDate lies in the past throw error
        if (firstDate > secondDate) {
            alert('Choose a future date.');
        }

        return diffDays = Math.ceil(Math.abs((firstDate - secondDate) / oneDay));
    };

    submitButton.addEventListener('click', event => {
        event.preventDefault();
        // getting form data
        const destination = document.getElementById('destination').value;
        const date = document.getElementById('date').value;

        console.log(date);
        const daysBetweenDates = calcDaysBetweenDates(date);

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
        postData('/sendFormData', {destination, date, daysBetweenDates});
        getData('/getData');
    })
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

        console.log(uiData.imageURL);
        updateUI(uiData.imageURL);
    }).catch(err => console.log(err));
};

const updateUI = (imageURL) => {
    const resultImage = document.getElementById('result_image');
    resultImage.src=imageURL;
}

module.exports = { 
    handleEvent,
    scrollToEntries
 };