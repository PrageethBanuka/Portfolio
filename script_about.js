
  function scrollToElement(elementSelector, instance = 0) {
    // Select all elements that match the given selector
    const elements = document.querySelectorAll(elementSelector);
    // Check if there are elements matching the selector and if the requested instance exists
    if (elements.length > instance) {
        // Scroll to the specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const link1 = document.getElementById("link1");
    const link2 = document.getElementById("link2");
    const link3 = document.getElementById("link3");
    const link4 = document.getElementById("link4");
  
    link1.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement('.container', 1);
    });
  
    link2.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement('.container', 2);
    });
  
    link3.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement('.container',3);
    });
    link4.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement('.container',4);
    });
  });
  
  function scrollToElement(selector, index = 0) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
        elements[index].scrollIntoView({ behavior: 'smooth' });
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    const skills = document.querySelectorAll('.aboutlist li');
    skills.forEach((skill, index) => {
      skill.style.opacity = 0; // Start hidden
      setTimeout(() => {
        skill.style.opacity = 1; // Make visible
        skill.style.transition = 'opacity 0.5s ease-in-out';
      }, index * 500); // Delay each skill by 500ms
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
  