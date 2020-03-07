const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO_LS = 'toDos';

let toDos = [];

function deleteToDo(e){
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanTodos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanTodos;
  saveToDo();
}
function saveToDo(){
  localStorage.setItem(TODO_LS,JSON.stringify(toDos));
}
function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length+1;
  delBtn.innerText = 'X';
  span.innerText = text;
  delBtn.addEventListener('click',deleteToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj={
    text,
    id:newId
  };
  toDos.push(toDoObj);
  saveToDo();
}
function handleSubmit(e){
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}
function loadToDos(){
  const loadedToDos = localStorage.getItem(TODO_LS);
  if(loadedToDos !==null){
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();