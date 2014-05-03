/**
 * Returns an array containing the quotient and the remainder of the division.
 *
 * Based on the "Schoolbook Division" in 
 * Karl Hasselström's "Fast Division of Large Integers"
 * http://www.treskal.com/kalle/exjobb/original-report.pdf
 *
 * @param {Integer} divisor - The divisor
 * @return {Integer[]}
 */
divrem(divisor : Integer) : Integer[] {
	var main, subroutine, quot, mult, temp, rem,
			base = Math.pow(2, 26);

		// Algorithm 3.1 Schoolbook division subroutine
		subroutine = function (A, B) {
			var q, T, temp, B1,
					n = A.data.length - 1;

			// Step 1
			if (A.data[n] >= B.data[n - 1]) {
				B1 = B.copy();
				B1.data.unshift(0);
				temp = subroutine(A.minus(B1), B);
				return [temp[0].plus(new MathLib.Integer(base)), temp[1]];
			}

			// Step 2
			// nothing to do

			// Step 3
			q = new MathLib.Integer(Math.min(Math.floor((A.data[n] * base + A.data[n - 1]) / B.data[n - 1]), base - 1));

			// Step 4
			T = B.times(q);

			// Step 5
			if (T.compare(A) === 1) {
				q = q.minus(new MathLib.Integer(1));
				T = T.minus(B);
			}

			// Step 6
			if (T.compare(A) === 1) {
				q = q.minus(new MathLib.Integer(1));
				T = T.minus(B);
			}

			// Step 7
			return [q, A.minus(T)];
		};




		// Algorithm 3.2 Schoolbook division
		main = function (A, B) {

			var q, r, q1, r1, temp, A1, s,
					m = A.data.length - 1,
					n = B.data.length - 1;

			// Step 1
			if (m < n) {
				return [new MathLib.Integer(0), A.copy()];
			}

			// Step 2
			if (m === n) {
				if (A.compare(B) === -1) {
					return [new MathLib.Integer(0), A.copy()];
				}
				else {
					return [new MathLib.Integer(1), A.minus(B)];
				}
			}


			// Step 3
			if (m === n + 1) {
				return subroutine(A, B);
			}

			// Step 4
			// A1 = floor(A / base^(m-n-1))
			A1 = new MathLib.Integer(A.data.slice(m - n - 1));
			s = new MathLib.Integer(A.data.slice(0, m - n - 1));

			// Step 5
			temp = subroutine(A1, B);
			q1 = temp[0];
			r1 = temp[1];

			// Step 6
			temp = main(new MathLib.Integer(s.data.concat(r1.data)), B);
			q = temp[0];
			r = temp[1];

			// Step 7
			return [new MathLib.Integer(q.data.concat(q1.data)), r];
		};



		if (this.isZero()) {
			return [new MathLib.Integer(0), new MathLib.Integer(0)];
		}


		if (divisor.data[divisor.data.length - 1] < base / 2) {
			mult = new MathLib.Integer(Math.ceil(base / (2 * divisor.data[divisor.data.length - 1])));
			temp = main(this.abs().times(mult), divisor.abs().times(mult));
			quot = temp[0];
			rem = new MathLib.Integer(temp[1].data[0] / mult.data[0]);
		}
		else {
			temp = main(this.abs(), divisor.abs());
			quot = temp[0];
			rem = temp[1];
		}


		if (this.sign === '-' && !rem.isZero()) {
			quot = quot.plus(new MathLib.Integer(1));
			rem = divisor.abs().minus(rem);
		}


		if (this.sign !== divisor.sign) {
			quot = quot.negative();
		}

		return [quot, rem];
}