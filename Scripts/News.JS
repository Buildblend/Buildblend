function LoadNews() {
  document.querySelector(`#Revolving_Technology_News`).innerHTML = `<h3>Around The Network</h3>`;
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Parser = new DOMParser();
      XMLDoc = Parser.parseFromString(this.response, `text/xml`);
      for (let i = 0; i < XMLDoc.getElementsByTagName("Description").length; i++) {
        var Timestamp = XMLDoc.getElementsByTagName("Timestamp")[i].childNodes[0].nodeValue;
        var Description = XMLDoc.getElementsByTagName("Description")[i].childNodes[0].nodeValue;
        var TimestampDate = new Date(Timestamp);
        var Meridiem = `AM`;
        function PadTime(Time) {
          if (Time <= 10) {
            return `0${Time}`;
          } else {
            return Time;
          }
        }
        function H12Format(Time) {
          if (Time > 12) {
            Meridiem = `PM`
            return Time - 12;
          } else {
            Meridiem = `AM`
            return Time;
          }
        }
        var Months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
        var TimestampString = ``;
        TimestampString += `${PadTime(H12Format(TimestampDate.getHours()))}:`;
        TimestampString += `${PadTime(TimestampDate.getMinutes())} ${Meridiem}, `;
        TimestampString += `${TimestampDate.getDate()} `;
        TimestampString += `${Months[TimestampDate.getMonth()]} `;
        TimestampString += `${TimestampDate.getFullYear()} `;
        document.querySelector(`#Revolving_Technology_News`).innerHTML += `<b>${TimestampString}</b> ${Description}\n<br>`;
      }
    }
  };
  XHR.open(`GET`, `Media/News.XML`, true);
  XHR.send();
}

LoadNews();
setInterval(LoadNews, 5000);
