/**
 * Adjust the rendering if the screen is resized
 *
 * @param {number} width The new width
 * @param {number} height The new height
 * @return {Screen2D}
 */
resize(width : number, height : number) : Screen2D {
	var lookAtX = this.lookAt.x,
			lookAtY = this.lookAt.y;

	this.height = height;
	this.width = width;


	if (this.options.renderer === 'Canvas') {
		this.layer.back.element.width = width;
		this.layer.back.element.height = height;
		this.layer.back.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

		this.layer.grid.element.width = width;
		this.layer.grid.element.height = height;
		this.layer.grid.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
		this.layer.grid.ctx.strokeStyle = MathLib.colorConvert(this.options.grid.color) || '#cccccc';

		this.layer.axes.element.width = width;
		this.layer.axes.element.height = height;
		this.layer.axes.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
		this.layer.axes.ctx.strokeStyle = MathLib.colorConvert(this.options.axes.color) || '#000000';

		this.layer.main.element.width = width;
		this.layer.main.element.height = height;
		this.layer.main.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
	}


	else if (this.options.renderer === 'SVG') {
		this.element.setAttribute('width', width + 'px');
		this.element.setAttribute('height', height + 'px');
	}

	this.lookAt.x = lookAtX;
	this.lookAt.y = lookAtY;

	this.applyTransformation();
	this.draw();

	return this;
}
