// index.js
import "./main.css";
import { polyglot } from "./polyglot";
import { DateTime } from "luxon";

polyglot();

function getTimeInTimeZone(timeZone) {
  return DateTime.now().setZone(timeZone).toFormat("HH:mm");
}

function updateVolgogradTime() {
  const getVolgogradTime = getTimeInTimeZone("Europe/Volgograd");
  const timeValueElement = document.querySelector(
    "#volgograd-time .time-value",
  );

  if (timeValueElement) {
    timeValueElement.innerText = getVolgogradTime;
  } else {
    console.error(
      "Элемент с классом 'time-value' внутри '#volgograd-time' не найден.",
    );
  }

  const localTimeElement = document.querySelector("#volgograd-time .time");
  if (localTimeElement) {
    localTimeElement.dataset.translate = "localTime";
  }

  const volgogradWeatherElement = document.querySelector("#cityTemp .weather");
  if (volgogradWeatherElement) {
    volgogradWeatherElement.dataset.translate = "weather";
  }

  const weatherWordElement = document.querySelector("#cityTemp .weather");
  if (weatherWordElement) {
    weatherWordElement.dataset.translate = "weather";
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
    const weatherText = `${temperatureCelsius}°C`;

    const weatherValueElement = document.querySelector(
      "#cityTemp .weather-value",
    );
    if (weatherValueElement) {
      weatherValueElement.textContent = weatherText;
    }

    const volgogradWeatherElement =
      document.querySelector("#cityTemp .weather");
    if (volgogradWeatherElement) {
      volgogradWeatherElement.dataset.translate = "volgograd";
    }

    const weatherWordElement = document.querySelector("#cityTemp .weather");
    if (weatherWordElement) {
      weatherWordElement.dataset.translate = "weather";
    }

    console.log(`Погода в Волгограде: ${temperatureCelsius}°C`);
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
  }
}

getVolgogradWeather(latitude, longitude);

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const hotelNav = document.querySelector(".hotel-nav");

  hotelNav.classList.remove("open");

  menuToggle.addEventListener("click", () => {
    hotelNav.classList.toggle("open");
    menuToggle.classList.toggle("open"); //  Добавляем/удаляем класс open к menuToggle
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const bookingButtonMobile = document.querySelector(".booking-button-mobile");

  if (bookingButtonMobile) {
    bookingButtonMobile.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "http://www.hiltoneasteurope.com";
    });
  } else {
    console.error("Элемент .booking-button-mobile не найден!");
  }
});
