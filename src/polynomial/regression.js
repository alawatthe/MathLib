// ### Polynomial.regression
// Calculates the regression line for some points
//
// *@returns {polynomial}*
MathLib.extend('polynomial', 'regression', function (x, y) {
  var length = x.length,
      xy = 0,
      xi = 0,
      yi = 0,
      x2 = 0,
      m, c, i;

  if (arguments.length === 2) {
    for (i = 0; i < length; i++) {
      xy += x[i] * y[i];
      xi += x[i];
      yi += y[i];
      x2 += x[i] * x[i];
    }
  }
  else {
    for (i = 0; i < length; i++) {
      xy += x[i][0] * x[i][1];
      xi += x[i][0];
      yi += x[i][1];
      x2 += x[i][0] * x[i][0];
    }
  }

  m = (length * xy - xi * yi) / (length * x2 - xi * xi);
  c = (yi * x2 - xy * xi) / (length * x2 - xi * xi);
  return MathLib.polynomial([c, m]);
});