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


test('.hypot()', 8, function () {
  equal(MathLib.isEqual(MathLib.hypot(3), 3), true, 'MathLib.hypot(x) is Math.abs(x)');
  equal(MathLib.isEqual(MathLib.hypot(-3), 3), true, 'MathLib.hypot(x) is Math.abs(x)');
  equal(MathLib.isEqual(MathLib.hypot(3, 4), 5), true);
  equal(MathLib.isEqual(MathLib.hypot(3, 4, 12), 13), true);
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
