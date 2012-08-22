/*! MathLib v0.3.3 MathLib.de | MathLib.de/en/license */

module("MathLib");
test("general", 1, function () {
  equal(typeof MathLib, 'object', "is MathLib defined");
});


// Static methods
test('.abs()', 7, function () {
  equal(MathLib.abs(2), 2, 'MathLib.abs(2) should be 2');
  equal(MathLib.abs(-2), 2, 'MathLib.abs(-2) should be 2');
  equal(MathLib.abs(+Infinity), +Infinity, 'MathLib.abs(+Infinity) should be +Infinity');
  equal(MathLib.abs(-Infinity), +Infinity, 'MathLib.abs(-Infinity) should be +Infinity');
  equal(MathLib.isPosZero(MathLib.abs(+0)), true, 'MathLib.abs(Infinity) should be +0');
  equal(MathLib.isPosZero(MathLib.abs(-0)), true, 'MathLib.abs(-Infinity) should be +0');
  equal(MathLib.isNaN(MathLib.abs(NaN)), true, 'MathLib.abs(NaN) should be NaN');
});


test('.arccos()', 4, function () {
  equal(MathLib.arccos(0), Math.PI / 2);
  equal(MathLib.arccos(1), 0);
  equal(MathLib.arccos(MathLib.complex([3, 4])).isEqual(MathLib.complex([0.9368124611557207, -2.305509031243476942041])), true);
  deepEqual(MathLib.arccos(NaN), NaN);
});


test('.arccot()', 3, function () {
  equal(MathLib.arccot(0), Math.PI / 2);
  equal(MathLib.arccot(1), Math.PI / 4);
  deepEqual(MathLib.arccot(NaN), NaN);
});


test('.arccsc()', 2, function () {
  equal(MathLib.arccsc(1), Math.PI / 2);
  deepEqual(MathLib.arccsc(NaN), NaN);
});


test('.arcosh()', 2, function () {
  equal(MathLib.arcosh(1), 0);
  deepEqual(MathLib.arcosh(NaN), NaN);
});


test('.arcoth()', 2, function () {
  equal(MathLib.arcoth(1), Infinity);
  deepEqual(MathLib.arcoth(NaN), NaN);
});


test('.arcsch()', 2, function () {
  equal(MathLib.arcsch(1), 0.8813735870195429);
  deepEqual(MathLib.arcsch(NaN), NaN);
});


test('.arcsec()', 2, function () {
  equal(MathLib.arcsec(1), 0);
  deepEqual(MathLib.arcsec(NaN), NaN);
});


test('.arcsin()', 4, function () {
  equal(MathLib.arcsin(0), 0);
  equal(MathLib.arcsin(1), Math.PI / 2);
  equal(MathLib.isEqual(MathLib.arcsin(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041])), true);
  deepEqual(MathLib.arcsin(NaN), NaN);
});


test('.arctan()', 3, function () {
  equal(MathLib.arctan(0), 0);
  equal(MathLib.arctan(1), Math.PI / 4);
  deepEqual(MathLib.arctan(NaN), NaN);
});


test('.arsech()', 3, function () {
  equal(MathLib.arsech(0), Infinity);
  equal(MathLib.arsech(1), 0);
  deepEqual(MathLib.arsech(NaN), NaN);
});


test('.arsinh()', 3, function () {
  equal(MathLib.arsinh(0), 0);
  equal(MathLib.arsinh(1), 0.8813735870195429);
  deepEqual(MathLib.arsinh(NaN), NaN);
});


test('.artanh()', 3, function () {
  equal(MathLib.artanh(0), 0);
  equal(MathLib.artanh(1), Infinity);
  deepEqual(MathLib.artanh(NaN), NaN);
});


test('.arctan2()', 24, function () {
  equal(MathLib.arctan2(1, 1), Math.PI/4, 'simple check');
  equal(MathLib.arctan2(-1, 1), -Math.PI/4, 'simple check');

  // arctan2(&plusmn;0, -0) is &plusmn;&pi;
  equal(MathLib.arctan2(+0, -0), Math.PI, 'Spec. 1: arctan2(&plusmn;0, -0) is &plusmn;&pi;');
  equal(MathLib.arctan2(-0, -0), -Math.PI, 'Spec. 1: arctan2(&plusmn;0, -0) is &plusmn;&pi;');

  // arctan2(&plusmn;0, +0) is &plusmn;0
  equal(MathLib.isPosZero(MathLib.arctan2(+0, 0)), true, 'Spec. 2: arctan2(&plusmn;0, +0) is &plusmn;0');
  equal(MathLib.isNegZero(MathLib.arctan2(-0, 0)), true, 'Spec. 2: arctan2(&plusmn;0, +0) is &plusmn;0');

  // arctan2(&plusmn;0, x) is &plusmn;&pi; for x<0
  equal(MathLib.arctan2(+0, -4), Math.PI, 'Spec. 3: arctan2(&plusmn;0, x) is &plusmn;&pi; for x<0');
  equal(MathLib.arctan2(-0, -4), -Math.PI, 'Spec. 3: arctan2(&plusmn;0, x) is &plusmn;&pi; for x<0');

  // arctan2(&plusmn;0, x) is &plusmn;0 for x>0
  equal(MathLib.isPosZero(MathLib.arctan2(+0, 4)), true, 'Spec. 4: arctan2(&plusmn;0, x) is &plusmn;0 for x>0');
  equal(MathLib.isNegZero(MathLib.arctan2(-0, 4)), true, 'Spec. 4: arctan2(&plusmn;0, x) is &plusmn;0 for x>0');

  // arctan2(y, &plusmn;0) is -&pi;/2 for y < 0
  equal(MathLib.arctan2(-4, 0), -Math.PI/2, 'Spec. 5: arctan2(y, &plusmn;0) is -&pi;/2 for y < 0');
  equal(MathLib.arctan2(-4, -0), -Math.PI/2, 'Spec. 5: arctan2(y, &plusmn;0) is -&pi;/2 for y < 0');

  // arctan2(y, &plusmn;0) is +&pi;/2 for y > 0
  equal(MathLib.arctan2(4, 0), Math.PI/2, 'Spec. 6: arctan2(y, &plusmn;0) is +&pi;/2 for y > 0');
  equal(MathLib.arctan2(4, -0), Math.PI/2, 'Spec. 6: arctan2(y, &plusmn;0) is +&pi;/2 for y > 0');

  // arctan2(&plusmn;y, -&infin;) is &plusmn;&pi; for finite y > 0
  equal(MathLib.arctan2(4, -Infinity), Math.PI, 'Spec. 7: arctan2(&plusmn;y, -&infin;) is &plusmn;&pi; for finite y > 0');
  equal(MathLib.arctan2(-4, -Infinity), -Math.PI, 'Spec. 7: arctan2(&plusmn;y, -&infin;) is &plusmn;&pi; for finite y > 0');

  // arctan2(&plusmn;y, +&infin;) is &plusmn;0 for finite y > 0
  equal(MathLib.isPosZero(MathLib.arctan2(4, Infinity)), true, 'Spec. 8: arctan2(&plusmn;y, +&infin;) is &plusmn;0 for finite y > 0');
  equal(MathLib.isNegZero(MathLib.arctan2(-4, Infinity)), true, 'Spec. 8: arctan2(&plusmn;y, +&infin;) is &plusmn;0 for finite y > 0');

  // arctan2(&plusmn;&infin;, x) is &plusmn;&pi;/2 for finite x
  equal(MathLib.arctan2(Infinity, 4), Math.PI/2, 'Spec. 9: arctan2(&plusmn;&infin;, x) is &plusmn;&pi;/2 for finite x');
  equal(MathLib.arctan2(-Infinity, 4), -Math.PI/2, 'Spec. 9: arctan2(&plusmn;&infin;, x) is &plusmn;&pi;/2 for finite x');

  // arctan2(&plusmn;&infin;, -&infin;) is &plusmn;3&pi;/4
  equal(MathLib.arctan2(Infinity, -Infinity), 3/4*Math.PI, 'Spec. 10: arctan2(&plusmn;&infin;, -&infin;) is &plusmn;3&pi;/4');
  equal(MathLib.arctan2(-Infinity, -Infinity), -3/4*Math.PI, 'Spec. 10: arctan2(&plusmn;&infin;, -&infin;) is &plusmn;3&pi;/4');

  // arctan2(&plusmn;&infin;, +&infin;) is &plusmn;&pi;/4
  equal(MathLib.arctan2(Infinity, Infinity), Math.PI/4, 'Spec. 11: arctan2(&plusmn;&infin;, +&infin;) is &plusmn;&pi;/4');
  equal(MathLib.arctan2(-Infinity, Infinity), -Math.PI/4, 'Spec. 11: arctan2(&plusmn;&infin;, +&infin;) is &plusmn;&pi;/4');
});


test('.binomial()', 4, function () {
  equal(MathLib.binomial(0, 0), 1);
  equal(MathLib.binomial(6, 3), 20);
  equal(MathLib.binomial(2, 4), 0);
  equal(MathLib.binomial(-4, 3), -20);
});


test('.cbrt()', 7, function () {
  equal(MathLib.cbrt(8), 2, 'cbrt(8) = 2');
  equal(MathLib.cbrt(-8), -2, 'cbrt(-8) = -2');
  equal(MathLib.cbrt(Infinity), Infinity, 'cbrt(Infinity) = Infinity');
  equal(MathLib.cbrt(-Infinity), -Infinity, 'cbrt(-Infinity) = -Infinity');
  equal(MathLib.isPosZero(MathLib.cbrt(+0)), true, 'cbrt(+0) = +0');
  equal(MathLib.isNegZero(MathLib.cbrt(-0)), true, 'cbrt(-0) = -0');
  equal(MathLib.isNaN(MathLib.cbrt(NaN)), true, 'cbrt(NaN) = NaN');
});


test('ceil()', 7, function () {
  equal(MathLib.ceil(1.5), 2, 'MathLib.ceil(1.5) should be 2');
  equal(MathLib.ceil(-1.5), -1, 'MathLib.ceil(-1.5) should be -1');
  equal(MathLib.ceil(+Infinity), +Infinity, 'MathLib.ceil(+Infinity) should be +Infinity');
  equal(MathLib.ceil(-Infinity), -Infinity, 'MathLib.ceil(-Infinity) should be -Infinity');
  equal(MathLib.isPosZero(MathLib.ceil(+0)), true, 'MathLib.ceil(+0) should be +0');
  equal(MathLib.isNegZero(MathLib.ceil(-0)), true, 'MathLib.ceil(-0) should be -0');
  equal(MathLib.isNaN(MathLib.ceil(NaN)), true, 'MathLib.ceil(NaN) should be NaN');
});


test('.compare()', 3, function () {
  equal(MathLib.compare(12, 12), 0);
  equal(MathLib.compare(1, 2), -1);
  equal(MathLib.compare(23, MathLib.complex([3, 4])), 1);
});


test('cos()', 5, function () {
  equal(MathLib.cos(0), 1, 'MathLib.cos(0) should be 1');
  equal(MathLib.cos(Math.PI), -1, 'MathLib.cos(Math.PI) should be -1');
  equal(MathLib.isNaN(MathLib.cos(Infinity)), true, 'MathLib.cos(Infinity) should be NaN');
  equal(MathLib.isNaN(MathLib.cos(-Infinity)), true, 'MathLib.cos(-Infinity) should be NaN');
  equal(MathLib.isNaN(MathLib.cos(NaN)), true, 'MathLib.cos(NaN) should be NaN');
});


