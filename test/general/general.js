module('MathLib');
test('general', 1, function () {
	equal(typeof MathLib, 'object', 'is MathLib defined');
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
	equal(MathLib.type(new MathLib.Complex([2, 3])), 'complex', 'MathLib.type(MathLib.complex([2, 3])) = "complex"');
	equal(MathLib.type(42), 'number', 'MathLib.type(42) = "number"');
	equal(MathLib.type(['ar', 'ray']), 'array', 'MathLib.type([1,2]) = "array"');
	equal(MathLib.type({ob: 'ject'}), 'object', 'MathLib.type({obj: 42}) = "object"');
	equal(MathLib.type(true), 'boolean', 'MathLib.type(true) = "boolean"');
	equal(MathLib.type('string'), 'string', 'MathLib.type("str") = "string"');
	equal(MathLib.type(function(){}), 'function', 'MathLib.type(function(){}) = "function"');
	equal(MathLib.type(/regexp/), 'regexp', 'MathLib.type(/regexp/) = "regexp"');
	equal(MathLib.type(document.getElementsByTagName('div')[0]), 'htmldivelement', 'MathLib.type(document.getElementsByTagName("div")[0]) = "htmldivelement"');
	equal(MathLib.type(undefined), 'undefined', 'MathLib.type(undefined) = "undefined"');
	equal(MathLib.type(null), 'null', 'MathLib.type(null) = "null"');
});
