document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("wheel", handleWheel, { passive: false });
  document.addEventListener("keydown", handleKeyPress);

  $("#scroll-for-info").on("click", () => {
    document
      .getElementById("the-couple")
      .scrollIntoView({ behavior: "smooth" });
    handleNavbarVisibility(targetSection);
  });

  function handleWheel(event) {
    const isScrollingDown = event.deltaY > 0;
    const currentSection = getCurrentSection();
    if (
      (currentSection === "hero" && isScrollingDown) ||
      (currentSection === "the-couple" && !isScrollingDown)
    ) {
      const targetSection = currentSection === "hero" ? "the-couple" : "hero";
      document
        .getElementById(targetSection)
        .scrollIntoView({ behavior: "smooth" });
      handleNavbarVisibility(targetSection);
      event.preventDefault();
    }
  }

  function handleKeyPress(event) {
    const isArrowDown = event.key === "ArrowDown" || event.key === "ArrowRight";
    const currentSection = getCurrentSection();
    if (
      (currentSection === "hero" && isArrowDown) ||
      (currentSection === "the-couple" && !isArrowDown)
    ) {
      const targetSection = currentSection === "hero" ? "the-couple" : "hero";
      document
        .getElementById(targetSection)
        .scrollIntoView({ behavior: "smooth" });
      handleNavbarVisibility(targetSection);
      event.preventDefault();
    }
  }

  function handleNavbarVisibility(targetSection) {
    const navbar = document.getElementById("navbar");
    if (targetSection === "the-couple") {
      document.body.style.overflow = "visible";
      navbar.classList.remove("d-none");
    } else {
      navbar.classList.add("d-none");
      document.body.style.overflow = "hidden";
    }
  }

  function getCurrentSection() {
    const heroRect = document.getElementById("hero").getBoundingClientRect();
    const theCoupleRect = document
      .getElementById("the-couple")
      .getBoundingClientRect();
    if (heroRect.top >= 0) return "hero";
    else if (theCoupleRect.top >= 0) return "the-couple";
    else return "";
  }
});

$(document).ready(function () {
  $(".fade-in").waypoint(
    function () {
      $(this.element).addClass("fade-in-visible");
    },
    {
      offset: "85%",
    }
  );
  $(".the-couple").waypoint((direction) => showNavbar(direction == "down"));

  function showNavbar(show) {
    console.log("a");
    const navbar = document.getElementById("navbar");
    if (show) {
      document.body.style.overflow = "visible";
      navbar.classList.remove("d-none");
    } else {
      navbar.classList.add("d-none");
      document.body.style.overflow = "hidden";
    }
  }

  if ($(window).width() <= 768) {
    $(".gallery-grid").addClass("carousel-mobile").removeClass("gallery-grid");

    $(".gallery-img")
      .children("a")
      .each(function () {
        $(this).removeClass("venobox");
        $(this).removeClass("vbox-item");
      });
    // Carousel init
    $(".carousel-mobile").flickity({
      cellSelector: ".item",
      cellAlign: "left",
      contain: true,
      wrapAround: true,
      adaptiveHeight: true,
      //draggable: false,
      imagesLoaded: true,
      pauseAutoPlayOnHover: false,
    });
  }
});
