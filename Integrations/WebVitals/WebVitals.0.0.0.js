/*

  Buildblend WebVitals, WebVitals Project 0.0.0

*/

// Initiate WebVitals.

var WebVitals = {
  Buildblend: `Buildblend`,
  WebVitals: `Buildblend WebVitals`,
  Version: `0.0.0`,

  Configuration: {},
  Errors: {},
  Experimental: {}
};

// Create aliases for WebVitals.

var WV = WebVitals;
var wV = WebVitals;
var Wv = WebVitals;
var wv = WebVitals;

// Initiate Configuration in WebVitals.

WebVitals.Configuration = {
  Enabled: true,
  CollapsedErrorGroups: false,
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

// Initiate Errors in WebVitals.

WebVitals.Errors = {
  Occured: false,
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
    Message: `WebVitals is disabled on this client.`,
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
  }
};

WebVitals.Errors.Send = (Error, Details) => {
  var Time = new Date();
  WebVitals.Errors.Occured = true;

  if (WebVitals.Configuration.CollapsedErrorGroups == true) {
    console.groupCollapsed(`%c[Error ${Error.Code}] WebVitals occured an error.`, WebVitals.Configuration.ErrorCSS.Heading);
  } else {
    console.group(`%c[Error Code: ${Error.Code}] WebVitals occured an error.`, WebVitals.Configuration.ErrorCSS.Heading);
  }

  console.log(`%cTime: ${Time}`, WebVitals.Configuration.ErrorCSS.Text1);
  console.log(`%cError Name: ${Error.Name} (Type: ${Error.Type})`, WebVitals.Configuration.ErrorCSS.Text2);
  console.log(`%cError Message: ${Error.Message}`, WebVitals.Configuration.ErrorCSS.Text3);
  console.log(`%cError Code: ${Error.Code}`, WebVitals.Configuration.ErrorCSS.Text4);
  if (Details != undefined) {
    console.log(`%cAdditional Details: `, WebVitals.Configuration.ErrorCSS.DetailsHeading);
    console.log(`%c` + Details, WebVitals.Configuration.ErrorCSS.Details);
  } else {
    console.log(`%cNo additional details were provided.`, WebVitals.Configuration.ErrorCSS.Details);
  }
  console.groupEnd();

  return Error;
};

WebVitals.Authenticate = () => {
  if (WebVitals.Configuration.Enabled != true) {
    WebVitals.Errors.Send(WebVitals.Errors.Disabled, `WebVitals will not allow the usage of JavaScript functions when it is disabled. For it to function, "WebVitals.Configuration.Enabled" must have its value set as true.`);
    return 1;
  } else {
    return 0;
  }
}

// Experimental Mode

WebVitals.Experimental = (Log) => {
  if (Log == false) return false;
  console.group(`Experimental is enabled!`);
  console.log(`WebVitals: *`);
  console.log(WebVitals);
  console.log(`Provider:`);
  console.log(WebVitals.Provider);
}