test('.exp()', 5, function () {
  equal(MathLib.isNaN(MathLib.exp(NaN)), true);
  equal(MathLib.exp(-Infinity), 0);
  equal(MathLib.exp(+Infinity), Infinity);
  equal(MathLib.exp(0), 1);
  equal(MathLib.exp(1), Math.E);
});


test('.factor()', 2, function () {
  deepEqual(MathLib.factor(12), MathLib.set([2, 2, 3], true));
  deepEqual(MathLib.factor(-15), MathLib.set([3, 5], true));
});


test('.factorial()', 1, function () {
  equal(MathLib.factorial(6), 720);
});


test('.fallingFactorial()', 4, function () {
  equal(MathLib.fallingFactorial(2, 0), 1);
  equal(MathLib.fallingFactorial(6, 3), 120);
  equal(MathLib.fallingFactorial(2, 4), 0);
  equal(MathLib.fallingFactorial(4, 3, 0.5), 4 * 3.5 * 3);
});


test('.fibonacci()', 1, function () {
  equal(MathLib.fibonacci(4), 3, 'Is the fourth fibonacci number 3?');
});


test('.floor()', 7, function () {
  equal(MathLib.floor(1.5), 1, 'MathLib.floor(1.5) should be 1');
  equal(MathLib.floor(-1.5), -2, 'MathLib.floor(-1.5) should be -2');
  equal(MathLib.floor(+Infinity), +Infinity, 'MathLib.floor(+Infinity) should be +Infinity');
  equal(MathLib.floor(-Infinity), -Infinity, 'MathLib.floor(-Infinity) should be -Infinity');
  equal(MathLib.isPosZero(MathLib.floor(+0)), true, 'MathLib.floor(+0) should be +0');
  equal(MathLib.isNegZero(MathLib.floor(-0)), true, 'MathLib.floor(-0) should be -0');
  equal(MathLib.isNaN(MathLib.floor(NaN)), true, 'MathLib.floor(NaN) should be NaN');
});


test('.hypot()', 9, function () {
  equal(MathLib.isEqual(MathLib.hypot(3), 3), true, 'MathLib.hypot(x) is Math.abs(x)');
  equal(MathLib.isEqual(MathLib.hypot(-3), 3), true, 'MathLib.hypot(x) is Math.abs(x)');
  equal(MathLib.isEqual(MathLib.hypot(3, 4), 5), true);
  equal(MathLib.isEqual(MathLib.hypot(3, 4, 12), 13), true);
  equal(MathLib.isPosZero(MathLib.hypot(0, 0)), true);
  deepEqual(MathLib.hypot(NaN, 4), NaN);
  equal(MathLib.hypot(NaN, Infinity), Infinity);
  equal(MathLib.hypot(-Infinity, NaN), Infinity);
  equal(MathLib.hypot(Infinity, 4), Infinity);
});


test('.hypot2()', 6, function () {
  equal(MathLib.isEqual(MathLib.hypot2(3, 4), 25), true);
  equal(MathLib.isEqual(MathLib.hypot2(3, 4, 12), 169), true);
  deepEqual(MathLib.hypot2(NaN, 4), NaN);
  equal(MathLib.hypot2(NaN, Infinity), Infinity);
  equal(MathLib.hypot2(-Infinity, NaN), Infinity);
  equal(MathLib.hypot2(Infinity, 4), Infinity);
});


test('.inverse()', 2, function () {
  equal(MathLib.inverse(2), 0.5, 'MathLib.inverse(2) should be 0.5');
  equal(MathLib.isNaN(MathLib.inverse(NaN)), true, 'MathLib.inverse(NaN) should be NaN');
  // What makes most sense to return Infinity, NaN, undefined, ...?
  // I'm not convinced by Infinity, because it is not the inverse.
  // equal(MathLib.inverse(0), );
});


test('.is()', 13, function () {
  var p = MathLib.point([1, 2, 3]),
      v = MathLib.vector([1, 2, 3]);
  equal(MathLib.is(2, 'number'), true);
  equal(MathLib.is(p, 'point'), true);
  equal(MathLib.is(p, 'vector'), true);
  equal(MathLib.is(p, 'array'), true);
  equal(MathLib.is(p, 'object'), true);
  equal(MathLib.is(p, 'line'), false);
  equal(MathLib.is(v, 'vector'), true);
  equal(MathLib.is(v, 'point'), false);
  equal(MathLib.is([], 'array'), true);
  equal(MathLib.is(function(){}, 'function'), true);
  equal(MathLib.is({}, 'null'), false);
  equal(MathLib.is(null, 'null'), true);
  equal(MathLib.is(undefined, 'undefined'), true);

});


test('.isFinite()', 4, function () {
  equal(MathLib.isFinite(2), true);
  equal(MathLib.isFinite(NaN), false);
  equal(MathLib.isFinite(+Infinity), false);
  equal(MathLib.isFinite(-Infinity), false);
});


test('.isInt()', 2, function () {
  equal(MathLib.isInt(2), true);
  equal(MathLib.isInt(2.5), false);
});


test('.isNaN()', 2, function () {
  equal(MathLib.isNaN(NaN), true);
  equal(MathLib.isNaN(2), false);
});


test('.isNegZero()', 2, function () {
  equal(MathLib.isNegZero(-0), true);
  equal(MathLib.isNegZero(+0), false);
});


test('.isOne()', 2, function () {
  equal(MathLib.isOne(1), true);
  equal(MathLib.isOne(2), false);
});


test('.isPosZero()', 2, function () {
  equal(MathLib.isPosZero(+0), true);
  equal(MathLib.isPosZero(-0), false);
});


test('.isPrime()', 2, function () {
  equal(MathLib.isPrime(4567), true);
  equal(MathLib.isPrime(112), false);
});


test('.isZero()', 2, function () {
  equal(MathLib.isZero(0), true);
  equal(MathLib.isZero(1), false);
});


test('.ln()', 8, function () {
  equal(MathLib.ln(1), 0, 'MathLib.ln(1) should be 0');
  equal(MathLib.ln(Math.E), 1, 'MathLib.ln(Math.E) should be 1');
  equal(MathLib.ln(+Infinity), +Infinity, 'MathLib.ln(+Infinity) should be +Infinity');
  equal(MathLib.ln(+0), -Infinity, 'MathLib.ln(+0) should be -Infinity');
  equal(MathLib.ln(-0), -Infinity, 'MathLib.ln(-0) should be -Infinity');
  equal(MathLib.isNaN(MathLib.ln(-4)), true, 'MathLib.ln(-4) should be NaN');
  equal(MathLib.isNaN(MathLib.ln(-Infinity)), true, 'MathLib.ln(-Infinity) should be NaN');
  equal(MathLib.isNaN(MathLib.ln(NaN)), true, 'MathLib.ln(NaN) should be NaN');
});


test('.max()', 2, function () {
  equal(MathLib.max([1, 42, 17, 4]), 42);
  equal(MathLib.max([1, 42, 17, 4], 2), 17);
});

test('.plus()', 2, function () {
  equal(MathLib.plus(1, 2), 3);
  deepEqual(MathLib.plus(MathLib.matrix.identity(3), MathLib.matrix.identity(3)), MathLib.matrix([[2,0,0],[0,2,0],[0,0,2]]));
});

test('pow()', 65, function () {
  equal(MathLib.pow(2, 3), 8, 'simple check');
  equal(MathLib.pow(2, -3), 0.125, 'simple check');

  //  1. MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or infinity)
  equal(MathLib.pow(1, +0), 1, 'Specification: 1.');
  equal(MathLib.pow(0, +0), 1, 'Specification: 1.');
  equal(MathLib.pow(-0, +0), 1, 'Specification: 1.');
  equal(MathLib.pow(NaN, +0), 1, 'Specification: 1.');
  equal(MathLib.pow(Infinity, +0), 1, 'Specification: 1.');
  equal(MathLib.pow(-Infinity, +0), 1, 'Specification: 1.');
  equal(MathLib.pow(1, -0), 1, 'Specification: 1.');
  equal(MathLib.pow(0, -0), 1, 'Specification: 1.');
  equal(MathLib.pow(-0, -0), 1, 'Specification: 1.');
  equal(MathLib.pow(NaN, -0), 1, 'Specification: 1.');
  equal(MathLib.pow(Infinity, -0), 1, 'Specification: 1.');
  equal(MathLib.pow(-Infinity, -0), 1, 'Specification: 1.');

  //  2. MathLib.pow (&plusmn;0, y) = &plusmn;&infin; (for y an odd integer < 0)
  equal(MathLib.pow(+0, -5), +Infinity, 'Specification: 2.');
  equal(MathLib.pow(-0, -5), -Infinity, 'Specification: 2.');

  //  3. MathLib.pow(&plusmn;0, -&infin;) = +&infin;.
  equal(MathLib.pow(+0, -Infinity), Infinity, 'Specification: 3.');
  equal(MathLib.pow(-0, -Infinity), Infinity, 'Specification: 3.');

  //  4. MathLib.pow(&plusmn;0, +&infin;) = +0.
  equal(MathLib.isPosZero(MathLib.pow(+0, Infinity)), true, 'Specification: 4.');
  equal(MathLib.isPosZero(MathLib.pow(-0, Infinity)), true, 'Specification: 4.');

  //  5. MathLib.pow (&plusmn;0, y) = +&infin; (for finite y < 0 and not an odd integer)
  equal(MathLib.pow(+0, -4), +Infinity, 'Specification: 5.');
  equal(MathLib.pow(-0, -4), +Infinity, 'Specification: 5.');
  equal(MathLib.pow(+0, -5.5), +Infinity, 'Specification: 5.');
  equal(MathLib.pow(-0, -5.5), +Infinity, 'Specification: 5.');

  //  6. MathLib.pow (&plusmn;0, y) = &plusmn;0 (for finite y > 0 an odd integer)
  equal(MathLib.isPosZero(MathLib.pow(+0, 5)), true, 'Specification: 6.');
  equal(MathLib.isNegZero(MathLib.pow(-0, 5)), true, 'Specification: 6.');

  //  7. MathLib.pow (&plusmn;0, y) = +0 (for finite y > 0 and not an odd integer)
  equal(MathLib.isPosZero(MathLib.pow(+0, 4)), true, 'Specification: 7.');
  equal(MathLib.isPosZero(MathLib.pow(-0, 4)), true, 'Specification: 7.');
  equal(MathLib.isPosZero(MathLib.pow(+0, 5.5)), true, 'Specification: 7.');
  equal(MathLib.isPosZero(MathLib.pow(-0, 5.5)), true, 'Specification: 7.');

  //  8. MathLib.pow(-1, &plusmn;&infin;) = 1
  equal(MathLib.pow(-1, +Infinity), 1, 'Specification: 8.');
  equal(MathLib.pow(-1, -Infinity), 1, 'Specification: 8.');

  //  9. MathLib.pow(+1, y) = 1 (for any y, even &plusmn;&infin; and NaN)
  equal(MathLib.pow(1, 2), 1, 'Specification: 9.');
  equal(MathLib.pow(1, -2), 1, 'Specification: 9.');
  equal(MathLib.pow(1, +Infinity), 1, 'Specification: 9.');
  equal(MathLib.pow(1, -Infinity), 1, 'Specification: 9.');
  equal(MathLib.pow(1, NaN), 1, 'Specification: 9.');

  // 10. MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)
  equal(MathLib.isNaN(MathLib.pow(-2, 2.5)), true, 'Specification: 10.');
  equal(MathLib.isNaN(MathLib.pow(-2, 2.5)), true, 'Specification: 10.');


  // 11. MathLib.pow(x, +&infin;) = +&infin; (for |x| > 1)
  equal(MathLib.pow(3, Infinity), Infinity, 'Specification: 11.');
  equal(MathLib.pow(-3, Infinity), Infinity, 'Specification: 11.');

  // 12. MathLib.pow(x, -&infin;) = +0 (for |x| > 1)
  equal(MathLib.isPosZero(MathLib.pow(3, -Infinity)), true, 'Specification: 12.');
  equal(MathLib.isPosZero(MathLib.pow(-3, -Infinity)), true, 'Specification: 12.');

  // 13. MathLib.pow(x, +&infin;) = +0 (for |x| < 1)
  equal(MathLib.isPosZero(MathLib.pow(0.5, +Infinity)), true, 'Specification: 13.');
  equal(MathLib.isPosZero(MathLib.pow(-0.5, +Infinity)), true, 'Specification: 13.');

  // 14. MathLib.pow(x, -&infin;) = +&infin; (for |x| < 1)
  equal(MathLib.pow(0.5, -Infinity), Infinity, 'Specification: 14.');
  equal(MathLib.pow(-0.5, -Infinity), Infinity, 'Specification: 14.');

  // 15. MathLib.pow(+&infin;, y) = +&infin; (for y > 0)
  equal(MathLib.pow(+Infinity, 2), Infinity, 'Specification: 15.');
  equal(MathLib.pow(+Infinity, 2), Infinity, 'Specification: 15.');
 
  // 16. MathLib.pow(+&infin;, y) = +0 (for y < 0)
  equal(MathLib.isPosZero(MathLib.pow(+Infinity, -2)), true, 'Specification: 16.');
  equal(MathLib.isPosZero(MathLib.pow(+Infinity, -Infinity)), true, 'Specification: 16.');
  
  // 17. MathLib.pow(-&infin;, y) = MathLib.pow(-0, -y)
  equal(MathLib.pow(-Infinity, 2), Infinity, 'Specification: 17.');
  equal(MathLib.pow(-Infinity, +0), 1, 'Specification: 17.');
  equal(MathLib.pow(-Infinity, -0), 1, 'Specification: 17.');
  equal(MathLib.pow(-Infinity, Infinity), Infinity, 'Specification: 17.');
  equal(MathLib.pow(-Infinity, -Infinity), 0, 'Specification: 17.');

  // 18. MathLib.pow(NaN, y) = NaN (for all y except &plusmn;0)
  equal(MathLib.isNaN(MathLib.pow(NaN, 1)), true, 'Specification: 18.');
  equal(MathLib.isNaN(MathLib.pow(NaN, Infinity)), true, 'Specification: 18.');
  equal(MathLib.isNaN(MathLib.pow(NaN, -Infinity)), true, 'Specification: 18.');
  equal(MathLib.isNaN(MathLib.pow(NaN, NaN)), true, 'Specification: 18.');

  // 19. MathLib.pow(x, NaN) = NaN (for all x except +1)
  equal(MathLib.isNaN(MathLib.pow(2, NaN)), true, 'Specification: 19.');
  equal(MathLib.isNaN(MathLib.pow(Infinity, NaN)), true, 'Specification: 19.');
  equal(MathLib.isNaN(MathLib.pow(-Infinity, NaN)), true, 'Specification: 19.');
  equal(MathLib.isNaN(MathLib.pow(0, NaN)), true, 'Specification: 19.');
  equal(MathLib.isNaN(MathLib.pow(-0, NaN)), true, 'Specification: 19.');
});


