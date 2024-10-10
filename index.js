const search = document.getElementById('search-box');
const APIkey = "0051d34aae165f7b85c25157dcd89368";
const weatherIcon = document.createElement('img'); // Create an img element for the weather icon
const imagesContainer = document.getElementById('Images'); // Get the images container

search.addEventListener('click', () => {
    const city = document.getElementById('search-box-input').value.trim(); // Get the value correctly

    if (city === '') {
        return; // Return if the input is empty
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(data => {
            const temperature = document.getElementById('temperature');
            const description = document.getElementById('description');
            const humidity = document.getElementById('Humidity');
            const wind = document.getElementById('Wind');

            // Set the weather data
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;
            humidity.textContent = `${data.main.humidity}%`;
            wind.textContent = `${Math.round(data.wind.speed)} Km/h`;

            // Clear any existing image
            imagesContainer.innerHTML = ''; // Clear previous images

            // Set the weather condition and icon
            let weatherCondition = data.weather[0].main.toLowerCase();
            weatherIcon.src = `images/${weatherCondition}.png`; // Set the icon source based on the condition
            weatherIcon.alt = weatherCondition; // Set alt text for accessibility
            weatherIcon.classList.add('w-45'); // Add any necessary classes for styling
            imagesContainer.appendChild(weatherIcon); // Append the icon to the images container
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // You can handle errors here, e.g., showing an error message to the user
        });
});
