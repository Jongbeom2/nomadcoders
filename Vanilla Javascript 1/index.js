
const title = document.querySelector('#title');
const CLICKED_CLASS = 'clicked';
function handleClick() {
  title.classList.toggle(CLICKED_CLASS);
}
title.addEventListener('click', handleClick);