const search = document.getElementById('search-box');
const APIkey = "0051d34aae165f7b85c25157dcd89368";

search.addEventListener('click', () => {
    const city = document.getElementById('search-box-input').value; 

    if (city === '') {
        return; 
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            const temperature = document.getElementById('temperature');
            const description = document.getElementById('description');
            const humidity = document.getElementById('Humidity');
            const wind = document.getElementById('Wind');

            
            temperature.textContent = `${Math.round(json.main.temp)}°C`;
            description.textContent = json.weather[0].description;
            humidity.querySelector('h3').textContent = `${json.main.humidity}%`;
            wind.querySelector('h3').textContent = `${Math.round(json.wind.speed)} Km/h`;

          
            const weatherImages = ['clear', 'cloud', 'mist', 'rain', 'snow'];
            weatherImages.forEach(imgId => document.getElementById(imgId).classList.add('hidden')); 

            let weatherCondition = json.weather[0].main.toLowerCase(); 

           
            if (document.getElementById(weatherCondition)) {
                document.getElementById(weatherCondition).classList.remove('hidden'); 
            } else {
                document.getElementById('clear').classList.remove('hidden'); 
            }
        });
});
