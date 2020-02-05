window.addEventListener("load", () => {
  // if ('scrollRestoration' in history) {
  //     // Back off, browser, I got this...
  //     history.scrollRestoration = 'manual';
  // }

  // Temporary preload
  document.body.style.display = "block";

  const menuButton = document.getElementById("hamburger__decoration");
  const navigation = document.getElementById("navigation");

  menuButton.addEventListener("click", e => {
    menuButton.classList.toggle("hamburger__menu--exit");
    navigation.classList.toggle("navigation--visible");
  });
});
