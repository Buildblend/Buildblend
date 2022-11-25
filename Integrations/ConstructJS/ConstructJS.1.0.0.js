/*

  Buildblend Construct.js
  Version 0.8.0

*/

// Initiate the construction of Construct.

var Construct = {
  Errors: {},
  Configuration: {},
  Toolkit: {},
  HTML: {},
  Audio: {},
  Blendscript: {},
  Extensions: {}
};

// Create aliases or alternative declarations of Construct.

var Ct = Construct;
var CT = Construct;
var cT = Construct;

// Create aliases or alternative declarations of Construct's modules.

Construct.Errs = Construct.Errors;
Construct.Config = Construct.Configuration;
Construct.Cogs = Construct.Configuration;
Construct.Tools = Construct.Toolkit;
Construct.Kit = Construct.Toolkit;
Construct.HTM = Construct.HTML;
Construct.Bs = Construct.Blendscript;
Construct.Exts = Construct.Extensions;
Construct.Ext = Construct.Extensions;

// Set up the basic structure of Construct.

Construct.Construct = "Buildblend Construct.js";
Construct.Version = "0.8.0";

Construct.Errors = {
  Unknown: {
    Time: new Date(-1),
    Type: "Unknown",
    Name: "Unknown Error",
    Message: "The error could not be determined.",
    Code: 0
  },
  NoError: {
    Time: new Date(-1),
    Type: "ErrorController",
    Name: "No Error",
    Message: "Honestly, the error which occured is that no error occured.",
    Code: 1
  },
  Disabled: {
    Time: new Date(-1),
    Type: "ConfigurationError",
    Name: "Construct Disabled",
    Message: "Construct is disabled on this site.",
    Code: 2
  },
  InvalidNumber: {
    Time: new Date(-1),
    Type: "DatatypeError",
    Name: "Invalid Number",
    Message: "An invalid number was provided.",
    Code: 3
  },
  InvalidParameters: {
    Time: new Date(-1),
    Type: "ParameterError",
    Name: "Invalid Parameters",
    Message: "One or more parameters were either invalid or omitted.",
    Code: 4
  },
  MissingParameters: {
    Time: new Date(-1),
    Type: "ParameterError",
    Name: "Missing Parameters",
    Message: "One or more parameters were missing: meaning they were either undefined or empty.",
    Code: 5
  },
  UnexistentElement: {
    Time: new Date(-1),
    Type: "ParameterError",
    Name: "Unexistent Element",
    Message: "The provided element does not exist in the document.",
    Code: 6
  },
  UnexistentElement: {
    Time: new Date(-1),
    Type: "HTMLGroupError",
    Name: "Unexistent Group",
    Message: "The group name provided does not exist.",
    Code: 7
  }
};

Construct.Configuration.Enabled = true;
Construct.Configuration.CollapsedErrorGroups = false;

Construct.Authenticate = function() {
  if (Construct.Configuration.Enabled == false) {
    return 1;
  }
  if (window.location.search == `?constructActivation=false`) {
    return 1;
  }

  return 0;
}

Construct.Errors.Count = 0;
Construct.Errors.LastError = Construct.Errors.NoError;
Construct.Errors.Send = function(error, details) {
  var errorInitialMessage = `${Construct.Construct} ${Construct.Version} encountered an error.`;
  var errorInitialMessageCSS = `color: #D63227; font-family: monospace; font-size: 24px;`;
  var errorMessageCSS = `font-family: monospace; font-size: 16px;`;
  var errorMessageCSS1 = `color: #D63227;`;
  var errorMessageCSS2 = `color: #E04136;`;
  var errorMessageCSS3 = `color: #E85b51;`;
  var errorMessageCSS4 = `color: #EB6960;`;
  var errorMessageCSS5 = `color: #F07D75;`;
  var errorOccurenceTime = new Date();

  if (Construct.Configuration.CollapsedErrorGroups) {
    console.groupCollapsed(`%c${errorInitialMessage}`, `${errorInitialMessageCSS}`);
  } else {
    console.group(`%c${errorInitialMessage}`, `${errorInitialMessageCSS}`);
  }
  console.log(`%cTime: ${errorOccurenceTime}`, `${errorMessageCSS} ${errorMessageCSS1}`);
  console.log(`%cType: ${error.Type}`, `${errorMessageCSS} ${errorMessageCSS2}`);
  console.log(`%cName: ${error.Name}`, `${errorMessageCSS} ${errorMessageCSS3}`);
  console.log(`%cMessage: ${error.Message}`, `${errorMessageCSS} ${errorMessageCSS4}`);
  console.log(`%cCode: ${error.Code}`, `${errorMessageCSS} ${errorMessageCSS5}`);
  if (details != undefined) {
    console.log(`%cAdditional Details: ${details}`, `${errorMessageCSS} ${errorMessageCSS5}`);
  }
  console.groupEnd();

  error.Time = errorOccurenceTime;
  Construct.Errors.LastError.Time = errorOccurenceTime;
  Construct.Errors.LastError.Type = error.Type;
  Construct.Errors.LastError.Name = error.Name;
  Construct.Errors.LastError.Message = error.Message;
  Construct.Errors.LastError.Code = error.Code;
  Construct.Errors.Count++;

  return error;
};

