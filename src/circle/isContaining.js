// ### Circle.prototype.isContaining()
// Determine if a circle is containing an other point.
//
// *@return {boolean}*
MathLib.extendPrototype('circle', 'isContaining', function (a) {
  if (a.type === "point" && a.dim === 2) {
    return a.distanceTo(this.center) < this.radius;
  }
});