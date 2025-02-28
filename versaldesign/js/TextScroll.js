export class TextScroll{
    constructor(){
        this.$wrap = document.getElementById("txtsc-wrap");
        this.$$word = document.querySelectorAll(".txtsc-word");
    }//constructor

    init(){
        window.addEventListener("scroll",()=>{
            const scY = window.scrollY;
            const winHei = window.innerHeight;
            const {top} = this.$wrap.getBoundingClientRect(); 
            console.log(top,winHei);
            if(top <= 0 && top > winHei * -1){
                this.$$word[0].classList.add("show");
                this.$$word[1].classList.remove("show");
                this.$$word[2].classList.remove("show");
            }else if(top <= winHei * -1 && top > winHei * -2){
                this.$$word[0].classList.add("show");
                this.$$word[1].classList.add("show");
                this.$$word[2].classList.remove("show");
            }else if(top <= winHei * -2){
                this.$$word[0].classList.add("show");
                this.$$word[1].classList.add("show");
                this.$$word[2].classList.add("show");
            }else{
                this.$$word[0].classList.remove("show");
                this.$$word[1].classList.remove("show");
                this.$$word[2].classList.remove("show");

            }//if
        });//scroll
    }//init
}//class:TextScroll