// ### Point.prototype.toArray()
// Converts he Point to a real array
//
// *@returns {array}*
toArray() {
  var res = [], i, ii;
  for (i = 0, ii=this.dim; i <= ii; i++) {
    res.push(this[i]);
  }
  return res;
}