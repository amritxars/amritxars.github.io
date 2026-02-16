// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("fa-xmark");
    navbar.classList.toggle("active");
};

// scroll section active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });
            document
                .querySelector(`header nav a[href*="${id}"]`)
                .classList.add("active");
        }
    });

    menuIcon.classList.remove("fa-xmark");
    navbar.classList.remove("active");
};

// scroll reveal
ScrollReveal({
    distance: "80px",
    duration: 2000,
    delay: 150,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
    ".home-img, .portfolio-box:not(.extra-project), .cert-card:not(.extra-cert), .contact form",
    { origin: "bottom" },
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// typed js
const typed = new Typed(".multiple-text", {
    strings: ["an Aspiring Data Engineer...", "a Web Developer...", "a Problem Solver..."],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 1500,
    loop: true,
});

document.addEventListener("DOMContentLoaded", () => {
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    const extraProjects = document.querySelectorAll(".extra-project");
    const portfolioSection = document.getElementById("portfolio"); // Targets the project section
    const header = document.querySelector(".header");

    if (!viewMoreBtn || extraProjects.length === 0) return;

    viewMoreBtn.addEventListener("click", () => {
        const isOpening = !extraProjects[0].classList.contains("show");

        if (isOpening) {
            extraProjects.forEach((project) => project.classList.add("show"));
            viewMoreBtn.innerText = "View Less";
        } else {
            // 1. Hide the projects first
            extraProjects.forEach((project) =>
                project.classList.remove("show"),
            );
            viewMoreBtn.innerText = "View More";

            // 2. Calculate position
            const headerHeight = header ? header.offsetHeight : 0;

            // 'tweak' is an extra buffer.
            // If it still scrolls too high, INCREASE this number (e.g., to 20 or 30).
            // If it scrolls too low, DECREASE it.
            const tweak = 60;

            const targetPosition =
                portfolioSection.offsetTop - headerHeight + tweak;

            // 3. Scroll back up
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    });
});


// CERTIFICATIONS VIEW MORE
document.addEventListener("DOMContentLoaded", () => {
    const viewMoreCertBtn = document.getElementById("viewMoreCertBtn");
    const extraCerts = document.querySelectorAll(".extra-cert");
    const certSection = document.getElementById("certifications");
    const header = document.querySelector(".header");

    if (!viewMoreCertBtn || extraCerts.length === 0) return;

    viewMoreCertBtn.addEventListener("click", () => {
        const isOpening = !extraCerts[0].classList.contains("show");

        if (isOpening) {
            extraCerts.forEach(cert => cert.classList.add("show"));
            viewMoreCertBtn.innerText = "View Less";
        } else {
            extraCerts.forEach(cert => cert.classList.remove("show"));
            viewMoreCertBtn.innerText = "View More";

            const headerHeight = header ? header.offsetHeight : 0;
            const tweak = 60;

            const targetPosition =
                certSection.offsetTop - headerHeight + tweak;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    });
});

const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Visual feedback: Change button state
    submitBtn.innerText = "Sending...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    // These IDs come from your EmailJS Dashboard
    const serviceID = "service_5je78jj";
    const templateID = "template_eu8zcip";

    emailjs
        .sendForm(serviceID, templateID, this)
        .then(
            () => {
                submitBtn.innerText = "Message Sent!";
                alert("Success! Your message has been sent to Amrit.");
                contactForm.reset(); // Clears the form
            },
            (err) => {
                submitBtn.innerText = "Send Message";
                alert("Error: " + JSON.stringify(err));
            },
        )
        .finally(() => {
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerText = "Send Message";
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
            }, 3000);
        });
});
