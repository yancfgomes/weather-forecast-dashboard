// Selecionar elementos do DOM
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");
const favoritesList = document.getElementById("favorites-list");

// API Configuration
const apiKey = "58bf37a765fc8cff4b58574f0bdfe7d8"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Função para buscar dados da API
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        alert(error.message);
    }
}
// Função para atualizar informações climáticas no DOM
function updateWeatherInfo(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;

    // Atualizar o ícone
    const iconCode = data.weather[0].icon;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`;
}

// Event Listener para botão de busca
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
        cityInput.value = ""; // Limpar o campo de entrada
    } else {
        alert("Please enter a city name");
    }
});
// Função para adicionar cidade aos favoritos
function addFavorite(city) {
    const listItem = document.createElement("li");
    listItem.textContent = city;

    // Botão para remover favorito
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        favoritesList.removeChild(listItem);
    });

    listItem.appendChild(removeButton);
    favoritesList.appendChild(listItem);
}

// Event Listener para adicionar cidade favorita ao clicar no botão de busca
searchButton.addEventListener("click", () => {
    const city = cityName.textContent;
    if (city && !Array.from(favoritesList.children).some(li => li.textContent.includes(city))) {
        addFavorite(city);
    }
});