test('.risingFactorial()', 3, function () {
  equal(MathLib.risingFactorial(2, 0), 1);
  equal(MathLib.risingFactorial(2, 3), 24);
  equal(MathLib.risingFactorial(3, 4, 0.5), 189);
});


test('.round()', 7, function () {
  equal(MathLib.round(1.5), 2, 'MathLib.round(1.5) should be 2');
  equal(MathLib.round(-1.5), -1, 'MathLib.round(-1.5) should be -1');
  equal(MathLib.round(+Infinity), +Infinity, 'MathLib.round(+Infinity) should be +Infinity');
  equal(MathLib.round(-Infinity), -Infinity, 'MathLib.round(-Infinity) should be -Infinity');
  equal(MathLib.isPosZero(MathLib.round(+0)), true, 'MathLib.round(+0) should be +0');
  equal(MathLib.isNegZero(MathLib.round(-0)), true, 'MathLib.round(-0) should be -0');
  equal(MathLib.isNaN(MathLib.round(NaN)), true, 'MathLib.round(NaN) should be NaN');
});


test('.sign()', 7, function () {
  // MathLib.sign(NaN) is NaN
  equal(MathLib.isNaN(MathLib.sign(NaN)), true, 'Spec. 1: MathLib.sign(NaN) is NaN');

  // MathLib.sign(0) is 0
  equal(MathLib.isPosZero(MathLib.sign(0)), true, 'Spec. 2: MathLib.sign(0) is 0');

  // MathLib.sign(-0) is -0
  equal(MathLib.isNegZero(MathLib.sign(-0)), true, 'Spec. 3: MathLib.sign(-0) is -0');

  // MathLib.sign(x) is 1 for x > 0
  equal(MathLib.sign(4), 1, 'Spec. 4: MathLib.sign(x) is 1 for x > 0');
  equal(MathLib.sign(Infinity), 1, 'Spec. 4: MathLib.sign(x) is 1 for x > 0');

  // MathLib.sign(x) is -1 for x < 0
  equal(MathLib.sign(-4), -1, 'Spec. 5: MathLib.sign(x) is -1 for x < 0');
  equal(MathLib.sign(-Infinity), -1, 'Spec. 5: MathLib.sign(x) is -1 for x < 0');
});


test('.sin()', 6, function () {
  equal(MathLib.sin(Math.PI / 2), 1, 'MathLib.sin(Math.PI / 2) should be 1');
  equal(MathLib.isPosZero(MathLib.sin(+0)), true, 'MathLib.sin(+0) should be +0');
  equal(MathLib.isNegZero(MathLib.sin(-0)), true, 'MathLib.sin(-0) should be -0');
  equal(MathLib.isNaN(MathLib.sin(Infinity)), true, 'MathLib.sin(Infinity) should be NaN');
  equal(MathLib.isNaN(MathLib.sin(-Infinity)), true, 'MathLib.sin(-Infinity) should be NaN');
  equal(MathLib.isNaN(MathLib.sin(NaN)), true, 'MathLib.sin(NaN) should be NaN');
});


test('.sqrt()', 8, function () {
  equal(MathLib.isNaN(MathLib.sqrt(NaN)), true, 'MathLib.sqrt(NaN) = NaN');
  equal(MathLib.isNaN(MathLib.sqrt(-Infinity)), true, 'MathLib.sqrt(-Infinity) = NaN');
  equal(MathLib.isNaN(MathLib.sqrt(-4)), true, 'MathLib.sqrt(-4) = NaN');
  equal(MathLib.isPosZero(MathLib.sqrt(+0)), true, 'MathLib.sqrt(+0) = -0');
  equal(MathLib.isPosZero(MathLib.sqrt(-0)), true, 'MathLib.sqrt(-0) = +0');
  equal(MathLib.sqrt(Infinity), Infinity, 'MathLib.sqrt(Infinity) = Infinity');
  equal(MathLib.sqrt(9), 3, 'MathLib.sqrt(9)');
  equal(MathLib.sqrt(2), 1.4142135623730950488016887242096980785696, 'MathLib.sqrt(2)');
});


test('tan()', 7, function () {
  equal(MathLib.isZero(MathLib.tan(Math.PI)), true, 'MathLib.tan(Math.PI) should be (more or less) 0');
  equal(MathLib.isOne(MathLib.tan(Math.PI/4)), true, 'MathLib.tan(Math.PI/4) should be (more or less) 1');
  equal(MathLib.isPosZero(MathLib.tan(+0)), true, 'MathLib.tan(+0) should be +0');
  equal(MathLib.isNegZero(MathLib.tan(-0)), true, 'MathLib.tan(-0) should be -0');
  equal(MathLib.isNaN(MathLib.tan(Infinity)), true, 'MathLib.tan(Infinity) should be NaN');
  equal(MathLib.isNaN(MathLib.tan(-Infinity)), true, 'MathLib.tan(-Infinity) should be NaN');
  equal(MathLib.isNaN(MathLib.tan(NaN)), true, 'MathLib.tan(NaN) should be NaN');
});


test('.type()', 11, function () {
  equal(MathLib.type(MathLib.complex([2, 3])), 'complex', "MathLib.type(MathLib.complex([2, 3])) = 'complex'");
  equal(MathLib.type(42), 'number', "MathLib.type(42) = 'number'");
  equal(MathLib.type(['ar', 'ray']), 'array', "MathLib.type(['ar', 'ray']) = 'array'");
  equal(MathLib.type({ob: 'ject'}), 'object', "MathLib.type({ob: 'ject'}) = 'object'");
  equal(MathLib.type(true), 'boolean', "MathLib.type(true) = 'boolean'");
  equal(MathLib.type('string'), 'string', "MathLib.type('string') = 'string'");
  equal(MathLib.type(function(){}), 'function', "MathLib.type(function(){}) = 'function'");
  equal(MathLib.type(/regexp/), 'regexp', "MathLib.type(/regexp/) = 'regexp'");
  equal(MathLib.type(document.getElementsByTagName('div')[0]), 'htmldivelement', "MathLib.type(document.getElementsByTagName('div')[0]) = 'htmldivelement'");
  equal(MathLib.type(undefined), 'undefined', "MathLib.type(undefined) = 'undefined'");
  equal(MathLib.type(null), 'null', "MathLib.type(null) = 'null'");
});

module("Circle");
test("init", 2, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equal(circle.radius, 2, "Testing the radius");
  deepEqual(circle.center, p, "Testing the center");
});



// Properties
test('.constructor', 1, function () {
  var c = MathLib.circle(MathLib.point([2, 4, 2]), 2);
  equal(c.constructor, MathLib.circle, 'Testing .constructor');
});


test('.type', 1, function () {
  var c = MathLib.circle(MathLib.point([2, 4, 2]), 2);
  equal(c.type, 'circle', 'Testing .type');
});



// Methods
test('.area()', 1, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equal(MathLib.isEqual(circle.area(), 4 * MathLib.pi), true, ".area()");
});


test('.circumference()', 1, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equal(MathLib.isEqual(circle.circumference(), 4 * MathLib.pi), true, ".circumference()");
});


test(".isContaining()", 3, function () {
  var p = MathLib.point(1, 2),
      inside = MathLib.point(2, 3),
      on = MathLib.point(1, 4),
      outside = MathLib.point(2, 4),
      circle = MathLib.circle(p, 2);

  ok(circle.isContaining(inside), "Point inside the circle");
  ok(!circle.isContaining(on), "Point on the circle");
  ok(!circle.isContaining(outside), "Point outside the circle");
});


