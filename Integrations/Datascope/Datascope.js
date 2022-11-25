var Datascope = {
  Errors: {},
  Configuration: {},
  XHR: {},
  JSON: {},
  Presets: {}
};

// Create aliases or alternative declarations of Datascope.

var ds = Datascope;
var Ds = Datascope;
var DS = Datascope;
var dS = Datascope;

// Create aliases or alternative declarations of Datascope's modules.

Datascope.Errs = Datascope.Errors;
Datascope.Config = Datascope.Configuration;
Datascope.Cogs = Datascope.Configuration;
Datascope.XML = Datascope.XHR;
Datascope.XHTTP = Datascope.XHR;
Datascope.Pre = Datascope.Presets;

// Set up the basic structure of Datascope.

Datascope.Datascope = "Buildblend Datascope.js!";
Datascope.Version = "0.8.0";

Datascope.Errors = {
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
    Name: "Datascope Disabled",
    Message: "Datascope is disabled on this site.",
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
  InvalidCategory: {
    Time: new Date(-1),
    Type: "CategoryError",
    Name: "Invalid Category",
    Message: "An invalid category was provided.",
    Code: 6
  }
};

Datascope.Configuration.Enabled = true;
Datascope.Configuration.CollapsedErrorGroups = false;

Datascope.Authenticate = function() {
  if (Datascope.Configuration.Enabled == false) {
    return 1;
  }
  if (window.location.search == `?DatascopeActivation=false`) {
    return 1;
  }

  return 0;
}

Datascope.Errors.Count = 0;
Datascope.Errors.LastError = Datascope.Errors.NoError;
Datascope.Errors.Send = function(error, details) {
  var errorInitialMessage = `${Datascope.Datascope} ${Datascope.Version} encountered an error.`;
  var errorInitialMessageCSS = `color: #D63227; font-family: monospace; font-size: 24px;`;
  var errorMessageCSS = `font-family: monospace; font-size: 16px;`;
  var errorMessageCSS1 = `color: #D63227;`;
  var errorMessageCSS2 = `color: #E04136;`;
  var errorMessageCSS3 = `color: #E85b51;`;
  var errorMessageCSS4 = `color: #EB6960;`;
  var errorMessageCSS5 = `color: #F07D75;`;
  var errorOccurenceTime = new Date();

  if (Datascope.Configuration.CollapsedErrorGroups) {
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
  Datascope.Errors.LastError.Time = errorOccurenceTime;
  Datascope.Errors.LastError.Type = error.Type;
  Datascope.Errors.LastError.Name = error.Name;
  Datascope.Errors.LastError.Message = error.Message;
  Datascope.Errors.LastError.Code = error.Code;
  Datascope.Errors.Count++;

  return error;
};

// Initiate the creation of the 'XHR' module.

Datascope.XHR.Get = function(file, onreadystate, async) {
  var xhttp = new XMLHttpRequest();
  var returnVal = undefined;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      returnVal = onreadystate();
    }
  };
  xhttp.open("GET", file, async || true);
  xhttp.send();

  return {
    Return: returnVal,
    ResponseText: xhttp.responseText,
    ResponseXML: xhttp.responseXML,
    Status: xhttp.status,
    StatusText: xhttp.statusText,
    File: file,
    Asynchronous: async || true,
    Async: async || true,
    Type: "GET"
  };
};
Datascope.XHR.GET = Datascope.XHR.Get;

Datascope.XHR.Post = function(file, data, requestHeader, onreadystate, async) {
  var xhttp = new XMLHttpRequest();
  var returnVal = undefined;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      returnVal = onreadystate();
    }
  };
  xhttp.open("POST", file, async || true);
  if (requestHeader == undefined) {
    xhttp.setRequestHeader(requestHeader.Header, requestHeader.Content);
  }
  xhttp.send(data);

  return {
    Return: returnVal,
    ResponseText: xhttp.responseText,
    ResponseXML: xhttp.responseXML,
    Status: xhttp.status,
    StatusText: xhttp.statusText,
    File: file,
    Asynchronous: async || true,
    Async: async || true,
    Type: "POST"
  };
};

