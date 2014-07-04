/**
 * Writes text on the screen.
 *
 * @param {string} str The string to be drawn
 * @param {number} x The x coordinate
 * @param {number} y The y coordinate
 * @param {drawingOptions} options Optional drawing options
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Screen} Returns the screen
 */
text: function (str : string, x : number, y : number, options : drawingOptions = {}, redraw = false) : Screen2D {
	var defaults = {
				font:       'Helvetica',
				fontSize:   12,
				// lineWidth:  0.05,
				textColor:  'rgba(0, 0, 0, 1)'
			},
			opts,
			screen = this.screen,
			svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
			svgTspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

	opts = MathLib.SVG.convertOptions(extendObject(defaults, options));

	svgTspan.textContent = str;
	svgTspan.setAttribute('x', x * screen.scale.x + '');
	svgTspan.setAttribute('y', y * screen.scale.y + '');
	svgText.setAttribute('transform', 'matrix(' + 1 / screen.scale.x + ', 0, 0, ' + 1 / screen.scale.y + ', 0, 0)');
	svgText.setAttribute('font-family', opts.font);
	svgText.setAttribute('font-size', opts.fontSize);
	svgText.setAttribute('fill', colorConvert(options.textColor || options.color) || defaults.textColor);
	svgText.setAttribute('fill-opacity', '1');
	svgText.setAttribute('stroke', colorConvert(options.textColor || options.color) || defaults.textColor);
	svgText.setAttribute('text-anchor', 'middle');

	// alignment-baseline isn't defined for text elements, 
	// only for ‘tspan’, ‘tref’, ‘altGlyph’, ‘textPath’ elements.  
	// see the [Specification](http://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty)  
	// But it works for text elements, so we don't need an additional tspan element.
	svgTspan.setAttribute('alignment-baseline', 'middle');

	svgText.appendChild(svgTspan);
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