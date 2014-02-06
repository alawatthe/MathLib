// [Specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#line-styles)
// Chrome: ✓ [Implement canvas v5 line dash feature](http://trac.webkit.org/changeset/128116)
// Firefox: ~ [Implement canvasRenderingContext2D.get/setLineDash](https://bugzilla.mozilla.org/show_bug.cgi?id=768067)
// Safari: ✗
// Internet Explorer: ✗
// Opera: ✗

(function () {
	if (!('setLineDash' in CanvasRenderingContext2D.prototype)) {
		var setLineDash, getLineDash, setLineDashOffset, getLineDashOffset, prototype;

		if ('mozDash' in CanvasRenderingContext2D.prototype) {
			prototype = CanvasRenderingContext2D.prototype;
			setLineDash = function (dash) {
				this.mozDash = dash;
			};
			getLineDash = function () {
				return this.mozDash;
			};

			setLineDashOffset = function (dashOffset) {
				this.mozDashOffset = dashOffset;
			};
			getLineDashOffset = function () {
				return this.mozDashOffset;
			};
		}
		else {
			prototype = CanvasRenderingContext2D.prototype;
			setLineDash = function () {};
			getLineDash = function () {};
			setLineDashOffset = function () {};
			getLineDashOffset = function () {};
		}


		// Safari isn't supporting webkitLineDash any longer, but it also has no support for setLineDash.
		// Additionally extending the CanvasRenderingContext2D.prototype is only possible with a weird hack.
		/*
		else if ('webkitLineDash' in CanvasRenderingContext2D.prototype) {
			prototype = document.createElement('canvas').getContext('2d').__proto__;
			setLineDash = function (dash) {
				this.webkitLineDash = dash;
			};
			getLineDash = function () {
				return this.webkitLineDash;
			};

			setLineDashOffset = function (dashOffset) {
				this.webkitLineDashOffset = dashOffset;
			};
			getLineDashOffset = function () {
				return this.webkitLineDashOffset;
			};
		}
		*/



		Object.defineProperty(prototype, 'setLineDash', {
			value: setLineDash,
			enumerable: true,
			configurable: false,
			writeable: false
		});

		Object.defineProperty(prototype, 'getLineDash', {
			value: getLineDash,
			enumerable: true,
			configurable: false,
			writeable: false
		});

		Object.defineProperty(prototype, 'lineDashOffset', {
			set: setLineDashOffset,
			get: getLineDashOffset,
			enumerable: true,
			configurable: false,
			writeable: false
		});

	}
})();