// ### Screen2D.prototype.getY()
// Returns the y coordinate of the event.
//
// *@param {event}*  
// *@returns {number}*
getY (evt) {
  var osY;
  if (evt.offsetY) {
    osY = evt.offsetY;
  }
  else {
    osY = evt.layerY;
  }
  return (osY - this.curTranslateY) / this.curZoomY;
}