// Initiate the creation of the'JSON' module.

Datascope.JSON.Get = function(file, onload) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    onload();
  };
  xhttp.open("GET", file);
  xhttp.send();

  return {
    Return: returnVal,
    ResponseText: xhttp.responseText,
    ResponseXML: xhttp.responseXML,
    Status: xhttp.status,
    StatusText: xhttp.statusText,
    File: file,
    Type: "POST"
  };
}

// Initiate the creation of the 'Presets' module.

Datascope.Presets.Read = function(category, query) {
  var cg;
  if (category.match(/(Animals)/gim) == true) {
    cg = Datascope.Presets.Categories.Animals;
    if (query != undefined) {
      return cg[cg.indexOf(query)];
    } else {
      return cg;
    }
  } else if (category.match(/(Cars)/gim) == true) {
    cg = Datascope.Presets.Categories.Cars;
    if (query != undefined) {
      return cg[cg.indexOf(query)];
    } else {
      return cg;
    }
  } else if (category.match(/(Vehicles)/gim) == true) {
    cg = Datascope.Presets.Categories.Vehicles;
    if (query != undefined) {
      return cg[cg.indexOf(query)];
    } else {
      return cg;
    }
  } else {
    return Construct.Errors.Send(Construct.Errors.InvalidCategory);
  }
};

Datascope.Presets.Write = function(category, items) {
  if (/Animals/gim.test(category) == true) {
    Datascope.Presets.Categories.Animals.push(items);
    return items;
  } else if (/Cars/gim.test(category) == true) {
    Datascope.Presets.Categories.Cars.push(items);
    return items;
  } else if (/Vehicles/gim.test(category) == true) {
    Datascope.Presets.Categories.Vehicles.push(items);
    return items;
  } else {
    return Datascope.Errors.Send(Datascope.Errors.InvalidCategory);
  }
};

Datascope.Presets.Categories = {
  Animals: [
    {
      Name: `Cat`, Plural: `Cats`, Infant: `Kitten`, Plural_Infant: `Kittens`
    },
    {
      Name: `Dog`, Plural: `Dogs`, Infant: `Puppy`, Plural_Infant: `Puppies`
    },
    {
      Name: `Lion`, Plural: `Lions`, Infant: `Cub`, Plural_Infant: `Cubs`
    },
    {
      Name: `Tiger`, Plural: `Tigers`, Infant: `Cub`, Plural_Infant: `Cubs`
    }
  ],
  Cars: [
    {
      Name: `Audi`
    },
    {
      Name: `BMW`
    },
    {
      Name: `Ferrari`
    },
    {
      Name: `Ford`
    },
    {
      Name: `Honda`
    },
    {
      Name: `Hyundai`
    },
    {
      Name: `Jaguar`
    },
    {
      Name: `Kia`
    },
    {
      Name: `Lamborghini`
    },
    {
      Name: `Mahindra`
    },
    {
      Name: `Maruti Suzuki`
    },
    {
      Name: `Mercedes`
    },
    {
      Name: `Mercedes-Benz`
    },
    {
      Name: `Nissan`
    },
    {
      Name: `Polaris`
    },
    {
      Name: `Renault`
    },
    {
      Name: `Tata`
    },
    {
      Name: `Tesla`
    },
    {
      Name: `Toyota`
    },
    {
      Name: `Volkswagen`
    },
    {
      Name: `Volvo`
    }
  ],
  Vehicles: [
    {
      Name: 'Airplane', Plural: `Airplanes`, Name_UK: `Aeroplane`, Plural_UK: `Aeroplane`
    },
    {
      Name: `Car`, Plural: `Cars`
    },
    {
      Name: `Motorcycle`, Plural: `Motorcycles`, Name_UK: `Motorbike`, Plural_UK: `Motorbikes`
    },
    {
      Name: `Seaboat`, Plural: `Seaboats`
    },
    {
      Name: `Ship`, Plural: `Ships`
    },
    {
      Name: `Train`, Plural: `Trains`
    },
    {
      Name: `Truck`, Plural: `Trucks`
    },
  ]
}