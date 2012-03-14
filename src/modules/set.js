// ## Set
//
// To generate the set {1, 2, 3, 4, 5} you simply need to type
// ```
// MathLib.set([1, 2, 3, 4, 5])
// ```
// Multisets are also possible:
// ```
// MathLib.set([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5], true)
// ```
// Creates the multiset {1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9}

MathLib.set =	function (elements, multiset) {

  if (!elements) {
    elements = [];
  }
  elements = elements.sort(MathLib.compare);

  // eliminate the duplicates
  if (!multiset) {
    elements = elements.filter(function (x, i, a) {
      return x !== a[i + 1];
    });
  }


  elements[proto] = prototypes.set;
  Object.defineProperties(elements, {
    card: {
      get: function () {
        return this.length;
      }
    },
    multiset: {
      value: !!multiset
    }
  });
  return elements;

};


// Setting the .constructor property to MathLib.set
MathLib.extendPrototype('set', 'constructor', MathLib.set);


// Setting the .type property to 'set'
MathLib.extendPrototype('set', 'type', 'set');


// ### Set.prototype.compare()
// Compare function for sets
//
// *@returns {number}*
MathLib.extendPrototype('set', 'compare', function (x) {
  if (this.card !== x.card) {
    return MathLib.sgn(this.card - x.card);
  }
  else {
    var res = 0, stop = false;
    this.forEach(function (y, i) {
      if(!stop) {
        var a = MathLib.compare(y, x[i]);
        if(a !== 0) {
          res = a;
          stop = true;
        }
      }
    });
    return res;
  }
});


// ### Set.prototype.filter()
// Works like the Array.prototype.filter function
//
// *@param {function}* The filtering function  
// *@returns {set}*
MathLib.extendPrototype('set', 'filter', function (f) {
  return MathLib.set(Array.prototype.filter.call(this, f));
});


// ### Set.prototype.insert()
// Inserts an element into the set.
//
// *@returns {set}* Returns the current set
MathLib.extendPrototype('set', 'insert', function (x) {
  var i = this.locate(x);
  if (this[i] !== x || this.multiset) {
    this.splice(i, 0, x);
  }
  return this;
});


// ### Set.prototype.isEmpty()
// Determines if the set is empty.
//
// *@returns {boolean}*
MathLib.extendPrototype('set', 'isEmpty', function () {
  return this.card === 0;
});


// ### Set.prototype.isEqual()
// Determines if the set is equal to an other set.
//
// *@param {set}* The set to compare
// *@returns {boolean}*
MathLib.extendPrototype('set', 'isEqual', function (x) {
  if (this.card !== x.card) {
    return false;
  }
  else {
    return this.every(function (y, i) {
      return MathLib.isEqual(y, x[i]);
    });
  }
});


// ### Set.prototype.isSubsetOf()
// Determines if the set is a subset of an other set.
//
// *@param {set}* The potential superset 
// *@returns {boolean}*
MathLib.extendPrototype('set', 'isSubsetOf', function (a) {
  return this.every(function (x) {
    return a.indexOf(x) !== -1;
  });
});


// ### Set.prototype.locate()
// Array.prototype.indexOf() returns only the position of an element in the
// array and not the position where one should be inserted.
//
// *@param {set}* The element to locate
// *@returns {boolean}*
MathLib.extendPrototype('set', 'locate', function (x) {

  var left = 0,
      right = this.card - 1,
      middle,
      i = this.indexOf(x);

  if (i !== -1) {
    return i;
  }

  while (left <= right) {
    middle = left + Math.floor((right - left) / 2);
    if (this[middle] < x) {
        left = middle + 1;
    } else if (this[middle] > x) {
        right = middle - 1;
    } else {
        return middle;
    }
  }
  return left;
});


// ### Set.prototype.map()
// Works like the Array.prototype.map function
//
// *@param {function}* The mapping function  
// *@returns {set}*
MathLib.extendPrototype('set', 'map', function (f) {
  return MathLib.set(Array.prototype.map.call(this, f));
});


/*
Set.prototype.mean = function (p) {
  var res = 0,
      i;

  if (typeof p === "undefined" || p === 1) {
    return this.arithMean();
  }
  if (p === 0) {
    return this.geoMean();
  }
  if (p === -1) {
    return this.harMean();
  }

  for (i = 0; i < this.card; i++) {
    res += Math.pow(this.elements[i], p);
  }
  return MathLib.pow(res / this.card, 1 / p);
};

Set.prototype.median = function (a) {
  if (this.card % 2 === 0) {
    if (a === "min") {
      return this.elements[this.card / 2 - 1];
    }
    if (a === "max") {
      return this.elements[this.card / 2];
    }
    return (this.elements[this.card / 2] + this.elements[this.card / 2 + 1]) / 2;
  }
  else {
    return this.elements[(this.card - 1) / 2];
  }
};
*/


