/*

  Installer for all of Buildblend's web integrations!

*/

var BuildblendInstaller = {
  Buildblend: `Buildblend!`,
  BuildblendInstaller: `Buildblend Installer!`,
  URI: `https://buildblend.cf/Integrations/`
};

BuildblendInstaller.Integrations = [
  {
    Name: `ConstructJS`,
    Latest: `1.0.0`,
    Base: `${BuildblendInstaller.URI}ConstructJS/ConstructJS`
  },
  {
    Name: `Bind`,
    Latest: `1.0.0`,
    Base: `${BuildblendInstaller.URI}Bind/Bind`
  }
];

var bins = BuildblendInstaller;
var Bins = BuildblendInstaller;
var BINS = BuildblendInstaller;

BuildblendInstaller.Install = function(name, version, min) {
  if (name == undefined) {
    console.error(`While the client attempted to use \"BuildblendInstaller.Install()\", \"name\" (first parameter) was empty.`);
    return 'EMPTY_NAME'
  }
  var hasMatched;
  if (Array.isArray(name) == true) {
    for (let i = 0; i < BuildblendInstaller.Integrations.length; i++) {
      if (name.includes(BuildblendInstaller.Integrations[i].Name) == true) {
        hasMatched = true;
      } else {
        continue;
      }
      var v = version;
      if (v == "latest" || v == undefined) {
        v = BuildblendInstaller.Integrations[i].Latest;
      }
      if (min == true) {
        v += `.min`;
      }
      var NewDOMElement = document.createElement(`script`);
      NewDOMElement.id = `buildblend` + BuildblendInstaller.Integrations[i].Name;
      NewDOMElement.className = `buildblendIntegrationScripts`;
      NewDOMElement.src = BuildblendInstaller.Integrations[i].Base + `.${v}.js`;
      NewDOMElement.type = `text/javascript`;
      var NewDOMComment = document.createComment(`Buildblend Integration!`);
      NewDOMElement.appendChild(NewDOMComment);
      document.body.appendChild(NewDOMElement);
    }
  } else {
    for (let i = 0; i < BuildblendInstaller.Integrations.length; i++) {
      if (name == BuildblendInstaller.Integrations[i].Name) {
        hasMatched = true;
      } else {
        continue;
      }
      var v = version;
      if (v == "latest" || v == undefined) {
        v = BuildblendInstaller.Integrations[i].Latest;
      }
      if (min == true) {
        v += `.min`;
      }
      var NewDOMElement = document.createElement(`script`);
      NewDOMElement.id = `buildblend` + BuildblendInstaller.Integrations[i].Name;
      NewDOMElement.className = `buildblendIntegrationScripts`;
      NewDOMElement.src = BuildblendInstaller.Integrations[i].Base + `.${v}.js`;
      NewDOMElement.type = `text/javascript`;
      var NewDOMComment = document.createComment(`Buildblend Integration!`);
      NewDOMElement.appendChild(NewDOMComment);
      document.body.appendChild(NewDOMElement);
    }
  }
};
BuildblendInstaller.Ins = BuildblendInstaller.Install;