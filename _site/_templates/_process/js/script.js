import settings from './settings';
import * as helpers from './bidello';
import renderer from './renderer';
import camera from './camera';
import scene from './scene';
import { component } from 'bidello';
import { scroll } from './bidello';
import postfx from './postfx/postfx';
import assets from './assets';
import trackable from './kapla/Trackable';

import { Application } from 'kapla';

import TransitionManager from './transitionManager';

class Site extends component() {
  init() {
    if ('scrollRestoration' in history) {
      // Back off, browser, I got this...
      history.scrollRestoration = 'manual';
    }

    assets.load();

    const menuButton = document.getElementById("hamburger__decoration");
    const navigation = document.getElementById("navigation");

    menuButton.addEventListener("click", e => {
      menuButton.classList.toggle("hamburger__menu--exit");
      navigation.classList.toggle("navigation--visible");
    });

    document.body.appendChild(renderer.domElement);
  }
  
  onRaf() {
    renderer.render(scene, camera);
    // postfx.render(scene, camera);
  }

  onLoadEnd() {
    scroll.init();

    this.app = Application.start();
    this.app.register("trackable", trackable);
    this.transitionManager = new TransitionManager();

    console.log('finished loader!');
  }
}

new Site();