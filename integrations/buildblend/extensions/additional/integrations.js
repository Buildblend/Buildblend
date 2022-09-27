buildblend.integrations = new BuildblendExtension(true, "Buildblend Integrations", "0.3.0", "BuildblendAdditional");
buildblend.integrations.google = new Object();
buildblend.integrations.github = new Object();

buildblend.integrations.google.importFont = function(id, fontFamily/*, fontWeight*/) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  /* (fontWeight == undefined) {
    var fontWght = 400;
  } else {
    var fontWght = fontWeight;
  }*/
  var NewDOMLinkElement = document.createElement("link");
  NewDOMLinkElement.href = "https://fonts.googleapis.com/css2?family=" + fontFamily + /*":wght@" + fontWght + */"&display=swap";
  NewDOMLinkElement.rel = "stylesheet";
  if (id != undefined) {
    NewDOMLinkElement.id = id;
  }
  document.head.appendChild(NewDOMLinkElement);
}

buildblend.integrations.github.embedGist = function(username, gist) {
  var gistLink = `https://gist.github.com/${username}/${gist}.js`;
};

buildblend.integrations.github.importGist = function(username, gist, filename) {
  var gistLink = `https://gist.githubusercontent.com/${username}/${gist}/raw/${filename}`;
}

buildblend.integrations.github.;