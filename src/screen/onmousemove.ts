// ### Screen.prototype.onmousemove()
// Handles the mousemove event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmousemove', function (evt) {
  var p;

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;
  

  // Pan mode
  if(this.interaction === 'pan' && this.pan) {
    p = this.getEventPoint(evt).minus(this.startPoint);
    this.curTranslateX = this.startTransformation[0][2] + p[0];
    this.curTranslateY = this.startTransformation[1][2] + p[1];
    this.redraw();
  }

  // Drag mode
  // else if(this.state === 'drag' && this.drag) {
  //   p = this.getEventPoint(evt).matrixTransform(g.getCTM().inverse());
  //   this.setCTM(this.stateTarget, this.element.createSVGMatrix().translate(p.x - this.stateOrigin.x, p.y - this.stateOrigin.y).multiply(g.getCTM().inverse()).multiply(this.stateTarget.getCTM()));
  //   this.stateOrigin = p;
  // }
});