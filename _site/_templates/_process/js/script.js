import { Curtains } from 'curtainsjs';
import LocomotiveScroll from "locomotive-scroll";
import barba from "@barba/core";
import barbaPrefetch from '@barba/prefetch';

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

  AssetLoader.load({}).then(() => {
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

      scroll.destroy();
    });

    barba.hooks.after(data => {
      scroll.init();
    })

    let fadeTransition = {
      name: "Fade",
      before(data) {
        data.current.namespace == "home" && Tween.fromTo({ scrollEffect: homeShader.scrollEffect }, 0.3, { scrollEffect: 0 }, { scrollEffect: 100 });
      },
      leave(data) {
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
      beforeEnter(data) {
        AssetLoader.load({
          element: data.next.container, progress: function (progress, length) {
            console.log({ progress, length });
          }
        }).then(() => {
          homeShader.createPlanes();
          console.log("planes drawn")
        })
      },
      beforeLeave(data) {
        homeShader.cleanPlanes();
      }
    }

    barba.use(barbaPrefetch);

    barba.init({
      transitions: [fadeTransition],
      views: [homeView]
    });
  })
});
