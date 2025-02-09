import "./main.css";
import { DateTime } from "luxon";

const getTimeInTimeZone = (timeZone) =>
  DateTime.now().setZone(timeZone).toFormat("HH:mm");

const updateVolgogradTime = () => {
  const timeValueElement = document.querySelector(
    "#volgograd-time .time-value",
  );
  if (!timeValueElement) {
    return console.error(
      "Элемент с классом 'time-value' внутри '#volgograd-time' не найден.",
    );
  }
  timeValueElement.innerText = getTimeInTimeZone("Europe/Volgograd");
};

updateVolgogradTime();
setInterval(updateVolgogradTime, 60000);

const getVolgogradWeather = async (latitude, longitude) => {
  const apiKey = "f7f0f48145544647b19130539240210";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const {
      current: { temp_c: temperatureCelsius },
    } = await response.json();

    const weatherValueElement = document.querySelector(
      "#cityTemp .weather-value",
    );
    if (!weatherValueElement) {
      return console.error("Элемент '#cityTemp .weather-value' не найден.");
    }

    weatherValueElement.textContent = `${Math.round(temperatureCelsius)}°C`;

    console.log(`Погода в Волгограде: ${temperatureCelsius}°C`);
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
  }
};

{
  const latitude = 48.707;
  const longitude = 44.517;

  getVolgogradWeather(latitude, longitude);

  setInterval(() => {
    getVolgogradWeather(latitude, longitude);
  }, 600000);
}
