import isMobile from './utils/touchscreen';

class Load {
    constructor() {
        if (!isMobile()) {
            document.body.style.overflow = "hidden";

            document.querySelectorAll('a').forEach((ele) => {
                ele.addEventListener("click", (e) => {
                    e.preventDefault();
                });
            });
        }
   }
}

export const load = new Load();