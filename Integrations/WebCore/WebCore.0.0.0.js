/*

  Buildblend WebCore, WebCore Project 0.0.0

*/

// Initiate WebCore.

var WebCore = {
  Buildblend: `Buildblend`,
  WebCore: `Buildblend WebCore`,
  Version: `0.0.0`,
  Provider: undefined,
  Domain: `http://127.0.0.1:5500`,
  StylesheetLocation: `/Integrations/WebCore/WebCore.0.0.0.css`,

  Configuration: {},
  LogFile: {},
  Errors: {},
  Extensions: {}
};

WebCore.InstallCSSFile = function() {
  var NewDOMElement = document.createElement(`link`);
  NewDOMElement.id = `WebCore_Stylesheet`;
  NewDOMElement.className = `WebCore_Sources`;
  NewDOMElement.rel = `stylesheet`;
  NewDOMElement.href = `${WebCore.Domain}${WebCore.StylesheetLocation}`;
  NewDOMElement.type = `text/css`;

  document.head.prepend(NewDOMElement);
}

// Create aliases for WebCore.

var WC = WebCore;
var wC = WebCore;
var Wc = WebCore;
var wc = WebCore;

WebCore.Config = WebCore.Configuration;
WebCore.Log = WebCore.LogFile;
WebCore.Errs = WebCore.Errors;
WebCore.Exts = WebCore.Extensions;

// Initiate Configuration in WebCore.

WebCore.Configuration = {
  Enabled: true,
  CollapsedErrorGroups: false,
  Logging: true,
  ErrorCSS: {
    Heading: `color: tomato; font-family: monospace; font-size: 24px;`,
    Text: `font-family: monospace; font-size: 16px;`,
    Text1: `color: #802306; font-family: monospace; font-size: 16px;`,
    Text2: `color: #AB2E09; font-family: monospace; font-size: 16px;`,
    Text3: `color: #BF370D; font-family: monospace; font-size: 16px;`,
    Text4: `color: #C93E14; font-family: monospace; font-size: 16px;`,
    Text5: `color: #D1491F; font-family: monospace; font-size: 24px;`,
    DetailsHeading: `color: tomato; font-family: monospace; font-size: 24px;`,
    Details: `background-color: black; color: white; padding: 10px; font-family: monospace; font-size: 20px; border-radius: 10px;`
  }
};

// Initiate Logging in WebCore.

WebCore.LogFile = {
  Count: 0,
  Data: [],
  Append: (Data) => {
    if (WebCore.Configuration.Logging == false) return;
    WebCore.LogFile.Data.push(`${Data}`);
    WebCore.LogFile.Count++;
  },
  StringifyData: () => {
    var Data = {
      Data: ``,
      FormalData: ``,
      HTMLFormalData: ``
    };
    for (let i = 0; i < WebCore.LogFile.Data.length; i++) {
      Data.Data += `(${i}) ${WebCore.LogFile.Data[i]} `;
      Data.FormalData += `(${i}) ${WebCore.LogFile.Data[i]}\n`;
      Data.HTMLFormalData += `(${i}) ${WebCore.LogFile.Data[i]}<br>`;
    };
    return Data;
  }
};

// Initiate Errors in WebCore.

WebCore.Errors = {
  Occured: false,
  Count: 0,
  Unknown: {
    Name: `Unknown Error`,
    Type: `Unknown Type`,
    Message: `An unexpected unknown error occured.`,
    Code: 0,
    Time: new Date(-1)
  },
  None: {
    Name: `No Error`,
    Type: `Unknown Type`,
    Message: `The error is, that no error occured!`,
    Code: 1,
    Time: new Date(-1)
  },
  Disabled: {
    Name: `Disabled`,
    Type: `Disabled Error`,
    Message: `WebCore is disabled on this client.`,
    Code: 2,
    Time: new Date(-1)
  },
  InvalidNumber: {
    Name: `Invalid Number`,
    Type: `Parameter Error`,
    Message: `An invalid number was provided.`,
    Code: 3,
    Time: new Date(-1)
  },
  InvalidParameter: {
    Name: `Invalid Parameter`,
    Type: `Parameter Error`,
    Message: `An invalid parameter was provided.`,
    Code: 4,
    Time: new Date(-1)
  },
  InvalidElement: {
    Name: `Invalid Element`,
    Type: `DOM Error`,
    Message: `An invalid or non-existent element was provided.`,
    Code: 5,
    Time: new Date(-1)
  },
  MissingParameter: {
    Name: `Missing Parameter`,
    Type: `Parameter Error`,
    Message: `A parameter which is required was missing or undefined.`,
    Code: 6,
    Time: new Date(-1)
  }
};



