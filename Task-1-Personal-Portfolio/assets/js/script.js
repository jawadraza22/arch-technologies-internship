'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// page navigation functionality
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}

/**
 * Image Modal for Projects and Certificates
 */

const imgModalContainer = document.querySelector("[data-img-modal-container]");
const imgModalCloseBtn = document.querySelector("[data-img-modal-close-btn]");
const imgModalOverlay = document.querySelector("[data-img-overlay]");
const imgModalImg = document.querySelector("[data-img-modal-img]");

const imgModalToggle = function () {
  imgModalContainer.classList.toggle("active");
  imgModalOverlay.classList.toggle("active");
  document.body.classList.toggle("modal-active");
}

// Global click listener for images
document.addEventListener("click", function (e) {
  // Find the closest parent that might be a project or certificate item
  const projectItem = e.target.closest(".project-item");
  const certificateItem = e.target.closest(".certificate-item");
  
  if (projectItem || certificateItem) {
    const item = projectItem || certificateItem;
    // Specifically look for the image inside this item
    const img = item.querySelector("img");
    
    if (img) {
      // If it's a project link, stop it from navigating
      if (e.target.closest("a")) {
        e.preventDefault();
      }
      
      imgModalImg.src = img.src;
      imgModalImg.alt = img.alt;
      imgModalToggle();
    }
  }
});

// Close modal listeners
if (imgModalCloseBtn) imgModalCloseBtn.addEventListener("click", imgModalToggle);
if (imgModalOverlay) imgModalOverlay.addEventListener("click", imgModalToggle);

/**
 * Typewriter Animation for Sidebar Title
 */
const titleElement = document.querySelector("[data-title-animation]");
const titles = ["Web developer", "Data Analyst"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function typeAnimation() {
  const currentTitle = titles[titleIndex];
  
  if (isDeleting) {
    titleElement.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 100;
  } else {
    titleElement.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 200;
  }

  if (!isDeleting && charIndex === currentTitle.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    typeSpeed = 500;
  }

  setTimeout(typeAnimation, typeSpeed);
}

// Start animation
typeAnimation();

/**
 * Floating Animation for Service Icons
 */
const serviceIcons = document.querySelectorAll(".service-icon-box img");
serviceIcons.forEach((icon, index) => {
  icon.style.animation = `float 3s ease-in-out infinite`;
  icon.style.animationDelay = `${index * 0.5}s`;
});