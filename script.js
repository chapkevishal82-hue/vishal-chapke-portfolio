/* =========================================================
   VISHAL CHAPKE
   PREMIUM DEVELOPER PORTFOLIO
   script.js
   ========================================================= */


/* =========================================================
   1. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();
    initNavbar();
    initMobileMenu();
    initThemeToggle();
    initTypingEffect();
    initScrollReveal();
    initActiveNavigation();
    initBackToTop();
    initContactForm();
    initCertificateModal();
    initSmoothScroll();
    initProjectLinks();
    initCurrentYear();

});


/* =========================================================
   2. PRELOADER
   ========================================================= */

function initPreloader() {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hidden");
        }, 500);

    });

}


/* =========================================================
   3. NAVBAR SCROLL EFFECT
   ========================================================= */

function initNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    const handleNavbarScroll = () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();

}


/* =========================================================
   4. MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuButton = document.querySelector(".menu-button");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuButton || !navMenu) return;

    menuButton.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "no-scroll",
            isOpen
        );

    });


    /* Close menu when clicking a link */

    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "no-scroll"
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            navMenu.classList.contains("open") &&
            !navMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            navMenu.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "no-scroll"
            );
        }

    });

}


/* =========================================================
   5. THEME TOGGLE
   ========================================================= */

function initThemeToggle() {

    const themeButton =
        document.querySelector(".theme-button");

    if (!themeButton) return;


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

    }


    updateThemeIcon();


    themeButton.addEventListener("click", () => {

        document.body.classList.toggle(
            "light-mode"
        );

        const theme =
            document.body.classList.contains(
                "light-mode"
            )
                ? "light"
                : "dark";

        localStorage.setItem(
            "portfolio-theme",
            theme
        );

        updateThemeIcon();

    });


    function updateThemeIcon() {

        const isLight =
            document.body.classList.contains(
                "light-mode"
            );

        themeButton.innerHTML =
            isLight ? "☀" : "☾";

        themeButton.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

    }

}


/* =========================================================
   6. TYPING EFFECT
   ========================================================= */

function initTypingEffect() {

    const typingElement =
        document.querySelector("#typing-text");

    if (!typingElement) return;

    const words = [

        "Software Developer",
        "Full Stack Developer",
        "Python Developer",
        "AI & ML Enthusiast",
        "Cloud & DevOps Learner"

    ];

    let wordIndex = 0;
    let characterIndex = 0;

    let deleting = false;


    const typingSpeed = 80;
    const deletingSpeed = 45;
    const pauseAfterWord = 1600;


    function type() {

        const currentWord =
            words[wordIndex];


        if (!deleting) {

            characterIndex++;

            typingElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex ===
                currentWord.length
            ) {

                deleting = true;

                setTimeout(
                    type,
                    pauseAfterWord
                );

                return;
            }

        } else {

            characterIndex--;

            typingElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            if (characterIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }


        setTimeout(
            type,
            deleting
                ? deletingSpeed
                : typingSpeed
        );

    }


    type();

}


/* =========================================================
   7. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) return;


    /* Fallback for older browsers */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   8. ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );

    if (!sections.length || !navLinks.length)
        return;


    const updateActiveLink = () => {

        const scrollPosition =
            window.scrollY + 180;


        let currentSection = "";


        sections.forEach(section => {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;

            const id =
                section.getAttribute("id");


            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                currentSection = id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();

}


/* =========================================================
   9. BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const backTop =
        document.querySelector(
            ".back-top"
        );

    if (!backTop) return;


    const updateButton = () => {

        if (window.scrollY > 500) {

            backTop.classList.add(
                "visible"
            );

        } else {

            backTop.classList.remove(
                "visible"
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* =========================================================
   10. CONTACT FORM VALIDATION
   ========================================================= */

function initContactForm() {

    const form =
        document.querySelector(
            ".contact-form"
        );

    if (!form) return;


    const message =
        form.querySelector(
            ".form-message"
        );


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                form.querySelector(
                    '[name="name"]'
                );

            const email =
                form.querySelector(
                    '[name="email"]'
                );

            const subject =
                form.querySelector(
                    '[name="subject"]'
                );

            const userMessage =
                form.querySelector(
                    '[name="message"]'
                );


            if (!name ||
                !email ||
                !userMessage) {

                return;
            }


            const nameValue =
                name.value.trim();

            const emailValue =
                email.value.trim();

            const subjectValue =
                subject
                    ? subject.value.trim()
                    : "";

            const messageValue =
                userMessage.value.trim();


            /* Required fields */

            if (!nameValue) {

                showFormMessage(
                    "Please enter your name.",
                    true
                );

                name.focus();

                return;
            }


            if (!isValidEmail(emailValue)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    true
                );

                email.focus();

                return;
            }


            if (!messageValue) {

                showFormMessage(
                    "Please enter your message.",
                    true
                );

                userMessage.focus();

                return;
            }


            /*
             * Front-end only form.
             * This creates a mailto request.
             */

            const mailSubject =
                subjectValue ||
                "Portfolio Contact";


            const mailBody =
                `Hello Vishal,%0D%0A%0D%0A` +
                `Name: ${encodeURIComponent(nameValue)}%0D%0A` +
                `Email: ${encodeURIComponent(emailValue)}%0D%0A%0D%0A` +
                `${encodeURIComponent(messageValue)}`;


            const mailto =
                `mailto:chapkevishal82@gmail.com` +
                `?subject=${encodeURIComponent(mailSubject)}` +
                `&body=${mailBody}`;


            showFormMessage(
                "Message prepared successfully. Your email app will open."
            );


            window.location.href =
                mailto;


            form.reset();

        }
    );


    function showFormMessage(
        text,
        error = false
    ) {

        if (!message) return;

        message.textContent = text;

        message.style.color =
            error
                ? "#f87171"
                : "";

    }


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }

}