WebCore.Errors.Send = (Error, Details) => {
  var Time = new Date();
  WebCore.Errors.Occured = true;
  WebCore.Errors.Count++;

  if (WebCore.Configuration.CollapsedErrorGroups == true) {
    console.groupCollapsed(`%c[Error ${Error.Code}] WebCore occured an error.`, WebCore.Configuration.ErrorCSS.Heading);
  } else {
    console.group(`%c[Error Code: ${Error.Code}] WebCore occured an error.`, WebCore.Configuration.ErrorCSS.Heading);
  };

  console.log(`%cTime: ${Time}`, WebCore.Configuration.ErrorCSS.Text1);
  console.log(`%cError Name: ${Error.Name} (Type: ${Error.Type})`, WebCore.Configuration.ErrorCSS.Text2);
  console.log(`%cError Message: ${Error.Message}`, WebCore.Configuration.ErrorCSS.Text3);
  console.log(`%cError Code: ${Error.Code}`, WebCore.Configuration.ErrorCSS.Text4);
  if (Details != undefined) {
    console.log(`%cAdditional Details: `, WebCore.Configuration.ErrorCSS.DetailsHeading);
    console.log(`%c` + Details, WebCore.Configuration.ErrorCSS.Details);
  } else {
    console.log(`%cNo additional details were provided.`, WebCore.Configuration.ErrorCSS.Details);
  };
  console.groupEnd();

  Error.Time = Time;
  WebCore.LogFile.Append(`[ERROR] An error occured on the client: Error Code ${Error.Code}.`);
  return Error;
};

// Initiate Authentication in WebCore.

WebCore.Authenticate = (Command = `Unknown Command`) => {
  if (WebCore.Configuration.Enabled != true) {
    WebCore.Errors.Send(WebCore.Errors.Disabled, `WebCore will not allow the usage of JavaScript functions when it is disabled. For it to function, "WebCore.Configuration.Enabled" must have its value set as true.`);
    WebCore.LogFile.Append(`[AUTH] Command cancelled as WebCore is disabled on the client: ${Command}`);
    return 1;
  } else if (window.location.search == `?WebCore=false`) {
    WebCore.Configuration.Enabled = false;
    WebCore.Errors.Send(WebCore.Errors.Disabled, `WebCore will not allow the usage of JavaScript functions when it is disabled. For it to function, "WebCore.Configuration.Enabled" must have its value set as true.`);
    WebCore.LogFile.Append(`[AUTH] Command cancelled as disabling location query matches on the client URL: ${Command}`);
    return 2;
  } else {
    return -1;
  };
}; WebCore.Auth = WebCore.Authenticate;

// Initiate Commands in WebCore.

WebCore.Select = (Query = `body`, Position = 0) => {
  var CmdName = `Select`; if (WebCore.Authenticate(CmdName) == 1 || WebCore.Authenticate(CmdName) == 2) return WebCore.Errors.Disabled;

  var Q = document.querySelectorAll(Query)[Position];
  if (Query != `body` && Q == null) {
    WebCore.Errors.Send(WebCore.Errors.InvalidElement, `"Query" (First Parameter) of "WebCore.Select()" contained an invalid element, an element which did not exist. The provided value was: ${Query}`);
    return null;
  };
  return Q;
}; WebCore.Sel = WebCore.Select;



