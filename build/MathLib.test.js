/*! MathLib v0.3.5 MathLib.de | MathLib.de/en/license */

module("MathLib");
test("general", 1, function () {
  equal(typeof MathLib, 'object', "is MathLib defined");
});


// Static methods
test('.abs()', 7, function () {
  // Spec. 1: MathLib.abs(NaN) = NaN
  equal(MathLib.isNaN(MathLib.abs(NaN)), true, 'Spec. 1: MathLib.abs(NaN) = NaN');

  // Spec. 2: MathLib.abs(+0) = +0
  equal(MathLib.isPosZero(MathLib.abs(+0)), true, 'Spec. 2: MathLib.abs(+0) = +0');

  // Spec. 3: MathLib.abs(-0) = +0
  equal(MathLib.isPosZero(MathLib.abs(-0)), true, 'Spec. 3: MathLib.abs(-0) = +0');

  // Spec. 4: MathLib.abs(+&infin;) = &infin;
  equal(MathLib.abs(+Infinity), +Infinity, 'Spec. 4: MathLib.abs(+&infin;) = &infin;');

  // Spec. 5: MathLib.abs(-&infin;) = &infin;
  equal(MathLib.abs(-Infinity), +Infinity, 'Spec. 5: MathLib.abs(-&infin;) = &infin;');

  // Spec. 6: otherwise MathLib.abs(x) = absolute value of x
  equal(MathLib.abs(1), 1, 'Spec. 6: otherwise MathLib.abs(x) = absolute value of x');
  equal(MathLib.abs(-1), 1, 'Spec. 6: otherwise MathLib.abs(x) =  absolute value of x');
});


test('.arccos()', 8, function () {
  // Spec. 1: MathLib.arccos(NaN) = NaN
  equal(MathLib.isNaN(MathLib.arccos(NaN)), true, 'Spec. 1: MathLib.arccos(NaN) = NaN');

  // Spec. 2: MathLib.arccos(x) = NaN if x>1
  equal(MathLib.isNaN(MathLib.arccos(+Infinity)), true, 'Spec. 2: MathLib.arccos(x) = NaN if x>1');
  equal(MathLib.isNaN(MathLib.arccos(+2)), true, 'Spec. 2: MathLib.arccos(x) = NaN if x>1');

  // Spec. 3: MathLib.arccos(x) = NaN if x<-1
  equal(MathLib.isNaN(MathLib.arccos(-Infinity)), true, 'Spec. 3: MathLib.arccos(x) = NaN if x<-1');
  equal(MathLib.isNaN(MathLib.arccos(-2)), true, 'Spec. 3: MathLib.arccos(x) = NaN if x<-1');

  // Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x
  equal(MathLib.arccos(1), 0, 'Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x');
  equal(MathLib.arccos(+0), Math.PI/2, 'Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x');
  equal(MathLib.arccos(-1), Math.PI, 'Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x');
});


test('.arccot()', 5, function () {
  // Spec. 1: MathLib.arccot(NaN) = NaN
  equal(MathLib.isNaN(MathLib.arccot(NaN)), true, 'Spec. 1: MathLib.arccot(NaN) = NaN');

  // Spec. 2: MathLib.arccot(+&infin;) = +0
  equal(MathLib.isPosZero(MathLib.arccot(+Infinity)), true, 'Spec. 2: MathLib.arccot(+&infin;) = +0');

  // Spec. 3: MathLib.arccot(-&infin;) = &pi;
  equal(MathLib.arccot(-Infinity), Math.PI, 'Spec. 3: MathLib.arccot(-&infin;) = &pi;');

  // Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x
  equal(MathLib.arccot(1), Math.PI/4, 'Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x');
  equal(MathLib.arccot(+0), Math.PI/2, 'Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x');
});


test('.arccot()', 3, function () {
  equal(MathLib.arccot(0), Math.PI / 2);
  equal(MathLib.arccot(1), Math.PI / 4);
  deepEqual(MathLib.arccot(NaN), NaN);
});


