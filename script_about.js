// Set a maximum timeout to hide the loading overlay
const timeoutDuration = 5000; // 5 seconds
let timeout;

// Function to hide the loading overlay
function hideLoadingOverlay() {
  document.getElementById("loading-overlay").style.display = "none";
  document.getElementById("content").style.display = "block";
  clearTimeout(timeout); // Clear the timeout if it’s still running
}

// Hide overlay when the page finishes loading
window.addEventListener("load", hideLoadingOverlay);

// Set a timeout to hide overlay after a maximum of 3 seconds
timeout = setTimeout(hideLoadingOverlay, timeoutDuration);

function scrollToElement(elementSelector, instance = 0) {
  // Select all elements that match the given selector
  const elements = document.querySelectorAll(elementSelector);
  // Check if there are elements matching the selector and if the requested instance exists
  if (elements.length > instance) {
    // Scroll to the specified instance of the element
    elements[instance].scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const link1 = document.getElementById("link1");
  const link2 = document.getElementById("link2");
  const link3 = document.getElementById("link3");
  const link4 = document.getElementById("link4");
  const link6 = document.getElementById("link6");

  link1.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".container", 1);
  });

  link2.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".container", 2);
  });

  link3.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".container", 3);
  });
  link4.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".container", 4);
  });
  link6.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".container", 5);
  });
});

function scrollToElement(selector, index = 0) {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    elements[index].scrollIntoView({ behavior: "smooth" });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".aboutlist li");
  skills.forEach((skill, index) => {
    skill.style.opacity = 0; // Start hidden
    setTimeout(() => {
      skill.style.opacity = 1; // Make visible
      skill.style.transition = "opacity 0.5s ease-in-out";
    }, index * 300); // Delay each skill by 500ms
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(".container");

  const fadeInContainer = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  };

  const observer = new IntersectionObserver(fadeInContainer, {
    threshold: 0.1, // Adjust the threshold as needed
  });

  containers.forEach((container) => {
    observer.observe(container);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");

  const updateActiveNav = () => {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navItems.forEach((navItem) => navItem.classList.remove("active"));
    navItems[index].classList.add("active");
  };

  // Smooth scrolling
  navItems.forEach((item, idx) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      sections[idx].scrollIntoView({ behavior: "smooth" });
    });
  });

  // On scroll, update active nav
  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
});

document.addEventListener("DOMContentLoaded", () => {
  const sideNav = document.querySelector(".side-nav");
  const header = document.querySelector("header");

  const toggleSideNav = () => {
    const headerBottom = header.getBoundingClientRect().bottom;

    if (headerBottom <= 0) {
      sideNav.classList.remove("hidden");
      sideNav.classList.add("visible");
    } else {
      sideNav.classList.remove("visible");
      sideNav.classList.add("hidden");
    }
  };

  // Check on scroll
  window.addEventListener("scroll", toggleSideNav);

  // Initial check
  toggleSideNav();
});

// Function to open the popup
function openOtherPopup() {
  const popup = document.getElementById("other-popup");
  if (popup) {
    popup.classList.add("visible");
    popup.classList.remove("hidden");
  }
}

// Function to close the popup
function closeOtherPopup() {
  const popup = document.getElementById("other-popup");
  if (popup) {
    popup.classList.remove("visible");
    popup.classList.add("hidden");
  }
}

// Attach event listener to the "Other" link in the mobile sidebar
document.getElementById("mobile-other-link").addEventListener("click", (e) => {
  e.preventDefault();
  openOtherPopup();
});

// Close button functionality
document.querySelector(".close-btn").addEventListener("click", closeOtherPopup);

// Function to open the popup
function openOtherPopup() {
  const popup = document.getElementById("other-popup");
  if (popup) {
    popup.classList.add("visible");
    popup.classList.remove("hidden");
  }
}

// Function to close the popup
function closeOtherPopup() {
  const popup = document.getElementById("other-popup");
  if (popup) {
    popup.classList.remove("visible");
    popup.classList.add("hidden");
  }
}

// Attach event listener to the "Other" link
document.getElementById("link5").addEventListener("click", (e) => {
  e.preventDefault();
  openOtherPopup();
});


