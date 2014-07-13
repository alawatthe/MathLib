/**
 * Calculates the meet of the conic with a line or a conic.
 *
 * @param {Line|Conic} x The line or conic to intersect with
 * @return {Point[]}
 */
meet(x) {
	var B, C, alpha, i, j, p1, p2, Ml,
			a, b, c, d, Delta0, Delta1, lambda, degenerated, lines,
			A = this.primal;

	if (x.type === 'line') {

		var setter = function () {
					MathLib.warning({
						message: 'Trying to change the coordinates of a completely dependent point.',
						method: 'Conic#meet'
					});
				},
				recalculate = function () {
					Ml = new MathLib.Matrix([[0, x[2], -x[1]], [-x[2], 0, x[0]], [x[1], -x[0], 0]]);
					B = Ml.transpose().times(A).times(Ml);

					if (!MathLib.isZero(x[0])) {
						alpha = Math.sqrt(B[2][1] * B[1][2] - B[1][1] * B[2][2]) / x[0];
					}
					else if (!MathLib.isZero(x[1])) {
						alpha = Math.sqrt(B[0][2] * B[2][0] - B[2][2] * B[0][0]) / x[1];
					}
					else {
						alpha = Math.sqrt(B[1][0] * B[0][1] - B[0][0] * B[1][1]) / x[2];
					}

					C = Ml.times(alpha).plus(B);


					nonZeroSearch: for (i = 0; i < 3; i++) {
						for (j = 0; j < 3; j++) {
							if (C[i][j] !== 0) {
								break nonZeroSearch;
							}
						}
					}
				};


		recalculate();


		p1 = new MathLib.Point(C[i]);
		Object.defineProperties(p1, {
			'0': {
				get: function () {
					recalculate();
					return C[i][0];
				},
				set: setter,
				enumerable: true
			},
			'1': {
				get: function () {
					recalculate();
					return C[i][1];
				},
				set: setter,
				enumerable: true
			},
			'2': {
				get: function () {
					recalculate();
					return C[i][2];
				},
				set: setter,
				enumerable: true
			}
		});



		p2 = new MathLib.Point([C[0][j], C[1][j], C[2][j]]);
		Object.defineProperties(p2, {
			'0': {
				get: function () {
					recalculate();
					return C[0][j];
				},
				set: setter,
				enumerable: true
			},
			'1': {
				get: function () {
					recalculate();
					return C[1][j];
				},
				set: setter,
				enumerable: true
			},
			'2': {
				get: function () {
					recalculate();
					return C[2][j];
				},
				set: setter,
				enumerable: true
			}
		});


		return [p1, p2];
	}
	else if (x.type === 'conic') {
		B = x.primal;
		a = A.determinant();
		b = (new MathLib.Matrix([A[0], A[1], B[2]]))
				.plus(new MathLib.Matrix([A[0], B[1], A[2]]))
				.plus(new MathLib.Matrix([B[0], A[1], A[2]])).determinant();
		c = (new MathLib.Matrix([A[0], B[1], B[2]]))
				.plus(new MathLib.Matrix([B[0], A[1], B[2]]))
				.plus(new MathLib.Matrix([B[0], B[1], A[2]])).determinant();
		d = B.determinant();
		Delta0 = b * b - 3 * a * c;
		Delta1 = 2 * b * b - 9 * a * b * c + 27 * a * a * d;
		C = MathLib.cbrt((Delta1 + Math.sqrt(Math.pow(Delta1, 2) - 4 * Math.pow(Delta0, 3))) / 2);
		lambda = - (b + C + Delta0 / C) / (3 * a);
		degenerated = new MathLib.Conic(B.times(lambda).plus(A));
		lines = degenerated.splitDegenerated();

		return this.meet(lines[0]).concat(this.meet(lines[1]));
	}
}
