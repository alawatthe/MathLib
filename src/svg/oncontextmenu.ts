// ### SVG.prototype.oncontextmenu()
// Handles the contextmenu event
//
// *@param {event}*
MathLib.extendPrototype('svg', 'oncontextmenu', function (evt) {
  this.contextmenu(evt);
});