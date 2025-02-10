//index.js
import "./main.css";

import { DateTime } from "luxon";

document.addEventListener("DOMContentLoaded", () => {
  const langLinks = document.querySelectorAll(".lang-link");
  const translatableElements = document.querySelectorAll("[data-translate]");

  // Пример объекта с переводами
  const translations = {
    ru: {
      copyright: "© 2025. Все права защищены.",
    },
    en: {
      copyright: "© 2025. All rights reserved.",
    },
  };

  // Функция для смены языка
  function changeLanguage(lang) {
    translatableElements.forEach((element) => {
      const key = element.dataset.translate;
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
  }

  // Обработчики кликов на ссылки языков
  langLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Предотвращаем переход по ссылке
      const lang = link.dataset.lang;
      changeLanguage(lang);
    });
  });
});

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

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const hotelNav = document.querySelector(".hotel-nav");

  //  Изначально закрываем меню
  hotelNav.classList.remove("open");

  menuToggle.addEventListener("click", () => {
    hotelNav.classList.toggle("open");
  });
});
