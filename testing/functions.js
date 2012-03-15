module("MathLib");
test("general", 1, function () {
  equals(typeof MathLib, 'object', "is MathLib defined");
});


test('abs', 3, function () {
  equals(MathLib.abs(42), 42);
  equals(MathLib.abs(-6), 6);
  equals(MathLib.abs(MathLib.complex([3, 4])), 5);
});


test('arccos', 3, function () {
  equals(MathLib.arccos(0), Math.PI / 2);
  equals(MathLib.arccos(1), 0);
  deepEqual(MathLib.arccos(MathLib.complex([3, 4])), MathLib.complex([0.9368124611557207, -2.305509031243476942041]));
});


// test('arccot', 3, function () {
//   equals(MathLib.arccot(0), Math.PI / 2);
//   equals(MathLib.arccot(1), Math.PI / 4);
//   deepEqual(MathLib.arccot(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arccsc', 3, function () {
//   equals(MathLib.arccsc(0), Infinity);
//   equals(MathLib.arccsc(1), Math.PI / 2);
//   deepEqual(MathLib.arccsc(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arcosh', 3, function () {
//   equals(MathLib.arcosh(0), '', 'pi/2 * i');
//   equals(MathLib.arcosh(1), 0);
//   deepEqual(MathLib.arcosh(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arcoth', 3, function () {
//   equals(MathLib.arcoth(0), '', 'pi/2 * i');
//   equals(MathLib.arcoth(1), Infinity);
//   deepEqual(MathLib.arcoth(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arcsch', 3, function () {
//   equals(MathLib.arcsch(0), '', 'i * Infinity');
//   equals(MathLib.arcsch(1), 0.8813735870195429);
//   deepEqual(MathLib.arcsch(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arcsec', 3, function () {
//   equals(MathLib.arcsec(0), '', 'i * Inifinity');
//   equals(MathLib.arcsec(1), 0);
//   deepEqual(MathLib.arcsec(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


