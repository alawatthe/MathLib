/**
 * Creates a surface plot.
 *
 * @param {function} f The map for the surface
 * @param {object} options Optional drawing options
 * @return {Screen3D}
 */
surfacePlot3D(f, options) : Screen3D {
	var defaults = {
				material: {
					type: 'MeshLambert'
				},
				pointNumX: 100,
				pointNumY: 100,
				xmin: 0,
				xmax: 1,
				ymin: 0,
				ymax: 1
			},
			opts = extendObject(defaults, options),
			map = function (u, v) {
				u = (opts.xmax - opts.xmin) * u + opts.xmin;
				v = (opts.ymax - opts.ymin) * v + opts.ymin;
				var fuv = f(u, v);
				return new THREE.Vector3(fuv[0], fuv[1], fuv[2]);
			},
			material = new THREE[opts.material.type + 'Material'](opts.material),
			mesh;

			material.side = THREE.DoubleSide;

			mesh = new THREE.Mesh(
				new THREE.ParametricGeometry(map, opts.pointNumX, opts.pointNumY, false),
				material
			);

	this.scene.add(mesh);

	return this;
}