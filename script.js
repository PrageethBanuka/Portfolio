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
    scrollToElement(".header", 3);
  });
});

function scrollToElement(selector, index = 0) {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    elements[index].scrollIntoView({ behavior: "smooth" });
  }
}
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 2000);
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const formData = new FormData(this);
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Submit form data via Formspree API
    fetch("https://formspree.io/f/xnnqdzrl", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById(
            "formMessage"
          ).textContent = `Thank you, ${name}! Your message has been sent. We'll reach out to you at ${email} soon.`;
          document.getElementById("formMessage").style.color = "green";
          document.getElementById("contactForm").reset(); // Clear form fields
        } else {
          document.getElementById("formMessage").textContent =
            "Oops! There was a problem sending your message.";
          document.getElementById("formMessage").style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        document.getElementById("formMessage").textContent =
          "Oops! There was a problem sending your message.";
        document.getElementById("formMessage").style.color = "red";
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

// Include CryptoJS for encryption and decryption
// Add this <script> to your HTML head if CryptoJS is not already included:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    // Replace with your crush's email and encrypted key
    const crushEmail = "nethminiherath.hm@gmail.com"; 
    const encryptedKey =
      "U2FsdGVkX18yk0SqtwSjovAEfY8Q4z5J93CAlkNrWMdSE7BzA4wTo7gk7LQIWMjFsnN8KWj8aIeSOXdymGh1kw=="; // Replace with your encrypted key
    const passphrase = "Ruhuna@2002&2003"; // Replace with the passphrase used to encrypt

    if (email === crushEmail) {
      // Decrypt the key
      const decryptedKey = CryptoJS.AES.decrypt(
        encryptedKey,
        passphrase
      ).toString(CryptoJS.enc.Utf8);

      // Show success message
      const formMessage = document.getElementById("formMessage");
      formMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
      formMessage.style.color = "green";

      // Display the decrypted secret key
      const secretKeyDisplay = document.getElementById("secretKeyDisplay");
      secretKeyDisplay.textContent = `Your secret key is: ${decryptedKey} \nTry to De64de it`;
      secretKeyDisplay.style.display = "block";

      // Clear the form
      document.getElementById("contactForm").reset();
    } else {
      // Show error message for invalid email
      const formMessage = document.getElementById("formMessage");
      formMessage.textContent =
        "Invalid email. Only special people can receive the key!";
      formMessage.style.color = "red";
    }
  });