/* =========================================================
   11. CERTIFICATE MODAL
   ========================================================= */

function initCertificateModal() {

    const modal =
        document.querySelector(
            ".modal"
        );

    if (!modal) return;


    const modalTitle =
        modal.querySelector(
            "[data-modal-title]"
        );

    const modalIssuer =
        modal.querySelector(
            "[data-modal-issuer]"
        );

    const modalDescription =
        modal.querySelector(
            "[data-modal-description]"
        );

    const closeButton =
        modal.querySelector(
            ".modal-close"
        );


    const certificateButtons =
        document.querySelectorAll(
            ".certificate-button"
        );


    certificateButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".certificate-card"
                    );

                if (!card) return;


                const title =
                    card.dataset.title ||
                    card.querySelector("h3")
                        ?.textContent ||
                    "Certificate";


                const issuer =
                    card.dataset.issuer ||
                    card.querySelector("p")
                        ?.textContent ||
                    "";


                const description =
                    card.dataset.description ||
                    "Professional learning credential added to my portfolio.";


                if (modalTitle)
                    modalTitle.textContent =
                        title;


                if (modalIssuer)
                    modalIssuer.textContent =
                        issuer;


                if (modalDescription)
                    modalDescription.textContent =
                        description;


                modal.classList.add(
                    "active"
                );

                document.body.classList.add(
                    "no-scroll"
                );

            }
        );

    });


    function closeModal() {

        modal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   12. SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const navbar =
                    document.querySelector(
                        ".navbar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight -
                    20;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   13. PROJECT LINKS
   ========================================================= */

function initProjectLinks() {

    const projectLinks =
        document.querySelectorAll(
            ".project-links a"
        );


    projectLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                /*
                 * Prevent empty / placeholder links.
                 */

                if (
                    !href ||
                    href === "#" ||
                    href === "javascript:void(0)"
                ) {

                    event.preventDefault();

                    alert(
                        "Project link will be added soon."
                    );

                }

            }
        );

    });

}


/* =========================================================
   14. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    const year =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent =
            year;

    });

}


/* =========================================================
   15. COPY EMAIL
   ========================================================= */

function initEmailCopy() {

    const emailElements =
        document.querySelectorAll(
            "[data-copy-email]"
        );


    emailElements.forEach(element => {

        element.addEventListener(
            "click",
            async event => {

                const email =
                    element.dataset.copyEmail;

                if (!email) return;


                try {

                    await navigator.clipboard.writeText(
                        email
                    );

                    const originalText =
                        element.textContent;


                    element.textContent =
                        "Email copied ✓";


                    setTimeout(() => {

                        element.textContent =
                            originalText;

                    }, 1500);

                } catch (error) {

                    console.log(
                        "Copy failed:",
                        error
                    );

                }

            }
        );

    });

}


/* =========================================================
   16. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Close mobile navigation
         * with Escape.
         */

        if (
            event.key === "Escape"
        ) {

            const navMenu =
                document.querySelector(
                    ".nav-menu"
                );

            const menuButton =
                document.querySelector(
                    ".menu-button"
                );


            if (
                navMenu &&
                navMenu.classList.contains(
                    "open"
                )
            ) {

                navMenu.classList.remove(
                    "open"
                );


                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                document.body.classList.remove(
                    "no-scroll"
                );

            }

        }

    }
);


/* =========================================================
   17. CURSOR / POINTER EFFECT
   ========================================================= */

function initPointerEffect() {

    /*
     * Desktop-only subtle interaction.
     */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    const cards =
        document.querySelectorAll(
            ".skill-card, .project-card, .education-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -3;


                const rotateY =
                    ((x / rect.width) - 0.5) *
                    3;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   18. INITIALIZE OPTIONAL EFFECT
   ========================================================= */

initPointerEffect();
initEmailCopy();


/* =========================================================
   19. CONSOLE BRANDING
   ========================================================= */

console.log(
    "%c Vishal Chandrakant Chapke ",
    "background:#111827;color:#22d3ee;font-size:16px;font-weight:bold;padding:8px;border-radius:6px;"
);

console.log(
    "%c Software Developer • Full Stack • AI/ML • Cloud • DevOps ",
    "color:#8b5cf6;font-size:12px;font-weight:bold;"
);