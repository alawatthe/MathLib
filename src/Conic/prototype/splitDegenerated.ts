/**
 * Splits a conic into one or two lines if the conic is degenerated.
 *
 * @return {boolean}
 */
splitDegenerated() {
	var n, i, j, B, C, p0, p1, p2,
			rank = this.primal.rank(),
			nonZeroSearch = function (C) {
				for (i = 0; i < 3; i++) {
					for (j = 0; j < 3; j++) {
						if (C[i][j] !== 0) {
							return;
						}
					}
				}
			};

	if (rank === 2) {
		if (this.dual[0][0] !== 0) {
			n = 0;
		}
		else if (this.dual[1][1] !== 0) {
			n = 1;
		}
		else {
			n = 2;
		}

		if (this.dual[n][n] < 0) {
			B = this.dual.negative();
		}
		else {
			B = this.dual;
		}

		p0 = B[0][n] / Math.sqrt(B[n][n]);
		p1 = B[1][n] / Math.sqrt(B[n][n]);
		p2 = B[2][n] / Math.sqrt(B[n][n]);
		C = this.primal.plus(new MathLib.Matrix([[0, p2, -p1], [-p2, 0, p0], [p1, -p0, 0]]));

		nonZeroSearch(C);

		return [new MathLib.Line(C[i]), new MathLib.Line([C[0][j], C[1][j], C[2][j]])];
	}


	else if (rank === 1) {
		nonZeroSearch(this.primal);
		return [new MathLib.Line(this.primal[i]), new MathLib.Line(this.primal[i])];
	}
}