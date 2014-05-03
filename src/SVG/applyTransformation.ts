/**
 * Applies the current transformations to the screen
 */
applyTransformation: function () {
	var m = this.transformation;
	this.layer.forEach(function (l) {
		l.ctx.setAttribute('transform',
			'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')' );
	});
},