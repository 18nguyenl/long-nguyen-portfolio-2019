import Highway from '@dogstudio/highway';

import LocomotiveScroll from 'locomotive-scroll';

import WebGL from './webgl';

class HomeRenderer extends Highway.Renderer {
    onEnter() {
        // if ('scrollRestoration' in history) {
        //     // Back off, browser, I got this...
        //     history.scrollRestoration = 'manual';
        // }
        
        const menuButton = document.getElementById("hamburger__decoration");
        const navigation = document.getElementById("navigation");
        
        menuButton.addEventListener('click', (e) => {
            menuButton.classList.toggle('hamburger__menu--exit');
            navigation.classList.toggle('navigation--visible');
        })
        
        const scrollContainer = document.querySelector("#js-scroll");
        
        const scroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            inertia: 0.5,
            smoothMobile: true,
        });
        this.webgl = new WebGL(scroll);
    }

    onLeave() {
        // curtains.dispose();
    }
}

export default HomeRenderer;