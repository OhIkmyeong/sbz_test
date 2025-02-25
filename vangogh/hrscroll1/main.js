const $wrap = document.getElementById("wrap");
const $slider = document.getElementById("slider");
const $$item = $slider.children;
const $pgBar = document.getElementById("pgbar");

let prevX = null;

function add_on_mouse_down(){
    $wrap.addEventListener("mousedown",on_mouse_down,{once:true});
}//add_on_mouse_down

function on_mouse_up(e){
    prevX = e.clientX;
    window.removeEventListener("mousemove", on_mouse_move);
    add_on_mouse_down();
}//on_mouse_up

function on_mouse_move(e){
    const clientX = e.clientX;
    $slider.scrollLeft += parseInt((prevX - clientX) / 8);
    display_progressbar();
}

function on_mouse_down(e){
    prevX = e.clientX;
    window.addEventListener("mousemove",on_mouse_move);
    window.addEventListener("mouseup", on_mouse_up, {once:true});
}

function display_progressbar(){
    const {width} = $$item[0].getBoundingClientRect();
    const fullWidth = width * $$item.length; 
    const per = ($slider.scrollLeft / (fullWidth - $slider.offsetWidth)).toFixed(1);
    $pgBar.style.transform = `scaleX(${per})`;
}//display_progressbar

function on_wheel(e){
    if(window.innerWidth < 600){
        return;
    }
    e.preventDefault();
    $slider.scrollLeft += e.deltaY;
    display_progressbar();
}

/* ======================== */
$slider.addEventListener("wheel", on_wheel);
add_on_mouse_down();