test('.isEqual()', 2, function () {
  var c1 = MathLib.circle(MathLib.point(1, 2), 2),
      c2 = MathLib.circle(MathLib.point(1, 2), 3),
      c3 = MathLib.circle(MathLib.point([2, 4, 2]), 2);

  equal(c1.isEqual(c2), false, ".isEqual()");
  equal(c1.isEqual(c3), true, ".isEqual()");
});


test(".reflectAt()", 2, function () {
  var p = MathLib.point(1, 2),
      q = MathLib.point(3, 7),
      circle = MathLib.circle(p, 2),
      newcircle = circle.reflectAt(q);

  equal(newcircle.radius, 2, "Checking the radius.");
  deepEqual(newcircle.center, MathLib.point(5, 12), "Checking the center.");
});

module('Complex');
test('init (1 Array)', 3, function () {
  var c = MathLib.complex([1, 2]);
  equal(c.re, 1, 'Testing the real part');
  equal(c.im, 2, 'Testing the imaginary part');
  deepEqual(c.z, [1, 2], 'Testing the complete complex number');
});

test('init (1 Number)', 3, function () {
  var c = MathLib.complex(3);
  equal(c.re, 3, 'Testing the real part');
  equal(c.im, 0, 'Testing the imaginary part');
  deepEqual(c.z, [3, 0], 'Testing the complete complex number');
});

test('init (2 Numbers)', 3, function () {
  var c = MathLib.complex(3, 2);
  equal(c.re, 3 * Math.cos(2), 'Testing the real part');
  equal(c.im, 3 * Math.sin(2), 'Testing the imaginary part');
  deepEqual(c.z, [3 * Math.cos(2), 3 * Math.sin(2)], 'Testing the complete complex number');
});



// Properties
test('.constructor', 1, function () {
  var c = MathLib.complex([3, 4]);
  equal(c.constructor, MathLib.complex, 'Testing .constructor');
});

test('.type', 1, function () {
  var c = MathLib.complex([3, 4]);
  equal(c.type, 'complex', 'Testing .type');
});



// Methods
test('.abs()', 2, function () {
  var c1 = MathLib.complex([3, 4]),
      c2 = MathLib.complex([0, 0]);

  equal(MathLib.isEqual(c1.abs(), 5), true, 'Absolut value of a complex number');
  equal(MathLib.isEqual(c2.abs(), 0), true, 'Absolut value of a complex number');
});


test('.arg()', 4, function () {
  var c1 = MathLib.complex([1, 1]),
      c2 = MathLib.complex([1, -1]),
      c3 = MathLib.complex([0, 0]),
      c4 = MathLib.complex([-1, 0]);

  equal(c1.arg(), 0.7853981633974483, '');
  equal(c2.arg(), -0.7853981633974483, '');
  equal(c3.arg(), 0,  '');
  equal(c4.arg(), 3.141592653589793,  '');
});


test('.compare()', 3, function () {
  var c = MathLib.complex([3, 2]),
      d = MathLib.complex([1, 1]),
      e = MathLib.complex([-1, 1]);
  equal(c.compare(c), 0, 'equal complex numbers');
  equal(c.compare(d), 1, 'normal compare');
  equal(d.compare(e), -1,  '');
});


test('.conjugate()', 1, function () {
  var c = MathLib.complex([3, 4]);
  deepEqual([3, -4], c.conjugate().z, 'Checking the conjugate of a complex number');
});


test('.divide()', 2, function () {
  var c = MathLib.complex([3, 6]),
      d = MathLib.complex([2, 5]),
      e = MathLib.complex([3, 7]);
  deepEqual(c.divide(3), MathLib.complex([1, 2]), 'Dividing by a normal number.');
  ok(d.divide(e).isEqual(MathLib.complex([41 / 58, 1 / 58])), 'Dividing by a complex number.');
});


test('.inverse()', 2, function () {
  var c1 = MathLib.complex([3, 4]),
      c2 = MathLib.complex([0, 2]);
  deepEqual(c1.inverse(), MathLib.complex([3 / 25, -4 / 25]), 'Checking the inverse of a complex number');
  deepEqual(c2.inverse(), MathLib.complex([0, -1 / 2]), 'Checking the inverse of a complex number');
});


test('.isEqual()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([6 / 2, 4]),
      e = MathLib.complex([5, 3]);
  equal(c.isEqual(d), true, 'equal number');
  equal(d.isEqual(e), false, 'different number');
});


test('.isFinite()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([Infinity, 0]);
  equal(c.isFinite(), true, 'finite complex number');
  equal(d.isFinite(), false, 'infinte complex number');
});


test('.isOne()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([1, 0]);
  equal(c.isOne(), false, '3+4i');
  equal(d.isOne(), true, 'complex one');
});


test('.isReal()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([3, 0]);
  equal(c.isReal(), false, '3+4i');
  equal(d.isReal(), true, '3+0i');
});


test('.isZero()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 0]);
  equal(c.isZero(), false, 'non zero complex');
  equal(d.isZero(), true, 'complex zero');
});


test('.ln()', 1, function () {
  var c = MathLib.complex([3, 4]),
      res = MathLib.complex([1.6094379124341003, 0.9272952180016123]);
  equal(MathLib.isEqual(c.ln(), res), true, 'natural logarithm of the complex number');
});


test(".mod()", 1, function () {
  var c = MathLib.complex([5, 6]),
      d = MathLib.complex([2, 0]);
  equal(c.mod(3).isEqual(d), true, ".mod()");
});


test('.minus()', 1, function () {
  var c = MathLib.complex([3, -4]),
      d = MathLib.complex([7, -8]);
  deepEqual(c.minus(d), MathLib.complex([-4, 4]), 'Checking the negative of a complex number');
});


test('.negative()', 1, function () {
  var c = MathLib.complex([3, -4]);
  deepEqual([-3, 4], c.negative().z, 'Checking the negative of a complex number');
});


test('.plus()', 2, function () {
  var c = MathLib.complex([3, 4]);
  var d = MathLib.complex([2, -5]);
  deepEqual([5, -1], c.plus(d).z, 'Adding two complex numbers.');
  deepEqual([8, 4], c.plus(5).z, 'Adding a number to a complex numbers.');
});


test(".sign()", 1, function () {
  var c = MathLib.complex([5, 6]),
      d = MathLib.complex(1, Math.atan2(6, 5));
  equal(c.sign().isEqual(d), true, ".sign()");
});


test('.sin()', 1, function () {
  ok(MathLib.isEqual(MathLib.sin(MathLib.complex([3, 4])), MathLib.complex([3.853738037919377, -27.016813258003932])));
});


test('.times()', 2, function () {
  var c = MathLib.complex([2, 5]);
  var d = MathLib.complex([3, 7]);
  deepEqual([6, 15], c.times(3).z, 'Multiplying by a normal number.');
  deepEqual([-29, 29], c.times(d).z, 'Multiplying by a complex number.');
});


test('.toContentMathMLString()', 5, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 7]),
      e = MathLib.complex([4, 0]),
      f = MathLib.complex([4, -5]),
      g = MathLib.complex([0, 0]);
  equal(c.toContentMathMLString(), '<cn type="complex-cartesian">3<sep/>4</cn>', 'Normal complex number.');
  equal(d.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>7</cn>', 'Real part is zero.');
  equal(e.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>0</cn>', 'Complex part is zero.');
  equal(f.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>-5</cn>', 'Complex part is negative.');
  equal(g.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>0</cn>', 'Number is zero.');
});


test('.toLaTeX()', 5, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 7]),
      e = MathLib.complex([4, 0]),
      f = MathLib.complex([4, -5]),
      g = MathLib.complex([0, 0]);
  equal(c.toLaTeX(), '3+4i', 'Normal complex number.');
  equal(d.toLaTeX(), '7i', 'Real part is zero.');
  equal(e.toLaTeX(), '4', 'Complex part is zero.');
  equal(f.toLaTeX(), '4-5i', 'Complex part is negative.');
  equal(g.toLaTeX(), '0', 'Number is zero.');
});


test('.toMathMLString()', 5, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 7]),
      e = MathLib.complex([4, 0]),
      f = MathLib.complex([4, -5]),
      g = MathLib.complex([0, 0]);
  equal(c.toMathMLString(), '<mn>3</mn><mo>+</mo><mn>4</mn><mo>&#x2062;</mo><mi>i</mi>', 'Normal complex number.');
  equal(d.toMathMLString(), '<mn>7</mn><mo>&#x2062;</mo><mi>i</mi>', 'Real part is zero.');
  equal(e.toMathMLString(), '<mn>4</mn>', 'Complex part is zero.');
  equal(f.toMathMLString(), '<mn>4</mn><mo>-</mo><mn>5</mn><mo>&#x2062;</mo><mi>i</mi>', 'Complex part is negative.');
  equal(g.toMathMLString(), '<mn>0</mn>', 'Number is zero.');
});


test('.toMatrix()', 2, function () {
  var c = MathLib.complex([3, -4]);
  equal(c.toMatrix().type, 'matrix', 'type check');
  deepEqual(c.toMatrix().toComplex().z, [3, -4], 'back transformation');
});


test('.toPoint()', 3, function () {
  var c = MathLib.complex([3, -4]),
      p = c.toPoint();
  equal(p.type, 'point', 'Converting a complex number to a point: type check');
  equal(p.dim, 2, 'Converting a complex number to a point: dimension check.');
  deepEqual(p, MathLib.point([3, -4, 1]), 'Converting a complex number to a point: position check.');
});


test('.toString()', 5, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 7]),
      e = MathLib.complex([4, 0]),
      f = MathLib.complex([4, -5]),
      g = MathLib.complex([0, 0]);
  equal(c.toString(), '3+4i', 'Normal complex number.');
  equal(d.toString(), '7i', 'Real part is zero.');
  equal(e.toString(), '4', 'Complex part is zero.');
  equal(f.toString(), '4-5i', 'Complex part is negative.');
  equal(g.toString(), '0', 'Number is zero.');
});



// Static Properties
test('one', 1, function () {
  var c = MathLib.complex.one;
  deepEqual(c, MathLib.complex([1, 0]), '.one');
});


test('zero', 1, function () {
  var c = MathLib.complex.zero;
  deepEqual(c, MathLib.complex([0, 0]), '.zero');
});

module("Functn");
test('execution', 4, function () {
  equal(MathLib.sin(0), 0, 'MathLib.sin(0) should be 0');
  equal(MathLib.exp(MathLib.sin)(0), 1, 'MathLib.exp(MathLib.sin)(0) should be 1');
  equal(MathLib.plus(MathLib.sin, 2)(0), 2, 'sin(0) + 2');
  equal(MathLib.plus(MathLib.times(MathLib.sin, MathLib.sin), MathLib.times(MathLib.cos, MathLib.cos))(42), 1, 'sin(42)^2 + cos(42)^2 = 1');
});



// Properties
test('.type', 4, function () {
  equal(MathLib.sin.type, 'functn', 'MathLib.sin.type should be functn');
  equal(MathLib.exp(MathLib.sin).type, 'functn', 'MathLib.exp(MathLib.sin).type should be functn');
  equal(MathLib.plus(1, MathLib.cos).type, 'functn', 'MathLib.plus(1, MathLib.cos).type should be functn');
  equal(MathLib.plus(MathLib.cos, 1).type, 'functn', 'MathLib.plus(MathLib.cos, 1).type should be functn');
});



