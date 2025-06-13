const $wrap = document.querySelector(".board_hongbo3_wrap");

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetch("./../data/data.json").then(res => res.json());

    const $$liPc = [];
    const $$liMobile = [];
    let curr_idx = 0;
    const last_idx = data.length - 1;
    const pagerDOMpc = {
        btnPrev: null,
        btnNext: null,
        curr: null
    }
    const pagerDOMmobile = {
        btnPrev: null,
        btnNext: null,
        curr: null
    }

    /* pc버젼 */
    const { $ulPc } = make_dom_pc({
        data,
        $$liPc,
        pagerDOMpc,
        last_idx
    });

    const { $ulMobile } = make_dom_mobile({
        data, $$liMobile, pagerDOMmobile, last_idx
    })

    /* ================================= */

    /* 버튼 액션(PC)next */
    pagerDOMpc.btnNext.addEventListener("click", () => {
        /*  */
        pagerDOMpc.btnNext.disabled = true;

        /* idx 정리 */
        curr_idx++;
        if (curr_idx > last_idx) {
            curr_idx = 0;
        }

        /* pager */
        pagerDOMpc.curr.textContent = curr_idx + 1;

        /* 0. 현재 on인거 찾기 */
        const $on = $$liPc.shift();

        /* 1. on된걸 왼쪽으로 빼고, 클래스 제거 */
        $on.classList.remove("on");
        const onAni = $on.animate([
            {
                transform: "translateX(-100%)",
                opacity: 0
            }
        ], {
            duration: 500,
            fill: "both",
            easing: "linear"
        })

        /* 끝나면.. */
        onAni.addEventListener("finish", () => {
            /* 2. on된걸 맨 뒤로 추가 */
            $$liPc.push($on);
            $ulPc.appendChild($on);
            $on.animate([
                {
                    left: "var(--_wid-card)",
                    transform: `translateX(calc(12% * ${last_idx}))`,
                    opacity: 1
                }
            ], {
                duration: 100,
                fill: "forwards",
                easing: "steps(1,end)"
            });

            /* z-index */
            $on.style.zIndex = 0;
        }, { once: true });

        /* 3. 그 다음꺼 on 시킴 */
        const $next = $$liPc[0];
        $next.classList.add("on");
        const nextAni = $next.animate([
            {
                left: 0,
                transform: "translateX(0)"
            }
        ], {
            duration: 500,
            fill: "both",
            easing: "linear"
        });

        /* z-index */
        $next.style.zIndex = last_idx + 1;

        /* 4. 중간 형제들*/
        const $$sib = $$liPc.slice(1, last_idx);
        $$sib.forEach(($sib, idx) => {
            $sib.classList.remove("on");
            $sib.animate([
                {
                    left: "var(--_wid-card)",
                    transform: `translateX(calc(12% * ${idx + 1}))`
                }
            ], {
                duration: 500,
                fill: "both",
                easing: "linear"
            });
            $sib.style.zIndex = last_idx - idx;
        });

        /* 최종 다시 버튼 클릭 가능 */
        nextAni.addEventListener("finish", () => {
            pagerDOMpc.btnNext.disabled = false;
        }, { once: true });
    });

    /* ================================= */
    /* 버튼 액션(PC)prev */
    pagerDOMpc.btnPrev.addEventListener("click", () => {
        /*  */
        pagerDOMpc.btnPrev.disabled = true;

        /* idx 정리 */
        curr_idx--;
        if (curr_idx < 0) {
            curr_idx = last_idx;
        }

        /* pager */
        pagerDOMpc.curr.textContent = curr_idx + 1;

        /* 0. 현재 on인거 찾기 */
        const $on = $$liPc[0];

        /* 1. on 클래스 제거 및, 가장 마지막꺼 제외 오른쪽으로 밀기 */
        $on.classList.remove("on");
        const $$sib = $$liPc.slice(0, last_idx);
        $$sib.forEach(($sib, idx) => {
            $sib.classList.remove("on");
            $sib.animate([
                {
                    left: "var(--_wid-card)",
                    transform: `translateX(calc(12% * ${idx + 1}))`
                }
            ], {
                duration: 500,
                fill: "both",
                easing: "linear"
            });

            /* z-index */
            $sib.style.zIndex = last_idx - idx;
        });

        /* 2. 맨 마지막꺼 .on 붙이기*/
        const $last = $$liPc.pop();
        $$liPc.unshift($last);
        /* 3. 맨 마지막꺼 왼쪽으로 붙였다가, 화면으로 들어오게끔 */
        const lastAni = $last.animate([
            {
                opacity: 1
            },
            {
                transform: "translateX(100%)",
                opacity: 0
            },
            {
                left: 0,
                transform: "translateX(-50%)",
                opacity: 0
            },
            {
                left: 0,
                transform: "translateX(0%)",
                opacity: 1
            }
        ], {
            duration: 600,
            fill: "both",
            easing: "linear"
            // easing: "steps(1,end)"
        });

        lastAni.addEventListener("finish", () => {
            $last.classList.add("on");
            $last.style.zIndex = last_idx + 1;
            /* 최종 다시 버튼 클릭 가능 */
            pagerDOMpc.btnPrev.disabled = false;
        }, { once: true });
    });

    /* ================================= */
    /* 버튼 액션(MOBILE)next */
    pagerDOMmobile.btnNext.addEventListener("click", () => {
        /*  */
        pagerDOMmobile.btnNext.disabled = true;

        /* idx 정리 */
        curr_idx++;
        if (curr_idx > last_idx) {
            curr_idx = 0;
        }

        /* pager */
        pagerDOMmobile.curr.textContent = curr_idx + 1;

        /* 데이터 변경 */
        const $first = $$liMobile.shift();
        $$liMobile.push($first);

        /* 전부 왼쪽으로 한칸씩 이동 */
        const aniPromise = $$liMobile.map(($li, idx) => {
            $li.classList.toggle("on", parseInt($li.dataset.idx) === curr_idx);
            const left = `calc(var(--_wid-card) * (${idx}) - (${idx} * -20px))`;
            const ani = $li.animate([
                {
                    transform: `translateX(${left})`,
                    opacity: (idx === 0 || idx === last_idx) ? 0  : 1
                }
            ], {
                fill: "both",
                duration: 500,
                easing: "linear"
            });
            return ani;
        });
        // Promise.all(aniPromise).then(() => {

        // });

        /*  */
        pagerDOMmobile.btnNext.disabled = false;
    });

    /* ================================= */
    /* 버튼 액션(MOBILE)prev */
    pagerDOMmobile.btnPrev.addEventListener("click", () => {
        /*  */
        pagerDOMmobile.btnPrev.disabled = true;

        /* idx 정리 */
        curr_idx--;
        if (curr_idx < 0) {
            curr_idx = last_idx;
        }

        /* pager */
        pagerDOMmobile.curr.textContent = curr_idx + 1;

        /* 데이터 변경 */
        const $last = $$liMobile.pop();
        $$liMobile.unshift($last);

        /* 전부 오른른쪽으로 한칸씩 이동 */
        $$liMobile.forEach(($li, idx) => {
            $li.classList.toggle("on", parseInt($li.dataset.idx) === curr_idx);
            const left = `calc(var(--_wid-card) * (${idx}) - (${idx} * 20px))`;
            const ani = $li.animate([
                {
                    transform: `translateX(${left})`,
                    opacity: (idx === 0 || idx === last_idx) ? 0  : 1
                }
            ], {
                fill: "both",
                duration: 500,
                easing: "linear"
            });
        });
        
        /*  */
        pagerDOMmobile.btnPrev.disabled = false;
    });
});

