// ### Permutation.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {permutation}*
map(...args: any[]) {
	return new this['constructor'](Array.prototype.map.apply(this, args));
}