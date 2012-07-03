module('Set');
test('init', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equal(s.card,     5,     'Testing the cardinality');
  equal(s.multiset, false, 'Testing .multiset');
  equal(m.card,     7,     'Testing the cardinality');
  equal(m.multiset, true,  'Testing .multiset');
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
test('.arithMean()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equal(s.arithMean(),  26 / 5, 'Testing .arithMean() (set)');
  equal(m.arithMean(),  31 / 7, 'Testing .arithMean() (multiset)');
});


test('.compare()', 3, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]),
      n = MathLib.set([1, 2, 3, 4, 5]);
  deepEqual(s.compare(s),  0, '.compare()');
  deepEqual(s.compare(m),  -1, '.compare()');
  deepEqual(m.compare(n),  -1, '.compare()');
});


test('.geoMean()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equal(s.geoMean(),  Math.pow(1728, 1 / 5), 'Testing .geoMean() (set)');
  equal(m.geoMean(),  Math.pow(10368, 1 / 7), 'Testing .geoMean() (multiset)');
});


test('.harmonicMean()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equal(s.harmonicMean(),  3.7894736842105265, 'Testing .geoMean() (set)');
  equal(m.harmonicMean(),  3.2516129032258068, 'Testing .geoMean() (multiset)');
});


test('.insert()', 8, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);

  deepEqual(s.insert(1), [1, 2, 3, 4, 8, 9], 'Testing .locate() (set, front)');
  deepEqual(s.insert(3), [1, 2, 3, 4, 8, 9], 'Testing .locate() (set, existing)');
  deepEqual(s.insert(5), [1, 2, 3, 4, 5, 8, 9], 'Testing .locate() (set, not existing)');
  deepEqual(s.insert(10), [1, 2, 3, 4, 5, 8, 9, 10], 'Testing .locate() (set, back)');

  deepEqual(m.insert(1), [1, 2, 2, 3, 3, 4, 8, 9], 'Testing .locate() (multiset, front)');
  deepEqual(m.insert(3), [1, 2, 2, 3, 3, 3, 4, 8, 9], 'Testing .locate() (multiset, existing)');
  deepEqual(m.insert(5), [1, 2, 2, 3, 3, 3, 4, 5, 8, 9], 'Testing .locate() (multiset, not existing)');
  deepEqual(m.insert(10), [1, 2, 2, 3, 3, 3, 4, 5, 8, 9, 10], 'Testing .locate() (multiset, back)');
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


test('.max()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equal(s.max(),  9, 'Testing .max() (set)');
  equal(s.max(3), 4, 'Testing .max(3) (set)');
  equal(m.max(),  9, 'Testing .max() (multiset)');
  equal(m.max(3), 4, 'Testing .max(3) (multiset)');
});


test('.min()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equal(s.min(),  2, 'Testing .min() (set)');
  equal(s.min(3), 4, 'Testing .min(3) (set)');
  equal(m.min(),  2, 'Testing .min() (multiset)');
  equal(m.min(3), 3, 'Testing .min(3) (multiset)');
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


test('.toArray()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      n = MathLib.set();
  deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray() (set)');
  deepEqual(m.toArray(), [2, 2, 3, 3, 4, 8, 9], 'Testing .toArray() (multiset)');
  deepEqual(n.toArray(), [], 'Testing .toArray() (empty set)');
});


test('.toContentMathML()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equal(s.toContentMathML(),  '<set><cn>2</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathML() (set)');
  equal(m.toContentMathML(),  '<set><cn>2</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathML() (multiset)');
  equal(e.toContentMathML(),  '<emptyset/>', 'Testing .toContentMathML() (empty set)');
});


test('.toLaTeX()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equal(s.toLaTeX(),  '\\{2, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (set)');
  equal(m.toLaTeX(),  '\\{2, 2, 3, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (multiset)');
  equal(e.toLaTeX(),  '\\emptyset', 'Testing .toLaTeX() (empty set)');
});


test('.toMathML()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equal(s.toMathML(),  '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathML() (set)');
  equal(m.toMathML(),  '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathML() (multiset)');
  equal(e.toMathML(),  '<mi>&#x2205;</mi>', 'Testing .toMathML() (empty set)');
});


test('.toMultiset()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = s.toMultiset();
  deepEqual(m.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray()');
  equal(m.multiset, true, 'Testing .multiset');
});


test('.toSet()', 2, function () {
  var m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      s = m.toSet();
  deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray()');
  equal(s.multiset, false, 'Testing .multiset');
});


test('.toString()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      e = MathLib.set(),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equal(s.toString(),  '(2, 3, 4, 8, 9)', 'Testing .toString() (set)');
  equal(e.toString(),  '∅', 'Testing .toString() (empty set)');
  equal(m.toString(),  '(2, 2, 3, 3, 4, 8, 9)', 'Testing .toString() (multiset)');
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
