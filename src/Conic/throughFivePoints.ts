// ### [Conic.prototype.throughFivePoints()](http://mathlib.de/en/docs/Conic/throughFivePoints)
// Calculates the conic through five points.
//
// *@return {Conic}*
static throughFivePoints(p, q, r, s, t) : Conic {

	var conic = new MathLib.Conic([[1,0,0], [0,1,0], [0,0,1]]);

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