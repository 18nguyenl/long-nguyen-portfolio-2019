import LocomotiveScroll from 'locomotive-scroll';
import Highway from '@dogstudio/highway';
import {Curtains} from 'curtainsjs';

import Fade from './fade';
import StaggerTranslateUp from './staggerTranslateUp';

import HomeRenderer from './homeRenderer';

window.onload = () => {
    // const curtains = new Curtains({
    //     container: "canvas",
    // })

    const scroll = new LocomotiveScroll({
        el: document.querySelector("#js-scroll"),
        smooth: true,
        inertia: 0.5,
        passive: true,
        smoothMobile: true,
    });

    const H = new Highway.Core({
        transitions: {
            default: Fade,
            blog: StaggerTranslateUp,
        },
        renderers: {

        }
    });
}

