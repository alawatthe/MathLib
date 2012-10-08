module('Set');
test('init', 1, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  equal(s.card,     5,     'Testing the cardinality');
});



// Properties
test('.constructor', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]);
  equal(s.constructor, MathLib.set, 'Testing .constructor');
});


test('.type', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]);
  equal(s.type, 'set', 'Testing .type');
});



// Methods
test('.arithMean()', 1, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  equal(s.arithMean(),  26 / 5, 'Testing .arithMean() (set)');
});


test('.compare()', 3, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]),
      n = MathLib.set([1, 2, 3, 4, 5]);
  deepEqual(s.compare(s),  0, '.compare()');
  deepEqual(s.compare(m),  -1, '.compare()');
  deepEqual(m.compare(n),  -1, '.compare()');
});


test('.geoMean()', 1, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  equal(s.geoMean(),  Math.pow(1728, 1 / 5), 'Testing .geoMean() (set)');
});


test('.harmonicMean()', 1, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  equal(s.harmonicMean(),  3.7894736842105265, 'Testing .geoMean() (set)');
});


test('.insert()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  deepEqual(s.insert(1), [1, 2, 3, 4, 8, 9], 'Testing .locate() (set, front)');
  deepEqual(s.insert(3), [1, 2, 3, 4, 8, 9], 'Testing .locate() (set, existing)');
  deepEqual(s.insert(5), [1, 2, 3, 4, 5, 8, 9], 'Testing .locate() (set, not existing)');
  deepEqual(s.insert(10), [1, 2, 3, 4, 5, 8, 9, 10], 'Testing .locate() (set, back)');
});


test('.intersect()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.intersect(m),  [1, 3], 'Testing .intersect() (set)');
});


test('.isEmpty()', 3, function () {
  var m = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      n = MathLib.set(),
      o = MathLib.set([]);
  equal(m.isEmpty(), false, 'Testing .min()');
  equal(n.isEmpty(), true, 'Testing .min(3)');
  equal(o.isEmpty(), true, 'Testing .min(3)');
});


test('.isEqual()', 3, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]),
      n = MathLib.set([1, 2, MathLib.complex([3, 0]), 4]);
  deepEqual(s.isEqual(s),  true, '.isEqual()');
  deepEqual(s.isEqual(m),  false, '.isEqual()');
  deepEqual(s.isEqual(n),  false, '.isEqual()');
});


test('.isSubsetOf()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 8, 2]),
      n = MathLib.set([5, 8, 2]);

  equal(m.isSubsetOf(s),  true, 'Testing .isSubsetOf()');
  equal(n.isSubsetOf(s),  false, 'Testing .isSubsetOf()');
});


test('.locate()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  equal(s.locate(1), 0, 'Testing .locate()');
  equal(s.locate(3), 1, 'Testing .locate()');
  equal(s.locate(5), 3, 'Testing .locate()');
  equal(s.locate(10), 5, 'Testing .locate()');
});


test(".map()", 2, function () {
  var p = MathLib.set([1, 2, 3]),
      q = MathLib.set([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'set', ".type should be set");
});


test('.max()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  equal(s.max(),  9, 'Testing .max() (set)');
  equal(s.max(3), 4, 'Testing .max(3) (set)');
});


test('.min()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  equal(s.min(),  2, 'Testing .min() (set)');
  equal(s.min(3), 4, 'Testing .min(3) (set)');
});


test('.plus()', 3, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 2, 3, 4, 5, 6]);
  equal(s.plus(), 10, 'Testing .plus() (set)');
  deepEqual(s.plus(2),  [3, 4, 5, 6], 'Testing .plus(int) (set)');
  deepEqual(s.plus(m),  [2, 3, 4, 5, 6, 7, 8, 9, 10], 'Testing .plus(set) (set)');
});


test('.powerset()', 1, function () {
  var s = MathLib.set,
      m = MathLib.set([1, 2, 3]),
      n = MathLib.set([s(), s([1]), s([2]), s([3]), s([1, 2]), s([1, 3]), s([2, 3]), s([1, 2, 3])]);
  deepEqual(m.powerset(),  n, '.powerset()');
});


test('.remove()', 1, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  deepEqual(s.remove(3), [2, 4, 8, 9], 'Testing .toArray()');
});


test('.times()', 2, function () {
  var s = MathLib.set([1, 2, 3, 4]);
  equal(s.times(), 24, 'Testing .times() (set)');
  deepEqual(s.times(2),  [2, 4, 6, 8], 'Testing .times(int) (set)');
});


test('.toArray()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      n = MathLib.set();
  deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray() (set)');
  deepEqual(n.toArray(), [], 'Testing .toArray() (empty set)');
});


test('.toContentMathMLString()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      e = MathLib.set();
  equal(s.toContentMathMLString(),  '<set><cn>2</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathMLString() (set)');
  equal(e.toContentMathMLString(),  '<emptyset/>', 'Testing .toContentMathMLString() (empty set)');
});


test('.toLaTeX()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      e = MathLib.set();
  equal(s.toLaTeX(),  '\\{2, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (set)');
  equal(e.toLaTeX(),  '\\emptyset', 'Testing .toLaTeX() (empty set)');
});


test('.toMathMLString()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      e = MathLib.set();
  equal(s.toMathMLString(),  '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathMLString() (set)');
  equal(e.toMathMLString(),  '<mi>&#x2205;</mi>', 'Testing .toMathMLString() (empty set)');
});


test('.toString()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      e = MathLib.set();
  equal(s.toString(),  '(2, 3, 4, 8, 9)', 'Testing .toString() (set)');
  equal(e.toString(),  '∅', 'Testing .toString() (empty set)');
});


test('.union()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.union(m),  [1, 2, 3, 4, 5, 7], 'Testing .union() (set)');
});


test('.without()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.without(m),  [2, 4], 'Testing .without() (set)');
});


test('.xor()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.xor(m),  [2, 4, 5, 7], 'Testing .xor() (set)');
});



// Static methods
test('fromTo()', 1, function () {
  deepEqual(MathLib.set.fromTo(1, 5, 2),  [1, 3, 5], 'Testing MathLib.set.fromTo()');
});
