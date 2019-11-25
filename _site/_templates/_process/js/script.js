import LocomotiveScroll from "locomotive-scroll";
import barba from "@barba/core";
import { Curtains } from "curtainsjs";

import waveFS from "../../../shaders/wave.frag";
import waveVS from "../../../shaders/wave.vert";

import Tween from "gsap";

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

  const scrollContainer = document.getElementById("js-scroll");

  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    inertia: 0.5,
    smoothMobile: true
  });

  // scroll.scrollTo(document.querySelector(".portfolio__section"));
  let planes = [];
  let scrollEffect = 0;

  let planeElements = document.getElementsByClassName("plane");

  const curtains = new Curtains({
    container: "canvas",
    watchScroll: false
  });

  curtains.onRender(() => {
    if (scroll.isMobile) {
      if (scrollEffect >= 0) {
        scrollEffect = Math.max(0, scrollEffect - 2);
      } else {
        scrollEffect = Math.min(0, scrollEffect + 2);
      }
    }
  });

  function updateScroll(xOffset, yOffset) {
    curtains.updateScrollValues(xOffset, yOffset);

    let delta = curtains.getScrollDeltas();

    delta.y = -delta.y;

    // threshold
    if (delta.y > 60) {
      delta.y = 60;
    } else if (delta.y < -60) {
      delta.y = -60;
    }

    if (scroll.isMobile && Math.abs(delta.y) > Math.abs(scrollEffect)) {
      scrollEffect = delta.y;
    } else {
      scrollEffect = delta.y * 1.5;
    }

    planes.forEach(e => {
      e.updateScrollPosition();

      if (Math.abs(delta.y) <= 1) {
        e.uniforms.time.value = 0;
      }

      e.uniforms.scrollEffect.value = scrollEffect;
    });
  }

  // we'll render only while lerping the scroll
  // curtains.disableDrawing();
  scroll.on("scroll", obj => {
    updateScroll(obj.scroll.x, obj.scroll.y);
  });

  // no need for shaders as they were already passed by data attributes
  let params = {
    vertexShader: waveVS,
    fragmentShader: waveFS,
    widthSegments: 10,
    heightSegments: 10,
    uniforms: {
      scrollEffect: {
        name: "uScrollEffect",
        type: "1f",
        value: 0.0
      },
      time: {
        name: "uTime",
        type: "1f",
        value: 0.0
      },
      resolution: {
        name: "uRes",
        type: "2f",
        value: [window.innerWidth, window.innerHeight]
      }
    }
  };

  // add our planes and handle them
  for (let i = 0; i < planeElements.length; i++) {
    let plane = curtains.addPlane(planeElements[i], params);

    if (plane) {
      planes.push(plane);

      handlePlanes(i);
    }
  }

  // handle all the planes
  function handlePlanes(index) {
    let plane = planes[index];

    // check if our plane is defined and use it
    plane &&
      plane
        .onReady(function() {
          // apply parallax on load
          // applyPlanesParallax(index);

          // once everything is ready, display everything
          if (index == planes.length - 1) {
            document.body.classList.add("planes-loaded");
            scroll.start();
          }
        })
        .onRender(function() {
          plane.uniforms.time.value++;
        });
  }

  barba.hooks.before(data => {
    menuButton.classList.remove("hamburger__menu--exit");
    navigation.classList.remove("navigation--visible");
  });

  let fadeTransition = {
    name: "Fade",
    before(data) {
      planes.forEach(e => {
        curtains.removePlane(e);
      });
      planes = [];
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
    },
    after(data) {
      scroll.init();
    },
    namespace: ["home", "blog"]
  };

  let homeView = {
      namespace: "home",
      afterEnter(data) {
        planeElements = document.getElementsByClassName("plane");
        for (let i = 0; i < planeElements.length; i++) {
            let plane = curtains.addPlane(planeElements[i], params);

            if (plane) {
            planes.push(plane);

            handlePlanes(i);
            }
        }
        // console.log(curtains.planes)
      }
  };

  barba.init({
    transitions: [fadeTransition],
    views: [homeView]
  });
});
