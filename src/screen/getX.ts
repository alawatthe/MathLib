// ### Screen.prototype.getX()
// Returns the x coordinate of the event.
//
// *@param {event}*  
// *@returns {number}*
MathLib.extendPrototype('screen', 'getX', function (evt) {
  var osX;
  if (evt.offsetX) {
    osX = evt.offsetX;
  }
  else {
    osX = evt.layerX;
  }
  return (osX - this.curTranslateX) / this.curZoomX; 
});