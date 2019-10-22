import LocomotiveScroll from 'locomotive-scroll';
import Highway from '@dogstudio/highway';
import {Curtains} from 'curtainsjs';

import Fade from './fade';
import StaggerTranslateUp from './staggerTranslateUp';

import HomeRenderer from './homeRenderer';

(() => {
    if ('scrollRestoration' in history) {
        // Back off, browser, I got this...
        history.scrollRestoration = 'manual';
    }

    const curtains = new Curtains({
        container: "canvas",
    })

    const scroll = new LocomotiveScroll({
        el: document.querySelector("#js-scroll"),
        smooth: true,
    });

    const H = new Highway.Core({
        transitions: {
            default: Fade,
            blog: StaggerTranslateUp,
        },
        renderers: {

        }
    });
})();

