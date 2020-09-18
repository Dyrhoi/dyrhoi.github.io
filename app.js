

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

const cursor = document.getElementsByClassName("cursor")[0]
const cursorMedia = document.getElementsByClassName("cursor--media")[0]
const backgroundHeaderCode = document.getElementById("header-bg-code");
const backgroundClipPath = document.getElementById("backgroundclip");
const backgroundClipPathCircle = backgroundClipPath.firstElementChild;

let tween = null;


gsap.set(".cursor", {xPercent: -50, yPercent: -50});
gsap.set("#backgroundclip", {xPercent: -50, yPercent: -50});

var cursorElement = cursor;
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;

var cursorXSet = gsap.quickSetter(cursorElement, "x", "px");
var cursorYSet = gsap.quickSetter(cursorElement, "y", "px");

var bgXSet = gsap.quickSetter(backgroundClipPath, "x", "px");
var bgYSet = gsap.quickSetter(backgroundClipPath, "y", "px");


window.addEventListener("mousemove", e => {
    //cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    mouse.x = e.x;
    mouse.y = e.y;  
});

window.addEventListener("mouseover", e => {
    if (e.target.classList.contains("coolfx")) {
        if(tween != null) tween.kill();
        tween = gsap.to(backgroundClipPathCircle, {r:200, cx: 200, cy: 200})
    }
});

window.addEventListener("mouseout", e => {
    if (e.target.classList.contains("coolfx")) {
        if(tween != null) tween.kill();
        tween = gsap.to(backgroundClipPathCircle, .3, {r:0, cx: 0, cy: 0})
    }
});

gsap.ticker.add(() => {
    var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
    
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    cursorXSet(pos.x);
    cursorYSet(pos.y);

    bgXSet(pos.x);
    bgYSet(pos.y);
    

  });