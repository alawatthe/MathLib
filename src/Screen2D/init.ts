/*es6
import {} from 'Functn';
import {colorConvert, extendObject} from 'meta';
import {Circle} from 'Circle';
import {Layer} from 'Layer';
import {Matrix} from 'Matrix';
import {Point} from 'Point';
import {Screen} from 'Screen';
es6*/

/// import Screen

/**
 * Two dimensional plotting
 *
 * @class
 * @augments Screen
 * @this {Screen2D}
 */
export class Screen2D extends Screen {
	type = 'screen2D';

	applyTransformation: any;
	background: any;
	renderer: any;
	axes: any;
	grid: any;
	layer: any;
	element: any;

	init: any;
	redraw: any;


	// Drawing functions
	draw: any;
	circle: any;
	line : (line: any, options?: drawingOptions, redraw?: boolean) => Screen2D;
	path: any;
	pixel: any;
	point: any;
	text: any;

	// Transformation
	transformation: Matrix;
	translation: any;
	scale: any;
	lookAt: any;
	range: any;


	// Interaction TODO
	interaction: any;
	zoomSpeed: any;


	constructor (id: string, options = {}) {
		super(id, options);
		var defaults = {
					axes: {
						color: 0x000000,
						lineColor: 0x000000,
						textColor: 0x000000,

/*						label: true
						label: false
						label: {
							x: true,
							y: false
						}
*/
						label: {
							fontSize: 12,
							font: 'Helvetica',
							x: true,
							y: true
						},

						x: true,
						y: true

						// origin: {x: 0, y: 0},
						// tick: {x: 1, y: 1}
					},
					grid: {
						// angle: Math.PI / 8,
						type: 'cartesian',
						lineColor: 0xcccccc,
						lineWidth: 4,
						dash: [],
						dashOffset: 0,
						// tick: {x: 1, y: 1, r: 1}
						x: {tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0},
						y: {tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0},
						r: {tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0},
						angle: {tick: Math.PI / 8, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0}
					},
					interaction: {
						allowPan: true,
						allowZoom: true,
						zoomSpeed: 1
					},
					background: 0xffffff,
					lookAt: {x: 0, y: 0},
					range: {x: 1, y: 1},
					figcaption: '',
					renderer: 'Canvas',
					transformation: new MathLib.Matrix([
						[Math.min(this.height, this.width) / 2, 0, this.width / 2],
						[0, -Math.min(this.height, this.width) / 2, this.height / 2],
						[0, 0, 1]
					])
				},
				opts = extendObject(defaults, options),
				element,
				transformation = opts.transformation,
				that = this;

		this.options = opts;
		this.renderer = MathLib[opts.renderer];


		this.circle = (...args : any[]) => this.renderer.circle.apply(this.layer.main, args);
		this.line   = (...args : any[]) => this.renderer.line.apply(  this.layer.main, args);
		this.path   = (...args : any[]) => this.renderer.path.apply(  this.layer.main, args);
		// Should the pixel method default to the main layer or to the back layer?
		this.pixel  = (...args : any[]) => this.renderer.pixel.apply( this.layer.main, args);
		this.point  = (...args : any[]) => this.renderer.point.apply( this.layer.main, args);
		this.text   = (...args : any[]) => this.renderer.text.apply(  this.layer.main, args);




		// Remove the warning message.
		this.wrapper.innerHTML = '';

		this.container.className += ' MathLib_screen2D';

		// This is just a dummy method for the following few lines.
		// The real applyTransformation method is specified after the creation of the layers.
		this.applyTransformation = function () {};


		// The interaction methods
		this.translation = {};
		this.scale = {};
		this.transformation = transformation;

		Object.defineProperty(this.translation, 'x', {
			get: function () {
				return that.transformation[0][2];
			},
			set: function (x) {
				that.transformation[0][2] = x; that.applyTransformation();
			}
		});

		Object.defineProperty(this.translation, 'y', {
			get: function () {
				return that.transformation[1][2];
			},
			set: function (y) {
				that.transformation[1][2] = y; that.applyTransformation();
			}
		});

		Object.defineProperty(this.scale, 'x', {
			get: function () {
				return that.transformation[0][0];
			},
			set: function (x) {
				that.transformation[0][0] = x; that.applyTransformation();
			}
		});

		Object.defineProperty(this.scale, 'y', {
			get: function () {
				return that.transformation[1][1];
			},
			set: function (y) {
				that.transformation[1][1] = y; that.applyTransformation();
			}
		});



		this.lookAt = {};
		this.range = {};
		Object.defineProperty(this.lookAt, 'x', {
			get: function () {
				return (that.width / 2 - that.transformation[0][2]) / that.transformation[0][0];
			},
			set: function (x) {
				that.transformation[0][2] = that.width / 2 - x * that.transformation[0][0]; that.applyTransformation();
			}
		});

		Object.defineProperty(this.lookAt, 'y', {
			get: function () {
				return (that.height / 2 - that.transformation[1][2]) / that.transformation[1][1];
			},
			set: function (y) {
				that.transformation[1][2] = that.height / 2 - y * that.transformation[1][1]; that.applyTransformation();
			}
		});

		Object.defineProperty(this.range, 'x', {
			get: function () {
				return that.width / (2 * that.transformation[0][0]);
			},
			set: function (x) {
				that.transformation[0][0] = 0.5 * that.width / x; that.applyTransformation();
			}
		});

		Object.defineProperty(this.range, 'y', {
			get: function () {
				return -that.height / (2 * that.transformation[1][1]);
			},
			set: function (y) {
				that.transformation[1][1] = -0.5 * that.height / y; that.applyTransformation();
			}
		});


		this.range.x = opts.range.x;
		this.range.y = opts.range.y;
		this.lookAt.x = opts.lookAt.x;
		this.lookAt.y = opts.lookAt.y;



		// Create the SVG element which contains the layers
		if (opts.renderer === 'SVG') {
			// Create the canvas
			element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

			// Safari does not support .classList on SVG elements
			// This feature has be in webkit since [08/02/12](http://trac.webkit.org/changeset/124499)
			/* element.classList.add('MathLib_screen'); */
			element.className.baseVal = 'MathLib_screen';
			element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			element.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
			element.setAttribute('height', this.height + 'px');
			element.setAttribute('width', this.width + 'px');
			element.setAttribute('version', '1.1');

			element.setAttribute('stroke', '#000000');
			element.setAttribute('stroke-opacity', '1');
			element.setAttribute('fill', 'transparent');


			this.element = element;
			this.wrapper.appendChild(element);

			// if ('background' in options) {
				var background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

				background.setAttribute('x', '0px');
				background.setAttribute('y', '0px');
				background.setAttribute('width', this.width + 'px');
				background.setAttribute('height', this.height + 'px');
				background.setAttribute('stroke', 'transparent');
				background.setAttribute('fill', 'background' in options ? colorConvert((<any>options).background) : 'white');
				background.setAttribute('fill-opacity', '1');
				this.element.appendChild(background);
			// }
		}



		// Create the Layers
		// =================
		this.layer = [];
		this.layer.back = new MathLib.Layer(this, 'back', 0);
		this.layer.grid = new MathLib.Layer(this, 'grid', 1);
		this.layer.axes = new MathLib.Layer(this, 'axes', 2);
		this.layer.main = new MathLib.Layer(this, 'main', 3);


		this.wrapper.addEventListener('keydown',      (evt) => this.onkeydown(evt), false);
		this.wrapper.addEventListener('mouseup',      (evt) => this.onmouseup(evt), false);
		this.wrapper.addEventListener('mousedown',    (evt) => this.onmousedown(evt), false);
		this.wrapper.addEventListener('mousemove',    (evt) => this.onmousemove(evt), false);
		this.wrapper.addEventListener('mousewheel',   (evt) => this.onmousewheel(evt), false);
		// For Firefox: [Bug report for the missing onmousewheel method](https://bugzilla.mozilla.org/show_bug.cgi?id=111647)
		this.wrapper.addEventListener('DOMMouseScroll', (evt) => this.onmousewheel(evt), false);


		this.applyTransformation = this.renderer.applyTransformation;


		this.draw = function (x, options = {}) {
			// Clear and redraw the screen
			if (arguments.length === 0) {
				this.layer.forEach(function (l) {
					l.clear().draw();
				});
			}
			else if (x.type === 'circle') {
				this.circle(x, options);
			}
			else if (x.type === 'line') {
				this.line(x, options);
			}
			else if (Array.isArray(x)) {
				x.forEach((y) => this[y.type](y, options));
			}
		};


		if (this.options.contextMenu) {
			var gridType = opts.grid.type ? opts.grid.type : 'none';
			this.contextMenu.querySelectorAll('.MathLib_grid_type[value=' + gridType + ']')[0].checked = true;
		}

		this.draw();
	}
