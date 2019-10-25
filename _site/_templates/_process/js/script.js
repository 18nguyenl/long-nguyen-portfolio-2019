import LocomotiveScroll from 'locomotive-scroll';
import Highway from '@dogstudio/highway';
import {Curtains} from 'curtainsjs';

import Fade from './fade';
import StaggerTranslateUp from './staggerTranslateUp';

window.addEventListener('load', () => {
    // const curtains = new Curtains({
    //     container: "canvas",
    // })

    if ('scrollRestoration' in history) {
        // Back off, browser, I got this...
        history.scrollRestoration = 'manual';
    }

    // const scrollContainer = document.querySelector("#js-scroll");

    // const scroll = new LocomotiveScroll({
    //     el: scrollContainer,
    //     smooth: true,
    //     inertia: 0.5,
    //     smoothMobile: true,
    // });

    // scroll.scrollTo(scrollContainer)

    // const H = new Highway.Core({
    //     transitions: {
    //         default: Fade,
    //         blog: StaggerTranslateUp,
    //     },
    //     renderers: {

    //     }
    // });

    // H.on('NAVIGATE_IN', () => {
    //     scroll.destroy();
    //     scroll.init();
    //     scroll.scrollTo(scrollContainer)
    // })
})

