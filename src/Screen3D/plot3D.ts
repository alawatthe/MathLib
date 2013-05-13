// ### Screen3D.prototype.plot3D()
//
//
// *@param {function}* The map for the height  
// *@param {object}* Options  
// *@return {Screen3D}*
plot3D(f, options) : Screen3D {
	return this.surfacePlot3D(function (u, v) {
		return [u, v, f(u, v)];
	},
	options);
}