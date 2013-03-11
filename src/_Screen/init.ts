// ## <a id="Screen"></a>Screen
// This module contains the common methods of all drawing modules.


export class Screen {


	container: any;
	figure: any;
	wrapper: any;
	contextMenu: any;
	contextMenuOverlay: any;
	height: number;
	width: number;
	uuid: string;



	constructor (id: string, options = {}) {
		// Remove the uuid when the scoped attribute has enough support.
		this.uuid = Date.now()+'';

		this.height = (<any>options).height || 500;
		this.width = (<any>options).width || 500;

		var container = document.getElementById(id),
				screen, // The object to be returned
				innerHTML = [

					// Construct the Mark-Up
					// Scoped styles
					'<style scoped>',
						'.MathLib_figure_'+this.uuid+'{margin: 1em auto; display: -webkit-flex; -webkit-flex-direction: column; -webkit-flex-wrap: nowrap; -webkit-justify-content: center; -webkit-align-content: center; -webkit-align-items: center;}',
						'.MathLib_figcaption_'+this.uuid+' {font-family: Helvetica, sans-serif; font-size: 1em; color: #444; text-align: center; margin: 1em}',
						'.MathLib_wrapper_'+this.uuid+' {width: '+this.width+'px; height: '+this.height+'px; position: relative;}',
						'.MathLib_screen_'+this.uuid+' {width: '+this.width+'px; height: '+this.height+'px; position: absolute;}',
						'.MathLib_contextMenuOverlay_'+this.uuid+' {display: none; position: fixed; top: 0; left: 0; z-index:100; width: 100vw; height: 100vh}',
						'.MathLib_contextMenu_'+this.uuid+' {',
							'position: relative;',
							'top: 200px;',
							'left: 200px;',
							'z-index:1001;',
							'padding: 5px 0 5px 0;',
							'width: 200px;',
							'border: 1px solid #ccc;',
							'border-radius: 5px;',
							'background: #FFFFFF;',
							'box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);',
							'font-family: Helvetica;',
							'list-style-type: none;',
						'}',
						'.MathLib_contextMenu_item_'+this.uuid+' {',
							'padding-left: 20px;',
							'border-top: 1px solid transparent;',
							'border-bottom: 1px solid transparent;',
							'-webkit-user-select: none;',
						'}',
						'.MathLib_contextMenu_item_'+this.uuid+':hover {',
							'border-top: 1px solid #5b82e8;',
							'border-bottom: 1px solid #4060a7;',
							'background-color: #658bf1;',
							// 'background-image: -webkit-gradient(linear, left top, left bottom, from(#658bf1), to(#2a63ee));',
							// 'background-image: -webkit-linear-gradient(top, #658bf1, #2a63ee);',
							// 'background-image:    -moz-linear-gradient(top, #658bf1, #2a63ee);',
							// 'background-image:     -ms-linear-gradient(top, #658bf1, #2a63ee);',
							// 'background-image:      -o-linear-gradient(top, #658bf1, #2a63ee);',
							'background-image:         linear-gradient(to bottom, #658bf1, #2a63ee);',

							'color: white;',
						'}',
						'.MathLib_contextMenu_item_'+this.uuid+' > .MathLib_contextMenu_'+this.uuid+' {',
							'display: none;',
							'position: absolute;',
							'left: 200px;',
							'top: 19px;',
						'}',
						'.MathLib_contextMenu_item_'+this.uuid+':hover > .MathLib_contextMenu_'+this.uuid+' {',
							'display: block;',
							'color: #000000;',
						'}',
					'</style>',

					// The figure
					'<figure class="MathLib_figure_'+this.uuid+'">',

					// The canvas or SVG element will be inserted here
					'<div class="MathLib_wrapper_'+this.uuid+'"></div>',

					// Add the optional figcaption
					(<any>options).figcaption ? '<figcaption class="MathLib_figcaption_'+this.uuid+'">'+(<any>options).figcaption+'</figcaption>' : '',

					'</figure>',

					// The context menu
					'<div class="MathLib_contextMenuOverlay_'+this.uuid+'">',
						'<ul class="MathLib_contextMenu_'+this.uuid+'">',
							'<li class="MathLib_contextMenu_ite_'+this.uuid+'m" id="MathLib_screenshot_item">Save screenshot</li>',
							'<li class="MathLib_contextMenu_item_'+this.uuid+'">Options',
								'<ul class="MathLib_contextMenu_'+this.uuid+'">',
									'<li class="MathLib_contextMenu_item_'+this.uuid+'">Axis',
									'<ul class="MathLib_contextMenu_'+this.uuid+'">',
										'<li class="MathLib_contextMenu_item">Axis1</li>',
										'<li class="MathLib_contextMenu_item">Axis2</li>',
									'</ul>',
									'</li>',
									'<li class="MathLib_contextMenu_item">Grid',
										'<ul class="MathLib_contextMenu">',
											'<li class="MathLib_contextMenu_item">Grid1</li>',
											'<li class="MathLib_contextMenu_item">Grid2</li>',
										'</ul>',
									'</li>',
									'</li>',
								'</ul>',
							'</li>',
							'<li class="MathLib_contextMenu_item" id="MathLib_fullscreen_item">Enter Fullscreen</li>',
						'</ul>',
					'</div>'
				].join('');

		// Put the HTMl in the container
		container.innerHTML = innerHTML;



		this.container = container;
		this.figure = container.getElementsByClassName('MathLib_figure_'+this.uuid)[0];
		this.wrapper = container.getElementsByClassName('MathLib_wrapper_'+this.uuid)[0];
		this.contextMenu = container.getElementsByClassName('MathLib_contextMenu_'+this.uuid)[0];
		this.contextMenuOverlay = container.getElementsByClassName('MathLib_contextMenuOverlay_'+this.uuid)[0];



		/* The context menu will be reenabled soon.
		var _this = this;
		this.wrapper.oncontextmenu = function (evt) {
			_that.oncontextmenu(evt);
		}

		document.getElementById('MathLib_fullscreen_item'+this.uuid).onclick = function (){
			_that.enterFullscreen();
		}*/
	}


/*  The fullscreen methods will also be reenabled soon
	/ / Firefox support will be enabled when FF is supporting the fullscreenchange event
	/ / see https:/ /bugzilla.mozilla.org/show_bug.cgi?id=724816

	if (document.webkitCancelFullScreen || document.mozCancelFullScreen) {
		/ / The fullscreen menuitem
		/ / (Only enabled if the browser supports fullscreen mode)
		var fullscreen = document.createElement('li');
		fullscreen.className = 'MathLib menuitem';
		fullscreen.innerHTML = 'View full screen';
		fullscreen.onclick = function (evt) {
			if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
				screen.enterFullscreen();
			}
			else {
				screen.exitFullscreen();
			}

			screen.contextmenuWrapper.style.setProperty('display', 'none');
		};
		contextmenu.appendChild(fullscreen);


		/ / Handle the fullscreenchange event
		var fullscreenchange = function (evt) {
			if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
				fullscreen.innerHTML = 'View Fullscreen';
				screen.resize(screen.width, screen.height);
				screen.curTranslateX = screen.origTranslateX;
				screen.curTranslateY = screen.origTranslateY;
				screen.redraw();
			}
			else {
				fullscreen.innerHTML = 'Exit Fullscreen';
				screen.resize(window.outerWidth, window.outerHeight);
				screen.curTranslateX = window.outerWidth/2;
				screen.curTranslateY = window.outerHeight/2;
				screen.redraw();
			}
		};

		if (document.webkitCancelFullScreen) {
			screen.screenWrapper.addEventListener('webkitfullscreenchange', fullscreenchange, false);
		}
		else if (document.mozCancelFullScreen) {
			screen.screenWrapper.addEventListener('mozfullscreenchange', fullscreenchange, false);
		}
	}
*/