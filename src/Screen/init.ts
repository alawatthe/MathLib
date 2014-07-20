/*es6
import {extendObject} from 'meta';
es6*/

/// no import

/**
 * This module contains the common methods of all drawing modules.
 *
 * @class
 * @this {Screen}
 */
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

		var that = this,
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
				fullscreenchange;

		opts.uuid = +new Date();
		container.innerHTML = template(opts);
		container.className += ' MathLib_container';

		this.height = opts.height;
		this.width = opts.width;
		this.options = opts;
		this.container = container;
		this.figure = container.getElementsByClassName('MathLib_figure')[0];
		this.wrapper = container.getElementsByClassName('MathLib_wrapper')[0];
		this.contextMenu = container.getElementsByClassName('MathLib_mainmenu')[0];
		this.contextMenuOverlay = container.getElementsByClassName('MathLib_contextMenuOverlay')[0];
		this.innerHTMLContextMenu = innerHTMLContextMenu;


		this.wrapper.addEventListener('click', () => this.wrapper.focus());


		if ((<any>options).contextMenu) {
			this.wrapper.oncontextmenu = (evt) => this.oncontextmenu(evt);

			if ((<any>opts).contextMenu.screenshot && !('opera' in window)) {
				this.contextMenu.getElementsByClassName('MathLib_screenshot')[0].onclick = function () {
					var dataURI,
							a = document.createElement('a');

					if (that.options.renderer === 'Canvas' && that.type === 'screen2D') {
						var canvas = document.createElement('canvas'),
								ctx = (<any>canvas).getContext('2d');

						(<any>canvas).height = that.height;
						(<any>canvas).width = that.width;

						ctx.drawImage((<any>that).layer.back.element, 0, 0);
						ctx.drawImage((<any>that).layer.grid.element, 0, 0);
						ctx.drawImage((<any>that).layer.axes.element, 0, 0);
						ctx.drawImage((<any>that).layer.main.element, 0, 0);


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

					if (that.options.renderer === 'WebGL' && that.type === 'screen3D') {
						dataURI = that.element.toDataURL('image/png');
						if ('download' in a) {
							(<any>a).href = dataURI;
							(<any>a).download = 'plot.png';
							(<any>a).click();
						}
						else {
							window.location.href = dataURI.replace('image/png', 'image/octet-stream');
						}
					}

					else if (that.options.renderer === 'SVG') {
						dataURI = 'data:image/svg+xml,' + that.element.parentElement.innerHTML;

						if ('download' in a) {
							(<any>a).href = dataURI;
							(<any>a).download = 'plot.svg';
							(<any>a).click();
						}
						else {
							window.location.href = dataURI.replace('image/svg+xml', 'image/octet-stream');
						}
					}
				};
			}


			if ((<any>opts).contextMenu.fullscreen && 'requestFullScreen' in document.body) {
				this.contextMenu.getElementsByClassName('MathLib_fullscreen')[0].onclick = function () {
					if ((<any>document).fullscreenElement) {
						(<any>document).exitFullScreen();
					}
					else {
						that.container.requestFullScreen();
					}
				};
			}

			if ((<any>opts).contextMenu.grid) {
				this.contextMenu.getElementsByClassName('MathLib_grid_type')[0].onchange = function () {
					(<any>that).options.grid.type = 'cartesian';
					(<any>that).draw();
				};
				this.contextMenu.getElementsByClassName('MathLib_grid_type')[1].onchange = function () {
					(<any>that).options.grid.type = 'polar';
					(<any>that).draw();
				};
				this.contextMenu.getElementsByClassName('MathLib_grid_type')[2].onchange = function () {
					(<any>that).options.grid.type = false;
					(<any>that).draw();
				};
			}
		}


		fullscreenchange = function () {
			if ((<any>document).fullscreenElement) {
				that.origWidth = that.width;
				that.origHeight = that.height;
				(<any>that).resize(window.outerWidth, window.outerHeight);
			}
			else {
				(<any>that).resize(that.origWidth, that.origHeight);
				delete that.origWidth;
				delete that.origHeight;
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
