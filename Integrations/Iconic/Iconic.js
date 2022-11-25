/*

  Buildblend Iconic
  Version 0.1.0

*/

var Iconic = {
  Iconic: `Iconic`,
  Version: `0.1.0`,
  BuildblendBaseURI: `integrations/Iconic/`,
  CustomEmoji: [],
  EmojiDefaultWidth: `32px`
}

Iconic.CreateEmoji = function(name, source, alt) {
  if (source == null) return 'INVALID_SOURCE';

  Iconic.CustomEmoji.push({
    Name: name,
    Source: source,
    DefaultAlt: alt || ``
  });
};

Iconic.AppendEmoji = function(source, element, alt, userSelect) {
  var NewDOMElement = document.createElement("img");
  var matchesCustom = false;
  var matching;
  for (let i = 0; i < Iconic.CustomEmoji.length; i++) {
    if (source == Iconic.CustomEmoji[i].Name) {
      matchesCustom = true;
      matching = i;
    }
  }
  if (matchesCustom == true) {
    NewDOMElement.src = Iconic.CustomEmoji[matching].Source;
    NewDOMElement.alt = Iconic.CustomEmoji[matching].DefaultAlt || ``;
  } else {
    NewDOMElement.src = source;
    NewDOMElement.alt = alt || ``;
  }
  NewDOMElement.alt = alt || ``;
  if (userSelect == false) {
    NewDOMElement.style.userSelect = `none`;
  }
  NewDOMElement.style.display = `inline`;
  NewDOMElement.style.height = `inherit`;
  NewDOMElement.style.width = Iconic.EmojiDefaultWidth;

  element.appendChild(NewDOMElement);
  return NewDOMElement;
};

Iconic.FetchIcon = function(iconName) {
  var xhttp = new XMLHttpRequest();
  var done;
  var data = {};

  xhttp.open("GET", Iconic.BuildblendBaseURI + `icons.xml`, true);
  xhttp.send().then;
  xhttp.onreadystatechange = function() {
    var data2 = {};
    if (this.readyState == 4 && this.status == 200) {
      data2.Name = this.responseText;
      data = data2;
      done = true;
    }
  };

  if (done == true) {
    console.debug("a");
    return data;
  }
};