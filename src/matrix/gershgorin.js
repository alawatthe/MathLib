// ### Matrix.prototype.gershgorin()
// Returns the Gershgorin circles of the matrix.
//
// *@returns {array}* Returns an array of circles
MathLib.extendPrototype('matrix', 'gershgorin', function () {
  var c = [],
      rc = [],
      rr = [],
      res = [],
      i, ii;

  for (i=0, ii=this.rows; i<ii; i++) {
    rc.push(0);
    rr.push(0);
  }

  this.forEach(function(x, i, j) {
    if (i === j) {
      if (MathLib.is(x, 'complex')) {
        c.push(x.toPoint());
      }
      else {
        c.push([x, 0, 1]);
      }
    }
    else {
      rc[j] += MathLib.abs(x); 
      rr[i] += MathLib.abs(x); 
    }
  });

  for (i=0, ii=this.rows; i<ii; i++) {
    res.push(MathLib.circle([c[i], 0, 1], Math.min(rc[i], rr[i])));
  }

  return res;
});