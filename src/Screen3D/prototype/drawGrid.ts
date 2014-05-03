/**
 * Draws the grid.
 *
 * @return {Screen3D}
 */
drawGrid() {
	if (!this.options.grid) {
		return this;
	}

	var _this = this,
			gridDrawer = function (opts, rotX, rotY) {
				var i, ii, tickX, tickY, lines, circles, rays,
						size = 10,
						grid = new THREE.Object3D(),
						color = new THREE.Color(opts.color);

				if (opts.type === 'cartesian') {
					tickX = 'x' in opts.tick ? opts.tick.x : opts.tick.y;
					tickY = 'z' in opts.tick ? opts.tick.z : opts.tick.y;
					lines = new THREE.Shape();

					for (i = -size; i <= size; i += tickX) {
						lines.moveTo(-size, i);
						lines.lineTo(size, i);
					}

					for (i = -size; i <= size; i += tickY) {
						lines.moveTo(i, -size);
						lines.lineTo(i, size);
					}

					grid.add(new THREE.Line(lines.createPointsGeometry(),
						new THREE.LineBasicMaterial({color: color}),
						THREE.LinePieces));

					grid.rotation.x = rotX;
					grid.rotation.y = rotY;

					_this.scene.add(grid);
				}

				else if (opts.type === 'polar') {

					circles = new THREE.Shape();
					rays = new THREE.Shape();

					for (i = 0; i <= size; i += opts.tick.r) {
						circles.moveTo(i, 0);
						circles.absarc(0, 0, i, 0, 2 * Math.PI + 0.001, false);
					}
					grid.add(new THREE.Line(circles.createPointsGeometry(),
											new THREE.LineBasicMaterial({color: color})));

					for (i = 0, ii = 2 * Math.PI; i < ii; i += opts.angle) {
						rays.moveTo(0, 0);
						rays.lineTo(size * Math.cos(i), size * Math.sin(i));
					}

					grid.add(new THREE.Line(rays.createPointsGeometry(), new THREE.LineBasicMaterial({color: color})));

					grid.rotation.x = rotX;
					grid.rotation.y = rotY;

					_this.scene.add(grid);

				}
			};


	gridDrawer(this.options.grid.xy, 0, 0);
	gridDrawer(this.options.grid.xz, Math.PI / 2, 0);
	gridDrawer(this.options.grid.yz, 0, Math.PI / 2);

	return this;
}