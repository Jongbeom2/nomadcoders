const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("span");

// get time
function getTime(){
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerHTML = `${hours<10 ? `0${hours}` : hours}
  :${minutes<10?`0${minutes}`:minutes}
  :${seconds < 10 ? `0${seconds}`:seconds}`;
}
// init
function init(){
  getTime();
  setInterval(getTime, 1000);
}
init();