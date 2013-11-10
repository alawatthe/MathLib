// The MathLib module which wraps everything
module MathLib {


	// Typescript is throwing the following error otherwise:
	// The property 'methodname' does not exist on value of type 'MathLib'
	// see [http://typescript.codeplex.com/discussions/397908](http://typescript.codeplex.com/discussions/397908)
	declare var MathLib : any;
	declare var MathJax : any;
	declare var THREE : any;



	MathLib.version = '0.6.1';
	MathLib.apery = 1.2020569031595942;
	MathLib.e = Math.E;
	// Number.EPSILON is probably coming in ES6
	// (see section 20.1.2.1 in the current draft)
	MathLib.epsilon = (<any>Number).EPSILON || (function () {
			var next, result;
			for (next = 1; 1 + next !== 1; next = next / 2) {
				result = next;
			}
			return result;
		}());
	MathLib.eulerMascheroni = 0.5772156649015329;
	MathLib.goldenRatio = 1.618033988749895;
	MathLib.pi = Math.PI;

	MathLib.isArrayLike = function (x) {
		return typeof x === 'object' && 'length' in x;
	};

	MathLib.isNative = function (fn) {
		return fn && /^[^{]+\{\s*\[native \w/.test(fn.toString()) ? fn : false;
	};

	MathLib.argToRgba = function (h){
  	var r, g, b;
  	h = -h / (2 * Math.PI);

  	function hue2rgb(t){
   	  if (t < 0) {
   	  	t += 1;
   	  }
     	if (t > 1) {
     		t -= 1;
     	}
     	if (t < 1/6) {
     		return 6 * t;
     	}
     	if (t < 1/2) {
     		return 1;
     	}
     	if (t < 2/3) {
     		return 4 - 6*t;
     	}
      return 0;
 	 }

  	r = hue2rgb(h + 1/3);
  	g = hue2rgb(h);
  	b = hue2rgb(h - 1/3);

  	return [r * 255, g * 255, b * 255, 255];
	};


	var flatten = function (a) {
				var flattendArray = [];
				a.forEach(function (x) {
					if (Array.isArray(x)) {
						flattendArray = flattendArray.concat(flatten(x));
					}
					else {
						flattendArray.push(x);
					}
				});
				return flattendArray;
			},
			extendObject = function (dest, src) {
				for (var prop in src) {
					if (typeof dest[prop] === 'object' && typeof src[prop] === 'object') {
						dest[prop] = extendObject(dest[prop], src[prop]);
					}
					else {
						dest[prop] = src[prop];
					}
				}
				return dest;
			},

			// A little function converting arrays to THREE.js vectors
			to3js = function (x) {
				if (x.length === 2) {
					return new THREE.Vector2(x[0], x[1]);
				}
				else if (x.length === 3) {
					return new THREE.Vector3(x[0], x[1], x[2]);
				}
			},

			colorConvert = function (n) {
				if (typeof n === 'number') {
					n = Math.max(Math.min(Math.floor(n), 0xffffff), 0);
					return '#' + ('00000' + n.toString(16)).slice(-6); 
				}
				return n;
			};