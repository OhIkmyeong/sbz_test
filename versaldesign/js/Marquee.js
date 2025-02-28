export class Marquee {
    constructor() {
        this.texts = [];
        this.$wrap = document.getElementById("mq-wrap");
    }//constructor

    /**
     * 
     * @param {*} text 
     * @returns 
     */
    set_text(text) {
        this.texts.push(text || "noText");
        return this;
    }//set_text

    /**
     * 
     */
    reset() {
        this.$wrap.innerHTML = "";
    }//reset

    /**
     * 
     */
    init() {
        this.reset();

        /* DOM */
        for (let i = 0; i < 2; i++) {
            const $area = this.make_area();
            this.$wrap.appendChild($area);
            this.add_ani($area);
        }

        /* 최종 */
        return this;
    }//init

    add_ani($area) {
        const ani = $area.animate([
            {
                transform: "translateX(0%)"
            },
            {
                transform: "translateX(-100%)"
            }
        ], {
            duration: 10000,
            easing: "linear",
            iteration: 1,
            fill: "both"
        });

        ani.onfinish = () => {
            $area.style.transform = "translateX(0)";
            setTimeout(()=>{
                this.add_ani($area);
            },0);
        };
    }//add_ani

    make_area() {
        const $list = document.createElement("ARTICLE");
        $list.classList.add("mq");
        for (let i = 0; i < 5; i++) {
            for (const str of this.texts) {
                const $li = document.createElement("LI");
                $li.classList.add("mq-li");
                $li.textContent = str;
                $list.appendChild($li);
            }
        }
        return $list;
    }//make_list
}//Marquee