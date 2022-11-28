/*

  Provider for WebCore.

*/

var WebCoreProvider = {
  AvailableVersions: [`0.0.0`],
};

WebCoreProvider.Latest = WebCoreProvider.AvailableVersions[0];

WebCoreProvider.Install = (Version, Minifed) => {
  if (typeof WebCore != 'undefined') return 'ALREADY_INSTALLED';

  var availVersions = WebCoreProvider.AvailableVersions;

  var hasFound = false;
  for (let i = 0; i < availVersions.length; i++) {
    if (Version == `latest`) {
      Version = WebCoreProvider.Latest;
      hasFound = true;
    } else if (Version == availVersions[i]) {
      hasFound = true;
    }
  };
  if (hasFound == false) return `INVALID_VERSION`;

  var minified;
  if (Minifed == true) {
    minified = `.min`;
  } else {
    minified = ``;
  }
  var filename = `WebCore.${Version}${minified}.js`;

  var NewDOMElement = document.createElement("script");
  NewDOMElement.id = `WebCore_script`;
  NewDOMElement.className = `WebCore_Sources`;
  NewDOMElement.src = filename;
  NewDOMElement.type = `text/javascript`;
  var NewDOMComment = document.createComment(`Buildblend WebCore ${Version}!`);
  NewDOMElement.appendChild(NewDOMComment);
  document.body.appendChild(NewDOMElement);

  WebCoreProvider.AttachProvider(filename);

  return 1;
};

WebCoreProvider.AttachProvider = (Filename) => {
  var xDone = false;
  var x = setInterval(function() {
    if (typeof WebCore != 'undefined') {
      WebCore.Provider = {
        Name: 'Official Buildblend WebCore Provider',
        Shortname: 'WebCore Provider',
        Authors: ['Buildblend'],
        Request: Filename,
        RequestTime: new Date()
      };
      WebCore.InstallCSSFile();
      xDone = true;
      clearInterval(x);
    }
  }, 1);
}; 