/**
 * 
 */
function make_dom_pc({ data, $$liPc, pagerDOMpc, last_idx }) {
    const $ul = document.createElement("UL");
    $ul.classList.add("slide");
    $wrap.appendChild($ul);

    /* slide */
    data.forEach((item, idx) => {
        const { title, content } = item;
        const $li = document.createElement("LI");
        $li.classList.add("slide-item");
        if (idx === 0) { $li.classList.add("on"); }
        $li.style.setProperty("--_idx", idx);
        $li.style.zIndex = data.length + 1 - idx;
        $li.style.left = idx === 0 ? 0 : "var(--_wid-card)";
        $li.style.transform = `translateX(calc(12% * ${idx}))`;
        $ul.appendChild($li);
        $$liPc.push($li);

        const $card = document.createElement("DIV");
        $card.classList.add("slide-item-card");
        $li.appendChild($card);

        const $title = document.createElement("P");
        $title.classList.add("slide-item-card-title");
        $title.textContent = title;
        $card.appendChild($title);

        const $content = document.createElement("P");
        $content.classList.add("slide-item-card-content");
        $content.textContent = content;
        $card.appendChild($content);
    });

    /* pager */
    const $pager = document.createElement("SECTION");
    $pager.classList.add("pager");
    $wrap.appendChild($pager);

    for (let i = 0; i < 2; i++) {
        const btnType = i === 0 ? "prev" : "next";
        const $btn = document.createElement("BUTTON");
        $btn.type = "button";
        $btn.classList.add("pager-btn");
        $btn.classList.add(btnType);
        $btn.dataset.action = btnType;
        $btn.textContent = i === 0 ? "이전" : "다음";
        $pager.appendChild($btn);
        pagerDOMpc[i === 0 ? "btnPrev" : "btnNext"] = $btn;

        if (i === 0) {
            const $info = document.createElement("DIV");
            $info.classList.add("pager-info");
            $pager.appendChild($info);

            const $curr = document.createElement("SPAN");
            $curr.classList.add("pager-info-curr");
            $curr.textContent = 1;
            $info.appendChild($curr);
            pagerDOMpc.curr = $curr;

            const $all = document.createElement("SPAN");
            $all.classList.add("pager-info-all");
            $all.textContent = last_idx + 1;
            $info.appendChild($all);
        }
    }//for

    return { $ulPc: $ul }
}//make_dom_pc

