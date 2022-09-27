buildblend.extensions.debugger = new BuildblendExtension(false, "Debugger", "0.0.2");
buildblend.extensions.debugger.lastERRData = null;
buildblend.extensions.debugger.extensionInit = function(enabled) {
  if (enabled == true) {
    buildblend.extensions.debugger.enabled = true;
  } else {
    buildblend.extensions.debugger.enabled = false;
  }

  console.log("%c Buildblend's official Debugger has been successfully initialized, running on its version " + buildblend.extensions.debugger.extensionVersion + ".", "color: purple; font-size: 16px;");
};

buildblend.extensions.debugger.tryThis = function(func) {
  var funcReturnVal = "No return value was retrieved.";
  try {
    var funcStartTime = new Date();
    funcReturnVal = func();
    console.log("%c This function executed without errors. Return value was: " + funcReturnVal + ". Details are provided below.", "color: green; font-size: 16px;");
    var funcEndTime = new Date();
    buildblend.extensions.debugger.lastERRData = [
      {
        Name: "Success",
        Value: "No errors found while executing this function."
      },
      {
        Name: "Function Anatomy",
        Value: func
      },
      {
        Name: "Function Constructor",
        Value: func.constructor
      },
      {
        Name: "Function Return Value",
        Value: funcReturnVal
      },
      {
        Name: "Started at",
        Value: funcStartTime
      },
      {
        Name: "Ended at",
        Value: funcEndTime
      },
      {
        Name: "Duration",
        Value: funcEndTime.getTime() - funcStartTime.getTime() + " millisecond(s)"
      }
    ]
    console.table(buildblend.extensions.debugger.lastERRData);
  } catch(err) {
    var funcEndTime = new Date();
    console.error("%c An error was obtained from running this function. Details are provided below.", "color: pink; font-size: 16px;");
    buildblend.extensions.debugger.lastERRData = [
      {
        Name: err.name,
        Value: err.message
      },
      {
        Name: "Function Anatomy",
        Value: func
      },
      {
        Name: "Function Constructor",
        Value: func.constructor
      },
      {
        Name: "Function Return Value",
        Value: funcReturnVal
      },
      {
        Name: "Started at",
        Value: funcStartTime
      },
      {
        Name: "Ended at",
        Value: funcEndTime
      },
      {
        Name: "Duration",
        Value: funcEndTime.getTime() - funcStartTime.getTime() + " milliseconds"
      }
    ];
    console.table(buildblend.extensions.debugger.lastERRData);
  }
}