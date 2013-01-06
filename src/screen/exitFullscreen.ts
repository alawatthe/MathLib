// ### Screen.prototype.exitFullscreen()
// Exits the fullscreen
//
// *@returns {screen}* Returns the screen
exitFullscreen() {
  if (document.exitFullscreen) {  
    document.exitFullscreen();  
  }
  else if (document.mozCancelFullScreen) {  
    document.mozCancelFullScreen();  
  }
  else if (document.webkitCancelFullscreen) {  
    document.webkitCancelFullscreen();  
  } 

  return this;
}