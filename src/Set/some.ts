// ### Set.prototype.some()
// Works like the Array.prototype.some function
//  
// *@return {boolean}*
some(...args : any[]) : bool {
	return Array.prototype.some.apply(this, args);
}