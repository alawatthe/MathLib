// ### Screen.prototype.enterFullscreen()
// Displays the current plot in fullscreen mode.
//
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'enterFullscreen', function () {
  var elem = this.screenWrapper;  
  if (elem.requestFullScreen) {  
    elem.requestFullScreen();  
  }
  else if (elem.mozRequestFullScreen) {  
    elem.mozRequestFullScreen();  
  }
  else if (elem.webkitRequestFullScreen) {  
    elem.webkitRequestFullScreen();  
  }

  return this;
});