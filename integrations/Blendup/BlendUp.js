/*

  Buildblend BlendUp.js
  0.1.0

*/

// Initiate BlendUp.

var BlendUp = {
  BlendUp: `BlendUp`,
  Version: `0.1.0`,
  Root: document.querySelector(`:root`),
  Head: document.head,
  Body: document.body,
  Configuration: {},
  Renderer: {}
};

bu = BlendUp;
Bu = BlendUp;
BU = BlendUp;
bU = BlendUp;

// Create the 'Configuration' module.

BlendUp.Config = BlendUp.Configuration;
BlendUp.co = BlendUp.Configuration;
BlendUp.Co = BlendUp.Configuration;
BlendUp.CO = BlendUp.Configuration;
BlendUp.bO = BlendUp.Configuration;

BlendUp.Configuration = {
  DeleteOnAddingAbstract: true
}

// Create the 'Renderer' module.

// Stylesheet, [Source]

BlendUp.Renderer.Stylesheets = function() {
  var elements = document.getElementsByTagName(`Stylesheet`);
  if (elements == null) return;

  for (let i = 0; i < elements.length; i++) {
    var elements_attr_src = elements[i].getAttribute(`Source`);
    if (elements_attr_src == null) return;
    var NewStylesheet = document.createElement(`link`);
    NewStylesheet.rel = `stylesheet`;
    NewStylesheet.href = elements_attr_src;
    NewStylesheet.type = `text/css`;
    document.head.appendChild(NewStylesheet);
    if (BlendUp.Configuration.DeleteOnAddingAbstract == true) elements[i].remove();
  }
};

// Box

BlendUp.Renderer.Boxes = function() {
  var elements = document.getElementsByName(`Box`);
  if (elements == null) return;

  for (let i = 0; i < elements.length; i++) {
    var attrs = elements[i].getAttributes();
    var NewDIV = document.createElement("div");
    NewDIV.innerHTML = elements[i].innerHTML;
    for (let i2 = 0; i2 < attrs.length; i2++) {
      // TO-DO
    }
    elements[i].after(NewDIV);
  }
}