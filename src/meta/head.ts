/*es6
import {warning} from 'meta';
import {Complex} from 'Complex';
import {Integer} from 'Integer';
import {Rational} from 'Rational';
es6*/

	export var version = '%MathLibVersion';
	export var apery = 1.2020569031595942;
	export var e = Math.E;
	// Number.EPSILON is probably coming in ES6
	// (see section 20.1.2.1 in the current draft)
	export var epsilon : number = (<any>Number).EPSILON || (function () {
			var next, result;
			for (next = 1; 1 + next !== 1; next = next / 2) {
				result = next;
			}
			return result;
		}());
	export var eulerMascheroni = 0.5772156649015329;
	export var goldenRatio = 1.618033988749895;
	export var pi = Math.PI;


	export var isNative = function (fn) {
		return fn && /^[^{]+\{\s*\[native \w/.test(fn.toString()) ? fn : false;
	};

	export var argToRgba = function (h : number) : number[] {
		var r, g, b;
		h = -h / (2 * Math.PI);

		function hue2rgb (t) {
			if (t < 0) {
				t += 1;
			}
			if (t > 1) {
				t -= 1;
			}
			if (t < 1 / 6) {
				return 6 * t;
			}
			if (t < 1 / 2) {
				return 1;
			}
			if (t < 2 / 3) {
				return 4 - 6 * t;
			}
			return 0;
		}

		r = hue2rgb(h + 1 / 3);
		g = hue2rgb(h);
		b = hue2rgb(h - 1 / 3);

		return [r * 255, g * 255, b * 255, 255];
	};

	export var extendObject = function (dest, src) {
		for (var prop in src) {
			if (typeof dest[prop] === 'object' && typeof src[prop] === 'object') {
				dest[prop] = extendObject(dest[prop], src[prop]);
			}
			else {
				dest[prop] = src[prop];
			}
		}
		return dest;
	};

	export var colorConvert = function (n) : string {
		if (typeof n === 'number') {
			n = Math.max(Math.min(Math.floor(n), 0xffffff), 0);
			return '#' + ('00000' + n.toString(16)).slice(-6);
		}
		return n;
	};


	export var coerceTo = function (obj, type) {

		if (typeof obj === 'object') {
			return obj.coerceTo(type);
		}

		if (typeof obj === 'number') {
			if (type === 'integer') {
				return new MathLib.Integer(obj);
			}
			if (type === 'rational') {
				return new MathLib.Rational(obj);
			}
			if (type === 'number') {
				return obj;
			}
			if (type === 'complex') {
				return new MathLib.Complex(obj);
			}
		}
	};


	export var coerce = function (...args) {
		var type = function (x) {
					return x.type || typeof x;
				},
				numberTypes = ['integer', 'rational', 'number', 'complex'],
				numberType = numberTypes[
					Math.max.apply(null, args.map(function (x) {
						return numberTypes.indexOf(type(x));
					})
				)];

		return args.map(x => coerceTo(x, numberType));
	};
