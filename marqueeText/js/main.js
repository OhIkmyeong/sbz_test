import { MarqueeCtrl } from "./marqueeCtrl.js";
import { MarqueeView } from "./marqueeView.js";

/* [DOM] */
const $mqWrap = new MarqueeView()
.set_text("HELLO","WORLD","안녕하세요")
.init();

document.body.appendChild($mqWrap);

/* [ADD EVENT] */
new MarqueeCtrl().init();