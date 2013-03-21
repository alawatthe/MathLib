// ### Line.prototype.meet()
// Calculates the meeting point of two lines
//
// *@param {line}*  
// *@returns {point}*
meet(l : Line, dyn = false) : Point {
	var point,
			k = this;

	if (this.dimension === 2 && l.dimension === 2) {
		point = new MathLib.Point(this.vectorProduct(l));

		if (dyn) {
			Object.defineProperties(point, {
				"0": {
					get : function(){ return k[1]*l[2]-k[2]*l[1]; },
					set : function(){},
					enumerable : true,
					configurable : true
				},
				"1": {
					get : function(){ return k[2]*l[0]-k[0]*l[2]; },
					set : function(){},
					enumerable : true,
					configurable : true
				},
				"2": {
					get : function(){ return k[0]*l[1]-k[1]*l[0]; },
					set : function(){},
					enumerable : true,
					configurable : true
				}
			});
		}
		
		return point;
	}
}