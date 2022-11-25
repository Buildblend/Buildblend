/* 

  Buildblend.js
  Version: "0.0.2"

*/

var buildblend = {
  buildblend: "Buildblend.js",
  version: "0.0.2",
  headers: null,
  installationID: "buildblend",
  authenticated: false,
  appName: "Unknown",
  appVersion: "",
  enabled: false,
  loadTime: -1,
  get: {},
  console: {
    defaultCSS: "color: purple; font-size: 16px; font-weight: 800;",
    errorCSS: "color: yellow; font-size: 16px; font-weight: 800;",
    disabledError: "Buildblend is disabled, therefore functions are not accessible.",
    disabledErrorCSS: "color: pink; font-size: 16px; font-weight: 800;",
    warnCSS: "color: tomato; font-size: 16px; font-weight: 800;",
  },
  html: {},
  dom: {},
  filters: {},
  effect3D: {},
  google: {},
  time: {
    now: new Date()
  },
  templates: {
    effect3D: {
      perspectiveAnimation_max: 10
    }
  },
  extensions: {
    list: [],
    listSources: [],
    extensionIDPrefix: "$buildblendExtension_"
  },
  disablingSearch: "?buildblend=disable"//,
  //debugPkg: { html: {} }
}
buildblend.authenticate = function() {
  var auth;
  if (buildblend.enabled == false) {
    console.error(buildblend.console.disabledError, buildblend.console.disabledErrorCSS);
    var auth = false;
  } else {
    var auth = true;
  }
  if (location.search == buildblend.disablingSearch) {
    buildblend.enabled = true;
    console.error(disabledError, disabledErrorCSS);
    var auth = false;
  }
  buildblend.authenticated = auth;
}
buildblend.init = function(params) {
  if (params == undefined) {
    console.warn("%c Buildblend is connected, however, the Initialization Statement parameters have not been provided and therefore, some functions may not be available.", buildblend.console.errorCSS)
  }

  if (params.enabled == true) {
    buildblend.enabled = true;
  } else {
    buildblend.enabled = false;
  }

  if (params.recordLoadTime == true) {
    buildblend.loadTime = Date.now();
  }

  if (params.appName != null || params.appName != undefined) {
    buildblend.appName = params.appName;
  }

  if (params.appVersion != null || params.appVersion != undefined) {
    buildblend.appVersion = params.appVersion;
  }
  
  if (params.logInit == true) {
    console.info(`%c Buildblend Integration has been connected and initialized! Running on ${buildblend.buildblend} ${buildblend.version}.`, buildblend.console.defaultCSS);
    console.group("%c [BUILDBLEND HEADERS] View Buildblend Initialization Information.", buildblend.console.defaultCSS);
    buildblend.headers = [
      {
        Headers: "Initialization Time", 
        Data: new Date()
      }, 
      {
        Headers: "Is Enabled", 
        Data: this.enabled
      },
      {
        Headers: "App Name",
        Data: this.appName
      },
      {
        Headers: "App Version",
        Data: this.appVersion
      },
      {
        Headers: "Record Load Time",
        Data: params.recordLoadTime
      },
      {
        Headers: "Installation HTML Element ID",
        Data: this.installationID
      },
      {
        Headers: "Buildblend.js Version",
        Data: this.version
      },
      {
        Headers: "Buildblend",
        Data: buildblend
      }
    ]
    console.table(buildblend.headers);
    console.groupEnd();
  }

  if (params.reloadAfter != undefined && Number.isFinite(params.reloadAfter)) {
    setTimeout(function(){
      window.location.reload();
    }, params.reloadAfter);
  } else if (params.reloadAfter == undefined) {
    // Skip.
  } else {
    console.error("%c Buildblend Initialization Statement: reloadAfter Object: Value is not finite.", buildblend.console.errorCSS);
  }
}
function BuildblendExtension(enabled, extensionName, extensionVersion) {
  if (enabled == true) {
    this.enabled = true;
  } else if (enabled == false) {
    this.enabled = false;
  } else {
    this.enabled = false;
    console.warn("%c Buildblend extension \"" + extensionName + "\", version: \"" + extensionVersion + "\" ran the BuildblendExtension() object constructor but an invalid value was provided in parameter 1 (parameter: enabled) for a boolean (value was: " + enabled + "), therefore it has been considered it as \"false\".", buildblend.console.warnCSS);
  }

  if (extensionName != undefined && extensionName != "" && extensionName != " ") {
    this.extensionName = extensionName;
  } else {
    console.error("%c Buildblend extension name was not provided or is empty, it must be provided for the Buildblend object to be created.", buildblend.console.errorCSS);
    return {  type: "BuildblendError", name: "ExtensionDefinition", message: "Empty extension name.", time: new Date()  };
  }

  if (extensionVersion != undefined && extensionVersion != "" && extensionVersion != " ") {
    this.extensionVersion = extensionVersion;
  } else {
    this.extensionVersion = "";
  }

}
buildblend.extensions.install = function(name, src, appendix, cors) {
  var NewDOMElement = document.createElement("script");
  NewDOMElement.id = buildblend.extensions.extensionIDPrefix + name;
  if (cors == "anonymous" || cors == "use-credentials") {
    NewDOMElement.crossOrigin = cors;
  } else if (cors == "sors") {
    // Skip.
  } else {
    NewDOMElement.crossOrigin = "anonymous";
  }
  NewDOMElement.src = src;
  if (appendix == "body") {
    document.body.appendChild(NewDOMElement);
  } else if (appendix == "head") {
    document.head.appendChild(NewDOMElement);
  } else {
    document.body.appendChild(newDOMElement);
    console.warn("%c Buildblend installed the extension " + name + ", but the 'appendix' parameter was not defined any of the values \"body\" or \"head\", therefore it has been considered as \"body\".", buildblend.console.warnCSS);
  } buildblend.extensions.list.push(name);
  buildblend.extensions.listSources.push(src);
};
/*buildblend.extensions.uninstall = function(name) {
  var DOMElement = document.getElementById(buildblend.extensions.extensionIDPrefix + name);
  buildblend.extensions.listSources.splice(buildblend.extensions.listSources.indexOf(DOMElement.src), 1);
  buildblend.extensions.list.splice(buildblend.extensions.list.indexOf(DOMElement.src), 1)
};*/
function buildblendUse_addTimeZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
buildblend.disable = function() {
  buildblend.enabled = false;
}
buildblend.enable = function() {
  buildblend.enabled = true;
}
buildblend.stop = function() {
  buildblend.disable();
  delete buildblend.effect3D;
  document.getElementById(buildblend.installationID).remove();
}
buildblend.traceLength = function(string) {
  buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  return string.length;
}
buildblend.get.appInfo = function() {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  return {  name: buildblend.appName, version: buildblend.appVersion, loadTime: buildblend.loadTime, retrievedAt: new Date()  };
}
buildblend.get.htmlLoadTime = function() {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  return buildblend.loadTime;
}
buildblend.console.setDefaultCSS = function(css) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  buildblend.defaultCSS = css;
}
buildblend.console.log = function(message, css, timeout, showTime) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  if (timeout != undefined || timeout != null) {
    setTimeout(function() {
      if (showTime == true) {
        buildblend.time.now = new Date();
        logTimestamp_year = buildblendUse_addTimeZero(buildblend.time.now.getFullYear());
        logTimestamp_month = buildblendUse_addTimeZero(buildblend.time.now.getMonth() + 1);
        logTimestamp_date = buildblendUse_addTimeZero(buildblend.time.now.getDate());
        logTimestamp_hour = buildblendUse_addTimeZero(buildblend.time.now.getHours());
        logTimestamp_minute = buildblendUse_addTimeZero(buildblend.time.now.getMinutes());
        logTimestamp_second = buildblendUse_addTimeZero(buildblend.time.now.getSeconds());
        logTimestamp_millisecond = buildblendUse_addTimeZero(buildblend.time.now.getMilliseconds());
        logTimestamp = `${logTimestamp_year}/${logTimestamp_month}/${logTimestamp_date} {$logTimestamp_hour}:${logTimestamp_minute}:${logTimestamp_second}.${logTimestamp_millisecond}`;
        console.log("%c " + "" + logTimestamp + " | " + message, css);
      } else {
        console.log("%c " + message, css);
      }
    }, timeout);
  } else {
    console.log("%c " + message, css);
  }
}
buildblend.html.show = function(id) {
  document.getElementById(id).style.display = "intial";
}
buildblend.html.hide = function(id) {
  document.getElementById(id).style.display = "none";
}
buildblend.html.createElement = function(parentId, tag, id, innerHTML, inlineCSS) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  const newDOMElement = document.createElement(tag);
  newDOMElement.innerHTML = innerHTML;
  newDOMElement.id = id;
  if (inlineCSS != undefined) {
    newDOMElement.setAttribute("style", inlineCSS);
  }
  document.getElementById(parentId).appendChild(newDOMElement);
}
buildblend.html.editElement = function(id, innerHTML) {
  document.getElementById(id).innerHTML = innerHTML;
}
buildblend.html.deleteElement = function(id) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  document.getElementById(id).remove();
}
buildblend.html.setAttribute = function(id, attribute, value) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  document.getElementById(id).setAttribute(attribute, value);
}
buildblend.html.overwriteAttribute = function (id, attribute, value) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  document.getElementById(id).setAttribute(attribute, value);
}
buildblend.html.removeAttribute = function(id, attribute) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  document.getElementById(id).removeAttribute(attribute);
}
buildblend.html.overwriteInlineCSS = function(id, /*method, */css) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  /*if (method == "inline") {*/
  /*  */document.getElementById(id).setAttribute("style", css);
  /*}*/
}
buildblend.html.id = function(id) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  return document.getElementById(id);
}
buildblend.html.removeInlineCSS = function(selector) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  document.getElementById(selector).removeAttribute("style");
}
buildblend.html.overwriteID = function(id, newId) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  document.getElementById(id).id = newId;
}
buildblend.dom.parentOf = function(id) {
  buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  return document.getElementById(id).parentElement;
}
buildblend.dom.nextSiblingOf = function(id) {
  buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  return document.getElementById(id).nextSibling;
}
buildblend.html.importExternalStylesheet = function(id, url) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  var NewDOMLinkElement = document.createElement("link");
  NewDOMLinkElement.rel = "stylesheet";
  NewDOMLinkElement.href = url;
  NewDOMLinkElement.type = "text/css";
  NewDOMLinkElement.id = id;

  document.head.appendChild(NewDOMLinkElement);
}
buildblend.html.draggable = function(id) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(id + "_draggable")) {
    /* if present, the _draggable suffixed id is where you move the DIV from:*/
    document.getElementById(id + "_draggable").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    document.getElementById(id).onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    document.getElementById(id).style.position = "absolute";
    document.getElementById(id).style.top = (document.getElementById(id).offsetTop - pos2) + "px";
    document.getElementById(id).style.left = (document.getElementById(id).offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
buildblend.html.createMetaData = function(id, name, content) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  var NewDOMMetaElement = document.createElement("meta");
  if (name == "abstract" || name == "author" || name == "contact" || name == "copyright" || name == "description" || name == "distribution" || name == "expires" || name == "generator" || name == "Googlebot" || name == "keywords" || name == "language" || name == "news_keywords" || name == "no-email" || name == "rating" || name == "reply-to" || name == "revisit-after" || name == "slurp" || name == "web-author") {
    NewDOMMetaElement.name = name;
    NewDOMMetaElement.content = content;
  } else if (name == "equiv-cache-control" || name == "equiv-content-type" || name == "equiv-cookie" || name == "equiv-disposition" || name == "equiv-imagetoolbar" || name == "equiv-ms-theme" || name == "equiv-pics-label" || name == "equiv-pragma" || name == "equiv-refresh" || name == "equiv-resource-type" || name == "equiv-script-type" || name == "equiv-style-type" || name == "equiv-window-target" || name == "robots" || name == "viewport") {
    NewDOMMetaElement.httpEquiv = name;
    NewDOMMetaElement.content = content;
  }
  NewDOMMetaElement.id = id;

  document.head.appendChild(newDOMMetaElement);
}
buildblend.filters.brightness = function(id, value) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  document.getElementById(id).style.filter = "brightness(" + value + ")";
}
buildblend.filters.shadow = function(id, method, x, y, blurRadius, color) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  if (method == "box") {
    document.getElementById(id).style.boxShadow = x + " " + y + " " + blurRadius + " " + color;
  } else if (method == "text") {
    document.getElementById(id).style.textShadow = x + " " + y + " " + blurRadius + " " + color;
  } else if (method == "remove_box") {
    document.getElementById(id).style.boxShadow = none;
  } else if (method == "remove_text") {
    document.getElementById(id).style.textShadow = none;
  } else if (method == "remove_all") {
    document.getElementById(id).style.boxShadow = none;
    document.getElementById(id).style.textShadow = none;
  } else {
    document.getElementById(id).style.boxShadow = x + " " + y + " " + blurRadius + " " + color;
    document.getElementById(id).style.textShadow = x + " " + y + " " + blurRadius + " " + color;
  }
}
buildblend.filters.grayscale = function(id, value) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  document.getElementById(id).style.filter = "grayscale(" + value + ")";
}
buildblend.filters.pageSprinkle = function(className, imageSrc, amount, width, height, xLimit, yLimit) {
  for (let i = 0; i <= amount+1; i++) {
    var NewDOMElement = document.createElement("img");
    NewDOMElement.classList.add(className);
    NewDOMElement.src = imageSrc;
    NewDOMElement.width = width;
    NewDOMElement.height = height;
    NewDOMElement.style.position = "absolute";
    NewDOMElement.style.top = Math.floor(Math.random() * yLimit) + 1 + "px";
    NewDOMElement.style.left = Math.floor(Math.random() * xLimit) + 1 + "px";

    document.body.appendChild(NewDOMElement);
  }
}
buildblend.effect3D.rotate3d = function(id, x, y, z, angle) {
  document.getElementById(id).style.transform = "rotate3d(" + x + ", " + y + ", " + z + " " + angle + ")";
}
buildblend.effect3D.faceLeft = function(id) {
  document.getElementById(id).style.transform = "rotate3d(90, 90, 90, 45deg)";
}
buildblend.effect3D.faceRight = function(id) {
  document.getElementById(id).style.transform = "rotate3d(270, 270, 270, 315deg)";
}
buildblend.effect3D.faceUp = function(id) {
  document.getElementById(id).style.transform = "rotateX(11.25deg)";
  const DOMElementParent = document.getElementById(id).parentElement;
  DOMElementParent.style.perspective = "100px";
}
buildblend.templates.effect3D.perspectiveAnimation = function(id, minimum, interval) {
  var perspectiveAnimation = setInterval(function() {
    buildblend.html.overwriteInlineCSS(id, "perspective: " + buildblend.templates.effect3D.perspectiveAnimation_max + "px");
    buildblend.templates.effect3D.perspectiveAnimation_max = buildblend.templates.effect3D.perspectiveAnimation_max - 1;
    if (buildblend.templates.effect3D.perspectiveAnimation_max <= 10) {
      clearInterval(perspectiveAnimation);
    }
  }, interval);
}
buildblend.google.importFont = function(id, fontFamily/*, fontWeight*/) {
buildblend.authenticate();if(buildblend.authenticated==false){return console.error("%c "+buildblend.console.disabledError, buildblend.console.disabledErrorCSS);}
  /* (fontWeight == undefined) {
    var fontWght = 400;
  } else {
    var fontWght = fontWeight;
  }*/
  var NewDOMLinkElement = document.createElement("link");
  NewDOMLinkElement.href = "https://fonts.googleapis.com/css2?family=" + fontFamily + /*":wght@" + fontWght + */"&display=swap";
  NewDOMLinkElement.rel = "stylesheet";
  NewDOMLinkElement.id = id;

  document.head.appendChild(NewDOMLinkElement);
}