const INITIAL_COLOR= '#2c2c2c'
const INITIAL_BG_COLOR = 'white';
let CANVAS_WIDTH = 600;
let CANVAS_HEIGHT = 500;
const INITIAL_LINE_WIDTH = 2.5;

const canvasParent = document.querySelector('#canvas');
let canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');  
const colors = document.querySelectorAll('.jsColor')
const myColorContorls = document.querySelector('#jsMyColorControl');
const myColor = document.querySelector('.jsMyColor')
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');
const resetBtn = document.querySelector('#jsReset');
const resizeBtn = document.querySelector('#jsResize');
const widthControls = document.querySelector('#jsWidth');
const heightControls = document.querySelector('#jsHeight');

let isPainting = false;
let isFilling = false;

const initSetting = () =>{
  // set canvas
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  // set ctx
  ctx.fillStyle = INITIAL_BG_COLOR;
  ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.strokeStyle = INITIAL_COLOR;
  ctx.fillStyle =INITIAL_COLOR;
  ctx.lineWidth = INITIAL_LINE_WIDTH;
  // set range
  range.value = INITIAL_LINE_WIDTH;
  // set mode
  isFilling = false;
  mode.innerText = 'fill';
}

const initEvent = () => {
  // add event to widget
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
    range.addEventListener("input", handleRangeChange);
  }
  if(mode){
    mode.addEventListener("click", hanldeModeClick);
  }
  if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
  }
  if (resetBtn){
    resetBtn.addEventListener("click", handleResetClick);
  }
  if(myColorContorls){
    myColorContorls.addEventListener("change",handleMyColorChange);
  }
  if(resizeBtn){
    resizeBtn.addEventListener("click",handleResizeClick);
  }
}
// start paint
const startPainting = () =>{
  isPainting = true;
}
// stop paint
const stopPainting = () =>{
  isPainting = false;
}
// move mouse on canvas
const onMouseMove = (e) =>{
  if (isFilling)
    return;
  const x = e.offsetX;
  const y = e.offsetY;
  if(!isPainting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  }else{
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}
// change color
const handleColorClick =(e)=>{
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
// change line width
const handleRangeChange = (e)=>{
  const size = e.target.value;
  ctx.lineWidth = size;
}
// change fill or paint mode
const hanldeModeClick = ()=>{
  if(isFilling === true){
    isFilling = false;
    mode.innerText = 'fill';
  }else{
    isFilling = true;
    mode.innerText = 'paint';
  }
}
// click canvas
const handleCanvasClick = () => {
  if (isFilling === true){
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
// prevent event of right click
const handleContextMenu = (e) => {
  e.preventDefault();
}
// click save button
const handleSaveClick = () => {
  const image = canvas.toDataURL();
  const link = document .createElement('a');
  link.href = image;
  link.download = 'PaintJS[Export]';
  link.click();
}
// click reset button
const handleResetClick =  () =>{
  initSetting();
}
// change my color
const handleMyColorChange = (e) =>{
  const color = e.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  myColor.style.backgroundColor = color;
}
// change size of canvas
const handleResizeClick = (e) => {
  alert('Not yet')
}
// init
initSetting();
initEvent();