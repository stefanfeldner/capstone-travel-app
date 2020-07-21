const handleEvent = async (submitButton) => {
    
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        // getting form data
        const destination = document.getElementById('destination').value;
        const date = document.getElementById('date').value;
        
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