test('arcsin', 3, function () {
  equals(MathLib.arcsin(0), 0);
  equals(MathLib.arcsin(1), Math.PI / 2);
  deepEqual(MathLib.arcsin(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
});


// test('arctan', 3, function () {
//   equals(MathLib.arctan(0), 0);
//   equals(MathLib.arctan(1), Math.PI / 4);
//   deepEqual(MathLib.arctan(MathLib.complex([3, 4])), MathLib.complex([1.4483069952314644, 0.15899719167999918]));
// });


// test('arsech', 3, function () {
//   equals(MathLib.arsech(0), Infinity);
//   equals(MathLib.arsech(1), 0);
//   deepEqual(MathLib.arsech(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arsinh', 3, function () {
//   equals(MathLib.arsinh(0), 0);
//   equals(MathLib.arsinh(1), 0.8813735870195429);
//   deepEqual(MathLib.arsinh(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('artanh', 3, function () {
//   equals(MathLib.artanh(0), 0);
//   equals(MathLib.artanh(1), Infinity);
//   deepEqual(MathLib.artanh(MathLib.complex([3, 4])), MathLib.complex([0.11750090731143381, 1.4099210495965755]), 'the function is currently returning π to less, it\'s not wrong but 1.4... would be better');
// });


test('.binomial', 4, function () {
  equals(MathLib.binomial(0, 0), 1);
  equals(MathLib.binomial(6, 3), 20);
  equals(MathLib.binomial(2, 4), 0);
  equals(MathLib.binomial(-4, 3), -20);
});


test('.compare', 3, function () {
  equals(MathLib.compare(12, 12), 0);
  equals(MathLib.compare(1, 2), -1);
  equals(MathLib.compare(23, MathLib.complex([3, 4])), 1);
});


test('.exp', 2, function () {
  equals(MathLib.exp(0), 1);
  equals(MathLib.exp(1), MathLib.e);
});


test('.hypot', 6, function () {
  equals(MathLib.isEqual(MathLib.hypot(3, 4), 5), true);
  equals(MathLib.isEqual(MathLib.hypot(3, 4, 12), 13), true);
  deepEqual(MathLib.hypot(NaN, 4), NaN);
  equals(MathLib.hypot(NaN, Infinity), Infinity);
  equals(MathLib.hypot(-Infinity, NaN), Infinity);
  equals(MathLib.hypot(Infinity, 4), Infinity);
});


test('.hypot2', 6, function () {
  equals(MathLib.isEqual(MathLib.hypot2(3, 4), 25), true);
  equals(MathLib.isEqual(MathLib.hypot2(3, 4, 12), 169), true);
  deepEqual(MathLib.hypot2(NaN, 4), NaN);
  equals(MathLib.hypot2(NaN, Infinity), Infinity);
  equals(MathLib.hypot2(-Infinity, NaN), Infinity);
  equals(MathLib.hypot2(Infinity, 4), Infinity);
});


test('.factor', 2, function () {
  deepEqual(MathLib.factor(12), MathLib.set([2, 2, 3], true));
  deepEqual(MathLib.factor(-15), MathLib.set([3, 5], true));
});


test('.factorial', 1, function () {
  equal(MathLib.factorial(6), 720);
});


test('.fallingFactorial', 4, function () {
  equals(MathLib.fallingFactorial(2, 0), 1);
  equals(MathLib.fallingFactorial(6, 3), 120);
  equals(MathLib.fallingFactorial(2, 4), 0);
  equals(MathLib.fallingFactorial(4, 3, 0.5), 4 * 3.5 * 3);
});


test('.fibonacci', 1, function () {
  equals(MathLib.fibonacci(4), 3, 'Is the fourth fibonacci number 3?');
});


test('.floor', 2, function () {
  equals(MathLib.floor(2.5), 2);
  equals(MathLib.floor(-2.5), -3);
});


test('.inverse', 1, function () {
  equals(MathLib.inverse(2), 1 / 2);
  // What makes most sense to return Infinity, NaN, undefined, ...?
  // equals(MathLib.inverse(0), );
});


test('.is', 7, function () {
  var p = MathLib.point([1, 2, 3]);
  equals(MathLib.is(2, 'number'), true);
  equals(MathLib.is(p, 'point'), true);
  equals(MathLib.is(p, 'vector'), true);
  equals(MathLib.is(p, 'array'), true);
  equals(MathLib.is(p, 'object'), true);
  equals(MathLib.is(p, 'line'), false);
  equals(MathLib.is([], 'array'), true);
});


test('.isFinite', 3, function () {
  equals(MathLib.isFinite(2), true);
  equals(MathLib.isFinite(Infinity), false);
  equals(MathLib.isFinite(-Infinity), false);
});


test('.isInt', 2, function () {
  equals(MathLib.isInt(2), true);
  equals(MathLib.isInt(2.5), false);
});


test('.isOne', 2, function () {
  equals(MathLib.isOne(1), true);
  equals(MathLib.isOne(2), false);
});


test('.isPrime', 2, function () {
  equals(MathLib.isPrime(4567), true);
  equals(MathLib.isPrime(112), false);
});


test('.isZero', 2, function () {
  equals(MathLib.isZero(0), true);
  equals(MathLib.isZero(1), false);
});


test('.max()', 2, function () {
  equals(MathLib.max([1, 42, 17, 4]), 42);
  equals(MathLib.max([1, 42, 17, 4], 2), 17);
});


test('risingFactorial', 3, function () {
  equals(MathLib.risingFactorial(2, 0), 1);
  equals(MathLib.risingFactorial(2, 3), 24);
  equals(MathLib.risingFactorial(3, 4, 0.5), 189);
});


test('sin', 3, function () {
  equals(MathLib.sin(0), 0);
  equals(MathLib.sin(Math.PI / 2), 1);
  ok(MathLib.isEqual(MathLib.sin(MathLib.complex([3, 4])), MathLib.complex([3.853738037919377, -27.016813258003932])));
});


test('type', 3, function () {
  equals(MathLib.type(42), 'number');
  equals(MathLib.type([6, 3]), 'array');
  equals(MathLib.type(MathLib.complex([2, 3])), 'complex');
});
