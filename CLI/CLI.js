document.body.setAttribute(`style`, `

  background: #000000;
  color: #00FF00;
  font-size: 16px;
  text-shadow: 0px 0px 15px #00FF00;
  font-family: monospace;

`);

function ListenInput(PayloadIfYes, JavaScriptFunction, JavaScriptFunction2) {
  ListenerParameters = [PayloadIfYes, JavaScriptFunction, JavaScriptFunction2];
  document.addEventListener(`keydown`, Input1);
}

function Input1(Event) {
  if (Event.key == `y` || Event.key == `Y`) {
    document.body.innerHTML += `<span style="color: white;">Y</span><br>`;
    ListenerParameters[1](ListenerParameters[0]);
    document.removeEventListener(`keydown`, Input1);
  } else if (Event.key == `n` || Event.key == `N`) {
    document.body.innerHTML += `<span style="color: white;">N</span><br>`;
    ListenerParameters[1](``);
    document.removeEventListener(`keydown`, Input1);
  }
  console.log(Event);
}

if (location.search == `?open=WebInstance.bat`) {
  document.body.innerHTML += `<span class="Small">open</span> WebInstance.Installer.exe<br>`;
  document.body.innerHTML += `<span class="Small">echo</span> Printing information for installation of WebInstance on your site...<br>`;
  document.body.innerHTML += `<span class="Small">echo</span> Do you want a minified version? Please press "y" for yes or "n" for no.<br>`;
  document.body.innerHTML += `<span class="Small">set key /A</span> Press Y or N.</span> `;
  ListenInput(`.min`, function(Payload) {
    document.body.innerHTML += `<span class="Small">echo</span> <code>&lt;script src="WebInstance.v1.0.0<span style="color: white;">${Payload}</span>.js"&gt;&lt;/script&gt;</code><br>`;
    document.body.innerHTML += `<span class="Small">exit</span>`;
    Redye();
  });
} else {
  document.body.innerHTML += `<span style="color: red; text-shadow: 0px 0px 15px #FF0000;">Error: Please append a correct command to the link in order to continue.</span>`;
}

function Redye() {
  for (let i = 0; i < document.querySelectorAll(`.Small`).length; i++) {
    document.querySelectorAll(`.Small`)[i].style.opacity = 0.25;
  }
  for (let i = 0; i < document.querySelectorAll(`a`).length; i++) {
    document.querySelectorAll(`a`)[i].style.textDecoration = `none`;
    document.querySelectorAll(`a`)[i].style.textShadow = `0px 0px 15px #0000FF`;
  }
}

var NewDOMElement = document.createElement(`div`);
NewDOMElement.setAttribute(`style`, `

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5%;

`);

document.body.appendChild(NewDOMElement);

function FooterData() {
  NewDOMElement.innerHTML = `&nbsp;Rendered ${"<!DOCTYPE html>\n\n<html>".length + document.querySelector(`html`).innerHTML.length + "</html>\n".length + 2811 + 789} bytes of data.`;
}

setInterval(FooterData, 1000);
FooterData();
Redye();
