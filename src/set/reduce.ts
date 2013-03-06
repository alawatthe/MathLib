// ### Set.prototype.reduce()
// Works like the Array.prototype.reduce function
//  
// *@returns {any}*
reduce(...args : any[]) : any {
	return Array.prototype.reduce.apply(this, arguments);
}