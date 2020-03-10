const TODO_LS = 'toDos';

const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

let toDos = [];

// delete todo from widget and local storage
function deleteToDo(e) {
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanTodos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanTodos;
  saveToDo();
}
// save todo to local storage
function saveToDo() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}
// append todo to widget and local storage
function paintToDo(text) {
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const li = document.createElement("li");
  const newId = toDos.length + 1;
  span.innerText = text + " ";
  span.classList.add('toDoText');
  delBtn.innerText = '완료';
  delBtn.classList.add('toDoRemoveBtn')
  delBtn.addEventListener('click', deleteToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  li.classList.add('toDo')
  toDoList.appendChild(li);
  const toDoObj = {
    text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDo();
}
// submit todo
function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}
// load todo from local storage
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}
// init
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();