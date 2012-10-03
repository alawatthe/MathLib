(function () {
  var createSetOperation = function(left, both, right) {
    return function (a) {
      var res = [],
          i = 0,
          j = 0,
          tl = this.card,
          al = a.card;

      while (i < tl && j < al) {
        if (this[i] < a[j]) {
          if (left) {
            res.push(this[i]);
          }
          i++;
          continue;
        }
        if (this[i] > a[j]) {
          if (right) {
            res.push(a[j]);
          }
          j++;
          continue;
        }
        if (this[i] === a[j]) {
          if (both) {
            res.push(this[i]);
          }
          i++;
          j++;
          continue;
        }
      }
      if (left && j === al) {
        res = res.concat(this.slice(i));
      }
      else if (right && i === tl) {
        res = res.concat(a.slice(j));
      }
      return MathLib.set(res, true);
    };
  };

  MathLib.extendPrototype('set', 'union', createSetOperation(true, true, true));
  MathLib.extendPrototype('set', 'intersect', createSetOperation(false, true, false));
  MathLib.extendPrototype('set', 'without', createSetOperation(true, false, false));
  MathLib.extendPrototype('set', 'xor', createSetOperation(true, false, true));
}());