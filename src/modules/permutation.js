// ## Permutation
prototypes.permutation = [];
MathLib.permutation = function (p) {
  var cycle, permutation, max;

  if (Array.isArray(p[0])) {
    cycle = p;
    permutation = MathLib.permutation.cycleToList(cycle);
  }
  else {
    permutation = p;
    cycle = MathLib.permutation.listToCycle(permutation);
  }

  permutation[proto] = prototypes.permutation;
  Object.defineProperties(permutation, {
    cycle: {
      value: cycle
    },
    max: {
      value: permutation.length-1
    }
  });
  return permutation;

};

//Setting the .constructor property to MathLib.matrix
MathLib.extendPrototype('permutation', 'constructor', MathLib.permutation);

//Setting the .type property to 'permutation'
MathLib.extendPrototype('permutation', 'type', 'permutation');


// ### Permutation.prototype.applyTo()
// Applies the permutation to a number or a array/matrix/point/vector
//
// *@param {number|array|matrix|point|vector}*  
// *@returns {number|array|matrix|point|vector}*
MathLib.extendPrototype('permutation', 'applyTo', function (n) {
  var p, res;
  if (typeof n === 'number') {
    if (n >= this.length) {
      return n;
    }
    return this[n];
  }
  else {
    p = this;
    res = n.map(function (x, i) {
      return n[p.applyTo(i)];
    });

    return (n.type === undefined ? res : n.constructor(res));
  }
});


// ### Permutation.prototype.inverse()
// Calculates the inverse of the permutation
//
// *@returns {permutation}*
MathLib.extendPrototype('permutation', 'inverse', function () {
  var cycle = this.cycle.slice();
  cycle.reverse().forEach(function (e) {
    e.reverse();
  });
  return MathLib.permutation(cycle);
});


// ### Permutation.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {permutation}*
MathLib.extendPrototype('permutation', 'map', function (f) {
  return this.constructor(Array.prototype.map.call(this, f));
});


// ### Permutation.prototype.sgn()
// Calculates the signum of the permutation
//
// *@returns {number}*
MathLib.extendPrototype('permutation', 'sgn', function () {
  var count = 0, i;
  for (i = 0; i < this.cycle.length; i++) {
    count += this.cycle[i].length;
  }
  count += this.cycle.length;
  return -2 * (count % 2) + 1;
});


// ### Permutation.prototype.times()
// Multiplies two permutations
//
// *@returns {permutation}*
MathLib.extendPrototype('permutation', 'times', function (p) {
  var a = this;
  return p.map(function (x) {
    return a[x];
  });
});


// ### Permutation.prototype.times()
// Multiplies two permutations
//
// *@param{number}* [size] The size of the matrix  
// *@returns {matrix}*
MathLib.extendPrototype('permutation', 'toMatrix', function (n) {
  var arr = [],
      res = [],
      temp, i, ii;
      n = n || this.length;

  for (i = 0, ii = n - 1; i < ii; i++) {
    arr.push(0);
  }
  arr = arr.concat([1]).concat(arr);
  for (i = 0, ii = n; i < ii; i++) {
    temp = n - this.applyTo(i) - 1;
    res.push(arr.slice(temp, temp + n));
  }
  return MathLib.matrix(res);
});


// ### Permutation.prototype.toString()
// String representation of the permutation. 
//
// *@returns {string}*
MathLib.extendPrototype('permutation', 'toString', function () {
  var str = '';
  this.cycle.forEach(function (elem) {
    str += '(' + elem.toString() + ')';
  });
  return str;
});


// ### Permutation.cycleToList()
// Converts a cycle representation to a list representation
// 
// *@param{array}* cycle The cycle to be converted  
// *@returns {array}*
MathLib.extend('permutation', 'cycleToList', function (cycle) {
  var index, res = [],
      i, ii, j, jj, max;

  max = cycle.map(function (b) {
    return Math.max.apply(null, b);
  });
  max = Math.max.apply(null, max);

  for (i=0, ii=max; i<=ii; i++) {
    cur = i;
    for (j = 0, jj = cycle.length; j < jj; j++) {
      index = cycle[j].indexOf(cur);
      if (++index) {
        cur = cycle[j][index % cycle[j].length];
      }
    }
    res.push(cur);
  }
  return res;
});


// ### Permutation.id()
// The id permutation
// 
// *@returns {permutation}*
MathLib.extend('permutation', 'id', MathLib.permutation([[]]));


// ### Permutation.listToCycle()
// Converts a list representation to a cycle representation
// 
// *@param{array}* list The list to be converted  
// *@returns {array}*
MathLib.extend('permutation', 'listToCycle', function (list) {
  var finished = [],
      cur, i, ii, temp, res = [];

  for (i=0, ii=list.length; i<ii; i++) {
    cur = i;
    temp = [];
    while(!finished[cur]) {
      finished[cur] = true;
      temp.push(cur);
      cur = list[cur];
    }
    if (temp.length) {
      res.push(temp);
    }
  }
  return res;
});
