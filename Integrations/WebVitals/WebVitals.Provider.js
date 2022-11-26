/*

  Provider for WebVitals.

*/

var WebVitalsProvider = {
  AvailableVersions: [`0.0.0`],
};

WebVitalsProvider.Latest = WebVitalsProvider.AvailableVersions[0];

WebVitalsProvider.Install = (Version, Minifed) => {
  if (typeof WebVitals != 'undefined') return 'ALREADY_INSTALLED';

  var availVersions = WebVitalsProvider.AvailableVersions;

  var hasFound = false;
  for (let i = 0; i < availVersions.length; i++) {
    if (Version == `latest`) {
      Version = WebVitalsProvider.Latest;
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
  var filename = `WebVitals.${Version}${minified}.js`;

  var NewDOMElement = document.createElement("script");
  NewDOMElement.id = `webvitals_script`;
  NewDOMElement.className = `buildblendScripts`;
  NewDOMElement.src = filename;
  NewDOMElement.type = `text/javascript`;
  var NewDOMComment = document.createComment(`Buildblend WebVitals ${Version}!`);
  NewDOMElement.appendChild(NewDOMComment);
  document.body.appendChild(NewDOMElement);

  WebVitalsProvider.AttachProvider(filename);

  return 1;
};

WebVitalsProvider.AttachProvider = (Filename) => {
  var xDone = false;
  var x = setInterval(function() {
    if (typeof WebVitals != 'undefined') {
      WebVitals.Provider = {
        Name: 'Official Buildblend WebVitals Provider',
        Shortname: 'WebVitals Provider',
        Authors: ['Buildblend'],
        Request: Filename,
        RequestTime: new Date()
      };
      xDone = true;
      clearInterval(x);
    }
  }, 1);
}; 