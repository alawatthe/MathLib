// ### Permutation.prototype.toString()
// String representation of the permutation. 
//
// *@returns {string}*
MathLib.extendPrototype('permutation', 'toString', function () {
  var str = '';
  this.cycle.forEach(function (elem) {
    str += '(' + elem.toString() + ')';
  });
  return str;
});