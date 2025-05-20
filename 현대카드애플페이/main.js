const $$sect = document.querySelectorAll(".sect");
const $$mi = document.querySelectorAll(".fixed-mobile-inner");

const getFinalX = ({ move, idx, right = false }) => {
    const rightLimit = (innerWidth / 2) - (250 * (3 - idx)) + 125 - 40 - ((3 - idx) * 10);
    console.log(`idx:${idx}, move:${move}, limit:${rightLimit}`);
    if (move <= 0) { return 0; }
    if (move >= rightLimit) { return rightLimit; }
    return move;
}

window.addEventListener("scroll", () => {
    const top1 = $$sect[0].getBoundingClientRect().top;
    const top2 = $$sect[1].getBoundingClientRect().top;
    const top3 = $$sect[2].getBoundingClientRect().top;
    const kick2 = top2 + scrollY;
    const kick3 = top3 + scrollY;


    if (scrollY < kick2 / 2) {
        console.log("첫번째화면");
        $$mi.forEach(($mi) => {
            $mi.style.transform = `translateX(0px)`;
        });
    } else if (scrollY < kick3 / 3) {
        const x = (scrollY - top2) / window.innerWidth;
        $$mi.forEach(($mi, idx) => {
            const move = x * 250 * (idx + 1);
            $mi.style.transform = `translateX(${getFinalX({
                move,
                idx,
                right: false
            })}px)`;
        });
    } else if (scrollY < kick3) {
        const x = (scrollY - top2) / window.innerWidth;
        $$mi.forEach(($mi, idx) => {
            const move = (3 - x) * 250 * (idx + 1);
            $mi.style.transform = `translateX(${getFinalX({
                move,
                idx,
                right: true
            })}px)`;
        });
    } else {
        console.log("세번째화면")
        $$mi.forEach(($mi) => {
            $mi.style.transform = `translateX(0px)`;
        });
    }
});