/* =========================================================
   AUTOMOTIVE CONCEPT
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1900);

});


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorBlur = document.querySelector(".cursor-blur");

let mouseX = 0;
let mouseY = 0;

let blurX = 0;
let blurY = 0;


/* Only run custom cursor on devices with a mouse */

if (window.matchMedia("(pointer: fine)").matches) {

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

    });


    function animateCursor() {

        blurX += (mouseX - blurX) * 0.15;
        blurY += (mouseY - blurY) * 0.15;

        cursorBlur.style.left = blurX + "px";
        cursorBlur.style.top = blurY + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    /* Cursor interaction */

    const interactiveElements = document.querySelectorAll(
        "a, button, input"
    );


    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            cursorBlur.style.width = "65px";
            cursorBlur.style.height = "65px";

        });


        element.addEventListener("mouseleave", () => {

            cursorBlur.style.width = "40px";
            cursorBlur.style.height = "40px";

        });

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const mobileLinks = mobileMenu.querySelectorAll("a");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open");

});


/* Close menu when clicking navigation links */

mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.position = "fixed";

        navbar.style.background =
            "rgba(8, 8, 8, 0.92)";

        navbar.style.backdropFilter =
            "blur(15px)";

    } else {

        navbar.style.position = "absolute";

        navbar.style.background =
            "transparent";

        navbar.style.backdropFilter =
            "none";

    }

});


/* =========================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
========================================================= */

const links = document.querySelectorAll('a[href^="#"]');


links.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================================
   ANIMATED STATISTICS
========================================================= */

const statNumbers =
    document.querySelectorAll(".stat-number[data-target]");


let statsAnimated = false;


function animateStats() {

    if (statsAnimated) return;


    const statsSection =
        document.querySelector(".stats");


    const sectionPosition =
        statsSection.getBoundingClientRect();


    if (
        sectionPosition.top <
        window.innerHeight * 0.8
    ) {

        statsAnimated = true;


        statNumbers.forEach((stat) => {

            const target =
                parseInt(stat.dataset.target);

            let current = 0;


            const increment =
                Math.max(
                    1,
                    Math.ceil(target / 80)
                );


            const timer = setInterval(() => {

                current += increment;


                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }


                stat.textContent = current;

            }, 20);

        });

    }

}


window.addEventListener("scroll", animateStats);

animateStats();


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements = document.querySelectorAll(
    ".intro, .vehicle-card, .about-content, .about-visual, .stat"
);


/* Initial state */

revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

});


const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

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


/* =========================================================
   VEHICLE CARD PARALLAX EFFECT
========================================================= */

const vehicleImages =
    document.querySelectorAll(".vehicle-image");


vehicleImages.forEach((image) => {

    image.addEventListener("mousemove", (event) => {

        if (!window.matchMedia("(pointer: fine)").matches) {
            return;
        }


        const rect =
            image.getBoundingClientRect();


        const x =
            event.clientX - rect.left;


        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -3;


        const rotateY =
            ((x - centerX) / centerX) * 3;


        image.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.02)`;

    });


    image.addEventListener("mouseleave", () => {

        image.style.transform = "";

    });

});


/* =========================================================
   NEWSLETTER FORM
========================================================= */

const newsletterInput =
    document.querySelector(".newsletter-form input");

const newsletterButton =
    document.querySelector(".newsletter-form button");


newsletterButton.addEventListener("click", () => {

    const email =
        newsletterInput.value.trim();


    if (!email) {

        newsletterInput.focus();

        return;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert(
            "Please enter a valid email address."
        );

        return;

    }


    newsletterButton.textContent = "✓";

    newsletterInput.value = "";


    setTimeout(() => {

        newsletterButton.textContent = "→";

    }, 2500);

});


/* =========================================================
   PARALLAX HERO EFFECT
========================================================= */

const heroBackground =
    document.querySelector(".hero-bg");


window.addEventListener("scroll", () => {

    const scrollPosition =
        window.scrollY;


    if (scrollPosition < window.innerHeight) {

        heroBackground.style.transform =
            `scale(1.05)
             translateY(${scrollPosition * 0.15}px)`;

    }

});


/* =========================================================
   CONSOLE BRAND MESSAGE
========================================================= */

console.log(
    "%cAUTOMOTIVE CONCEPT",
    "color:#d6ff3f; font-size:24px; font-weight:bold;"
);

console.log(
    "%cPerformance. Precision. Passion.",
    "color:#ffffff; font-size:12px;"
);