// Methods
test('.toContentMathMLString()', 6, function () {
  equal(MathLib.sin.toContentMathMLString().toString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><sin/><ci>x</ci></apply></lambda></math>', 'MathLib.sin.toContentMathMLString()');
  equal(MathLib.exp(MathLib.sin).toContentMathMLString().toString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><exp/><apply><sin/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.exp(MathLib.sin).toContentMathMLString()');
// equal(MathLib.pow(MathLib.sin, 2).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply></lambda></math>', 'MathLib.pow(MathLib.sin, 2).toContentMathMLString()');
  equal(MathLib.plus(MathLib.sin, 2).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply></lambda></math>', 'MathLib.plus(MathLib.sin, 2).toContentMathMLString()');
  equal(MathLib.plus(2, MathLib.sin).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><cn>2</cn><apply><sin/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.plus(2, MathLib.sin).toContentMathMLString()');
  equal(MathLib.times(2, MathLib.sin).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><times/><cn>2</cn><apply><sin/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.times(2, MathLib.sin).toContentMathMLString()');
  equal(MathLib.plus(MathLib.sin, MathLib.cos).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><sin/><ci>x</ci></apply><apply><cos/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.plus(MathLib.sin, MathLib.cos).toContentMathMLString()');
});



test('.toLaTeX()', 7, function () {
  equal(MathLib.sin.toLaTeX(), '\\sin(x)', 'MathLib.sin.toLaTeX() should be sin(x)');
  equal(MathLib.sin.toLaTeX('z'), '\\sin(z)', 'custom bound variable');
  equal(MathLib.exp(MathLib.sin).toLaTeX(), '\\exp(\\sin(x))', 'MathLib.exp(MathLib.sin).toLaTeX() should be exp(sin(x))');
  // equal(MathLib.pow(MathLib.sin, 2).toLaTeX(), 'sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toLaTeX() = sin(x)^2');
  equal(MathLib.plus(MathLib.sin, 2).toLaTeX(), '\\sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toLaTeX() = sin(x)+2');
  equal(MathLib.plus(2, MathLib.sin).toLaTeX(), '2+\\sin(x)', 'MathLib.plus(2, MathLib.sin).toLaTeX() = 2+sin(x)');
  equal(MathLib.times(2, MathLib.sin).toLaTeX(), '2*\\sin(x)', 'MathLib.times(2, MathLib.sin).toLaTeX() = 2*sin(x)');
  equal(MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX(), '\\sin(x)+\\cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX() = sin(x)+cos(x)');
});



test('.toMathMLString()', 6, function () {
  equal(MathLib.sin.toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></math>', 'MathLib.sin.toMathML()');
  equal(MathLib.exp(MathLib.sin).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>exp</mi><mo>&af;</mo><mfenced><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mfenced></mrow></math>', 'MathLib.exp(MathLib.sin).toMathML()');
  // equal(MathLib.pow(MathLib.sin, 2).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msup><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mn>2</mn></msup></mrow></math>', 'MathLib.pow(MathLib.sin, 2).toMathML()');
  equal(MathLib.plus(MathLib.sin, 2).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mo>+</mo><mn>2</mn></mrow></math>', 'MathLib.plus(MathLib.sin, 2).toMathML()');
  equal(MathLib.plus(2, MathLib.sin).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mn>2</mn><mo>+</mo><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mrow></math>', 'MathLib.plus(2, MathLib.sin).toMathML()');
  equal(MathLib.times(2, MathLib.sin).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mn>2</mn><mo>*</mo><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mrow></math>', 'MathLib.times(2, MathLib.sin).toMathML()');
  equal(MathLib.plus(MathLib.sin, MathLib.cos).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mo>+</mo><mrow><mi>cos</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mrow></math>', 'MathLib.plus(MathLib.sin, MathLib.cos).toMathML()');
});


test('.toString()', 7, function () {
  equal(MathLib.sin.toString(), 'sin(x)', 'MathLib.sin.toString() should be sin(x)');
  equal(MathLib.sin.toString('z'), 'sin(z)', 'custom bound variable');
  equal(MathLib.exp(MathLib.sin).toString(), 'exp(sin(x))', 'MathLib.exp(MathLib.sin).toString() should be exp(sin(x))');
  // equal(MathLib.pow(MathLib.sin, 2).toString(), 'sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toString() = sin(x)^2');
  equal(MathLib.plus(MathLib.sin, 2).toString(), 'sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toString() = sin(x)+2');
  equal(MathLib.plus(2, MathLib.sin).toString(), '2+sin(x)', 'MathLib.plus(2, MathLib.sin).toString() = 2+sin(x)');
  equal(MathLib.times(2, MathLib.sin).toString(), '2*sin(x)', 'MathLib.times(2, MathLib.sin).toString() = 2*sin(x)');
  equal(MathLib.plus(MathLib.sin, MathLib.cos).toString(), 'sin(x)+cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toString() = sin(x)+cos(x)');
});

module('Line');
test('init', 2, function () {
  var line = MathLib.line([3, 2, 1]);
  equal(line.dim, 2, 'Testing the dimension');
  deepEqual(line, [3,2,1], 'Testing the entries');
});



// Properties
test('.constructor', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equal(line.constructor, MathLib.line, 'Testing .constructor');
});


test('.type', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equal(line.type, 'line', 'Testing .type');
});



// Methods
test('.isEqual()', 3, function () {
  var line1 = MathLib.line([3, 2, 1]),
      line2 = MathLib.line([6, 4, 2]),
      line3 = MathLib.line([1, 1, 1]),
      line4 = MathLib.line([1, 1, 1, 1]);
  equal(line1.isEqual(line2), true, '.isEqual()');
  equal(line1.isEqual(line3), false, '.isEqual()');
  equal(line3.isEqual(line4), false, ".isEqual()");
});


test('.isFinite()', 2, function () {
  var line1 = MathLib.line([3, 2, 1]),
      line2 = MathLib.line([6, 4, 0]);
  equal(line1.isFinite(), true, '.isFinite()');
  equal(line2.isFinite(), false, '.isFinite()');
});


test(".map()", 2, function () {
  var p = MathLib.line([1, 2, 3]),
      q = MathLib.line([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'line', ".type should be line");
});


// TODO: implement
// test('.toContentMathML', 2, function () {
//   var point = MathLib.point([3, 2, 1]);
//   equal(point.toContentMathML(), '', '.toContentMathML()');
//   equal(point.toContentMathML(true), '', '.toContentMathML()');
// });


test('.toLaTeX()', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equal(line.toLaTeX(), '\\begin{pmatrix}\n\t3\\\\\n\t2\\\\\n\t1\n\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathMLString()', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equal(line.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
});


test('.toString()', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equal(line.toString(), '(3, 2, 1)', '.toString()');
});

module('MathML');
test('init', 2, function () {
  var mathML = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn></matrixrow></matrix></math>'),
      nodeList = [],
      cur = mathML;

  while (cur.nextNode) {
    cur = cur.nextNode;
    nodeList.push(cur.nodeName);
  }
  equal(typeof mathML, 'object', 'Testing typeof the MathML');
  deepEqual(nodeList, ['matrix', 'matrixrow', 'cn', '#text', 'cn', '#text', 'matrixrow', 'cn', '#text', 'cn', '#text'], 'Checking if the MathML was tokenized right.');
});


test('whitespaces', 2, function () {
  var mathML = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML">\n<set>\t<cn>  123  </cn><cs>String with spaces</cs> </set>\t</math>'),
      nodeList = [],
      cur = mathML;

  while (cur.nextNode) {
    cur = cur.nextNode;
    nodeList.push(cur.nodeName);
  }
  deepEqual(nodeList, ['set', 'cn', '#text', 'cs', '#text', '#text'], 'Checking if the MathML was tokenized right.');
  equal(mathML.childNodes[0].childNodes[1].innerMathML, 'String with spaces');
});



// Properties
test('.constructor', 1, function () {
  var m = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>');
  deepEqual(m.constructor, MathLib.MathML, 'Testing .constructor');
});


test('.type', 1, function () {
  var m = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>');
  equal(m.type, 'MathML', 'Testing .type');
});



// Methods
test('.parse() boolean', 8, function () {
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><true/></apply></math>').parse(), true, '</and> true true');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><false/><true/></apply></math>').parse(), false, '</and> true false true');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><false/><false/></apply></math>').parse(), false, '</or> false false');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><true/><false/><true/></apply></math>').parse(), true, '</or> true false true');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><false/><true/></apply></math>').parse(), true, '</xor> false false');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><true/><false/><true/></apply></math>').parse(), false, '</xor> true false true');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><false/></apply></math>').parse(), true, '</not> false');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><true/></apply></math>').parse(), false, '</not> true');
});


test('.parse() ci', 1, function () {
  MathLib.MathML.variables.n = 42;
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><ci>n</ci></math>').parse(), 42, '.parse() a normal number');
});


test('.parse() cn', 5, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34</cn></math>').parse(), 34, '.parse() a normal number');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>34.2</cn></math>').parse(), 34.2, '.parse() a normal number');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>.123</cn></math>').parse(), 0.123, '.parse() a normal number');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34E-12</cn></math>').parse(), 34e-12, '.parse() a normal number');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34.345E-12</cn></math>').parse(), 34.345e-12, '.parse() a normal number');
});


test('.parse() complex', 2, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>').parse(), MathLib.complex([3, 4]), '.parse() complex (cartesian)');
  ok(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-polar">1<sep/>3.141592653589793</cn></math>').parse().isEqual(MathLib.complex([-1, 0])), '.parse() complex (polar)');
});


test('.parse() function constructing', 6, function () {
 var expsin = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><exp/><apply><sin/><ci>x</ci></apply></apply></lambda></math>').parse();

  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><sin/><ci>x</ci></apply></lambda></math>').parse()(0), 0, '.parse() sin');
  deepEqual(expsin(0), 1, 'exp(sin(0)) = 1');
  deepEqual(expsin.type, 'functn', 'exp(sin(x)).type');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><ident/><ci>x</ci></apply></lambda></math>').parse()(42), 42, 'The identity function');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><cn>2</cn><ci>x</ci></apply></lambda></math>').parse()(42), 44, 'The result of 42 + 2 should be 44');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><ci>x</ci><cn>2</cn></apply></lambda></math>').parse()(42), 44, 'The result of 42 + 2 should be 44');
  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><bvar><ci>y</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><power/><ci>x</ci><ci>y</ci></apply></lambda></math>').parse()(4, 2), 16, 'Function with two arguments');
  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply><apply><power/><apply><cos/><ci>x</ci></apply><cn>2</cn></apply></apply></lambda></math>').parse()(42), 1, 'The result of sin^2(42) + cos^2(42) should be 1');
});


test('.parse() function evaluation', 5, function () {
  MathLib.MathML.variables.n = 42;

  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><sin/><cn>42</cn></apply></math>').parse(), Math.sin(42), '.parse() apply');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><sin/><ci>n</ci></apply></math>').parse(), Math.sin(42), '.parse() sin');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><plus/><cn>1</cn><cn>2</cn><cn>3</cn></apply></math>').parse(), 6, 'plus');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><ln/><cn>42</cn></apply></math>').parse(), Math.log(42), '.parse() apply');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><factorial/><cn>6</cn></apply></math>').parse(), 720, 'factorial');
});


test('.parse() matrix', 2, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>0</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>0</cn><cn>1</cn></matrixrow></matrix></math>').parse(), MathLib.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), '.parse() matrix');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><determinant/><matrix><matrixrow><cn>8</cn><cn>1</cn><cn>6</cn></matrixrow><matrixrow><cn>3</cn><cn>5</cn><cn>7</cn></matrixrow><matrixrow><cn>4</cn><cn>9</cn><cn>2</cn></matrixrow></matrix></apply></math>').parse(), -360, '.parse() apply');
});


