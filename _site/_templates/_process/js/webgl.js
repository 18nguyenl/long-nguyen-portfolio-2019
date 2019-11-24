import LocomotiveScroll from 'locomotive-scroll';
import {Curtains} from 'curtainsjs';

import waveFS from "../../../shaders/wave.frag";
import waveVS from "../../../shaders/wave.vert";

export default class WebGL {
    constructor(scroll) {
        this.planes = [];
        this.scrollEffect = 0;
        this.scroll = scroll;
        
        this.planeElements = document.getElementsByClassName("plane");
        
        this.curtains = new Curtains({
            container: "canvas",
            watchScroll: false,
        })
        
        this.curtains.onRender(() => {
            if(this.scroll.isMobile) {
                if(this.scrollEffect >= 0) {
                    this.scrollEffect = Math.max(0, this.scrollEffect - 2);
                }
                else {
                    this.scrollEffect = Math.min(0, this.scrollEffect + 2);
                }
            }
        })
        
        // we'll render only while lerping the scroll
        // this.curtains.disableDrawing();
        this.scroll.on('scroll', (obj) => {
            this.updateScroll(obj.scroll.x, obj.scroll.y);
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
                    value: 0.0,
                },
                time: {
                    name: "uTime",
                    type: "1f",
                    value: 0.0,
                },
                resolution: {
                    name: "uRes",
                    type: "2f",
                    value: [window.innerWidth, window.innerHeight],
                }
            },
        };
        
        // add our this.planes and handle them
        for(let i = 0; i < this.planeElements.length; i++) {
            let plane = this.curtains.addPlane(this.planeElements[i], params);
            
            if(plane) {
                this.planes.push(plane);
                
                this.handlePlanes(i);
            }
        }
    }
    
    updateScroll(xOffset, yOffset) {
        this.curtains.updateScrollValues(xOffset, yOffset);
        
        let delta = this.curtains.getScrollDeltas();
        
        delta.y = -delta.y;
        
        // threshold
        if(delta.y > 60) {
            delta.y = 60;
        }
        else if(delta.y < -60) {
            delta.y = -60;
        }
        
        if(scroll.isMobile && Math.abs(delta.y) > Math.abs(this.scrollEffect)) {
            this.scrollEffect = delta.y;
        }
        else {
            this.scrollEffect = delta.y * 1.5;
        }
        
        this.planes.forEach(e => {
            e.updateScrollPosition();
            
            if (Math.abs(delta.y) <= 1) {
                e.uniforms.time.value = 0;
            }
            
            e.uniforms.scrollEffect.value = this.scrollEffect;
        })
    }
    
    // handle all the this.planes
    handlePlanes(index) {
        let plane = this.planes[index];
        
        // check if our plane is defined and use it
        plane && plane.onReady(() => {
            // apply parallax on load
            // applythis.planesParallax(index);
            this.scroll.start();
            
            // once everything is ready, display everything
            if(index == this.planes.length - 1) {
                document.body.classList.add("this.planes-loaded");
            }
        }).onRender(function() {
            plane.uniforms.time.value++;
        })
    }

    getCurtains() {
        return this.curtains;
    }

    cleanPlanes() {
        this.planes.forEach(e => {
            this.curtains.removePlane(e);
        })
    }
}