/*

  Buildblend Bind.js
  1.0.0

*/

// Initiate Bind.

var Bind = {
  Bind: `Buildblend Bind!`,
  Version: `1.0.0`,
}

// Create aliases or alternative declarations of Bind.

var bi = Bind;
var Bi = Bind;
var BI = Bind;
var bI = Bind;

Bind.Bind = function(element, key, func, pressType, location, capturing) {
  if (element == null) return `INVALID_ELEMENT`;
  var pT = pressType;
  if (pressType == 'hold') {
    pT = 'keydown';
  } else if (pressType == 'release') {
    pT = 'keyup';
  } else {
    pT = 'keypress';
  }
  var loc = 0;
  if (location != undefined) {
    if (loc == "numpad") {
      loc = 3;
    } else if (loc == "right") {
      loc = 2;
    } else if (loc == "left") {
      loc = 1;
    } else {
      loc = 0;
    }
  }
  var data = {
    Element: element,
    Key: key,
    LocationName: location,
    Location: loc,
    PressTypeName: pressType,
    PressType: pT,
    Capturing: capturing,
  };
  element.addEventListener(pT, function(event) {
    if (event.key == key && location != undefined) {
      if (event.location == loc) {
        data.FunctionValue = func(data, event);
      }
    } else if (event.key == key) {
      data.FunctionValue = func(data, event);
    } else {
      return;
    }
  }, capturing || false);
  return 100;
}
Bind.bi = Bind.Bind;
Bind.Bi = Bind.Bind;
Bind.BI = Bind.Bind;
Bind.bI = Bind.Bind;

Bind.BindAND = function(element, key, key2, func, pressType, location, capturing) {
  if (element == null) return `INVALID_ELEMENT`;

  var pT = pressType;
  if (pressType == 'hold') {
    pT = 'keydown';
  } else if (pressType == 'release') {
    pT = 'keyup';
  } else {
    pT = 'keypress';
  }
  var loc = 0;
  if (location != undefined) {
    if (loc == "numpad") {
      loc = 3;
    } else if (loc == "right") {
      loc = 2;
    } else if (loc == "left") {
      loc = 1;
    } else {
      loc = 0;
    }
  }
  element.addEventListener(pT, function(event) {
    var isC =  false;
    if (key == 'ALT' && event.altKey == true) {
      isC = true;
    } else if (key == 'CTRL' && event.ctrlKey == true) {
      isC = true;
    } else if (key == 'META' && event.metaKey == true) {
      isC = true;
    } else if (key == 'SHIFT' && event.shiftKey == true) {
      isC = true;
    } else {
      isC = false;
    }

    var data = {
      Element: element,
      Key: key,
      Key2: key2,
      LocationName: location,
      Location: loc,
      PressTypeName: pressType,
      PressType: pT,
      Capturing: capturing,
      MatchesKey: isC
    };

    if (isC == true && event.key == key2 && location != undefined) {
      if (event.location == loc) {
        data.FunctionValue = func(data, event);
      }
    } else if (isC == true && event.key == key) {
      data.FunctionValue = func(data, event);
    } else {
      return;
    }
  }, capturing || false);
  return 100;
}
Bind.biA = Bind.BindAND;
Bind.BiA = Bind.BindAND;
Bind.BIA = Bind.BindAND;
Bind.bIA = Bind.BindAND;

Bind.Unbind = function(element, eventType, func) {
  var evT = eventType;
  if (eventType == "hold") {
    evT = 'keydown';
  } else if (eventType == "release") {
    evT = 'keyup';
  } else {
    evT = 'keypress';
  }
  element.removeEventListener(evT, func);
}
Bind.Ubi = Bind.Unbind;
Bind.UBi = Bind.Unbind;
Bind.UBI = Bind.Unbind;
Bind.UbI = Bind.Unbind;
Bind.ubi = Bind.Unbind;
Bind.uBi = Bind.Unbind;
Bind.uBI = Bind.Unbind;
Bind.ubI = Bind.Unbind;