console.log('Start')
var animateElem = document.getElementsByClassName("aboutIntroCard")[0];
var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: 100})
.on("enter", function () {
    animateElem.style.transform = 'rotateY(-.5turn)';
    console.log('In')
})
.on("leave", function () {
    
})
.addIndicators({name: "2 - change inline style"})
.addTo(controller);