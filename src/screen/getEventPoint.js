// ### Screen.prototype.getEventPoint
// Creates a point based on the coordinates of an event.
//
// *@param {event}*  
// *@returns {point}*
MathLib.extendPrototype('screen', 'getEventPoint', function (evt) {
  var x, y;
  if (evt.offsetX) {
    x = evt.offsetX;
    y = evt.offsetY;
  }
  else {
    x = evt.layerX;
    y = evt.layerY;
  }
  return MathLib.point([x, y, 1]);
});