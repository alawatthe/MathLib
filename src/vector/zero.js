// ### Vector.zero()
// Returns a zero vector of given size
//
// *@param {number}* The number of entries in the vector.  
// *@returns {vector}*
MathLib.extend('vector', 'zero', function (n) {
  var res = [], i;
  for (i=0; i<n; i++) {
    res.push(0); 
  }
  return MathLib.vector(res);
});