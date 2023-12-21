
        async function getWeather() {
            const apiKey = '233d8c475be26717c7d7d17a2362bc7d';
            const cityInput = document.getElementById('cityInput').value;
            const weatherInfoDiv = document.getElementById('weatherInfo');
            const weatherIconsDiv = document.getElementById('weatherIcons');
            const additionalInfoDiv = document.getElementById('additionalInfo');
        
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`);
                const data = await response.json();
        
                if (data.cod !== '404') {
                    const weatherDescription = data.weather[0].description;
                    const temperature = (data.main.temp - 273.15).toFixed(2);
                    const cityName = data.name;
                    const windSpeed = data.wind.speed;
                    const humidity = data.main.humidity;
        
                    const weatherInfo = `<p class="fade-in">Weather in ${cityName}: ${weatherDescription}</p>
                                         <p class="fade-in">Temperature: ${temperature} °C</p>
                                         <p class="fade-in">Wind Speed: ${windSpeed} m/s</p>
                                         <p class="fade-in">Humidity: ${humidity}%</p>`;
        
                    weatherInfoDiv.innerHTML = weatherInfo;
        
                    // Display weather icons
                    const weatherIconCode = data.weather[0].icon;
                    const weatherIconURL = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
                    const weatherIcon = `<img src="${weatherIconURL}" alt="Weather Icon" class="fade-in">`;
                    weatherIconsDiv.innerHTML = weatherIcon;
        
                    // Display additional weather info
                    const windIconURL = 'https://img.icons8.com/material/96/000000/wind.png';
                    const humidityIconURL = 'https://img.icons8.com/ios/50/000000/humidity.png';
                    const windIcon = `<img src="${windIconURL}" alt="Wind Icon" class="fade-in">`;
                    const humidityIcon = `<img src="${humidityIconURL}" alt="Humidity Icon" class="fade-in">`;
        
                    const additionalInfo = `<p class="fade-in">Wind Speed: ${windSpeed} m/s ${windIcon}</p>
                                             <p class="fade-in">Humidity: ${humidity}% ${humidityIcon}</p>`;
                    
                    additionalInfoDiv.innerHTML = additionalInfo;
                } else {
                    weatherInfoDiv.innerHTML = '<p class="fade-in">City not found. Please enter a valid city name.</p>';
                    weatherIconsDiv.innerHTML = '';
                    additionalInfoDiv.innerHTML = '';
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                weatherInfoDiv.innerHTML = '<p class="fade-in">Unable to fetch weather data. Please try again.</p>';
                weatherIconsDiv.innerHTML = '';
                additionalInfoDiv.innerHTML = '';
            }
        }
        