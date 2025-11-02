// ===============================
// DYNAMIC NAVBAR LOADER
// ===============================
// Hardcoded relative path (works on GitHub Pages & locally)
const navbarContainer = document.getElementById("navbar-container");

const xhr = new XMLHttpRequest();
xhr.open("GET", "navbar.html", true); // <-- navbar.html must exist in the same folder as your page
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            navbarContainer.innerHTML = xhr.responseText;
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
