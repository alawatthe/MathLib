/**
 * Creates a plot of a three dimensional function
 *
 * @param {function} f The map for the height  
 * @param {object} options Optional drawing options
 * @return {Screen3D}
 */
plot3D(f, options) : Screen3D {
	return this.surfacePlot3D(function (u, v) {
		return [u, v, f(u, v)];
	},
	options);
}