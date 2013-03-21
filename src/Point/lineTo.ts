// ### Point.prototype.lineTo()
// Calculates a line connecting two points
//
// *@param {point}* The point to calculate the line to
// *@returns {line}*
lineTo(q : Point, dyn = false) : Line {
	var line,
			p = this;

	if (this.dimension === 2 && q.dimension === 2) {
		line = new MathLib.Line(this.vectorProduct(q));

		if (dyn) {
			Object.defineProperties(line, {
				"0": {
					get : function(){ return p[1]*q[2]-p[2]*q[1]; },
					set : function(){},
					enumerable : true,
					configurable : true
				},
				"1": {
					get : function(){ return p[2]*q[0]-p[0]*q[2]; },
					set : function(){},
					enumerable : true,
					configurable : true
				},
				"2": {
					get : function(){ return p[0]*q[1]-p[1]*q[0]; },
					set : function(){},
					enumerable : true,
					configurable : true
				}
			});
		}

		return line;
	}
}