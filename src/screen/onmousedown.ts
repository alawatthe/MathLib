// ### Screen.prototype.onmousedown()
// Handles the mousedown event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmousedown', function (evt) {
  // Only start the action if the left mouse button was clicked
  if (evt.button !== 0) {
    return;
  }

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Pan mode
  // Pan anyway when drag is disabled and the user clicked on an element 
  if(evt.target.tagName === 'canvas' || evt.target.tagName === 'svg' || !this.drag) {
    this.interaction = 'pan';
    this.startPoint = this.getEventPoint(evt);
    this.startTransformation = this.curTransformation.copy();
  }

  // Drag mode
  // else {
  //   this.interaction = 'drag';
  //   this.stateTarget = evt.target;
  //   this.stateTf = g.getCTM().inverse();
  //   this.stateOrigin = this.getEventPoint(evt).matrixTransform(this.stateTf);
  // }
});