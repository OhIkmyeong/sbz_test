import { $main, $$ac, CURR_SHOW_IDX, LIMIT_SHOW_IDX, change_curr_show_idx, scKick } from "./model.js";

/**
 * 
 */
export function add_scroll_event() {
    window.addEventListener("scroll", () => {
        if(window.innerWidth < 600){ return; }
        const scKick = Array.from($$ac).map($ac => Number($ac.dataset.scrollKick));
        const scY = window.scrollY;
        const winHei = window.innerHeight;
        const sc = parseInt(scY);

        const get_top_first = (currIdx) => {
            const top = winHei - sc - 270;

            switch (currIdx) {
                case 0: {
                    if(top < 0){return 0}
                    return top;
                } break;
                case 1: {
                    return 0;
                } break;
                case 2: {
                    return 0;
                } break;
                case 3: {
                    return -90;
                } break;
                case 4: {
                    return -180;
                } break;
            }
        }//get_top_first

        const get_top_second = (currIdx) => {
            switch (currIdx) {
                case 0: {
                    const LIMIT = winHei - 180; 
                    return LIMIT;
                } break;
                case 1: {
                    const top = (winHei * 2) - sc - 90;
                    if (top <= 90) { return 90; }
                    return top;
                } break;
                case 2: {
                    return 90;
                } break;
                case 3: {
                    return 0
                } break;
                case 4: {
                    return -90
                } break;
            }
        }//get_top_second

        const get_top_third = (currIdx) => {
            switch (currIdx) {
                case 0:{
                    return winHei - 90;
                } break
                case 1: {
                    return winHei - 90;
                } break;
                case 2: {
                    const top = (winHei * 3) - sc - 90;
                    if (top <= 180) { return 180; }
                    return top;
                } break;
                case 3: {
                    return 90;
                } break;
                case 4: {
                    return 0;
                } break;
            }
        }//get_top_third

        const get_top_fourth = (currIdx) => {
            switch (currIdx) {
                case 0:{
                    return winHei;
                } break;
                case 1: {
                    return winHei;
                } break;
                case 2: {
                    return winHei ;
                } break;
                case 3: {
                    const top = (winHei * 4) - sc - 90;
                    if (top <= 180) { return 180; }
                    return top;
                } break;
                case 4: {
                    return 90;
                } break;
            }
        }//get_top_fourth

        const get_top_fifth = (currIdx) => {
            switch (currIdx) {
                case 0: { 
                    return winHei + 90;
                } break;
                case 1: { 
                    return winHei + 90;
                } break;
                case 2: { 
                    return winHei + 90;
                } break;
                case 3: { 
                    return winHei;
                } break;
                case 4: {
                    const top = (winHei * 5) - sc - 90;
                    if (top <= 180) { return 180; }
                    return top;
                } break;
            }
        }//get_top_fifth

        /* ======================== */
        if (sc <= scKick[0]) {
            // console.log("📍1")
            /* curr */
            $$ac[0].style.transform = `translateY(${get_top_first(0)}px)`;
            /* next */
            $$ac[1].style.transform = `translateY(${get_top_second(0)}px)`;
            $$ac[2].style.transform = `translateY(${get_top_third(0)}px)`;
            $$ac[3].style.transform = `translateY(${get_top_fourth(0)}px)`;
            $$ac[4].style.transform = `translateY(${get_top_fifth(0)}px)`;
        } else if (sc <= scKick[1]) {
            // console.log("📍📍2")
            /* prev */
            $$ac[0].style.transform = `translateY(${get_top_first(1)}px)`;
            /* curr */
            $$ac[1].style.transform = `translateY(${get_top_second(1)}px)`;
            /* next */
            $$ac[2].style.transform = `translateY(${get_top_third(1)}px)`;
            $$ac[3].style.transform = `translateY(${get_top_fourth(1)}px)`;
            $$ac[4].style.transform = `translateY(${get_top_fifth(1)}px)`;
        } else if (sc <= scKick[2]) {
            // console.log("📍📍📍3")
            /* prev */
            $$ac[0].style.transform = `translateY(${get_top_first(2)}px)`;
            $$ac[1].style.transform = `translateY(${get_top_second(2)}px)`;
            /* curr */
            $$ac[2].style.transform = `translateY(${get_top_third(2)}px)`;
            /* next */
            $$ac[3].style.transform = `translateY(${get_top_fourth(2)}px)`;
            $$ac[4].style.transform = `translateY(${get_top_fifth(2)}px)`;
        } else if (sc <= scKick[3]) {
            // console.log("📍📍📍📍4")
            /* prev */
            $$ac[0].style.transform = `translateY(${get_top_first(3)}px)`;
            $$ac[1].style.transform = `translateY(${get_top_second(3)}px)`;
            $$ac[2].style.transform = `translateY(${get_top_third(3)}px)`;

            /* curr */
            $$ac[3].style.transform = `translateY(${get_top_fourth(3)}px)`;

            /* next */
            $$ac[4].style.transform = `translateY(${get_top_fifth(3)}px)`;
        } else if (sc <= scKick[4]) {
            // console.log("📍📍📍📍📍5")
            /* prev */
            $$ac[0].style.transform = `translateY(${get_top_first(4)}px)`;
            $$ac[1].style.transform = `translateY(${get_top_second(4)}px)`;
            $$ac[2].style.transform = `translateY(${get_top_third(4)}px)`;
            $$ac[3].style.transform = `translateY(${get_top_fourth(4)}px)`;
            /* curr */
            $$ac[4].style.transform = `translateY(${get_top_fifth(4)}px)`;
        }
    });
}//add_scroll_event