document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     ELEMENTS
  ============================== */

  const navbar = document.getElementById("navbar");

  const languageToggle = document.getElementById("languageToggle");

  const langEN = document.getElementById("langEN");
  const langAL = document.getElementById("langAL");

  const mobileMenu = document.getElementById("mobileMenu");
  const mobileNavigation = document.getElementById("mobileNavigation");

  const cursorGlow = document.querySelector(".cursor-glow");

  const year = document.getElementById("year");

  const languageElements = document.querySelectorAll("[data-en][data-al]");

  const revealElements = document.querySelectorAll(".reveal");

  const counters = document.querySelectorAll(".counter");


  /* ==============================
     CURRENT YEAR
  ============================== */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ==============================
     NAVBAR SCROLL EFFECT
  ============================== */

  window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  });


  /* ==============================
     MOBILE MENU
  ============================== */

  if (mobileMenu && mobileNavigation) {

    mobileMenu.addEventListener("click", () => {

      mobileNavigation.classList.toggle("active");

    });


    const mobileLinks = mobileNavigation.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileNavigation.classList.remove("active");

      });

    });

  }


  /* ==============================
     LANGUAGE SYSTEM EN / AL
  ============================== */

  let currentLanguage = localStorage.getItem("abeiLanguage") || "en";


  function updateLanguage(language) {

    currentLanguage = language;


    languageElements.forEach((element) => {

      const translation = element.getAttribute(`data-${language}`);

      if (translation) {
        element.textContent = translation;
      }

    });


    if (language === "en") {

      langEN.classList.add("lang-active");
      langAL.classList.remove("lang-active");

      document.documentElement.lang = "en";

    } else {

      langAL.classList.add("lang-active");
      langEN.classList.remove("lang-active");

      document.documentElement.lang = "sq";

    }


    localStorage.setItem("abeiLanguage", language);

  }


  if (languageToggle) {

    languageToggle.addEventListener("click", () => {

      const newLanguage =
        currentLanguage === "en" ? "al" : "en";

      updateLanguage(newLanguage);

    });

  }


  updateLanguage(currentLanguage);


  /* ==============================
     SCROLL REVEAL ANIMATION
  ============================== */

  const revealObserver = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


  /* ==============================
     COUNTER ANIMATION
  ============================== */

  const counterObserver = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(
          counter.getAttribute("data-target")
        );

        let current = 0;

        const duration = 1000;

        const incrementTime = 30;

        const steps = duration / incrementTime;

        const increment = target / steps;


        const counterInterval = setInterval(() => {

          current += increment;


          if (current >= target) {

            counter.textContent = target;

            clearInterval(counterInterval);

          } else {

            counter.textContent =
              Math.floor(current);

          }

        }, incrementTime);


        counterObserver.unobserve(counter);

      });

    },

    {
      threshold: 0.5
    }

  );


  counters.forEach((counter) => {

    counterObserver.observe(counter);

  });


  /* ==============================
     CURSOR GLOW
  ============================== */

  if (cursorGlow && window.matchMedia("(hover: hover)").matches) {

    window.addEventListener("mousemove", (event) => {

      cursorGlow.style.left = `${event.clientX}px`;

      cursorGlow.style.top = `${event.clientY}px`;

    });

  }


  /* ==============================
     SMOOTH INTERNAL LINKS
  ============================== */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');


  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      const target =
        document.querySelector(targetId);


      if (target) {

        event.preventDefault();

        target.scrollIntoView({

          behavior: "smooth",
          block: "start"

        });

      }

    });

  });


});