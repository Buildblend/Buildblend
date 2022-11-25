var Learner = {
  HTML: document.getElementById(`learner`),
  ContentHTML: document.getElementById(`learnerContent`),
  IntroHTML: document.getElementById(`learnerIntro`),
  Link: `/learner.html`,
  Page: 0,
  Course: 0,
  CourseName: `HTML`,
}

Learner.CourseList = {
  BaseURL: `${window.location.protocol}//${document.domain}${getPort()}/Courses/${Learner.CourseName}`,
  HTML: {
    Name: "HTML",
    FullName: "Hyper Text Markup Language",
    Id: 0,
    Content: {}
  },
  CSS: {
    Name: "CSS",
    FullName: "Cascading Style Sheets",
    Id: 1,
    Content: {}
  },
  JS: {
    Name: "JS",
    FullName: "JavaScript",
    Id: 2,
    Content: {}
  }
}

Learner.Courses = {
  0: Learner.CourseList.HTML,
  1: Learner.CourseList.CSS,
  2: Learner.CourseList.JS
}

function createScriptLoader(src) {
  for (let i = 0; i < src.length; i++) {
    var NewDOMElement = document.createElement("script");
    NewDOMElement.src = src[i];
    document.body.appendChild(NewDOMElement);
  }
}

function getXHR(src, func) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      func(this.responseText);
    }
  };
  xhttp.open("GET", src, true);
  xhttp.send();
}

function openLearner() {
  open(Learner.Link, `_blank`);
}

function nextPage(direction) {
  Learner.Page = Learner.Page + 1;
  var Course;
  if (Learner.Course == 0) Course = Learner.HTML;
  if (Learner.Course == 1) Course = Learner.CSS;
  if (Learner.Course == 2) Course = Learner.JS;
  getXHR(`${Learner.CourseList.BaseURL}/Page${Learner.Page}.html`, (xhr) => {
    Learner.ContentHTML.innerHTML = xhr;
  });
}

function switchChapter(direction) {
  
}

function switchCourse(direction) {

}

function openNewcomerIntro() {

}

function getPort() {
  if (window.location.port == '' || window.location.port == 80 || window.location.port == 443) {
    return ``;
  } else {
    return `:${window.location.port}`;
  }
}

const localStorage_isNewcomer = localStorage.getItem(`isNewcomer`);

if (localStorage_isNewcomer == null) {
  localStorage.setItem(`isNewcomer`, false);
  openNewcomerIntro();
}