import { add_on_click_btn, fold_all_ac, resize_height_main, set_idxs, show_first_3_ac } from "./fn.js";
import { add_scroll_event } from "./fnScroll.js";

/* 최초 */
set_idxs();
resize_height_main();
show_first_3_ac();
add_on_click_btn();
add_scroll_event();

window.addEventListener("resize",()=>{
    document.body.scrollIntoView({block:"start", behavior:"smooth"})
    resize_height_main();
    fold_all_ac();
    show_first_3_ac();
});