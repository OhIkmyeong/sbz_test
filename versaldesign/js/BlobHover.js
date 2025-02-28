export class BlobHover{
    constructor(){
        this.$list = document.getElementById("blbhover");
        this.color = ["#ff0000", "#00ff00", "#0000ff","#ffcd01", "edfacc"];
    }


    init(){
        this.make_items();
    }//init

    make_items(){
        for(let i=0; i<4; i++){
            const $li = document.createElement("LI");
            $li.classList.add("bl-li");
            this.$list.appendChild($li);

            const $svg = this.make_svg(i);
            $li.appendChild($svg);

            const $text = document.createElement("DIV");
            $text.classList.add("bl-li-text");
            $text.textContent = `아이템 ${String(i).padStart(3,"0")}`;
            $li.appendChild($text);
        }
    }

    /**
     * 
     * @param {*} idx 
     * @returns 
     */
    make_svg(idx){
        const url = "http://www.w3.org/2000/svg";
        const $svg = document.createElementNS(url,"svg");
        $svg.setAttribute("width",200);
        $svg.setAttribute("height",200);
        $svg.setAttribute("viewBox","0 0 200 200");
        $svg.classList.add("bl-svg");

        const $path = document.createElementNS(url,"path");
        $path.setAttribute("d", "M34.7,-60.6C40,-57,36.1,-37.8,40.7,-25.1C45.4,-12.4,58.6,-6.2,66.7,4.7C74.8,15.6,77.8,31.1,67.4,33.8C57,36.6,33.2,26.5,19.8,30.4C6.3,34.4,3.1,52.5,-5.1,61.3C-13.3,70.2,-26.6,69.7,-40.1,65.7C-53.6,61.7,-67.3,54.2,-74.4,42.7C-81.5,31.2,-82.1,15.6,-75,4.1C-67.9,-7.4,-53.2,-14.8,-46.9,-27.8C-40.7,-40.8,-42.9,-59.5,-36.5,-62.5C-30.1,-65.6,-15,-53,-0.2,-52.7C14.7,-52.4,29.3,-64.3,34.7,-60.6Z");
        $path.setAttribute("fill", this.color[idx] || "#000000");
        $path.setAttribute("transform", "translate(100 100)");
        $svg.appendChild($path);
        return $svg;
    }
}//class-BlobHover