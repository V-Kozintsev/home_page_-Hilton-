// index.js
import "./main.css";
import { DateTime } from "luxon";

document.addEventListener("DOMContentLoaded", () => {
  const langLinks = document.querySelectorAll(".lang-link");
  const translatableElements = document.querySelectorAll("[data-translate]");

  // Объект с переводами (полный пример)
  const translations = {
    ru: {
      copyright: "© 2025. Все права защищены.",
      welcome: "Добро пожаловать в отель Hampton Volgograd",
      main: "ГЛАВНАЯ",
      rooms: "НОМЕРА",
      gallery: "ГАЛЕРЕЯ",
      specialOffers: "СПЕЦ ПРЕДЛОЖЕНИЯ",
      events: "МЕРОПРИЯТИЯ",
      services: "УСЛУГИ",
      attractions: "ДОСТОПРИМЕЧАТЕЛЬНОСТИ",
      contacts: "КОНТАКТЫ",
      bookNow: "Забронировать",
      cozyRooms: "Уютные номера",
      organizationPerformance: "Организация мероприятий",
      hotelGallery: "Галерея отеля",
      whatToVisit: "Что посетить в Волгограде",

      weather: "ПОГОДА",
      volgograd: "ВОЛГОГРАД",
      hotelDescription:
        "Hampton by Hilton Volgograd Profsoyuznaya - это современный отель, который предоставляет свои услуги путешественникам, ценящим качество за разумные деньги.",
      exceedingExpectations: "Hampton by Hilton - Превосходя ожидания.",
      localTime: "МЕСТНОЕ ВРЕМЯ",
      weatherVolgograd: "ПОГОДА ВОЛГОГРАД",
    },
    en: {
      copyright: "© 2025. All rights reserved.",
      welcome: "Welcome to Hampton Volgograd Hotel",
      main: "MAIN",
      rooms: "ROOMS",
      gallery: "GALLERY",
      specialOffers: "SPECIAL OFFERS",
      events: "EVENTS",
      services: "SERVICES",
      attractions: "ATTRACTIONS",
      contacts: "CONTACTS",
      bookNow: "Book Now",
      cozyRooms: "Cozy Rooms",
      organizationPerformance: "Organization of events",
      hotelGallery: "Hotel Gallery",
      whatToVisit: "What to visit in Volgograd",
      localTime: "LOCAL TIME",
      weatherVolgograd: "WEATHER VOLGOGRAD",
      weather: "WEATHER",
      volgograd: "VOLGOGRAD",
      hotelDescription:
        "Hampton by Hilton Volgograd Profsoyuznaya is a modern hotel that provides its services to travelers who value quality for reasonable money.",
      exceedingExpectations: "Hampton by Hilton - Exceeding expectations.",
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

    // Дополнительно: Обновление атрибутов (например, alt у изображений)
    document.querySelectorAll("[data-translate-alt]").forEach((element) => {
      const key = element.dataset.translateAlt;
      if (translations[lang] && translations[lang][key]) {
        element.alt = translations[lang][key];
      }
    });

    // Сохраняем язык в localStorage
    localStorage.setItem("selectedLanguage", lang);
  }

  // Обработчики кликов на ссылки языков
  langLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Предотвращаем переход по ссылке
      const lang = link.dataset.lang;
      changeLanguage(lang);
    });
  });

  // При загрузке страницы проверяем, есть ли сохраненный язык в localStorage
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage) {
    changeLanguage(savedLanguage);
  } else {
    // Если язык не сохранен, устанавливаем язык по умолчанию (например, русский)
    changeLanguage("ru");
  }
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

  //Обновляем текст "МЕСТНОЕ ВРЕМЯ"
  const localTimeElement = document.querySelector("#volgograd-time .time");
  if (localTimeElement) {
    localTimeElement.dataset.translate = "localTime";
  }

  //Обновляем текст "Волгоград" в погоде
  const volgogradWeatherElement = document.querySelector("#cityTemp .weather");
  if (volgogradWeatherElement) {
    volgogradWeatherElement.dataset.translate = "weather";
  }

  //Обновляем текст "Погода" в погоде
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
    const weatherText = `${temperatureCelsius}°C`; // Только температура

    const weatherValueElement = document.querySelector(
      "#cityTemp .weather-value",
    );
    if (weatherValueElement) {
      weatherValueElement.textContent = weatherText;
    }

    //Обновляем текст "Волгоград" в погоде
    const volgogradWeatherElement =
      document.querySelector("#cityTemp .weather");
    if (volgogradWeatherElement) {
      volgogradWeatherElement.dataset.translate = "volgograd";
    }

    //Обновляем текст "Погода" в погоде
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

  //  Изначально закрываем меню
  hotelNav.classList.remove("open");

  menuToggle.addEventListener("click", () => {
    hotelNav.classList.toggle("open");
  });
});