// Construct the 'Toolkit' module.

Construct.Toolkit.Validate = function(type, input, checkForObjects) {
  if (type == "FiniteNumber") {
    var isNumFinite = isFinite(input);
    if (isNumFinite) {
      return true;
    } else {
      return false;
    }
  } else if (type == "String") {
    var typeOfInput = typeof input;
    if (typeOfInput == "string") {
      return true;
    } else if (typeOfInput == "object" && checkForObjects != false) {
      if (typeof input[0] == "string") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else if (type == "Element") {
    if (input == null) {
      return false;
    } else {
      return true;
    }
  } else {
    Construct.Errors.Send(Construct.Errors.InvalidParameters);
    return Construct.Errors.InvalidParameters;
  }
};

Construct.Toolkit.PadNumber = function(start, zeros, input, direction) {
  var isNumFinite = isFinite(input);
  var theZeros = ``;

  for (let i = 0; i < zeros; i++) {
    theZeros += `0`;
  }

  if (!isNumFinite) {
    Construct.Errors.Send(Construct.Errors.InvalidNumber);
    return Construct.Errors.InvalidNumber;
  }
  if (input >= start) {
    if (direction == "") {
      return input + theZeros;
    } else {
      return theZeros + input;
    }
  } else {
    return input;
  }
};

// Construct the 'HTML' module.

Construct.HTML.Select = function(method, value) {
  if (Construct.Authenticate() != 0) {
    Construct.Errors.Send(Construct.Errors.Disabled);
    return Construct.Errors.Disabled;
  }

  if (method != undefined && value == undefined) {
    return document.querySelector(method);
  } else if (method == "QuerySelector") {
    return document.querySelector(value);
  } else if (method == "QuerySelectorAll") {
    return document.querySelectorAll(value);
  } else if (method == "Id") {
    return document.getElementById(value);
  } else if (method == "Class") {
    return document.getElementsByClassName(value);
  } else if (method == undefined && value == undefined) {
    Construct.Errors.Send(Construct.Errors.MissingParameters, `No parameters were provided.`);
    return Construct.Errors.MissingParameters;
  } else {
    Construct.Errors.Send(Construct.Errors.InvalidParameters, `Invalid parameters were provided.`);
    return Construct.Errors.InvalidParameters;
  }
};
Construct.HTML.Sel = Construct.HTML.Select;

Construct.HTML.Show = function(element) {
  element.style.display = "inline-block";
  return element;
};

Construct.HTML.Hide = function(element) {
  element.style.display = "none";
  return element;
};

Construct.HTML.CreateElement = function(params) {
  if (params.Tag == undefined || params.Parent == undefined) {
    Construct.Errors.Send(Construct.Errors.MissingParameters, `The "Tag" and/or "Parent" values in the supplied object "params" (first parameter) is/are missing.`);
    return Construct.Errors.MissingParameters;
  }
  var NewDOMElement = document.createElement(params.Tag);
  if (params.Id) NewDOMElement.id = params.Id;
  if (params.ClassName) NewDOMElement.className = params.ClassName;
  if (params.InlineCSS) NewDOMElement.setAttribute("style", params.InlineCSS);
  if (params.Width) NewDOMElement.style.width = params.Width;
  if (params.Height) NewDOMElement.style.width = params.Height;
  if (params.AccessKey) NewDOMElement.accessKey = params.AccessKey;
  if (params.Lang) NewDOMElement.lang = params.Lang;
  if (params.ContentEditable) NewDOMElement.ContentEditable = true;
  if (params.TabIndex) NewDOMElement.tabIndex = params.TabIndex;
  if (params.InnerHTML) NewDOMElement.innerHTML = params.InnerHTML;
  var theParent = params.Parent;
  theParent.appendChild(NewDOMElement);

  return NewDOMElement;
};
Construct.HTML.Create = Construct.HTML.CreateElement;

Construct.HTML.SetCSS = function(element, property, css) {
  if (element == null) {
    Construct.Errors.Send(Construct.Errors.UnexistentElement);
    return Construct.Errors.UnexistentElement;
  }

  if (Array.isArray(property) == true) {
    for (let i = 0; i < property.length; i++) {
      element.style.setProperty(property[i].Property, property[i].Value);
    }
  } else {
    element.style.setProperty(property, css);
  }

  return [element, property, css];
};
Construct.HTML.CSS = Construct.HTML.SetCSS;

Construct.HTML.WriteScript = function(id, script) {
  var NewDOMElement = document.createElement("script");
  NewDOMElement.id = id;
  NewDOMElement.type = `text/javascript`;
  NewDOMElement.innerHTML = script;

  document.body.appendChild(NewDOMElement);
};
Construct.HTML.Script = Construct.HTML.WriteScript;

Construct.HTML.WriteStylesheet = function(id, stylesheet) {
  var NewDOMElement = document.createElement("style");
  NewDOMElement.id = id;
  NewDOMElement.rel = `stylesheet`;
  NewDOMElement.innerHTML = stylesheet;

  document.body.appendChild(NewDOMElement);
};

Construct.HTML.Evaluate = function(eval) {
  var NewDOMElement = document.createElement("script");
  NewDOMElement.id = `constructEvaluator`;
  NewDOMElement.type = `text/javascript`;
  NewDOMElement.innerHTML = eval + `\n\ndocument.getElementById("constructEvaluator").remove();`;

  document.body.appendChild(NewDOMElement);
};
Construct.HTML.Eval = Construct.HTML.Eval;

Construct.HTML.SetAttribute = function(element, name, value) {
  element.setAttribute(name, value);
  return element;
};
Construct.HTML.SetAttr = Construct.HTML.SetAttribute;

Construct.HTML.RemoveAttribute = function(element, name) {
  element.removeAttribute(name);
  return element;
};
Construct.HTML.DelAttr = Construct.HTML.RemoveAttribute;

Construct.HTML.Group = function(elements, name) {
  var elements = Construct.HTML.Select("QuerySelectorAll", `[ConstructGroup="${name}"`);

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] == null) {
      Construct.Errors.Send(Construct.Errors.UnexistentElement);
      return Construct.Errors.UnexistentElement;
    }
    elements[i].setAttribute("ConstructGroup", name);
  }
  return name;
};
Construct.HTML.Gr = Construct.HTML.Group;

