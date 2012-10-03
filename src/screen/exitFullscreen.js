// ### Screen.prototype.exitFullscreen()
// Exits the fullscreen
//
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'exitFullscreen', function () {
  if (document.cancelFullScreen) {  
    document.cancelFullScreen();  
  }
  else if (document.mozCancelFullScreen) {  
    document.mozCancelFullScreen();  
  }
  else if (document.webkitCancelFullScreen) {  
    document.webkitCancelFullScreen();  
  } 

  return this;
});