test('.parse() set', 4, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn><cn>4</cn><cn>5</cn><cn>6</cn><cn>7</cn><cn>8</cn><cn>9</cn><cn>10</cn></set></math>').parse(), MathLib.set.fromTo(1, 10), '.parse() set');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set type="multiset"><cn>1</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>3</cn><cn>2</cn><cn>4</cn></set></math>').parse(), MathLib.set([1, 2, 2, 3, 3, 3, 4], true), '.parse() set');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><union/><set><cn>1</cn><cn>2</cn></set><set><cn>2</cn><cn>3</cn></set></apply></math>').parse(), MathLib.set([1, 2, 3]), 'set union');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cs>A</cs><cs>B</cs><cs> </cs></set></math>').parse(), MathLib.set(['A', 'B', ' ']), '.parse() set');
});


test('.parse() vector', 1, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').parse(), MathLib.vector([1, 2, 3]), '.parse() vector');
});

  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><minus/><cn>34</cn><cn>16</cn></apply></math>').parse(), 18, 'binary minus');
  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><minus/><cn>34</cn></apply></math>').parse(), -34, 'unary minus');

test('.toString()', 2, function (){
  var s1 = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><ci>x</ci><cn>2</cn></apply><apply><power/><ci>x</ci><cn>3</cn></apply></apply></lambda></math>',
      s2 = '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>a</mi><mo>&InvisibleTimes;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>b</mi><mo>&InvisibleTimes;</mo><mi>x</mi><mo>+</mo><mi>c</mi></mrow></math>';
  equal(MathLib.MathML(s1).toString(), s1);
  equal(MathLib.MathML(s2).toString(), s2);
});



// Static methods
// TODO: test if the result is right
test('.isSupported()', 1, function () {
  var supp = MathLib.MathML.isSupported();
  ok(supp === true || supp === false, '.isEqual()');
});

module('Matrix');
test('init', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  equal(m.rows, 3, 'Testing the number of rows');
  equal(m.cols, 3, 'Testing the number of cols');
});



// Properties
test('.constructor', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  equal(m.constructor, MathLib.matrix, 'Testing .constructor');
});


test('.type', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  equal(m.type, 'matrix', 'Testing .type');
});



// Methods
test('.adjugate()', 1, function () {
  var c = MathLib.complex,
      m = MathLib.matrix([[-3, 2, -5], [-1, 0, -3], [3, -4, 1]]),
      res = MathLib.matrix([[-12, 18, -6], [-8, 12, -4], [4, -6, 2]]);

  deepEqual(m.adjugate(), res, 'Adjoint matrix of a complex 2x3 matrix');
});


test('.adjoint()', 1, function () {
  var c = MathLib.complex,
      m = MathLib.matrix([[c([3, 1]), 5, c([0, -2])], [c([2, -2]), c([0, 1]), c([-7, -13])]]),
      res = MathLib.matrix([[c([3, -1]), c([2, 2])], [5, c([0, -1])], [c([0, 2]), c([-7, 13])]]);

  deepEqual(m.adjoint(), res, 'Adjoint matrix of a complex 2x3 matrix');
});


test('.cholesky()', 1, function () {
  var m = MathLib.matrix([[25, 15, -5], [15, 18, 0], [-5, 0, 11]]),
      res = MathLib.matrix([[5, 0, 0], [3, 3, 0], [-1, 1, 3]]);

  deepEqual(m.cholesky(), res, 'Cholesky decomposition of a 3x3 matrix');
});


test('.determinant()', 3, function () {
  var m = MathLib.matrix([[0, 1, 2], [3, 2, 1], [1, 1, 0]]),
      n = MathLib.matrix([[42]]),
      p = MathLib.matrix([[0, 1, 2], [3, 2, 1]]);

  equal(m.determinant(), 3, 'Determinant of a 3x3 matrix');
  equal(n.determinant(), 42, 'Determinant of 1x1 matrix');
  equal(p.determinant(), undefined, 'Determinant of 2x3 matrix should be undefined');
});


test('.gershgorin()', 2, function () {
  var c = MathLib.complex,
      m = MathLib.matrix([[1,2,3], [4,5,6], [7,8,9]]),
      n = MathLib.matrix([[c([1,4]),2,3], [c([2,3]),c([4,2]),6], [7,c([0,5]),9]]),
      resm = [MathLib.circle([1,0,1], 5), MathLib.circle([5,0,1], 10), MathLib.circle([9,0,1], 9)],
      resn = [MathLib.circle([1,4,1], 5), MathLib.circle([4,2,1], 10), MathLib.circle([9,0,1], 9)];

  deepEqual(m.gershgorin(), resm, 'Gershgorin circles of a 3x3 matrix');
  deepEqual(m.gershgorin(), resn, 'Gershgorin circles of a complex 3x3 matrix');
});


test('.givens()', 9, function () {
  var m = MathLib.matrix([[3, 5], [0, 2], [0, 0], [4, 5]]),
      n = MathLib.matrix([[6, 5, 0], [5, 1, 4], [0, 4, 3]]),
      o = MathLib.matrix([[0, 1, 6], [3, 5, 7], [4, 9, 2]]),
      QRm = m.givens(),
      Qm = QRm[0],
      Rm = QRm[1],
      Q1 = MathLib.matrix([[3/5, 4/(5*Math.sqrt(5)), 0, -8/(5*Math.sqrt(5))], [0, 2/Math.sqrt(5), 0, 1/Math.sqrt(5)], [0, 0, 1, 0], [4/5, -3/(5*Math.sqrt(5)), 0, 6/(5*Math.sqrt(5))]]),
      R1 = MathLib.matrix([[5, 7], [0, 2.23606797749979], [0, 0], [0, 0]]),

      QRn = n.givens(),
      Qn = QRn[0],
      Rn = QRn[1],
      Q2 = MathLib.matrix([[0.768221279597376, -0.332654179360071, -0.546970988744419], [0.640184399664480 , 0.399185015232086 , 0.656365186493303], [0, -0.854395997514289, 0.519622439307198]]),
      R2 = MathLib.matrix([[7.810249675906652, 4.481290797651358, 2.560737598657919], [0, -4.681669871625427, -0.966447931614524], [0, 0, 4.184328063894809]]),

      QRo = o.givens(),
      Qo = QRo[0],
      Ro = QRo[1],
      Q3 = MathLib.matrix([[0, -0.581238193719096, -0.813733471206735], [0.6, 0.650986776965388, -0.464990554975277], [0.8, -0.488240082724041, 0.348742916231458]]),
      R3 = MathLib.matrix([[5, 10.2, 5.8], [0, -1.720465053408526, 0.09299811099505462], [0, 0, -7.439848879604435]]);
  
  ok(Qm.isEqual(Q1), 'Q is original matrix');
  ok(Rm.isEqual(R1), 'R is original matrix');
  ok(Qm.times(Rm).isEqual(m), 'Q*R is original matrix');
  ok(Qn.isEqual(Q2), 'Q is original matrix');
  ok(Rn.isEqual(R2), 'R is original matrix');
  ok(Qn.times(Rn).isEqual(n), 'Q*R is original matrix');
  ok(Qo.isEqual(Q3), 'Q is original matrix');
  ok(Ro.isEqual(R3), 'R is original matrix');
  ok(Qo.times(Ro).isEqual(o), 'Q*R is original matrix');
});


test('.isBandMatrix()', 2, function () {
  var m = MathLib.matrix([[2,1,3,0],[1,2,1,3],[0,1,2,1],[0,0,1,2]]);

  equal(m.isBandMatrix(1,2), true, 'band matrix');
  equal(m.isBandMatrix(1,1), false, 'upper bandwidth to small');
});

test('.isDiag()', 2, function () {
  var c = MathLib.complex(0, 0),
      m = MathLib.matrix([[1, 0, 0], [0, 5, 0], [0, 0, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
  equal(m.isDiag(), true, 'square matrix');
  equal(n.isDiag(), false, 'non square matrix');
});


test('.isIdentity()', 2, function () {
  var m = MathLib.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
  equal(m.isIdentity(), true, '.isIdentity() on identity matrix');
  equal(n.isIdentity(), false, '.isIdentity() on non identity matrix');
});


test('.isInvertible()', 2, function () {
  var m = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 5, 2]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 9, 15]]);
  equal(m.isInvertible(), true, '.isInvertible(), invertible matrix');
  equal(n.isInvertible(), false, '.isInvertible(), singular matrix');
});


test('.isLower()', 4, function () {
  var m = MathLib.matrix([[1, 0, 0], [4, 5, 0], [3, 0, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
      o = MathLib.matrix([[1, 0, 0], [4, 5, 0]]),
      p = MathLib.matrix([[1, 0, 0], [4, 5, 0], [4, 0, 6], [4, 3, 2]]);
  equal(m.isLower(), true, 'upper matrix');
  equal(n.isLower(), false, 'non upper matrix');
  equal(o.isLower(), true, 'upper matrix');
  equal(p.isLower(), true, 'upper matrix');
});


test('.isOrthogonal()', 2, function () {
  var m = MathLib.matrix([[0.8, -0.6], [0.6, 0.8]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
  equal(m.isOrthogonal(), true, '.isOrthogonal() on orthogal matrix');
  equal(n.isOrthogonal(), false, '.isOrthogonal() on non orthogonal matrix');
});


test('.isPermutation()', 3, function () {
  var m = MathLib.matrix([[0, 1, 0], [1, 0, 0], [0, 0, 1]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 3, 4]]),
      o = MathLib.matrix([[0, 1, 0], [1, 0, 0], [0, 0, 0]]);
  equal(m.isPermutation(), true, 'permutation matrix');
  equal(n.isPermutation(), false, 'non permutation matrix');
  equal(o.isPermutation(), false, 'zero line');
});


test('.isPosDefinite()', 2, function () {
  var m = MathLib.matrix([[2, -1, 0], [-1, 2, -1], [0, -1, 2]]),
      n = MathLib.matrix([[1, 2], [2, 1]]);
  equal(m.isPosDefinite(), true, 'positiv definite matrix');
  equal(n.isPosDefinite(), false, 'non positiv definite matrix');
});


test('.isSquare()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8]]);
  equal(m.isSquare(), true, 'square matrix');
  equal(n.isSquare(), false, 'non square matrix');
});


test('.isSymmetric()', 2, function () {
  var c = MathLib.complex(4, 0),
      m = MathLib.matrix([[1, 7, c], [7, 0, 3], [4, 3, 1]]),
      n = MathLib.matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
  equal(m.isSymmetric(), true, 'symmetric matrix');
  equal(n.isSymmetric(), false, 'non symmetric matrix');
});


test('.isUpper()', 4, function () {
  var m = MathLib.matrix([[1, 2, 3], [0, 5, 6], [0, 0, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
      o = MathLib.matrix([[1, 4, 7], [0, 5, 8]]),
      p = MathLib.matrix([[1, 4, 7], [0, 5, 8], [0, 0, 6], [0, 0, 0]]);
  equal(m.isUpper(), true, 'upper matrix');
  equal(n.isUpper(), false, 'non upper matrix');
  equal(o.isUpper(), true, 'upper matrix');
  equal(p.isUpper(), true, 'upper matrix');
});


test('.isVector()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 2, 3]]);
  equal(m.isVector(), false, 'normal matrix');
  equal(n.isVector(), true, 'one row matrix');
});


test('.isZero()', 2, function () {
  var c = MathLib.complex(0, 0),
      m = MathLib.matrix([[0, 0, 0], [0, 0, c], [0, 0, 0]]),
      n = MathLib.matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
  equal(m.isZero(), true, 'zero matrix');
  equal(n.isZero(), false, 'non zero matrix');
});


test('.LU()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
      n = MathLib.matrix([[1, 3, 5], [2, 4, 7], [1, 1, 0]]),
      res1 = MathLib.matrix([[1, 2, 3], [1, -1, -2], [3, 3, -2]]),
      res2 = MathLib.matrix([[2, 4, 7], [0.5, 1, 1.5], [0.5, -1, -2]]);

  deepEqual(m.LU(true), res1, 'LU decomposition');
  deepEqual(n.LU(), res2, 'LU decomposition');
});


test(".map()", 2, function () {
  var p = MathLib.matrix([[1, 2],[3, 4]]),
      q = MathLib.matrix([[2, 4], [6, 8]]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'matrix', ".type should be matrix");
});


test('.minus()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
      res = MathLib.matrix([[0, -2, -4], [2, 0, -2], [4, 2, 0]]),
      res1 = MathLib.matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  deepEqual(m.minus(n), res, 'subtracting two simple matrices');
  deepEqual(n.minus(n), res1, 'subtracting two simple matrices');
});


test('.negative()', 1, function () {
  var m = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
      res = MathLib.matrix([[-1, -4, -7], [-2, -5, -8], [-3, -6, -9]]);
  deepEqual(m.negative(), res, 'negative of a simple matrix');
});


test('.plus()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
      res = MathLib.matrix([[2, 6, 10], [6, 10, 14], [10, 14, 18]]);
  deepEqual(m.plus(n), res, 'adding two simple matrices');
});


test('.rank()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [0, 5, 4], [0, 10, 2]]),
      n = MathLib.matrix([[1, 2, 3], [0, 6, 4], [0, 3, 2]]);
  equal(m.rank(), 3, '.rank()');
  equal(n.rank(), 2, '.rank()');
});


test('.remove()', 3, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      res1 = MathLib.matrix([[1, 2, 3], [7, 8, 9]]),
      res2 = MathLib.matrix([[1, 3], [4, 6], [7, 9]]),
      res3 = MathLib.matrix([[4], [7]]);

  deepEqual(m.remove(1), res1, 'removing the second row');
  deepEqual(m.remove(false, 1), res2, 'removing the second column');
  deepEqual(m.remove([0], [1, 2]), res3, 'removing the first row and the second and third col');
});


