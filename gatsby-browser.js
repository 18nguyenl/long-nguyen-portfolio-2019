/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import { map, lerp } from "./src/library/MathUtil"

let winsize;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize();

window.addEventListener('resize', calcWinsize);