/**
 * Applies the current transformations to the screen
 */
applyTransformation: function () {
	var m = this.transformation,
			devicePixelRatio = window.devicePixelRatio || 1;

	this.layer.forEach(function (l) {
		l.ctx.setTransform(devicePixelRatio * m[0][0], m[1][0], m[0][1], 
					devicePixelRatio * m[1][1], devicePixelRatio * m[0][2], devicePixelRatio * m[1][2]);
	});
},