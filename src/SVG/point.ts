/**
 * Draws a point on the screen.
 *
 * @param {Point} point The point to be drawn
 * @param {drawingOptions} options Optional drawing options
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Screen} Returns the screen
 */
point: function (point, options : drawingOptions = {}, redraw = false) : Screen2D {
	var screen = this.screen,
			prop, opts, dist,
			svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

	svgPoint.setAttribute('cx', point[0] / point[2] + '');
	svgPoint.setAttribute('cy', point[1] / point[2] + '');
	svgPoint.setAttribute('r', ((<any>options).size || 10) / (screen.scale.x - screen.scale.y) + '');


	if (options) {
		svgPoint.setAttribute('stroke-width', ((<any>options).lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
		opts = MathLib.SVG.convertOptions(options);

		if (!('fillOpacity' in options)) {
			opts['fill-opacity'] = '1';
		}

		if (!('fillColor' in options) && !('color' in options)) {
			opts.fill = 'black';
		}

		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				svgPoint.setAttribute(prop, opts[prop]);
			}
		}
	}


	if ((<any>options).moveable) {
		svgPoint.setAttribute('cursor', 'move');

		// mousedown
		svgPoint.addEventListener('mousedown',
			function () {
				screen.options.interaction.type = 'move';
				var invTransformation = screen.transformation.inverse();

				var move = function (evt) {
							evt.stopPropagation();

							var evtPoint = invTransformation.times(screen.getEventPoint(evt));
							point[0] = evtPoint[0];
							point[1] = evtPoint[1];
							screen.draw();
						},

						up = function () {
							screen.options.interaction.type = '';

							document.body.removeEventListener('mousemove', move);
							document.body.removeEventListener('mouseup', up);
						};

				// mousemove
				document.body.addEventListener('mousemove', move);

				// mouseup
				document.body.addEventListener('mouseup', up);
			}
		);
	}


	this.ctx.appendChild(svgPoint);


	if ((<any>options).label) {
		dist = 1.75 * ((<any>options).size || 10) + 0.75 * ((<any>options).lineWidth || 4);
		screen.text((<any>options).label,
			point[0] / point[2] + dist / (screen.scale.x - screen.scale.y),
			point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
	}


	svgPoint.addEventListener('contextmenu', function () {
		screen.options.interaction.type = 'contextmenu';
		var x = (<any>svgPoint).cx.baseVal.value,
				y = (<any>svgPoint).cy.baseVal.value;

		screen.contextMenu.innerHTML =
			'<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_is_disabled MathLib_is_centered">Point</div>' +
			'<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Coordinates' +
					'<menu class="MathLib_menu MathLib_submenu">' +
					'<div class="MathLib_menuItem">cartesian: <span class="MathLib_is_selectable MathLib_is_right">(' +
						x.toFixed(3) + ', ' + y.toFixed(3) + ')</span></div>' +
					'<div class="MathLib_menuItem">polar: <span class="MathLib_is_selectable MathLib_is_right">(' +
						MathLib.hypot(x, y).toFixed(3) + ', ' + Math.atan2(y, x).toFixed(3) + ')</span></div>' +
				'</menu>' +
			'</div>' +
			'<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Options' +
				'<menu class="MathLib_menu MathLib_submenu">' +
					'<div class="MathLib_menuItem">Moveable:' +
						'<input type="checkbox" class="MathLib_is_right">' +
					'</div>' +
					'<div class="MathLib_menuItem">Size:' +
						'<input type="spinner" class="MathLib_is_right">' +
					'</div>' +
					'<div class="MathLib_menuItem">Fill color:' +
						'<input type="color" class="MathLib_is_right">' +
					'</div>' +
					'<div class="MathLib_menuItem">Line color:' +
						'<input type="color" class="MathLib_is_right">' +
					'</div>' +
				'</menu>' +
			'</div>' +
			'<hr class="MathLib_separator MathLib_temporaryMenuItem">' +
			screen.contextMenu.innerHTML;
	});


	if (!redraw) {
		this.stack.push({
			type: 'point',
			object: point,
			options: options
		});
	}

	return this;
},