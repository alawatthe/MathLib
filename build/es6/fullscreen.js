// [Specification](https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html)
// Chrome: ~
// Firefox: ~ [Unprefix the DOM fullscreen API](https://bugzilla.mozilla.org/show_bug.cgi?id=743198)
// Safari: ✗
// Internet Explorer: ✗
// Opera: ✗


/**
* @fileoverview game-shim - Shims to normalize gaming-related APIs to their respective specs
* @author Brandon Jones
* @version 1.2
*/


/* Copyright (c) 2012, Brandon Jones. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

	* Redistributions of source code must retain the above copyright notice, this
	list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright notice,
	this list of conditions and the following disclaimer in the documentation
	and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

(function (global) {
	/* jshint esnext:true */

	var elementPrototype = (global.HTMLElement || global.Element).prototype;
	var getter;


	// document.fullscreenEnabled
	if (!document.hasOwnProperty('fullscreenEnabled')) {
		getter = (function () {
			// These are the functions that match the spec, and should be preferred
			if ('webkitIsFullScreen' in document) {
				return function () { return document.webkitFullscreenEnabled; };
			}
			if ('mozFullScreenEnabled' in document) {
				return function () { return document.mozFullScreenEnabled; };
			}

			return function () { return false; }; // not supported, never fullscreen
		})();

		Object.defineProperty(document, 'fullscreenEnabled', {
			enumerable: true, configurable: false, writeable: false,
			get: getter
		});
	}

	if (!document.hasOwnProperty('fullscreenElement')) {
		getter = (function () {
			// These are the functions that match the spec, and should be preferred
			var i = 0, name = ['webkitCurrentFullScreenElement', 'webkitFullscreenElement', 'mozFullScreenElement'];
			for (; i < name.length; i++) {
				if (name[i] in document) {
					return function () { return document[name[i]]; };
				}
			}
			return function () { return null; }; // not supported
		})();

		Object.defineProperty(document, 'fullscreenElement', {
			enumerable: true, configurable: false, writeable: false,
			get: getter
		});
	}

	// Document event: fullscreenchange
	function fullscreenchange () {
		var newEvent = document.createEvent('CustomEvent');
		newEvent.initCustomEvent('fullscreenchange', true, false, null);
		// TODO: Any need for variable copy?
		document.dispatchEvent(newEvent);
	}
	document.addEventListener('webkitfullscreenchange', fullscreenchange, false);
	document.addEventListener('mozfullscreenchange', fullscreenchange, false);

	// Document event: fullscreenerror
	function fullscreenerror () {
		var newEvent = document.createEvent('CustomEvent');
		newEvent.initCustomEvent('fullscreenerror', true, false, null);
		// TODO: Any need for variable copy?
		document.dispatchEvent(newEvent);
	}
	document.addEventListener('webkitfullscreenerror', fullscreenerror, false);
	document.addEventListener('mozfullscreenerror', fullscreenerror, false);

	// element.requestFullScreen
	if (!elementPrototype.requestFullScreen) {
		elementPrototype.requestFullScreen = (function () {
			if (elementPrototype.webkitRequestFullScreen) {
				return function () {
					this.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				};
			}

			if (elementPrototype.mozRequestFullScreen) {
				return function () {
					this.mozRequestFullScreen();
				};
			}

			return function () { /* unsupported, fail silently */ };
		})();
	}

	// document.cancelFullScreen
	if (!document.cancelFullScreen) {
		document.cancelFullScreen = (function () {
			return document.webkitCancelFullScreen ||
					document.mozCancelFullScreen ||
					function () { /* unsupported, fail silently */ };
		})();
	}

})(window);