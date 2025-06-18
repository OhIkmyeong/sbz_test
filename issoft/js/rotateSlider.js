let degPer;
let degCurr = 0;
let IDX_CURR = 0;
let IDX_MAX;

export function make_slider_rotate(data) {
    /* DOM */
    const $viewer = document.createElement("SECTION");
    $viewer.classList.add("rslide-viewer");

    /* slide */
    const $slide = document.createElement("UL");
    $slide.classList.add("rslide");
    $viewer.appendChild($slide);

    const maxLength = data.length * 2;
    IDX_MAX = data.length - 1;
    degPer = 360 / maxLength;

    /* fill:slide */
    for (let idx = 0; idx < data.length; idx++) {
        const item = data[idx];
        const deg = degPer * idx;
        const $li = make_slide_item({ item, idx, deg });
        if(idx === 0){$li.classList.add("on");}
        $li.dataset.itemIdx = idx;
        $slide.appendChild($li);
    }
    for (let idx = 0; idx < data.length; idx++) {
        const item = data[idx];
        const idxForDeg = idx + data.length;
        const deg = degPer * idxForDeg;
        const $li = make_slide_item({
            item,
            idx: idxForDeg,
            deg
        });
        $li.dataset.itemIdx = idx;
        $slide.appendChild($li);
    }


    /* 최종 */
    return $viewer;
}//make_slider_rotate

function make_slide_item({ item, idx, deg }) {
    const { title, content } = item;

    const $li = document.createElement("LI");
    $li.classList.add("rslide-item");
    $li.dataset.idx = idx;
    $li.style.setProperty("--_idx", idx);
    $li.style.setProperty("--_deg", `${deg}deg`);

    const $card = document.createElement("DIV");
    $card.classList.add("rslide-item-card");
    $li.appendChild($card);

    const $title = document.createElement("H4");
    $title.classList.add("rslide-item-card-title");
    $title.textContent = title;
    $card.appendChild($title);

    const $content = document.createElement("P");
    $content.classList.add("rslide-item-card-content");
    $content.textContent = content;
    $card.appendChild($content);

    return $li;
}

export function make_pager_rotate(data) {
    const $pager = document.createElement("SECTION");
    $pager.classList.add("pager-rotate");

    const make_btn = (type) => {
        const $btn = document.createElement("BUTTON");
        $btn.type = "button";
        $btn.classList.add("pager-rotate-btn");
        $btn.dataset.type = type;
        $btn.textContent = type == "prev" ? "이전" : "다음";
        return $btn;
    }

    $pager.appendChild(make_btn("prev"));

    const $curr = document.createElement("STRONG");
    $curr.classList.add("pager-rotate-curr");
    $curr.textContent = 1;
    $pager.appendChild($curr);

    const $all = document.createElement("SPAN");
    $all.classList.add("pager-rotate-all");
    $all.innerHTML = `/&nbsp;&nbsp;${data.length}`;
    $pager.appendChild($all);

    $pager.appendChild(make_btn("next"));

    return $pager;
}//make_pager_rotate

/* ============================= */

export function add_spin_rotate_slider() {
    const $$btn = document.querySelectorAll(".pager-rotate-btn");

    for (const $btn of $$btn) {
        $btn.addEventListener("click", () => {
            const { type } = $btn.dataset;
            spin_rotate_slider(type);
        });
    }
}//add_spin_rotate_slider

function spin_rotate_slider(type) {
    const $slider = document.querySelector(".rslide");
    if (type === "next") {
        degCurr -= degPer;
        IDX_CURR++;
        if (IDX_CURR > IDX_MAX) { IDX_CURR = 0; }
    } else {
        degCurr += degPer;
        IDX_CURR--;
        if (IDX_CURR < 0) { IDX_CURR = IDX_MAX; }
    }

    /* 회전 */
    const ani = $slider.animate([
        { transform: `translate(-50%,0%) rotate(${degCurr}deg)` }
    ], {
        duration: 500,
        easing: "ease-in",
        fill: "both"
    });

    /* 페이저 표시 */
    const $curr = document.querySelector(".pager-rotate-curr");
    $curr.textContent = IDX_CURR + 1;

    /* on 표시 */
    const $$li = document.querySelectorAll(".rslide-item");
    $$li.forEach($sib =>{
        $sib.classList.toggle("on", $sib.dataset.itemIdx === String(IDX_CURR));
    });
}//spin_rotate_slider