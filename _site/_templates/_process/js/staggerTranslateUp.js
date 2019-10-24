import Tween, { TimelineLite, Power3 } from 'gsap';
import Highway from '@dogstudio/highway';

class StaggerTranslateUp extends Highway.Transition {
    in({ from, to, done}) {
        from.remove();

        const elements = [...to.children]
        Array.prototype.push.apply(elements, elements[1].children)
        const timeline = new TimelineLite();
        timeline.staggerFrom(elements, 0.5, {
            y: 20,
            opacity: 0,
            ease: Power3.easeInOut,
            onComplete: done
        }, 0.1)
    }

    out({ from, done }) {
        Tween.fromTo(from, 0.5,
            { opacity: 1 },
            {
            opacity: 0,
            onComplete: done
            }
        );
    }
}

export default StaggerTranslateUp;