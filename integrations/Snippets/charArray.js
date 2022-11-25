let text = "HELLO WORLD";
var tS = text.split("");
for (let i = 0; i < tS.length; i++) {
  if (i == 0) {
    document.body.innerHTML += "[";
  }
	document.body.innerHTML += tS[i].charCodeAt(0) + ", ";
  if (i == tS.length) {
    document.body.innerHTML += tS[i].charCodeAt(0) + "]";
  }
}