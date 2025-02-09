//index.js коммит
import "./main.css";

async function getVolgogradTime() {
  try {
    const response = await fetch("https://ipinfo.io/json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const city = data.city;
    const detectedTimezone = data.timezone;
    let volgogradTimezone = "Europe/Volgograd";
    if (city && city.toLowerCase().includes("волгоград")) {
      volgogradTimezone = detectedTimezone;
    } else {
      console.log(
        "Предполагаем, что пользователь находится в том же часовом поясе, что и Волгоград.",
      );
    }
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("ru-RU", {
      timeZone: volgogradTimezone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedTime = formatter.format(now);
    const timeElement = document.getElementById("volgograd-time");
    if (timeElement) {
      timeElement.textContent = `Текущее время в Волгограде: ${formattedTime}`;
    }
  } catch (error) {
    console.error("Ошибка получения времени:", error);
    const timeElement = document.getElementById("volgograd-time");
    if (timeElement) {
      timeElement.textContent = "Не удалось получить время.";
    }
  }
}
getVolgogradTime();
setInterval(getVolgogradTime, 1000);

const apiKey = "f7f0f48145544647b19130539240210";
const latitude = 48.707;
const longitude = 44.517;

async function getVolgogradWeather() {
  const cityTemp = document.getElementById("cityTemp");
  try {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const temperatureCelsius = Math.round(data.current.temp_c);
    cityTemp.innerText = `ПОГОДА ВОЛГОГРАД: ${temperatureCelsius}°C`;

    console.log(`Погода в Волгограде: ${temperatureCelsius}°C`);
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
  }
}

getVolgogradWeather();
