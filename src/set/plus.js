MathLib.extendPrototype('set', 'plus', function (n) {
  var res = [];
  if (!arguments.length) {
    return MathLib.plus.apply(null, this);
  }
  else if (Array.isArray(n)) {
    this.forEach(function (x) {
        n.forEach(function (y) {
          res.push(MathLib.plus(x, y));
        });
      });

    return MathLib.set(res);
  }
  else {
    return this.map(function (x) {
      return MathLib.plus(x, n);
    });
  }
});