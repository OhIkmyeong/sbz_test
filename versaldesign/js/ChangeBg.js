export class ChangeBg {
    constructor() {
        this.$wrap = document.getElementById("chbg-wrap");
        this.$$ch = document.querySelectorAll(".chbg");
        this.$video = document.querySelector(".cgbgvideo");
        this.videoTop = null;
        this.info = [];
    }//constructor

    init() {
        this.set_info();
        this.on_resize();
        this.on_scroll();
    }//init

    /**
     * 
     */
    on_scroll = () => {
        window.addEventListener("scroll", () => {
            const scY = scrollY;
            if (scY < this.info[0].top) {
                this.$wrap.style.setProperty("--_bg", "#000000");
            } else if (scY < this.info[1].top) {
                this.$wrap.style.setProperty("--_bg", this.info[0].bg);
            } else if (scY < this.info[2].top) {
                this.$wrap.style.setProperty("--_bg", this.info[1].bg);

            } else if (scY < this.info[3].top) {
                this.$wrap.style.setProperty("--_bg", this.info[2].bg);

            } else if (scY < this.info[4].top) {
                this.$wrap.style.setProperty("--_bg", this.info[3].bg);

            } else {
                this.$wrap.style.setProperty("--_bg", this.info[4].bg);
            }

            /* video */
            if (this.$$ch[0].getBoundingClientRect().top <= 0) {
                this.fix_video();

                const pad = window.innerWidth / 20;
                const limit = this.$$ch[4].offsetHeight - this.$video.offsetHeight - pad - pad;
                if (this.$$ch[4].getBoundingClientRect().top <= -1 * limit) {
                    const top = (this.$$ch[4].offsetTop + this.$$ch[4].offsetHeight) - this.$video.offsetHeight - pad;
                    this.unfix_video(`${top}px`);
                }
            } else {
                this.unfix_video("5vw");
            }

        });

    }//on_scroll

    fix_video() {
        this.$video.classList.add("fixed");
        this.$video.style.top = `5vw`;
    }//fix_video

    unfix_video(top = "5vw") {
        this.$video.classList.remove("fixed");
        this.$video.style.top = top;
    }//unfix_video

    on_resize() {
        window.addEventListener("resize", this.set_info);
    }//on_resize

    set_info = () => {
        this.info = [];
        const parentOffset = this.$wrap.offsetTop;
        console.log(parentOffset);
        this.videoTop = parentOffset + this.$video.offsetTop;
        for (const $ch of this.$$ch) {
            const top = $ch.offsetTop;
            const bg = $ch.dataset.bg;
            this.info.push({
                top: top + parentOffset,
                bg
            });
        }
        console.log(this.info, this.videoTop);
    }//set_info
}//class-ChangeBg