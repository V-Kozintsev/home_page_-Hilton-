//index.js
import "./main.css";

import { DateTime } from "luxon";

function getTimeInTimeZone(timeZone) {
  return DateTime.now().setZone(timeZone).toFormat("HH:mm");
}

function updateVolgogradTime() {
  const getVolgogradTime = getTimeInTimeZone("Europe/Volgograd");
  const timeValueElement = document.querySelector(
    "#volgograd-time .time-value",
  ); // Находим элемент span с классом time-value

  if (timeValueElement) {
    timeValueElement.innerText = getVolgogradTime; // Вставляем время внутрь span.time-value
  } else {
    console.error(
      "Элемент с классом 'time-value' внутри '#volgograd-time' не найден.",
    );
  }
}

updateVolgogradTime();
setInterval(updateVolgogradTime, 60000);

const latitude = 48.707;
const longitude = 44.517;

async function getVolgogradWeather(latitude, longitude) {
  const apiKey = "f7f0f48145544647b19130539240210";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const temperatureCelsius = Math.round(data.current.temp_c);
    const weatherText = `${temperatureCelsius}°C`; // Только температура

    const weatherValueElement = document.querySelector(
      "#cityTemp .weather-value",
    );
    if (weatherValueElement) {
      weatherValueElement.textContent = weatherText;
    }

    console.log(`Погода в Волгограде: ${temperatureCelsius}°C`);
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
  }
}

getVolgogradWeather(latitude, longitude);

const menuToggle = document.querySelector(".menu-toggle");
const hotelNav = document.querySelector(".hotel-nav");

if (menuToggle && hotelNav) {
  menuToggle.addEventListener("click", () => {
    hotelNav.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });
} else {
  console.error("Элемент с классом 'menu-toggle' или 'hotel-nav' не найден.");
}
