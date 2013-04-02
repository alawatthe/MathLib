// ### Screen2D.prototype.resize()
// Adjust the rendering if the screen is resized
//
// *@param {number}* The new width  
// *@param {number}* The new height  
// *@returns {Screen2D}*
resize(width : number, height : number) : Screen2D {
	this.height = height;
	this.width = width;


	if (this.renderer === 'Canvas') {
		this.layer.back.element.width = width;
		this.layer.back.element.height = height;
		this.layer.back.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
		
		this.layer.grid.element.width = width;
		this.layer.grid.element.height = height;
		this.layer.grid.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
		this.layer.grid.ctx.strokeStyle = colorConvert(this.grid.color) || '#cccccc';

		this.layer.axis.element.width = width;
		this.layer.axis.element.height = height;
		this.layer.axis.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

		this.layer.main.element.width = width;
		this.layer.main.element.height = height;
		this.layer.main.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
	}


	else if (this.renderer === 'SVG') {
		this.element.setAttribute('width', width + 'px');
		this.element.setAttribute('height', height + 'px');
	}

	this.applyTransformation();
	this.draw();

	return this;
}