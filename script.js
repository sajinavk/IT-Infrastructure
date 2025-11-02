// ===============================
// DYNAMIC NAVBAR LOADER
// ===============================
const navbarContainer = document.getElementById("navbar-container");

// Hardcoded absolute path to your navbar on GitHub Pages
const navbarURL = "https://michaelwoodc.github.io/IT-Infrastructure/navbar.html";

const xhr = new XMLHttpRequest();
xhr.open("GET", navbarURL, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            navbarContainer.innerHTML = xhr.responseText;

            // Optional: Fix navbar links to always be relative to root
            navbarContainer.querySelectorAll("a").forEach(link => {
                const href = link.getAttribute("href");
                if (href && !href.startsWith("http") && !href.startsWith("#")) {
                    // Make all relative links point to GitHub Pages root
                    link.setAttribute("href", "https://michaelwoodc.github.io/IT-Infrastructure/" + href.replace(/^\.?\//, ""));
                }
            });

        } else {
            console.error("Failed to load navbar.html:", xhr.status);
        }
    }
};
xhr.send();


let slideIndex = 1;
showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  let codeBoxes = document.getElementsByClassName("code-section");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    if (codeBoxes[i]) {
      codeBoxes[i].style.display = "none";
    }
  }

  for (i = 0; dots && i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  if (dots && dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " active";
  }

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
    if (codeBoxes[slideIndex - 1] && codeBoxes[slideIndex - 1].querySelector('textarea').value.trim() !== "") {
      codeBoxes[slideIndex - 1].style.display = "block";
    }

    // Center the new slide on the page
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const targetY = slides[slideIndex - 1].getBoundingClientRect().top + scrollY;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }
  }

    // Function to copy code to clipboard
    function copyCode(slideNumber) {
      let codeTextarea = document.querySelectorAll('.code-section textarea')[slideNumber - 1];
      let codeContent = codeTextarea.value.trim();

      if (codeContent !== "") {
        navigator.clipboard.writeText(codeContent).then(function() {
          alert('Code copied to clipboard!');
        }).catch(function(err) {
          console.error('Unable to copy to clipboard', err);
        });
      }
    }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    let codeBoxes = document.getElementsByClassName("code-section");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      if (codeBoxes[i]) {
        codeBoxes[i].style.display = "none";
      }
    }

    for (i = 0; dots && i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    if (dots && dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += " active";
    }

    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
      if (codeBoxes[slideIndex - 1] && codeBoxes[slideIndex - 1].querySelector('textarea').value.trim() !== "") {
        codeBoxes[slideIndex - 1].style.display = "block";
      }
    }
  }

  // Function to copy code to clipboard
  function copyCode(slideNumber) {
    let codeTextarea = document.querySelectorAll('.code-section textarea')[slideNumber - 1];
    let codeContent = codeTextarea.value.trim();

    if (codeContent !== "") {
      navigator.clipboard.writeText(codeContent).then(function() {
        alert('Code copied to clipboard!');
      }).catch(function(err) {
        console.error('Unable to copy to clipboard', err);
      });
    }
  }