test('.arccsc()', 9, function () {
  // Spec. 1: MathLib.arccsc(NaN) = NaN
  equal(MathLib.isNaN(MathLib.arccsc(NaN)), true, 'Spec. 1: MathLib.arccsc(NaN) = NaN');

  // Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)
  equal(MathLib.isNaN(MathLib.arccsc(+0)), true, 'Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)');
  equal(MathLib.isNaN(MathLib.arccsc(-0)), true, 'Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)');
  equal(MathLib.isNaN(MathLib.arccsc(0.5)), true, 'Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)');

  // Spec. 3: MathLib.arccsc(+&infin;) = +0
  equal(MathLib.isPosZero(MathLib.arccsc(+Infinity)), true, 'Spec. 3: MathLib.arccsc(+&infin;) = +0');

  // Spec. 4: MathLib.arccsc(-&infin;) = -0
  equal(MathLib.isNegZero(MathLib.arccsc(-Infinity)), true, 'Spec. 4: MathLib.arccsc(-&infin;) = -0');

  // Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x
  equal(MathLib.arccsc(1), Math.PI / 2, 'Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x');
  equal(MathLib.arccsc(-1), -Math.PI / 2, 'Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x');
  equal(MathLib.arccsc(2), Math.PI / 6, 'Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x');
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


test('.arcsec()', 9, function () {
  // Spec. 1: MathLib.arcsec(NaN) = NaN
  equal(MathLib.isNaN(MathLib.arcsec(NaN)), true, 'Spec. 1: MathLib.arcsec(NaN) = NaN');

  // Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)
  equal(MathLib.isNaN(MathLib.arcsec(+0)), true, 'Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)');
  equal(MathLib.isNaN(MathLib.arcsec(-0)), true, 'Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)');
  equal(MathLib.isNaN(MathLib.arcsec(0.5)), true, 'Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)');

  // Spec. 3: MathLib.arcsec(+&infin;) = &pi;/2
  equal(MathLib.arcsec(+Infinity), Math.PI/2, 'Spec. 3: MathLib.arcsec(+&infin;) = &pi;/2');

  // Spec. 4: MathLib.arcsec(-&infin;) = &pi;/2
  equal(MathLib.arcsec(-Infinity), Math.PI/2, 'Spec. 4: MathLib.arcsec(-&infin;) = &pi;/2');

  // Spec. 5: MathLib.arcsec(1) = +0
  equal(MathLib.isPosZero(MathLib.arcsec(1)), true, 'Spec. 5: otherwise MathLib.arcsec(1) = +0');

  // Spec. 6: otherwise MathLib.arcsec(x) = inverse secant of x
  equal(MathLib.arcsec(-1), Math.PI, 'Spec. 6: otherwise MathLib.arcsec(x) = inverse secant of x');
  equal(MathLib.arcsec(2), 2 * Math.PI / 6, 'Spec. 6: otherwise MathLib.arcsec(x) = inverse secant of x');
});


test('.arcsin()', 9, function () {
  // Spec. 1: MathLib.arcsin(NaN) = NaN
  equal(MathLib.isNaN(MathLib.arcsin(NaN)), true, 'Spec. 1: MathLib.arcsin(NaN) = NaN');

  // Spec. 2: MathLib.arcsin(+0) = +0
  equal(MathLib.isPosZero(MathLib.arcsin(+0)), true, 'Spec. 2: MathLib.arcsin(+0) = +0');

  // Spec. 3: MathLib.arcsin(-0) = -0
  equal(MathLib.isNegZero(MathLib.arcsin(-0)), true, 'Spec. 3: MathLib.arcsin(-0) = -0');

  // Spec. 4: MathLib.arcsin(x) = NaN if x>1
  equal(MathLib.isNaN(MathLib.arcsin(+Infinity)), true, 'Spec. 4: MathLib.arcsin(x) = NaN if x>1');
  equal(MathLib.isNaN(MathLib.arcsin(+2)), true, 'Spec. 4: MathLib.arcsin(x) = NaN if x>1');

  // Spec. 5: MathLib.arcsin(x) = NaN if x<-1
  equal(MathLib.isNaN(MathLib.arcsin(-Infinity)), true, 'Spec. 5: MathLib.arcsin(x) = NaN if x<-1');
  equal(MathLib.isNaN(MathLib.arcsin(-2)), true, 'Spec. 5: MathLib.arcsin(x) = NaN if x<-1');

  // Spec. 6: otherwise MathLib.arcsin(x) = inverse sine of x
  equal(MathLib.arcsin(1), Math.PI / 2, 'Spec. 6: otherwise MathLib.arcsin(x) = inverse sine of x');
  equal(MathLib.arcsin(-1), -Math.PI / 2, 'Spec. 6: otherwise MathLib.arcsin(x) = inverse sine of x');
});


test('.arctan()', 7, function () {
  // Spec. 1: MathLib.arctan(NaN) = NaN
  equal(MathLib.isNaN(MathLib.arctan(NaN)), true, 'Spec. 1: MathLib.arctan(NaN) = NaN');

  // Spec. 2: MathLib.arctan(+0) = +0
  equal(MathLib.isPosZero(MathLib.arctan(+0)), true, 'Spec. 2: MathLib.arctan(+0) = +0');

  // Spec. 3: MathLib.arctan(-0) = -0
  equal(MathLib.isNegZero(MathLib.arctan(-0)), true, 'Spec. 3: MathLib.arctan(-0) = -0');

  // Spec. 4: MathLib.arctan(+&infin;) = +&pi;/2
  equal(MathLib.arctan(+Infinity), +Math.PI / 2, 'Spec. 4: MathLib.arctan(+&infin;) = +&pi;/2');

  // Spec. 5: MathLib.arctan(-&infin;) = -&pi;/2
  equal(MathLib.arctan(-Infinity), -Math.PI / 2, 'Spec. 5: MathLib.arctan(-&infin;) = -&pi;/2');

  // Spec. 6: otherwise MathLib.arctan(x) = inverse tangent of x
  equal(MathLib.arctan(1), Math.PI / 4, 'Spec. 6: otherwise MathLib.arctan(x) = inverse tangent of x');
  equal(MathLib.arctan(-1), -Math.PI / 4, 'Spec. 6: otherwise MathLib.arctan(x) = inverse tangent of x');
});


test('.arctan2()', 24, function () {
  // Spec. 1: arctan2(&plusmn;0, -0) is &plusmn;&pi;
  equal(MathLib.arctan2(+0, -0), Math.PI, 'Spec. 1: arctan2(&plusmn;0, -0) is &plusmn;&pi;');
  equal(MathLib.arctan2(-0, -0), -Math.PI, 'Spec. 1: arctan2(&plusmn;0, -0) is &plusmn;&pi;');

  // Spec. 2: arctan2(&plusmn;0, +0) is &plusmn;0
  equal(MathLib.isPosZero(MathLib.arctan2(+0, 0)), true, 'Spec. 2: arctan2(&plusmn;0, +0) is &plusmn;0');
  equal(MathLib.isNegZero(MathLib.arctan2(-0, 0)), true, 'Spec. 2: arctan2(&plusmn;0, +0) is &plusmn;0');

  // Spec. 3: arctan2(&plusmn;0, x) is &plusmn;&pi; for x<0
  equal(MathLib.arctan2(+0, -4), Math.PI, 'Spec. 3: arctan2(&plusmn;0, x) is &plusmn;&pi; for x<0');
  equal(MathLib.arctan2(-0, -4), -Math.PI, 'Spec. 3: arctan2(&plusmn;0, x) is &plusmn;&pi; for x<0');

  // Spec. 4: arctan2(&plusmn;0, x) is &plusmn;0 for x>0
  equal(MathLib.isPosZero(MathLib.arctan2(+0, 4)), true, 'Spec. 4: arctan2(&plusmn;0, x) is &plusmn;0 for x>0');
  equal(MathLib.isNegZero(MathLib.arctan2(-0, 4)), true, 'Spec. 4: arctan2(&plusmn;0, x) is &plusmn;0 for x>0');

  // Spec. 5: arctan2(y, &plusmn;0) is -&pi;/2 for y < 0
  equal(MathLib.arctan2(-4, 0), -Math.PI/2, 'Spec. 5: arctan2(y, &plusmn;0) is -&pi;/2 for y < 0');
  equal(MathLib.arctan2(-4, -0), -Math.PI/2, 'Spec. 5: arctan2(y, &plusmn;0) is -&pi;/2 for y < 0');

  // Spec. 6: arctan2(y, &plusmn;0) is +&pi;/2 for y > 0
  equal(MathLib.arctan2(4, 0), Math.PI/2, 'Spec. 6: arctan2(y, &plusmn;0) is +&pi;/2 for y > 0');
  equal(MathLib.arctan2(4, -0), Math.PI/2, 'Spec. 6: arctan2(y, &plusmn;0) is +&pi;/2 for y > 0');

  // Spec. 7: arctan2(&plusmn;y, -&infin;) is &plusmn;&pi; for finite y > 0
  equal(MathLib.arctan2(4, -Infinity), Math.PI, 'Spec. 7: arctan2(&plusmn;y, -&infin;) is &plusmn;&pi; for finite y > 0');
  equal(MathLib.arctan2(-4, -Infinity), -Math.PI, 'Spec. 7: arctan2(&plusmn;y, -&infin;) is &plusmn;&pi; for finite y > 0');

  // Spec. 8: arctan2(&plusmn;y, +&infin;) is &plusmn;0 for finite y > 0
  equal(MathLib.isPosZero(MathLib.arctan2(4, Infinity)), true, 'Spec. 8: arctan2(&plusmn;y, +&infin;) is &plusmn;0 for finite y > 0');
  equal(MathLib.isNegZero(MathLib.arctan2(-4, Infinity)), true, 'Spec. 8: arctan2(&plusmn;y, +&infin;) is &plusmn;0 for finite y > 0');

  // Spec. 9: arctan2(&plusmn;&infin;, x) is &plusmn;&pi;/2 for finite x
  equal(MathLib.arctan2(Infinity, 4), Math.PI/2, 'Spec. 9: arctan2(&plusmn;&infin;, x) is &plusmn;&pi;/2 for finite x');
  equal(MathLib.arctan2(-Infinity, 4), -Math.PI/2, 'Spec. 9: arctan2(&plusmn;&infin;, x) is &plusmn;&pi;/2 for finite x');

  // Spec. 10: arctan2(&plusmn;&infin;, -&infin;) is &plusmn;3&pi;/4
  equal(MathLib.arctan2(Infinity, -Infinity), 3/4*Math.PI, 'Spec. 10: arctan2(&plusmn;&infin;, -&infin;) is &plusmn;3&pi;/4');
  equal(MathLib.arctan2(-Infinity, -Infinity), -3/4*Math.PI, 'Spec. 10: arctan2(&plusmn;&infin;, -&infin;) is &plusmn;3&pi;/4');

  // Spec. 11: arctan2(&plusmn;&infin;, +&infin;) is &plusmn;&pi;/4
  equal(MathLib.arctan2(Infinity, Infinity), Math.PI/4, 'Spec. 11: arctan2(&plusmn;&infin;, +&infin;) is &plusmn;&pi;/4');
  equal(MathLib.arctan2(-Infinity, Infinity), -Math.PI/4, 'Spec. 11: arctan2(&plusmn;&infin;, +&infin;) is &plusmn;&pi;/4');

  // Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)
  equal(MathLib.arctan2(1, 1), Math.PI/4, 'Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)');
  equal(MathLib.arctan2(-1, 1), -Math.PI/4, 'Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)');
});


test('.arithMean()', 1, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
  equal(MathLib.arithMean(s), 26/5, 'Testing .arithMean() (set)');
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

/*
test('.cbrt()', 7, function () {
  // Spec. 1: MathLib.cbrt(NaN) = NaN
  equal(MathLib.isNaN(MathLib.cbrt(NaN)), true, 'Spec. 1: MathLib.cbrt(NaN) = NaN');

  // Spec. 2: MathLib.cbrt(+0) = +0
  equal(MathLib.isPosZero(MathLib.cbrt(+0)), true, 'Spec. 2: MathLib.cbrt(+0) = +0');

  // Spec. 3: MathLib.cbrt(-0) = -0
  equal(MathLib.isNegZero(MathLib.cbrt(-0)), true, 'Spec. 3: MathLib.cbrt(-0) = -0');

  // Spec. 4: MathLib.cbrt(+&infin;) = +&infin;
  equal(MathLib.cbrt(+Infinity), +Infinity, 'Spec. 4: MathLib.cbrt(+&infin;) = +&infin;');

  // Spec. 5: MathLib.cbrt(-&infin;) = -&infin;
  equal(MathLib.cbrt(-Infinity), -Infinity, 'Spec. 5: MathLib.cbrt(-&infin;) = -&infin;');

  // Spec. 6: otherwise MathLib.cbrt(x) = cube root of x
  equal(MathLib.cbrt(8), 2, 'Spec. 6: otherwise MathLib.cbrt(x) = cube root of x');
  equal(MathLib.cbrt(-8), -2, 'Spec. 6: otherwise MathLib.cbrt(x) = cube root of x');
});*/


test('.ceil()', 7, function () {
  // Spec. 1: MathLib.ceil(NaN) = NaN
  equal(MathLib.isNaN(MathLib.ceil(NaN)), true, 'Spec. 1: MathLib.ceil(NaN) = NaN');

  // Spec. 2: MathLib.ceil(+0) = +0
  equal(MathLib.isPosZero(MathLib.ceil(+0)), true, 'Spec. 2: MathLib.ceil(+0) = +0');

  // Spec. 3: MathLib.ceil(-0) = -0
  equal(MathLib.isNegZero(MathLib.ceil(-0)), true, 'Spec. 3: MathLib.ceil(-0) = -0');

  // Spec. 4: MathLib.ceil(+&infin;) = +&infin;
  equal(MathLib.ceil(+Infinity), +Infinity, 'Spec. 4: MathLib.ceil(+&infin;) = +&infin;');

  // Spec. 5: MathLib.ceil(-&infin;) = -&infin;
  equal(MathLib.ceil(-Infinity), -Infinity, 'Spec. 5: MathLib.ceil(-&infin;) = -&infin;');

  // Spec. 6: otherwise MathLib.ceil(x) = ⎡x⎤
  equal(MathLib.ceil(2.2), 3, 'Spec. 6: otherwise MathLib.ceil(x) =  ⎡x⎤');
  equal(MathLib.ceil(-2.2), -2, 'Spec. 6: otherwise MathLib.ceil(x) = ⎡x⎤');
});


test('.compare()', 3, function () {
  equal(MathLib.compare(12, 12), 0);
  equal(MathLib.compare(1, 2), -1);
  equal(MathLib.compare(23, new MathLib.Complex([3, 4])), 1);
});


test('.cos()', 6, function () {
  // Spec. 1: MathLib.cos(NaN) = NaN
  equal(MathLib.isNaN(MathLib.cos(NaN)), true, 'Spec. 1: MathLib.cos(NaN) = NaN');

  // Spec. 2: MathLib.cos(+&infin;) = NaN
  equal(MathLib.isNaN(MathLib.cos(+Infinity)), true, 'Spec. 2: MathLib.cos(+&infin;) = NaN');

  // Spec. 3: MathLib.cos(-&infin;) = NaN
  equal(MathLib.isNaN(MathLib.cos(-Infinity)), true, 'Spec. 3: MathLib.cos(-&infin;) = NaN');

  // Spec. 4: otherwise MathLib.cos(x) = cosine of x
  equal(MathLib.cos(+0), 1, 'Spec. 4: otherwise MathLib.cos(x) = cosine of x');
  equal(MathLib.cos(-0), 1, 'Spec. 4: otherwise MathLib.cos(x) = cosine of x');
  equal(MathLib.cos(Math.PI), -1, 'Spec. 4: otherwise MathLib.cos(x) = cosine of x');
});


test('.cot()', 7, function () {
  // Spec. 1: MathLib.cot(NaN) = NaN
  equal(MathLib.isNaN(MathLib.cot(NaN)), true, 'Spec. 1: MathLib.cot(NaN) = NaN');

  // Spec. 2: MathLib.cot(+0) = +&infin;
  equal(MathLib.cot(+0), Infinity, 'Spec. 2: MathLib.cot(+0) = +&infin;');

  // Spec. 3: MathLib.cot(-0) = -&infin;
  equal(MathLib.cot(-0), -Infinity, 'Spec. 3: MathLib.cot(-0) = -&infin;');

  // Spec. 4: MathLib.cot(+&infin;) = NaN
  equal(MathLib.isNaN(MathLib.cot(+Infinity)), true, 'Spec. 4: MathLib.cot(+&infin;) = NaN');

  // Spec. 5: MathLib.cot(-&infin;) = NaN
  equal(MathLib.isNaN(MathLib.cot(-Infinity)), true, 'Spec. 5: MathLib.cot(-&infin;) = NaN');

  // Spec. 6: otherwise MathLib.cot(x) = cotangent of x
  equal(MathLib.cot(Math.PI/3), 1/Math.sqrt(3), 'Spec. 6: otherwise MathLib.cot(x) = cotangent of x');
  equal(MathLib.cot(Math.PI/2), 0, 'Spec. 6: otherwise MathLib.cot(x) = cotangent of x');
});


test('.csc()', 7, function () {
  // Spec. 1: MathLib.csc(NaN) = NaN
  equal(MathLib.isNaN(MathLib.csc(NaN)), true, 'Spec. 1: MathLib.csc(NaN) = NaN');

  // Spec. 2: MathLib.csc(+0) = +&infin;
  equal(MathLib.csc(+0), +Infinity, 'Spec. 2: MathLib.csc(+0) = +&infin;');

  // Spec. 3: MathLib.csc(-0) = -&infin;
  equal(MathLib.csc(-0), -Infinity, 'Spec. 3: MathLib.csc(-0) = -&infin;');

  // Spec. 4: MathLib.csc(+&infin;) = NaN
  equal(MathLib.isNaN(MathLib.csc(+Infinity)), true, 'Spec. 4: MathLib.csc(+&infin;) = NaN');

  // Spec. 5: MathLib.csc(-&infin;) = NaN
  equal(MathLib.isNaN(MathLib.csc(-Infinity)), true, 'Spec. 5: MathLib.csc(-&infin;) = NaN');

  // Spec. 6: otherwise MathLib.csc(x) = cosecant of x
  equal(MathLib.csc(Math.PI/2), 1, 'Spec. 6: otherwise MathLib.csc(x) = cosecant of x');
  equal(MathLib.csc(-Math.PI/2), -1, 'Spec. 6: otherwise MathLib.csc(x) = cosecant of x');
});


test('.degToRad()', 7, function () {
  // Spec. 1: MathLib.degToRad(NaN) = NaN
  equal(MathLib.isNaN(MathLib.degToRad(NaN)), true, 'Spec. 1: MathLib.degToRad(NaN) = NaN');

  // Spec. 2: MathLib.degToRad(+0) = +0
  equal(MathLib.isPosZero(MathLib.degToRad(+0)), true, 'Spec. 2: MathLib.degToRad(+0) = +0');

  // Spec. 3: MathLib.degToRad(-0) = -0
  equal(MathLib.isNegZero(MathLib.degToRad(-0)), true, 'Spec. 3: MathLib.degToRad(-0) = -0');

  // Spec. 4: MathLib.degToRad(+&infin;) = +&infin;
  equal(MathLib.degToRad(+Infinity), Infinity, 'Spec. 4: MathLib.degToRad(+&infin;) = +&infin;');

  // Spec. 5: MathLib.degToRad(-&infin;) = -&infin;
  equal(MathLib.degToRad(-Infinity), -Infinity, 'Spec. 5: MathLib.degToRad(-&infin;) = -&infin;');

  // Spec. 6: otherwise MathLib.degToRad(x) = x * π/180
  equal(MathLib.degToRad(90), Math.PI / 2, 'Spec. 6: otherwise MathLib.degToRad(x) = x * π/180');
  equal(MathLib.degToRad(180), Math.PI, 'Spec. 6: otherwise MathLib.degToRad(x) = x * π/180');
});


test('.exp()', 6, function () {
  // Spec. 1: MathLib.exp(NaN) = NaN
  equal(MathLib.isNaN(MathLib.exp(NaN)), true, 'Spec. 1: MathLib.exp(NaN) = NaN');

  // Spec. 2: MathLib.exp(+&infin;) = +&infin;
  equal(MathLib.exp(+Infinity), +Infinity, 'Spec. 2: MathLib.exp(+&infin;) = +&infin;');

  // Spec. 3: MathLib.exp(-&infin;) = +0
  equal(MathLib.isPosZero(MathLib.exp(-Infinity)), true, 'Spec. 3: MathLib.exp(-&infin;) = 0');

  // Spec. 4: otherwise MathLib.exp(x) = e^x
  equal(MathLib.exp(+0), 1, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
  equal(MathLib.exp(-0), 1, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
  equal(MathLib.exp(1), Math.E, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
});


test('.factor()', 2, function () {
  deepEqual(MathLib.factor(12), new MathLib.Set([2, 2, 3], true));
  deepEqual(MathLib.factor(-15), new MathLib.Set([3, 5], true));
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
  // Spec. 1: MathLib.floor(NaN) = NaN
  equal(MathLib.isNaN(MathLib.floor(NaN)), true, 'Spec. 1: MathLib.floor(NaN) = NaN');

  // Spec. 2: MathLib.floor(+0) = +0
  equal(MathLib.isPosZero(MathLib.floor(+0)), true, 'Spec. 2: MathLib.floor(+0) = +0');

  // Spec. 3: MathLib.floor(-0) = -0
  equal(MathLib.isNegZero(MathLib.floor(-0)), true, 'Spec. 3: MathLib.floor(-0) = -0');

  // Spec. 4: MathLib.floor(+&infin;) = +&infin;
  equal(MathLib.floor(+Infinity), +Infinity, 'Spec. 4: MathLib.floor(+&infin;) = +&infin;');

  // Spec. 5: MathLib.floor(-&infin;) = -&infin;
  equal(MathLib.floor(-Infinity), -Infinity, 'Spec. 5: MathLib.floor(-&infin;) = -&infin;');

  // Spec. 6: otherwise MathLib.floor(x) = ⎣x⎦
  equal(MathLib.floor(2.2), 2, 'Spec. 6: otherwise MathLib.floor(x) =  ⎣x⎦');
  equal(MathLib.floor(-2.2), -3, 'Spec. 6: otherwise MathLib.floor(x) = ⎣x⎦');
});


test('.geoMean()', 1, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
  equal(MathLib.geoMean(s), Math.pow(1728, 1 / 5), 'Testing .geoMean() (set)');
});


test('.harmonicMean()', 1, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
  equal(MathLib.harmonicMean(s), 3.7894736842105265, 'Testing .harmonicMean() (set)');
});


test('.hypot()', 16, function () {
  // Spec. 1: MathLib.hypot(x, y, ...) = +&infin; if any argument is infinite
  equal(MathLib.hypot(+Infinity, NaN), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +&infin; if any argument is infinite');
  equal(MathLib.hypot(NaN, +Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +&infin; if any argument is infinite');
  equal(MathLib.hypot(-Infinity, NaN), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +&infin; if any argument is infinite');
  equal(MathLib.hypot(NaN, -Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +&infin; if any argument is infinite');
  equal(MathLib.hypot(+Infinity, 2), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +&infin; if any argument is infinite');
  equal(MathLib.hypot(2, +Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +&infin; if any argument is infinite');
  equal(MathLib.hypot(-Infinity, 2), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +&infin; if any argument is infinite');
  equal(MathLib.hypot(2, -Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +&infin; if any argument is infinite');

  // Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite
  equal(MathLib.isNaN(MathLib.hypot(NaN, 2)), true, 'Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite');
  equal(MathLib.isNaN(MathLib.hypot(2, NaN)), true, 'Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite');

  // Spec. 3: MathLib.hypot(x, y, ...) = +0 if all arguments are &plusmn;0
  equal(MathLib.isPosZero(MathLib.hypot(0, 0)), true, 'Spec. 3: MathLib.hypot(x, y, ...) = +0 if all arguments are &plusmn;0');
  equal(MathLib.isPosZero(MathLib.hypot(-0, -0)), true, 'Spec. 3:MathLib.hypot(x, y, ...) = +0 if all arguments are &plusmn;0');


  // Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments
  equal(MathLib.isEqual(MathLib.hypot(3), 3), true, 'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
  equal(MathLib.isEqual(MathLib.hypot(-3), 3), true, 'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
  equal(MathLib.isEqual(MathLib.hypot(3, 4), 5), true, 'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
  equal(MathLib.isEqual(MathLib.hypot(3, 4, 12), 13), true, 'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
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
});


test('.is()', 12, function () {
  var p = new MathLib.Point([1, 2, 3]),
      v = new MathLib.Vector([1, 2, 3]);
  equal(MathLib.is(2, 'number'), true);
  equal(MathLib.is(p, 'point'), true);
  equal(MathLib.is(p, 'vector'), true);
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


test('.max()', 3, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
  equal(MathLib.max([1, 42, 17, 4]), 42);
  equal(MathLib.max(1, 42, 17, 4), 42);
  equal(MathLib.max(s), 9, 'Testing .max() (set)');
});


test('.min()', 3, function () {
  var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
  equal(MathLib.min([1, 42, 17, 4]), 1);
  equal(MathLib.min(1, 42, 17, 4), 1);
  equal(MathLib.min(s), 2, 'Testing .min() (set)');
});


test('.plus()', 5, function () {
  equal(MathLib.plus(), 0, 'The empty sum is zero.');
  equal(MathLib.plus([]), 0, 'The empty sum is zero.');
  equal(MathLib.plus(1, 2), 3);
  equal(MathLib.plus([1, 2]), 3);
  deepEqual(MathLib.plus(MathLib.Matrix.identity(3), MathLib.Matrix.identity(3)), new MathLib.Matrix([[2,0,0],[0,2,0],[0,0,2]]));
});


test('pow()', 65, function () {
  // Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)
  equal(MathLib.pow(1, +0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(0, +0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(-0, +0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(NaN, +0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(Infinity, +0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(-Infinity, +0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(1, -0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(0, -0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(-0, -0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(NaN, -0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(Infinity, -0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');
  equal(MathLib.pow(-Infinity, -0), 1, 'Spec. 1: MathLib.pow (x, &plusmn;0) = 1 (for any x, even a zero, NaN, or &plusmn;&infin;)');

  // Spec. 2: MathLib.pow (&plusmn;0, y) = &plusmn;&infin; (for y an odd integer < 0)
  equal(MathLib.pow(+0, -5), +Infinity, 'Spec. 2: MathLib.pow (&plusmn;0, y) = &plusmn;&infin; (for y an odd integer < 0)');
  equal(MathLib.pow(-0, -5), -Infinity, 'Spec. 2: MathLib.pow (&plusmn;0, y) = &plusmn;&infin; (for y an odd integer < 0)');

  // Spec. 3: MathLib.pow(&plusmn;0, -&infin;) = +&infin;
  equal(MathLib.pow(+0, -Infinity), Infinity, 'Spec. 3: MathLib.pow(&plusmn;0, -&infin;) = +&infin;');
  equal(MathLib.pow(-0, -Infinity), Infinity, 'Spec. 3: MathLib.pow(&plusmn;0, -&infin;) = +&infin;');

  // Spec. 4: MathLib.pow(&plusmn;0, +&infin;) = +0
  equal(MathLib.isPosZero(MathLib.pow(+0, Infinity)), true, 'Spec. 4: MathLib.pow(&plusmn;0, +&infin;) = +0');
  equal(MathLib.isPosZero(MathLib.pow(-0, Infinity)), true, 'Spec. 4: MathLib.pow(&plusmn;0, +&infin;) = +0');

  // Spec. 5: MathLib.pow (&plusmn;0, y) = +&infin; (for finite y < 0 and not an odd integer)
  equal(MathLib.pow(+0, -4), +Infinity, 'Spec. 5: MathLib.pow (&plusmn;0, y) = +&infin; (for finite y < 0 and not an odd integer)');
  equal(MathLib.pow(-0, -4), +Infinity, 'Spec. 5: MathLib.pow (&plusmn;0, y) = +&infin; (for finite y < 0 and not an odd integer)');
  equal(MathLib.pow(+0, -5.5), +Infinity, 'Spec. 5: MathLib.pow (&plusmn;0, y) = +&infin; (for finite y < 0 and not an odd integer)');
  equal(MathLib.pow(-0, -5.5), +Infinity, 'Spec. 5: MathLib.pow (&plusmn;0, y) = +&infin; (for finite y < 0 and not an odd integer)');

  // Spec. 6: MathLib.pow (&plusmn;0, y) = &plusmn;0 (for finite y > 0 an odd integer)
  equal(MathLib.isPosZero(MathLib.pow(+0, 5)), true, 'Spec. 6: MathLib.pow (&plusmn;0, y) = &plusmn;0 (for finite y > 0 an odd integer)');
  equal(MathLib.isNegZero(MathLib.pow(-0, 5)), true, 'Spec. 6: MathLib.pow (&plusmn;0, y) = &plusmn;0 (for finite y > 0 an odd integer)');

  // Spec. 7: MathLib.pow (&plusmn;0, y) = +0 (for finite y > 0 and not an odd integer)
  equal(MathLib.isPosZero(MathLib.pow(+0, 4)), true, 'Spec. 7: MathLib.pow (&plusmn;0, y) = +0 (for finite y > 0 and not an odd integer)');
  equal(MathLib.isPosZero(MathLib.pow(-0, 4)), true, 'Spec. 7: MathLib.pow (&plusmn;0, y) = +0 (for finite y > 0 and not an odd integer)');
  equal(MathLib.isPosZero(MathLib.pow(+0, 5.5)), true, 'Spec. 7: MathLib.pow (&plusmn;0, y) = +0 (for finite y > 0 and not an odd integer)');
  equal(MathLib.isPosZero(MathLib.pow(-0, 5.5)), true, 'Spec. 7: MathLib.pow (&plusmn;0, y) = +0 (for finite y > 0 and not an odd integer)');

  // Spec. 8: MathLib.pow(-1, &plusmn;&infin;) = 1
  equal(MathLib.pow(-1, +Infinity), 1, 'Spec. 8: MathLib.pow(-1, &plusmn;&infin;) = 1');
  equal(MathLib.pow(-1, -Infinity), 1, 'Spec. 8: MathLib.pow(-1, &plusmn;&infin;) = 1');

  // Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even &plusmn;&infin; and NaN)
  equal(MathLib.pow(1, 2), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even &plusmn;&infin; and NaN)');
  equal(MathLib.pow(1, -2), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even &plusmn;&infin; and NaN)');
  equal(MathLib.pow(1, +Infinity), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even &plusmn;&infin; and NaN)');
  equal(MathLib.pow(1, -Infinity), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even &plusmn;&infin; and NaN)');
  equal(MathLib.pow(1, NaN), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even &plusmn;&infin; and NaN)');

  // Spec. 10: MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)
  equal(MathLib.isNaN(MathLib.pow(-2, 2.5)), true, 'Spec. 10: MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)');
  equal(MathLib.isNaN(MathLib.pow(-2, 2.5)), true, 'Spec. 10: MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)');

  // Spec. 11: MathLib.pow(x, +&infin;) = +&infin; (for |x| > 1)
  equal(MathLib.pow(3, Infinity), Infinity, 'Spec. 11: MathLib.pow(x, +&infin;) = +&infin; (for |x| > 1)');
  equal(MathLib.pow(-3, Infinity), Infinity, 'Spec. 11: MathLib.pow(x, +&infin;) = +&infin; (for |x| > 1)');

  // Spec. 12: MathLib.pow(x, -&infin;) = +0 (for |x| > 1)
  equal(MathLib.isPosZero(MathLib.pow(3, -Infinity)), true, 'Spec. 12: MathLib.pow(x, -&infin;) = +0 (for |x| > 1)');
  equal(MathLib.isPosZero(MathLib.pow(-3, -Infinity)), true, 'Spec. 12: MathLib.pow(x, -&infin;) = +0 (for |x| > 1)');

  // Spec. 13: MathLib.pow(x, +&infin;) = +0 (for |x| < 1)
  equal(MathLib.isPosZero(MathLib.pow(0.5, +Infinity)), true, 'Spec. 13: MathLib.pow(x, +&infin;) = +0 (for |x| < 1)');
  equal(MathLib.isPosZero(MathLib.pow(-0.5, +Infinity)), true, 'Spec. 13: MathLib.pow(x, +&infin;) = +0 (for |x| < 1)');

  // Spec. 14: MathLib.pow(x, -&infin;) = +&infin; (for |x| < 1)
  equal(MathLib.pow(0.5, -Infinity), Infinity, 'Spec. 14: MathLib.pow(x, -&infin;) = +&infin; (for |x| < 1)');
  equal(MathLib.pow(-0.5, -Infinity), Infinity, 'Spec. 14: MathLib.pow(x, -&infin;) = +&infin; (for |x| < 1)');

  // Spec. 15: MathLib.pow(+&infin;, y) = +&infin; (for y > 0)
  equal(MathLib.pow(+Infinity, 2), Infinity, 'Spec. 15: MathLib.pow(+&infin;, y) = +&infin; (for y > 0)');
  equal(MathLib.pow(+Infinity, 2), Infinity, 'Spec. 15: MathLib.pow(+&infin;, y) = +&infin; (for y > 0)');
 
  // Spec. 16: MathLib.pow(+&infin;, y) = +0 (for y < 0)
  equal(MathLib.isPosZero(MathLib.pow(+Infinity, -2)), true, 'Spec. 16: MathLib.pow(+&infin;, y) = +0 (for y < 0)');
  equal(MathLib.isPosZero(MathLib.pow(+Infinity, -Infinity)), true, 'Spec. 16: MathLib.pow(+&infin;, y) = +0 (for y < 0)');
  
  // Spec. 17: MathLib.pow(-&infin;, y) = MathLib.pow(-0, -y)
  equal(MathLib.pow(-Infinity, 2), Infinity, 'Spec. 17: MathLib.pow(-&infin;, y) = MathLib.pow(-0, -y)');
  equal(MathLib.pow(-Infinity, +0), 1, 'Spec. 17: MathLib.pow(-&infin;, y) = MathLib.pow(-0, -y)');
  equal(MathLib.pow(-Infinity, -0), 1, 'Spec. 17: MathLib.pow(-&infin;, y) = MathLib.pow(-0, -y)');
  equal(MathLib.pow(-Infinity, Infinity), Infinity, 'Spec. 17: MathLib.pow(-&infin;, y) = MathLib.pow(-0, -y)');
  equal(MathLib.pow(-Infinity, -Infinity), 0, 'Spec. 17: MathLib.pow(-&infin;, y) = MathLib.pow(-0, -y)');

  // Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except &plusmn;0)
  equal(MathLib.isNaN(MathLib.pow(NaN, 1)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except &plusmn;0)');
  equal(MathLib.isNaN(MathLib.pow(NaN, Infinity)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except &plusmn;0)');
  equal(MathLib.isNaN(MathLib.pow(NaN, -Infinity)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except &plusmn;0)');
  equal(MathLib.isNaN(MathLib.pow(NaN, NaN)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except &plusmn;0)');

  // Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)
  equal(MathLib.isNaN(MathLib.pow(2, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
  equal(MathLib.isNaN(MathLib.pow(Infinity, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
  equal(MathLib.isNaN(MathLib.pow(-Infinity, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
  equal(MathLib.isNaN(MathLib.pow(0, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
  equal(MathLib.isNaN(MathLib.pow(-0, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');

  // Spec. 20: otherwise MathLib.pow(x, n) = x^n
  equal(MathLib.pow(2, 3), 8, 'Spec. 20: otherwise MathLib.pow(x, n) = x^n');
  equal(MathLib.pow(2, -3), 0.125, 'Spec. 20: otherwise MathLib.pow(x, n) = x^n');
});


test('.radToDeg()', 7, function () {
  // Spec. 1: MathLib.radToDeg(NaN) = NaN
  equal(MathLib.isNaN(MathLib.radToDeg(NaN)), true, 'Spec. 1: MathLib.radToDeg(NaN) = NaN');

  // Spec. 2: MathLib.radToDeg(+0) = +0
  equal(MathLib.isPosZero(MathLib.radToDeg(+0)), true, 'Spec. 2: MathLib.radToDeg(+0) = +0');

  // Spec. 3: MathLib.radToDeg(-0) = -0
  equal(MathLib.isNegZero(MathLib.radToDeg(-0)), true, 'Spec. 3: MathLib.radToDeg(-0) = -0');

  // Spec. 4: MathLib.radToDeg(+&infin;) = +&infin;
  equal(MathLib.radToDeg(+Infinity), Infinity, 'Spec. 4: MathLib.radToDeg(+&infin;) = +&infin;');

  // Spec. 5: MathLib.radToDeg(-&infin;) = -&infin;
  equal(MathLib.radToDeg(-Infinity), -Infinity, 'Spec. 5: MathLib.radToDeg(-&infin;) = -&infin;');

  // Spec. 6: otherwise MathLib.radToDeg(x) = x * 180/π
  equal(MathLib.radToDeg(Math.PI/2), 90, 'Spec. 6: otherwise MathLib.radToDeg(x) = x * π/180');
  equal(MathLib.radToDeg(Math.PI), 180, 'Spec. 6: otherwise MathLib.radToDeg(x) = x * π/180');
});


test('.risingFactorial()', 3, function () {
  equal(MathLib.risingFactorial(2, 0), 1);
  equal(MathLib.risingFactorial(2, 3), 24);
  equal(MathLib.risingFactorial(3, 4, 0.5), 189);
});


test('.round()', 10, function () {
  // Spec. 1: MathLib.round(NaN) = NaN
  equal(MathLib.isNaN(MathLib.round(NaN)), true, 'Spec. 1: MathLib.round(NaN) = NaN');

  // Spec. 2: MathLib.round(x) = +0 if +0 ≤ x < 0.5
  equal(MathLib.isPosZero(MathLib.round(+0)), true, 'Spec. 2: MathLib.round(x) = +0 if +0 ≤ x < 0.5');
  equal(MathLib.isPosZero(MathLib.round(+0.2)), true, 'Spec. 2: MathLib.round(x) = +0 if +0 ≤ x < 0.5');


  // Spec. 3: MathLib.round(x) = -0 if -0.5 ≤ x ≤ -0
  equal(MathLib.isNegZero(MathLib.round(-0)), true, 'Spec. 3: MathLib.round(x) = -0 if -0.5 ≤ x ≤ -0');
  equal(MathLib.isNegZero(MathLib.round(-0.5)), true, 'Spec. 3: MathLib.round(x) = -0 if -0.5 ≤ x ≤ -0');

  // Spec. 4: MathLib.round(+&infin;) = +&infin;
  equal(MathLib.round(+Infinity), +Infinity, 'Spec. 4: MathLib.round(+&infin;) = +&infin;');

  // Spec. 5: MathLib.round(-&infin;) = -&infin;
  equal(MathLib.round(-Infinity), -Infinity, 'Spec. 5: MathLib.round(-&infin;) = -&infin;');

  // Spec. 6: otherwise MathLib.round(x) = ⎣ x+0.5 ⎦
  equal(MathLib.round(2.2), 2, 'Spec. 6: otherwise MathLib.round(x) =  ⎣ x+0.5 ⎦');
  equal(MathLib.round(2.5), 3, 'Spec. 6: otherwise MathLib.round(x) = ⎣ x+0.5 ⎦');
  equal(MathLib.round(-2.2), -2, 'Spec. 6: otherwise MathLib.round(x) = ⎣ x+0.5 ⎦');
});


test('.sec()', 7, function () {
  // Spec. 1: MathLib.sec(NaN) = NaN
  equal(MathLib.isNaN(MathLib.sec(NaN)), true, 'Spec. 1: MathLib.sec(NaN) = NaN');

  // Spec. 2: MathLib.sec(+0) = 1
  equal(MathLib.sec(+0), 1, 'Spec. 2: MathLib.sec(+0) = 1');

  // Spec. 3: MathLib.sec(-0) = 1
  equal(MathLib.sec(-0), 1, 'Spec. 3: MathLib.sec(-0) = 1');

  // Spec. 4: MathLib.sec(+&infin;) = NaN
  equal(MathLib.isNaN(MathLib.sec(+Infinity)), true, 'Spec. 4: MathLib.sec(+&infin;) = NaN');

  // Spec. 5: MathLib.sec(-&infin;) = NaN
  equal(MathLib.isNaN(MathLib.sec(-Infinity)), true, 'Spec. 5: MathLib.sec(-&infin;) = NaN');

  // Spec. 6: otherwise MathLib.sec(x) = secant of x
  equal(MathLib.sec(Math.PI), -1, 'Spec. 6: otherwise MathLib.sec(x) = secant of x');
  equal(MathLib.sec(2*Math.PI), 1, 'Spec. 6: otherwise MathLib.sec(x) = secant of x');
});


test('.sign()', 7, function () {
  // Spec. 1: MathLib.sign(NaN) = NaN
  equal(MathLib.isNaN(MathLib.sign(NaN)), true, 'Spec. 1: MathLib.sign(NaN) = NaN');

  // Spec. 2: MathLib.sign(0) = 0
  equal(MathLib.isPosZero(MathLib.sign(0)), true, 'Spec. 2: MathLib.sign(0) = 0');

  // Spec. 3: MathLib.sign(-0) = -0
  equal(MathLib.isNegZero(MathLib.sign(-0)), true, 'Spec. 3: MathLib.sign(-0) = -0');

  // Spec. 4: MathLib.sign(x) = 1 for x > 0
  equal(MathLib.sign(4), 1, 'Spec. 4: MathLib.sign(x) = 1 for x > 0');
  equal(MathLib.sign(Infinity), 1, 'Spec. 4: MathLib.sign(x) = 1 for x > 0');

  // Spec. 5: MathLib.sign(x) = -1 for x < 0
  equal(MathLib.sign(-4), -1, 'Spec. 5: MathLib.sign(x) = -1 for x < 0');
  equal(MathLib.sign(-Infinity), -1, 'Spec. 5: MathLib.sign(x) = -1 for x < 0');
});


test('.sin()', 7, function () {
  // Spec. 1: MathLib.sin(NaN) = NaN
  equal(MathLib.isNaN(MathLib.sin(NaN)), true, 'Spec. 1: MathLib.sin(NaN) = NaN');

  // Spec. 2: MathLib.sin(+0) = +0
  equal(MathLib.isPosZero(MathLib.sin(+0)), true, 'Spec. 2: MathLib.sin(+0) = +0');

  // Spec. 3: MathLib.sin(-0) = -0
  equal(MathLib.isNegZero(MathLib.sin(-0)), true, 'Spec. 3: MathLib.sin(-0) = -0');

  // Spec. 4: MathLib.sin(+&infin;) = NaN
  equal(MathLib.isNaN(MathLib.sin(+Infinity)), true, 'Spec. 4: MathLib.sin(+&infin;) = NaN');

  // Spec. 5: MathLib.sin(-&infin;) = NaN
  equal(MathLib.isNaN(MathLib.sin(-Infinity)), true, 'Spec. 5: MathLib.sin(-&infin;) = NaN');

  // Spec. 6: otherwise MathLib.sin(x) = sine of x
  equal(MathLib.sin(Math.PI/2), 1, 'Spec. 6: otherwise MathLib.sin(x) = sine of x');
  equal(MathLib.sin(-Math.PI/2), -1, 'Spec. 6: otherwise MathLib.sin(x) = sine of x');
});


test('.sqrt()', 8, function () {
  // Spec. 1: MathLib.sqrt(NaN) = NaN
  equal(MathLib.isNaN(MathLib.sqrt(NaN)), true, 'Spec. 1: MathLib.sqrt(NaN) = NaN');

  // Spec. 2: MathLib.sqrt(+0) = +0
  equal(MathLib.isPosZero(MathLib.sqrt(+0)), true, 'Spec. 2: MathLib.sqrt(+0) = +0');

  // Spec. 3: MathLib.sqrt(-0) = -0
  equal(MathLib.isPosZero(MathLib.sqrt(-0)), true, 'Spec. 3: MathLib.sqrt(-0) = +0');

  // Spec. 4: MathLib.sqrt(+&infin;) = +&infin;
  equal(MathLib.sqrt(+Infinity), +Infinity, 'Spec. 4: MathLib.sqrt(+&infin;) = +&infin;');

  // Spec. 5: MathLib.sqrt(x) = NaN if x < 0
  equal(MathLib.isNaN(MathLib.sqrt(-Infinity)), true, 'Spec. 5: MathLib.sqrt(x) = NaN if x < 0');
  equal(MathLib.isNaN(MathLib.sqrt(-2)), true, 'Spec. 5: MathLib.sqrt(x) = NaN if x < 0');

  // Spec. 6: otherwise MathLib.sqrt(x) = square root of x
  equal(MathLib.sqrt(9), 3, 'Spec. 6: otherwise MathLib.sqrt(x) = square root of x');
  equal(MathLib.sqrt(2), 1.41421356237309504, 'Spec. 6: otherwise MathLib.sqrt(x) = square root of x');
});


test('.tan()', 7, function () {
  // Spec. 1: MathLib.tan(NaN) = NaN
  equal(MathLib.isNaN(MathLib.tan(NaN)), true, 'Spec. 1: MathLib.tan(NaN) = NaN');

  // Spec. 2: MathLib.tan(+0) = +0
  equal(MathLib.isPosZero(MathLib.tan(+0)), true, 'Spec. 2: MathLib.tan(+0) = +0');

  // Spec. 3: MathLib.tan(-0) = -0
  equal(MathLib.isNegZero(MathLib.tan(-0)), true, 'Spec. 3: MathLib.tan(-0) = -0');

  // Spec. 4: MathLib.tan(+&infin;) = NaN
  equal(MathLib.isNaN(MathLib.tan(+Infinity)), true, 'Spec. 4: MathLib.tan(+&infin;) = NaN');

  // Spec. 5: MathLib.tan(-&infin;) = NaN
  equal(MathLib.isNaN(MathLib.tan(-Infinity)), true, 'Spec. 5: MathLib.tan(-&infin;) = NaN');

  // Spec. 6: otherwise MathLib.tan(x) = tangent of x
  equal(MathLib.isZero(MathLib.tan(Math.PI)), true, 'Spec. 6: otherwise MathLib.tan(x) = tangent of x');
  equal(MathLib.isOne(MathLib.tan(Math.PI/4)), true, 'Spec. 6: otherwise MathLib.tan(x) = tangent of x');
});


test('.plus()', 5, function () {
  equal(MathLib.times(), 1, 'The empty product is one.');
  equal(MathLib.times([]), 1, 'The empty product is one.');
  equal(MathLib.times(1, 2), 2);
  equal(MathLib.times([1, 2]), 2);
  deepEqual(MathLib.times(MathLib.Matrix.identity(3), MathLib.Matrix.identity(3)), new MathLib.Matrix([[1,0,0],[0,1,0],[0,0,1]]));
});


test('.type()', 11, function () {
  equal(MathLib.type(new MathLib.Complex([2, 3])), 'complex', "MathLib.type(MathLib.complex([2, 3])) = 'complex'");
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
  var p = new MathLib.Point(1, 2),
      circle = new MathLib.Circle(p, 2);
  equal(circle.radius, 2, "Testing the radius");
  deepEqual(circle.center, p, "Testing the center");
});



// Properties
test('.constructor', 1, function () {
  var c = new MathLib.Circle(new MathLib.Point([2, 4, 2]), 2);
  equal(c.constructor, MathLib.Circle, 'Testing .constructor');
});

test('.type', 1, function () {
  var c = new MathLib.Circle(new MathLib.Point([2, 4, 2]), 2);
  equal(c.type, 'circle', 'Testing .type');
});
test('.area()', 5, function () {
  var p = new MathLib.Point(1, 2),
      c1 = new MathLib.Circle(p, NaN),
      c2 = new MathLib.Circle(p, +0),
      c3 = new MathLib.Circle(p, -0),
      c4 = new MathLib.Circle(p, Infinity),
      c5 = new MathLib.Circle(p, 2);

  // Spec. 1: c.area() = NaN if r = NaN
  equal(MathLib.isNaN(c1.area()), true, 'Spec. 1: c.area() = NaN if r = NaN');

  // Spec. 2: c.area() = +0 if r = +0
  equal(MathLib.isPosZero(c2.area()), true, 'Spec. 2: c.area() = +0 if r = +0');

  // Spec. 3: c.area() = -0 if r = +0
  equal(MathLib.isPosZero(c3.area()), true, 'Spec. 3: c.area() = -0 if r = +0');

  // Spec. 4: c.area() = &infin; if r = &infin;
  equal(c4.area(), Infinity, 'Spec. 4: c.area() = &infin; if r = &infin;');

  // Spec. 5: otherwise c.area() = &pi; r * r
  equal(c5.area(), 4 * MathLib.pi, 'Spec. 5: otherwise c.area() = &pi; * r * r');
});
test('.circumference()', 5, function () {
  var p = new MathLib.Point(1, 2),
      c1 = new MathLib.Circle(p, NaN),
      c2 = new MathLib.Circle(p, +0),
      c3 = new MathLib.Circle(p, -0),
      c4 = new MathLib.Circle(p, Infinity),
      c5 = new MathLib.Circle(p, 2);

  // Spec. 1: c.circumference() = NaN if r = NaN
  equal(MathLib.isNaN(c1.circumference()), true, 'Spec. 1: c.circumference() = NaN if r = NaN');

  // Spec. 2: c.circumference() = +0 if r = +0
  equal(MathLib.isPosZero(c2.circumference()), true, 'Spec. 2: c.circumference() = +0 if r = +0');

  // Spec. 3: c.circumference() = -0 if r = -0
  equal(MathLib.isNegZero(c3.circumference()), true, 'Spec. 3: c.circumference() = -0 if r = -0');

  // Spec. 4: c.circumference() = &infin; if r = &infin;
  equal(c4.circumference(), Infinity, 'Spec. 4: c.circumference() = &infin; if r = &infin;');

  // Spec. 5: otherwise c.circumference() = 2 &pi; r
  equal(c5.circumference(), 4 * MathLib.pi, 'Spec. 5: otherwise c.circumference() = 2 &pi; r');
});
// test('.draw()', 1, function () {
// });
test('.isEqual()', 3, function () {
  var c1 = new MathLib.Circle(new MathLib.Point(1, 2), 2),
      c2 = new MathLib.Circle(new MathLib.Point(1, 2), 3),
      c3 = new MathLib.Circle(new MathLib.Point([2, 4, 2]), 2),
      c4 = new MathLib.Circle(new MathLib.Point(2,3), 2);

  equal(c1.isEqual(c3), true, ".isEqual()");
  equal(c1.isEqual(c2), false, ".isEqual() different radius");
  equal(c1.isEqual(c4), false, ".isEqual() different center");
});
test(".positionOf()", 3, function () {
  var center = new MathLib.Point(1, 2),
      circle = new MathLib.Circle(center, 2),
      on = new MathLib.Point(1, 4),
      out = new MathLib.Point(2, 4),
      inside = new MathLib.Point(2, 3);

  equal(circle.positionOf(on), 'on', 'Point on the circle');
  equal(circle.positionOf(out), 'out', 'Point outside the circle');
  equal(circle.positionOf(inside), 'in', 'Point inside the circle');
});
test(".reflectAt()", 2, function () {
  var p = new MathLib.Point(1, 2),
      q = new MathLib.Point(3, 7),
      circle = new MathLib.Circle(p, 2),
      newcircle = circle.reflectAt(q);

  equal(newcircle.radius, 2, "Checking the radius.");
  deepEqual(newcircle.center, new MathLib.Point(5, 12), "Checking the center.");
});
test('.toLaTeX()', 1, function () {
  var p = new MathLib.Point(1, 2),
      c = new MathLib.Circle(p, 2);

  equal(c.toLaTeX(), 'B_{2}\\left(\\begin{pmatrix}1\\\\2\\end{pmatrix}\\right)', 'Spec. 1: ');
});
test('.toMatrix()', 1, function () {
  var p = new MathLib.Point(1, 2),
      c = new MathLib.Circle(p, 2);

   deepEqual(c.toMatrix(), new MathLib.Matrix([[1,0,-1],[0,1,-2],[-1,-2,1]]), '');
});
module('Complex');
test('init (1 Array)', 2, function () {
  var c = new MathLib.Complex(1, 2);
  equal(c.re, 1, 'Testing the real part');
  equal(c.im, 2, 'Testing the imaginary part');
});

/*
test('init (1 Number)', 3, function () {
  var c = new MathLib.Complex(3);
  equal(c.re, 3, 'Testing the real part');
  equal(c.im, 0, 'Testing the imaginary part');
  deepEqual(c.z, [3, 0], 'Testing the complete complex number');
});

test('init (2 Numbers)', 3, function () {
  var c = new MathLib.Complex(3, 2);
  equal(c.re, 3 * Math.cos(2), 'Testing the real part');
  equal(c.im, 3 * Math.sin(2), 'Testing the imaginary part');
  deepEqual(c.z, [3 * Math.cos(2), 3 * Math.sin(2)], 'Testing the complete complex number');
});*/



// Properties
test('.constructor', 1, function () {
  var c = new MathLib.Complex(3, 4);
  equal(c.constructor, MathLib.Complex, 'Testing .constructor');
});

test('.type', 1, function () {
  var c = new MathLib.Complex(3, 4);
  equal(c.type, 'complex', 'Testing .type');
});



// Methods
test('.abs()', 2, function () {
  var c1 = new MathLib.Complex(3, 4),
      c2 = new MathLib.Complex(0, 0);

  equal(MathLib.isEqual(c1.abs(), 5), true, 'Absolut value of a complex number');
  equal(MathLib.isEqual(c2.abs(), 0), true, 'Absolut value of a complex number');
});


test('.arg()', 4, function () {
  var c1 = new MathLib.Complex(1, 1),
      c2 = new MathLib.Complex(1, -1),
      c3 = new MathLib.Complex(0, 0),
      c4 = new MathLib.Complex(-1, 0);

  equal(c1.arg(), 0.7853981633974483, '');
  equal(c2.arg(), -0.7853981633974483, '');
  equal(c3.arg(), 0,  '');
  equal(c4.arg(), 3.141592653589793,  '');
});


test('.compare()', 3, function () {
  var c = new MathLib.Complex(3, 2),
      d = new MathLib.Complex(1, 1),
      e = new MathLib.Complex(-1, 1);
  equal(c.compare(c), 0, 'equal complex numbers');
  equal(c.compare(d), 1, 'normal compare');
  equal(d.compare(e), -1,  '');
});


test('.conjugate()', 2, function () {
  var c = new MathLib.Complex(3, 4);
  c = c.conjugate();
  equal(c.re, 3, 'Checking the conjugate of a complex number');
  equal(c.im, -4, 'Checking the conjugate of a complex number');
});


test('.divide()', 2, function () {
  var c = new MathLib.Complex(3, 6),
      d = new MathLib.Complex(2, 5),
      e = new MathLib.Complex(3, 7);
  deepEqual(c.divide(3), new MathLib.Complex(1, 2), 'Dividing by a normal number.');
  ok(d.divide(e).isEqual(new MathLib.Complex(41 / 58, 1 / 58)), 'Dividing by a complex number.');
});


test('.inverse()', 2, function () {
  var c1 = new MathLib.Complex(3, 4),
      c2 = new MathLib.Complex(0, 2);
  deepEqual(c1.inverse(), new MathLib.Complex(3 / 25, -4 / 25), 'Checking the inverse of a complex number');
  deepEqual(c2.inverse(), new MathLib.Complex(0, -1 / 2), 'Checking the inverse of a complex number');
});


test('.isEqual()', 2, function () {
  var c = new MathLib.Complex(3, 4),
      d = new MathLib.Complex(3, 4),
      e = new MathLib.Complex(5, 3);
  equal(c.isEqual(d), true, 'equal number');
  equal(d.isEqual(e), false, 'different number');
});


test('.isFinite()', 2, function () {
  var c = new MathLib.Complex(3, 4),
      d = new MathLib.Complex(Infinity, 0);
  equal(c.isFinite(), true, 'finite complex number');
  equal(d.isFinite(), false, 'infinte complex number');
});


test('.isOne()', 2, function () {
  var c = new MathLib.Complex(3, 4),
      d = new MathLib.Complex(1, 0);
  equal(c.isOne(), false, '3+4i');
  equal(d.isOne(), true, 'complex one');
});


test('.isReal()', 2, function () {
  var c = new MathLib.Complex(3, 4),
      d = new MathLib.Complex(3, 0);
  equal(c.isReal(), false, '3+4i');
  equal(d.isReal(), true, '3+0i');
});


test('.isZero()', 2, function () {
  var c = new MathLib.Complex(3, 4),
      d = new MathLib.Complex(0, 0);
  equal(c.isZero(), false, 'non zero complex');
  equal(d.isZero(), true, 'complex zero');
});


test('.ln()', 1, function () {
  var c = new MathLib.Complex(3, 4),
      res = new MathLib.Complex(1.6094379124341003, 0.9272952180016123);
  equal(MathLib.isEqual(c.ln(), res), true, 'natural logarithm of the complex number');
});


test(".mod()", 1, function () {
  var c = new MathLib.Complex(5, 6),
      d = new MathLib.Complex(2, 0);
  equal(c.mod(3).isEqual(d), true, ".mod()");
});


test('.minus()', 1, function () {
  var c = new MathLib.Complex(3, -4),
      d = new MathLib.Complex(7, -8);
  deepEqual(c.minus(d), new MathLib.Complex(-4, 4), 'Checking the negative of a complex number');
});


test('.negative()', 2, function () {
  var c = new MathLib.Complex(3, -4);
  c = c.negative(); 
  equal(c.re, -3, 'Checking the negative of a complex number');
  equal(c.im, 4, 'Checking the negative of a complex number');
});


test('.plus()', 2, function () {
  var c = new MathLib.Complex(3, 4);
  var d = new MathLib.Complex(2, -5);
  deepEqual(c.plus(d), new MathLib.Complex(5, -1), 'Adding two complex numbers.');
  deepEqual(c.plus(5), new MathLib.Complex(8, 4), 'Adding a number to a complex numbers.');
});


test(".sign()", 1, function () {
  var c = new MathLib.Complex(5, 6),
      d = MathLib.Complex.polar(1, Math.atan2(6, 5));
  equal(c.sign().isEqual(d), true, ".sign()");
});


test('.sin()', 1, function () {
  ok(MathLib.isEqual(MathLib.sin(new MathLib.Complex(3, 4)), new MathLib.Complex(3.853738037919377, -27.016813258003932)));
});


test('.times()', 2, function () {
  var c = new MathLib.Complex(2, 5);
  var d = new MathLib.Complex(3, 7);
  deepEqual(c.times(3), new MathLib.Complex(6, 15), 'Multiplying by a normal number.');
  deepEqual(c.times(d), new MathLib.Complex(-29, 29), 'Multiplying by a complex number.');
});


test('.toContentMathMLString()', 5, function () {
  var c = new MathLib.Complex(3, 4),
      d = new MathLib.Complex(0, 7),
      e = new MathLib.Complex(4, 0),
      f = new MathLib.Complex(4, -5),
      g = new MathLib.Complex(0, 0);
  equal(c.toContentMathMLString(), '<cn type="complex-cartesian">3<sep/>4</cn>', 'Normal complex number.');
  equal(d.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>7</cn>', 'Real part is zero.');
  equal(e.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>0</cn>', 'Complex part is zero.');
  equal(f.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>-5</cn>', 'Complex part is negative.');
  equal(g.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>0</cn>', 'Number is zero.');
});


test('.toLaTeX()', 5, function () {
  var c = new MathLib.Complex(3, 4),
      d = new MathLib.Complex(0, 7),
      e = new MathLib.Complex(4, 0),
      f = new MathLib.Complex(4, -5),
      g = new MathLib.Complex(0, 0);
  equal(c.toLaTeX(), '3+4i', 'Normal complex number.');
  equal(d.toLaTeX(), '7i', 'Real part is zero.');
  equal(e.toLaTeX(), '4', 'Complex part is zero.');
  equal(f.toLaTeX(), '4-5i', 'Complex part is negative.');
  equal(g.toLaTeX(), '0', 'Number is zero.');
});


test('.toMathMLString()', 5, function () {
  var c = new MathLib.Complex(3, 4),
      d = new MathLib.Complex(0, 7),
      e = new MathLib.Complex(4, 0),
      f = new MathLib.Complex(4, -5),
      g = new MathLib.Complex(0, 0);
  equal(c.toMathMLString(), '<mn>3</mn><mo>+</mo><mn>4</mn><mo>&#x2062;</mo><mi>i</mi>', 'Normal complex number.');
  equal(d.toMathMLString(), '<mn>7</mn><mo>&#x2062;</mo><mi>i</mi>', 'Real part is zero.');
  equal(e.toMathMLString(), '<mn>4</mn>', 'Complex part is zero.');
  equal(f.toMathMLString(), '<mn>4</mn><mo>-</mo><mn>5</mn><mo>&#x2062;</mo><mi>i</mi>', 'Complex part is negative.');
  equal(g.toMathMLString(), '<mn>0</mn>', 'Number is zero.');
});


test('.toMatrix()', 2, function () {
  var c = new MathLib.Complex(3, -4);
  equal(c.toMatrix().type, 'matrix', 'type check');
  deepEqual(c.toMatrix(), new MathLib.Matrix([[3, 4], [-4, 3]]), 'entries');
});


test('.toPoint()', 3, function () {
  var c = new MathLib.Complex(3, -4),
      p = c.toPoint();
  equal(p.type, 'point', 'Converting a complex number to a point: type check');
  equal(p.dim, 2, 'Converting a complex number to a point: dimension check.');
  deepEqual(p, new MathLib.Point([3, -4, 1]), 'Converting a complex number to a point: position check.');
});


test('.toString()', 5, function () {
  var c = new MathLib.Complex(3, 4),
      d = new MathLib.Complex(0, 7),
      e = new MathLib.Complex(4, 0),
      f = new MathLib.Complex(4, -5),
      g = new MathLib.Complex(0, 0);
  equal(c.toString(), '3+4i', 'Normal complex number.');
  equal(d.toString(), '7i', 'Real part is zero.');
  equal(e.toString(), '4', 'Complex part is zero.');
  equal(f.toString(), '4-5i', 'Complex part is negative.');
  equal(g.toString(), '0', 'Number is zero.');
});



// Static Properties
test('one', 1, function () {
  var c = MathLib.Complex.one;
  deepEqual(c, new MathLib.Complex(1, 0), '.one');
});


test('zero', 1, function () {
  var c = MathLib.Complex.zero;
  deepEqual(c, new MathLib.Complex(0, 0), '.zero');
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
test('init', 4, function () {
  var line = new MathLib.Line([3, 2, 1]);
  equal(line.dim, 2, 'Testing the dimension');
  equal(line[0], 3, 'Testing the entries');
  equal(line[1], 2, 'Testing the entries');
  equal(line[2], 1, 'Testing the entries');
});



// Properties
test('.constructor', 1, function () {
  var line = new MathLib.Line([3, 2, 1]);
  equal(line.constructor, MathLib.Line, 'Testing .constructor');
});


test('.type', 1, function () {
  var line = new MathLib.Line([3, 2, 1]);
  equal(line.type, 'line', 'Testing .type');
});



// Methods
test('.isEqual()', 3, function () {
  var line1 = new MathLib.Line([3, 2, 1]),
      line2 = new MathLib.Line([6, 4, 2]),
      line3 = new MathLib.Line([1, 1, 1]),
      line4 = new MathLib.Line([1, 1, 1, 1]);
  equal(line1.isEqual(line2), true, '.isEqual()');
  equal(line1.isEqual(line3), false, '.isEqual()');
  equal(line3.isEqual(line4), false, '.isEqual()');
});


test('.isFinite()', 2, function () {
  var line1 = new MathLib.Line([3, 2, 1]),
      line2 = new MathLib.Line([6, 4, 0]);
  equal(line1.isFinite(), true, '.isFinite()');
  equal(line2.isFinite(), false, '.isFinite()');
});


test(".map()", 2, function () {
  var p = new MathLib.Line([1, 2, 3]),
      q = new MathLib.Line([2, 4, 6]),
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
  var line = new MathLib.Line([3, 2, 1]);
  equal(line.toLaTeX(), '\\begin{pmatrix}\n\t3\\\\\n\t2\\\\\n\t1\n\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathMLString()', 1, function () {
  var line = new MathLib.Line([3, 2, 1]);
  equal(line.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
});


test('.toString()', 1, function () {
  var line = new MathLib.Line([3, 2, 1]);
  equal(line.toString(), '(3, 2, 1)', '.toString()');
});

module('MathML');
test('init', 2, function () {
  var mathML = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn></matrixrow></matrix></math>'),
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
  var mathML = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML">\n<set>\t<cn>  123  </cn><cs>String with spaces</cs> </set>\t</math>'),
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
  var m = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>');
  deepEqual(m.constructor, MathLib.MathML, 'Testing .constructor');
});


test('.type', 1, function () {
  var m = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>');
  equal(m.type, 'MathML', 'Testing .type');
});



// Methods
test('.parse() boolean', 8, function () {
  equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><true/></apply></math>').parse(), true, '</and> true true');
  equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><false/><true/></apply></math>').parse(), false, '</and> true false true');
  equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><false/><false/></apply></math>').parse(), false, '</or> false false');
  equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><true/><false/><true/></apply></math>').parse(), true, '</or> true false true');
  equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><false/><true/></apply></math>').parse(), true, '</xor> false false');
  equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><true/><false/><true/></apply></math>').parse(), false, '</xor> true false true');
  equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><false/></apply></math>').parse(), true, '</not> false');
  equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><true/></apply></math>').parse(), false, '</not> true');
});


test('.parse() ci', 1, function () {
  MathLib.MathML.variables.n = 42;
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><ci>n</ci></math>').parse(), 42, '.parse() a normal number');
});


test('.parse() cn', 5, function () {
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34</cn></math>').parse(), 34, '.parse() a normal number');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>34.2</cn></math>').parse(), 34.2, '.parse() a normal number');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>.123</cn></math>').parse(), 0.123, '.parse() a normal number');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34E-12</cn></math>').parse(), 34e-12, '.parse() a normal number');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34.345E-12</cn></math>').parse(), 34.345e-12, '.parse() a normal number');
});


test('.parse() complex', 2, function () {
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>').parse(), new MathLib.Complex(3, 4), '.parse() complex (cartesian)');
  ok(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-polar">1<sep/>3.141592653589793</cn></math>').parse().isEqual(new MathLib.Complex(-1, 0)), '.parse() complex (polar)');
});


test('.parse() function constructing', 6, function () {
 var expsin = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><exp/><apply><sin/><ci>x</ci></apply></apply></lambda></math>').parse();

  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><sin/><ci>x</ci></apply></lambda></math>').parse()(0), 0, '.parse() sin');
  deepEqual(expsin(0), 1, 'exp(sin(0)) = 1');
  deepEqual(expsin.type, 'functn', 'exp(sin(x)).type');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><ident/><ci>x</ci></apply></lambda></math>').parse()(42), 42, 'The identity function');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><cn>2</cn><ci>x</ci></apply></lambda></math>').parse()(42), 44, 'The result of 42 + 2 should be 44');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><ci>x</ci><cn>2</cn></apply></lambda></math>').parse()(42), 44, 'The result of 42 + 2 should be 44');
  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><bvar><ci>y</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><power/><ci>x</ci><ci>y</ci></apply></lambda></math>').parse()(4, 2), 16, 'Function with two arguments');
  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply><apply><power/><apply><cos/><ci>x</ci></apply><cn>2</cn></apply></apply></lambda></math>').parse()(42), 1, 'The result of sin^2(42) + cos^2(42) should be 1');
});


test('.parse() function evaluation', 5, function () {
  MathLib.MathML.variables.n = 42;

  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><sin/><cn>42</cn></apply></math>').parse(), Math.sin(42), '.parse() apply');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><sin/><ci>n</ci></apply></math>').parse(), Math.sin(42), '.parse() sin');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><plus/><cn>1</cn><cn>2</cn><cn>3</cn></apply></math>').parse(), 6, 'plus');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><ln/><cn>42</cn></apply></math>').parse(), Math.log(42), '.parse() apply');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><factorial/><cn>6</cn></apply></math>').parse(), 720, 'factorial');
});


test('.parse() matrix', 2, function () {
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>0</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>0</cn><cn>1</cn></matrixrow></matrix></math>').parse(), new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), '.parse() matrix');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><determinant/><matrix><matrixrow><cn>8</cn><cn>1</cn><cn>6</cn></matrixrow><matrixrow><cn>3</cn><cn>5</cn><cn>7</cn></matrixrow><matrixrow><cn>4</cn><cn>9</cn><cn>2</cn></matrixrow></matrix></apply></math>').parse(), -360, '.parse() apply');
});


test('.parse() set', 4, function () {
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn><cn>4</cn><cn>5</cn><cn>6</cn><cn>7</cn><cn>8</cn><cn>9</cn><cn>10</cn></set></math>').parse(), MathLib.Set.fromTo(1, 10), '.parse() set');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set type="multiset"><cn>1</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>3</cn><cn>2</cn><cn>4</cn></set></math>').parse(), new MathLib.Set([1, 2, 2, 3, 3, 3, 4], true), '.parse() set');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><union/><set><cn>1</cn><cn>2</cn></set><set><cn>2</cn><cn>3</cn></set></apply></math>').parse(), new MathLib.Set([1, 2, 3]), 'set union');
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cs>A</cs><cs>B</cs><cs> </cs></set></math>').parse(), new MathLib.Set(['A', 'B', ' ']), '.parse() set');
});


test('.parse() vector', 1, function () {
  deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').parse(), new MathLib.Vector([1, 2, 3]), '.parse() vector');
});

  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><minus/><cn>34</cn><cn>16</cn></apply></math>').parse(), 18, 'binary minus');
  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><minus/><cn>34</cn></apply></math>').parse(), -34, 'unary minus');

test('.toString()', 2, function (){
  var s1 = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><ci>x</ci><cn>2</cn></apply><apply><power/><ci>x</ci><cn>3</cn></apply></apply></lambda></math>',
      s2 = '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>a</mi><mo>&InvisibleTimes;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>b</mi><mo>&InvisibleTimes;</mo><mi>x</mi><mo>+</mo><mi>c</mi></mrow></math>';
  equal(new MathLib.MathML(s1).toString(), s1);
  equal(new MathLib.MathML(s2).toString(), s2);
});



// Static methods
// TODO: test if the result is right
test('.isSupported()', 1, function () {
  var supp = MathLib.MathML.isSupported();
  ok(supp === true || supp === false, '.isEqual()');
});

module('Matrix');
test('init', 2, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  equal(m.rows, 3, 'Testing the number of rows');
  equal(m.cols, 3, 'Testing the number of cols');
});



// Properties
test('.constructor', 1, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  equal(m.constructor, MathLib.Matrix, 'Testing .constructor');
});


test('.type', 1, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  equal(m.type, 'matrix', 'Testing .type');
});



// Methods
test('.adjugate()', 1, function () {
  var m = new MathLib.Matrix([[-3, 2, -5], [-1, 0, -3], [3, -4, 1]]),
      res = new MathLib.Matrix([[-12, 18, -6], [-8, 12, -4], [4, -6, 2]]);

  deepEqual(m.adjugate(), res, 'Adjoint matrix of a complex 2x3 matrix');
});


test('.adjoint()', 1, function () {
  var c = MathLib.Complex,
      m = new MathLib.Matrix([[new c(3, 1), 5, new c(0, -2)], [new c(2, -2), new c(0, 1), new c(-7, -13)]]),
      res = new MathLib.Matrix([[new c(3, -1), new c(2, 2)], [5, new c(0, -1)], [new c(0, 2), new c(-7, 13)]]);

  deepEqual(m.adjoint(), res, 'Adjoint matrix of a complex 2x3 matrix');
});


test('.cholesky()', 1, function () {
  var m = new MathLib.Matrix([[25, 15, -5], [15, 18, 0], [-5, 0, 11]]),
      res = new MathLib.Matrix([[5, 0, 0], [3, 3, 0], [-1, 1, 3]]);

  deepEqual(m.cholesky(), res, 'Cholesky decomposition of a 3x3 matrix');
});


test('.determinant()', 3, function () {
  var m = new MathLib.Matrix([[0, 1, 2], [3, 2, 1], [1, 1, 0]]),
      n = new MathLib.Matrix([[42]]),
      p = new MathLib.Matrix([[0, 1, 2], [3, 2, 1]]);

  equal(m.determinant(), 3, 'Determinant of a 3x3 matrix');
  equal(n.determinant(), 42, 'Determinant of 1x1 matrix');
  equal(p.determinant(), undefined, 'Determinant of 2x3 matrix should be undefined');
});


test('.gershgorin()', 2, function () {
  var c = MathLib.Complex,
      m = new MathLib.Matrix([[1,2,3], [4,5,6], [7,8,9]]),
      n = new MathLib.Matrix([[new c(1,4),2,3], [new c(2,3), new c(4,2),6], [7, new c(0,5),9]]),
      resm = [new MathLib.Circle([1,0], 5), new MathLib.Circle([5,0], 10), new MathLib.Circle([9,0], 9)],
      resn = [new MathLib.Circle([1,4], 5), new MathLib.Circle([4,2], 7), new MathLib.Circle([9,0], 9)];

  deepEqual(m.gershgorin(), resm, 'Gershgorin circles of a 3x3 matrix');
  deepEqual(n.gershgorin(), resn, 'Gershgorin circles of a complex 3x3 matrix');
});


test('.givens()', 9, function () {
  var m = new MathLib.Matrix([[3, 5], [0, 2], [0, 0], [4, 5]]),
      n = new MathLib.Matrix([[6, 5, 0], [5, 1, 4], [0, 4, 3]]),
      o = new MathLib.Matrix([[0, 1, 6], [3, 5, 7], [4, 9, 2]]),
      QRm = m.givens(),
      Qm = QRm[0],
      Rm = QRm[1],
      Q1 = new MathLib.Matrix([[3/5, 4/(5*Math.sqrt(5)), 0, -8/(5*Math.sqrt(5))], [0, 2/Math.sqrt(5), 0, 1/Math.sqrt(5)], [0, 0, 1, 0], [4/5, -3/(5*Math.sqrt(5)), 0, 6/(5*Math.sqrt(5))]]),
      R1 = new MathLib.Matrix([[5, 7], [0, 2.23606797749979], [0, 0], [0, 0]]),

      QRn = n.givens(),
      Qn = QRn[0],
      Rn = QRn[1],
      Q2 = new MathLib.Matrix([[0.768221279597376, -0.332654179360071, -0.546970988744419], [0.640184399664480 , 0.399185015232086 , 0.656365186493303], [0, -0.854395997514289, 0.519622439307198]]),
      R2 = new MathLib.Matrix([[7.810249675906652, 4.481290797651358, 2.560737598657919], [0, -4.681669871625427, -0.966447931614524], [0, 0, 4.184328063894809]]),

      QRo = o.givens(),
      Qo = QRo[0],
      Ro = QRo[1],
      Q3 = new MathLib.Matrix([[0, -0.581238193719096, -0.813733471206735], [0.6, 0.650986776965388, -0.464990554975277], [0.8, -0.488240082724041, 0.348742916231458]]),
      R3 = new MathLib.Matrix([[5, 10.2, 5.8], [0, -1.720465053408526, 0.09299811099505462], [0, 0, -7.439848879604435]]);
  
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
  var m = new MathLib.Matrix([[2,1,3,0],[1,2,1,3],[0,1,2,1],[0,0,1,2]]);

  equal(m.isBandMatrix(1,2), true, 'band matrix');
  equal(m.isBandMatrix(1,1), false, 'upper bandwidth to small');
});

test('.isDiag()', 2, function () {
  var c = new MathLib.Complex(0, 0),
      m = new MathLib.Matrix([[1, 0, 0], [0, 5, 0], [0, 0, 9]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
  equal(m.isDiag(), true, 'square matrix');
  equal(n.isDiag(), false, 'non square matrix');
});


test('.isIdentity()', 2, function () {
  var m = new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
  equal(m.isIdentity(), true, '.isIdentity() on identity matrix');
  equal(n.isIdentity(), false, '.isIdentity() on non identity matrix');
});


test('.isInvertible()', 2, function () {
  var m = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 2]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 9, 15]]);
  equal(m.isInvertible(), true, '.isInvertible(), invertible matrix');
  equal(n.isInvertible(), false, '.isInvertible(), singular matrix');
});


test('.isLower()', 4, function () {
  var m = new MathLib.Matrix([[1, 0, 0], [4, 5, 0], [3, 0, 9]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
      o = new MathLib.Matrix([[1, 0, 0], [4, 5, 0]]),
      p = new MathLib.Matrix([[1, 0, 0], [4, 5, 0], [4, 0, 6], [4, 3, 2]]);
  equal(m.isLower(), true, 'upper matrix');
  equal(n.isLower(), false, 'non upper matrix');
  equal(o.isLower(), true, 'upper matrix');
  equal(p.isLower(), true, 'upper matrix');
});


test('.isOrthogonal()', 2, function () {
  var m = new MathLib.Matrix([[0.8, -0.6], [0.6, 0.8]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
  equal(m.isOrthogonal(), true, '.isOrthogonal() on orthogal matrix');
  equal(n.isOrthogonal(), false, '.isOrthogonal() on non orthogonal matrix');
});


test('.isPermutation()', 3, function () {
  var m = new MathLib.Matrix([[0, 1, 0], [1, 0, 0], [0, 0, 1]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 3, 4]]),
      o = new MathLib.Matrix([[0, 1, 0], [1, 0, 0], [0, 0, 0]]);
  equal(m.isPermutation(), true, 'permutation matrix');
  equal(n.isPermutation(), false, 'non permutation matrix');
  equal(o.isPermutation(), false, 'zero line');
});


test('.isPosDefinite()', 2, function () {
  var m = new MathLib.Matrix([[2, -1, 0], [-1, 2, -1], [0, -1, 2]]),
      n = new MathLib.Matrix([[1, 2], [2, 1]]);
  equal(m.isPosDefinite(), true, 'positiv definite matrix');
  equal(n.isPosDefinite(), false, 'non positiv definite matrix');
});


test('.isSquare()', 2, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8]]);
  equal(m.isSquare(), true, 'square matrix');
  equal(n.isSquare(), false, 'non square matrix');
});


test('.isSymmetric()', 2, function () {
  var c = new MathLib.Complex(4, 0),
      m = new MathLib.Matrix([[1, 7, c], [7, 0, 3], [4, 3, 1]]),
      n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
  equal(m.isSymmetric(), true, 'symmetric matrix');
  equal(n.isSymmetric(), false, 'non symmetric matrix');
});


test('.isUpper()', 4, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [0, 5, 6], [0, 0, 9]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
      o = new MathLib.Matrix([[1, 4, 7], [0, 5, 8]]),
      p = new MathLib.Matrix([[1, 4, 7], [0, 5, 8], [0, 0, 6], [0, 0, 0]]);
  equal(m.isUpper(), true, 'upper matrix');
  equal(n.isUpper(), false, 'non upper matrix');
  equal(o.isUpper(), true, 'upper matrix');
  equal(p.isUpper(), true, 'upper matrix');
});


test('.isVector()', 2, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = new MathLib.Matrix([[1, 2, 3]]);
  equal(m.isVector(), false, 'normal matrix');
  equal(n.isVector(), true, 'one row matrix');
});


test('.isZero()', 2, function () {
  var c = new MathLib.Complex(0, 0),
      m = new MathLib.Matrix([[0, 0, 0], [0, 0, c], [0, 0, 0]]),
      n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
  equal(m.isZero(), true, 'zero matrix');
  equal(n.isZero(), false, 'non zero matrix');
});


test('.LU()', 2, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
      n = new MathLib.Matrix([[1, 3, 5], [2, 4, 7], [1, 1, 0]]),
      res1 = new MathLib.Matrix([[1, 2, 3], [1, -1, -2], [3, 3, -2]]),
      res2 = new MathLib.Matrix([[2, 4, 7], [0.5, 1, 1.5], [0.5, -1, -2]]);

  deepEqual(m.LU(true), res1, 'LU decomposition');
  deepEqual(n.LU(), res2, 'LU decomposition');
});


test(".map()", 2, function () {
  var p = new MathLib.Matrix([[1, 2],[3, 4]]),
      q = new MathLib.Matrix([[2, 4], [6, 8]]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'matrix', ".type should be matrix");
});


test('.minus()', 2, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
      res = new MathLib.Matrix([[0, -2, -4], [2, 0, -2], [4, 2, 0]]),
      res1 = new MathLib.Matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  deepEqual(m.minus(n), res, 'subtracting two simple matrices');
  deepEqual(n.minus(n), res1, 'subtracting two simple matrices');
});


test('.negative()', 1, function () {
  var m = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
      res = new MathLib.Matrix([[-1, -4, -7], [-2, -5, -8], [-3, -6, -9]]);
  deepEqual(m.negative(), res, 'negative of a simple matrix');
});


test('.plus()', 1, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
      res = new MathLib.Matrix([[2, 6, 10], [6, 10, 14], [10, 14, 18]]);
  deepEqual(m.plus(n), res, 'adding two simple matrices');
});


test('.rank()', 2, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [0, 5, 4], [0, 10, 2]]),
      n = new MathLib.Matrix([[1, 2, 3], [0, 6, 4], [0, 3, 2]]);
  equal(m.rank(), 3, '.rank()');
  equal(n.rank(), 2, '.rank()');
});


test('.remove()', 3, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      res1 = new MathLib.Matrix([[1, 2, 3], [7, 8, 9]]),
      res2 = new MathLib.Matrix([[1, 3], [4, 6], [7, 9]]),
      res3 = new MathLib.Matrix([[4], [7]]);

  deepEqual(m.remove(1), res1, 'removing the second row');
  deepEqual(m.remove(false, 1), res2, 'removing the second column');
  deepEqual(m.remove([0], [1, 2]), res3, 'removing the first row and the second and third col');
});


test('.rref()', 2, function () {
  var m = new MathLib.Matrix([[1, 2, -1, -4], [2, 3, -1, -11], [-2, 0, -3, 22]]),
      n = new MathLib.Matrix([[1, 2, 3], [1, 2, 4], [2, 4, 7]]);

  deepEqual(m.rref(), new MathLib.Matrix([[1, 0, 0, -8], [0, 1, 0, 1], [0, 0, 1, -2]]), 'reduced row echelon form');
  deepEqual(n.rref(), new MathLib.Matrix([[1, 2, 0], [0, 0, 1], [0, 0, 0]]), 'singular matrix');
});


test('.solve()', 4, function () {
  var A1 = new MathLib.Matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
      b1 = new MathLib.Vector([2, 2, 0]),
      x1 = new MathLib.Vector([5, -6, 3]),
      A2 = new MathLib.Matrix([[1, 0, 3], [2, 1, 0], [0, 0, 1]]),
      b2 = new MathLib.Vector([10, 3, 3]),
      x2 = new MathLib.Vector([1, 1, 3]),
      c  = MathLib.Complex,
      A3 = new MathLib.Matrix([[new c(2, 3), 0, 3], [2, new c(-1, 5), 0], [new c(3, -4), new c(0, 1), 1]]),
      b3 = new MathLib.Vector([new c(5, 37), new c(5, 19), new c(21, 0)]),
      x3 = new MathLib.Vector([new c(4, 2), new c(3, 0), new c(1, 7)]);

  ok(A1.solve(b1).isEqual(x1), 'Solving a system of linear equations');
  deepEqual(A1.times(x1), b1, 'Showing the solution is right');

  deepEqual(A2.solve(b2), x2, 'Solving a system of linear equations');

  ok(A3.solve(b3).isEqual(x3), 'Solving a complex system of linear equations');
});


test('.times()', 4, function () {
  var m = new MathLib.Matrix([[1, 2], [3, 4]]),
      n = new MathLib.Matrix([[0, 1], [0, 0]]),
      res = new MathLib.Matrix([[0, 1], [0, 3]]),

      c  = MathLib.Complex,
      mc = new MathLib.Matrix([[new c(2, 3), 0, 3], [2, new c(-1, 5), 0], [new c(3, -4), new c(0, 1), 1]]),
      bc = new MathLib.Vector([new c(4, 2), 3, new c(1, 7)]),
      resc = new MathLib.Vector([new c(5, 37), new c(5, 19), new c(21, 0)]);

  deepEqual(m.times(3), new MathLib.Matrix([[3, 6], [9, 12]]), 'matrix scalar multiplication');
  deepEqual(m.times(new c(0, 1)), new MathLib.Matrix([[new c(0, 1), new c(0, 2)], [new c(0, 3), new c(0, 4)]]), 'matrix scalar multiplication');
  deepEqual(m.times(n), res, 'multiplying two simple matrices');
  deepEqual(mc.times(bc), resc, 'complex matrix times complex vector');
});


test('.trace()', 2, function () {
  var c = new MathLib.Complex(3, 4),
      m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = new MathLib.Matrix([[1, 2], [3, c]]);
  equal(m.trace(), 15, 'trace of a simple matrix');
  deepEqual(n.trace(), new MathLib.Complex(4, 4), 'trace of a complex matrix');
});


test('.transpose()', 2, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = new MathLib.Matrix([[1, 2, 3], [4, 5, 6]]);

  deepEqual(m.transpose(), new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]), 'transpose a square matrix');
  deepEqual(n.transpose(), new MathLib.Matrix([[1, 4], [2, 5], [3, 6]]), 'transpose of a rectangular matrix');
});


test('.toArray()', 4, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      a = m.toArray();

  deepEqual(a, [[1, 2, 3], [4, 5, 6], [7, 8, 9]], '.toArray()');
  equal(Object.prototype.toString.call(a), '[object Array]', '.toArray()');
  equal(a.type, undefined, 'get sure that it is not a Mathlib object');
  a[0][0] = 42;
  deepEqual(m, new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 'make sure the matrix hasn\'t changed');
});


test('.toColVectors()', 1, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toColVectors(), [new MathLib.Vector([1, 4, 7]), new MathLib.Vector([2, 5, 8]), new MathLib.Vector([3, 6, 9])], '.toColVectors()');
});


test('.toComplex()', 1, function () {
  var m = new MathLib.Matrix([[1, -2], [2, 1]]);
  deepEqual(m.toComplex(), new MathLib.Complex(1, 2), 'convert a 2x2 matrix to a complex number');
});


test('.toContentMathMLString()', 1, function () {
  var m = new MathLib.Matrix([[1, 2], [3, 4]]);
  deepEqual(m.toContentMathMLString(), '<matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow></matrix>', '.toContentMathMLString()');
});


test('.toLaTeX()', 1, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toLaTeX(), '\\begin{pmatrix}\n1 & 2 & 3\\\n4 & 5 & 6\\\n7 & 8 & 9\n\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathMLString()', 1, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toMathMLString(), '<mrow><mo> ( </mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo> ) </mo></mrow>', '.toMathMLString()');
});


test('.toRowVectors()', 1, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toRowVectors(), [new MathLib.Vector([1, 2, 3]), new MathLib.Vector([4, 5, 6]), new MathLib.Vector([7, 8, 9])], '.toRowVectors()');
});


test('.toString()', 1, function () {
  var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toString(), '1\t2\t3\n4\t5\t6\n7\t8\t9', '.toString()');
});



// Static methods
test('identity()', 1, function () {
  equal(new MathLib.Matrix.identity(4).isIdentity(), true, 'creating a identity matrix');
});


test('numbers()', 3, function () {
  var m = new MathLib.Matrix.numbers(3, 2, 2),
      n = new MathLib.Matrix.numbers(4, 2),
      o = new MathLib.Matrix.numbers(5);
  deepEqual(m, new MathLib.Matrix([[3, 3], [3, 3]]), 'static number method');
  deepEqual(n, new MathLib.Matrix([[4, 4], [4, 4]]), 'static number method');
  deepEqual(o, new MathLib.Matrix([[5]]), 'static number method');
});

module('Permutation');
test('init', 1, function () {
  var p = new MathLib.Permutation([[0, 1], [2, 3]]);
  equal(typeof p, 'object', 'Testing typeof');
});



// Properties
test('.constructor', 1, function () {
  var p = new MathLib.Permutation([[0, 1], [2, 3]]);
  equal(p.constructor, MathLib.Permutation, 'Testing .constructor');
});


test('.type', 1, function () {
  var p = new MathLib.Permutation([[0, 1], [2, 3]]);
  equal(p.type, 'permutation', 'Testing .type');
});



// Methods
test('.applyTo()', 6, function () {
  var p = new MathLib.Permutation([[0, 1, 2], [0, 1, 2]]),
      r = new MathLib.Permutation([0, 2, 1]),
      q = new MathLib.Permutation([]),
      v = new MathLib.Vector([1, 2, 3]);

  equal(p.applyTo(0), 2, 'Testing .applyTo()');
  equal(p.applyTo(3), 3, 'Testing .applyTo()');
  deepEqual(r.applyTo(v), new MathLib.Vector([1, 3, 2]), 'Testing .applyTo()');
  equal(r.applyTo(v).type, 'vector', 'Testing .applyTo()');
  deepEqual(r.applyTo([1, 2, 3]), [1, 3, 2], 'Testing .applyTo()');
  equal(q.applyTo(1), 1, 'Testing .applyTo() with id');
});


test(".map()", 2, function () {
  var p = new MathLib.Permutation([1, 2, 3]),
      q = new MathLib.Permutation([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'permutation', ".type should be permutation");
});


test('.times()', 1, function () {
  var p = new MathLib.Permutation([2, 0, 1]),
      q = new MathLib.Permutation([0, 2, 1]);
  deepEqual(p.times(q), new MathLib.Permutation([2, 1, 0]), 'Testing .times()');
});


test('.sgn()', 2, function () {
  var p = new MathLib.Permutation([[0, 1], [1, 2]]),
      q = new MathLib.Permutation([[0, 1], [1, 2, 3]]);
  equal(p.sgn(), 1, 'Testing .sgn()');
  equal(q.sgn(), -1, 'Testing .sgn()');
});


test('.toMatrix()', 2, function () {
  var p = new MathLib.Permutation([[0, 1], [2, 3]]),
      q = new MathLib.Permutation([]),
      pm = new MathLib.Matrix([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]]),
      qm = new MathLib.Matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
  deepEqual(p.toMatrix(), pm, 'Testing .toMatrix()');
  deepEqual(q.toMatrix(4), qm, 'Testing .toMatrix() with id permutation');
});


test('.toString()', 2, function () {
  var p = new MathLib.Permutation([[0, 1], [2, 3]]),
      q = new MathLib.Permutation([]);
  equal(p.toString(), '(0,1)(2,3)', 'Testing .toString()');
  equal(q.toString(), '', 'Testing .toString() with id permutation');
});



// Static Methods
test('cycleToList()', 2, function () {
  var p = [[0, 1, 2], [3, 4]],
      q = [[0, 1], [2, 3]];
  deepEqual(new MathLib.Permutation.cycleToList(p), [1, 2, 0, 4, 3], 'Testing .cycleToList()');
  deepEqual(new MathLib.Permutation.cycleToList(q), [1, 0, 3, 2], 'Testing .cycleToList()');
});


test('listToCycle()', 1, function () {
  var p = [1, 2, 0, 4, 3];
  deepEqual(new MathLib.Permutation.listToCycle(p), [[0, 1, 2], [3, 4]], 'Testing .listToCycle()');
});

module('Point');
test('init', 1, function () {
  var point = new MathLib.Point([3, 2, 1]);
  equal(point.dim, 2, 'Testing the dimension');
});



// Properties
test('.constructor', 1, function () {
  var p = new MathLib.Point([3, 2, 1]);
  equal(p.constructor, MathLib.Point, 'Testing .constructor');
});


test('.type', 1, function () {
  var p = new MathLib.Point([3, 2, 1]);
  equal(p.type, 'point', 'Testing .type');
});



// Methods
test('.isEqual()', 3, function () {
  var point1 = new MathLib.Point([3, 2, 1]),
      point2 = new MathLib.Point([6, 4, 2]),
      point3 = new MathLib.Point([1, 1, 1]),
      point4 = new MathLib.Point([1, 1, 1, 1]);
  equal(point1.isEqual(point2), true, '.isEqual()');
  equal(point1.isEqual(point3), false, '.isEqual()');
  equal(point3.isEqual(point4), false, '.isEqual()');
});


test('.isFinite()', 2, function () {
  var point1 = new MathLib.Point([3, 2, 1]),
      point2 = new MathLib.Point([6, 4, 0]);
  equal(point1.isFinite(), true, '.isFinite()');
  equal(point2.isFinite(), false, '.isFinite()');
});


test('.isInside()', 3, function () {
  var p1 = new MathLib.Point([1, 0, 1]),
      p2 = new MathLib.Point([2, 0, 1]),
      p3 = new MathLib.Point([3, 0, 1]),
      c = new MathLib.Circle(new MathLib.Point([0, 0, 1]), 2);
  equal(p1.isInside(c), true, '.isInside()');
  equal(p2.isInside(c), false, '.isInside()');
  equal(p3.isInside(c), false, '.isInside()');
});


test('.isOn()', 3, function () {
  var p1 = new MathLib.Point([1, 0, 1]),
      p2 = new MathLib.Point([2, 0, 1]),
      p3 = new MathLib.Point([3, 0, 1]),
      c = new MathLib.Circle(new MathLib.Point([0, 0, 1]), 2);
  equal(p1.isOn(c), false, '.isOn()');
  equal(p2.isOn(c), true, '.isOn()');
  equal(p3.isOn(c), false, '.isOn()');
});


test('.isOutside()', 3, function () {
  var p1 = new MathLib.Point([1, 0, 1]),
      p2 = new MathLib.Point([2, 0, 1]),
      p3 = new MathLib.Point([3, 0, 1]),
      c = new MathLib.Circle(new MathLib.Point([0, 0, 1]), 2);
  equal(p1.isOutside(c), false, '.isOutside()');
  equal(p2.isOutside(c), false, '.isOutside()');
  equal(p3.isOutside(c), true, '.isOutside()');
});


test(".map()", 2, function () {
  var p = new MathLib.Point([1, 2, 3]),
      q = new MathLib.Point([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'point', ".type should be point");
});


test('.reflectAt()', 1, function () {
  var point1 = new MathLib.Point([0, 0, 1]),
      point2 = new MathLib.Point([1, 2, 1]),
      point3 = new MathLib.Point([2, 4, 1]);
  deepEqual(point1.reflectAt(point2), point3, '.reflectAt()');
});


// TODO: implement
// test('.toContentMathML', 2, function () {
//   var point = new MathLib.Point([3, 2, 1]);
//   equal(point.toContentMathML(), '', '.toContentMathML()');
//   equal(point.toContentMathML(true), '', '.toContentMathML()');
// });


test('.toLaTeX()', 2, function () {
  var point = new MathLib.Point([3, 2, 1]);
  equal(point.toLaTeX(), '\\begin{pmatrix}3\\\\2\\end{pmatrix}', '.toLaTeX()');
  equal(point.toLaTeX(true), '\\begin{pmatrix}3\\\\2\\\\1\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathMLString()', 2, function () {
  var point = new MathLib.Point([3, 2, 1]);
  equal(point.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
  equal(point.toMathMLString(true), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
});


test('.toString()', 2, function () {
  var point = new MathLib.Point([3, 2, 1]);
  equal(point.toString(), '(3, 2)', '.toString()');
  equal(point.toString(true), '(3, 2, 1)', '.toString()');
});

module("Polynomial");
test("init", 3, function () {
  var p = new MathLib.Polynomial([1, 2, 3, 4]),
      q = new MathLib.Polynomial(3),
      p1 = new MathLib.Polynomial([1, -4, new MathLib.Complex(2, 3)]);
  equal(p[0], 1, "coefficients");
  deepEqual(q[2], 0, "coefficients");
  deepEqual(p1[2], new MathLib.Complex(2, 3), ".coef");
});



// Properties
test('.constructor', 1, function () {
  var p = new MathLib.Polynomial([1, 2, 3]);
  equal(p.constructor, MathLib.Polynomial, 'Testing .constructor');
});


test(".deg", 1, function () {
  var p = new MathLib.Polynomial(3);
  equal(p.deg, 3, "testing if .degree is right");
});


test('.type', 1, function () {
  var p = new MathLib.Polynomial([1, 2, 3]);
  equal(p.type, 'polynomial', 'Testing .type');
});



// Methods
test(".differentiate()", 3, function () {
  var p = new MathLib.Polynomial(3);
  deepEqual(p.differentiate(), new MathLib.Polynomial([0, 0, 3]), ".differentiate()");
  deepEqual(p.differentiate(2), new MathLib.Polynomial([0, 6]), ".differentiate(2)");
  deepEqual(p.differentiate(4), new MathLib.Polynomial([0]), ".differentiate(4)");
});


test(".integrate()", 2, function () {
  var p = new MathLib.Polynomial([0, 0, 0, 1]);
  deepEqual(p.integrate(), new MathLib.Polynomial([0, 0, 0, 0, 0.25]), ".integrate()");
  deepEqual(p.integrate(2), new MathLib.Polynomial([0, 0, 0, 0, 0,  0.05]), ".integrate(2)");
});


test(".isEqual()", 1, function () {
  var c = new MathLib.Complex(0, 0),
      p = new MathLib.Polynomial(3),
      q = new MathLib.Polynomial([c, 0, 0, 1]);
  equal(q.isEqual(p), true, ".times(polynomial)");
});


test(".map()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'polynomial', ".type should be polynomial");
});


test(".mod()", 1, function () {
  var cp = new MathLib.Complex(5, 6),
      cq = new MathLib.Complex(2, 0),
      p = new MathLib.Polynomial([3, cp, -2, 0, 4, 5]),
      q = new MathLib.Polynomial([0, cq, 1, 0, 1, 2]);
  equal(p.mod(3).isEqual(q), true, ".mod()");
});


test(".plus()", 4, function () {
  var p = new MathLib.Polynomial(3),
      p1 = new MathLib.Polynomial([1, 2, 3]);
  deepEqual(p1.plus(12), new MathLib.Polynomial([13, 2, 3]), ".plus(integer)");
  deepEqual(p1.plus(12, true), new MathLib.Polynomial([13, 14, 15]), ".plus(integer, true)");
  deepEqual(p.plus(p1), new MathLib.Polynomial([1, 2, 3, 1]), ".plus(polynomial)");
  deepEqual(p1.plus(p), new MathLib.Polynomial([1, 2, 3, 1]), ".plus(polynomial)");
});


test(".times()", 3, function () {
  var p = new MathLib.Polynomial(3),
      p1 = new MathLib.Polynomial([1, 2, 3]);
  deepEqual(p1.times(5), new MathLib.Polynomial([5, 10, 15]), ".times(integer)");
  deepEqual(p.times(p1), new MathLib.Polynomial([0, 0, 0, 1, 2, 3]), ".times(polynomial)");
  deepEqual(p1.times(p), new MathLib.Polynomial([0, 0, 0, 1, 2, 3]), ".times(polynomial)");
});

test(".toContentMathMLString()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([-1, 0, 1]);
  deepEqual(p.toContentMathMLString(), '<apply><plus/><apply><times/><cn>3</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><apply><times/><cn>2</cn><ci>x</ci></apply><cn>1</cn></apply>', ".toContentMathMLString()");
  deepEqual(q.toContentMathMLString(), '<apply><plus/><apply><times/><cn>1</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><cn>-1</cn></apply>', ".toContentMathMLString()");
});



test(".toFunctn()", 3, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      f = p.toFunctn(),
      sinf = MathLib.sin(f);

  equal(f.type, 'functn', '.type should be functn');
  equal(sinf.toString(), 'sin(3*x^2+2*x+1)', 'composition with other functions');
  equal(f(42), 5377, 'fuctn evaluation');
});


test(".toLaTeX()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([-1, 0, 1]);
  deepEqual(p.toLaTeX(), '3*x^{2}+2x+1', ".toLaTeX()");
  deepEqual(q.toLaTeX(), '1*x^{2}-1', ".toLaTeX()");
});


test(".toMathMLString()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([-1, 0, 1]);
  deepEqual(p.toMathMLString(), '<mrow><mo>+</mo><mn>3</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mo>&#x2062;</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow>', ".toMathMLString()");
  deepEqual(q.toMathMLString(), '<mrow><mo>+</mo><mn>1</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mn>1</mn></mrow>', ".toMathMLString()");
});


test(".toString()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([-1, 0, 1]);
  deepEqual(p.toString(), '3*x^2+2*x+1', ".toString()");
  deepEqual(q.toString(), '1*x^2-1', ".toString()");
});


test(".valueAt()", 6, function () {
  var p = new MathLib.Polynomial(3),
      p1 = new MathLib.Polynomial([1, 2, 3]),
      p2 = new MathLib.Polynomial([1, -4, new MathLib.Complex(4, -1)]),
      m = new MathLib.Matrix([[1, 0, 1], [2, 2, 1], [4, 2, 1]]),
      charPoly = new MathLib.Polynomial([4, -1, -4, 1]);
  equal(p.valueAt(4), 64, ".valueAt()");
  equal(p1.valueAt(2), 17, ".valueAt()");

  deepEqual(p1.valueAt(new MathLib.Complex(2, 3)), new MathLib.Complex(-10, 42), ".valueAt()");
  deepEqual(p2.valueAt(2), new MathLib.Complex(9, -4), ".valueAt()");
  deepEqual(p2.valueAt(new MathLib.Complex(2, 3)), new MathLib.Complex(-15, 41), ".valueAt()");

  equal(charPoly.valueAt(m).isZero(), true, 'Cayley–Hamilton theorem');
});



// Static methods
test('one()', 1, function () {
  var p = MathLib.Polynomial.one;
  deepEqual(p, new MathLib.Polynomial([1]), 'Testing .one');
});


test('zero()', 1, function () {
  var p = MathLib.Polynomial.zero;
  deepEqual(p, new MathLib.Polynomial([0]), 'Testing .zero');
});

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

module('Vector');
test('init', 4, function () {
  var vector = new MathLib.Vector([1, 2, 3]);
  equal(vector.length, 3, 'Testing the dimension');
  equal(vector[0], 1, 'checking the entries');
  equal(vector[1], 2, 'checking the entries');
  equal(vector[2], 3, 'checking the entries');
});



// Properties
test('.constructor', 1, function () {
  var v = new MathLib.Vector([1, 2, 3]);
  equal(v.constructor, MathLib.Vector, 'Testing .constructor');
});


test('.type', 1, function () {
  var v = new MathLib.Vector([1, 2, 3]);
  equal(v.type, 'vector', 'Testing .type');
});
test('.areLinearIndependent()', 4, function () {
  var v1 = new MathLib.Vector([0, 0, 0]),
      v2 = new MathLib.Vector([1, 0, 0]),
      v3 = new MathLib.Vector([2, 0, 0]),
      v4 = new MathLib.Vector([0, 1, 0]),
      v5 = new MathLib.Vector([0, 0, 1]),
      v6 = new MathLib.Vector([0, 1]);
  equal(MathLib.Vector.areLinearIndependent([v1, v2]), false, '.areLinearIndependent()');
  equal(MathLib.Vector.areLinearIndependent([v2, v3]), false, '.areLinearIndependent()');
  equal(MathLib.Vector.areLinearIndependent([v2, v4, v5]), true, '.areLinearIndependent()');
  equal(MathLib.Vector.areLinearIndependent([v5, v6]), undefined, '.areLinearIndependent()');
});
test('.every()', 2, function () {
  var p = new MathLib.Vector([1, 2, 3]);

  equal(p.every(function (x) {return x > 0;}), true, '.every()');
  equal(p.every(function (x) {return x < 0;}), false, '.every()');
});
test('.forEach()', 1, function () {
  var p = new MathLib.Vector([1, 2, 3]),
      str = '',
      f = function (x) {
        str += x;
      },
      res = p.forEach(f);

  deepEqual(str, '123', '.forEach()');
});
test('.isEqual()', 3, function () {
  var v = new MathLib.Vector([0, 1, 2]),
      w = new MathLib.Vector([0, 1, 2]),
      u = new MathLib.Vector([0, 0, 0]),
      x = new MathLib.Vector([0, 0, 0, 0]);
  equal(v.isEqual(w), true, '.isEqual()');
  equal(v.isEqual(u), false, '.isEqual()');
  equal(u.isEqual(x), false, '.isEqual()');
});
test('.isZero()', 2, function () {
  var v = new MathLib.Vector([0, 0, 0]),
      w = new MathLib.Vector([0, 0, 1]);
  equal(v.isZero(), true, '.isZero()');
  equal(w.isZero(), false, '.isZero()');
});
test('.map()', 2, function () {
  var p = new MathLib.Vector([1, 2, 3]),
      q = new MathLib.Vector([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, '.map()');
  equal(res.type, 'vector', '.type should be vector');
});
test('.minus()', 2, function () {
  var v = new MathLib.Vector([3, 1, 4]),
      w = new MathLib.Vector([1, 5, 9]),
      u = new MathLib.Vector([1, 2]);
  equal(v.minus(w).isEqual(new MathLib.Vector([2, -4, -5])), true, '.minus()');
  equal(v.minus(u), undefined, '.minus()');
});
test('.neagtive()', 1, function () {
  var v = new MathLib.Vector([3, 1, 4]);
  equal(v.negative().isEqual(new MathLib.Vector([-3, -1, -4])), true, '.negative()');
});
test('.norm()', 5, function () {
  var v = new MathLib.Vector([1, 2, -2]);
  equal(v.norm(), 3, '.norm()');
  equal(v.norm(2), 3, '.norm(2)');
  equal(v.norm(1), 5, '.norm(1)');
  equal(v.norm(3), 2.571281590658235, '.norm(3)');
  equal(v.norm(Infinity), 2, '.norm(Infinity)');
});
test('.outerProduct()', 1, function () {
  var v = new MathLib.Vector([3, 1, 4]),
      w = new MathLib.Vector([1, 5, 9]);
  equal(v.outerProduct(w).isEqual(new MathLib.Matrix([[3, 15, 27], [1, 5, 9], [4, 20, 36]])), true, '.outerProduct()');
});
test('.plus()', 2, function () {
  var v = new MathLib.Vector([3, 1, 4]),
      w = new MathLib.Vector([1, 5, 9]),
      u = new MathLib.Vector([1, 2]);
  equal(v.plus(w).isEqual(new MathLib.Vector([4, 6, 13])), true, '.plus()');
  equal(v.plus(u), undefined, '.plus()');
});
test('.reduce()', 1, function () {
  var v = new MathLib.Vector([1, 2, 3]),
      f = function(prev, cur){
            return prev+cur;
          },
      res = v.reduce(f, 0);

  deepEqual(res, 6, '.reduce()');
});
test('.scalarProduct()', 3, function () {
  var v = new MathLib.Vector([3, 1, 4]),
      w = new MathLib.Vector([1, 5, 9]),
      u = new MathLib.Vector([1, 2]);

  equal(v.scalarProduct(w), 44, '.scalarProduct()');
  equal(u.scalarProduct(w), undefined, '.scalarProduct()');
  equal(v.scalarProduct(u), undefined, '.scalarProduct()');
});
test('.slice()', 2, function () {
  var v = new MathLib.Vector([1,2,3,4,5]);
  deepEqual(v.slice(1,3), [2,3], '.slice()');
  equal(MathLib.type(v.slice(1,3)), 'array', '.slice()');
});
test('.times()', 2, function () {
  var v = new MathLib.Vector([1, 2, 3]),
      m = new MathLib.Matrix([[1,2,3],[4,5,6],[7,8,9]]);
  deepEqual(v.times(3), new MathLib.Vector([3, 6, 9]), '.times(number)');
  deepEqual(v.times(m), new MathLib.Vector([30, 36, 42]), '.times(matrix)');
});
test('.toArray()', 2, function () {
  var v = new MathLib.Vector([1, 2, 3]);
  deepEqual(v.toArray(), [1,2,3], '.toArray()');
  equal(MathLib.type(v.toArray()), 'array', '.toArray()');
});
test('.toContentMathMLString()', 1, function () {
  var v = new MathLib.Vector([1, 2, 3]);
  equal(v.toContentMathMLString(), '<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>', '.toContentMathML()String');
});
test('.toLaTeX()', 1, function () {
  var v = new MathLib.Vector([1, 2, 3]);
  equal(v.toLaTeX(), '\\begin{pmatrix}\n\t1\\\\\n\t2\\\\\n\t3\n\\end{pmatrix}');
});
test('.toMathMLString()', 1, function () {
  var v = new MathLib.Vector([1, 2, 3]);
  equal(v.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
});
test('.toString()', 1, function () {
  var v = new MathLib.Vector([1, 2, 3]);
  equal(v.toString(), '(1, 2, 3)', '.toString()');
});
test('.vectorProduct()', 3, function () {
  var v = new MathLib.Vector([1, 2, 3]),
      w = new MathLib.Vector([-7, 8, 9]),
      u = new MathLib.Vector([1, 2]),
      res = new MathLib.Vector([-6, -30, 22]);
  equal(v.vectorProduct(w).isEqual(res), true, '.vectorProduct()');
  equal(u.vectorProduct(w), undefined, '.vectorProduct()');
  equal(v.vectorProduct(u), undefined, '.vectorProduct()');
});
test('zero()', 1, function () {
  var v = new MathLib.Vector.zero(3);
  equal(v.isZero(), true, 'testing zero vector');
});