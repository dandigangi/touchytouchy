var generateHexColor = function() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

var updateColorScheme = function() {
  var newColorScheme = generateHexColor();
  touchyApp.style.backgroundColor = newColorScheme;
};

var $body = document.getElementByTagName('body');
touchyApp.addEventListener('click', updateColorScheme);