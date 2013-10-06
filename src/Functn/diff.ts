// ### [Functn.prototype.diff()](http://mathlib.de/en/docs/Functn/diff)
// Numeric derivative at a given point
//
// *@param {number}* The point  
// *@param {number}* Optional step size  
// *@return {number}*
functnPrototype.diff = function (x: number, h = 1e-5) : number {
	return (this(x + h) - this(x - h)) / (2 * h);
};