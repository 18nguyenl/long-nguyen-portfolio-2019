import {
    Mesh,
    PlaneBufferGeometry,
    RawShaderMaterial,
    Vector2
  } from 'three';
  
  import dom3D from '../dom3D';
  import scene from '../scene';
  import textures from '../gl/utils/textures';
  import { viewport } from '../bidello';

  import gsap from 'gsap';
  
  const geometry = new PlaneBufferGeometry(1, 1, 20, 20);
  
  const material = new RawShaderMaterial({
    transparent: true,
    fragmentShader: require('./image.frag'),
    vertexShader: require('./image.vert'),
  });

  export default class extends dom3D {
    init() {
      super.init();

      this.geometry = geometry;
      this.material = material.clone();
      const texture = textures.getTexture([this.element.getAttribute("data-label")]);

      this.material.uniforms = {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uImage: { value: texture },
        uRes: { value: new Vector2(viewport.width, viewport.height) },
        uImageRes: { value: new Vector2(this.element.width, this.element.height)},
        uScrollEffect: { value: 0 }
        // uWind: { value: textures.fromAsset('wind') },
        // uShow: { value: 0 },
        // uClipping: { value: 1.0 }
      };

      this.mesh = new Mesh(this.geometry, this.material);
  
      this.add(this.mesh);
      scene.add(this);

      // Handle hovers...
    }
  
    onRaf({ delta }) {
      super.onRaf();
      
      this.material.uniforms.uTime.value += delta * 0.1;
    }

    onScroll({ delta }) {
      super.onScroll();

      gsap.to(this.material.uniforms.uScrollEffect, 0.3, { value: delta })
    }
  }