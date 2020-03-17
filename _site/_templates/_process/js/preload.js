import { component } from 'bidello';
import gsap from 'gsap';

class Preloader extends component() {
    init() {
        this.preloadDOM = document.querySelector(".preload");
        this.preloadDOMText = document.querySelector(".preload__text");
    }

    onLoadProgress({ progress }) {
        console.log(progress) 
        gsap.killTweensOf(this.preloadDOMText);
        gsap.to(this.preloadDOMText, 1, { textContent: progress.toFixed(2), roundProps: "textContent"}).then(() => {
            if (progress >= 100) {
                // anim.then(() => this.preloadDOM.classList.add("preload__done"));
                this.preloadDOM.classList.add("preload__done");
            }
        });
    }
}

export const preloader = new Preloader();