export const $main = document.getElementById("mn");
export const $$ac = document.querySelectorAll(".ac-wrap");
export let CURR_SHOW_IDX = 0;
export let isStacked = false;
export let STACKED_IDX = null;
export let LIMIT_SHOW_IDX = $$ac.length > 2 ? 2 : $$ac.length - 1;
export let scKick = [];

export function change_scroll_kick(scrollKick = []){
    scKick = scrollKick;
}//change_scroll_kick

export function change_curr_show_idx(isNext = true){
    if(isNext === true){
        CURR_SHOW_IDX++
    }else{
        CURR_SHOW_IDX--;
    }
    if(CURR_SHOW_IDX <= 0){CURR_SHOW_IDX = 0;}
    if(CURR_SHOW_IDX >= LIMIT_SHOW_IDX){CURR_SHOW_IDX = LIMIT_SHOW_IDX;}
}

export function change_stacked_idx(idx = 0){
    STACKED_IDX = idx;
}

export function change_is_stacked(bool = false){
    isStacked = (bool === true);
}