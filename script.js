document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");
  const header = document.querySelector("header");
  const body = document.body;

  function adjustBodyPadding() {
    const headerHeight = header.offsetHeight;
    body.style.paddingTop = `${headerHeight}px`;
  }

  function adjustCurtains() {
    const screenWidth = window.innerWidth;
    const leftCurtain = document.querySelector(".cortina-esq");
    const rightCurtain = document.querySelector(".cortina-dir");

    if (leftCurtain && rightCurtain) {
      if (screenWidth < 1180) {
        const offset = ((1180 - screenWidth) / 155) * 100;
        leftCurtain.style.transform = `translateX(-${offset}%)`;
        rightCurtain.style.transform = `translateX(${offset}%)`;
      } else {
        leftCurtain.style.transform = "translateX(0)";
        rightCurtain.style.transform = "translateX(0)";
      }
    }
  }

  function scrollToSection(id) {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const scrollToPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });
    }
  }

  adjustBodyPadding();
  adjustCurtains();

  window.addEventListener("resize", () => {
    adjustBodyPadding();
    adjustCurtains();
    updateActiveLink();
  });

  menuToggle.addEventListener("click", function () {
    navUl.classList.toggle("show");
  });

  const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
  const logoLink = document.querySelector(".logo-link");

  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToSection(this.getAttribute("href"));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToSection(this.getAttribute("href"));

      if (navUl.classList.contains("show")) {
        navUl.classList.remove("show");
      }
    });
  });

  const sections = document.querySelectorAll(
    "main#inicio, section[id]:not(#inicio)"
  );
  const navigableSections = Array.from(sections).filter((section) => {
    return Array.from(navLinks).some(
      (link) => link.getAttribute("href") === `#${section.id}`
    );
  });

  const updateActiveLink = () => {
    let currentSectionId = null;
    const headerHeight = header.offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 1;

    for (let i = navigableSections.length - 1; i >= 0; i--) {
      const section = navigableSections[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionId = section.id;
        break;
      }
    }

    navLinks.forEach((link) => link.classList.remove("active-link"));

    if (currentSectionId) {
      const correspondingLink = document.querySelector(
        `nav ul li a[href="#${currentSectionId}"]`
      );
      if (correspondingLink) {
        correspondingLink.classList.add("active-link");
      }
    }
    if (window.scrollY < headerHeight) {
      navLinks.forEach((link) => link.classList.remove("active-link"));
    }
  };

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);
});
