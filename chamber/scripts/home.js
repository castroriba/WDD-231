// --- Configuration ---
// UPDATED WITH YOUR API KEY AND KAMPALA COORDINATES
const WEATHER_API_KEY = "5588c195e6b3a730fe86594ef81462d8"; 
const KAMPALA_LAT = 0.3476;
const KAMPALA_LON = 32.5825;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${KAMPALA_LAT}&lon=${KAMPALA_LON}&units=imperial&appid=${WEATHER_API_KEY}`;
const MEMBER_DATA_URL = 'data/members.json';

// --- DOM Selectors ---
const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherIcon = document.querySelector('#weather-icon');
const forecastOutput = document.querySelector('#forecast-output');
const spotlightsContainer = document.querySelector('#spotlights-container');

// --- Helper Functions ---
const capitalize = (s) => s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
const toDayOfWeek = (timestamp) => new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });


// --- 1. Weather Fetch & Display ---
async function getWeatherData() {
    try {
        const response = await fetch(FORECAST_URL);
        const data = await response.json();
        
        // Find current temp from the first entry
        const currentData = data.list[0];
        currentTemp.textContent = `${currentData.main.temp.toFixed(0)}°F`;
        
        // Display current weather condition
        const desc = currentData.weather[0].description;
        weatherDesc.textContent = capitalize(desc);
        const iconCode = currentData.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = capitalize(desc);

        // Filter and display 3-day forecast
        const forecastList = data.list;
        let threeDayForecast = [];
        const today = new Date().getDay();

        // Get the forecast for the next 3 unique days, targeting a consistent time (or the closest)
        for (let i = 0; i < forecastList.length; i++) {
            const entry = forecastList[i];
            const entryDate = new Date(entry.dt * 1000);
            
            // Check if it's a new day (not today) and if the array is empty or the day is unique
            if (entryDate.getDay() !== today) {
                 if (threeDayForecast.length === 0 || threeDayForecast.every(f => f.date.getDay() !== entryDate.getDay())) {
                    threeDayForecast.push({
                        date: entryDate,
                        temp: entry.main.temp.toFixed(0),
                        icon: entry.weather[0].icon,
                    });
                }
            }
            if (threeDayForecast.length === 3) break;
        }

        // Render the forecast HTML
        forecastOutput.innerHTML = threeDayForecast.map(f => `
            <div class="forecast-day">
                <p><strong>${toDayOfWeek(f.date.getTime() / 1000)}</strong></p>
                <img src="https://openweathermap.org/img/wn/${f.icon}.png" alt="Forecast icon">
                <p>${f.temp}°F</p>
            </div>
        `).join('');

    } catch (error) {
        console.error("Weather data failed to load:", error);
        // Display a user-friendly message if the API fails
        document.querySelector('#current-weather').innerHTML = '<p>Could not load live weather data.</p>';
    }
}

// --- 2. Spotlight Fetch & Display ---
async function displaySpotlights() {
    try {
        const response = await fetch(MEMBER_DATA_URL);
        const data = await response.json();
        const members = data.members;

        // 1. Filter for Gold or Silver members
        let eligibleMembers = members.filter(member => 
            member.membership_level === 'Gold' || member.membership_level === 'Silver'
        );

        // 2. Randomly select 3 members (or fewer if less are eligible)
        let spotlights = [];
        const numSpotlights = Math.min(3, eligibleMembers.length); 

        for (let i = 0; i < numSpotlights; i++) {
            const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
            spotlights.push(eligibleMembers.splice(randomIndex, 1)[0]); 
        }

        // 3. Render the spotlight cards
        spotlightsContainer.innerHTML = spotlights.map(member => `
            <section class="spotlight-card">
                <h3>${member.name}</h3>
                <img src="${member.imageurl}" alt="Logo of ${member.name}" loading="lazy">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a>
                <p class="level-tag">${member.membership_level} Member</p>
            </section>
        `).join('');

    } catch (error) {
        console.error("Spotlight data failed to load:", error);
        spotlightsContainer.innerHTML = '<p>Member spotlights failed to load.</p>';
    }
}

// --- Initialize Page ---
document.addEventListener('DOMContentLoaded', () => {
    getWeatherData();
    displaySpotlights();
});