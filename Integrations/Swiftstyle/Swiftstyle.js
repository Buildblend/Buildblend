/*

  Buildblend Swiftstyle.js
  Version 0.1.0

*/

// Initiate the construction of Swiftstyle.

var Swiftstyle = {
  Swiftstyle: `Buildblend Swiftstyle!`,
  Version: `0.1.0`,
  CSSVariables: {}
};

Swiftstyle.CSSVar = Swiftstyle.CSSVariables;

// Create aliases or alternative declarations of Swiftstyle.

var Swst = Swiftstyle;
var SWST = Swiftstyle;

Swiftstyle.AppendStylesheet = function() {
  var NewDOMElement = document.createElement("link");
  NewDOMElement.id = `swiftstyle_stylesheet`;
  NewDOMElement.href = `..\\Swiftstyle\\Swiftstyle.css`;
  NewDOMElement.rel = `stylesheet`;
  NewDOMElement.setAttribute("Swiftstyle", "Stylesheet");
  document.head.appendChild(NewDOMElement);
};
Swiftstyle.AppendStylesheet();

Swiftstyle.CSSVariables.SetCSSVariable = function(variable, value) {
  if (variable != undefined && value == undefined) {
    var returnVal = [];
    for (let i = 0; i < variable.length; i++) {
      returnVal.push(document.querySelector(`:root`).style.setProperty(variable[i].Variable, variable[i].Value));
    }
    return returnVal;
  } else {
    return document.querySelector(`:root`).style.setProperty(variable, value);
  }
};
Swiftstyle.CSSVar.Set = Swiftstyle.CSSVariables.SetCSSVariable;

Swiftstyle.CSSVariables.Get = function(variable) {
  return getComputedStyle(document.querySelector(`:root`)).getPropertyValue(variable);
};

Swiftstyle.DeleteStyledElements = function() {
  var elements = document.querySelectorAll(`[Swiftstyle]`);
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
};
Swiftstyle.DelAll = Swiftstyle.DeleteStyledElements;