window.addEventListener("load", function () {
  // Hide loading overlay and show main content
  tdocument.getElementById("loading-overlay").style.display = "none";
  document.getElementById("main-content").style.display = "block";
});

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

  link1.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".header");
  });

  link2.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".header", 1);
  });

  link3.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".header", 2);
  });
  link4.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToElement(".column", 3);
  });
});

function scrollToElement(selector, index = 0) {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    elements[index].scrollIntoView({ behavior: "smooth" });
  }
}
