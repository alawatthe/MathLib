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
	equal(MathLib.arctan2(-4, 0), -Math.PI / 2, 'Spec. 5: arctan2(y, &plusmn;0) is -&pi;/2 for y < 0');
	equal(MathLib.arctan2(-4, -0), -Math.PI / 2, 'Spec. 5: arctan2(y, &plusmn;0) is -&pi;/2 for y < 0');

	// Spec. 6: arctan2(y, &plusmn;0) is +&pi;/2 for y > 0
	equal(MathLib.arctan2(4, 0), Math.PI / 2, 'Spec. 6: arctan2(y, &plusmn;0) is +&pi;/2 for y > 0');
	equal(MathLib.arctan2(4, -0), Math.PI / 2, 'Spec. 6: arctan2(y, &plusmn;0) is +&pi;/2 for y > 0');

	// Spec. 7: arctan2(&plusmn;y, -&infin;) is &plusmn;&pi; for finite y > 0
	equal(MathLib.arctan2(4, -Infinity), Math.PI, 'Spec. 7: arctan2(&plusmn;y, -&infin;) is &plusmn;&pi; for finite y > 0');
	equal(MathLib.arctan2(-4, -Infinity), -Math.PI, 'Spec. 7: arctan2(&plusmn;y, -&infin;) is &plusmn;&pi; for finite y > 0');

	// Spec. 8: arctan2(&plusmn;y, +&infin;) is &plusmn;0 for finite y > 0
	equal(MathLib.isPosZero(MathLib.arctan2(4, Infinity)), true, 'Spec. 8: arctan2(&plusmn;y, +&infin;) is &plusmn;0 for finite y > 0');
	equal(MathLib.isNegZero(MathLib.arctan2(-4, Infinity)), true, 'Spec. 8: arctan2(&plusmn;y, +&infin;) is &plusmn;0 for finite y > 0');

	// Spec. 9: arctan2(&plusmn;&infin;, x) is &plusmn;&pi;/2 for finite x
	equal(MathLib.arctan2(Infinity, 4), Math.PI / 2, 'Spec. 9: arctan2(&plusmn;&infin;, x) is &plusmn;&pi;/2 for finite x');
	equal(MathLib.arctan2(-Infinity, 4), -Math.PI / 2, 'Spec. 9: arctan2(&plusmn;&infin;, x) is &plusmn;&pi;/2 for finite x');

	// Spec. 10: arctan2(&plusmn;&infin;, -&infin;) is &plusmn;3&pi;/4
	equal(MathLib.arctan2(Infinity, -Infinity), 3 / 4 * Math.PI, 'Spec. 10: arctan2(&plusmn;&infin;, -&infin;) is &plusmn;3&pi;/4');
	equal(MathLib.arctan2(-Infinity, -Infinity), -3 / 4 * Math.PI, 'Spec. 10: arctan2(&plusmn;&infin;, -&infin;) is &plusmn;3&pi;/4');

	// Spec. 11: arctan2(&plusmn;&infin;, +&infin;) is &plusmn;&pi;/4
	equal(MathLib.arctan2(Infinity, Infinity), Math.PI / 4, 'Spec. 11: arctan2(&plusmn;&infin;, +&infin;) is &plusmn;&pi;/4');
	equal(MathLib.arctan2(-Infinity, Infinity), -Math.PI / 4, 'Spec. 11: arctan2(&plusmn;&infin;, +&infin;) is &plusmn;&pi;/4');

	// Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)
	equal(MathLib.arctan2(1, 1), Math.PI / 4, 'Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)');
	equal(MathLib.arctan2(-1, 1), -Math.PI / 4, 'Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)');
});