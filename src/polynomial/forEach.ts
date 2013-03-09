// ### Polynomial.prototype.forEach()
// Works like the Array.prototype.forEach function
// 
forEach() : void {
	Array.prototype.forEach.apply(this, arguments);
}