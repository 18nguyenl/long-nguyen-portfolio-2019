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