function make_dom_mobile({ data, $$liMobile, pagerDOMmobile, last_idx }) {
    const $ulWrap = document.createElement("DIV");
    $ulWrap.classList.add("slidemobile-wrap");
    $wrap.appendChild($ulWrap);

    /* ul */
    const $ul = document.createElement("UL");
    $ul.classList.add("slidemobile");
    $ulWrap.appendChild($ul);

    /* slide */
    data.forEach((item, idx) => {
        const { title, content } = item;
        const $li = document.createElement("LI");
        $li.classList.add("slidemobile-item");
        if (idx === 0) { $li.classList.add("on"); }
        $li.dataset.idx = idx;

        $ul.appendChild($li);
        $$liMobile.push($li);

        const $card = document.createElement("DIV");
        $card.classList.add("slidemobile-item-card");
        $li.appendChild($card);

        const $title = document.createElement("P");
        $title.classList.add("slide-item-card-title");
        $title.textContent = title;
        $card.appendChild($title);

        const $content = document.createElement("P");
        $content.classList.add("slide-item-card-content");
        $content.textContent = content;
        $card.appendChild($content);
    });

    /* 재정렬 필요 */
    for (let i = 0; i < last_idx / 2; i++) {
        const $li = $$liMobile.pop();
        $ul.prepend($li);
        $$liMobile.unshift($li);
    }
    $$liMobile.forEach(($li, idx) => {
        const left = `calc((var(--_wid-card) * ${idx}) + (${idx} * 20px))`;
        $li.style.transform = `translateX(${left})`;
    });

    /* pager */
    const $pager = document.createElement("SECTION");
    $pager.classList.add("pagermobile");
    $wrap.appendChild($pager);

    for (let i = 0; i < 2; i++) {
        const btnType = i === 0 ? "prev" : "next";
        const $btn = document.createElement("BUTTON");
        $btn.type = "button";
        $btn.classList.add("pagermobile-btn");
        $btn.classList.add(btnType);
        $btn.dataset.action = btnType;
        $btn.textContent = i === 0 ? "이전" : "다음";
        $pager.appendChild($btn);
        pagerDOMmobile[i === 0 ? "btnPrev" : "btnNext"] = $btn;

        if (i === 0) {
            const $info = document.createElement("DIV");
            $info.classList.add("pagermobile-info");
            $pager.appendChild($info);

            const $curr = document.createElement("SPAN");
            $curr.classList.add("pagermobile-info-curr");
            $curr.textContent = 1;
            $info.appendChild($curr);
            pagerDOMmobile.curr = $curr;

            const $all = document.createElement("SPAN");
            $all.classList.add("pagermobile-info-all");
            $all.textContent = last_idx + 1;
            $info.appendChild($all);
        }
    }//for

    return { $ulMobile: $ul }
}//make_dom_mobile

