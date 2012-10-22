// ### Set.prototype.fromTo()
// Creates a set containing the numbers from a start value to a end value.
//
// *@param {number}* The number to start from  
// *@param {number}* The number to end with  
// *@param {number}* The stepsize (default = 1)  
// *@returns {set}*
static fromTo = function(f, t, s) {
  var i, arr = [];
  s = s || 1;
  if (f <= t) {
    for (i = f; i <= t; i += s) {
      arr.push(i);
    }
    return new MathLib.Set(arr);
  }
};