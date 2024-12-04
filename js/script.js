const API_KEY = "65ca0f7800e735990f1aa43561f4a035"; // API Key for accessing the OpenWeatherMap API
const form = document.getElementById("weatherForm");
const weatherOutput = document.getElementById("weatherOutput");

// Event listener for form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = document.getElementById("city").value.trim();

    // Check if the city field is empty
    if (!city) {
        weatherOutput.innerHTML = `<p style="color:red;">Please enter a city name.</p>`;
        weatherOutput.style.display = "block";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},ca&appid=${API_KEY}&units=metric`
        );

        // Check if the response is not OK
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "City not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherOutput.innerHTML = `<p style="color:red;">${error.message}</p>`;
        weatherOutput.style.display = "block";
    }
});

// Function to display the weather data on the page
function displayWeather(data) {
    const { name, main, weather } = data;
    weatherOutput.innerHTML = `
        <h2>🌎 Weather in ${name}</h2>
        <p><span>🌡️ Temperature:</span> ${main.temp}°C</p>
        <p><span>💧 Humidity:</span> ${main.humidity}%</p>
        <p><span>🌤️ Condition:</span> ${weather[0].description}</p>
    `;
    weatherOutput.style.display = "block"; // Make sure the weather output is visible
}
