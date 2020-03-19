import renderer from './renderer';
import camera from './camera';
import scene from './scene';
import { component } from 'bidello';
import { scroll } from './bidello';
import assets from './assets';
import trackable from './kapla/Trackable';

import isMobile from './utils/touchscreen'; 

import { Application } from 'kapla';

import load from './load';
import TransitionManager from './transitionManager';
import preloader from './preload';

class Site extends component() {
  init() {
    if ('scrollRestoration' in history) {
      // Back off, browser, I got this...
      history.scrollRestoration = 'manual';
    }

    assets.load();

    if (!isMobile()) {
      document.body.appendChild(renderer.domElement);
    }
  }
  
  onRaf() {
    renderer.render(scene, camera);
    // postfx.render(scene, camera);
  }

  onLoadEnd() {
    scroll.init();

    if (!isMobile()) {
      this.app = Application.start();
      this.app.register("trackable", trackable);
    }
    this.transitionManager = new TransitionManager();

    console.log('finished loader!');
  }
}

new Site();