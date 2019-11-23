import LocomotiveScroll from 'locomotive-scroll';
import Highway from '@dogstudio/highway';
import {Curtains} from 'curtainsjs';

import Fade from './fade';
import StaggerTranslateUp from './staggerTranslateUp';

import HomeRenderer from './homeRenderer';

window.addEventListener('load', () => {
    const H = new Highway.Core({
        transitions: {
            default: Fade,
            // blog: StaggerTranslateUp,
        },
        renderers: {
            home: HomeRenderer,
        }
    });

    H.on('NAVIGATE_IN', () => {
        // scroll.destroy();
        // scroll.init();
        // scroll.scrollTo(scrollContainer)
    })
})

