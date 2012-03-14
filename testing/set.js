module('Set');
test('init', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.card,     5,     'Testing the cardinality');
  equals(s.multiset, false, 'Testing .multiset');
  equals(m.card,     7,     'Testing the cardinality');
  equals(m.multiset, true,  'Testing .multiset');
});


test('.and()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.and(m),  [1, 3], 'Testing .and() (set)');
});


test('.arithMean()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.arithMean(),  26 / 5, 'Testing .arithMean() (set)');
  equals(m.arithMean(),  31 / 7, 'Testing .arithMean() (multiset)');
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
  equals(s.geoMean(),  Math.pow(1728, 1 / 5), 'Testing .geoMean() (set)');
  equals(m.geoMean(),  Math.pow(10368, 1 / 7), 'Testing .geoMean() (multiset)');
});


test('.harmonicMean()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.harmonicMean(),  3.7894736842105265, 'Testing .geoMean() (set)');
  equals(m.harmonicMean(),  3.2516129032258068, 'Testing .geoMean() (multiset)');
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


test('.isEmpty()', 3, function () {
  var m = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      n = MathLib.set(),
      o = MathLib.set([]);
  equals(m.isEmpty(), false, 'Testing .min()');
  equals(n.isEmpty(), true, 'Testing .min(3)');
  equals(o.isEmpty(), true, 'Testing .min(3)');
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

  equals(m.isSubsetOf(s),  true, 'Testing .isSubsetOf()');
  equals(n.isSubsetOf(s),  false, 'Testing .isSubsetOf()');
});


test('.locate()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  equals(s.locate(1), 0, 'Testing .locate()');
  equals(s.locate(3), 1, 'Testing .locate()');
  equals(s.locate(5), 3, 'Testing .locate()');
  equals(s.locate(10), 5, 'Testing .locate()');
});


test(".map()", 2, function () {
  var p = MathLib.set([1, 2, 3]),
      q = MathLib.set([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equals(res.type, 'set', ".type should be set");
});


test('.max()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.max(),  9, 'Testing .max() (set)');
  equals(s.max(3), 4, 'Testing .max(3) (set)');
  equals(m.max(),  9, 'Testing .max() (multiset)');
  equals(m.max(3), 4, 'Testing .max(3) (multiset)');
});


test('.min()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.min(),  2, 'Testing .min() (set)');
  equals(s.min(3), 4, 'Testing .min(3) (set)');
  equals(m.min(),  2, 'Testing .min() (multiset)');
  equals(m.min(3), 3, 'Testing .min(3) (multiset)');
});


test('.or()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.or(m),  [1, 2, 3, 4, 5, 7], 'Testing .or() (set)');
});


test('.plus()', 3, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 2, 3, 4, 5, 6]);
  equals(s.plus(), 10, 'Testing .plus() (set)');
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
  equals(s.times(), 24, 'Testing .times() (set)');
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
  equals(s.toContentMathML(),  '<set><cn>2</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathML() (set)');
  equals(m.toContentMathML(),  '<set><cn>2</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathML() (multiset)');
  equals(e.toContentMathML(),  '<emptyset/>', 'Testing .toContentMathML() (empty set)');
});


test('.toLaTeX()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equals(s.toLaTeX(),  '\\{2, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (set)');
  equals(m.toLaTeX(),  '\\{2, 2, 3, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (multiset)');
  equals(e.toLaTeX(),  '\\emptyset', 'Testing .toLaTeX() (empty set)');
});


test('.toMathML()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equals(s.toMathML(),  '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathML() (set)');
  equals(m.toMathML(),  '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathML() (multiset)');
  equals(e.toMathML(),  '<mi>&#x2205;</mi>', 'Testing .toMathML() (empty set)');
});


test('.toMultiset()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = s.toMultiset();
  deepEqual(m.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray()');
  equals(m.multiset, true, 'Testing .multiset');
});


test('.toSet()', 2, function () {
  var m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      s = m.toSet();
  deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray()');
  equals(s.multiset, false, 'Testing .multiset');
});


test('.toString()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      e = MathLib.set(),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.toString(),  '(2, 3, 4, 8, 9)', 'Testing .toString() (set)');
  equals(e.toString(),  '∅', 'Testing .toString() (empty set)');
  equals(m.toString(),  '(2, 2, 3, 3, 4, 8, 9)', 'Testing .toString() (multiset)');
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

test('fromTo()', 1, function () {
  deepEqual(MathLib.set.fromTo(1, 5, 2),  [1, 3, 5], 'Testing MathLib.set.fromTo()');
});

test('constructor', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]);
  equals(s.constructor, MathLib.set, 'Testing .constructor');
});

test('type', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]);
  equals(s.type, 'set', 'Testing .type');
});

