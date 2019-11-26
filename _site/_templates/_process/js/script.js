import { Curtains } from 'curtainsjs';
import LocomotiveScroll from "locomotive-scroll";
import barba from "@barba/core";

import Tween from "gsap";

import HomeShader from "./homeShader";

import AssetLoader from "./AssetLoader";

window.addEventListener("load", () => {
  // if ('scrollRestoration' in history) {
  //     // Back off, browser, I got this...
  //     history.scrollRestoration = 'manual';
  // }

  // Temporary preload
  document.body.style.display = "block";

  const menuButton = document.getElementById("hamburger__decoration");
  const navigation = document.getElementById("navigation");

  const curtains = new Curtains({
    container: "canvas",
    watchScroll: false
  });

  menuButton.addEventListener("click", e => {
    menuButton.classList.toggle("hamburger__menu--exit");
    navigation.classList.toggle("navigation--visible");
  });

  const scrollContainer = document.getElementById("js-scroll");

  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    inertia: 0.5,
    smoothMobile: true
  });

  const homeShader = new HomeShader(curtains, scroll);

  barba.hooks.before(data => {
    menuButton.classList.remove("hamburger__menu--exit");
    navigation.classList.remove("navigation--visible");
  });

  let fadeTransition = {
    name: "Fade",
    leave(data) {
      scroll.destroy();
      Tween.fromTo(
        data.current.container,
        0.5,
        { opacity: 1 },
        {
          opacity: 0,
        }
      );
    },
    enter(data) {
      scroll.init();
      // Animation
      Tween.fromTo(
        data.next.container,
        0.5,
        { opacity: 0 },
        {
          opacity: 1,
        }
      );

      AssetLoader.load({
        element: data.next.container, progress: function (progress, length) {
          scroll.update();
          console.log({ progress, length });
        }
      }).then(() => {
        
      })
    },
    after(data) {
      
    },
    namespace: ["home", "blog"]
  };

  let homeView = {
    namespace: "home",
    afterEnter(data) {
      homeShader.createPlanes();
      window.dispatchEvent(new Event('resize'));
    },
    beforeLeave(data) {
      homeShader.cleanPlanes();
    },
  };

  barba.init({
    transitions: [fadeTransition],
    views: [homeView]
  });
});
