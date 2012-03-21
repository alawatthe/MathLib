module("MathLib");
test("general", 1, function () {
  equal(typeof MathLib, 'object', "is MathLib defined");
});


test('abs()', 4, function () {
  equal(MathLib.abs(42), 42);
  equal(MathLib.abs(-6), 6);
  equal(MathLib.isEqual(MathLib.abs(MathLib.complex([3, 4])), 5), true);
  deepEqual(MathLib.abs(NaN), NaN);
});


test('arccos()', 4, function () {
  equal(MathLib.arccos(0), Math.PI / 2);
  equal(MathLib.arccos(1), 0);
  equal(MathLib.isEqual(MathLib.arccos(MathLib.complex([3, 4])), MathLib.complex([0.9368124611557207, -2.305509031243476942041])), true);
  deepEqual(MathLib.arccos(NaN), NaN);
});


test('arccot()', 3, function () {
  equal(MathLib.arccot(0), Math.PI / 2);
  equal(MathLib.arccot(1), Math.PI / 4);
  deepEqual(MathLib.arccot(NaN), NaN);
});


test('arccsc()', 2, function () {
  equal(MathLib.arccsc(1), Math.PI / 2);
  deepEqual(MathLib.arccsc(NaN), NaN);
});


test('arcosh()', 2, function () {
  equal(MathLib.arcosh(1), 0);
  deepEqual(MathLib.arcosh(NaN), NaN);
});


test('arcoth()', 2, function () {
  equal(MathLib.arcoth(1), Infinity);
  deepEqual(MathLib.arcoth(NaN), NaN);
});


test('arcsch()', 2, function () {
  equal(MathLib.arcsch(1), 0.8813735870195429);
  deepEqual(MathLib.arcsch(NaN), NaN);
});


test('arcsec()', 2, function () {
  equal(MathLib.arcsec(1), 0);
  deepEqual(MathLib.arcsec(NaN), NaN);
});


test('arcsin()', 4, function () {
  equal(MathLib.arcsin(0), 0);
  equal(MathLib.arcsin(1), Math.PI / 2);
  equal(MathLib.isEqual(MathLib.arcsin(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041])), true);
  deepEqual(MathLib.arcsin(NaN), NaN);
});


test('arctan()', 3, function () {
  equal(MathLib.arctan(0), 0);
  equal(MathLib.arctan(1), Math.PI / 4);
  deepEqual(MathLib.arctan(NaN), NaN);
});


test('arsech()', 3, function () {
  equal(MathLib.arsech(0), Infinity);
  equal(MathLib.arsech(1), 0);
  deepEqual(MathLib.arsech(NaN), NaN);
});


test('arsinh()', 3, function () {
  equal(MathLib.arsinh(0), 0);
  equal(MathLib.arsinh(1), 0.8813735870195429);
  deepEqual(MathLib.arsinh(NaN), NaN);
});


test('artanh()', 3, function () {
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


test('.compare()', 3, function () {
  equal(MathLib.compare(12, 12), 0);
  equal(MathLib.compare(1, 2), -1);
  equal(MathLib.compare(23, MathLib.complex([3, 4])), 1);
});


test('cos()', 4, function () {
  equal(MathLib.cos(Math.PI), -1, 'MathLib.cos(Math.PI) should be -1');
  deepEqual(MathLib.cos(Infinity), NaN, 'MathLib.cos(Infinity) should be NaN');
  deepEqual(MathLib.cos(-Infinity), NaN, 'MathLib.cos(-Infinity) should be NaN');
  deepEqual(MathLib.cos(NaN), NaN, 'MathLib.cos(NaN) should be NaN');
});


test('.exp()', 2, function () {
  equal(MathLib.exp(0), 1);
  equal(MathLib.exp(1), MathLib.e);
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


test('.floor()', 2, function () {
  equal(MathLib.floor(2.5), 2);
  equal(MathLib.floor(-2.5), -3);
});


test('.inverse()', 1, function () {
  equal(MathLib.inverse(2), 1 / 2);
  // What makes most sense to return Infinity, NaN, undefined, ...?
  // equal(MathLib.inverse(0), );
});


test('.is()', 7, function () {
  var p = MathLib.point([1, 2, 3]);
  equal(MathLib.is(2, 'number'), true);
  equal(MathLib.is(p, 'point'), true);
  equal(MathLib.is(p, 'vector'), true);
  equal(MathLib.is(p, 'array'), true);
  equal(MathLib.is(p, 'object'), true);
  equal(MathLib.is(p, 'line'), false);
  equal(MathLib.is([], 'array'), true);
});


test('.isFinite()', 3, function () {
  equal(MathLib.isFinite(2), true);
  equal(MathLib.isFinite(Infinity), false);
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

test('.max()', 2, function () {
  equal(MathLib.max([1, 42, 17, 4]), 42);
  equal(MathLib.max([1, 42, 17, 4], 2), 17);
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





test('risingFactorial()', 3, function () {
  equal(MathLib.risingFactorial(2, 0), 1);
  equal(MathLib.risingFactorial(2, 3), 24);
  equal(MathLib.risingFactorial(3, 4, 0.5), 189);
});


test('sin()', 6, function () {
  equal(MathLib.sin(Math.PI / 2), 1, 'MathLib.sin(Math.PI / 2) should be 1');
  equal(MathLib.isPosZero(MathLib.sin(+0)), true, 'MathLib.sin(+0) should be +0');
  equal(MathLib.isNegZero(MathLib.sin(-0)), true, 'MathLib.sin(-0) should be -0');
  deepEqual(MathLib.sin(Infinity), NaN, 'MathLib.sin(Infinity) should be NaN');
  deepEqual(MathLib.sin(-Infinity), NaN, 'MathLib.sin(-Infinity) should be NaN');
  deepEqual(MathLib.sin(NaN), NaN, 'MathLib.sin(NaN) should be NaN');
});


test('type', 3, function () {
  equal(MathLib.type(42), 'number');
  equal(MathLib.type([6, 3]), 'array');
  equal(MathLib.type(MathLib.complex([2, 3])), 'complex');
});
