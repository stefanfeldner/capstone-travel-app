const handleEvent = async (submitButton) => {
    
    // // Create a new date instance dynamically with JS
    // let d = new Date();
    // let todaysDate = + d.getDate()+'.'+(d.getMonth()+1)+'.'+ d.getFullYear();

    // const calcDaysBetweenDates = () => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date();
        const secondDate = new Date(2020, 6, 23);

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        console.log('Days between: ' + diffDays);
    // }
    submitButton.addEventListener('click', event => {
        event.preventDefault();
        // getting form data
        const destination = document.getElementById('destination').value;
        const date = document.getElementById('date').value;

        console.log(date);

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
        postData('/sendFormData', {destination: destination, date: date});
    })
};

module.exports = { handleEvent };