Construct.HTML.GroupExists = function(name) {
  var elements = Construct.HTML.Select("QuerySelectorAll", `[ConstructGroup="${name}"]`);
  if (elements.length != 0) {
    return true;
  }
  return false;
};
Construct.HTML.isGr = Construct.HTML.GroupExists;

Construct.HTML.GroupDo = function(name, func) {
  var elements = Construct.HTML.Select("QuerySelectorAll", `[ConstructGroup="${name}"]`);
  var exists = Construct.HTML.GroupExists(name);

  if (exists == false) {
    Construct.Errors.Send(Construct.Errors.UnexistentGroup, `The provided group does not exist.`);
    return Construct.Errors.UnexistentGroup;
  }

  var functionValue = undefined;
  for (let i = 0; i < elements.length; i++) {
    functionValue = func(elements[i]);
  }

  return functionValue;
};
Construct.HTML.GrDo = Construct.HTML.GroupDo;

Construct.HTML.DeleteGroup = function(name, deleteElements) {
  var elements = Construct.HTML.Select("QuerySelectorAll", `[ConstructGroup="${name}"`);
  var exists = Construct.HTML.GroupExists(name);

  if (exists == false) {
    Construct.Errors.Send(Construct.Errors.UnexistentGroup, `The provided group does not exist.`);
    return Construct.Errors.UnexistentGroup;
  }

  for (let i = 0; i < elements.length; i++) {
    elements[i].removeAttribute("ConstructGroup");
    if (deleteElements == true) {
      elements[i].remove();
    }
  }
};
Construct.HTML.DelGr = Construct.HTML.DeleteGroup;

// Initialize the 'Audio' module.

Construct.Audio.Load = function(name, src, type) {
  if (src == undefined) {
    Construct.Errors.Send(Construct.Errors.MissingParameters);
    return Construct.Errors.MissingParameters;
  }
  if (type == undefined) {
    Construct.Errors.Send(Construct.Errors.MissingParameters);
    return Construct.Errors.MissingParameters;
  }

  var NewDOMElement = document.createElement("audio");
  NewDOMElement.setAttribute(`ConstructAudio`, name);

  if (src != undefined && type == undefined) {
    for (let i = 0; i < src.length ; i++) {
      var NewDOMElement2 = document.createElement("source");
      NewDOMElement2.src = src[i].src;
      NewDOMElement2.type = src[i].type;
      NewDOMElement.appendChild(NewDOMElement2);
    }
  } else {
    var NewDOMElement2 = document.createElement("source");
    NewDOMElement2.src = src;
    if (/(mp3|mpeg)/gi.test(type) == true) {
      NewDOMElement2.type = "audio/mpeg";
    } else if (/mp4/gi.test(type) == true) {
      NewDOMElement2.type = "";
    } else if (/ogg/gi.test(type) == true) {
      NewDOMElement2.type = "audio/ogg";
    } else if (/wav/gi.test(type) == true) {
      NewDOMElement2.type = "audio/wav";
    } else {
      NewDOMElement2.type = type;
    }
    NewDOMElement.appendChild(NewDOMElement2);
  }

  document.body.appendChild(NewDOMElement);
}

