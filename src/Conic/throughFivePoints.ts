/**
 * Calculates the conic through five points.
 *
 * @param {Point} p The first point
 * @param {Point} q The second point
 * @param {Point} r The third point
 * @param {Point} s The fourth point
 * @param {Point} t The fifth point
 * @return {Conic}
 */
static throughFivePoints(p : Point, q : Point, r : Point, s : Point, t : Point) : Conic {

	var conic = new MathLib.Conic(new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));

	Object.defineProperties(conic, {
			'primal': {
				get : function () {
					var G = p.vectorProduct(r).outerProduct(q.vectorProduct(s)),
							H = p.vectorProduct(s).outerProduct(q.vectorProduct(r)),
							M = G.times(t.times(H).scalarProduct(t)).minus(H.times(t.times(G).scalarProduct(t)));
					return M.transpose().plus(M);
				},
				set : function () {},
				enumerable : true,
				configurable : true
			}
		});

	return conic;
}