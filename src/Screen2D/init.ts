// ## <a id="Screen2D"></a>Screen2D
// Two dimensional plotting


export class Screen2D extends Screen {
	type = 'screen2D';

	applyTransformation: any;
	background: any;
	renderer: any;
	axis: any;
	grid: any;
	layer: any;
	element: any;

	init: any;
	redraw: any;


	// Drawing functions
	draw: any;
	circle: any;
	line: any;
	path: any;
	pixel: any;
	point: any;
	text: any;


	// Transformation
	transformation: any;
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
					axis: {
						color: 0x000000,
						textColor: 0x000000,
						tick: {x: 1, y: 1}
					},
					grid: {
						angle: Math.PI / 8,
						color: 0xcccccc,
						type: 'cartesian',
						tick: {x: 1, y: 1, r: 1}
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
					transformation: new MathLib.Matrix([[Math.min(this.height, this.width) / 2, 0, this.width / 2],
																							[0, -Math.min(this.height, this.width) / 2, this.height / 2],
																							[0, 0, 1]])
				},
				opts = extendObject(defaults, options),
				element,
				transformation = opts.transformation,
				_this = this;

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

		this.container.classList.add('MathLib_screen2D');

		// This is just a dummy method for the following few lines.
		// The real applyTransformation method is specified after the creation of the layers.
		this.applyTransformation = function () {};


		// The interaction methods
		this.translation = {};
		this.scale = {};
		this.transformation = transformation;

		Object.defineProperty(this.translation, 'x', {
			get: function (){return _this.transformation[0][2];},
			set: function (x){_this.transformation[0][2] = x; _this.applyTransformation();}
		});

		Object.defineProperty(this.translation, 'y', {
			get: function (){return _this.transformation[1][2];},
			set: function (y){_this.transformation[1][2] = y; _this.applyTransformation();}
		});

		Object.defineProperty(this.scale, 'x', {
			get: function (){return _this.transformation[0][0];},
			set: function (x){_this.transformation[0][0] = x; _this.applyTransformation();}
		});

		Object.defineProperty(this.scale, 'y', {
			get: function (){return _this.transformation[1][1];},
			set: function (y){_this.transformation[1][1] = y; _this.applyTransformation();}
		});



		this.lookAt = {};
		this.range = {};
		Object.defineProperty(this.lookAt, 'x', {
			get: function (){return (_this.width/2 - _this.transformation[0][2])/_this.transformation[0][0];},
			set: function (x){_this.transformation[0][2] = _this.width/2 - x*_this.transformation[0][0]; _this.applyTransformation();}
		});

		Object.defineProperty(this.lookAt, 'y', {
			get: function (){return (_this.height/2 - _this.transformation[1][2])/_this.transformation[1][1];},
			set: function (y){_this.transformation[1][2] = _this.height/2 - y*_this.transformation[1][1]; _this.applyTransformation();}
		});

		Object.defineProperty(this.range, 'x', {
			get: function (){return _this.width/(2*_this.transformation[0][0]);},
			set: function (x){_this.transformation[0][0] = 0.5*_this.width/x; _this.applyTransformation();}
		});

		Object.defineProperty(this.range, 'y', {
			get: function (){return -_this.height/(2*_this.transformation[1][1]);},
			set: function (y){_this.transformation[1][1] = -0.5*_this.height/y; _this.applyTransformation();}
		});


		this.range.x = opts.range.x
		this.range.y = opts.range.y
		this.lookAt.x = opts.lookAt.x
		this.lookAt.y = opts.lookAt.y



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
			element.setAttribute('fill', '#ffffff');
			element.setAttribute('fill-opacity', '0');

			this.element = element;
			this.wrapper.appendChild(element);

			if ('background' in options) {
				var background = document.createElementNS('http://www.w3.org/2000/svg','rect');

				background.setAttribute('x', '0px');
				background.setAttribute('y', '0px');
				background.setAttribute('width', this.width + 'px');
				background.setAttribute('height', this.height + 'px');
				background.setAttribute('fill', colorConvert((<any>options).background));
				background.setAttribute('fill-opacity', '1');
				this.element.appendChild(background);
			}
		}



		// Create the Layers
		// =================
		this.layer = [];
		this.layer.back = new MathLib.Layer(this, 'back', 0);
		this.layer.grid = new MathLib.Layer(this, 'grid', 1);
		this.layer.axis = new MathLib.Layer(this, 'axis', 2);
		this.layer.main = new MathLib.Layer(this, 'main', 3);


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
					l.clear().draw()
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