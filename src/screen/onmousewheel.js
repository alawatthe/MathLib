// ### Screen.prototype.onmousewheel()
// Handles the mousewheel event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmousewheel', function (evt) {
  var delta, k, p, z;

  if (!this.zoom) {
    return;
  }

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Chrome/Safari
  if (evt.wheelDelta) {
    delta = evt.wheelDelta / 360;
  }
  // Firefox
  else {
    delta = evt.detail / -9;
  }

  z = Math.pow(1 + this.zoomSpeed, delta);
  p = this.curTransformation.inverse().times(this.getEventPoint(evt));

  // Compute new scale matrix in current mouse position
  k = MathLib.matrix([[z, 0, p[0] - p[0]*z], [0, z, p[1] - p[1]*z ], [0, 0, 1]]);

  this.curTransformation = this.curTransformation.times(k);
  this.redraw();

  if (typeof this.startTransformation === "undefined") {
    this.startTransformation = this.curTransformation.inverse();
  }

  this.startTransformation = this.startTransformation.times(k.inverse());
});
