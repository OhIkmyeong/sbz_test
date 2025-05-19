const WIDBREAK = 500;
const clssPc = "pc";
const clssMb = "mobile";
let AREA_INFO = [];
const $sect = document.querySelector(".sect");
const $$area = document.querySelectorAll(".area");
/**
 * 
 */
function set_area_info() {
    console.log("set_area_info");
    AREA_INFO = [];
    $$area.forEach(($area, idx) => {
        $area.style.transform = "translateY(0px)";
        const info = {
            idx,
            top: $area.offsetTop
        };
        AREA_INFO.push(info);
    });
    console.log(AREA_INFO);
}//set_area_info

/**
 * 리사이즈시
 */
function add_on_window_resize() {
    window.addEventListener("resize", on_window_resize);
}//add_on_window_resize

/**
 * 
 */
function on_window_resize() {
    set_area_info();
    const winWid = innerWidth;
    if (winWid > WIDBREAK) {
        if ($sect.classList.contains(clssPc)) {
            return;
        }
        $sect.classList.remove(clssMb);
        $sect.classList.add(clssPc);
    } else {
        if ($sect.classList.contains(clssMb)) {
            return;
        }
        $sect.classList.remove(clssPc);
        $sect.classList.add(clssMb);

    }
}//on_window_resize

/**
 * 스크롤시
 */
function add_on_scroll() {
    window.addEventListener("scroll", on_scroll)
}//add_on_scroll

/**
 * 
 * @returns 
 */
function on_scroll() {
    if ($sect.classList.contains(clssMb)) { return; }
    //area의 height가 80vh임
    const { top: sectTop, height: sectHeight } = $sect.getBoundingClientRect();
    const sc = sectTop * -1
    const heiPer = parseInt(innerHeight * 0.8) * -1;
    const KICK = 150;
    // console.log(sectTop, heiPer);
    if (sectTop >= 0) {
        $$area[0].style.transform = `translateY(0px)`;
        $$area[1].style.transform = `translateY(0px)`;
        $$area[2].style.transform = `translateY(0px)`;
        $$area[3].style.transform = `translateY(0px)`;
        $$area[4].style.transform = `translateY(0px)`;
    } else if (sectTop >= heiPer) {
        const nextTop = $$area[1].getBoundingClientRect().top;
        const basic = sc;
        if (nextTop > KICK) {
            $$area[0].style.transform = `translateY(${basic}px)`;
        } else {
            $$area[0].style.transform = `translateY(${basic - (KICK - nextTop)}px)`;
        }
    } else if (sectTop >= heiPer * 2) {
        const nextTop = $$area[2].getBoundingClientRect().top;
        const basic = sc + heiPer;
        if (nextTop > KICK) {
            $$area[1].style.transform = `translateY(${basic}px)`;
        } else {
            $$area[1].style.transform = `translateY(${basic - (KICK - nextTop)}px)`;
        }
    } else if (sectTop >= heiPer * 3) {
        const nextTop = $$area[3].getBoundingClientRect().top;
        const basic = sc + heiPer * 2;
        if (nextTop > KICK) {
            $$area[2].style.transform = `translateY(${basic}px)`;
        } else {
            $$area[2].style.transform = `translateY(${basic - (KICK - nextTop)}px)`;
        }
    } else if (sectTop >= heiPer * 4) {
        const nextTop = $$area[4].getBoundingClientRect().top;
        const basic = sc + heiPer * 3;
        if (nextTop > KICK) {
            $$area[3].style.transform = `translateY(${basic}px)`;
        } else {
            $$area[3].style.transform = `translateY(${basic - (KICK - nextTop)}px)`;
        }
    }
}//on_scroll

/* 최종 */
on_window_resize();
add_on_window_resize();
add_on_scroll();