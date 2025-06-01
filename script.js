document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");
  const header = document.querySelector("header");
  const body = document.body;

  function adjustBodyPadding() {
    const headerHeight = header.offsetHeight;
    body.style.paddingTop = `${headerHeight}px`;
  }

  adjustBodyPadding();

  window.addEventListener("resize", adjustBodyPadding);

  menuToggle.addEventListener("click", function () {
    navUl.classList.toggle("show");
  });
});
