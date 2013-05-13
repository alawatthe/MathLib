// ### Set.prototype.fromTo()
// Creates a set containing the numbers from a start value to a end value.
//
// *@param {number}* The number to start from  
// *@param {number}* The number to end with  
// *@param {number}* The stepsize (default = 1)  
// *@return {Set}*
static fromTo = function (f : number, t : number, s : number = 1) : Set {
	var i, set = [];
	if (f <= t) {
		for (i = f; i <= t; i += s) {
			set.push(i);
		}
		return new MathLib.Set(set);
	}
};