test('.rref()', 2, function () {
  var m = MathLib.matrix([[1, 2, -1, -4], [2, 3, -1, -11], [-2, 0, -3, 22]]),
      n = MathLib.matrix([[1, 2, 3], [1, 2, 4], [2, 4, 7]]);

  deepEqual(m.rref(), [[1, 0, 0, -8], [0, 1, 0, 1], [0, 0, 1, -2]], 'reduced row echelon form');
  deepEqual(n.rref(), [[1, 2, 0], [0, 0, 1], [0, 0, 0]], 'singular matrix');
});


test('.solve()', 4, function () {
  var A1 = MathLib.matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
      b1 = MathLib.vector([2, 2, 0]),
      x1 = MathLib.vector([5, -6, 3]),
      A2 = MathLib.matrix([[1, 0, 3], [2, 1, 0], [0, 0, 1]]),
      b2 = MathLib.vector([10, 3, 3]),
      x2 = MathLib.vector([1, 1, 3]),
      c  = MathLib.complex,
      A3 = MathLib.matrix([[c([2, 3]), 0, 3], [2, c([-1, 5]), 0], [c([3, -4]), c([0, 1]), 1]]),
      b3 = MathLib.vector([c([5, 37]), c([5, 19]), c([21, 0])]),
      x3 = MathLib.vector([c([4, 2]), c([3, 0]), c([1, 7])]);

  ok(A1.solve(b1).isEqual(x1), 'Solving a system of linear equations');
  deepEqual(A1.times(x1), b1, 'Showing the solution is right');

  deepEqual(A2.solve(b2), x2, 'Solving a system of linear equations');

  ok(A3.solve(b3).isEqual(x3), 'Solving a complex system of linear equations');
});


test('.times()', 4, function () {
  var m = MathLib.matrix([[1, 2], [3, 4]]),
      n = MathLib.matrix([[0, 1], [0, 0]]),
      res = MathLib.matrix([[0, 1], [0, 3]]),

      c  = MathLib.complex,
      mc = MathLib.matrix([[c([2, 3]), 0, 3], [2, c([-1, 5]), 0], [c([3, -4]), c([0, 1]), 1]]),
      bc = MathLib.vector([c([4, 2]), 3, c([1, 7])]),
      resc = MathLib.vector([c([5, 37]), c([5, 19]), c([21, 0])]);

  deepEqual(m.times(3), MathLib.matrix([[3, 6], [9, 12]]), 'matrix scalar multiplication');
  deepEqual(m.times(c([0, 1])), MathLib.matrix([[c([0, 1]), c([0, 2])], [c([0, 3]), c([0, 4])]]), 'matrix scalar multiplication');
  deepEqual(m.times(n), res, 'multiplying two simple matrices');
  deepEqual(mc.times(bc), resc, 'complex matrix times complex vector');
});


test('.trace()', 2, function () {
  var c = MathLib.complex([3, 4]),
      m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 2], [3, c]]);
  equal(m.trace(), 15, 'trace of a simple matrix');
  deepEqual(n.trace().z, [4, 4], 'trace of a complex matrix');
});


test('.transpose()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 2, 3], [4, 5, 6]]);

  deepEqual(m.transpose(), MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]), 'transpose a square matrix');
  deepEqual(n.transpose(), MathLib.matrix([[1, 4], [2, 5], [3, 6]]), 'transpose of a rectangular matrix');
});


test('.toArray()', 4, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      a = m.toArray();

  deepEqual(a, [[1, 2, 3], [4, 5, 6], [7, 8, 9]], '.toArray()');
  equal(Object.prototype.toString.call(a), '[object Array]', '.toArray()');
  equal(a.type, undefined, 'get sure that it is not a Mathlib object');
  a[0][0] = 42;
  deepEqual(m, MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 'make sure the matrix hasn\'t changed');
});


test('.toColVectors()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toColVectors(), [MathLib.vector([1, 4, 7]), MathLib.vector([2, 5, 8]), MathLib.vector([3, 6, 9])], '.toColVectors()');
});


test('.toComplex()', 1, function () {
  var m = MathLib.matrix([[1, -2], [2, 1]]);
  deepEqual(m.toComplex().z, [1, 2], 'convert a 2x2 matrix to a complex number');
});


test('.toContentMathMLString()', 1, function () {
  var m = MathLib.matrix([[1, 2], [3, 4]]);
  deepEqual(m.toContentMathMLString(), '<matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow></matrix>', '.toContentMathMLString()');
});


test('.toLaTeX()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toLaTeX(), '\\begin{pmatrix}\n1 & 2 & 3\\\n4 & 5 & 6\\\n7 & 8 & 9\n\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathMLString()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toMathMLString(), '<mrow><mo> ( </mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo> ) </mo></mrow>', '.toMathMLString()');
});


test('.toRowVectors()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toRowVectors(), [MathLib.vector([1, 2, 3]), MathLib.vector([4, 5, 6]), MathLib.vector([7, 8, 9])], '.toRowVectors()');
});


test('.toString()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toString(), '1\t2\t3\n4\t5\t6\n7\t8\t9', '.toString()');
});



// Static methods
test('identity()', 1, function () {
  equal(MathLib.matrix.identity(4).isIdentity(), true, 'creating a identity matrix');
});


test('numbers()', 3, function () {
  var m = MathLib.matrix.numbers(3, 2, 2),
      n = MathLib.matrix.numbers(4, 2),
      o = MathLib.matrix.numbers(5);
  deepEqual(m, [[3, 3], [3, 3]], 'static number method');
  deepEqual(n, [[4, 4], [4, 4]], 'static number method');
  deepEqual(o, [[5]], 'static number method');
});

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

module('Point');
test('init', 1, function () {
  var point = MathLib.point([3, 2, 1]);
  equal(point.dim, 2, 'Testing the dimension');
});



// Properties
test('.constructor', 1, function () {
  var p = MathLib.point([3, 2, 1]);
  equal(p.constructor, MathLib.point, 'Testing .constructor');
});


test('.type', 1, function () {
  var p = MathLib.point([3, 2, 1]);
  equal(p.type, 'point', 'Testing .type');
});



// Methods
test('.isEqual()', 3, function () {
  var point1 = MathLib.point([3, 2, 1]),
      point2 = MathLib.point([6, 4, 2]),
      point3 = MathLib.point([1, 1, 1]),
      point4 = MathLib.point([1, 1, 1, 1]);
  equal(point1.isEqual(point2), true, '.isEqual()');
  equal(point1.isEqual(point3), false, '.isEqual()');
  equal(point3.isEqual(point4), false, ".isEqual()");
});


test('.isFinite()', 2, function () {
  var point1 = MathLib.point([3, 2, 1]),
      point2 = MathLib.point([6, 4, 0]);
  equal(point1.isFinite(), true, '.isFinite()');
  equal(point2.isFinite(), false, '.isFinite()');
});


test('.isInside()', 3, function () {
  var p1 = MathLib.point([1, 0, 1]),
      p2 = MathLib.point([2, 0, 1]),
      p3 = MathLib.point([3, 0, 1]),
      c = MathLib.circle(MathLib.point([0, 0, 1]), 2);
  equal(p1.isInside(c), true, '.isInside()');
  equal(p2.isInside(c), false, '.isInside()');
  equal(p3.isInside(c), false, '.isInside()');
});


test('.isOn()', 3, function () {
  var p1 = MathLib.point([1, 0, 1]),
      p2 = MathLib.point([2, 0, 1]),
      p3 = MathLib.point([3, 0, 1]),
      c = MathLib.circle(MathLib.point([0, 0, 1]), 2);
  equal(p1.isOn(c), false, '.isOn()');
  equal(p2.isOn(c), true, '.isOn()');
  equal(p3.isOn(c), false, '.isOn()');
});


test('.isOutside()', 3, function () {
  var p1 = MathLib.point([1, 0, 1]),
      p2 = MathLib.point([2, 0, 1]),
      p3 = MathLib.point([3, 0, 1]),
      c = MathLib.circle(MathLib.point([0, 0, 1]), 2);
  equal(p1.isOutside(c), false, '.isOutside()');
  equal(p2.isOutside(c), false, '.isOutside()');
  equal(p3.isOutside(c), true, '.isOutside()');
});


