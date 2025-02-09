import "./main.css";

import cozyRoomsImage from "../src/images/cozy_rooms.jpg";
import specialOffersImage from "../src/images/special_offers.jpg";
import organizationPerformanceImage from "../src/images/organization_performance.jpg";
import hotelGalleryImage from "../src/images/hotel_gallery.jpg";
import servicesImage from "../src/images/services.jpg";
import figureImage from "../src/images/figure.jpg";

const lazyLoadStyles = `
    .lazy-load {
    opacity: 0; 
    filter: blur(10px);
    transform: scale(0.95);
    transition:
        opacity 1s ease-in-out,
        filter 1s ease-in-out,
        transform 0s ease-in-out; 
    }

    .loaded {
    opacity: 1; 
    filter: blur(0); 
    transform: scale(1);
    }

    `;

const htmlString = `
    <a href="#" class="div1"><img data-src="${cozyRoomsImage}" alt="Уютные номера" class="lazy-load" /><span class="image-text cozy_rooms">Уютные номера</span></a>
    <a href="#" class="div2"><img data-src="${specialOffersImage}" alt="Специальные предложения" class="lazy-load" /><span class="image-text special_offers">Специальные <br>предложения</span></a>
    <a href="#" class="div3"><img data-src="${organizationPerformanceImage}" alt="Организация мероприятий" class="lazy-load" /><span class="image-text organization_performance">Организация <br>мероприятий</span></a>
    <a href="#" class="div4"><img data-src="${hotelGalleryImage}" alt="Галерея отеля" class="lazy-load" /><span class="image-text hotel_gallery">Галерея <br>отеля</span></a>
    <a href="#" class="div5"><img data-src="${servicesImage}" alt="Услуги 24 часа" class="lazy-load" /><span class="image-text services">Услуги <br>24 часа</span></a>
    <a href="#" class="div6"><img data-src="${figureImage}" alt="Что посетить в Волгограде" class="lazy-load" /><span class="image-text figure">Что посетить <br>в Волгограде</span></a>
    `;

const insertImages = () => {
  const parentElement = document.querySelector(".parent");
  if (!parentElement)
    return console.error("Элемент с классом 'parent' не найден.");

  parentElement.innerHTML = htmlString;

  const lazyImages = parentElement.querySelectorAll("img.lazy-load");

  const loadImage = (img) =>
    new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        img.src = img.dataset.src;
        img.classList.add("loaded");
        resolve();
      };
      image.src = img.dataset.src;
    });

  (async () => {
    for (const img of lazyImages) {
      await new Promise((resolve) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(async (entry) => {
              if (entry.isIntersecting) {
                observer.unobserve(img);
                await loadImage(img);
                setTimeout(resolve, 200);
              }
            });
          },
          { rootMargin: "0px", threshold: 0.2 },
        );
        observer.observe(img);
      });
    }
  })();
};

document.addEventListener("DOMContentLoaded", () => {
  const styleElement = document.createElement("style");
  styleElement.textContent = lazyLoadStyles;
  document.head.appendChild(styleElement);
  insertImages();
});