Construct.Audio.Play = function(name, timeout) {
  if (name == undefined) {
    Construct.Errors.Send(Construct.Errors.MissingParameters, `"name" (1st parameter) must be provided.`);
    return Construct.Errors.MissingParameters;
  }

  var audio = document.querySelector(`[ConstructAudio="${name}"]`);

  if (audio == null) {
    Construct.Errors.Send(Construct.Errors.InvalidParameters, `"name" (1st parameter) has been provided an audio name which does not exist.`);
    return Construct.Errors.InvalidParameters;
  }

  if (timeout != undefined) {
    if (Construct.Toolkit.Validate("FiniteNumber", timeout) == false) {
      Construct.Errors.Send(Construct.Errors.InvalidNumber, `"timeout" (2nd parameter) has been provided but contains an invalid number in milliseconds.`);
    }
    setTimeout(function() {
      audio.play();
    }, timeout);
  } else {
    audio.play();
  }
}

Construct.Audio.Pause = function(name, timeout) {
  if (name == undefined) {
    Construct.Errors.Send(Construct.Errors.MissingParameters, `"name" (1st parameter) must be provided.`);
    return Construct.Errors.MissingParameters;
  }

  var audio = document.querySelector(`[ConstructAudio="${name}"]`);

  if (audio == null) {
    Construct.Errors.Send(Construct.Errors.InvalidParameters, `"name" (1st parameter) has been provided an audio name which does not exist.`);
    return Construct.Errors.InvalidParameters;
  }

  if (timeout != undefined) {
    if (Construct.Toolkit.Validate("FiniteNumber", timeout) == false) {
      Construct.Errors.Send(Construct.Errors.InvalidNumber, `"timeout" (2nd parameter) has been provided but contains an invalid number in milliseconds.`);
    }
    setTimeout(function() {
      audio.pause();
    }, timeout);
  } else {
    audio.pause();
  }
}

Construct.Audio.Remove = function(name) {
  if (name == undefined) {
    Construct.Errors.Send(Construct.Errors.MissingParameters, `"name" (1st parameter) must be provided.`);
    return Construct.Errors.MissingParameters;
  }

  var audio = document.querySelector(`[ConstructAudio="${name}"]`);

  audio.remove();
}

// Initialize the 'Blendscript' module.

Construct.Blendscript.Remaker = function(params) {
  var query = params.Query;
  const has_$REMAKE = (query.search(/\$REMAKE/gi) != -1);
  const has_$CREATE_HEAD = (query.search(/\$CREATE Head/gi) != -1);
  const has_$CREATE_TITLE = (query.search(/\$CREATE Title/gi) != -1);
  const has_$CREATE_BODY = (query.search(/\$CREATE Body/gi) != -1);
  const has_$CREATE_CONTENT = (query.search(/\$CREATE Content/gi) != -1);
  var doc = document.documentElement;

  if (has_$REMAKE) {
    doc.innerHTML = `\n`;
  }
  if (has_$CREATE_HEAD) {
    doc.innerHTML += `<head></head>\n`;
  }
  if (has_$CREATE_TITLE && has_$CREATE_HEAD) {
    var NewDOMElement = document.createElement("title");
    NewDOMElement.innerHTML = params.Title;
    document.head.appendChild(NewDOMElement);
  }
  if (has_$CREATE_BODY) {
    doc.innerHTML += `<body></body>\n`;
  }
  if (has_$CREATE_CONTENT) {
    doc.innerHTML += params.Content || ``;
  }

  return document.documentElement;
};

// Initialize extensions.

Construct.Extensions.Install = function(id, src, anonymous, buildblendAttr) {
  var NewDOMElement = document.createElement("script");
  NewDOMElement.id = id;
  NewDOMElement.src = src;
  if (anonymous == true) {
    NewDOMElement.crossOrigin = "anonymous";
  }
  if (buildblendAttr == true) {
    NewDOMElement.setAttribute("Buildblend", "Extension");
  }
  document.body.appendChild(NewDOMElement);
};
Construct.Extensions.Add = Construct.Extensions.Install;