MathLib.extendPrototype('set', 'plus', function (n) {
  var res = [];
  if (!arguments.length) {
    return MathLib.plus(this);
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


// ### Set.prototype.powerset()
// Returns the powerset
//
// *@returns {set}*
MathLib.extendPrototype('set', 'powerset', function (a) {
  var res = [], arr, temp, i, ii, j, jj;
  for (i=0, ii=Math.pow(2, this.card); i<ii; i++) {
    arr = i.toString(2).split('').reverse();
    temp = [];
    for (j=0, jj=this.card; j<jj; j++) {
      if(arr[j] === '1') {
        temp.push(this[j]);
      }
    }
    res.push(MathLib.set(temp));
  }
  return MathLib.set(res);
});


// ### Set.prototype.remove()
// Removes a element from a set
//
// *@returns {set}*
MathLib.extendPrototype('set', 'remove', function (a) {
  var i = this.indexOf(a);
  if (i !== -1) {
    this.splice(i, 1);
  }
  return this;
});


// ### Set.prototype.times()
// Multiplies all elements in the set if no argument is passed.
// Multiplies all elements by a argument if one is passed.
//
// *@param {number|MathLib object}  
// *@returns {set}*
MathLib.extendPrototype('set', 'times', function (n) {
  if (!arguments.length) {
    return MathLib.times(this);
  }
  else {
    return this.map(function (x) {
      return MathLib.times(x, n);
    });
  }
});


// ### Set.prototype.toArray()
// Converts the set to an array
//
// *@returns {array}*
MathLib.extendPrototype('set', 'toArray', function () {
  return this.slice();
});


// ### Set.prototype.toLaTeX()
// Returns the LaTeX representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toLaTeX', function () {
  if (this.isEmpty()) {
    return '\\emptyset';
  }
  else {
    return this.reduce(function(old, cur) {
      return old + MathLib.toLaTeX(cur) + ', ';
    }, '\\{').slice(0, -2) + '\\}';
  }
});


// ### Set.prototype.toContentMathML()
// Returns the content MathML representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toContentMathML', function () {
  if (this.isEmpty()) {
    return '<emptyset/>';
  }
  else {
    return this.reduce(function(old, cur) {
      return old + MathLib.toContentMathML(cur);
    }, '<set>') + '</set>';
  }
});


// ### Set.prototype.toMathML()
// Returns the (presentation) MathML representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toMathML', function () {
  if (this.isEmpty()) {
    return '<mi>&#x2205;</mi>';
  }
  else {
    return this.reduce(function(old, cur) {
      return old +  MathLib.toMathML(cur) + '<mo>,</mo>';
    }, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
  }
});


// ### Set.prototype.toMultiset()
// Converts a set to a multiset
//
// *@returns {set}*
MathLib.extendPrototype('set', 'toMultiset', function () {
  return MathLib.set(this.toArray(), true);
});


// ### Set.prototype.toSet()
// Converts a multiset to a set
//
// *@returns {set}*
MathLib.extendPrototype('set', 'toSet', function () {
  return MathLib.set(this.toArray());
});


// ### Set.prototype.toString()
// Returns a string representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toString', function () {
  if (this.isEmpty()) {
    return '∅';
  }
  return '(' + this.join(', ') +  ')';
});


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

  MathLib.extendPrototype('set', 'or', createSetOperation(true, true, true));
  MathLib.extendPrototype('set', 'and', createSetOperation(false, true, false));
  MathLib.extendPrototype('set', 'without', createSetOperation(true, false, false));
  MathLib.extendPrototype('set', 'xor', createSetOperation(true, false, true));
}());




// ### Set.prototype.fromTo()
// Creates a set containing the numbers from a start value to a end value.
//
// *@param {number}* The number to start from
// *@param {number}* The number to end with
// *@param {number}* The stepsize (default = 1)
// *@returns {set}*
MathLib.extend('set', 'fromTo', function (f, t, s) {
  var i, arr = [];
  s = s || 1;
  if (f <= t) {
    for (i = f; i <= t; i += s) {
      arr.push(i);
    }
    return MathLib.set(arr);
  }
});
