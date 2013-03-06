// ### Screen3D.prototype.plot3D()
//
//
// *@param {function}* The map for the height  
// *@param {object}* Options  
// *@returns {screen3D}*
plot3D(f, options) {
	return this.surfacePlot3D(function (u, v){
		return [u,v,f(u,v)];
	},
	options);
}