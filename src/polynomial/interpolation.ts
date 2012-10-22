// ### Polynomial.interpolation
// Interpolates points.
//
// *@returns {polynomial}*
interpolation(a, b) {
  var temp,
      res = new MathLib.Polynomial([0]),
      n = a.length,
      i, j, x, y;

  if(arguments.length === 2) {
    a = a.map(function (x, i) {
      return [x, b[i]];
    });
  }

  for (i = 0; i < n; i++) {
    temp = new MathLib.Polynomial([1]);
    for (j = 0; j < n; j++) {
      if (i !== j) {
        temp = temp.times(new MathLib.Polynomial([-a[j][0] / (a[i][0] - a[j][0]), 1 / (a[i][0] - a[j][0])]));
      }
    }
    res = res.plus(temp.times(a[i][1]));
  }
  return res;
}