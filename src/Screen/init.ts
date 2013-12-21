// ## <a id="Screen"></a>Screen
// This module contains the common methods of all drawing modules.



export class Screen {
	type = 'screen';

	container: any;
	figure: any;
	wrapper: any;
	contextMenu: any;
	contextMenuOverlay: any;
	height: number;
	width: number;
	origHeight: number;
	origWidth: number;
	options: any;
	renderer: any;
	element: any;
	innerHTMLContextMenu: string;


	// 3D
	camera: any;


	constructor (id: string, options = {}) {

		var _this = this,
				defaults = {
					height: 500,
					width: 500,
					contextMenu: {
						screenshot: true,
						fullscreen: true,
						grid: true,
					},
					figcaption: ''
				},
				opts = extendObject(defaults, options),
				container = document.getElementById(id),
				innerHTMLContextMenu = '',
				uuid = +Date.now(),
				fullscreenchange,
				innerHTML;


		container.innerHTML = template(opts);
		container.classList.add('MathLib_container');


		this.height = opts.height;
		this.width = opts.width;
		this.options = opts;
		this.container = container;
		this.figure = container.getElementsByClassName('MathLib_figure')[0];
		this.wrapper = container.getElementsByClassName('MathLib_wrapper')[0];
		this.contextMenu = container.getElementsByClassName('MathLib_mainmenu')[0];
		this.contextMenuOverlay = container.getElementsByClassName('MathLib_contextMenuOverlay')[0];
		this.innerHTMLContextMenu = innerHTMLContextMenu;


		if ((<any>options).contextMenu) {
			this.wrapper.oncontextmenu = (evt) => this.oncontextmenu(evt);
		
			if ((<any>opts).contextMenu.screenshot && !('opera' in window)) {
				this.contextMenu.getElementsByClassName('MathLib_screenshot')[0].onclick = function () {
					var dataURI,
							a = document.createElement('a');

					if (_this.options.renderer === 'Canvas' && _this.type === 'screen2D') {
						var canvas = document.createElement('canvas'),
								ctx = (<any>canvas).getContext('2d');

						(<any>canvas).height = _this.height;
						(<any>canvas).width = _this.width;

						ctx.drawImage((<any>_this).layer.back.element, 0, 0);
						ctx.drawImage((<any>_this).layer.grid.element, 0, 0);
						ctx.drawImage((<any>_this).layer.axes.element, 0, 0);
						ctx.drawImage((<any>_this).layer.main.element, 0, 0);


						dataURI = (<any>canvas).toDataURL('image/png');
						if ('download' in a) {
							(<any>a).href = dataURI;
							(<any>a).download = 'plot.png';
							(<any>a).click();
						}
						else {
							window.location.href = dataURI.replace('image/png', 'image/octet-stream');
						}
					}

					if (_this.options.renderer === 'WebGL' && _this.type === 'screen3D') {
						dataURI = _this.element.toDataURL('image/png');
						if ('download' in a) {
							(<any>a).href = dataURI;
							(<any>a).download = 'plot.png';
							(<any>a).click();
						}
						else {
							window.location.href = dataURI.replace('image/png', 'image/octet-stream');
						}
					}

					else if (_this.options.renderer === 'SVG') {
						dataURI = 'data:image/svg+xml,' + _this.element.parentElement.innerHTML;

						if ('download' in a) {
							(<any>a).href = dataURI;
							(<any>a).download = 'plot.svg';
							(<any>a).click();
						}
						else {
							window.location.href = dataURI.replace('image/svg+xml', 'image/octet-stream');
						}
					}
				}
			}


			if ((<any>opts).contextMenu.fullscreen && 'requestFullScreen' in document.body) {
				this.contextMenu.getElementsByClassName('MathLib_fullscreen')[0].onclick = function () {
					if ((<any>document).fullscreenElement) {
						(<any>document).exitFullScreen();
					}
					else {
						_this.container.requestFullScreen();
					}
				};
			}

			if ((<any>opts).contextMenu.grid) {
				this.contextMenu.getElementsByClassName('MathLib_grid_type')[0].onchange = function () {
					(<any>_this).options.grid.type = 'cartesian';
					(<any>_this).draw();
				}
				this.contextMenu.getElementsByClassName('MathLib_grid_type')[1].onchange = function () {
					(<any>_this).options.grid.type = 'polar';
					(<any>_this).draw();
				}
				this.contextMenu.getElementsByClassName('MathLib_grid_type')[2].onchange = function () {
					(<any>_this).options.grid.type = false;
					(<any>_this).draw();
				}
			}


		}



		fullscreenchange = function () {
			if ((<any>document).fullscreenElement) {
				_this.origWidth = _this.width;
				_this.origHeight = _this.height;
				(<any>_this).resize(window.outerWidth, window.outerHeight);
			}
			else {
				(<any>_this).resize(_this.origWidth, _this.origHeight);
				delete _this.origWidth;
				delete _this.origHeight;
			}
		};

		if ('onfullscreenchange' in this.container) {
			this.container.addEventListener('fullscreenchange', fullscreenchange);
		}

		// The mozfullscreenchange event is not firing at all.
		// Therefore the screen is not resized when going fullscreen.
		// FIXME: are there any workarounds?
		else if ('onmozfullscreenchange' in this.container) {
			this.container.addEventListener('mozfullscreenchange', fullscreenchange);
		}
		else if ('onwebkitfullscreenchange' in this.container) {
			this.container.addEventListener('webkitfullscreenchange', fullscreenchange);
		}

	}