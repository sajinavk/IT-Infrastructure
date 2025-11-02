// ===============================
// DYNAMIC NAVBAR LOADER
// ===============================
const navbarContainer = document.getElementById("navbar-container");

// Define your base URL for your site
// For local dev, change it to your local server path if needed
const baseURL = "https://michaelwoodc.github.io/IT-Infrastructure/";

// Load navbar.html dynamically
const xhr = new XMLHttpRequest();
xhr.open("GET", baseURL + "navbar.html", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            navbarContainer.innerHTML = xhr.responseText;

            // Fix all relative links in the navbar
            navbarContainer.querySelectorAll("a").forEach(link => {
                let href = link.getAttribute("href");
                if (href && !href.startsWith("http") && !href.startsWith("#")) {
                    // Make the href absolute using baseURL
                    link.setAttribute("href", baseURL + href.replace(/^\/+/, ""));
                }
            });

        } else {
            console.error("Failed to load navbar.html:", xhr.status);
        }
    }
};
xhr.send();


// ===============================
// SLIDESHOW FUNCTIONS
// ===============================
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    const codeBoxes = document.getElementsByClassName("code-section");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        if (codeBoxes[i]) codeBoxes[i].style.display = "none";
    }

    for (i = 0; dots && i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if (dots && dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
        if (codeBoxes[slideIndex - 1] && codeBoxes[slideIndex - 1].querySelector('textarea').value.trim() !== "") {
            codeBoxes[slideIndex - 1].style.display = "block";
        }

        // Center the new slide on the page
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const targetY = slides[slideIndex - 1].getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
}

// ===============================
// COPY CODE FUNCTION
// ===============================
function copyCode(slideNumber) {
    const codeTextarea = document.querySelectorAll('.code-section textarea')[slideNumber - 1];
    const codeContent = codeTextarea.value.trim();

    if (codeContent !== "") {
        navigator.clipboard.writeText(codeContent)
            .then(() => alert('Code copied to clipboard!'))
            .catch(err => console.error('Unable to copy to clipboard', err));
    }
}
