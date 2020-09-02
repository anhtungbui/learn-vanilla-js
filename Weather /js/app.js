var apiKey = config.KEY;
const btnGetWeather = document.getElementById('btnGetWeather');
const inputCityName = document.getElementById('inputCityName');
const result = document.getElementById('result');
const weatherInfo = document.getElementById('weatherInfo');

btnGetWeather.addEventListener('click', () => {
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  const units = '&units=metric';
  const cityName = inputCityName.value;

  const url = apiUrl + `q=${cityName}` + units + apiKey;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const cardHeader = document.querySelector('.card-header');
      const cardTitle = document.querySelectorAll('.card-title');
      const cardText = document.querySelectorAll('.card-text');
      const weatherIcons = document.querySelectorAll('.fas');

      weatherInfo.classList.remove('d-none');

      cardHeader.innerText = cityName.toUpperCase();
      cardTitle[0].innerText = `${data.main.temp} °C`;

      // Main weather description
      cardTitle[1].innerText = `${data.weather[0].main}`;
      switch (cardTitle[1].innerText) {
        case 'Sunny':
        case 'Clear':
          weatherIcons[1].classList.remove('d-none');
          break;
        case 'Clouds':
          weatherIcons[0].classList.remove('d-none');
          break;
        case 'Rain':
          weatherIcons[2].classList.remove('d-none');
          break;
      }

      cardText[0].innerText = `Highest ${data.main.temp_max}`;
      cardText[1].innerText = `Lowest ${data.main.temp_min}`;

      inputCityName.value = '';
    });
});