test(".map()", 2, function () {
  var p = MathLib.point([1, 2, 3]),
      q = MathLib.point([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'point', ".type should be point");
});


test('.reflectAt()', 1, function () {
  var point1 = MathLib.point([0, 0, 1]),
      point2 = MathLib.point([1, 2, 1]),
      point3 = MathLib.point([2, 4, 1]);
  deepEqual(point1.reflectAt(point2), point3, '.reflectAt()');
});


// TODO: implement
// test('.toContentMathML', 2, function () {
//   var point = MathLib.point([3, 2, 1]);
//   equal(point.toContentMathML(), '', '.toContentMathML()');
//   equal(point.toContentMathML(true), '', '.toContentMathML()');
// });


test('.toLaTeX()', 2, function () {
  var point = MathLib.point([3, 2, 1]);
  equal(point.toLaTeX(), '\\begin{pmatrix}\n\t3\\\\\n\t2\n\\end{pmatrix}', '.toLaTeX()');
  equal(point.toLaTeX(true), '\\begin{pmatrix}\n\t3\\\\\n\t2\\\\\n\t1\n\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathMLString()', 2, function () {
  var point = MathLib.point([3, 2, 1]);
  equal(point.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
  equal(point.toMathMLString(true), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
});


test('.toString()', 2, function () {
  var point = MathLib.point([3, 2, 1]);
  equal(point.toString(), '(3, 2)', '.toString()');
  equal(point.toString(true), '(3, 2, 1)', '.toString()');
});

module("Polynomial");
test("init", 2, function () {
  var p = MathLib.polynomial([1, 2, 3, 4]),
      p1 = MathLib.polynomial([1, -4, MathLib.complex([2, 3])]);
  deepEqual(p, [1, 2, 3, 4], ".coef");
  deepEqual(p1[2], MathLib.complex([2, 3]), ".coef");
});



// Properties
test(".coef", 1, function () {
  var p = MathLib.polynomial(3);
  deepEqual(p, [0, 0, 0, 1], ".coef");
});


test('.constructor', 1, function () {
  var p = MathLib.polynomial([1, 2, 3]);
  equal(p.constructor, MathLib.polynomial, 'Testing .constructor');
});


test(".deg", 1, function () {
  var p = MathLib.polynomial(3);
  equal(p.deg, 3, "testing if .degree is right");
});


test('.type', 1, function () {
  var p = MathLib.polynomial([1, 2, 3]);
  equal(p.type, 'polynomial', 'Testing .type');
});



// Methods
test(".differentiate()", 3, function () {
  var p = MathLib.polynomial(3);
  deepEqual(p.differentiate(), [0, 0, 3], ".differentiate()");
  deepEqual(p.differentiate(2), [0, 6], ".differentiate(2)");
  deepEqual(p.differentiate(4), [0], ".differentiate(4)");
});


test(".integrate()", 2, function () {
  var p = MathLib.polynomial([0, 0, 0, 1]);
  deepEqual(p.integrate(), [0, 0, 0, 0, 0.25], ".integrate()");
  deepEqual(p.integrate(2), [0, 0, 0, 0, 0,  0.05], ".integrate(2)");
});


test(".isEqual()", 1, function () {
  var c = MathLib.complex([0, 0]),
      p = MathLib.polynomial(3),
      q = MathLib.polynomial([c, 0, 0, 1]);
  equal(q.isEqual(p), true, ".times(polynomial)");
});


test(".map()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'polynomial', ".type should be polynomial");
});


test(".mod()", 1, function () {
  var cp = MathLib.complex([5, 6]),
      cq = MathLib.complex([2, 0]),
      p = MathLib.polynomial([3, cp, -2, 0, 4, 5]),
      q = MathLib.polynomial([0, cq, 1, 0, 1, 2]);
  equal(p.mod(3).isEqual(q), true, ".mod()");
});


test(".plus()", 4, function () {
  var p = MathLib.polynomial(3),
      p1 = MathLib.polynomial([1, 2, 3]);
  deepEqual(p1.plus(12), [13, 2, 3], ".plus(integer)");
  deepEqual(p1.plus(12, true), [13, 14, 15], ".plus(integer, true)");
  deepEqual(p.plus(p1), [1, 2, 3, 1], ".plus(polynomial)");
  deepEqual(p1.plus(p), [1, 2, 3, 1], ".plus(polynomial)");
});


test(".times()", 3, function () {
  var p = MathLib.polynomial(3),
      p1 = MathLib.polynomial([1, 2, 3]);
  deepEqual(p1.times(5), [5, 10, 15], ".times(integer)");
  deepEqual(p.times(p1), [0, 0, 0, 1, 2, 3], ".times(polynomial)");
  deepEqual(p1.times(p), [0, 0, 0, 1, 2, 3], ".times(polynomial)");
});

test(".toContentMathMLString()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toContentMathMLString(), '<apply><plus/><apply><times/><cn>3</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><apply><times/><cn>2</cn><ci>x</ci></apply><cn>1</cn></apply>', ".toContentMathMLString()");
  deepEqual(q.toContentMathMLString(), '<apply><plus/><apply><times/><cn>1</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><cn>-1</cn></apply>', ".toContentMathMLString()");
});



test(".toFunctn()", 3, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      f = p.toFunctn(),
      sinf = MathLib.sin(f);

  equal(f.type, 'functn', '.type should be functn');
  equal(sinf.toString(), 'sin(3*x^2+2*x+1)', 'composition with other functions');
  equal(f(42), 5377, 'fuctn evaluation');
});


test(".toLaTeX()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toLaTeX(), '3*x^{2}+2x+1', ".toLaTeX()");
  deepEqual(q.toLaTeX(), '1*x^{2}-1', ".toLaTeX()");
});


test(".toMathMLString()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toMathMLString(), '<mrow><mo>+</mo><mn>3</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mo>&#x2062;</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow>', ".toMathMLString()");
  deepEqual(q.toMathMLString(), '<mrow><mo>+</mo><mn>1</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mn>1</mn></mrow>', ".toMathMLString()");
});


test(".toString()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toString(), '3*x^2+2*x+1', ".toString()");
  deepEqual(q.toString(), '1*x^2-1', ".toString()");
});


test(".valueAt()", 6, function () {
  var p = MathLib.polynomial(3),
      p1 = MathLib.polynomial([1, 2, 3]),
      p2 = MathLib.polynomial([1, -4, MathLib.complex([4, -1])]),
      m = MathLib.matrix([[1, 0, 1], [2, 2, 1], [4, 2, 1]]),
      charPoly = MathLib.polynomial([4, -1, -4, 1]);
  equal(p.valueAt(4), 64, ".valueAt()");
  equal(p1.valueAt(2), 17, ".valueAt()");

  deepEqual(p1.valueAt(MathLib.complex([2, 3])).z, [-10, 42], ".valueAt()");
  deepEqual(p2.valueAt(2).z, [9, -4], ".valueAt()");
  deepEqual(p2.valueAt(MathLib.complex([2, 3])).z, [-15, 41], ".valueAt()");

  equal(charPoly.valueAt(m).isZero(), true, 'Cayley–Hamilton theorem');
});



// Static methods
test('one()', 1, function () {
  var p = MathLib.polynomial.one;
  deepEqual(p, MathLib.polynomial([1]), 'Testing .one');
});


test('zero()', 1, function () {
  var p = MathLib.polynomial.zero;
  deepEqual(p, MathLib.polynomial([0]), 'Testing .zero');
});

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


test('.toContentMathMLString()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equal(s.toContentMathMLString(),  '<set><cn>2</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathMLString() (set)');
  equal(m.toContentMathMLString(),  '<set><cn>2</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathMLString() (multiset)');
  equal(e.toContentMathMLString(),  '<emptyset/>', 'Testing .toContentMathMLString() (empty set)');
});


test('.toLaTeX()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equal(s.toLaTeX(),  '\\{2, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (set)');
  equal(m.toLaTeX(),  '\\{2, 2, 3, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (multiset)');
  equal(e.toLaTeX(),  '\\emptyset', 'Testing .toLaTeX() (empty set)');
});


test('.toMathMLString()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equal(s.toMathMLString(),  '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathMLString() (set)');
  equal(m.toMathMLString(),  '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathMLString() (multiset)');
  equal(e.toMathMLString(),  '<mi>&#x2205;</mi>', 'Testing .toMathMLString() (empty set)');
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

module("Vector");
test("init", 2, function () {
  var vector = MathLib.vector([1, 2, 3]);
  equal(vector.length, 3, "Testing the dimension");
  deepEqual(vector, [1, 2, 3], 'checking the entries');
});



// Properties
test('.constructor', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.constructor, MathLib.vector, 'Testing .constructor');
});


test('.type', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.type, 'vector', 'Testing .type');
});



// Methods
test('.isEqual()', 3, function () {
  var v = MathLib.vector([0, 1, 2]),
      w = MathLib.vector([0, 1, 2]),
      u = MathLib.vector([0, 0, 0]),
      x = MathLib.vector([0, 0, 0, 0]);
  equal(v.isEqual(w), true, ".isEqual()");
  equal(v.isEqual(u), false, ".isEqual()");
  equal(u.isEqual(x), false, ".isEqual()");
});


test('.isZero()', 2, function () {
  var v = MathLib.vector([0, 0, 0]),
      w = MathLib.vector([0, 0, 1]);
  equal(v.isZero(), true, ".isZero()");
  equal(w.isZero(), false, ".isZero()");
});


test(".map()", 2, function () {
  var p = MathLib.vector([1, 2, 3]),
      q = MathLib.vector([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'vector', ".type should be vector");
});


test('.minus()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equal(v.minus(w).isEqual(MathLib.vector([2, -4, -5])), true, ".minus()");
});


test('.neagtive()', 1, function () {
  var v = MathLib.vector([3, 1, 4]);
  equal(v.negative().isEqual(MathLib.vector([-3, -1, -4])), true, ".negative()");
});


test('.normalize()', 1, function () {
  var v = MathLib.vector([2, 3, 6]);
  equal(v.normalize().isEqual(MathLib.vector([2/7, 3/7, 6/7])), true, ".normalize()");
});


test('.outerProduct()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equal(v.outerProduct(w).isEqual(MathLib.matrix([[3, 15, 27], [1, 5, 9], [4, 20, 36]])), true, ".outerProduct()");
});


test('.plus()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equal(v.plus(w).isEqual(MathLib.vector([4, 6, 13])), true, ".plus()");
});


test('.scalarProduct()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equal(v.scalarProduct(w), 44, ".scalarProduct()");
});


test('.size()', 1, function () {
  var v = MathLib.vector([1, 2, 2]);
  equal(v.size(), 3, ".size()");
});


test('.times()', 2, function () {
  var v = MathLib.vector([1, 2, 3]),
      m = MathLib.matrix([[1,2,3],[4,5,6],[7,8,9]]);
  deepEqual(v.times(3), MathLib.vector([3, 6, 9]), ".times(number)");
  deepEqual(v.times(m), MathLib.vector([30, 36, 42]), ".times(matrix)");
});


test('.toArray()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(MathLib.type(v.toArray()), 'array', ".toArray()");
});


test('.toContentMathMLString()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toContentMathMLString(), '<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>', ".toContentMathML()String");
});


test('.toLaTeX()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toLaTeX(), '\\begin{pmatrix}\n\t1\\\\\n\t2\\\\\n\t3\n\\end{pmatrix}');
});


test('.toMathMLString()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', ".toMathMLString()");
});


test('.toString()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toString(), '(1, 2, 3)', ".toString()");
});


test('.vectorproduct()', 1, function () {
  var v = MathLib.vector([1, 2, 3]),
      w = MathLib.vector([-7, 8, 9]);
  deepEqual(v.vectorproduct(w), [-6, -30, 22], ".vectorProduct()");
});



// Static methods
test('zero()', 1, function () {
  var v = MathLib.vector.zero(3);
  equal(v.isZero(), true, 'testing zero vector');
});
