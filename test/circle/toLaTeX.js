test('.toLaTeX()', 1, function () {
  var p = MathLib.point(1, 2),
      c = MathLib.circle(p, 2);

  equal(c.toLaTeX(), 'B_{2}\\left(\\begin{pmatrix}1\\\\2\\end{pmatrix}\\right)', 'Spec. 1: ');
});