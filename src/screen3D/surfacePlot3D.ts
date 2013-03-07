// ### screen3D.prototype.surfacePlot()
//
//
// *@param {function}* The map for the surface    
// *@param {object}* Options  
// *@returns {screen3D}*
surfacePlot3D(f, options) {
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
				var res = f(u, v);
				return new THREE.Vector3(res[0], res[1], res[2]);
			},
			material = new THREE[opts.material.type + 'Material'](opts.material),
			mesh;

			material.side = THREE.DoubleSide;

			mesh = new THREE.Mesh(
				new THREE.ParametricGeometry(map, opts.pointNumX, opts.pointNumY, false),
				material
			);



	// if (options.datGUI) {
	//   guiObj = {
	//     color: [mesh.material.color.r, mesh.material.color.g, mesh.material.color.b]
	//   };

	//   var folder = _3D.datGUI.addFolder(options.datGUI.name);
	//   if (options.datGUI.visible) {
	//     folder.add(mesh, 'visible');
	//   }

	//   if (options.datGUI.wireframe) {
	//     folder.add(mesh.material, 'wireframe');
	//   }


	//   if (options.datGUI.color) {
	//     color = mesh.material.color.getHex();
	//     var guiObj = {
	//       color: color
	//     };

	//     folder.addColor(guiObj, 'color').name('color')
	//       .onChange(function(value){mesh.material.color = new THREE.Color(value);});
	//   }
	// }

	return this;
}