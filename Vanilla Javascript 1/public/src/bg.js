const body = document.querySelector('body');

const IMG_NUMBER = 7;
function paintImage(imgNumber){
  const image = new Image();
  image.src = `./img/${imgNumber+1}.jpeg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}
function generateNumber(){
  const number = Math.floor(Math.random()*IMG_NUMBER);
  return number;
}
function init(){
  const randomNumber = generateNumber();
  paintImage(randomNumber);

}

init();