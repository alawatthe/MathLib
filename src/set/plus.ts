plus(n) {
  var res = [];
  if (!arguments.length) {
    return MathLib.plus.apply(null, this);
  }
  else if (n.type === 'set') {
    this.forEach(function (x) {
        n.forEach(function (y) {
          res.push(MathLib.plus(x, y));
        });
      });

    return new MathLib.Set(res);
  }
  else {
    return this.map(function (x) {
      return MathLib.plus(x, n);
    });
  }
}