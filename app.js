/*

Variables.

*/

const cursor = document.getElementsByClassName("cursor")[0];
const cooltext = document.getElementsByClassName("cool-text")[0];
const cursorMedia = document.getElementsByClassName("cursor--media")[0];
const backgroundHeaderCode = document.getElementById("header-bg-code");
const backgroundClipPath = document.getElementById("backgroundclip");
const backgroundClipPathCircle = backgroundClipPath.firstElementChild;
const controller = new ScrollMagic.Controller();

let tween = null;
let tweenMove = null;

/*

Default values.

*/

gsap.set(cursor, { xPercent: -50, yPercent: -50 });
gsap.set(backgroundClipPath, { xPercent: -50, yPercent: -50 });
gsap.set("section:last-of-type", {
	marginBottom: document.querySelector("footer").clientHeight,
});

/*

Cool cursor animations

*/

var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;

var cursorXSet = gsap.quickSetter(cursor, "x", "px");
var cursorYSet = gsap.quickSetter(cursor, "y", "px");

var bgXSet = gsap.quickSetter(backgroundClipPath, "x", "px");
var bgYSet = gsap.quickSetter(backgroundClipPath, "y", "px");

var dt;

gsap.ticker.add(() => {
	dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

	pos.x += (mouse.x - pos.x) * dt;
	pos.y += (mouse.y - pos.y + window.pageYOffset) * dt;
	cursorXSet(pos.x);
	cursorYSet(pos.y);
	bgXSet(pos.x);
	bgYSet(pos.y);
});

document.addEventListener("mousemove", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});

cooltext.addEventListener("mouseover", (e) => {
	if (isMobile()) {
		if (tween != null) tween.kill();
		//if(tweenMove != null) tween.kill();
		tween = gsap.to(backgroundClipPathCircle, 0.3, {
			ease: Power1.easeOut,
			r: 200,
			cx: 200,
			cy: 200,
			onComplete: () => {},
		});
	}
});

cooltext.addEventListener("mouseout", (e) => {
	if (tween != null) tween.kill();
	//if(tweenMove != null) tweenMove.kill();
	tween = gsap.to(backgroundClipPathCircle, 0.3, {
		ease: Power1.easeIn,
		r: 0,
		cx: 0,
		cy: 0,
		onComplete: () => {},
	});
});

/*


Scroll


*/

//Parallax:

Array.prototype.forEach.call(
	document.getElementsByClassName("parallax-wrapper"),
	function (el) {
		var children = el.children;

		/*
            Parallax Scrolling:
        */

		Array.prototype.forEach.call(children, function (child) {
			if (!child.classList.contains("child")) return;
			var scene = new ScrollMagic.Scene({
				triggerElement: el,
				triggerHook: 0.4,
				duration: "100%",
			});
			var tl = new TimelineMax();
			tl.to(child, 1, {
				y: -Math.floor(Math.random() * (250 - 100 + 1) + 100),
				ease: Linear.easeNone,
			});

			scene
				.setTween(tl)
				/*.addIndicators({
					colorTrigger: "black",
					colorStart: "black",
					colorEnd: "black",
					indent: 10,
                })
                */
				.setClassToggle(".cool-image", "active")
				.addTo(controller);
		});
	}
);

/*


Other functions


*/

function isMobile() {
	return window.innerWidth > 1024;
}

var ageTexts = document.getElementsByClassName("age-calc");
for (var i = 0; i < ageTexts.length; i++) {
	ageTexts.item(i).innerHTML = getAge("1998-05-17");
}

function getAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}
