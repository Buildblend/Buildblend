/*

  "buildblend.css.js" is a special file which uses Buildblend.js to facilitate certain styles of the page.

*/

buildblend.effect3D.faceUp("homeIntro");
buildblend.html.overwriteInlineCSS("boxPerspective1", "perspective: 25px;");
var animation_pos = 25;
function perspectiveAnimation_homeIntro() {
  var animation = setInterval(function() {
    buildblend.html.overwriteInlineCSS("boxPerspective1", "perspective: " + animation_pos + "px");
    animation_pos = animation_pos + 1;
    if (animation_pos >= 250) {
      clearInterval(animation);
    }
  }, 10);
}
perspectiveAnimation_homeIntro()