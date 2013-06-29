// These functions will be added to the functn prototype soon.
var functionList1 = {
	divisors: function (x) {
		var divisors = x === 1 ? [] : [1],
				i, ii;
		for (i = 2, ii = x / 2; i <= ii; i++) {
			if (x % i === 0) {
				divisors.push(i);
			}
		}
		divisors.push(x);
		return MathLib.set(divisors);
	},
	factor: function (n) {
		var factors = [],
				i;
		n = Math.abs(n);
		while (n % 2 === 0) {
			n = n / 2;
			factors.push(2);
		}

		i = 3;
		while (n !== 1) {
			while (n % i === 0) {
				n = n / i;
				factors.push(i);
			}
			i += 2;
		}
		return new MathLib.Set(factors, true);
	},
	fallingFactorial: function (n, m, s) {
		var factorial = 1, j;
		s = s || 1;

		for (j = 0; j < m; j++) {
			factorial  *= (n - j * s);
		}
		return factorial;
	},
	fibonacci: function (n) {
		return Math.floor(Math.pow(MathLib.goldenRatio, n) / Math.sqrt(5));
	},
	random: Math.random,
	risingFactorial: function (n, m, s) {
		var factorial = 1, j;
		s = s || 1;

		for (j = 0; j < m; j++) {
			factorial  *= (n + j * s);
		}
		return factorial;
	},
	round: function (x) {
		// Some implementations have a bug where Math.round(-0) = +0 (instead of -0).
		if (x === 0) {
			return x;
		}
		return Math.round(x);
	},
	trunc: function (x, n) {
		return x.toFixed(n || 0);
	},
	toContentMathML: function (x) {
		if (typeof x === 'number') {
			return '<cn>' + x + '</cn>';
		}
		else {
			return x.toContentMathML();
		}
	},
	toLaTeX: function (x, plus) {
		if (plus) {
			return (x < 0 ? '-' : '+') + Math.abs(x);
		}
		else {
			return (x < 0 ? '-' : '') + Math.abs(x);
		}
	},
	toMathML: function (x, plus) {
		if (plus) {
			return '<mo>' + (x < 0 ? '-' : '+') + '</mo><mn>' + Math.abs(x) + '</mn>';
		}
		else {
			return (x < 0 ? '<mo>-</mo>': '') + '<mn>' + Math.abs(x) + '</mn>';
		}
	},
	toString: function (x, plus) {
		if (plus) {
			return (x < 0 ? '-' : '+') + Math.abs(x);
		}
		else {
			return (x < 0 ? '-' : '') + Math.abs(x);
		}
	}
};




var createFunction1 = function (f, name) {
	return function (x) {
		if (typeof x === 'number') {
			return f.apply('', arguments);
		}
		else if (typeof x === 'function') {
			return function (y) {return f(x(y));};
		}
		else if (x.type === 'set') {
			return new MathLib.Set( x.map(f) );
		}
		else if (x.type === 'complex') {
			return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
		}
		else if (Array.isArray(x)) {
			return x.map(f);
		}
		else {
			return x[name]();
		}
	};
};


// Add the functions to the MathLib object
for (func in functionList1) {
	if (functionList1.hasOwnProperty(func)) {

		cur = functionList1[func];
		Object.defineProperty(MathLib, func, {
			value: createFunction1(functionList1[func], func)
		});
	}
}








MathLib.compare = function (a, b) {
	if (MathLib.type(a) !== MathLib.type(b)) {
		return MathLib.sign(MathLib.type(a).localeCompare(MathLib.type(b)));
	}
	else if (typeof a === 'number') {
		return MathLib.sign(a - b);
	}
	else if (typeof a === 'string') {
		return a.localeCompare(b);
	}
	return a.compare(b);
};


MathLib.type = function (x) {
	if (x === null) {
		return 'null';
	}
	if (x === undefined) {
		return 'undefined';
	}
	return x.type ? x.type : (x.constructor.name || Object.prototype.toString.call(x).slice(8, -1)).toLowerCase();
};


MathLib.is = function (obj, type) {
	var ucfirst = function (str) {
		return str.slice(0,1).toUpperCase() + str.slice(1);
	};

	if (MathLib.type(obj) === type) {
		return true;
	}
	else if (['circle', 'complex', 'expression', 'functn', 'line', 'matrix', 'permutation', 'point',
			'polynomial', 'rational', 'screen', 'screen2d', 'screen3d', 'set', 'vector'].indexOf(type) !== -1) {
		return obj instanceof MathLib[ucfirst(type)];
	}
	else {
		return obj instanceof window[ucfirst(type)];
	}
}


// ### .isMathMLSupported()
// Checks if MathML is supported by the browser.  
// Code stolen from [Modernizr](http://www.modernizr.com/)
//
// *@return {boolean}*
MathLib.isMathMLSupported = function () : boolean {
	var hasMathML = false,
			ns, div, mfrac;
	if (document.createElementNS) {
		ns = 'http://www.w3.org/1998/Math/MathML';
		div = document.createElement('div');
		div.style.position = 'absolute';
		mfrac = div.appendChild(document.createElementNS(ns, 'math'))
								.appendChild(document.createElementNS(ns, 'mfrac'));
		mfrac.appendChild(document.createElementNS(ns, 'mi'))
				 .appendChild(document.createTextNode('xx'));
		mfrac.appendChild(document.createElementNS(ns, 'mi'))
				 .appendChild(document.createTextNode('yy'));
		document.body.appendChild(div);
		hasMathML = div.offsetHeight > div.offsetWidth;
		document.body.removeChild(div);
	}
	return hasMathML;
};


// ### MathLib.writeMathML()
// Writes MathML to an element.
//
// *@param {string}* The id of the element in which the MathML should be inserted.  
// *@param {string}* The MathML to be inserted.
MathLib.writeMathML = function (id : string, math : string) : void {
	var formula;
	document.getElementById(id).innerHTML = '<math>' + math + '</math>';
	if (typeof MathJax !== 'undefined') {
		formula = MathJax.Hub.getAllJax(id)[0];
		MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
	}
}


// ### MathLib.loadMathJax()
// Loads MathJax dynamically.
//
// *@param {string}* [config] Optional config options
MathLib.loadMathJax = function (config : string) : void {
	var script = <HTMLScriptElement>document.createElement('script');
	script.type = 'text/javascript';
	script.src  = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';

	config = config ||	'MathJax.Hub.Config({' +
												'config: ["MMLorHTML.js"],' +
												'jax: ["input/TeX", "input/MathML", "output/HTML-CSS", "output/NativeMML"],' +
												'extensions: ["tex2jax.js", "mml2jax.js", "MathMenu.js", "MathZoom.js"],' +
												'TeX: {' +
													'extensions: ["AMSmath.js", "AMSsymbols.js", "noErrors.js", "noUndefined.js"]' +
												'}' +
										 	'});';

	if ((<any>window).opera) {
		script.innerHTML = config;
	}
	else {
		script.text = config;
	}

	document.getElementsByTagName('head')[0].appendChild(script);
}