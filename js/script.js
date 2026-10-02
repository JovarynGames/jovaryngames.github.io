/* =========================================================
   JOVARYN GAMES
   WEBSITE VERSION 2.0
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const loader =
    document.getElementById("loader");

const header =
    document.getElementById("header");

const navLinksContainer =
    document.getElementById("navLinks");

const navLinks =
    document.querySelectorAll(".nav-link");

const menuToggle =
    document.getElementById("menuToggle");

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const scrollProgress =
    document.getElementById("scrollProgress");

const backToTop =
    document.getElementById("backToTop");

const currentYear =
    document.getElementById("currentYear");

const lastUpdated =
    document.getElementById("lastUpdated");

const siteToast =
    document.getElementById("siteToast");


/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        window.setTimeout(
            () => {

                if (loader) {
                    loader.classList.add("hidden");
                }

            },
            350
        );

    }
);


/* =========================================================
   YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   LAST UPDATED
========================================================= */

if (lastUpdated) {

    const modified =
        new Date(document.lastModified);


    if (
        !Number.isNaN(
            modified.getTime()
        )
    ) {

        lastUpdated.textContent =
            modified.toLocaleDateString(
                undefined,
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

    } else {

        lastUpdated.textContent =
            "2026";

    }

}


/* =========================================================
   THEME
========================================================= */

const savedTheme =
    localStorage.getItem(
        "jovaryn-theme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light-theme"
    );

}


function updateThemeIcon() {

    const lightMode =
        document.body.classList.contains(
            "light-theme"
        );


    if (themeIcon) {

        themeIcon.textContent =
            lightMode
                ? "☾"
                : "☀";

    }

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            const lightMode =
                document.body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                "jovaryn-theme",
                lightMode
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMenu() {

    if (
        !navLinksContainer ||
        !menuToggle
    ) {
        return;
    }


    navLinksContainer.classList.remove(
        "open"
    );

    menuToggle.classList.remove(
        "open"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


if (
    menuToggle &&
    navLinksContainer
) {

    menuToggle.addEventListener(
        "click",
        () => {

            const opened =
                navLinksContainer
                    .classList
                    .toggle("open");


            menuToggle.classList.toggle(
                "open",
                opened
            );


            menuToggle.setAttribute(
                "aria-expanded",
                opened
                    ? "true"
                    : "false"
            );


            document.body.classList.toggle(
                "menu-open",
                opened
            );

        }
    );

}


navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    }
);


/* =========================================================
   INTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]:not(.placeholder-link):not(.disabled-link)'
    )
    .forEach(
        link => {

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


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    closeMenu();

                }
            );

        }
    );


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function showToast(message) {

    if (!siteToast) {
        return;
    }


    window.clearTimeout(
        toastTimeout
    );


    siteToast.textContent =
        message;


    siteToast.classList.add(
        "show"
    );


    toastTimeout =
        window.setTimeout(
            () => {

                siteToast.classList.remove(
                    "show"
                );

            },
            2800
        );

}


/* =========================================================
   FUTURE / DISABLED LINKS
========================================================= */

document
    .querySelectorAll(
        ".placeholder-link, .disabled-link"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const message =
                        link.dataset.message ||
                        "This feature is planned for a future update.";


                    showToast(message);

                }
            );

        }
    );


/* =========================================================
   SCROLL HANDLER
========================================================= */

function handleScroll() {

    const scrollTop =
        window.scrollY;


    if (header) {

        header.classList.toggle(
            "scrolled",
            scrollTop > 20
        );

    }


    if (backToTop) {

        backToTop.classList.toggle(
            "show",
            scrollTop > 500
        );

    }


    if (scrollProgress) {

        const totalHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const percentage =
            totalHeight > 0
                ? (
                    scrollTop /
                    totalHeight
                ) * 100
                : 0;


        scrollProgress.style.width =
            `${percentage}%`;

    }

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


handleScroll();


/* =========================================================
   BACK TO TOP
========================================================= */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const pageSections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNavigation() {

    let currentSection =
        "home";


    pageSections.forEach(
        section => {

            const sectionTop =
                section.offsetTop -
                150;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            link.classList.toggle(
                "active",
                href ===
                    `#${currentSection}`
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


updateActiveNavigation();


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (reducedMotion) {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

} else if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.1,
                rootMargin:
                    "0px 0px -30px 0px"
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


function animateCounter(counter) {

    const target =
        Number(
            counter.dataset.target
        );


    if (
        !Number.isFinite(target)
    ) {
        return;
    }


    if (reducedMotion) {

        counter.textContent =
            target;

        return;

    }


    const duration =
        1200;

    const start =
        performance.now();


    function update(time) {

        const elapsed =
            time - start;


        const progress =
            Math.min(
                elapsed /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        counter.textContent =
            Math.floor(
                eased * target
            );


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            counter.textContent =
                target;

        }

    }


    requestAnimationFrame(
        update
    );

}


if (
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );


                            counterObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.45
            }

        );


    counters.forEach(
        counter => {

            counterObserver.observe(
                counter
            );

        }
    );

} else {

    counters.forEach(
        animateCounter
    );

}


/* =========================================================
   LIGHT CARD TILT
========================================================= */

const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    );


const tiltCards =
    document.querySelectorAll(
        ".learning-card, .official-project-card"
    );


if (
    finePointer.matches &&
    !reducedMotion
) {

    tiltCards.forEach(
        card => {

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


                    const rotateY =
                        (
                            x /
                            rect.width -
                            0.5
                        ) * 1.2;


                    const rotateX =
                        (
                            0.5 -
                            y /
                            rect.height
                        ) * 1.2;


                    card.style.transform =
                        `translateY(-6px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   ESCAPE KEY CLOSES MOBILE MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   RESIZE SAFETY
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            760
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "JOVARYN GAMES"
);

console.log(
    "Website Version 2.0"
);

console.log(
    "Create. Play. Go Beyond."
);