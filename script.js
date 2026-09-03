document.addEventListener("DOMContentLoaded", function () {

    
    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    
    const languageSwitch = document.getElementById("languageSwitch");
    const currentLanguageText = document.getElementById("currentLanguage");
    
    const year = document.getElementById("year");
    
    const modal = document.getElementById("projectModal");
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalClose = document.getElementById("modalClose");
    const modalContent = document.getElementById("modalContent");
    
    
    if (year) {
        year.textContent = new Date().getFullYear();
    }
    
    
    function updateNavbar() {
    
        if (!navbar) {
            return;
        }
    
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    
    }
    
    
    updateNavbar();
    
    window.addEventListener("scroll", updateNavbar);
    
    
    if (menuButton && mobileMenu) {
    
        menuButton.addEventListener("click", function () {
    
            mobileMenu.classList.toggle("active");
    
            document.body.classList.toggle("no-scroll");
    
        });
    
    
        const mobileLinks = mobileMenu.querySelectorAll("a");
    
    
        mobileLinks.forEach(function (link) {
    
            link.addEventListener("click", function () {
    
                mobileMenu.classList.remove("active");
    
                document.body.classList.remove("no-scroll");
    
            });
    
        });
    
    }
    
    
    let currentLanguage = localStorage.getItem("abeiLanguage");
    
    
    if (currentLanguage !== "en" && currentLanguage !== "al") {
        currentLanguage = "en";
    }
    
    
    function updateLanguage() {
    
        const elements = document.querySelectorAll("[data-en][data-al]");
    
    
        elements.forEach(function (element) {
    
            const english = element.getAttribute("data-en");
            const albanian = element.getAttribute("data-al");
    
    
            if (currentLanguage === "en") {
                element.innerHTML = english;
            } else {
                element.innerHTML = albanian;
            }
    
        });
    
    
        if (currentLanguageText) {
    
            if (currentLanguage === "en") {
                currentLanguageText.textContent = "EN";
            } else {
                currentLanguageText.textContent = "AL";
            }
    
        }
    
    
        document.documentElement.lang = currentLanguage;
    
    
        localStorage.setItem(
            "abeiLanguage",
            currentLanguage
        );
    
    }
    
    
    if (languageSwitch) {
    
        languageSwitch.addEventListener("click", function () {
    
            if (currentLanguage === "en") {
                currentLanguage = "al";
            } else {
                currentLanguage = "en";
            }
    
    
            updateLanguage();
    
        });
    
    }
    
    
    updateLanguage();
    
    
    const revealElements = document.querySelectorAll(".reveal");
    
    
    if ("IntersectionObserver" in window) {
    
        const observer = new IntersectionObserver(
            function (entries) {
    
                entries.forEach(function (entry) {
    
                    if (entry.isIntersecting) {
    
                        entry.target.classList.add("visible");
    
                        observer.unobserve(entry.target);
    
                    }
    
                });
    
            },
            {
                threshold: 0.12
            }
        );
    
    
        revealElements.forEach(function (element) {
    
            observer.observe(element);
    
        });
    
    } else {
    
        revealElements.forEach(function (element) {
    
            element.classList.add("visible");
    
        });
    
    }
    
    
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".desktop-nav a");
    
    
    function updateActiveNavigation() {
    
        let activeSection = "";
    
    
        sections.forEach(function (section) {
    
            const sectionTop = section.offsetTop - 180;
            const sectionBottom = sectionTop + section.offsetHeight;
    
    
            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                activeSection = section.id;
            }
    
        });
    
    
        navLinks.forEach(function (link) {
    
            link.classList.remove("active");
    
    
            if (link.getAttribute("href") === "#" + activeSection) {
                link.classList.add("active");
            }
    
        });
    
    }
    
    
    updateActiveNavigation();
    
    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );
    
    
    const projects = {
    
        dining: {
    
            categoryEN: "RESTAURANT WEBSITE",
            categoryAL: "FAQE RESTORANTI",
    
            titleEN: "Fine Dining Concept",
            titleAL: "Koncept Fine Dining",
    
            descriptionEN:
                "A premium restaurant website concept focused on elegant typography, luxury atmosphere and a refined reservation experience.",
    
            descriptionAL:
                "Një koncept premium për një faqe restoranti, i fokusuar në tipografi elegante, atmosferë luksoze dhe një eksperiencë moderne rezervimi.",
    
            tags: [
                "Luxury Design",
                "Restaurant",
                "Responsive",
                "Modern UI"
            ],
    
            link: "Fine-Dining-Concept/index.html"
    
        },
    
    
        automotive: {
    
            categoryEN: "AUTOMOTIVE WEBSITE",
            categoryAL: "FAQE AUTOMOTIVE",
    
            titleEN: "Automotive Concept",
            titleAL: "Koncept Automotive",
    
            descriptionEN:
                "A high-performance automotive website concept designed with bold visuals, modern interfaces and a futuristic premium atmosphere.",
    
            descriptionAL:
                "Një koncept modern për një faqe automotive, i krijuar me pamje të fuqishme, interface moderne dhe një atmosferë premium futuriste.",
    
            tags: [
                "Automotive",
                "Premium UI",
                "Responsive",
                "Modern Design"
            ],
    
            link: "Automotive-Concept/index.html"
    
        },
    
    
        hotel: {
    
            categoryEN: "HOSPITALITY WEBSITE",
            categoryAL: "FAQE HOTELI",
    
            titleEN: "Luxury Hotel Concept",
            titleAL: "Koncept Hotel Luksoz",
    
            descriptionEN:
                "A luxury hotel website concept designed to create an elegant online experience with premium visuals, smooth navigation and a strong sense of atmosphere.",
    
            descriptionAL:
                "Një koncept luksoz për një faqe hoteli, i krijuar për të ofruar një eksperiencë elegante online me pamje premium, navigim të thjeshtë dhe atmosferë të veçantë.",
    
            tags: [
                "Hospitality",
                "Luxury",
                "Responsive",
                "Premium Design"
            ],
    
            link: "hotel-website/index.html"
    
        }
    
    };
    
    
    const projectCards = document.querySelectorAll(".project-card");
    
    
    function openProject(projectName) {
    
        const project = projects[projectName];
    
    
        if (!project || !modal || !modalContent) {
            return;
        }
    
    
        const category =
            currentLanguage === "en"
                ? project.categoryEN
                : project.categoryAL;
    
    
        const title =
            currentLanguage === "en"
                ? project.titleEN
                : project.titleAL;
    
    
        const description =
            currentLanguage === "en"
                ? project.descriptionEN
                : project.descriptionAL;
    
    
        const buttonText =
            currentLanguage === "en"
                ? "View Live Project"
                : "Shiko Projektin";
    
    
        const tagsHTML = project.tags
            .map(function (tag) {
    
                return '<span class="modal-tag">' + tag + '</span>';
    
            })
            .join("");
    
    
        modalContent.innerHTML =
            '<span class="modal-category">' +
            category +
            '</span>' +
    
            '<h2>' +
            title +
            '</h2>' +
    
            '<p class="modal-description">' +
            description +
            '</p>' +
    
            '<div class="modal-tags">' +
            tagsHTML +
            '</div>' +
    
            '<a class="modal-demo-button" href="' +
            project.link +
            '">' +
            buttonText +
            ' <span>↗</span>' +
            '</a>';
    
    
        modal.classList.add("active");
    
        document.body.classList.add("no-scroll");
    
    }
    
    
    projectCards.forEach(function (card) {
    
        card.addEventListener("click", function () {
    
            const projectName =
                card.getAttribute("data-project");
    
    
            openProject(projectName);
    
        });
    
    });
    
    
    function closeModal() {
    
        if (!modal) {
            return;
        }
    
        modal.classList.remove("active");
    
        document.body.classList.remove("no-scroll");
    
    }
    
    
    if (modalClose) {
    
        modalClose.addEventListener(
            "click",
            closeModal
        );
    
    }
    
    
    if (modalBackdrop) {
    
        modalBackdrop.addEventListener(
            "click",
            closeModal
        );
    
    }
    
    
    document.addEventListener(
        "keydown",
        function (event) {
    
            if (event.key === "Escape") {
                closeModal();
            }
    
        }
    );
    
    
    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');
    
    
    anchorLinks.forEach(function (link) {
    
        link.addEventListener("click", function (event) {
    
            const targetId =
                link.getAttribute("href");
    
    
            if (!targetId || targetId === "#") {
                return;
            }
    
    
            const target =
                document.querySelector(targetId);
    
    
            if (!target) {
                return;
            }
    
    
            event.preventDefault();
    
    
            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;
    
    
            const targetPosition =
                target.offsetTop - navbarHeight;
    
    
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
    
        });
    
    });
    
    
    });
    