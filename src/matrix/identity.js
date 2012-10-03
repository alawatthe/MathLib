// ### Matrix.identity
// Returns the identity matrix.
//
// *@param {number}* The number of rows and columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'identity', function (n) {
  var temp = [], arr = [],
      i, ii;
  n = n || 1;

  for (i=0, ii=n-1; i<ii; i++) {
    temp.push(0);
  }
  temp.push(1);
  temp = temp.concat(temp);
  temp = temp.slice(0, -1);

  for (i=0, ii=n; i<ii; i++) {
    arr.push(temp.slice(n-i-1, 2*n-i- 1));
  }

  return MathLib.matrix(arr);
});