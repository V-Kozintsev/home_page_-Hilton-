//index.js
import "./main.css";
import "intl";
import "intl/locale-data/jsonp/ru.js";

console.log("Hello,Hampton!");
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
