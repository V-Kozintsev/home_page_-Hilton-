export function polyglot() {
  document.addEventListener("DOMContentLoaded", () => {
    const langLinks = document.querySelectorAll(".lang-link");
    const translatableElements = document.querySelectorAll("[data-translate]");

    const translations = {
      ru: {
        copyright: "© 2025. Все права защищены.",
        welcome: "Добро пожаловать в отель Hampton Volgograd",
        main: "ГЛАВНАЯ",
        rooms: "НОМЕРА",
        gallery: "ГАЛЕРЕЯ",
        specialOffers: "СПЕЦ ПРЕДЛОЖЕНИЯ",
        specialOffersImg: "Специальные предложения",
        events: "МЕРОПРИЯТИЯ",
        services: "УСЛУГИ",
        menu: "МЕНЮ",
        servicesImg: "Услуги 24",
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
        specialOffersImg: "Special offers",
        events: "EVENTS",
        services: "SERVICES",
        servicesImg: "Services 24",
        menu: "MENU",
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

    function changeLanguage(lang) {
      translatableElements.forEach((element) => {
        const key = element.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      });

      document.querySelectorAll("[data-translate-alt]").forEach((element) => {
        const key = element.dataset.translateAlt;
        if (translations[lang] && translations[lang][key]) {
          element.alt = translations[lang][key];
        }
      });

      localStorage.setItem("selectedLanguage", lang);
    }

    langLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const lang = link.dataset.lang;
        changeLanguage(lang);
      });
    });

    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    } else {
      changeLanguage("ru");
    }
  });
}
