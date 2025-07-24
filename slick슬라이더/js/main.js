const $viewer = document.getElementById("viewer");
const $slider = document.getElementById("slider");
const LENGTH = 7;
let itemSize = null;
let widthSlider = null;
let rightLimit = null;
const posX = {
    start: 0,
    prev: 0,
    curr: 0
};
let currIdx = 1;

/* dom */
for (let i = 0; i < LENGTH; i++) {
    const $li = document.createElement("LI");
    $li.classList.add("slider-item");
    $li.textContent = i + 1;
    $slider.appendChild($li);
}

const $$li = document.getElementsByClassName("slider-item");

/**
 * 
 * @param {*} $item 
 * @returns 
 */
function cloneItem($item) {
    const $clone = $item.cloneNode(true);
    return $clone;
}//cloneItem

$slider.appendChild(cloneItem($$li[0]));
$slider.prepend(cloneItem($$li[LENGTH - 1]));

/**
 * 
 */
function set_item_size() {
    itemSize = $$li[0].offsetWidth;
    // posX.curr = (itemSize / 2) * -1;
    // $slider.style.transform = `translateX(${posX.curr}px)`;
    posX.curr = (itemSize * -1 * currIdx) - 40;
    widthSlider = itemSize * (LENGTH + 2) + (LENGTH + 1) * 40;
    rightLimit = widthSlider - window.innerWidth;
    currIdx = 1;

    $slider.animate([
        {
            transform: `translateX(${posX.curr}px)`
        }
    ], {
        duration: 500,
        easing: "linear",
        fill: "both"
    });
}//set_item_size
set_item_size();
window.addEventListener("resize", set_item_size);


/* ================================ */
add_on_down();
/* ================================ */
/**
 * 
 */
function add_on_down() {
    $viewer.addEventListener("mousedown", on_down, { once: true });
}//add_on_down

/**
 * 
 */
function on_down(e) {
    posX.start = e.clientX;
    posX.prev = e.clientX - posX.curr;
    window.addEventListener("mousemove", on_move);
    window.addEventListener("mouseup", on_up, { once: true });
    window.addEventListener("mouseleave", on_up, { once: true });
}//on_down

/**
 * 
 */
function on_move(e) {
    posX.curr = e.clientX - posX.prev;
    $slider.animate([
        {
            transform: `translateX(${posX.curr}px)`
        }
    ], {
        duration: 500,
        easing: "linear",
        fill: "both"
    });
}//on_move

/**
 * 
 */
function on_up(e) {
    if (e.clientX < posX.start) {
        currIdx++;
    } else {
        currIdx--;
    }
    /*  */
    const move = itemSize * currIdx + (currIdx * 40);
    posX.curr = move * -1;
    const ani = $slider.animate([
        {
            transform: `translateX(${posX.curr}px)`
        }
    ], {
        duration: 500,
        easing: "linear",
        fill: "both"
    });

    ani.addEventListener("finish", on_finish, { once: true });
    window.removeEventListener("mousemove", on_move);
}//on_up

/**
 * 
 */
function on_finish() {
    let firstOrLast = false;
    if (currIdx <= 0) {
        currIdx = LENGTH;
        firstOrLast = true;
    } else if (currIdx > LENGTH) {
        currIdx = 1;
        firstOrLast = true;
    }

    if (firstOrLast) {
        const move = itemSize * currIdx + (currIdx * 40);
        posX.curr = move * -1;

        const ani = $slider.animate([
            {
                transform: `translateX(${posX.curr}px)`
            }
        ], {
            easing: 'steps(1, end)',
            fill: "both",
        });
        ani.addEventListener("finish",()=>{
            add_on_down();
        },{once:true});
    } else {
        /*  */
        add_on_down();
    }

}//on_finish
