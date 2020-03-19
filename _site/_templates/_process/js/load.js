import isMobile from './utils/touchscreen';

class Load {
    constructor() {
        document.body.style.overflow = "hidden";

        if (!isMobile()) {
            document.querySelectorAll('a').forEach((ele) => {
                ele.addEventListener("click", (e) => {
                    e.preventDefault();
                });
            });
        }
   }
}

export const load = new Load();