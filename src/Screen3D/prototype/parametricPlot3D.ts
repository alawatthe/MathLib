/**
 * Creates a parametric plot
 *
 * @param {function} f The function which is called on every argument  
 * @param {object} options Optional drawing options
 * @return {Screen3D}
 */
parametricPlot3D(f, options) : Screen3D {

	var defaults = {
				closed: false,
				debug: false,
				min: 0,
				max: 1,
				pointNum: 1000,
				radius: 0.05,
				segmentsRadius: 6,
				material: {
					type: 'MeshLambert'
				}
			},
			opts = extendObject(defaults, options),
			Curve = THREE.Curve.create(
				function () {},
				function (t) {
					t = (opts.max - opts.min) * t + opts.min;
					var ft = f(t);
					return new THREE.Vector3(ft[0], ft[1], ft[2]);
				}
			),
			mesh = new THREE.Mesh(
				new THREE.TubeGeometry(new Curve(), opts.pointNum, opts.radius, opts.segmentsRadius, opts.closed, opts.debug),
				new THREE[opts.material.type + 'Material'](opts.material)
			);

	this.scene.add(mesh);

	return this;
}