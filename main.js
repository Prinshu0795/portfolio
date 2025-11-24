// Mobile navbar toggle
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// Set current year in footer
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();