/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}


/* =========================
   CLOSE MOBILE MENU
========================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
        }
    });
});


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            reveal.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();


/* =========================
   GALLERY LIGHTBOX
========================= */

const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("lightbox-close");
const previousButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");

let currentImage = 0;


/* Open Lightbox */

function openLightbox(index) {
    if (!lightbox || !lightboxImage || galleryImages.length === 0) return;

    currentImage = index;

    lightboxImage.src = galleryImages[currentImage].src;
    lightboxImage.alt = galleryImages[currentImage].alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* Click Gallery Image */

galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        openLightbox(index);
    });
});


/* Close Lightbox */

function closeGallery() {
    if (!lightbox) return;

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


if (closeLightbox) {
    closeLightbox.addEventListener("click", closeGallery);
}


/* Next Image */

function showNextImage() {
    if (!lightboxImage || galleryImages.length === 0) return;

    currentImage++;

    if (currentImage >= galleryImages.length) {
        currentImage = 0;
    }

    lightboxImage.src = galleryImages[currentImage].src;
    lightboxImage.alt = galleryImages[currentImage].alt;
}


if (nextButton) {
    nextButton.addEventListener("click", showNextImage);
}


/* Previous Image */

function showPreviousImage() {
    if (!lightboxImage || galleryImages.length === 0) return;

    currentImage--;

    if (currentImage < 0) {
        currentImage = galleryImages.length - 1;
    }

    lightboxImage.src = galleryImages[currentImage].src;
    lightboxImage.alt = galleryImages[currentImage].alt;
}


if (previousButton) {
    previousButton.addEventListener("click", showPreviousImage);
}


/* Close When Clicking Outside Image */

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeGallery();
        }
    });
}


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", event => {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeGallery();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }
});