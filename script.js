window.addEventListener("load", function () {
  // Hide loading overlay and show main content when page loads
  document.getElementById("loading-overlay").style.display = "none";
  document.getElementById("content").style.display = "block";
});

// Set a time limit to hide the loading overlay automatically
setTimeout(function () {
  document.getElementById("loading-overlay").style.display = "none";
  document.getElementById("content").style.display = "block";
}, 5000); 

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
