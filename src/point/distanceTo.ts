// ### Point.prototype.distanceTo()
// Calculates the distance to an other point.
// If no other point is provided, it calculates the distance to the origin.
//
// *@param {point}* [point] The point to calculate the distance to  
// *@returns {number}*
distanceTo(point : Point) : number {
  var res = 0,
      i;

  if (arguments.length === 0) {
    for (i = 0; i < this.dim; i++) {
      res += Math.pow(this[i], 2);
    }
    return Math.sqrt(res);
  }

  if (point.type === 'point' && this.dim === point.dim) {
    for (i = 0; i < this.dim; i++) {
      res += Math.pow(this[i] - point[i], 2);
    }
  }
  return Math.sqrt(res);
}