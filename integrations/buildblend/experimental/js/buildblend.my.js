buildblend.enable();
buildblend.authenticate();
buildblend.html.overwriteInlineCSS("bodyElement", "background-color: black; color: white;");
buildblend.filters.pageSprinkle("backgroundStars1", "Star.png", 25, 16, 16, screen.width, screen.height);
buildblend.filters.pageSprinkle("backgroundStars2", "Star.png", 25, 16, 16, screen.width, screen.height);
buildblend.filters.pageSprinkle("backgroundStars3", "Star.png", 25, 16, 16, screen.width, screen.height);
buildblend.filters.pageSprinkle("backgroundStars4", "Star.png", 25, 16, 16, screen.width, screen.height);
buildblend.html.createElement("bodyElement", "div", "camera", "", `
  width: 100%; height: 100%;
  position: fixed;
  top: 0px; left: 0px;
`);
buildblend.html.createElement("camera", "div", "nightSkyGroundBox", "");
buildblend.html.overwriteInlineCSS("nightSkyGroundBox", `
  background-color: green;
  background-image: url('NightSkyGround.jpg');
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 400%;
  height: 66.666666666%;
  position: fixed;
  bottom: 0px;
  left: -100%;
`);
buildblend.effect3D.faceUp("nightSkyGroundBox");
var animation1_pos = 100;
function perspectiveAnimation_nightSkyGroundFirstPerspective() {
  var animation1 = setInterval(function() {
    buildblend.html.id("camera").style.perspective = animation1_pos + "px";
    animation1_pos = animation1_pos - 1;
    if (animation1_pos < 5) {
      clearInterval(animation1);
    }
  }, 10);
}
perspectiveAnimation_nightSkyGroundFirstPerspective();
var animation2_pos = 0;
function perspectiveAnimation_nightSkyGroundDown() {
  var animation2 = setInterval(function() {
    buildblend.html.id("nightSkyGround").style.bottom = animation2_pos + "px";
    animation1_pos = animation1_pos - 1;
    if (animation1_pos > -10) {
      buildblend.html.hide("nightSkyGround");
      clearInterval(animation2);
    }
  }, 100);
}
perspectiveAnimation_nightSkyGroundDown();