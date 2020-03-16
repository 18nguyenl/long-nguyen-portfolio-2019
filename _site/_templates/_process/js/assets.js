import { Loader } from 'resource-loader';
import bidello from 'bidello';
import deferred from './utils/deferred';
import gsap from 'gsap';

import textures from './gl/utils/textures';

const RESOURCES = [
  {
    name: 'Long Cutout',
    url: require('../../../images/Long Cutout.png')
  },
  {
    name: 'edgy picture',
    url: require('../../../images/edgy picture.jpg')
  },

  //  {
  //    name: 'photo',
  //    url: require('/assets/photo.glb'),
  //    loadType: Resource.LOAD_TYPE.XHR,
  //    xhrType: Resource.XHR_RESPONSE_TYPE.BLOB,
  //  },
];

/*
assets.resources.photo.loading.then(res => {
  console.log(res.meta.data);
});
*/

class Assets {
  constructor() {
    this.resources = {};
    this.preloadDOM = document.querySelector(".preload");
    this.preloadDOMText = document.querySelector(".preload__text");
    this.preloadTimeline = new gsap.timeline({paused: true});

    RESOURCES.forEach(entry => {
      this.resources[entry.name] = entry;
      this.resources[entry.name].loading = deferred();
    });
  }

  load() {
    this.deferred = deferred();
    this.loader = new Loader();

    bidello.trigger({ name: 'loadStart' });

    RESOURCES.forEach(res => {
      this.loader.add(res);
    });

    this.loader.onProgress.add(this.onProgress.bind(this));
    this.loader.use(this.use.bind(this));
    this.loader.load(this.finish.bind(this));

    return deferred;
  }

  use(resource, next) {
    textures.loadTexture({ resource }, next);
  }

  onProgress(loader, meta) {
    bidello.trigger({ name: 'loadProgress' }, { progress: this.loader.progress });

    gsap.killTweensOf(this.preloadDOMText);
    gsap.to(this.preloadDOMText, 1, { textContent: this.loader.progress.toFixed(2), roundProps: "textContent"}).then(() => {
      if (this.loader.progress >= 100) {
        // anim.then(() => this.preloadDOM.classList.add("preload__done"));
        this.preloadDOM.classList.add("preload__done");
      }
    });

    // this.preloadDOMText.textContent = this.loader.progress.toFixed(2);
    const res = this.resources[meta.name];
    res.meta = meta;
    res.loading.resolve(res);
  }

  finish() {
    this.deferred.resolve();

    bidello.trigger({ name: 'loadEnd' }, { resources: this.resources });
  }
}

export default new Assets();
