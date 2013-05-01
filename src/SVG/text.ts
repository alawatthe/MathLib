// ### SVG text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@returns {screen}* Returns the screen
text: function (str, x, y, options = {}, redraw = false) {
	var screen = this.screen,
			svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
			ctx = this.ctx,
			prop, opts;
	var tf = this.screen.transformation;

	svgText.textContent = str;
	svgText.setAttribute('x', x*screen.scale.x + '');
	svgText.setAttribute('y', y*screen.scale.y + '');
	svgText.setAttribute('transform', 'matrix(' + 1/screen.scale.x + ', 0, 0, ' + 1/screen.scale.y + ', 0, 0)');
	svgText.setAttribute('font-family', 'Helvetica');
	svgText.setAttribute('fill', colorConvert((<any>options).color) || '#000000');
	svgText.setAttribute('fill-opacity', '1');
	svgText.setAttribute('stroke', colorConvert((<any>options).color) || '#000000');
	svgText.setAttribute('text-anchor', 'middle');

	// alignment-baseline isn't defined for text elements, 
	// only for ‘tspan’, ‘tref’, ‘altGlyph’, ‘textPath’ elements.  
	// see the [Specification](http://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty)  
	// But it works for text elements, so we don't need an additional tspan element.
	svgText.setAttribute('alignment-baseline', 'middle');


	this.ctx.appendChild(svgText);

	if (!redraw) {
		this.stack.push({
			type: 'text',
			object: str,
			x: x,
			y: y,
			options: options
		});
	}

	return this;
}