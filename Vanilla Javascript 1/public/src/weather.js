const COORDS = "coords";
const API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXX";

const weather = document.querySelector('.js-weather');

// get weather from openweathermap with lat and lon
function getWeather(lat, lon){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `기온 ${temperature} 도 @ ${place}`;
  })
}
// save coords from position
function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
// handle error
function handleGeoError(error){
  console.log(error);
}
// get position from navigator
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}
// load coords
function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null){
    askForCoords();
  }else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
// init
function init(){
  loadCoords();
}
init();