WebCore.CreateElement = (Parent = `Default`, Tag, Attributes = [], InnerHTML = ``) => {
  var CmdName = `CreateElement`; if (WebCore.Authenticate(CmdName) == 1 || WebCore.Authenticate(CmdName) == 2) return WebCore.Errors.Disabled;

  if (Tag == undefined || Tag == `` || Tag == ` ` || Tag == null || Tag == NaN) {
    WebCore.Errors.Send(WebCore.Errors.MissingParameter, `"Tag" (Second Parameter) of "WebCore.CreateElement()" is undefined, null, NaN, or empty. The provided value was: ${Tag}`);
    return WebCore.Errors.MissingParameter;
  };
  var NewDOMElement = document.createElement(Tag);
  for (let i = 0; i < Attributes.length; i++) {
    NewDOMElement.setAttribute(Attributes[i].Name, Attributes[i].Value);
  };
  NewDOMElement.innerHTML = InnerHTML;
  if (Parent == `Default`) {
    document.body.appendChild(NewDOMElement);
  } else {
    if (Parent == null || Parent == undefined) {
      WebCore.Errors.Send(WebCore.Errors.InvalidElement, `"Parent" (First Parameter) of "WebCore.CreateElement()" contained an invalid element, an element which did not exist. The provided value was: ${Parent}`);
      return WebCore.Errors.InvalidElement;
    } else {
      Parent.appendChild(NewDOMElement);
    }
  }
  return NewDOMElement;
}; WebCore.CE = WebCore.CreateElement;



WebCore.InnerHTML = (Query, InnerHTML = ``) => {
  var CmdName = `InnerHTML`; if (WebCore.Authenticate(CmdName) == 1 || WebCore.Authenticate(CmdName) == 2) return WebCore.Errors.Disabled;

  var Q = Query;
  if (Q == null) {
    WebCore.Errors.Send(WebCore.Errors.InvalidElement, `"Query" (First Parameter) of "WebCore.InnerHTML()" contained an invalid element, an element which did not exist. The provided value was: ${Query}`);
    return WebCore.Errors.InvalidElement;
  };

  Q.innerHTML = InnerHTML;
  
}; WebCore.HTML = WebCore.InnerHTML; WebCore.HTM = WebCore.InnerHTML;



WebCore.CSS = (Query, CSS = ``) => {
  var CmdName = `CSS`; if (WebCore.Authenticate(CmdName) == 1 || WebCore.Authenticate(CmdName) == 2) return WebCore.Errors.Disabled;

  var Q = Query;
  if (Q == null) {
    WebCore.Errors.Send(WebCore.Errors.InvalidElement, `"Query" (First Parameter) of "WebCore.CSS()" contained an invalid element, an element which did not exist. The provided value was: ${Query}`);
    return WebCore.Errors.InvalidElement;
  };
  Q.setAttribute(`style`, CSS);
};



WebCore.SetAttribute = (Query, Name, Value = ``) => {
  var CmdName = `SetAttribute`; if (WebCore.Authenticate(CmdName) == 1 || WebCore.Authenticate(CmdName) == 2) return WebCore.Errors.Disabled;

  var Q = Query;
  if (Q == null) {
    WebCore.Errors.Send(WebCore.Errors.InvalidElement, `"Query" (First Parameter) of "WebCore.CSS()" contained an invalid element, an element which did not exist. The provided value was: ${Query}`);
    return WebCore.Errors.InvalidElement;
  };
  if (Name == undefined) {
    WebCore.Errors.Send(WebCore.Errors.MissingParameter, `"Name" (Second Parameter) of "WebCore.SetAttribute()" is missing, an attribute cannot be set without its name. The provided value was: ${Name}`);
    return WebCore.Errors.InvalidElement;
  };
  Q.setAttribute(Name, Value);
};

WebCore.Evaluate = (Script) => {
  var CmdName = `SetAttribute`; if (WebCore.Authenticate(CmdName) == 1 || WebCore.Authenticate(CmdName) == 2) return WebCore.Errors.Disabled;

  var NewDOMElement = document.createElement("script");
  NewDOMElement.id = "webcore_evaluator_machine";
  NewDOMElement.innerHTML = Script + `\ndocument.getElementById("webcore_evaluator_machine").remove()`;
  document.body.appendChild(NewDOMElement);

  return Script;
};