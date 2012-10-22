static createSetOperation = function(left, both, right) {
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
    return new MathLib.Set(res);
  };
};

union = Set.createSetOperation(true, true, true);
intersect = Set.createSetOperation(false, true, false);
without = Set.createSetOperation(true, false, false);
xor = Set.createSetOperation(true, false, true);