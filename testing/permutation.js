module('Permutation');
test('init', 1, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]),
      q = MathLib.permutation([[0, 1], [2, 3]]);
  equal(p.type, 'permutation', 'Testing .type');
});



// Properties
test('.constructor', 1, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]);
  equal(p.constructor, MathLib.permutation, 'Testing .constructor');
});


test('.type', 1, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]);
  equal(p.type, 'permutation', 'Testing .type');
});



// Methods
test('.applyTo()', 6, function () {
  var p = MathLib.permutation([[0, 1, 2], [0, 1, 2]]),
      r = MathLib.permutation([0, 2, 1]),
      q = MathLib.permutation([]),
      v = MathLib.vector([1, 2, 3]);

  equal(p.applyTo(0), 2, 'Testing .applyTo()');
  equal(p.applyTo(3), 3, 'Testing .applyTo()');
  deepEqual(r.applyTo(v), MathLib.vector([1, 3, 2]), 'Testing .applyTo()');
  equal(r.applyTo(v).type, 'vector', 'Testing .applyTo()');
  deepEqual(r.applyTo([1, 2, 3]), [1, 3, 2], 'Testing .applyTo()');
  equal(q.applyTo(1), 1, 'Testing .applyTo() with id');
});


test(".map()", 2, function () {
  var p = MathLib.permutation([1, 2, 3]),
      q = MathLib.permutation([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'permutation', ".type should be permutation");
});


test('.times()', 1, function () {
  var p = MathLib.permutation([2, 0, 1]),
      q = MathLib.permutation([0, 2, 1]);
  deepEqual(p.times(q), [2, 1, 0], 'Testing .times()');
});


test('.sgn()', 2, function () {
  var p = MathLib.permutation([[0, 1], [1, 2]]),
      q = MathLib.permutation([[0, 1], [1, 2, 3]]);
  equal(p.sgn(), 1, 'Testing .sgn()');
  equal(q.sgn(), -1, 'Testing .sgn()');
});


test('.toMatrix()', 2, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]),
      q = MathLib.permutation([]),
      pm = MathLib.matrix([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]]),
      qm = MathLib.matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
  deepEqual(p.toMatrix(), pm, 'Testing .toMatrix()');
  deepEqual(q.toMatrix(4), qm, 'Testing .toMatrix() with id permutation');
});


test('.toString()', 2, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]),
      q = MathLib.permutation([]);
  equal(p.toString(), '(0,1)(2,3)', 'Testing .toString()');
  equal(q.toString(), '', 'Testing .toString() with id permutation');
});



// Static Methods
test('cycleToList()', 2, function () {
  var p = [[0, 1, 2], [3, 4]],
      q = [[0, 1], [2, 3]];
  deepEqual(MathLib.permutation.cycleToList(p), [1, 2, 0, 4, 3], 'Testing .cycleToList()');
  deepEqual(MathLib.permutation.cycleToList(q), [1, 0, 3, 2], 'Testing .cycleToList()');
});


test('listToCycle()', 1, function () {
  var p = [1, 2, 0, 4, 3];
  deepEqual(MathLib.permutation.listToCycle(p), [[0, 1, 2], [3, 4]], 'Testing .listToCycle()');
});
