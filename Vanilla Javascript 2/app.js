const INITIAL_COLOR= '#2c2c2c'
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;

const canvas = document.querySelector("#jsCanvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');  
ctx.fillStyle = 'white';
ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle =INITIAL_COLOR;
ctx.lineWidth = 2.5;

const colors = document.querySelectorAll('.jsColor')

const range = document.querySelector('#jsRange');

const mode = document.querySelector('#jsMode');

const saveBtn = document.querySelector('#jsSave');

let isPainting = false;
let filling = false;

const handleColorClick =(e)=>{
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
const handleRangeChange = (e)=>{
  const size = e.target.value;
  ctx.lineWidth = size;
}
const hanldeModeClick = ()=>{
  if(filling === true){
    filling = false;
    mode.innerText = 'fill';
  }else{
    filling = true;
    mode.innerText = 'paint';
  }
}
const startPainting = () =>{
  isPainting = true;
}
const stopPainting = () =>{
  isPainting = false;
}
const onMouseMove = (e) =>{
  const x = e.offsetX;
  const y = e.offsetY;
  if(!isPainting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  }else{
    console.log(x,y)
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}
const handleCanvasClick = () => {
  if (filling === true){
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
const handleContextMenu = (e) => {
  e.preventDefault();
}
const handleSaveClick = () => {
  const image = canvas.toDataURL();
  const link = document .createElement('a');
  link.href = image;
  link.download = 'PaintJS[Export]';
  link.click();
}
if(canvas){
  canvas.addEventListener("mousemove",onMouseMove);
  canvas.addEventListener("mouseleave",stopPainting);
  canvas.addEventListener("mouseup",stopPainting);
  canvas.addEventListener("mousedown",startPainting);
  canvas.addEventListener("click",handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu)
}

colors.forEach(color=>{
  color.addEventListener('click',handleColorClick);
})

if(range){
  range.addEventListener("input", handleRangeChange)
}

if(mode){
  mode.addEventListener("click", hanldeModeClick)
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick)
}