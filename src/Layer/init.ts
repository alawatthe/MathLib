// ## <a id="Layers"></a>Layers
// Layers for two dimensional plotting

export class Layer {


	ctx: any;
	element: any;
	id: string;
	screen: any;
	zIndex: number;
	stack: any;
	transformation: any;
	applyTransformation: any;


	// Drawing functions
	draw: any;
	circle: any;
	line: any;
	pixel: any;
	path: any;
	text: any;


	constructor (screen, id: string, zIndex) {
		var _this = this;
		this.screen = screen;
		this.id = id;
		this.zIndex = zIndex;

		this.stack = [];
		this.transformation = screen.transformation;

		var element;


		if (screen.renderer === 'Canvas') {

			// Create the canvas
			element = document.createElement('canvas');
			element.classList.add('MathLib_screen_'+screen.uuid);
			element.width = screen.width;
			element.height = screen.height;
			screen.wrapper.appendChild(element);
			this.element = element;


			// Get the context and apply the transformations
			this.ctx = element.getContext('2d');
			this.applyTransformation =  function () {
				var m = _this.transformation;
				_this.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
			};
			this.applyTransformation();


			// Set the drawing functions      
			if (id === 'back') {
				this.draw = function () {
					var top     = (              - screen.translation.y) / screen.scale.y,
							bottom  = (screen.height - screen.translation.y) / screen.scale.y,
							left    = (              - screen.translation.x) / screen.scale.x,
							right   = (screen.width  - screen.translation.x) / screen.scale.x;

					// Draw the background
					this.ctx.fillStyle = colorConvert(screen.background);
					this.ctx.fillRect(left, bottom, right-left, top-bottom);

					canvas.draw.call(_this);
				}
			}
			else if (id === 'grid') {
				this.ctx.strokeStyle = colorConvert(screen.grid.color) || '#cccccc';
				this.ctx.fillStyle = 'rgba(255,255,255,0)';

				
				this.draw = function (){
					_this.ctx.lineWidth = 4/(screen.scale.x - screen.scale.y);
					drawGrid.call(_this);
				}
			}
			else if (id === 'axis') {
				this.ctx.strokeStyle = colorConvert(screen.axis.color) || '#000000';
				
				this.draw = function (){
					_this.ctx.lineWidth = 4/(screen.scale.x - screen.scale.y);
					drawAxis.call(_this);
				}
			}
			else {
				this.ctx.strokeStyle = '#000000';
				this.ctx.fillStyle = 'rgba(255,255,255,0)';

				this.draw = function (){
					_this.ctx.lineWidth = 4/(screen.scale.x - screen.scale.y);
					canvas.draw.call(_this);
				}
			}


			this.circle = canvas.circle;
			this.line = canvas.line;
			this.path = canvas.path;
			this.pixel = canvas.pixel;
			this.text = canvas.text;

		}
		else if (screen.renderer === 'SVG') {
			var ctx = document.createElementNS('http://www.w3.org/2000/svg','g'),
					m = screen.transformation;
			ctx.setAttribute('transform',
				'matrix(' + m[0][0]+ ',' + m[1][0]+ ',' + m[0][1]+ ',' + m[1][1]+ ',' + m[0][2]+ ',' + m[1][2] + ')' );
			screen.element.appendChild(ctx);
			this.ctx = ctx;





			// Set the drawing functions      
			if (id === 'back') {
				this.draw = function () {
					var top     = (              - screen.translation.y) / screen.scale.y,
							bottom  = (screen.height - screen.translation.y) / screen.scale.y,
							left    = (              - screen.translation.x) / screen.scale.x,
							right   = (screen.width  - screen.translation.x) / screen.scale.x;

					svg.draw.call(_this);
				}
			}
			else if (id === 'grid') {
				ctx.setAttribute('stroke', colorConvert(screen.grid.color) || '#cccccc');

				this.draw = function (){
					ctx.setAttribute('stroke-width', 4/(screen.scale.x - screen.scale.y)+'');
					drawGrid.call(_this);
				};

			}
			else if (id === 'axis') {
				ctx.setAttribute('stroke', colorConvert(screen.axis.color) || '#000000');
				
				this.draw = function (){
					ctx.setAttribute('stroke-width', 4/(screen.scale.x - screen.scale.y)+'');
					drawAxis.call(_this);
				}
			}
			else {
				this.draw = svg.draw;
			}


			this.circle = svg.circle;
			this.line = svg.line;
			this.path = svg.path;
			this.pixel = svg.pixel;
			this.text = svg.text;
		}




		// Insert the layer into the layer array of the screen object.
		screen.layer.splice(zIndex, 0, this);
	}