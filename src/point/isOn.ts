// ### Point.prototype.isOn()
// Determines wether a point is on a line or circle
//
// *@param {line|point}*
// *@returns {boolean}*
isOn(a : Circle) : bool {
  if (a.type === 'line') {
    return this.distanceTo(a.center) === a.radius;
  }
  else if (a.type === 'circle') {
    return this.distanceTo(a.center) === a.radius;
  }
}