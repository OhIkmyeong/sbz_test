export class MarqueeView{
    constructor(){
        this.texts = [];
    }
    set_text(...texts){
        this.texts = texts;
        return this;
    }
    init(){
        const $wrap = document.createElement("SECTION");
        $wrap.classList.add(`mq-wrap`);

        const $viewer = document.createElement("DIV");
        $viewer.classList.add("mq-viewer");
        $wrap.appendChild($viewer);

        for(let i=0; i<2; i++){
            const $list = this.make_list();
            $list.dataset.idx = i;
            $viewer.appendChild($list);
        }

        /* 최종 */
        return $wrap;
    }

    make_list(){
        const $ul = document.createElement("UL");
        $ul.classList.add("mq");

        for(let i=0; i<3; i++){
            this.texts.forEach(str =>{
                const $li = document.createElement("LI");
                $li.classList.add(`mq-item`);
                $li.textContent = str;
                $ul.appendChild($li);
            });
        }

        return $ul;
    }
}//class:MarqueeView