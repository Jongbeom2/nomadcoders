const USER_LS = "currentUser";
const SHOWING_CN = "showing";

const form = document.querySelector(".js-form");
const content = document.querySelector(".content");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

// save name in local storage
function saveName(text){
  localStorage.setItem(USER_LS,text);
}
// paint name in widget and save name in local storage
function handleSubmit(e){
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
// show form widget
function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit",handleSubmit);
}
// hide form widget and show content widget
function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  content.classList.add(SHOWING_CN);
  greeting.innerText = `안녕하세요 ${text}님`;
}
// load name or ask name
function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  currentUser === null
  ? askForName()
  : paintGreeting(currentUser);
}
// init
function init(){
  loadName();
}
init();