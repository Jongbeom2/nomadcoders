const IMG_NUMBER = 7;

const body = document.querySelector('body');

// paint Image
function paintImage(imgNumber){
  const image = new Image();
  image.src = `./img/${imgNumber+1}.jpeg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}
// get random number
function generateNumber(){
  const number = Math.floor(Math.random()*IMG_NUMBER);
  return number;
}
// init
function init(){
  const randomNumber = generateNumber();
  paintImage(randomNumber);

}

init();