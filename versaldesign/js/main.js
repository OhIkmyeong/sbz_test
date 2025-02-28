import { BlobHover } from "./BlobHover.js";
import { ChangeBg } from "./ChangeBg.js";
import { Marquee } from "./Marquee.js";
import { TextScroll } from "./TextScroll.js";

new Marquee()
.set_text("Hello World")
.set_text("Bye World")
.init();

new ChangeBg()
.init();

new BlobHover()
.init();

new TextScroll()
.init();