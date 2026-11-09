// Typing Effect
const textArray = [
    "Building AI-Powered Tools for YouTube",
    "Turning Ideas into Code ✨",
    "Automate the boring stuff"
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

const typedTextSpan = document.getElementById("typing-text");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Scroll Reveal Interaction & Navbar State
document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    function handleNavScroll() {
        if (!navbar) return;
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
    window.addEventListener("scroll", handleNavScroll, { passive: true });
    handleNavScroll();

    // Intersection Observer for smooth reveal without jarring flickers
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        reveals.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        function revealFallback() {
            const windowHeight = window.innerHeight;
            reveals.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < windowHeight - 50) {
                    el.classList.add("active");
                }
            });
        }
        window.addEventListener("scroll", revealFallback, { passive: true });
        revealFallback();
    }
});

// Mobile device detection
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add("mobile-device");
}
