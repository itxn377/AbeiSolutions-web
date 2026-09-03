/* =========================================
   PAGE LOADER
========================================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 700);

});


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (event) => {

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

    cursorDot.style.left = event.clientX + "px";
    cursorDot.style.top = event.clientY + "px";

});


const interactiveElements = document.querySelectorAll(
    "a, button, input, select"
);

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursor.classList.add("active");

    });


    element.addEventListener("mouseleave", () => {

        cursor.classList.remove("active");

    });

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================
   MOBILE MENU
========================================= */

const mobileMenuButton = document.querySelector(
    ".mobile-menu-button"
);

const mobileMenu = document.querySelector(
    ".mobile-menu"
);

const mobileLinks = document.querySelectorAll(
    ".mobile-menu a"
);


mobileMenuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open");

});


mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(
    ".reveal"
);


const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   RESERVATION MODAL
========================================= */

const openReservation = document.querySelector(
    "#openReservation"
);

const reservationModal = document.querySelector(
    "#reservationModal"
);

const closeReservation = document.querySelector(
    "#closeReservation"
);

const modalOverlay = document.querySelector(
    ".modal-overlay"
);


function openModal() {

    reservationModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeModal() {

    reservationModal.classList.remove("active");

    document.body.style.overflow = "";

}


if (openReservation) {

    openReservation.addEventListener("click", openModal);

}


closeReservation.addEventListener("click", closeModal);


modalOverlay.addEventListener("click", closeModal);


/* =========================================
   CLOSE MODAL WITH ESCAPE
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeModal();

    }

});


/* =========================================
   RESERVATION FORM
========================================= */

const reservationForm = document.querySelector(
    "#reservationForm"
);

const successMessage = document.querySelector(
    "#successMessage"
);


reservationForm.addEventListener("submit", (event) => {

    event.preventDefault();

    closeModal();

    successMessage.classList.add("active");


    setTimeout(() => {

        successMessage.classList.remove("active");

    }, 4500);


    reservationForm.reset();

});


/* =========================================
   SMOOTH ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll(
    "section[id]"
);

const navLinks = document.querySelectorAll(
    ".nav-links a"
);


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.style.color = "#b89a65";

        }

    });

});


/* =========================================
   IMAGE PARALLAX EFFECT
========================================= */

const parallaxImages = document.querySelectorAll(
    ".statement-background, .reservation-background"
);


window.addEventListener("scroll", () => {

    const scrollPosition = window.scrollY;


    parallaxImages.forEach((image) => {

        const speed = 0.15;

        image.style.transform =
            `translateY(${scrollPosition * speed}px)`;

    });

});


/* =========================================
   HERO ENTRANCE ANIMATION
========================================= */

const heroContent = document.querySelector(
    ".hero-content"
);


window.addEventListener("load", () => {

    setTimeout(() => {

        heroContent.style.opacity = "1";

        heroContent.style.transform =
            "translateY(0)";

    }, 900);

});


heroContent.style.opacity = "0";

heroContent.style.transform =
    "translateY(25px)";

heroContent.style.transition =
    "opacity 1.2s ease, transform 1.2s ease";


/* =========================================
   PREVENT PAST DATES
========================================= */

const dateInput = document.querySelector(
    'input[type="date"]'
);


if (dateInput) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");


    dateInput.min =
        `${year}-${month}-${day}`;

}


/* =========================================
   CONSOLE BRAND MESSAGE
========================================= */

console.log(
    "%cÉCLIPSE",
    "color: #b89a65; font-size: 28px; font-family: serif;"
);

console.log(
    "Fine Dining Concept — Premium Web Design Prototype"
);