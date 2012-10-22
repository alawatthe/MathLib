module('Set');
test('init', 1, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
  equal(s.card, 5, 'Testing the cardinality');
});



// Properties
test('.constructor', 1, function () {
  var s = new MathLib.Set([1, 2, 3, 4]);
  equal(s.constructor, MathLib.Set, 'Testing .constructor');
});


test('.type', 1, function () {
  var s = new MathLib.Set([1, 2, 3, 4]);
  equal(s.type, 'set', 'Testing .type');
});



// Methods
test('.compare()', 3, function () {
  var s = new MathLib.Set([1, 2, 3, 4]),
      m = new MathLib.Set([1, 3, 5, 7]),
      n = new MathLib.Set([1, 2, 3, 4, 5]);
  deepEqual(s.compare(s), 0, '.compare()');
  deepEqual(s.compare(m), -1, '.compare()');
  deepEqual(m.compare(n), -1, '.compare()');
});


test('.insert()', 4, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
  deepEqual(s.insert(1), new MathLib.Set([1, 2, 3, 4, 8, 9]), 'Testing .locate() (set, front)');
  deepEqual(s.insert(3), new MathLib.Set([1, 2, 3, 4, 8, 9]), 'Testing .locate() (set, existing)');
  deepEqual(s.insert(5), new MathLib.Set([1, 2, 3, 4, 5, 8, 9]), 'Testing .locate() (set, not existing)');
  deepEqual(s.insert(10), new MathLib.Set([1, 2, 3, 4, 5, 8, 9, 10]), 'Testing .locate() (set, back)');
});


test('.intersect()', 1, function () {
  var s = new MathLib.Set([1, 2, 3, 4]),
      m = new MathLib.Set([1, 3, 5, 7]);
  deepEqual(s.intersect(m), new MathLib.Set([1, 3]), 'Testing .intersect() (set)');
});


test('.isEmpty()', 3, function () {
  var m = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
      n = new MathLib.Set(),
      o = new MathLib.Set([]);
  equal(m.isEmpty(), false, 'Testing .min()');
  equal(n.isEmpty(), true, 'Testing .min(3)');
  equal(o.isEmpty(), true, 'Testing .min(3)');
});


test('.isEqual()', 3, function () {
  var s = new MathLib.Set([1, 2, 3, 4]),
      m = new MathLib.Set([1, 3, 5, 7]),
      n = new MathLib.Set([1, 2, new MathLib.Complex([3, 0]), 4]);
  deepEqual(s.isEqual(s), true, '.isEqual()');
  deepEqual(s.isEqual(m), false, '.isEqual()');
  deepEqual(s.isEqual(n), false, '.isEqual()');
});


test('.isSubsetOf()', 2, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
      m = new MathLib.Set([3, 8, 2]),
      n = new MathLib.Set([5, 8, 2]);

  equal(m.isSubsetOf(s), true, 'Testing .isSubsetOf()');
  equal(n.isSubsetOf(s), false, 'Testing .isSubsetOf()');
});


test('.locate()', 4, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
  equal(s.locate(1), 0, 'Testing .locate()');
  equal(s.locate(3), 1, 'Testing .locate()');
  equal(s.locate(5), 3, 'Testing .locate()');
  equal(s.locate(10), 5, 'Testing .locate()');
});


test(".map()", 2, function () {
  var p = new MathLib.Set([1, 2, 3]),
      q = new MathLib.Set([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'set', ".type should be set");
});


test('.plus()', 3, function () {
  var s = new MathLib.Set([1, 2, 3, 4]),
      m = new MathLib.Set([1, 2, 3, 4, 5, 6]);
  equal(s.plus(), 10, 'Testing .plus() (set)');
  deepEqual(s.plus(2), new MathLib.Set([3, 4, 5, 6]), 'Testing .plus(int) (set)');
  deepEqual(s.plus(m), new MathLib.Set([2, 3, 4, 5, 6, 7, 8, 9, 10]), 'Testing .plus(set) (set)');
});


test('.powerset()', 1, function () {
  var s = MathLib.Set,
      m = new MathLib.Set([1, 2, 3]),
      n = new MathLib.Set([new s(), new s([1]), new s([2]), new s([3]), new s([1, 2]), new s([1, 3]), new s([2, 3]), new s([1, 2, 3])]);
  deepEqual(m.powerset(), n, '.powerset()');
});


test('.remove()', 1, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
  deepEqual(s.remove(3), new MathLib.Set([2, 4, 8, 9]), 'Testing .toArray()');
});


test('.times()', 2, function () {
  var s = new MathLib.Set([1, 2, 3, 4]);
  equal(s.times(), 24, 'Testing .times() (set)');
  deepEqual(s.times(2), new MathLib.Set([2, 4, 6, 8]), 'Testing .times(int) (set)');
});


test('.toArray()', 2, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
      n = new MathLib.Set();
  deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray() (set)');
  deepEqual(n.toArray(), [], 'Testing .toArray() (empty set)');
});


test('.toContentMathMLString()', 2, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
      e = new MathLib.Set();
  equal(s.toContentMathMLString(), '<set><cn>2</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathMLString() (set)');
  equal(e.toContentMathMLString(), '<emptyset/>', 'Testing .toContentMathMLString() (empty set)');
});


test('.toLaTeX()', 2, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
      e = new MathLib.Set();
  equal(s.toLaTeX(), '\\{2, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (set)');
  equal(e.toLaTeX(), '\\emptyset', 'Testing .toLaTeX() (empty set)');
});


test('.toMathMLString()', 2, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
      e = new MathLib.Set();
  equal(s.toMathMLString(), '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathMLString() (set)');
  equal(e.toMathMLString(), '<mi>&#x2205;</mi>', 'Testing .toMathMLString() (empty set)');
});


test('.toString()', 2, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
      e = new MathLib.Set();
  equal(s.toString(), '(2, 3, 4, 8, 9)', 'Testing .toString() (set)');
  equal(e.toString(), '∅', 'Testing .toString() (empty set)');
});


test('.union()', 1, function () {
  var s = new MathLib.Set([1, 2, 3, 4]),
      m = new MathLib.Set([1, 3, 5, 7]);
  deepEqual(s.union(m), new MathLib.Set([1, 2, 3, 4, 5, 7]), 'Testing .union() (set)');
});


test('.without()', 1, function () {
  var s = new MathLib.Set([1, 2, 3, 4]),
      m = new MathLib.Set([1, 3, 5, 7]);
  deepEqual(s.without(m), new MathLib.Set([2, 4]), 'Testing .without() (set)');
});


test('.xor()', 1, function () {
  var s = new MathLib.Set([1, 2, 3, 4]),
      m = new MathLib.Set([1, 3, 5, 7]);
  deepEqual(s.xor(m), new MathLib.Set([2, 4, 5, 7]), 'Testing .xor() (set)');
});



// Static methods
test('fromTo()', 1, function () {
  deepEqual(new MathLib.Set.fromTo(1, 5, 2), new MathLib.Set([1, 3, 5]), 'Testing new MathLib.Set.fromTo()');
});
