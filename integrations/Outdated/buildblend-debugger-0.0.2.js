buildblend.debugPkg.html.createElement = function() {
  buildblend.authenticate();
  const newDOMElement = document.createElement("div");
  newDOMElement.innerHTML = "<p>debuggerPkg: html.createElement</p>";
  newDOMElement.classList.add("buildblendDebuggerItem");
  newDOMElement.classList.add("buildblendDebugPkg_HTML_CREATEELEMENT");
  newDOMElement.setAttribute("style", "background-color: black; color: white; font-size: 16px;");
  document.getElementById("buildblendDebugger").appendChild(newDOMElement);
}