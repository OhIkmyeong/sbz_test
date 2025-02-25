import { $main, $$ac, change_scroll_kick } from "./model.js";

/**
 * 
 */
export function set_idxs() {
    $$ac.forEach(($ac, idx) => {
        $ac.setAttribute("data-idx", idx);
        $ac.style.setProperty("--_idx", idx);
        const $btn = $ac.querySelector(".ac-btn");
        $btn.setAttribute("data-idx", idx);
    });
}

/**
 * 
 */
export function resize_height_main() {
    let fullHeight = 0;
    const scrollKick = [];
    $$ac.forEach($ac => {
        const { height } = $ac.getBoundingClientRect();
        fullHeight += height;
        $ac.setAttribute("data-scroll-kick", parseInt(fullHeight));
        scrollKick.push(fullHeight);
    });
    console.log("높이 변화", fullHeight);
    $main.style.setProperty("--_hei-main", `${fullHeight}px`);
    change_scroll_kick(scrollKick);
}//resize_height_main

export function fold_all_ac() {
    for (const $ac of $$ac) {
        $ac.classList.remove("show");
        document.body.classList.remove("noScroll");
    }
}

/**
 * 
 */
export function show_first_3_ac() {
    for (let i = 0; i < $$ac.length; i++) {
        const $ac = $$ac[i];
        if (!$ac) { continue; }
        const topFold = window.innerHeight - (90 * (3 - i));

        $ac.style.setProperty("--_top-fold", `${topFold}px`);
        $ac.style.setProperty("--_top-show", `${90 * i}px`);
    }//for
}//show_first_3_ac

/**
 * 
 */
export function add_on_click_btn() {
    $$ac.forEach($ac => {
        const $btn = $ac.querySelector(".ac-btn");
        $btn.addEventListener("click", () => {
            const winWid = window.innerWidth;
            if(winWid < 600){
                $ac.scrollIntoView({
                    block : "start",
                    behavior : "smooth"
                })
                return;
            }
            const idx = parseInt($btn.dataset.idx || "0");
            const winHei = window.innerHeight;
            window.scrollTo({
                top : (winHei * (idx + 1)) + 90,
                behavior:"instant"
            })
        });
    });
}//add_on_click_btn

/**
 * 
 * @param {*} $ac 
 */
export function ac_sib_show_toggle($ac) {
    const toShow = $ac.classList.contains("show");
    let $prev = $ac;
    while ($prev.previousElementSibling) {
        const $prevNew = $prev.previousElementSibling;
        $prevNew.classList.toggle("show", toShow);
        $prev = $prevNew;
    }

    let $next = $ac;
    while ($next.nextElementSibling) {
        const $nextNew = $next.nextElementSibling;
        $nextNew.classList.remove("show");
        $next = $nextNew;
    }
}//ac_to_top