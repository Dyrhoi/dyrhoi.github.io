/*

Variables.

*/

const cursor = document.getElementsByClassName("cursor")[0]
const cooltext = document.getElementsByClassName("coolfx")[0]
const cursorMedia = document.getElementsByClassName("cursor--media")[0]
const backgroundHeaderCode = document.getElementById("header-bg-code");
const backgroundClipPath = document.getElementById("backgroundclip");
const backgroundClipPathCircle = backgroundClipPath.firstElementChild;

let tween = null;
let tweenMove = null;


/*

Default values.

*/


gsap.set(cursor, {xPercent: -50, yPercent: -50});
gsap.set(backgroundClipPath, {xPercent: -50, yPercent: -50});
gsap.set("section:last-of-type", {marginBottom: document.querySelector("footer").clientHeight});


/*

Cool cursor animations

*/

var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;
var stickToTarget = false;

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
    //if(!stickToTarget) {
        bgXSet(pos.x);
        bgYSet(pos.y);
    //}
    /*else {
        parallaxCursor(cooltext, 1.5);
    }*/
    

});


document.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;  
});

cooltext.addEventListener("mouseover", e => {
    if(isMobile()) {
        if(tween != null) tween.kill();
        //if(tweenMove != null) tween.kill();
        stickToTarget = true;
        tween = gsap.to(backgroundClipPathCircle, .3, {ease: Power1.easeOut, r:200, cx: 200, cy: 200, onComplete: () => {
        }});
        
        
    }
});

cooltext.addEventListener("mouseout", e => {
    if(tween != null) tween.kill()
    //if(tweenMove != null) tweenMove.kill();
    stickToTarget = false;
    tween = gsap.to(backgroundClipPathCircle, .3, {ease: Power1.easeIn, r:0, cx: 0, cy: 0, onComplete: () => {
    }});
    

    
});

function parallaxCursor(parent, movement) {
    if(tweenMove != null) tweenMove.kill()
    var rect = parent.getBoundingClientRect();
    var relX = mouse.x - rect.left;
    var relY = mouse.y - rect.top;
    pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
    pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
    tweenMove = gsap.to(backgroundClipPath, 0.3, { x: pos.x, y: pos.y });
}

/*


Scroll


*/


/*


Other functions


*/

function isMobile() {
    return (window.innerWidth > 1024)
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