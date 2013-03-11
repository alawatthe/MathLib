// ### Vector.zero()
// Returns a zero vector of given size.
//
// *@param {number}* The number of entries in the vector.  
// *@returns {Vector}*
static zero = function (n : number) : Vector {
	var res = [], i;
	for (i=0; i<n; i++) {
		res.push(0); 
	}
	return new MathLib.Vector(res);
}