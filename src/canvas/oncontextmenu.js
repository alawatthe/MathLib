// ### Canvas.prototype.oncontextmenu()
// Handles the contextmenu event
//
// *@param {event}*
MathLib.extendPrototype('canvas', 'oncontextmenu', function (evt) {
  this.contextmenu(evt);
});