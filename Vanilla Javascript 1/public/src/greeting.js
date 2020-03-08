const form = document.querySelector(".js-form");
const content = document.querySelector(".content");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text){
  localStorage.setItem(USER_LS,text);
}
function handleSubmit(e){
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit",handleSubmit);
}
function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  content.classList.add(SHOWING_CN);
  greeting.innerText = `안녕하세요 ${text}님`;
}
function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  currentUser === null
  ? askForName()
  : paintGreeting(currentUser);
}

function init(){
  loadName();
}
init();