const mainMenuToggle = document.getElementById("mainMenuToggle");
const mainNav = document.getElementById("mainNav");
const themeToggle = document.getElementById("themeToggle");

if (mainMenuToggle && mainNav) {
    mainMenuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");

        mainMenuToggle.textContent =
            mainNav.classList.contains("active") ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("active");
            mainMenuToggle.textContent = "☰";
        });
    });
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");

    if (themeToggle) {
        themeToggle.textContent = "☾";
    }
} else {
    document.documentElement.setAttribute("data-theme", "dark");

    if (themeToggle) {
        themeToggle.textContent = "☀";
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem("theme", newTheme);

        themeToggle.textContent =
            newTheme === "light" ? "☾" : "☀";
    });
}

document.addEventListener("click", event => {
    if (
        mainNav &&
        mainNav.classList.contains("active") &&
        !event.target.closest(".main-navbar")
    ) {
        mainNav.classList.remove("active");

        if (mainMenuToggle) {
            mainMenuToggle.textContent = "☰";
        }
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        if (mainNav) {
            mainNav.classList.remove("active");
        }

        if (mainMenuToggle) {
            mainMenuToggle.textContent = "☰";
        }
    }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

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

const revealElements = document.querySelectorAll(
    ".hero-content, .intro-section, .content-section, .collection-heading, .navbar-section, .site-footer"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
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

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}