var generateHexColor = function() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

var updateColorScheme = function() {
  var newColorScheme = generateHexColor();
  touchyApp.style.backgroundColor = newColorScheme;
};

var touchyApp = document.getElementById('js-touchy-app');
touchyApp.addEventListener('click', updateColorScheme);