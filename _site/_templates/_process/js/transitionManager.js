import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';

import { scroll } from './bidello';
import { component } from 'bidello';

import defaultTransition from './barba/transitions/default';

class TransitionManager extends component() {
    init() {
        barba.use(barbaPrefetch);

        barba.hooks.after((data) => {
            scroll.init();
        });

        barba.hooks.before((data) => {
            scroll.destroy();
        });

        this.barba = barba.init({
            preventRunning: true,
            debug: true,
            transitions: [defaultTransition],
        });

        console.log("Transition Manager loaded");
    }

    registerTransition(from, to) {
        defaultTransition.from.namespace.push(from);
        defaultTransition.to.namespace.push(to);
    }
}

export default TransitionManager;