export class MarqueeCtrl {
    /**
     * 
     */
    init() {
        const $$mq = document.querySelectorAll(".mq");
        for (const $mq of $$mq) {
            MarqueeCtrl.toLeftM100($mq);
        }
    }//init

    /**
     * 
     * @param {*} $mq 
     */
    static toLeftM100($mq) {
        /* 일단 움직이고 */
        $mq.classList.add("toLeftM100");

        /* 애니메이션 끝나면 */
        $mq.addEventListener("animationend", () => {
            $mq.classList.remove("toLeftM100");
            const idx = parseInt($mq.dataset.idx);
            if (idx === 0) {
                MarqueeCtrl.toRight100($mq);
            } else {
                MarqueeCtrl.toLeftM200($mq);
            }
        }, { once: true });
    }//toLeft

    /**
     * 
     * @param {*} $mq 
     */
    static toLeftM200($mq) {
        /* 일단 움직이고 */
        $mq.classList.add("toLeftM200");

        /* 애니메이션 끝나면 */
        $mq.addEventListener("animationend", () => {
            $mq.classList.remove("toLeftM200");
            $mq.style.transform = "translateX(0)";
            MarqueeCtrl.toLeftM100($mq);
        }, { once: true });
    }//toLeftM0

    /**
     * 
     * @param {*} $mq 
     */
    static toLeftM0($mq) {
        /* 일단 움직이고 */
        $mq.classList.add("toLeftM0");

        /* 애니메이션 끝나면 */
        $mq.addEventListener("animationend", () => {
            $mq.classList.remove("toLeftM0");
            MarqueeCtrl.toLeftM100($mq);
        }, { once: true });
    }//toLeftM0


    /**
     * 
     * @param {*} $mq 
     */
    static toRight100($mq) {
        $mq.style.transform = `translateX(100%)`;
        MarqueeCtrl.toLeftM0($mq);
    }//toRight100
}//class:MarqueeCtrl