// ### Screen.prototype.onmouseup()
// Handles the mouseup event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmouseup', function (evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Go back to normal mode
  if(this.interaction === 'pan' || this.interaction === 'drag') {
    this.interaction = '';
  }

});