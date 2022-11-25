window.onscroll = function() {
  scrollUpPlay(document.getElementById("home_section2"), 300, 800);
  scrollUpPlay(document.getElementById("home_section3"), 600, 1100);
  scrollUpPlay(document.getElementById("home_section4"), 900, 1600);
  checkFooter();
};

sprinkle("backgroundStars1", document.body, "backgroundStars.png", screen.availWidth, screen.availHeight, 30);
sprinkle("backgroundStars2", document.body, "backgroundStars.png", screen.availWidth, screen.availHeight, 30);
sprinkle("backgroundStars3", document.body, "backgroundStars.png", screen.availWidth, screen.availHeight, 30);

function scrollUpPlay(element, minPos, maxPos) {
  if (document.documentElement.scrollTop > minPos && document.documentElement.scrollTop < maxPos) {
    document.querySelector(":root").style.setProperty(`--slideDown_iterationCount`, `1`);
    element.className = "slideUp";
  } else {
    element.className = "toSlide";
  }
}

function sprinkle(className, parent, src, xLimit, yLimit, loops) {
  for (let i = 0; i < loops; i++) {
    var NewDOMElement = document.createElement("img");
    NewDOMElement.className = className;
    NewDOMElement.src = src;
    NewDOMElement.style.position = "fixed";
    NewDOMElement.style.left = Math.floor(Math.random() * (xLimit - 0 + 1) ) + 0 + "px";
    NewDOMElement.style.top = Math.floor(Math.random() * (yLimit - 0 + 1) ) + 0 + "px";
    parent.appendChild(NewDOMElement);
  }
}

function checkFooter() {
  var limit = Math.min(document.body.scrollHeight, document.body.offsetHeight, 
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  if (limit <= window.scrollY) {
    console.log('bottom :)');
  } else {
    console.log('no bottom :(');
  }
}