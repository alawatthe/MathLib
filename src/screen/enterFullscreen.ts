// ### Screen.prototype.enterFullscreen()
// Displays the current plot in fullscreen mode.
//
// *@returns {screen}* Returns the screen
enterFullscreen() {
  var elem = this.wrapper;  
  if (elem.requestFullscreen) {  
    elem.requestFullscreen();  
  }
  else if (elem.mozRequestFullScreen) {  
    elem.mozRequestFullScreen();  
  }
  else if (elem.webkitRequestFullscreen) {  
    elem.webkitRequestFullscreen();  
  }

  return this;
}