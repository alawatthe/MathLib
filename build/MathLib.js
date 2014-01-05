/*!
 * MathLib JavaScript Library v0.6.1
 * http://mathlib.de/
 *
 * Copyright 2012 - 2014 Alexander Zeilmann
 * Released under the MIT license
 * http://mathlib.de/en/license
 *
 * build date: 2014-01-05
 */
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
	'use strict';

	var elementPrototype = (global.HTMLElement || global.Element)['prototype'];
	var getter;


	// document.fullscreenEnabled
	if(!document.hasOwnProperty("fullscreenEnabled")) {
		getter = (function() {
			// These are the functions that match the spec, and should be preferred
			if("webkitIsFullScreen" in document) {
				return function() { return document.webkitFullscreenEnabled; };
			}
			if("mozFullScreenEnabled" in document) {
				return function() { return document.mozFullScreenEnabled; };
			}

			return function() { return false; }; // not supported, never fullscreen
		})();
		
		Object.defineProperty(document, "fullscreenEnabled", {
			enumerable: true, configurable: false, writeable: false,
			get: getter
		});
	}
	
	if(!document.hasOwnProperty("fullscreenElement")) {
		getter = (function() {
			// These are the functions that match the spec, and should be preferred
			var i=0, name=["webkitCurrentFullScreenElement", "webkitFullscreenElement", "mozFullScreenElement"];
			for (; i<name.length; i++)
			{
				if (name[i] in document)
				{
					return function() { return document[name[i]]; };
				}
			}
			return function() { return null; }; // not supported
		})();
		
		Object.defineProperty(document, "fullscreenElement", {
			enumerable: true, configurable: false, writeable: false,
			get: getter
		});
	}
	
	// Document event: fullscreenchange
	function fullscreenchange(oldEvent) {
		var newEvent = document.createEvent("CustomEvent");
		newEvent.initCustomEvent("fullscreenchange", true, false, null);
		// TODO: Any need for variable copy?
		document.dispatchEvent(newEvent);
	}
	document.addEventListener("webkitfullscreenchange", fullscreenchange, false);
	document.addEventListener("mozfullscreenchange", fullscreenchange, false);
	
	// Document event: fullscreenerror
	function fullscreenerror(oldEvent) {
		var newEvent = document.createEvent("CustomEvent");
		newEvent.initCustomEvent("fullscreenerror", true, false, null);
		// TODO: Any need for variable copy?
		document.dispatchEvent(newEvent);
	}
	document.addEventListener("webkitfullscreenerror", fullscreenerror, false);
	document.addEventListener("mozfullscreenerror", fullscreenerror, false);
	
	// element.requestFullScreen
	if(!elementPrototype.requestFullScreen) {
		elementPrototype.requestFullScreen = (function() {
			if(elementPrototype.webkitRequestFullScreen) {
				return function() {
					this.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				};
			}

			if(elementPrototype.mozRequestFullScreen) {
				return function() {
					this.mozRequestFullScreen();
				};
			}
			
			return function(){ /* unsupported, fail silently */ };
		})();
	}
	
	// document.cancelFullScreen
	if(!document.cancelFullScreen) {
		document.cancelFullScreen = (function() {
			return document.webkitCancelFullScreen ||
					document.mozCancelFullScreen ||
					function(){ /* unsupported, fail silently */ };
		})();
	}

})(window);
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
		else {
			prototype = CanvasRenderingContext2D.prototype;
			setLineDash = function () {};
			getLineDash = function () {};
			setLineDashOffset = function () {};
			getLineDashOffset = function () {};
		}


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
/// <reference path='reference.ts'/>
var MathLib;
(function (_MathLib) {
    

    _MathLib.version = '0.6.1';
    _MathLib.apery = 1.2020569031595942;
    _MathLib.e = Math.E;

    // Number.EPSILON is probably coming in ES6
    // (see section 20.1.2.1 in the current draft)
    _MathLib.epsilon = Number.EPSILON || (function () {
        var next, result;
        for (next = 1; 1 + next !== 1; next = next / 2) {
            result = next;
        }
        return result;
    }());
    _MathLib.eulerMascheroni = 0.5772156649015329;
    _MathLib.goldenRatio = 1.618033988749895;
    _MathLib.pi = Math.PI;

    _MathLib.isArrayLike = function (x) {
        return typeof x === 'object' && 'length' in x;
    };

    _MathLib.isNative = function (fn) {
        return fn && /^[^{]+\{\s*\[native \w/.test(fn.toString()) ? fn : false;
    };

    _MathLib.argToRgba = function (h) {
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

    _MathLib.extendObject = function (dest, src) {
        for (var prop in src) {
            if (typeof dest[prop] === 'object' && typeof src[prop] === 'object') {
                dest[prop] = _MathLib.extendObject(dest[prop], src[prop]);
            } else {
                dest[prop] = src[prop];
            }
        }
        return dest;
    };

    _MathLib.colorConvert = function (n) {
        if (typeof n === 'number') {
            n = Math.max(Math.min(Math.floor(n), 0xffffff), 0);
            return '#' + ('00000' + n.toString(16)).slice(-6);
        }
        return n;
    };

    var flatten = function (a) {
        var flattendArray = [];
        a.forEach(function (x) {
            if (Array.isArray(x)) {
                flattendArray = flattendArray.concat(flatten(x));
            } else {
                flattendArray.push(x);
            }
        });
        return flattendArray;
    };

    var errors = [], warnings = [];

    /**
    * ### [MathLib.on()](http://mathlib.de/en/docs/on)
    * Binds an event handler to an event.
    *
    * @param {string} The name of the event.
    * @param {function} The callback function.
    */
    _MathLib.on = function (type, callback) {
        if (type === 'error') {
            errors.push(callback);
        } else if (type === 'warning') {
            warnings.push(callback);
        }
    };

    /**
    * ### [MathLib.off()](http://mathlib.de/en/docs/off)
    * Unbinds an event handler from an event.
    *
    * @param {string} The name of the event.
    * @param {function} The callback function.
    */
    _MathLib.off = function (type, callback) {
        if (type === 'error') {
            errors = errors.filter(function (x) {
                return x !== callback;
            });
        } else if (type === 'warning') {
            warnings = warnings.filter(function (x) {
                return x !== callback;
            });
        }
    };

    /**
    * ### MathLib.error()
    * Fires an error event.
    *
    * @param {oject} An object describing the error further.
    */
    _MathLib.error = function (details) {
        errors.forEach(function (cb) {
            cb(details);
        });
    };

    /**
    * ### MathLib.warning()
    * Fires a waring event.
    *
    * @param {object} An object describing the warning further.
    */
    _MathLib.warning = function (details) {
        warnings.forEach(function (cb) {
            cb(details);
        });
    };

    'export MathLib';
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// no import
    // There is no DOMParser in Node, so we have to require one (done via a regexp replace)
    /// DOMParser
    /**
    * MathLib.Expression is the MathLib implementation of symbolic expressions
    *
    * @class
    * @this {Expression}
    */
    var Expression = (function () {
        function Expression(expr) {
            if (typeof expr === "undefined") { expr = {}; }
            this.type = 'expression';
            var prop;

            if (typeof expr === 'string') {
                expr = MathLib.Expression.parse(expr);
            }
            for (prop in expr) {
                if (expr.hasOwnProperty(prop)) {
                    this[prop] = expr[prop];
                }
            }
        }
        /**
        * Compares two expressions
        *
        * @param {Expression} expr The expression to compare
        * @return {number}
        */
        Expression.prototype.compare = function (expr) {
            return MathLib.sign(this.toString().localeCompare(expr.toString()));
        };

        /**
        * Constructs a constant expression.
        *
        * @param {String} n The constant to generate an expression from
        * @return {Expression}
        */
        Expression.constant = function (n) {
            return new MathLib.Expression({
                subtype: 'constant',
                value: n
            });
        };

        /**
        * Evaluates the symbolic expression
        *
        * @return {any}
        */
        Expression.prototype.evaluate = function () {
            if (this.subtype === 'binaryOperator') {
                return MathLib[this.name].apply(null, this.content.map(function (x) {
                    return x.evaluate();
                }));
            }
            if (this.subtype === 'brackets') {
                return this.content.evaluate();
            }
            if (this.subtype === 'complexNumber') {
                if (this.mode === 'cartesian') {
                    return new MathLib.Complex(this.value[0].evaluate(), this.value[1].evaluate());
                } else if (this.mode === 'polar') {
                    return MathLib.Complex.polar(this.value[0].evaluate(), this.value[1].evaluate());
                }
            }
            if (this.subtype === 'constant') {
                if (this.value === 'false') {
                    return false;
                }
                if (this.value === 'pi') {
                    return Math.PI;
                }
                if (this.value === 'true') {
                    return true;
                }
            }
            if (this.subtype === 'functionCall') {
                if (this.isMethod) {
                    var args = this.content.map(function (x) {
                        return x.evaluate();
                    }), _this = args.shift();

                    return _this[this.value].apply(_this, args);
                } else {
                    return MathLib[this.value].apply(null, this.content.map(function (x) {
                        return x.evaluate();
                    }));
                }
            }
            if (this.subtype === 'functionDefinition') {
                return MathLib.Functn(this.content[0].evaluate(), {
                    name: 'f',
                    expression: this.value
                });
            }
            if (this.subtype === 'matrix') {
                return new MathLib.Matrix(this.value.map(function (r) {
                    return r.map(function (c) {
                        return c.evaluate();
                    });
                }));
            }
            if (this.subtype === 'number') {
                return parseFloat(this.value);
            }
            if (this.subtype === 'naryOperator') {
                return MathLib[this.name].apply(null, this.content.map(function (x) {
                    return x.evaluate();
                }));
            }
            if (this.subtype === 'rationalNumber') {
                return new MathLib.Rational(this.value[0].evaluate(), this.value[1].evaluate());
            }
            if (this.subtype === 'set') {
                return new MathLib.Set(this.value.map(function (x) {
                    return x.evaluate();
                }));
            }
            if (this.subtype === 'string') {
                return this.value;
            }
            if (this.subtype === 'variable') {
                if (this.value in MathLib.Expression.variables) {
                    return MathLib.Expression.variables[this.value];
                }
                return this;
            }
            if (this.subtype === 'vector') {
                return new MathLib.Vector(this.value.map(function (x) {
                    return x.evaluate();
                }));
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return MathLib.negative(this.content.evaluate());
                }
                return this.content.evaluate();
            }
        };

        /**
        * Maps the expression tree over to an other expression tree.
        *
        * @param {function} f The function to apply to all the nodes in the tree.
        * @return {Expression}
        */
        Expression.prototype.map = function (f) {
            var prop, properties = {}, mappedProperties;

            for (prop in this) {
                if (this.hasOwnProperty(prop) && prop !== 'content') {
                    properties[prop] = this[prop];
                }
            }

            mappedProperties = f(properties);
            if (Array.isArray(this.content)) {
                mappedProperties.content = this.content.map(function (expr) {
                    return expr.map(f);
                });
            } else if (this.content) {
                mappedProperties.content = this.content.map(f);
            }

            return new MathLib.Expression(mappedProperties);
        };

        /**
        * Constructs a number expression.
        *
        * @param {String} n The number to generate an expression from
        * @return {Expression}
        */
        Expression.number = function (n) {
            return new MathLib.Expression({
                subtype: 'number',
                value: n
            });
        };

        /**
        * Parses a content MathML string and returns an Expression.
        *
        * @param {string} MathMLString The string to be parsed as MathML
        * @return {Expression}
        */
        Expression.parseContentMathML = function (MathMLString) {
            var MathMLdoc, tokenizer = new DOMParser();

            // Whitespace normalization (see section 2.1.7 of the MathML 3 specification)
            // TODO: Find a better way of normalizing whitespace.
            MathMLString = MathMLString.split('cs>').map(function (x, i) {
                // We are not in an cs element.
                // 1. normalize multiple spaces to one space
                // 		("whitespace internal to content of the element is collapsed canonically,
                // 		i.e., each sequence of 1 or more whitespace characters is replaced with one space character")
                // 2. Remove whitespace outside of token elements
                // 		("MathML ignores whitespace occurring outside token elements.")
                // 		and remove whitespace at the beginning and end of elements
                // 		("All whitespace at the beginning and end of the content is removed").
                if (i % 2 === 0) {
                    return x.replace(/\s+/g, ' ').replace(/ </g, '<').replace(/> /g, '>');
                } else {
                    return x;
                }
            }).join('cs>');

            // Gives an error in Firefox
            // MathML = tokenizer.parseFromString(MathMLString, 'application/mathml+xml');
            MathMLdoc = tokenizer.parseFromString(MathMLString, 'application/xml');

            var handler = {
                apply: function (node) {
                    var children = Array.prototype.slice.call(node.childNodes), functnName = children.shift().nodeName, isMethod = true, functnNames = {
                        ident: 'identity',
                        power: 'pow',
                        rem: 'mod',
                        setdifference: 'without'
                    };

                    // Change some function names for functions with different names in MathLib
                    if (functnName in functnNames) {
                        functnName = functnNames[functnName];
                    }

                    if (MathLib[functnName]) {
                        isMethod = false;
                    }

                    return new MathLib.Expression({
                        subtype: 'functionCall',
                        value: functnName,
                        isMethod: isMethod,
                        content: parser(children)
                    });
                },
                ci: function (node) {
                    return new MathLib.Expression({
                        subtype: 'variable',
                        value: node.textContent
                    });
                },
                cn: function (node) {
                    var type = node.getAttribute('type');

                    if (type === null || type === '') {
                        type = 'number';
                    }

                    if (type === 'number') {
                        // TODO: base conversions
                        // var base = node.getAttribute('base') !== null ? node.getAttributes('base') : '10';
                        return parser(node.childNodes[0]);
                    } else if (type === 'rational') {
                        return new MathLib.Expression({
                            value: [parser(node.childNodes[0]), parser(node.childNodes[2])],
                            subtype: 'rationalNumber'
                        });
                    } else if (type === 'complex-cartesian') {
                        return new MathLib.Expression({
                            value: [parser(node.childNodes[0]), parser(node.childNodes[2])],
                            subtype: 'complexNumber',
                            mode: 'cartesian'
                        });
                    } else if (type === 'complex-polar') {
                        return new MathLib.Expression({
                            value: [parser(node.childNodes[0]), parser(node.childNodes[2])],
                            subtype: 'complexNumber',
                            mode: 'polar'
                        });
                    }
                },
                cs: function (node) {
                    return new MathLib.Expression({
                        subtype: 'string',
                        value: node.textContent
                    });
                },
                lambda: function (node) {
                    var bvar = node.childNodes[0], doa = node.childNodes[1], apply = node.childNodes[2];

                    return new MathLib.Expression({
                        subtype: 'functionDefinition',
                        domain: doa.childNodes[0].nodeName,
                        arguments: Array.prototype.map.call(bvar.childNodes, function (variable) {
                            return MathLib.Expression.variable(variable.textContent);
                        }),
                        content: [parser(apply)]
                    });
                },
                math: function (node) {
                    return parser(node.childNodes[0]);
                },
                matrix: function (node) {
                    return new MathLib.Expression({
                        value: Array.prototype.slice.call(node.childNodes).map(handler.matrixrow),
                        subtype: 'matrix'
                    });
                },
                matrixrow: function (node) {
                    return Array.prototype.map.call(node.childNodes, parser);
                },
                set: function (node) {
                    return new MathLib.Expression({
                        value: parser(Array.prototype.slice.call(node.childNodes)),
                        subtype: 'set'
                    });
                },
                '#text': function (node) {
                    if (node.parentNode.nodeName === 'cn') {
                        return MathLib.Expression.number(node.nodeValue.trim());
                    }
                    return node.nodeValue;
                },
                vector: function (node) {
                    return new MathLib.Expression({
                        value: parser(Array.prototype.slice.call(node.childNodes)),
                        subtype: 'vector'
                    });
                },
                false: function () {
                    return MathLib.Expression.constant('false');
                },
                pi: function () {
                    return MathLib.Expression.constant('pi');
                },
                true: function () {
                    return MathLib.Expression.constant('true');
                }
            };

            var parser = function (node) {
                if (Array.isArray(node)) {
                    var nodes = node.map(parser);
                    return nodes;
                }

                return handler[node.nodeName](node);
            };

            return parser(MathMLdoc.childNodes[0]);
        };

        /**
        * Convert the Expression to MathML.
        *
        * @return {string}
        */
        Expression.prototype.toContentMathML = function () {
            if (this.subtype === 'binaryOperator') {
                var op = this.name === 'pow' ? 'power' : this.name;

                return '<apply><csymbol cd="arith1">' + op + '</csymbol>' + this.content[0].toContentMathML() + this.content[1].toContentMathML() + '</apply>';
            }
            if (this.subtype === 'brackets') {
                return this.content.toContentMathML();
            }
            if (this.subtype === 'number') {
                return '<cn>' + this.value + '</cn>';
            }
            if (this.subtype === 'variable') {
                return '<ci>' + this.value + '</ci>';
            }
            if (this.subtype === 'naryOperator') {
                return '<apply><csymbol cd="arith1">' + this.name + '</csymbol>' + this.content.map(function (expr) {
                    return expr.toContentMathML();
                }).join('') + '</apply>';
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return '<apply><csymbol cd="arith1">unary_minus</csymbol>' + this.content.toContentMathML() + '</apply>';
                }
                return this.content.toContentMathML();
            }

            /*
            var transc1 = ['arccos', 'arccosh', 'arccot', 'arccoth', 'arccsc', 'arccsch', 'arcsec',
            'arcsech', 'arcsin', 'arcsinh', 'arctan', 'arctanh', 'cos', 'cosh', 'cot', 'coth',
            'csc', 'csch', 'exp', 'ln', 'log', 'sec', 'sech', 'sin', 'sinh', 'tan', 'tanh'];
            */
            if (this.subtype === 'functionCall') {
                // There are some functions which have different names in MathML
                var conversion = {
                    arcosh: 'arccosh',
                    arcoth: 'arccoth',
                    arcsch: 'arccsch',
                    arsech: 'arcsech',
                    arsinh: 'arcsinh',
                    artanh: 'arctanh',
                    identity: 'ident'
                }, funcName;

                if (this.value in conversion) {
                    funcName = conversion[this.value];
                } else {
                    funcName = this.value;
                }

                return '<apply><csymbol cd="transc1">' + funcName + '</csymbol>' + this.content.map(function (expr) {
                    return expr.toContentMathML();
                }).join('') + '</apply>';
            }

            if (this.subtype === 'functionDefinition') {
                return '<lambda><bvar><ci>' + this.arguments.join('</ci></bvar><bvar><ci>') + '</ci></bvar>' + this.content.map(function (expr) {
                    return expr.toContentMathML();
                }) + '</lambda>';
            }
        };

        /**
        * Convert the expression to a LaTeX string
        *
        * @return {string}
        */
        Expression.prototype.toLaTeX = function () {
            var op;

            if (this.subtype === 'binaryOperator') {
                var str;

                if (this.value === '/') {
                    str = '\\frac{' + this.content[0].toLaTeX() + '}';
                } else {
                    str = this.content[0].toLaTeX() + this.value;
                }

                str += this.value !== '-' ? '{' : '';
                str += this.content[1].toLaTeX();
                str += this.value !== '-' ? '}' : '';

                return str;
            }
            if (this.subtype === 'brackets') {
                return '\\left(' + this.content.toLaTeX() + '\\right)';
            }
            if (this.subtype === 'complexNumber') {
                if (this.mode === 'cartesian') {
                    return this.value[0] + '+' + this.value[1] + 'i';
                } else if (this.mode === 'polar') {
                    return this.value[0] + ' \\cdot e^{' + this.value[1] + 'i}';
                }
            }
            if (this.subtype === 'constant') {
                if (this.value === 'pi') {
                    return '\\pi';
                }
            }
            if (this.subtype === 'matrix') {
                return '\\begin{pmatrix}' + this.value.map(function (row) {
                    return row.map(function (col) {
                        return col.toLaTeX();
                    }).join('&');
                }).join('\\\\') + '\\end{pmatrix}';
            }
            if (this.subtype === 'number' || this.subtype === 'variable') {
                return this.value;
            }
            if (this.subtype === 'naryOperator') {
                op = this.value === '*' ? '\\cdot' : this.value;
                return this.content.reduce(function (old, cur, idx) {
                    return old + (idx ? op : '') + cur.toLaTeX();
                }, '');
            }
            if (this.subtype === 'rationalNumber') {
                return '\\frac{' + this.value[0].toLaTeX() + '}{' + this.value[1].toLaTeX() + '}';
            }
            if (this.subtype === 'set') {
                return '\\left{' + this.value.map(function (x) {
                    return x.toLaTeX();
                }).join(', ') + '\\right}';
            }
            if (this.subtype === 'string') {
                return '\\texttt{"{}' + this.value + '"}';
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return '-' + this.content.toLaTeX();
                }
                return this.content.toLaTeX();
            }
            if (this.subtype === 'vector') {
                return '\\begin{pmatrix}' + this.value.map(function (x) {
                    return x.toLaTeX();
                }).join('\\\\') + '\\end{pmatrix}';
            }

            if (this.subtype === 'functionCall') {
                // These operators are predefined by amsmath.
                // (There are more predefined ones, but these are the useful ones.)
                if ([
                    'arccos', 'arcsin', 'arctan', 'arg', 'cos', 'cosh', 'cot', 'coth', 'csc', 'deg', 'det', 'dim',
                    'gcd', 'lg', 'ln', 'log', 'max', 'min', 'sec', 'sin', 'sinh', 'tan', 'tanh'].indexOf(this.value) + 1) {
                    return '\\' + this.value + '\\left(' + (this.content.length ? this.content.reduce(function (old, cur, idx) {
                        return old + (idx ? ',' : '') + cur.toLaTeX();
                    }, '') : 'x') + '\\right)';
                } else if (this.value === 'exp') {
                    return 'e^{' + (this.content.length ? this.content[0].toLaTeX() : 'x') + '}';
                } else if (this.value === 'sqrt') {
                    return '\\' + this.value + '{' + (this.content.length ? this.content[0].toLaTeX() : 'x') + '}';
                } else {
                    return '\\operatorname{' + this.value + '}\\left(' + (this.content.length ? this.content.reduce(function (old, cur, idx) {
                        return old + (idx ? ',' : '') + cur.toLaTeX();
                    }, '') : 'x') + '\\right)';
                }
            }

            if (this.subtype === 'functionDefinition') {
                return (this.arguments.length === 1 ? this.arguments[0] : '\\left(' + this.arguments.join(', ') + '\\right)') + ' \\longmapsto ' + (this.content.length === 1 ? this.content[0].toLaTeX() : '\\left(' + this.content.map(function (expr) {
                    return expr.toLaTeX();
                }).join(', ') + '\\right)');
            }
        };

        /**
        * Convert the Expression to MathML.
        *
        * @return {string}
        */
        Expression.prototype.toMathML = function () {
            if (this.subtype === 'binaryOperator') {
                if (this.value === '-') {
                    return this.content[0].toMathML() + '<mo>-</mo>' + this.content[1].toMathML();
                }
                if (this.value === '/') {
                    return '<mfrac>' + this.content[0].toMathML() + this.content[1].toMathML() + '</mfrac>';
                }
                if (this.value === '^') {
                    return '<msup>' + this.content[0].toMathML() + this.content[1].toMathML() + '</msup>';
                }
            }
            if (this.subtype === 'brackets') {
                return '<mrow><mo>(</mo>' + this.content.toMathML() + '<mo>)</mo></mrow>';
            }
            if (this.subtype === 'complexNumber') {
                if (this.mode === 'cartesian') {
                    return '<mrow>' + this.value[0].toMathML() + '<mo>+</mo>' + this.value[1].toMathML() + '<mi>i</mi></mrow>';
                } else if (this.mode === 'polar') {
                    return this.value[0].toMathML() + '<msup><mi>e</mi><mrow>' + this.value[1].toMathML() + '<mi>i</mi></mrow></msup>';
                }
            }
            if (this.subtype === 'constant') {
                if (this.value === 'pi') {
                    return '<mi>&pi;</mi>';
                }
            }
            if (this.subtype === 'matrix') {
                return '<mrow><mo>(</mo><mtable><mtr><mtd>' + this.value.map(function (row) {
                    return row.map(function (col) {
                        return col.toMathML();
                    }).join('</mtd><mtd>');
                }).join('</mtd></mtr><mtr><mtd>') + '</mtd></mtr></mtable><mo>)</mo></mrow>';
            }
            if (this.subtype === 'number') {
                return '<mn>' + this.value + '</mn>';
            }
            if (this.subtype === 'rationalNumber') {
                return '<mfrac>' + this.value[0].toMathML() + this.value[1].toMathML() + '</mfrac>';
            }
            if (this.subtype === 'set') {
                return '<mrow><mo>{</mo>' + this.value.map(function (x) {
                    return x.toMathML();
                }).join('<mo>,</mo>') + '<mo>}</mo></mrow>';
            }
            if (this.subtype === 'string') {
                return '<ms>' + this.value + '</ms>';
            }
            if (this.subtype === 'variable') {
                return '<mi>' + this.value + '</mi>';
            }
            if (this.subtype === 'vector') {
                return '<mrow><mo>(</mo><mtable><mtr><mtd>' + this.value.map(function (x) {
                    return x.toMathML();
                }).join('</mtd></mtr><mtr><mtd>') + '</mtd></mtr></mtable><mo>)</mo></mrow>';
            }
            if (this.subtype === 'naryOperator') {
                return '<mrow>' + this.content.map(function (expr) {
                    return expr.toMathML();
                }).join('<mo>' + (this.value === '*' ? '&middot;' : this.value) + '</mo>') + '</mrow>';
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return '<mo>-</mo>' + this.content.toMathML();
                }
                return this.content.toMathML();
            }
            if (this.subtype === 'functionCall') {
                return '<mrow><mi>' + this.value + '</mi><mo>&af;</mo><mrow><mo>(</mo>' + (this.content.length ? this.content.map(function (expr) {
                    return expr.toMathML();
                }).join('') : '<mi>x</mi>') + '<mo>)</mo></mrow></mrow>';
            }

            if (this.subtype === 'functionDefinition') {
                return '<mrow>' + (this.arguments.length === 1 ? '<mi>' + this.arguments[0] + '</mi>' : '<mrow><mo>(</mo><mi>' + this.arguments.join('</mi><mo>,<mo><mi>') + '</mi><mo>)</mo></mrow>') + '<mo>&#x27FC;</mo>' + (this.content.length === 1 ? this.content[0].toMathML() : '<mrow><mo>(</mo>' + this.content.map(function (expr) {
                    return expr.toMathML();
                }) + '<mo>)</mo></mrow>') + '</mrow>';
            }
        };

        /**
        * A custom toString function
        *
        * @return {string}
        */
        Expression.prototype.toString = function () {
            var _this = this;
            if (this.subtype === 'binaryOperator') {
                return this.content[0].toString() + this.value + this.content[1].toString();
            }
            if (this.subtype === 'brackets') {
                return '(' + this.content.toString() + ')';
            }
            if (this.subtype === 'complexNumber') {
                if (this.mode === 'cartesian') {
                    return this.value[0] + '+' + this.value[1] + 'i';
                } else if (this.mode === 'polar') {
                    return this.value[0] + '*e^' + this.value[1] + 'i';
                }
            }
            if (this.subtype === 'constant') {
                if (this.value === 'pi') {
                    return 'π';
                }
            }
            if (this.subtype === 'matrix') {
                var length = this.value.length;
                return this.value.map(function (row) {
                    return row.map(function (col) {
                        return col.toString();
                    }).join('\t');
                }).map(function (row, index) {
                    if (index === 0) {
                        return '⎛' + row + '⎞';
                    } else if (index === length - 1) {
                        return '⎝' + row + '⎠';
                    } else {
                        return '⎜' + row + '⎟';
                    }
                }).join('\n');
            }
            if (this.subtype === 'number' || this.subtype === 'variable') {
                return this.value;
            }
            if (this.subtype === 'naryOperator') {
                return this.content.reduce(function (old, cur) {
                    return old + _this.value + cur;
                });
            }
            if (this.subtype === 'rationalNumber') {
                return this.value[0].toString() + '/' + this.value[1].toString();
            }
            if (this.subtype === 'set') {
                return '{' + this.value.map(function (x) {
                    return x.toString();
                }).join(', ') + '}';
            }
            if (this.subtype === 'string') {
                return '"' + this.value + '"';
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return '-' + this.content.toString();
                }
                return this.content.toString();
            }
            if (this.subtype === 'vector') {
                return '(' + this.value.map(function (x) {
                    return x.toString();
                }).join(', ') + ')';
            }
            if (this.subtype === 'functionCall') {
                return this.value + '(' + (this.content.length ? this.content.map(function (expr) {
                    return expr.toString();
                }).join(', ') : 'x') + ')';
            }
            if (this.subtype === 'functionDefinition') {
                return (this.arguments.length === 1 ? this.arguments[0] : '(' + this.arguments.join(', ') + ')') + ' ⟼ ' + (this.content.length === 1 ? this.content[0].toString() : '(' + this.content.map(function (expr) {
                    return expr.toString();
                }).join(', ') + ')');
            }
        };

        /**
        * Constructs a variable expression.
        *
        * @param {String} n The variable to generate an expression from
        * @return {Expression}
        */
        Expression.variable = function (n) {
            return new MathLib.Expression({
                subtype: 'variable',
                value: n
            });
        };
        Expression.parse = function (str) {
            var Token, Lexer, Parser;

            Token = {
                Operator: 'Operator',
                Identifier: 'Identifier',
                Number: 'Number'
            };

            Lexer = function () {
                var expression = '', length = 0, index = 0, marker = 0, T = Token;

                function peekNextChar () {
                    var idx = index;
                    return ((idx < length) ? expression.charAt(idx) : '\x00');
                }

                function getNextChar () {
                    var ch = '\x00', idx = index;
                    if (idx < length) {
                        ch = expression.charAt(idx);
                        index += 1;
                    }
                    return ch;
                }

                function isWhiteSpace (ch) {
                    return (ch === '\u0009') || (ch === ' ') || (ch === '\u00A0');
                }

                function isLetter (ch) {
                    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
                }

                function isDecimalDigit (ch) {
                    return (ch >= '0') && (ch <= '9');
                }

                function createToken (type, value) {
                    return {
                        type: type,
                        value: value,
                        start: marker,
                        end: index - 1
                    };
                }

                function skipSpaces () {
                    var ch;

                    while (index < length) {
                        ch = peekNextChar();
                        if (!isWhiteSpace(ch)) {
                            break;
                        }
                        getNextChar();
                    }
                }

                function scanOperator () {
                    var ch = peekNextChar();
                    if ('+-*/()^%=;,'.indexOf(ch) >= 0) {
                        return createToken(T.Operator, getNextChar());
                    }
                    return undefined;
                }

                function isIdentifierStart (ch) {
                    return (ch === '_') || isLetter(ch);
                }

                function isIdentifierPart (ch) {
                    return isIdentifierStart(ch) || isDecimalDigit(ch);
                }

                function scanIdentifier () {
                    var ch, id;

                    ch = peekNextChar();
                    if (!isIdentifierStart(ch)) {
                        return undefined;
                    }

                    id = getNextChar();
                    while (true) {
                        ch = peekNextChar();
                        if (!isIdentifierPart(ch)) {
                            break;
                        }
                        id += getNextChar();
                    }

                    return createToken(T.Identifier, id);
                }

                function scanNumber () {
                    var ch, number;

                    ch = peekNextChar();
                    if (!isDecimalDigit(ch) && (ch !== '.')) {
                        return undefined;
                    }

                    number = '';
                    if (ch !== '.') {
                        number = getNextChar();
                        while (true) {
                            ch = peekNextChar();
                            if (!isDecimalDigit(ch)) {
                                break;
                            }
                            number += getNextChar();
                        }
                    }

                    if (ch === '.') {
                        number += getNextChar();
                        while (true) {
                            ch = peekNextChar();
                            if (!isDecimalDigit(ch)) {
                                break;
                            }
                            number += getNextChar();
                        }
                    }

                    if (ch === 'e' || ch === 'E') {
                        number += getNextChar();
                        ch = peekNextChar();
                        if (ch === '+' || ch === '-' || isDecimalDigit(ch)) {
                            number += getNextChar();
                            while (true) {
                                ch = peekNextChar();
                                if (!isDecimalDigit(ch)) {
                                    break;
                                }
                                number += getNextChar();
                            }
                        } else {
                            ch = 'character ' + ch;
                            if (index >= length) {
                                ch = '<end>';
                            }
                            throw new SyntaxError('Unexpected ' + ch + ' after the exponent sign');
                        }
                    }

                    if (number === '.') {
                        throw new SyntaxError('Expecting decimal digits after the dot sign');
                    }

                    return createToken(T.Number, number);
                }

                function reset (str) {
                    expression = str;
                    length = str.length;
                    index = 0;
                }

                function next () {
                    var token;

                    skipSpaces();
                    if (index >= length) {
                        return undefined;
                    }

                    marker = index;

                    token = scanNumber();
                    if (typeof token !== 'undefined') {
                        return token;
                    }

                    token = scanOperator();
                    if (typeof token !== 'undefined') {
                        return token;
                    }

                    token = scanIdentifier();
                    if (typeof token !== 'undefined') {
                        return token;
                    }

                    throw new SyntaxError('Unknown token from character ' + peekNextChar());
                }

                function peek () {
                    var token, idx;

                    idx = index;
                    try  {
                        token = next();
                        delete token.start;
                        delete token.end;
                    } catch (e) {
                        token = undefined;
                    }
                    index = idx;

                    return token;
                }

                return {
                    reset: reset,
                    next: next,
                    peek: peek
                };
            };

            Parser = function () {
                var lexer = new Lexer(), T = Token;

                function matchOp (token, op) {
                    return (typeof token !== 'undefined') && token.type === T.Operator && token.value === op;
                }

                // ArgumentList := Expression |
                //                 Expression ',' ArgumentList
                function parseArgumentList () {
                    var token, expr, args = [];

                    while (true) {
                        expr = parseExpression();
                        if (typeof expr === 'undefined') {
                            break;
                        }
                        args.push(expr);
                        token = lexer.peek();
                        if (!matchOp(token, ',')) {
                            break;
                        }
                        lexer.next();
                    }

                    return args;
                }

                // FunctionCall ::= Identifier '(' ')' ||
                //                  Identifier '(' ArgumentList ')'
                function parseFunctionCall (name) {
                    var token, args = [];

                    token = lexer.next();
                    if (!matchOp(token, '(')) {
                        throw new SyntaxError('Expecting ( in a function call "' + name + '"');
                    }

                    token = lexer.peek();
                    if (!matchOp(token, ')')) {
                        args = parseArgumentList();
                    }

                    token = lexer.next();
                    if (!matchOp(token, ')')) {
                        throw new SyntaxError('Expecting ) in a function call "' + name + '"');
                    }

                    return new MathLib.Expression({
                        subtype: 'functionCall',
                        value: name,
                        content: args
                    });
                }

                // Primary ::= Identifier |
                //             Number |
                //             '(' Assignment ')' |
                //             FunctionCall
                function parsePrimary () {
                    var token, expr;

                    token = lexer.peek();

                    if (typeof token === 'undefined') {
                        throw new SyntaxError('Unexpected termination of expression');
                    }

                    if (token.type === T.Identifier) {
                        token = lexer.next();
                        if (matchOp(lexer.peek(), '(')) {
                            return parseFunctionCall(token.value);
                        } else {
                            return new MathLib.Expression({
                                subtype: 'Identifier',
                                value: token.value
                            });
                        }
                    }

                    if (token.type === T.Number) {
                        token = lexer.next();
                        return MathLib.Expression.number(token.value);
                    }

                    if (matchOp(token, '(')) {
                        lexer.next();
                        expr = parseAssignment();
                        token = lexer.next();
                        if (!matchOp(token, ')')) {
                            throw new SyntaxError('Expecting )');
                        }
                        return new MathLib.Expression({
                            subtype: 'brackets',
                            value: 'brackets',
                            content: expr
                        });
                    }

                    throw new SyntaxError('Parse error, can not process token ' + token.value);
                }

                // Unary ::= Primary |
                //           '-' Unary
                function parseUnary () {
                    var token, expr;

                    token = lexer.peek();
                    if (matchOp(token, '-') || matchOp(token, '+')) {
                        token = lexer.next();
                        expr = parseUnary();
                        return new MathLib.Expression({
                            subtype: 'unaryOperator',
                            value: token.value,
                            content: expr
                        });
                    }

                    return parsePrimary();
                }

                // Exponentiation ::= Unary |
                //                    Exponentiation '^' Unary |
                function parseExponentiation () {
                    var token, left, right;

                    left = parseUnary();
                    token = lexer.peek();
                    if (matchOp(token, '^')) {
                        token = lexer.next();

                        right = parseExponentiation();

                        // Exponentiation is right associative
                        // a^b^c should be a^(b^c) and not (a^b)^c
                        return new MathLib.Expression({
                            subtype: 'binaryOperator',
                            value: '^',
                            content: [left, right],
                            name: 'pow'
                        });
                    }
                    return left;
                }

                // Multiplicative ::= Exponentiation |
                //                    Multiplicative '*' Exponentiation |
                //                    Multiplicative '/' Exponentiation
                function parseMultiplicative () {
                    var token, left, right, r;

                    left = parseExponentiation();
                    token = lexer.peek();
                    if (matchOp(token, '*') || matchOp(token, '/')) {
                        token = lexer.next();

                        right = parseMultiplicative();

                        // Multiplication and division is left associative:
                        // a/b/c should be (a/b)/c and not a/(b/c)
                        if (right.subtype === 'naryOperator' || right.subtype === 'binaryOperator') {
                            r = right;
                            while (r.content[0].subtype === 'naryOperator' || r.content[0].subtype === 'binaryOperator') {
                                r = r.content[0];
                            }

                            r.content[0] = new MathLib.Expression({
                                subtype: token.value === '*' ? 'naryOperator' : 'binaryOperator',
                                content: [left, r.content[0]],
                                value: token.value,
                                name: token.value === '*' ? 'times' : 'divide'
                            });
                            return right;
                        } else {
                            return new MathLib.Expression({
                                subtype: token.value === '*' ? 'naryOperator' : 'binaryOperator',
                                value: token.value,
                                name: token.value === '*' ? 'times' : 'divide',
                                content: [left, right]
                            });
                        }
                    }
                    return left;
                }

                // Additive ::= Multiplicative |
                //              Additive '+' Multiplicative |
                //              Additive '-' Multiplicative
                function parseAdditive () {
                    var token, left, right, r;

                    left = parseMultiplicative();
                    token = lexer.peek();
                    if (matchOp(token, '+') || matchOp(token, '-')) {
                        token = lexer.next();
                        right = parseAdditive();

                        // Addition and subtractio is left associative:
                        // a-b-c should be (a-b)-c and not a-(b-c)
                        if (right.value === '+' || right.value === '-') {
                            r = right;
                            while (r.content[0].subtype === 'naryOperator') {
                                r = r.content[0];
                            }

                            r.content[0] = new MathLib.Expression({
                                subtype: token.value === '+' ? 'naryOperator' : 'binaryOperator',
                                content: [left, r.content[0]],
                                value: token.value,
                                name: token.value === '+' ? 'plus' : 'minus'
                            });
                            return right;
                        } else {
                            return new MathLib.Expression({
                                subtype: token.value === '+' ? 'naryOperator' : 'binaryOperator',
                                value: token.value,
                                name: token.value === '+' ? 'plus' : 'minus',
                                content: [left, right]
                            });
                        }
                    }
                    return left;
                }

                // Assignment ::= Identifier '=' Assignment |
                //                Additive
                function parseAssignment () {
                    var expr;

                    expr = parseAdditive();

                    // TODO: support assignments
                    // if (typeof expr !== 'undefined' && expr.Identifier) {
                    // 	token = lexer.peek();
                    // 	if (matchOp(token, '=')) {
                    // 		lexer.next();
                    // 		return new MathLib.Expression({
                    // 				subtype: 'Assignment',
                    // 				name: expr,
                    // 				value: parseAssignment()
                    // 			});
                    // 	}
                    // 	return expr;
                    // }
                    return expr;
                }

                // Expression ::= Assignment
                function parseExpression () {
                    return parseAssignment();
                }

                function parse (expression) {
                    var expr, token;

                    lexer.reset(expression);
                    expr = parseExpression();

                    token = lexer.next();
                    if (typeof token !== 'undefined') {
                        throw new SyntaxError('Unexpected token ' + token.value);
                    }

                    return new MathLib.Expression(expr);
                }

                return {
                    parse: parse
                };
            };

            return Parser().parse(str);
        };

        Expression.variables = {};
        return Expression;
    })();
    MathLib.Expression = Expression;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Expression
    var functnPrototype = {};

    /**
    * MathLib.Functn is the MathLib implementation of mathematical functions
    *
    * Because 'Function' is a reserved word in JavaScript,
    * the class is called 'Functn'.
    *
    * @class
    * @this {Functn}
    */
    MathLib.Functn = function (f, options) {
        options = options || {};

        var functn = function (x) {
            if (typeof x === 'number' || typeof x === 'boolean') {
                return f.apply('', arguments);
            } else if (x.type === 'functn') {
                // x -> f(x)
                // y -> g(y)
                // y -> f(g(y))
                var bvar = options.expression.arguments[0].value, composition = options.expression.map(function (expr) {
                    if (expr.subtype === 'variable' && expr.value === bvar) {
                        expr = x.expression.content[0];
                    }
                    return expr;
                });

                return new MathLib.Functn(function (y) {
                    return f(x(y));
                }, {
                    expression: new MathLib.Expression({
                        subtype: 'functionDefinition',
                        arguments: x.expression.arguments,
                        content: composition.content
                    })
                });
            } else if (x.type === 'expression' && x.subtype === 'variable') {
                return new MathLib.Functn(f, {
                    expression: new MathLib.Expression({
                        subtype: 'functionDefinition',
                        arguments: x,
                        content: x
                    })
                });
            } else if (typeof x === 'function') {
                return function (y) {
                    return f(x(y));
                };
            } else if (x.type === 'complex') {
                return x[options.name].apply(x, Array.prototype.slice.call(arguments, 1));
            } else if (x.type === 'rational') {
                return f(x.toNumber());
            } else if (x.type === 'set') {
                return x.map(f);
            } else if (MathLib.type(x) === 'array') {
                return x.map(f);
            } else {
                return x[options.name]();
            }
        };

        for (var name in functnPrototype) {
            if (functnPrototype.hasOwnProperty(name)) {
                functn[name] = functnPrototype[name];
            }
        }
        functn.type = 'functn';
        functn.constructor = MathLib.Functn;

        Object.defineProperties(functn, {
            id: { value: options.name },
            expression: { value: options.expression }
        });

        return functn;
    };

    var exports = {};
    var binaryFunctions = {
        arctan2: Math.atan2,
        binomial: function (n, k) {
            // TODO: non integer values
            // What should be done with very big numbers?
            var binomial = 1, i, sign;

            // not finite means ±∞ or NaN
            if (MathLib.isNaN(n) || !MathLib.isFinite(k)) {
                return NaN;
            }

            // Exit early for areas which return 0
            if ((n >= 0 && k <= -1) || (n >= 0 && k > n) || (k < 0 && k > n)) {
                return 0;
            }

            if (n < 0) {
                if (k < 0) {
                    // negative odd number % 2 = -1 and not +1
                    // This leads to the + 1 here.
                    return ((n + k) % 2 * 2 + 1) * MathLib.binomial(-k - 1, -n - 1);
                } else {
                    if (k === 0) {
                        sign = 1;
                    } else {
                        sign = -(k % 2 * 2 - 1);
                    }
                    binomial = sign * MathLib.binomial(k - n - 1, k);
                }
            }

            if (k > n / 2) {
                k = n - k;
            }

            for (i = 1; i <= k; i++) {
                binomial *= (n + 1 - i) / i;
            }
            return binomial;
        },
        divide: function (a, b) {
            return MathLib.times(a, MathLib.inverse(b));
        },
        log: function (base, x) {
            if (arguments.length === 1) {
                x = base;
                base = 10;
            }
            return Math.log(x) / Math.log(base);
        },
        minus: function (a, b) {
            return MathLib.plus(a, MathLib.negative(b));
        },
        mod: function (n, m) {
            var nm = n % m;
            return nm >= 0 ? nm : nm + m;
        },
        pow: function (x, y) {
            if (x === 1 || (x === -1 && (y === Infinity || y === -Infinity))) {
                return 1;
            }
            return Math.pow(x, y);
        },
        root: function (x, root) {
            if (arguments.length === 1) {
                return Math.sqrt(x);
            }
            return Math.pow(x, 1 / root);
        }
    };

    var createBinaryFunction = function (f, name) {
        return function (x) {
            if (typeof x === 'number') {
                return f.apply('', arguments);
            } else if (typeof x === 'function') {
                return function (y) {
                    return f(x(y));
                };
            } else if (x.type === 'set') {
                return new MathLib.Set(x.map(f));
            } else if (x.type === 'complex') {
                return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
            } else if (Array.isArray(x)) {
                return x.map(f);
            } else {
                return x[name]();
            }
        };
    };

    var func, cur;
    for (func in binaryFunctions) {
        if (binaryFunctions.hasOwnProperty(func)) {
            cur = binaryFunctions[func];
            Object.defineProperty(exports, func, {
                value: createBinaryFunction(binaryFunctions[func], func)
            });
        }
    }

    /**
    * Numeric derivative at a given point
    *
    * @param {number} x The value to calculate the derivative at
    * @param {number} h Optional step size
    * @return {number}
    */
    functnPrototype.diff = function (x, h) {
        if (typeof h === "undefined") { h = 1e-5; }
        return (this(x + h) - this(x - h)) / (2 * h);
    };

    /**
    * Draws the function on the screen
    *
    * @param {Screen} screen The screen to draw the function onto.
    * @param {object} options Optional drawing options.
    * @return {Functn}
    */
    functnPrototype.draw = function (screen, options) {
        if (typeof options === "undefined") { options = {}; }
        var functn = this;
        if (Array.isArray(screen)) {
            screen.forEach(function (x) {
                x.path(functn, options);
            });
        } else {
            screen.path(functn, options);
        }

        return this;
    };

    // These functions will be added to the functn prototype soon.
    var functionList1 = {
        /*
        divisors: function (x) {
        var divisors = x === 1 ? [] : [1],
        i, ii;
        for (i = 2, ii = x / 2; i <= ii; i++) {
        if (x % i === 0) {
        divisors.push(i);
        }
        }
        divisors.push(x);
        return new MathLib.Set(divisors);
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
        */
        fallingFactorial: function (n, m, s) {
            var factorial = 1, j;
            s = s || 1;

            for (j = 0; j < m; j++) {
                factorial *= (n - j * s);
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
                factorial *= (n + j * s);
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
            } else {
                return x.toContentMathML();
            }
        },
        toLaTeX: function (x, plus) {
            if (plus) {
                return (x < 0 ? '-' : '+') + Math.abs(x);
            } else {
                return (x < 0 ? '-' : '') + Math.abs(x);
            }
        },
        toMathML: function (x, plus) {
            if (plus) {
                return '<mo>' + (x < 0 ? '-' : '+') + '</mo><mn>' + Math.abs(x) + '</mn>';
            } else {
                return (x < 0 ? '<mo>-</mo>' : '') + '<mn>' + Math.abs(x) + '</mn>';
            }
        },
        toString: function (x, plus) {
            if (plus) {
                return (x < 0 ? '-' : '+') + Math.abs(x);
            } else {
                return (x < 0 ? '-' : '') + Math.abs(x);
            }
        }
    };

    var createFunction1 = function (f, name) {
        return function (x) {
            if (typeof x === 'number') {
                return f.apply('', arguments);
            } else if (typeof x === 'function') {
                return function (y) {
                    return f(x(y));
                };
            } else if (x.type === 'set') {
                return new MathLib.Set(x.map(f));
            } else if (x.type === 'complex') {
                return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
            } else if (Array.isArray(x)) {
                return x.map(f);
            } else {
                return x[name]();
            }
        };
    };

    for (func in functionList1) {
        if (functionList1.hasOwnProperty(func)) {
            cur = functionList1[func];
            Object.defineProperty(exports, func, {
                value: createFunction1(functionList1[func], func)
            });
        }
    }

    MathLib.compare = function (a, b) {
        if (MathLib.type(a) !== MathLib.type(b)) {
            return MathLib.sign(MathLib.type(a).localeCompare(MathLib.type(b)));
        } else if (typeof a === 'number') {
            return MathLib.sign(a - b);
        } else if (typeof a === 'string') {
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
            return str.slice(0, 1).toUpperCase() + str.slice(1);
        }, global = global, window = window, glbl = {
            Object: Object,
            Function: Function,
            RegExp: RegExp,
            Array: Array
        };

        if (MathLib.type(obj) === type) {
            return true;
        } else if ([
            'circle', 'complex', 'expression', 'functn', 'line', 'matrix', 'permutation', 'point',
            'polynomial', 'rational', 'screen', 'screen2d', 'screen3d', 'set', 'vector'].indexOf(type) !== -1) {
            return obj instanceof MathLib[ucfirst(type)];
        } else {
            // if (window) {
            return obj instanceof glbl[ucfirst(type)];
            // }
            // if (global) {
            // 	return obj instanceof global[ucfirst(type)];
            // }
        }
    };

    /**
    * Checks if MathML is supported by the browser.
    * Code stolen from [Modernizr](http://www.modernizr.com/)
    *
    * @return {boolean}
    */
    MathLib.isMathMLSupported = function () {
        var hasMathML = false, ns, div, mfrac;

        // If document is undefined (e.g. in Node) we return false
        if (typeof document !== 'undefined' && document.createElementNS) {
            ns = 'http://www.w3.org/1998/Math/MathML';
            div = document.createElement('div');
            div.style.position = 'absolute';
            mfrac = div.appendChild(document.createElementNS(ns, 'math')).appendChild(document.createElementNS(ns, 'mfrac'));
            mfrac.appendChild(document.createElementNS(ns, 'mi')).appendChild(document.createTextNode('xx'));
            mfrac.appendChild(document.createElementNS(ns, 'mi')).appendChild(document.createTextNode('yy'));
            document.body.appendChild(div);
            hasMathML = div.offsetHeight > div.offsetWidth;
            document.body.removeChild(div);
        }
        return hasMathML;
    };

    /**
    * ### MathLib.writeMathML()
    * Writes MathML to an element.
    *
    * @param {string} id The id of the element in which the MathML should be inserted.
    * @param {string} math The MathML to be inserted.
    */
    MathLib.writeMathML = function (id, math) {
        var formula;
        document.getElementById(id).innerHTML = '<math>' + math + '</math>';
        if (typeof MathJax !== 'undefined') {
            formula = MathJax.Hub.getAllJax(id)[0];
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
        }
    };

    /**
    * ### MathLib.loadMathJax()
    * Loads MathJax dynamically.
    *
    * @param {string} config Optional config options
    */
    MathLib.loadMathJax = function (config) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';

        config = config || 'MathJax.Hub.Config({' + 'config: ["MMLorHTML.js"],' + 'jax: ["input/TeX", "input/MathML", "output/HTML-CSS", "output/NativeMML"],' + 'extensions: ["tex2jax.js", "mml2jax.js", "MathMenu.js", "MathZoom.js"],' + 'TeX: {' + 'extensions: ["AMSmath.js", "AMSsymbols.js", "noErrors.js", "noUndefined.js"]' + '}' + '});';

        if (window.opera) {
            script.innerHTML = config;
        } else {
            script.text = config;
        }

        document.getElementsByTagName('head')[0].appendChild(script);
    };

    // Functions that act on set-like structures and return one single number/boolean...
    var nAryFunctions = {
        /**
        * Returns true iff all arguments are true.
        *
        * @param {...boolean} n Expects an arbitrary number of boolean arguments
        * @return {boolean}
        */
        and: function (n) {
            return n.every(function (x) {
                return !!x;
            });
        },
        arithMean: function (n) {
            return MathLib.plus(n) / n.length;
        },
        gcd: function (a) {
            var min, reduction = function (x) {
                return x !== min ? x % min : x;
            }, isntZero = function (x) {
                return x !== 0;
            };

            // remove zeros and make negative values positive
            a = a.filter(isntZero).map(Math.abs);

            if (a.length === 0) {
                return 0;
            }

            while (a.length > 1) {
                min = MathLib.min(a);
                a = a.map(reduction).filter(isntZero);
            }
            return a[0] || min;
        },
        geoMean: function (n) {
            return MathLib.root(MathLib.times(n), n.length);
        },
        harmonicMean: function (n) {
            return n.length / MathLib.plus(n.map(MathLib.inverse));
        },
        hypot: function (n) {
            var a, b, max, min;

            if (n.length === 1) {
                return Math.abs(n[0]);
            }

            if (n.length > 2) {
                return n.reduce(function (a, b) {
                    return MathLib.hypot(a, b);
                });
            }

            a = MathLib.abs(n[0]);
            b = MathLib.abs(n[1]);

            // Return Infinity if one value is infinite, even if the other value is NaN.
            // (see IEEE 754-2008, 9.2.1)
            if (a === Infinity || b === Infinity) {
                return Infinity;
            }

            // Return +0 if both values are ±0 (see IEEE 754-2008, 9.2.1)
            if (a === 0 && b === 0) {
                return 0;
            }

            max = Math.max(a, b);
            min = Math.min(a, b);

            return max * Math.sqrt(1 + Math.pow(min / max, 2));
        },
        hypot2: function (n) {
            // Return Infinity if one value is infinite
            if (n.some(function (x) {
                return x === Infinity || x === -Infinity;
            })) {
                return Infinity;
            }
            return n.reduce(function (old, cur) {
                return old + cur * cur;
            }, 0);
        },
        /**
        * ### MathLib.isEqual()
        * Determines if all arguments are equal.
        *
        * @param {...number|MathLib object} n Expects an arbitrary number of numbers or MathLib objects
        * @return {boolean}
        */
        isEqual: function (n) {
            return n.every(function (a, i, args) {
                if (a === args[0]) {
                    return true;
                } else if (typeof a === 'number' && typeof args[0] === 'number') {
                    return Math.abs(a - args[0]) <= 3e-15;
                } else if (typeof a === 'object') {
                    return a.isEqual(args[0]);
                } else if (typeof args[0] === 'object') {
                    return args[0].isEqual(a);
                }
                return false;
            });
        },
        lcm: function (n) {
            if (n.length === 0) {
                return 0;
            }
            if (n.length === 1) {
                return n[0];
            } else if (n.length === 2) {
                return MathLib.times(n) / MathLib.gcd(n);
            } else if (n.length > 2) {
                return n.reduce(function (x, y) {
                    return MathLib.lcm(x, y);
                });
            }
        },
        max: function (n) {
            return Math.max.apply(null, n);
        },
        min: function (n) {
            return Math.min.apply(null, n);
        },
        /**
        * ### MathLib.or()
        * Returns true iff at least one argument is true.
        *
        * @param {...boolean} Expects an arbitrary number of boolean arguments
        * @return {boolean}
        */
        or: function (n) {
            return n.some(function (x) {
                return !!x;
            });
        },
        plus: function (n) {
            if (n.length === 0) {
                return 0;
            }
            return n.reduce(function (a, b) {
                var f1, f2, aExpr, bExpr;
                if (typeof a === 'number' && typeof b === 'number') {
                    return a + b;
                } else if (a.type === 'functn' || b.type === 'functn') {
                    f1 = a;
                    f2 = b;
                    aExpr = a.expression ? a.expression.content[0] : {};
                    bExpr = b.expression ? b.expression.content[0] : {};

                    if (a.type !== 'functn') {
                        f1 = function () {
                            return a;
                        };
                        aExpr = new MathLib.Expression({
                            value: a,
                            subtype: 'number'
                        });
                    } else if (b.type !== 'functn') {
                        f2 = function () {
                            return b;
                        };
                        bExpr = new MathLib.Expression({
                            value: b,
                            subtype: 'number'
                        });
                    }
                    return MathLib.Functn(function (x) {
                        return MathLib.plus(f1(x), f2(x));
                    }, {
                        expression: new MathLib.Expression({
                            subtype: 'functionDefinition',
                            arguments: ['x'],
                            content: [
                                new MathLib.Expression({
                                    content: [aExpr, bExpr],
                                    subtype: 'naryOperator',
                                    value: '+',
                                    name: 'plus'
                                })
                            ]
                        })
                    });
                } else if (typeof a === 'object') {
                    return a.plus(b);
                } else if (typeof b === 'object') {
                    return b.plus(a);
                }
            });
        },
        times: function (n) {
            if (n.length === 0) {
                return 1;
            }
            return n.reduce(function (a, b) {
                var f1, f2, aExpr, bExpr;
                if (typeof a === 'number' && typeof b === 'number') {
                    return a * b;
                } else if (a.type === 'functn' || b.type === 'functn') {
                    f1 = a;
                    f2 = b;
                    aExpr = a.expression ? a.expression.content[0] : {};
                    bExpr = b.expression ? b.expression.content[0] : {};

                    if (a.type !== 'functn') {
                        f1 = function () {
                            return a;
                        };
                        aExpr = new MathLib.Expression({
                            value: a,
                            subtype: 'number'
                        });
                    } else if (b.type !== 'functn') {
                        f2 = function () {
                            return b;
                        };
                        bExpr = new MathLib.Expression({
                            value: b,
                            subtype: 'number'
                        });
                    }
                    return MathLib.Functn(function (x) {
                        return MathLib.times(f1(x), f2(x));
                    }, {
                        expression: new MathLib.Expression({
                            subtype: 'functionDefinition',
                            arguments: ['x'],
                            content: [
                                new MathLib.Expression({
                                    content: [aExpr, bExpr],
                                    subtype: 'naryOperator',
                                    value: '*',
                                    name: 'times'
                                })
                            ]
                        })
                    });
                } else if (typeof a === 'object') {
                    return a.times(b);
                } else if (typeof b === 'object') {
                    return b.times(a);
                }
            });
        },
        /**
        * ### MathLib.xor()
        * Returns true iff an odd number of the arguments is true.
        *
        * @param {...boolean} Expects an arbitrary number of boolean arguments
        * @return {boolean}
        */
        xor: function (n) {
            return n.reduce(function (x, y) {
                return x + !!y;
            }, 0) % 2 !== 0;
        }
    };

    var createNaryFunction = function (f) {
        return function (n) {
            if (MathLib.type(n) === 'set') {
                return f(n.slice());
            } else if (MathLib.type(n) !== 'array') {
                n = Array.prototype.slice.apply(arguments);
            }
            return f(n);
        };
    };

    for (func in nAryFunctions) {
        if (nAryFunctions.hasOwnProperty(func)) {
            Object.defineProperty(exports, func, {
                value: createNaryFunction(nAryFunctions[func])
            });
        }
    }

    /**
    * Numeric evaluation of an integral using an adative simpson approach.
    *
    * Inspired by "adaptsim.m" by Walter Gander
    * and MatLab's "quad.m"
    *
    * @param {number} a The starting point
    * @param {number} b The end point
    * @param {number} options Optional options
    * @return {number}
    */
    functnPrototype.quad = function (a, b, options) {
        if (typeof options === "undefined") { options = {}; }
        var f = this, warnMessage = [
            'Calculation succeded',
            'Minimum step size reached',
            'Maximum function count exceeded',
            'Infinite or NaN function value encountered'
        ], Q;

        options.calls = 3;
        options.warn = 0;

        if (a === -Infinity) {
            a = -Number.MAX_VALUE;
        }

        if (b === Infinity) {
            b = Number.MAX_VALUE;
        }

        if (!('minStep' in options)) {
            options.minStep = 1e-15;
        }

        if (!('maxCalls' in options)) {
            options.maxCalls = 10000;
        }

        if (!('tolerance' in options)) {
            options.tolerance = 1e-5;
        }

        Q = quadstep(f, a, b, f(a), f((a + b) / 2), f(b), options);

        options.warnMessage = warnMessage[options.warn];

        return Q;
    };

    // Recursive function for the quad method
    var quadstep = function (f, a, b, fa, fc, fb, options) {
        var h = b - a, c = (a + b) / 2, fd = f((a + c) / 2), fe = f((c + b) / 2), Q1 = (h / 6) * (fa + 4 * fc + fb), Q2 = (h / 12) * (fa + 4 * fd + 2 * fc + 4 * fe + fb), Q = Q2 + (Q2 - Q1) / 15;

        options.calls = options.calls + 2;

        // Infinite or Not-a-Number function value encountered
        if (!MathLib.isFinite(Q)) {
            options.warn = Math.max(options.warn, 3);
            return Q;
        }

        // Maximum function count exceeded; singularity likely
        if (options.calls > options.maxCalls) {
            options.warn = Math.max(options.warn, 2);
            return Q;
        }

        // Accuracy over this subinterval is acceptable
        if (Math.abs(Q2 - Q) <= options.tolerance) {
            return Q;
        }

        // Minimum step size reached; singularity possible
        if (Math.abs(h) < options.minStep || c === a || c === b) {
            options.warn = Math.max(options.warn, 1);
            return Q;
        }

        // Otherwise, divide the interval into two subintervals
        return quadstep(f, a, c, fa, fd, fc, options) + quadstep(f, c, b, fc, fe, fb, options);
    };

    /**
    * Returns a content MathML representation of the function
    *
    * @return {MathML}
    */
    functnPrototype.toContentMathML = function () {
        return this.expression.toContentMathML();
    };

    /**
    * Returns a LaTeX representation of the function
    *
    * @return {string}
    */
    functnPrototype.toLaTeX = function () {
        return this.expression.toLaTeX();
        /*
        / / List of functions to be executed on the specified node type
        var handlers = {
        apply: function (n) {
        var f = n.childNodes[0],
        args = n.childNodes.slice(1).map(function (x) {
        return handlers[x.nodeName](x);
        }),
        str = '';
        
        if (f.nodeName === 'plus') {
        str = args.join('+');
        }
        else if (f.nodeName === 'times') {
        str = args.join('*');
        }
        else if (f.nodeName === 'power') {
        str = args[0] + '^{' + args[1] + '}';
        }
        else {
        / / TODO: not all functions can be written like \sin some have to be written like \operatorname{argmax}
        str = '\\' + f.nodeName + '(' + args.join(', ') + ')';
        }
        return str;
        },
        bvar: function () {return '';},
        ci: function (n) {return bvar || n.innerMathML;},
        cn: function (n) {return n.innerMathML;},
        cs: function (n) {return n.innerMathML;},
        domainofapplication: function () {return '';},
        lambda: function (n) {
        return n.childNodes.reduce(function (old, cur) {
        return old + handlers[cur.nodeName](cur);
        }, '');
        },
        '#text': function (n) {return n.innerMathML;}
        };
        
        / / Start the node handling with the first real element (not the <math> element)
        return handlers[this.contentMathML.childNodes[0].nodeName](this.contentMathML.childNodes[0]);
        */
    };

    /**
    * Returns a MathML representation of the function
    *
    * @return {string}
    */
    functnPrototype.toMathML = function () {
        return this.expression.toMathML();
    };

    /**
    * Returns a string representation of the function
    *
    * @return {string}
    */
    functnPrototype.toString = function () {
        return this.expression.toString();
        /*
        / / List of functions to be executed on the specified node type
        var handlers = {
        apply: function (n) {
        var f = n.childNodes[0],
        args = n.childNodes.slice(1).map(function (x) {
        return handlers[x.nodeName](x);
        }),
        str = '';
        
        if (f.nodeName === 'plus') {
        str = args.join('+');
        }
        else if (f.nodeName === 'times') {
        str = args.join('*');
        }
        else if (f.nodeName === 'power') {
        str = args[0] + '^' + args[1];
        }
        else {
        str = f.nodeName + '(' + args.join(', ') + ')';
        }
        return str;
        },
        bvar: function () {return '';},
        ci: function (n) {return bvar || n.innerMathML;},
        cn: function (n) {return n.innerMathML;},
        cs: function (n) {return n.innerMathML;},
        domainofapplication: function () {return '';},
        lambda: function (n) {
        return n.childNodes.reduce(function (old, cur) {
        return old + handlers[cur.nodeName](cur);
        }, '');
        },
        '#text': function (n) {return n.innerMathML;}
        };
        
        / / Start the node handling with the first real element (not the <math> element)
        return handlers[this.contentMathML.childNodes[0].nodeName](this.contentMathML.childNodes[0]);
        */
    };

    // ## unary functions
    // Some functions for the functn prototype
    var unaryFunctions = {
        abs: Math.abs,
        arccos: Math.acos,
        arccot: function (x) {
            return 1.5707963267948966 - Math.atan(x);
        },
        arccsc: function (x) {
            return Math.asin(1 / x);
        },
        arcosh: MathLib.isNative(Math.acosh) || function (x) {
            return Math.log(x + Math.sqrt(x * x - 1));
        },
        arcoth: function (x) {
            // Handle ±∞
            if (!MathLib.isFinite(x)) {
                return 1 / x;
            }
            return 0.5 * Math.log((x + 1) / (x - 1));
        },
        arcsch: function (x) {
            // Handle ±0 and ±∞ separately
            if (x === 0 || !MathLib.isFinite(x)) {
                return 1 / x;
            }
            return Math.log(1 / x + Math.sqrt(1 / (x * x) + 1));
        },
        arcsec: function (x) {
            return Math.acos(1 / x);
        },
        arcsin: Math.asin,
        arctan: Math.atan,
        arsech: function (x) {
            return Math.log((1 + Math.sqrt(1 - x * x)) / x);
        },
        arsinh: MathLib.isNative(Math.asinh) || function (x) {
            // Handle ±0 and ±∞ separately
            if (x === 0 || !MathLib.isFinite(x)) {
                return x;
            }
            return Math.log(x + Math.sqrt(x * x + 1));
        },
        artanh: MathLib.isNative(Math.atanh) || function (x) {
            // Handle ±0
            if (x === 0) {
                return x;
            }
            return 0.5 * Math.log((1 + x) / (1 - x));
        },
        ceil: function (x) {
            // Some implementations have a bug where Math.ceil(-0) = +0 (instead of -0)
            if (x === 0) {
                return x;
            }
            return Math.ceil(x);
        },
        cbrt: function (x) {
            var a3, a3x, an, a;

            // Handle ±0, NaN, ±∞
            if (x === 0 || x !== x || x === Infinity || x === -Infinity) {
                return x;
            }

            // Get an approximation
            a = MathLib.sign(x) * Math.pow(Math.abs(x), 1 / 3);

            while (true) {
                a3 = Math.pow(a, 3);
                a3x = a3 + x;
                an = a * (a3x + x) / (a3x + a3);
                if (MathLib.isZero(an - a)) {
                    break;
                }
                a = an;
            }
            return an;
        },
        conjugate: function (x) {
            return x;
        },
        copy: function (x) {
            return x;
        },
        cos: Math.cos,
        cosh: MathLib.isNative(Math.cosh) || function (x) {
            return (Math.exp(x) + Math.exp(-x)) / 2;
        },
        cot: function (x) {
            // Handle ±0 separate, because tan(pi/2 ± 0) is not ±∞
            if (x === 0) {
                return 1 / x;
            }

            // cot(x) = tan(pi/2 - x) is better than 1/tan(x)
            return Math.tan(1.5707963267948966 - x);
        },
        coth: function (x) {
            // Handle ±0
            if (x === 0) {
                return 1 / x;
            }

            // Handle ±∞
            if (!MathLib.isFinite(x)) {
                return MathLib.sign(x);
            }

            return (Math.exp(x) + Math.exp(-x)) / (Math.exp(x) - Math.exp(-x));
        },
        csc: function (x) {
            return 1 / Math.sin(x);
        },
        csch: function (x) {
            // csch(-0) should be -∞ not ∞
            if (x === 0) {
                return 1 / x;
            }
            return 2 / (Math.exp(x) - Math.exp(-x));
        },
        degToRad: function (x) {
            // Math.PI / 180 = 0.017453292519943295
            return x * 0.017453292519943295;
        },
        digitsum: function (x) {
            var out = 0;
            while (x > 9) {
                out += x % 10;
                x = Math.floor(x / 10);
            }
            return out + x;
        },
        exp: Math.exp,
        factorial: function (x) {
            var factorial = 1, i;
            if ((x > 170 && MathLib.isInt(x)) || x === Infinity) {
                return Infinity;
            }
            if (x < 0 || !MathLib.isInt(x) || MathLib.isNaN(x)) {
                return NaN;
            }
            for (i = 1; i <= x; i++) {
                factorial *= i;
            }
            return factorial;
        },
        floor: Math.floor,
        identity: function (x) {
            return x;
        },
        inverse: function (x) {
            return 1 / x;
        },
        isFinite: function (x) {
            return Math.abs(x) < Infinity;
        },
        isInt: function (x) {
            return x % 1 === 0;
        },
        isNaN: function (x) {
            return x !== x;
        },
        isNegZero: function (x) {
            return 1 / x === -Infinity;
        },
        isOne: function (a) {
            return Math.abs(a - 1) < MathLib.epsilon;
        },
        isPosZero: function (x) {
            return 1 / x === Infinity;
        },
        isPrime: function (x) {
            var sqrt = Math.sqrt(x), i;
            if (x % 1 === 0 && x > 1) {
                if (x === 2) {
                    return true;
                }
                if (x % 2 === 0) {
                    return false;
                }
                for (i = 3; i <= sqrt; i += 2) {
                    if (x % i === 0) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        isReal: function (x) {
            return Math.abs(x) < Infinity;
        },
        isZero: function (x) {
            return Math.abs(x) < MathLib.epsilon;
        },
        lg: function (x) {
            return Math.log(x) / Math.LN10;
        },
        ln: Math.log,
        // Algorithm based on [Numerical Recipes Vol. 3, p. 257](www.nr.com)
        logGamma: function (x) {
            var j, tmp, y, ser, cof = [
                57.1562356658629235, -59.5979603554754912, 14.1360979747417471, -0.491913816097620199,
                0.339946499848118887e-4, 0.465236289270485756e-4, -0.983744753048795646e-4, 0.158088703224912494e-3,
                -0.210264441724104883e-3, 0.217439618115212643e-3, -0.164318106536763890e-3, 0.844182239838527433e-4,
                -0.261908384015814087e-4, 0.368991826595316234e-5];

            y = x;
            tmp = x + 5.24218750000000000; // Rational 671/128.
            tmp = (x + 0.5) * Math.log(tmp) - tmp;
            ser = 0.999999999999997092;
            for (j = 0; j < 14; j++) {
                ser += cof[j] / ++y;
            }
            return tmp + Math.log(2.5066282746310005 * ser / x);
        },
        negative: function (x) {
            return -x;
        },
        not: function (x) {
            return !x;
        },
        radToDeg: function (x) {
            // 180 / Math.PI = 57.29577951308232
            return x * 57.29577951308232;
        },
        sec: function (x) {
            return 1 / Math.cos(x);
        },
        sech: function (x) {
            return 2 / (Math.exp(x) + Math.exp(-x));
        },
        sign: function (x) {
            return x && (x < 0 ? -1 : 1);
        },
        sin: Math.sin,
        sinh: MathLib.isNative(Math.sinh) || function (x) {
            // sinh(-0) should be -0
            if (x === 0) {
                return x;
            }
            return (Math.exp(x) - Math.exp(-x)) / 2;
        },
        sqrt: Math.sqrt,
        tan: Math.tan,
        tanh: MathLib.isNative(Math.tanh) || function (x) {
            var p;

            // Handle ±0 and ±∞ separately
            // Their values happen to coincide with sign
            if (x === 0 || !MathLib.isFinite(x)) {
                return MathLib.sign(x);
            }

            p = Math.exp(x);
            return (p * p - 1) / (p * p + 1);
        }
    };

    for (var elemfn in unaryFunctions) {
        if (unaryFunctions.hasOwnProperty(elemfn)) {
            Object.defineProperty(exports, elemfn, {
                value: MathLib.Functn(unaryFunctions[elemfn], {
                    name: elemfn,
                    expression: new MathLib.Expression({
                        subtype: 'functionDefinition',
                        arguments: [
                            new MathLib.Expression({
                                subtype: 'variable',
                                value: 'x'
                            })
                        ],
                        content: [
                            new MathLib.Expression({
                                subtype: 'functionCall',
                                content: [
                                    new MathLib.Expression({
                                        subtype: 'variable',
                                        value: 'x'
                                    })
                                ],
                                value: elemfn
                            })
                        ]
                    })
                }),
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
    }

    MathLib.abs = exports.abs;
    MathLib.arccos = exports.arccos;
    MathLib.arccot = exports.arccot;
    MathLib.arccsc = exports.arccsc;
    MathLib.arcosh = exports.arcosh;
    MathLib.arcoth = exports.arcoth;
    MathLib.arcsch = exports.arcsch;
    MathLib.arcsec = exports.arcsec;
    MathLib.arcsin = exports.arcsin;
    MathLib.arctan = exports.arctan;
    MathLib.arsech = exports.arsech;
    MathLib.arsinh = exports.arsinh;
    MathLib.artanh = exports.artanh;
    MathLib.ceil = exports.ceil;
    MathLib.cbrt = exports.cbrt;
    MathLib.conjugate = exports.conjugate;
    MathLib.copy = exports.copy;
    MathLib.cos = exports.cos;
    MathLib.cosh = exports.cosh;
    MathLib.cot = exports.cot;
    MathLib.coth = exports.coth;
    MathLib.csc = exports.csc;
    MathLib.csch = exports.csch;
    MathLib.degToRad = exports.degToRad;
    MathLib.digitsum = exports.digitsum;
    MathLib.exp = exports.exp;
    MathLib.factorial = exports.factorial;
    MathLib.floor = exports.floor;
    MathLib.identity = exports.identity;
    MathLib.inverse = exports.inverse;
    MathLib.isFinite = exports.isFinite;
    MathLib.isInt = exports.isInt;
    MathLib.isNaN = exports.isNaN;
    MathLib.isNegZero = exports.isNegZero;
    MathLib.isOne = exports.isOne;
    MathLib.isPosZero = exports.isPosZero;
    MathLib.isPrime = exports.isPrime;
    MathLib.isReal = exports.isReal;
    MathLib.isZero = exports.isZero;
    MathLib.lg = exports.lg;
    MathLib.ln = exports.ln;
    MathLib.logGamma = exports.logGamma;
    MathLib.negative = exports.negative;
    MathLib.not = exports.not;
    MathLib.radToDeg = exports.radToDeg;
    MathLib.sec = exports.sec;
    MathLib.sech = exports.sech;
    MathLib.sign = exports.sign;
    MathLib.sin = exports.sin;
    MathLib.sinh = exports.sinh;
    MathLib.sqrt = exports.sqrt;
    MathLib.tan = exports.tan;
    MathLib.tanh = exports.tanh;

    MathLib.arctan2 = exports.arctan2;
    MathLib.binomial = exports.binomial;
    MathLib.divide = exports.divide;
    MathLib.log = exports.log;
    MathLib.minus = exports.minus;
    MathLib.mod = exports.mod;
    MathLib.pow = exports.pow;
    MathLib.root = exports.root;

    MathLib.divisors = exports.divisors;
    MathLib.factor = exports.factor;
    MathLib.fallingFactorial = exports.fallingFactorial;
    MathLib.fibonacci = exports.fibonacci;
    MathLib.risingFactorial = exports.risingFactorial;
    MathLib.round = exports.round;
    MathLib.trunc = exports.trunc;
    MathLib.toContentMathML = exports.toContentMathML;
    MathLib.toLaTeX = exports.toLaTeX;
    MathLib.toMathML = exports.toMathML;
    MathLib.toString = exports.toString;

    MathLib.and = exports.and;
    MathLib.arithMean = exports.arithMean;
    MathLib.gcd = exports.gcd;
    MathLib.geoMean = exports.geoMean;
    MathLib.harmonicMean = exports.harmonicMean;
    MathLib.hypot = exports.hypot;
    MathLib.hypot2 = exports.hypot2;
    MathLib.isEqual = exports.isEqual;
    MathLib.lcm = exports.lcm;
    MathLib.max = exports.max;
    MathLib.min = exports.min;
    MathLib.or = exports.or;
    MathLib.plus = exports.plus;
    MathLib.times = exports.times;
    MathLib.xor = exports.xor;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    var template = function (data) {
        var p = [];
        p.push(' <figure class="MathLib_figure">     <div class="MathLib_wrapper" style="width: ');
        p.push(data.width);
        p.push('px; height: ');
        p.push(data.height);
        p.push('px">   <div class="MathLib_info_message">Your browser does not seem to support WebGL.<br>   Please update your browser to see the plot.</div>  </div>      ');
        if (data.figcaption) {
            p.push('   <figcaption class="MathLib_figcaption">');
            p.push(data.figcaption);
            p.push('</figcaption>  ');
        }
        p.push('  </figure>  ');
        if (data.contextMenu) {
            p.push('  <div class="MathLib_contextMenuOverlay">   <menu class="MathLib_menu MathLib_mainmenu">          ');
            if (data.contextMenu.screenshot) {
                p.push('     <div class="MathLib_screenshot MathLib_menuItem">Save Screenshot</div>    ');
            }
            p.push('      ');
            if (data.contextMenu.fullscreen) {
                p.push('     <div class="MathLib_fullscreen MathLib_menuItem">      <span class="needs-nofullscreen">Enter Fullscreen</span>      <span class="needs-fullscreen">Exit Fullscreen</span>     </div>    ');
            }
            p.push('      ');
            if (data.contextMenu.grid) {
                p.push('     <div class="MathLib_menuItem MathLib_hasSubmenu">      Grid      <menu class="MathLib_menu MathLib_submenu">       <div class="MathLib_needs2D">        <label class="MathLib_menuItem">         <input type="radio" name="MathLib_grid_type_');
                p.push(data.uuid);
                p.push('" class="MathLib_radio MathLib_grid_type" value="cartesian">cartesian        </label>        <label class="MathLib_menuItem">         <input type="radio" name="MathLib_grid_type_');
                p.push(data.uuid);
                p.push('" class="MathLib_radio MathLib_grid_type" value="polar">polar        </label>        <label class="MathLib_menuItem">         <input type="radio" name="MathLib_grid_type_');
                p.push(data.uuid);
                p.push('" class="MathLib_radio MathLib_grid_type" value="none">none        </label>       </div>        <div class="MathLib_needs3D MathLib_menuItem MathLib_is_disabled" style="font-size: 0.7em">        Gridoptions for 3D are coming soon.       </div>      </menu>     </div>    ');
            }
            p.push('      <hr class="MathLib_separator">    <div class="MathLib_is_disabled MathLib_menuItem MathLib_is_centered" style="font-size:0.83em">     Plot generated by MathLib.js    </div>   </menu>  </div> ');
        }
        p.push('');
        return p.join("");
    };

    /// no import
    /**
    * This module contains the common methods of all drawing modules.
    *
    * @class
    * @this {Screen}
    */
    var Screen = (function () {
        function Screen(id, options) {
            if (typeof options === "undefined") { options = {}; }
            var _this = this;
            this.type = 'screen';
            var that = this, defaults = {
                height: 500,
                width: 500,
                contextMenu: {
                    screenshot: true,
                    fullscreen: true,
                    grid: true
                },
                figcaption: ''
            }, opts = MathLib.extendObject(defaults, options), container = document.getElementById(id), innerHTMLContextMenu = '', uuid = +Date.now(), fullscreenchange, innerHTML;

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

            if (options.contextMenu) {
                this.wrapper.oncontextmenu = function (evt) {
                    return _this.oncontextmenu(evt);
                };

                if (opts.contextMenu.screenshot && !('opera' in window)) {
                    this.contextMenu.getElementsByClassName('MathLib_screenshot')[0].onclick = function () {
                        var dataURI, a = document.createElement('a');

                        if (that.options.renderer === 'Canvas' && that.type === 'screen2D') {
                            var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');

                            canvas.height = that.height;
                            canvas.width = that.width;

                            ctx.drawImage(that.layer.back.element, 0, 0);
                            ctx.drawImage(that.layer.grid.element, 0, 0);
                            ctx.drawImage(that.layer.axes.element, 0, 0);
                            ctx.drawImage(that.layer.main.element, 0, 0);

                            dataURI = canvas.toDataURL('image/png');
                            if ('download' in a) {
                                a.href = dataURI;
                                a.download = 'plot.png';
                                a.click();
                            } else {
                                window.location.href = dataURI.replace('image/png', 'image/octet-stream');
                            }
                        }

                        if (that.options.renderer === 'WebGL' && that.type === 'screen3D') {
                            dataURI = that.element.toDataURL('image/png');
                            if ('download' in a) {
                                a.href = dataURI;
                                a.download = 'plot.png';
                                a.click();
                            } else {
                                window.location.href = dataURI.replace('image/png', 'image/octet-stream');
                            }
                        } else if (that.options.renderer === 'SVG') {
                            dataURI = 'data:image/svg+xml,' + that.element.parentElement.innerHTML;

                            if ('download' in a) {
                                a.href = dataURI;
                                a.download = 'plot.svg';
                                a.click();
                            } else {
                                window.location.href = dataURI.replace('image/svg+xml', 'image/octet-stream');
                            }
                        }
                    };
                }

                if (opts.contextMenu.fullscreen && 'requestFullScreen' in document.body) {
                    this.contextMenu.getElementsByClassName('MathLib_fullscreen')[0].onclick = function () {
                        if (document.fullscreenElement) {
                            document.exitFullScreen();
                        } else {
                            that.container.requestFullScreen();
                        }
                    };
                }

                if (opts.contextMenu.grid) {
                    this.contextMenu.getElementsByClassName('MathLib_grid_type')[0].onchange = function () {
                        that.options.grid.type = 'cartesian';
                        that.draw();
                    };
                    this.contextMenu.getElementsByClassName('MathLib_grid_type')[1].onchange = function () {
                        that.options.grid.type = 'polar';
                        that.draw();
                    };
                    this.contextMenu.getElementsByClassName('MathLib_grid_type')[2].onchange = function () {
                        that.options.grid.type = false;
                        that.draw();
                    };
                }
            }

            fullscreenchange = function () {
                if (document.fullscreenElement) {
                    that.origWidth = that.width;
                    that.origHeight = that.height;
                    that.resize(window.outerWidth, window.outerHeight);
                } else {
                    that.resize(that.origWidth, that.origHeight);
                    delete that.origWidth;
                    delete that.origHeight;
                }
            };

            if ('onfullscreenchange' in this.container) {
                this.container.addEventListener('fullscreenchange', fullscreenchange);
            } else if ('onmozfullscreenchange' in this.container) {
                this.container.addEventListener('mozfullscreenchange', fullscreenchange);
            } else if ('onwebkitfullscreenchange' in this.container) {
                this.container.addEventListener('webkitfullscreenchange', fullscreenchange);
            }
        }
        /**
        * Handles the contextmenu event
        *
        * @param {event} evt The event object
        */
        Screen.prototype.oncontextmenu = function (evt) {
            var listener, _this = this, menu = this.contextMenu, overlay = this.contextMenuOverlay;

            if (evt.preventDefault) {
                evt.preventDefault();
            }
            evt.returnValue = false;

            menu.style.setProperty('top', (evt.clientY - 20) + 'px');
            menu.style.setProperty('left', evt.clientX + 'px');
            overlay.style.setProperty('display', 'block');

            listener = function () {
                overlay.style.setProperty('display', 'none');

                Array.prototype.forEach.call(_this.contextMenu.getElementsByClassName('MathLib_temporaryMenuItem'), function (x) {
                    _this.contextMenu.removeChild(x);
                });

                overlay.removeEventListener('click', listener);
            };

            overlay.addEventListener('click', listener);
        };
        return Screen;
    })();
    MathLib.Screen = Screen;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Screen2D
    /**
    * Layers for two dimensional plotting
    *
    * @class Layer
    * @this {Layer}
    */
    var Layer = (function () {
        function Layer(screen, id, zIndex) {
            var _this = this;
            this.screen = screen;
            this.id = id;
            this.zIndex = zIndex;

            this.stack = [];
            this.transformation = screen.transformation;

            var element;

            if (screen.options.renderer === 'Canvas') {
                // Create the canvas
                element = document.createElement('canvas');
                element.classList.add('MathLib_screen');
                element.width = screen.width;
                element.height = screen.height;
                screen.wrapper.appendChild(element);
                this.element = element;

                // Get the context and apply the transformations
                this.ctx = element.getContext('2d');
                this.applyTransformation = function () {
                    var m = _this.transformation;
                    _this.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
                };
                this.applyTransformation();

                // Set the drawing functions
                if (id === 'back') {
                    this.draw = function () {
                        var top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x;

                        // Draw the background
                        this.ctx.fillStyle = MathLib.colorConvert(screen.options.background);
                        this.ctx.fillRect(left, bottom, right - left, top - bottom);

                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                } else if (id === 'grid') {
                    this.ctx.strokeStyle = MathLib.colorConvert(screen.options.grid.color) || '#cccccc';
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

                    this.draw = function () {
                        //					_this.ctx.lineWidth = (screen.options.grid.lineWidth || 4) / (screen.scale.x - screen.scale.y);
                        _this.screen.drawGrid();
                    };
                } else if (id === 'axes') {
                    this.ctx.strokeStyle = MathLib.colorConvert(screen.options.axes.color) || '#000000';

                    this.draw = function () {
                        _this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);
                        _this.screen.drawAxes();
                    };
                } else {
                    this.ctx.strokeStyle = '#000000';
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

                    this.draw = function () {
                        _this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);

                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                }

                this.circle = MathLib.Canvas.circle;
                this.line = MathLib.Canvas.line;
                this.path = MathLib.Canvas.path;
                this.pixel = MathLib.Canvas.pixel;
                this.point = MathLib.Canvas.point;
                this.text = MathLib.Canvas.text;
            } else if (screen.options.renderer === 'SVG') {
                var ctx = document.createElementNS('http://www.w3.org/2000/svg', 'g'), m = screen.transformation;

                ctx.className.baseVal = 'MathLib_layer_' + id;
                ctx.setAttribute('transform', 'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')');
                screen.element.appendChild(ctx);
                this.ctx = ctx;

                // Set the drawing functions
                if (id === 'back') {
                    this.draw = function () {
                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                } else if (id === 'grid') {
                    ctx.setAttribute('stroke', MathLib.colorConvert(screen.options.grid.color) || '#cccccc');

                    this.draw = function () {
                        ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
                        _this.screen.drawGrid();
                    };
                } else if (id === 'axes') {
                    ctx.setAttribute('stroke', MathLib.colorConvert(screen.options.axes.color) || '#000000');

                    this.draw = function () {
                        ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
                        _this.screen.drawAxes();
                    };
                } else {
                    this.draw = function () {
                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                }

                this.circle = MathLib.SVG.circle;
                this.line = MathLib.SVG.line;
                this.path = MathLib.SVG.path;
                this.pixel = MathLib.SVG.pixel;
                this.point = MathLib.SVG.point;
                this.text = MathLib.SVG.text;
            }

            // Insert the layer into the layer array of the screen object.
            screen.layer.splice(zIndex, 0, this);
        }
        /**
        * Clears the Layer
        *
        * @return {Layer} Returns the current Layer
        */
        Layer.prototype.clear = function () {
            this.screen.renderer.clear(this);
            return this;
        };
        return Layer;
    })();
    MathLib.Layer = Layer;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import screen2d
    /**
    * The Canvas renderer for 2D plotting
    */
    MathLib.Canvas = {
        /**
        * Applies the current transformations to the screen
        */
        applyTransformation: function () {
            var m = this.transformation;
            this.layer.forEach(function (l) {
                l.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
            });
        },
        /**
        * Draws a circle on the screen.
        *
        * @param {Circle} circle The circle to be drawn
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        circle: function (circle, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, ctx = this.ctx, prop, opts;

            ctx.save();
            ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

            // Set the drawing options
            if (options) {
                opts = MathLib.Canvas.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        ctx[prop] = opts[prop];
                    }
                }

                if ('setLineDash' in ctx) {
                    ctx.setLineDash(('dash' in options ? options.dash : []));
                }
                if ('lineDashOffset' in ctx) {
                    ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
                }
            }

            // Draw the circle
            ctx.beginPath();
            ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            if (!redraw) {
                this.stack.push({
                    type: 'circle',
                    object: circle,
                    options: options
                });
            }

            return this;
        },
        /**
        * Clears a given Layer.
        *
        * @param {Layer} layer The layer to be cleared
        */
        clear: function (layer) {
            var screen = layer.screen, left = -screen.translation.x / screen.scale.x, top = -screen.translation.y / screen.scale.y, width = screen.width / screen.scale.x, height = screen.height / screen.scale.y;

            layer.ctx.clearRect(left, top, width, height);
        },
        /**
        * Converts the options to the Canvas options format
        *
        * @param {object} options The drawing options
        * @return {object} The converted options
        */
        convertOptions: function (options) {
            var convertedOptions = {};
            if ('fillColor' in options) {
                convertedOptions.fillStyle = MathLib.colorConvert(options.fillColor);
            } else if ('color' in options) {
                convertedOptions.fillStyle = MathLib.colorConvert(options.color);
            }

            if ('font' in options) {
                convertedOptions.font = options.font;
            }

            if ('fontSize' in options) {
                convertedOptions.fontSize = options.fontSize;
            }

            if ('lineColor' in options) {
                convertedOptions.strokeStyle = MathLib.colorConvert(options.lineColor);
            } else if ('color' in options) {
                convertedOptions.strokeStyle = MathLib.colorConvert(options.color);
            }

            return convertedOptions;
        },
        /**
        * Draws a line on the screen.
        *
        * @param {Line} line The line to be drawn
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        line: function (line, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, points, ctx = this.ctx, prop, opts;

            ctx.save();
            ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

            // Don't try to draw the line at infinity
            if (line.type === 'line' && MathLib.isZero(line[0]) && MathLib.isZero(line[1])) {
                return this;
            } else {
                points = this.screen.getLineEndPoints(line);
            }

            // Set the drawing options
            if (options) {
                opts = MathLib.Canvas.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        ctx[prop] = opts[prop];
                    }
                }

                if ('setLineDash' in ctx) {
                    ctx.setLineDash(('dash' in options ? options.dash : []));
                }
                if ('lineDashOffset' in ctx) {
                    ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
                }
            }

            // Draw the line
            ctx.beginPath();
            ctx.moveTo(points[0][0], points[0][1]);
            ctx.lineTo(points[1][0], points[1][1]);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            if (!redraw) {
                this.stack.push({
                    type: 'line',
                    object: line,
                    options: options
                });
            }

            return this;
        },
        /**
        * Draws a path on the screen.
        *
        * @param {Path} curve The path to be drawn
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the scren
        */
        path: function (curve, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, ctx = this.ctx, prop, opts, path, paths = [], x, y, i, fx, fxold, step = 2 / (screen.scale.x - screen.scale.y), from, to;

            ctx.save();
            ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

            // Set the drawing options
            if (options) {
                opts = MathLib.Canvas.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        ctx[prop] = opts[prop];
                    }
                }

                if ('setLineDash' in ctx) {
                    ctx.setLineDash(('dash' in options ? options.dash : []));
                }
                if ('lineDashOffset' in ctx) {
                    ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
                }
            }

            // If curve is a function f, the path will be (x, f(x))
            if (typeof curve === 'function') {
                path = [];
                from = ('from' in options ? options.from : (-screen.translation.x) / screen.scale.x) - step;
                to = ('to' in options ? options.to : (screen.width - screen.translation.x) / screen.scale.x) + step;

                for (i = from; i <= to; i += step) {
                    fx = curve(i);

                    // Inline NaN test and disontinuity test
                    // Check if we are drawing a (nearly) vertical line, which should not be there.
                    // i.e the vertical lines at π/2 for the tangent function
                    // TODO: Find a better check if there is a discontinuity.
                    if (fx !== fx || (MathLib.abs((fxold - fx) / step) >= 1e2 && (fx - curve(i - step / 2)) * (fxold - curve(i - step / 2)) >= 0)) {
                        // Don't add empty subpaths
                        if (path.length) {
                            paths.push(path);
                            path = [];
                        }
                    } else {
                        path.push([i, fx]);
                    }

                    fxold = fx;
                }
                if (path.length) {
                    paths.push(path);
                }
            } else if (typeof curve[0] === 'function') {
                path = [];
                x = curve[0];
                y = curve[1];
                from = ('from' in options ? options.from : 0) - step;
                to = ('to' in options ? options.to : 2 * Math.PI) + step;
                for (i = from; i <= to; i += step) {
                    path.push([x(i), y(i)]);
                }
                paths.push(path);
            } else {
                path = curve;
            }

            // Draw the path
            // Till now I haven't found a way to stroke and fill the path in one go.
            // The problem is basically, that moveTo creates a new subpath
            // and every subpath is filled on its own.
            if (options.fillColor || options.fillColor !== 'transparent') {
                ctx.beginPath();
                ctx.lineTo(from, 0);
                paths.forEach(function (path) {
                    // The following line (and the line four lines afterwards) fixes the fill at holes in the path.
                    ctx.lineTo(path[0][0], 0);
                    path.forEach(function (x) {
                        ctx.lineTo(x[0], x[1]);
                    });
                    ctx.lineTo(path[path.length - 1][0], 0);
                });
                ctx.fill();
                //		ctx.closePath();
            }

            if (options.lineColor || options.lineColor !== 'transparent') {
                ctx.beginPath();
                paths.forEach(function (path) {
                    ctx.moveTo(path[0][0], path[0][1]);
                    path.forEach(function (x) {
                        ctx.lineTo(x[0], x[1]);
                    });
                });
                ctx.stroke();
                //		ctx.closePath();
            }

            ctx.restore();

            if (!redraw) {
                if (options.conic) {
                    this.stack.push({
                        type: 'conic',
                        object: options.conic,
                        options: options
                    });
                } else {
                    this.stack.push({
                        type: 'path',
                        object: curve,
                        options: options
                    });
                }
            }

            return this;
        },
        /**
        * Draws pixel on the screen.
        *
        * @param {function} f The pixel function
        * @param {number} t The top coordinate of the draw rectangle
        * @param {number} r The right coordinate of the draw rectangle
        * @param {number} b The bottom coordinate of the draw rectangle
        * @param {number} l The left coordinate of the draw rectangle
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        pixel: function (f, t, r, b, l, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x, ctx = this.ctx, x, y, i;

            t = Math.min(top, t);
            r = Math.min(right, r);
            b = Math.max(bottom, b);
            l = Math.max(left, l);

            var tPxl = Math.floor(-t * screen.scale.y), rPxl = Math.floor(r * screen.scale.x), bPxl = Math.floor(-b * screen.scale.y), lPxl = Math.floor(l * screen.scale.x), w = (rPxl - lPxl), h = (bPxl - tPxl), imgData = ctx.createImageData(w, h), pxl;

            for (y = tPxl, i = 0; y > bPxl; y--) {
                for (x = lPxl; x < rPxl; x++, i++) {
                    pxl = f(x / screen.scale.x, y / screen.scale.y);
                    imgData.data[4 * i] = pxl[0];
                    imgData.data[4 * i + 1] = pxl[1];
                    imgData.data[4 * i + 2] = pxl[2];
                    imgData.data[4 * i + 3] = pxl[3];
                }
            }

            ctx.putImageData(imgData, (left - l) * screen.scale.x, (t - top) * screen.scale.y);

            if (!redraw) {
                this.stack.push({
                    type: 'pixel',
                    object: f,
                    t: t,
                    r: r,
                    b: b,
                    l: l,
                    options: options
                });
            }

            return this;
        },
        /**
        * Draws a point on the screen.
        *
        * @param {Point} point The point to be drawn
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        point: function (point, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, ctx = this.ctx, prop, opts, dist;

            ctx.save();
            ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

            // Set the drawing options
            if (options) {
                opts = MathLib.Canvas.convertOptions(options);

                if (!('fillColor' in options) && !('color' in options)) {
                    opts.fillStyle = 'black';
                }

                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        ctx[prop] = opts[prop];
                    }
                }

                if ('setLineDash' in ctx) {
                    ctx.setLineDash(('dash' in options ? options.dash : []));
                }
                if ('lineDashOffset' in ctx) {
                    ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
                }
            }

            // Draw the point
            ctx.beginPath();
            ctx.arc(point[0] / point[2], point[1] / point[2], (options.size || 10) / (screen.scale.x - screen.scale.y), 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            if (options.label) {
                dist = 1.75 * (options.size || 10) + 0.75 * (options.lineWidth || 4);
                screen.text(options.label, point[0] / point[2] + dist / (screen.scale.x - screen.scale.y), point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
            }

            if (!redraw) {
                this.stack.push({
                    type: 'point',
                    object: point,
                    options: options
                });
            }

            return this;
        },
        /**
        * Writes text on the screen.
        *
        * @param {string} str The string to be drawn
        * @param {number} x The x coordinate
        * @param {number} y The y coordinate
        * @param {object} options Optional drawing options
        * @return {Screen} Returns the screen
        */
        text: function (str, x, y, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var defaults = {
                font: 'Helvetica',
                fontSize: 12,
                //				lineWidth:  0.05,
                textColor: 'rgba(0, 0, 0, 1)'
            }, ctx, prop, opts;

            ctx = this.ctx;

            opts = MathLib.Canvas.convertOptions(MathLib.extendObject(defaults, options));

            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    ctx[prop] = opts[prop];
                }
            }

            ctx.fillStyle = MathLib.colorConvert(options.textColor || options.color || defaults.textColor);
            ctx.strokeStyle = MathLib.colorConvert(options.textColor || options.color || defaults.textColor);

            ctx.font = opts.fontSize + 'px ' + opts.font;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            var tf = this.screen.transformation;

            ctx.save();
            ctx.transform(1 / tf[0][0], 0, 0, 1 / tf[1][1], 0, 0);
            ctx.fillText(str, tf[0][0] * x, tf[1][1] * y);
            ctx.restore();

            if (!redraw) {
                this.stack.push({
                    type: 'text',
                    object: str,
                    x: x,
                    y: y,
                    options: options
                });
            }

            return this;
        }
    };
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import screen2D
    /**
    * The SVG renderer for 2D plotting
    */
    MathLib.SVG = {
        /**
        * Applies the current transformations to the screen
        */
        applyTransformation: function () {
            var m = this.transformation;
            this.layer.forEach(function (l) {
                l.ctx.setAttribute('transform', 'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')');
            });
        },
        /**
        * Draws a circle on the screen.
        *
        * @param {Circle} circle The circle to be drawn
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        circle: function (circle, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, prop, opts, svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            svgCircle.setAttribute('cx', circle.center[0]);
            svgCircle.setAttribute('cy', circle.center[1]);
            svgCircle.setAttribute('r', circle.radius);

            if (options) {
                svgCircle.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
                opts = MathLib.SVG.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        svgCircle.setAttribute(prop, opts[prop]);
                    }
                }
            }

            this.ctx.appendChild(svgCircle);

            if (!redraw) {
                this.stack.push({
                    type: 'circle',
                    object: circle,
                    options: options
                });
            }

            return this;
        },
        /**
        * Clears a given Layer.
        *
        * @param {Layer} layer The layer to be cleared
        */
        clear: function (layer) {
            layer.ctx.textContent = '';
        },
        /**
        * Converts the options to the SVG options format
        *
        * @param {object} options The drawing options
        * @return {object} The converted options
        */
        convertOptions: function (options) {
            var convertedOptions = {};
            if ('fillColor' in options) {
                convertedOptions.fill = MathLib.colorConvert(options.fillColor);
            } else if ('color' in options) {
                convertedOptions.fill = MathLib.colorConvert(options.color);
            }

            if ('font' in options) {
                convertedOptions.font = options.font;
            }

            if ('fontSize' in options) {
                convertedOptions.fontSize = options.fontSize;
            }

            if ('lineColor' in options) {
                convertedOptions.stroke = MathLib.colorConvert(options.lineColor);
            } else if ('color' in options) {
                convertedOptions.stroke = MathLib.colorConvert(options.color);
            }

            if ('dash' in options && options.dash.length !== 0) {
                convertedOptions['stroke-dasharray'] = options.dash;
            }

            if ('dashOffset' in options && options.dashOffset !== 0) {
                convertedOptions['stroke-dashoffset'] = options.dashOffset;
            }

            return convertedOptions;
        },
        /**
        * Draws a line on the screen.
        *
        * @param {Line} line The line to be drawn
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Canvas} Returns the screen
        */
        line: function (line, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, points, prop, opts, svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

            // Don't try to draw the line at infinity
            if (line.type === 'line' && MathLib.isZero(line[0]) && MathLib.isZero(line[1])) {
                return this;
            } else {
                points = this.screen.getLineEndPoints(line);
            }

            svgLine.setAttribute('x1', points[0][0]);
            svgLine.setAttribute('y1', points[0][1]);
            svgLine.setAttribute('x2', points[1][0]);
            svgLine.setAttribute('y2', points[1][1]);

            if (options) {
                svgLine.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
                opts = MathLib.SVG.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        svgLine.setAttribute(prop, opts[prop]);
                    }
                }
            }

            this.ctx.appendChild(svgLine);

            if (!redraw) {
                this.stack.push({
                    type: 'line',
                    object: line,
                    options: options
                });
            }

            return this;
        },
        /**
        * Draws a path on the screen.
        *
        * @param {any} curve The path to be drawn
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        path: function (curve, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, svgPathStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path'), svgPathFill = document.createElementNS('http://www.w3.org/2000/svg', 'path'), step = 2 / (screen.scale.x - screen.scale.y), pathStringFill, pathStringStroke, from, to, prop, opts, x, y, i, path, paths = [], fx, fxold;

            // If curve is a function f, the path will be (x, f(x))
            if (typeof curve === 'function') {
                path = [];
                from = ('from' in options ? options.from : -screen.translation.x / screen.scale.x) - step;
                to = ('to' in options ? options.to : (screen.width - screen.translation.x) / screen.scale.x) + step;
                for (i = from; i <= to; i += step) {
                    fx = curve(i);

                    // Inline NaN test and disontinuity test
                    // For more info see the corresponding function for canvas
                    if (fx !== fx || (MathLib.abs((fxold - fx) / step) >= 1e2 && (fx - curve(i - step / 2)) * (fxold - curve(i - step / 2)) >= 0)) {
                        // Don't add empty subpaths
                        if (path.length) {
                            paths.push(path);
                            path = [];
                        }
                    } else {
                        path.push([i, fx]);
                    }

                    fxold = fx;
                }
                if (path.length) {
                    paths.push(path);
                }
            } else if (typeof curve[0] === 'function') {
                path = [];
                x = curve[0];
                y = curve[1];
                from = ('from' in options ? options.from : 0) - step;
                to = ('to' in options ? options.to : 2 * Math.PI) + step;
                for (i = from; i <= to; i += step) {
                    path.push([x(i), y(i)]);
                }
                paths.push(path);
            } else {
                path = curve;
            }

            pathStringFill = 'M' + from + ' 0 ' + paths.reduce(function (previ, path) {
                return previ + ' L ' + path[0][0] + ' 0 ' + path.reduce(function (prev, cur) {
                    return prev + ' L ' + cur.join(' ');
                }, '') + ' L ' + path[path.length - 1][0] + ' 0 ';
            }, '');

            pathStringStroke = paths.reduce(function (previ, path) {
                return previ + ' M ' + path[0].join(' ') + path.reduce(function (prev, cur) {
                    return prev + ' L ' + cur.join(' ');
                }, '');
            }, '');

            if (pathStringFill !== '') {
                svgPathFill.setAttribute('d', pathStringFill);
            }
            if (pathStringStroke) {
                svgPathStroke.setAttribute('d', pathStringStroke);
            }

            svgPathStroke.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');

            if (options) {
                opts = MathLib.SVG.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        svgPathFill.setAttribute(prop, opts[prop]);
                        svgPathStroke.setAttribute(prop, opts[prop]);
                    }
                }
            }

            svgPathFill.setAttribute('stroke', 'transparent');
            svgPathStroke.setAttribute('fill', 'transparent');

            this.ctx.appendChild(svgPathFill);
            this.ctx.appendChild(svgPathStroke);

            if (!redraw) {
                if (options.conic) {
                    this.stack.push({
                        type: 'conic',
                        object: options.conic,
                        options: options
                    });
                } else {
                    this.stack.push({
                        type: 'path',
                        object: curve,
                        options: options
                    });
                }
            }

            return this;
        },
        /**
        * Draws pixel on the screen.
        *
        * @param {function} f The pixel function
        * @param {number} t The top coordinate of the draw rectangle
        * @param {number} r The right coordinate of the draw rectangle
        * @param {number} b The bottom coordinate of the draw rectangle
        * @param {number} l The left coordinate of the draw rectangle
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        pixel: function (f, t, r, b, l, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x, canvas = document.createElement('canvas'), canvasCtx = canvas.getContext('2d'), svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image'), svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g'), x, y, i, pxl, m = screen.transformation;

            canvas.width = screen.width;
            canvas.height = screen.height;
            canvasCtx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);

            svgContainer.setAttribute('transform', 'matrix(' + 1 / m[0][0] + ', 0, 0, ' + 1 / m[1][1] + ', -' + m[0][2] / m[0][0] + ', ' + -m[1][2] / m[1][1] + ')');
            svgImage.setAttribute('width', screen.width + 'px');
            svgImage.setAttribute('height', screen.height + 'px');
            svgImage.setAttribute('x', '0');
            svgImage.setAttribute('y', '0');

            t = Math.min(top, t);
            r = Math.min(right, r);
            b = Math.max(bottom, b);
            l = Math.max(left, l);

            var tPxl = Math.floor(-t * screen.scale.y), rPxl = Math.floor(r * screen.scale.x), bPxl = Math.floor(-b * screen.scale.y), lPxl = Math.floor(l * screen.scale.x), w = (rPxl - lPxl), h = (tPxl - bPxl), imgData = canvasCtx.createImageData(w, h);

            for (y = tPxl, i = 0; y > bPxl; y--) {
                for (x = lPxl; x < rPxl; x++, i++) {
                    pxl = f(x / screen.scale.x, y / screen.scale.y);
                    imgData.data[4 * i] = pxl[0];
                    imgData.data[4 * i + 1] = pxl[1];
                    imgData.data[4 * i + 2] = pxl[2];
                    imgData.data[4 * i + 3] = pxl[3];
                }
            }

            canvasCtx.putImageData(imgData, 0, 0);

            svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', canvas.toDataURL());

            svgContainer.appendChild(svgImage);
            this.ctx.appendChild(svgContainer);

            if (!redraw) {
                this.stack.push({
                    type: 'pixel',
                    object: f,
                    t: t,
                    r: r,
                    b: b,
                    l: l,
                    options: options
                });
            }

            return this;
        },
        /**
        * Draws a point on the screen.
        *
        * @param {Point} point The point to be drawn
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        point: function (point, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, prop, opts, dist, svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            svgPoint.setAttribute('cx', point[0] / point[2] + '');
            svgPoint.setAttribute('cy', point[1] / point[2] + '');
            svgPoint.setAttribute('r', (options.size || 10) / (screen.scale.x - screen.scale.y) + '');

            if (options) {
                svgPoint.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
                opts = MathLib.SVG.convertOptions(options);

                if (!('fillOpacity' in options)) {
                    opts['fill-opacity'] = '1';
                }

                if (!('fillColor' in options) && !('color' in options)) {
                    opts.fill = 'black';
                }

                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        svgPoint.setAttribute(prop, opts[prop]);
                    }
                }
            }

            if (options.moveable) {
                svgPoint.setAttribute('cursor', 'move');

                // mousedown
                svgPoint.addEventListener('mousedown', function () {
                    screen.options.interaction.type = 'move';
                    var invTransformation = screen.transformation.inverse();

                    var move = function (evt) {
                        evt.stopPropagation();

                        var evtPoint = invTransformation.times(screen.getEventPoint(evt));
                        point[0] = evtPoint[0];
                        point[1] = evtPoint[1];
                        screen.draw();
                    }, up = function () {
                        screen.options.interaction.type = '';

                        document.body.removeEventListener('mousemove', move);
                        document.body.removeEventListener('mouseup', up);
                    };

                    // mousemove
                    document.body.addEventListener('mousemove', move);

                    // mouseup
                    document.body.addEventListener('mouseup', up);
                });
            }

            this.ctx.appendChild(svgPoint);

            if (options.label) {
                dist = 1.75 * (options.size || 10) + 0.75 * (options.lineWidth || 4);
                screen.text(options.label, point[0] / point[2] + dist / (screen.scale.x - screen.scale.y), point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
            }

            svgPoint.addEventListener('contextmenu', function () {
                screen.options.interaction.type = 'contextmenu';
                var x = svgPoint.cx.baseVal.value, y = svgPoint.cy.baseVal.value;

                screen.contextMenu.innerHTML = '<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_is_disabled MathLib_is_centered">Point</div>' + '<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Coordinates' + '<menu class="MathLib_menu MathLib_submenu">' + '<div class="MathLib_menuItem">cartesian: <span class="MathLib_is_selectable MathLib_is_right">(' + x.toFixed(3) + ', ' + y.toFixed(3) + ')</span></div>' + '<div class="MathLib_menuItem">polar: <span class="MathLib_is_selectable MathLib_is_right">(' + MathLib.hypot(x, y).toFixed(3) + ', ' + Math.atan2(y, x).toFixed(3) + ')</span></div>' + '</menu>' + '</div>' + '<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Options' + '<menu class="MathLib_menu MathLib_submenu">' + '<div class="MathLib_menuItem">Moveable:' + '<input type="checkbox" class="MathLib_is_right">' + '</div>' + '<div class="MathLib_menuItem">Size:' + '<input type="spinner" class="MathLib_is_right">' + '</div>' + '<div class="MathLib_menuItem">Fill color:' + '<input type="color" class="MathLib_is_right">' + '</div>' + '<div class="MathLib_menuItem">Line color:' + '<input type="color" class="MathLib_is_right">' + '</div>' + '</menu>' + '</div>' + '<hr class="MathLib_separator MathLib_temporaryMenuItem">' + screen.contextMenu.innerHTML;
            });

            if (!redraw) {
                this.stack.push({
                    type: 'point',
                    object: point,
                    options: options
                });
            }

            return this;
        },
        /**
        * Writes text on the screen.
        *
        * @param {string} str The string to be drawn
        * @param {number} x The x coordinate
        * @param {number} y The y coordinate
        * @param {object} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        text: function (str, x, y, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var defaults = {
                font: 'Helvetica',
                fontSize: 12,
                //				lineWidth:  0.05,
                textColor: 'rgba(0, 0, 0, 1)'
            }, opts, screen = this.screen, svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'), svgTspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

            opts = MathLib.SVG.convertOptions(MathLib.extendObject(defaults, options));

            svgTspan.textContent = str;
            svgTspan.setAttribute('x', x * screen.scale.x + '');
            svgTspan.setAttribute('y', y * screen.scale.y + '');
            svgText.setAttribute('transform', 'matrix(' + 1 / screen.scale.x + ', 0, 0, ' + 1 / screen.scale.y + ', 0, 0)');
            svgText.setAttribute('font-family', opts.font);
            svgText.setAttribute('font-size', opts.fontSize);
            svgText.setAttribute('fill', MathLib.colorConvert(options.textColor || options.color) || defaults.textColor);
            svgText.setAttribute('fill-opacity', '1');
            svgText.setAttribute('stroke', MathLib.colorConvert(options.textColor || options.color) || defaults.textColor);
            svgText.setAttribute('text-anchor', 'middle');

            // alignment-baseline isn't defined for text elements,
            // only for ‘tspan’, ‘tref’, ‘altGlyph’, ‘textPath’ elements.
            // see the [Specification](http://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty)
            // But it works for text elements, so we don't need an additional tspan element.
            svgTspan.setAttribute('alignment-baseline', 'middle');

            svgText.appendChild(svgTspan);
            this.ctx.appendChild(svgText);

            if (!redraw) {
                this.stack.push({
                    type: 'text',
                    object: str,
                    x: x,
                    y: y,
                    options: options
                });
            }

            return this;
        }
    };
})(MathLib || (MathLib = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) {
        d[p] = b[p];
      }
    }
    function __() {
      this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Screen
    /**
    * Two dimensional plotting
    *
    * @class
    * @augments Screen
    * @this {Screen2D}
    */
    var Screen2D = (function (_super) {
        __extends(Screen2D, _super);
        function Screen2D(id, options) {
            if (typeof options === "undefined") { options = {}; }
            var _this = this;
            _super.call(this, id, options);
            this.type = 'screen2D';
            var defaults = {
                axes: {
                    color: 0x000000,
                    lineColor: 0x000000,
                    textColor: 0x000000,
                    /*						label: true
                    label: false
                    label: {
                    x: true,
                    y: false
                    }
                    */
                    label: {
                        fontSize: 12,
                        font: 'Helvetica',
                        x: true,
                        y: true
                    },
                    x: true,
                    y: true
                },
                grid: {
                    // angle: Math.PI / 8,
                    type: 'cartesian',
                    lineColor: 0xcccccc,
                    lineWidth: 4,
                    dash: [],
                    dashOffset: 0,
                    //tick: {x: 1, y: 1, r: 1}
                    x: { tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 },
                    y: { tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 },
                    r: { tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 },
                    angle: { tick: Math.PI / 8, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 }
                },
                interaction: {
                    allowPan: true,
                    allowZoom: true,
                    zoomSpeed: 1
                },
                background: 0xffffff,
                lookAt: { x: 0, y: 0 },
                range: { x: 1, y: 1 },
                figcaption: '',
                renderer: 'Canvas',
                transformation: new MathLib.Matrix([
                    [Math.min(this.height, this.width) / 2, 0, this.width / 2],
                    [0, -Math.min(this.height, this.width) / 2, this.height / 2],
                    [0, 0, 1]])
            }, opts = MathLib.extendObject(defaults, options), element, transformation = opts.transformation, that = this;

            this.options = opts;
            this.renderer = MathLib[opts.renderer];

            this.circle = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.circle.apply(_this.layer.main, args);
            };
            this.line = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.line.apply(_this.layer.main, args);
            };
            this.path = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.path.apply(_this.layer.main, args);
            };

            // Should the pixel method default to the main layer or to the back layer?
            this.pixel = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.pixel.apply(_this.layer.main, args);
            };
            this.point = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.point.apply(_this.layer.main, args);
            };
            this.text = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.text.apply(_this.layer.main, args);
            };

            // Remove the warning message.
            this.wrapper.innerHTML = '';

            this.container.classList.add('MathLib_screen2D');

            // This is just a dummy method for the following few lines.
            // The real applyTransformation method is specified after the creation of the layers.
            this.applyTransformation = function () {
            };

            // The interaction methods
            this.translation = {};
            this.scale = {};
            this.transformation = transformation;

            Object.defineProperty(this.translation, 'x', {
                get: function () {
                    return that.transformation[0][2];
                },
                set: function (x) {
                    that.transformation[0][2] = x;
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.translation, 'y', {
                get: function () {
                    return that.transformation[1][2];
                },
                set: function (y) {
                    that.transformation[1][2] = y;
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.scale, 'x', {
                get: function () {
                    return that.transformation[0][0];
                },
                set: function (x) {
                    that.transformation[0][0] = x;
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.scale, 'y', {
                get: function () {
                    return that.transformation[1][1];
                },
                set: function (y) {
                    that.transformation[1][1] = y;
                    that.applyTransformation();
                }
            });

            this.lookAt = {};
            this.range = {};
            Object.defineProperty(this.lookAt, 'x', {
                get: function () {
                    return (that.width / 2 - that.transformation[0][2]) / that.transformation[0][0];
                },
                set: function (x) {
                    that.transformation[0][2] = that.width / 2 - x * that.transformation[0][0];
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.lookAt, 'y', {
                get: function () {
                    return (that.height / 2 - that.transformation[1][2]) / that.transformation[1][1];
                },
                set: function (y) {
                    that.transformation[1][2] = that.height / 2 - y * that.transformation[1][1];
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.range, 'x', {
                get: function () {
                    return that.width / (2 * that.transformation[0][0]);
                },
                set: function (x) {
                    that.transformation[0][0] = 0.5 * that.width / x;
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.range, 'y', {
                get: function () {
                    return -that.height / (2 * that.transformation[1][1]);
                },
                set: function (y) {
                    that.transformation[1][1] = -0.5 * that.height / y;
                    that.applyTransformation();
                }
            });

            this.range.x = opts.range.x;
            this.range.y = opts.range.y;
            this.lookAt.x = opts.lookAt.x;
            this.lookAt.y = opts.lookAt.y;

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
                element.setAttribute('fill', 'transparent');

                this.element = element;
                this.wrapper.appendChild(element);

                //			if ('background' in options) {
                var background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

                background.setAttribute('x', '0px');
                background.setAttribute('y', '0px');
                background.setAttribute('width', this.width + 'px');
                background.setAttribute('height', this.height + 'px');
                background.setAttribute('stroke', 'transparent');
                background.setAttribute('fill', 'background' in options ? MathLib.colorConvert(options.background) : 'white');
                background.setAttribute('fill-opacity', '1');
                this.element.appendChild(background);
                //			}
            }

            // Create the Layers
            // =================
            this.layer = [];
            this.layer.back = new MathLib.Layer(this, 'back', 0);
            this.layer.grid = new MathLib.Layer(this, 'grid', 1);
            this.layer.axes = new MathLib.Layer(this, 'axes', 2);
            this.layer.main = new MathLib.Layer(this, 'main', 3);

            this.wrapper.addEventListener('mouseup', function (evt) {
                return _this.onmouseup(evt);
            }, false);
            this.wrapper.addEventListener('mousedown', function (evt) {
                return _this.onmousedown(evt);
            }, false);
            this.wrapper.addEventListener('mousemove', function (evt) {
                return _this.onmousemove(evt);
            }, false);
            this.wrapper.addEventListener('mousewheel', function (evt) {
                return _this.onmousewheel(evt);
            }, false);

            // For Firefox: [Bug report for the missing onmousewheel method](https://bugzilla.mozilla.org/show_bug.cgi?id=111647)
            this.wrapper.addEventListener('DOMMouseScroll', function (evt) {
                return _this.onmousewheel(evt);
            }, false);

            this.applyTransformation = this.renderer.applyTransformation;

            this.draw = function (x, options) {
                if (typeof options === "undefined") { options = {}; }
                var _this = this;
                // Clear and redraw the screen
                if (arguments.length === 0) {
                    this.layer.forEach(function (l) {
                        l.clear().draw();
                    });
                } else if (x.type === 'circle') {
                    this.circle(x, options);
                } else if (x.type === 'line') {
                    this.line(x, options);
                } else if (Array.isArray(x)) {
                    x.forEach(function (y) {
                        return _this[y.type](y, options);
                    });
                }
            };

            if (this.options.contextMenu) {
                var gridType = opts.grid.type ? opts.grid.type : 'none';
                this.contextMenu.querySelectorAll('.MathLib_grid_type[value=' + gridType + ']')[0].checked = true;
            }

            this.draw();
        }
        /**
        * Draws the axes.
        *
        * @return {Screen2D}
        */
        Screen2D.prototype.drawAxes = function () {
            var _this = this;
            var line = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.line.apply(_this.layer.axes, args);
            }, text = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.text.apply(_this.layer.axes, args);
            }, options = {
                lineColor: MathLib.colorConvert(this.options.axes.color),
                'stroke-width': -1 / this.transformation[1][1]
            }, textOptions = {
                font: this.options.axes && 'label' in this.options.axes ? this.options.axes.label.font : '',
                fontSize: this.options.axes && 'label' in this.options.axes ? this.options.axes.label.fontSize : '',
                //				fontSize: this.options.axes.label.fontSize,
                strokeStyle: MathLib.colorConvert(this.options.axes.textColor),
                fillStyle: MathLib.colorConvert(this.options.axes.textColor)
            }, top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, lengthX = 10 / this.transformation[0][0], lengthY = -10 / this.transformation[1][1], yExp = 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3), xExp = 1 - Math.floor(Math.log(this.transformation[0][0]) / Math.LN10 - 0.3), yTick = Math.pow(10, yExp), xTick = Math.pow(10, xExp), i;

            if (!this.options.axes) {
                return this;
            }

            // The axes
            if (this.options.axes.x) {
                line([[left, 0], [right, 0]], options, true);
            }
            if (this.options.axes.y) {
                line([[0, bottom], [0, top]], options, true);
            }

            // The ticks on the axes
            // The x axis
            if (this.options.axes.x) {
                for (i = -yTick; i >= left; i -= yTick) {
                    line([[i, -lengthY], [i, lengthY]], options, true);
                }
                for (i = yTick; i <= right; i += yTick) {
                    line([[i, -lengthY], [i, lengthY]], options, true);
                }
            }

            // The y axis
            if (this.options.axes.y) {
                for (i = -xTick; i >= bottom; i -= xTick) {
                    line([[-lengthX, i], [lengthX, i]], options, true);
                }
                for (i = xTick; i <= top; i += xTick) {
                    line([[-lengthX, i], [lengthX, i]], options, true);
                }
            }

            // The labels
            // The x axes
            // .toFixed() is necessary to display 0.3 as "0.3" and not as "0.30000000000000004".
            // .toFixed expects arguments between 0 and 20.
            var xLen = Math.max(0, Math.min(20, -xExp)), yLen = Math.max(0, Math.min(20, -yExp));

            if (this.options.axes.label) {
                if (this.options.axes.x) {
                    for (i = -yTick; i >= left; i -= yTick) {
                        text(i.toFixed(yLen), i, -2 * lengthY, textOptions, true);
                    }
                    for (i = yTick; i <= right; i += yTick) {
                        text(i.toFixed(yLen), i, -2 * lengthY, textOptions, true);
                    }
                }

                // The y axes
                if (this.options.axes.y) {
                    for (i = -xTick; i >= bottom; i -= xTick) {
                        text(i.toFixed(xLen), -2 * lengthX, i, textOptions, true);
                    }
                    for (i = xTick; i <= top; i += xTick) {
                        text(i.toFixed(xLen), -2 * lengthX, i, textOptions, true);
                    }
                } else {
                    text(0..toFixed(yLen), 0, -2 * lengthY, textOptions, true);
                }
            }

            return this;
        };

        /**
        * Draws the grid.
        *
        * @return {Screen2D}
        */
        Screen2D.prototype.drawGrid = function () {
            var _this = this;
            if (!this.options.grid) {
                return this;
            }

            var i, ii, line = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.line.apply(_this.layer.grid, args);
            }, circle = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.circle.apply(_this.layer.grid, args);
            }, top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, yTick = Math.pow(10, 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3)), xTick = Math.pow(10, 1 - Math.floor(Math.log(this.transformation[0][0]) / Math.LN10 - 0.3));

            if (this.options.grid.type === 'cartesian') {
                // The vertical lines
                if (this.options.grid.x) {
                    for (i = left - (left % xTick); i <= right; i += xTick) {
                        line([[i, bottom], [i, top]], MathLib.extendObject(this.options.grid, this.options.grid.x), true);
                    }
                }

                // The horizontal lines
                if (this.options.grid.y) {
                    for (i = bottom - (bottom % yTick); i <= top; i += yTick) {
                        line([[left, i], [right, i]], MathLib.extendObject(this.options.grid, this.options.grid.y), true);
                    }
                }
                // Test for logarithmic plots
                /*for (i = left - (left % this.axes.tick.x); i <= right; i += this.axes.tick.x) {
                for (var j = 1; j <= 10; j++ ) {
                this.line([[i * Math.log(10) + Math.log(j), bottom], [i * Math.log(10) + Math.log(j), top]], options);
                }
                }*/
            } else if (this.options.grid.type === 'polar') {
                var max = Math.sqrt(Math.max(top * top, bottom * bottom) + Math.max(left * left, right * right)), min = 0;

                if (this.options.grid.angle) {
                    for (i = 0, ii = 2 * Math.PI; i < ii; i += this.options.grid.angle.tick) {
                        line([[0, 0], [max * Math.cos(i), max * Math.sin(i)]], MathLib.extendObject(this.options.grid, this.options.grid.angle), true);
                    }
                }

                if (this.options.grid.r) {
                    for (i = min; i <= max; i += Math.min(xTick, yTick)) {
                        circle(new MathLib.Circle([0, 0, 1], i), MathLib.extendObject(this.options.grid, this.options.grid.r), true);
                    }
                }
            }

            return this;
        };

        /**
        * Creates a point based on the coordinates of an event.
        *
        * @param {event} evt The event object
        * @return {Point}
        */
        Screen2D.prototype.getEventPoint = function (evt) {
            var x, y;
            if (evt.offsetX) {
                x = evt.offsetX;
                y = evt.offsetY;
            } else {
                x = evt.layerX;
                y = evt.layerY;
            }
            return new MathLib.Point([x, y, 1]);
        };

        /**
        * Calculates the both endpoints for the line
        * for drawing purposes
        *
        * @param {Line|array} l The Line to calculate the end points to
        * @return {array} The array has the format [[x1, y1], [x2, y2]]
        */
        Screen2D.prototype.getLineEndPoints = function (l) {
            if (l.type === 'line') {
                var top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, lineRight = -(l[2] + l[0] * right) / l[1], lineTop = -(l[2] + l[1] * top) / l[0], lineLeft = -(l[2] + l[0] * left) / l[1], lineBottom = -(l[2] + l[1] * bottom) / l[0], points = [];

                if (lineRight <= top && lineRight >= bottom) {
                    points.push([right, lineRight]);
                }
                if (lineLeft <= top && lineLeft >= bottom) {
                    points.push([left, lineLeft]);
                }
                if (lineTop < right && lineTop > left) {
                    points.push([lineTop, top]);
                }
                if (lineBottom < right && lineBottom > left) {
                    points.push([lineBottom, bottom]);
                }
                return points;
            } else {
                return l;
            }
        };

        /**
        * Handles the mousedown event
        *
        * @param {event} evt The event object
        */
        Screen2D.prototype.onmousedown = function (evt) {
            // Only start the action if the left mouse button was clicked
            if (evt.button !== 0) {
                return;
            }

            if (evt.preventDefault) {
                evt.preventDefault();
            }

            evt.returnValue = false;

            // Pan mode
            if (this.options.interaction.allowPan && !this.options.interaction.type) {
                this.options.interaction.type = 'pan';
                this.options.interaction.startPoint = this.getEventPoint(evt);
                this.options.interaction.startTransformation = this.transformation.copy();
            }
        };

        /**
        * Handles the mousemove event
        *
        * @param {event} evt The event object
        */
        Screen2D.prototype.onmousemove = function (evt) {
            var p;

            if (evt.preventDefault) {
                evt.preventDefault();
            }

            evt.returnValue = false;

            // Pan mode
            if (this.options.interaction.type === 'pan') {
                p = this.getEventPoint(evt).minus(this.options.interaction.startPoint);
                this.translation.x = this.options.interaction.startTransformation[0][2] + p[0];
                this.translation.y = this.options.interaction.startTransformation[1][2] + p[1];
                this.draw();
            }
        };

        /**
        * Handles the mouseup event
        *
        * @param {event} evt The event object
        */
        Screen2D.prototype.onmouseup = function (evt) {
            if (evt.preventDefault) {
                evt.preventDefault();
            }

            evt.returnValue = false;

            // Go back to normal mode
            if (this.options.interaction.type === 'pan') {
                delete this.options.interaction.type;
                delete this.options.interaction.startPoint;
                delete this.options.interaction.startTransformation;
            }
        };

        /**
        * Handles the mousewheel event
        *
        * @param {event} evt The event object
        */
        Screen2D.prototype.onmousewheel = function (evt) {
            var delta, s, p, z;

            if (this.options.interaction.allowZoom) {
                if (evt.preventDefault) {
                    evt.preventDefault();
                }
                evt.returnValue = false;

                // Chrome/Safari
                if (evt.wheelDelta) {
                    delta = evt.wheelDelta / 360;
                } else {
                    delta = evt.detail / -9;
                }

                // The amount of zoom is determined by the zoom speed
                // and the amount how much the scrollwheel has been moved
                z = Math.pow(1 + this.options.interaction.zoomSpeed, delta);

                // Transform the (computer-)screen coordinates of the mouse to the internal coordinates
                p = this.transformation.inverse().times(this.getEventPoint(evt));

                // Compute new scale matrix in current mouse position
                s = new MathLib.Matrix([[z, 0, p[0] - p[0] * z], [0, z, p[1] - p[1] * z], [0, 0, 1]]);

                this.transformation = this.transformation.times(s);

                this.applyTransformation();
                this.draw();
            }
        };

        /**
        * Adjust the rendering if the screen is resized
        *
        * @param {number} width The new width
        * @param {number} height The new height
        * @return {Screen2D}
        */
        Screen2D.prototype.resize = function (width, height) {
            this.height = height;
            this.width = width;

            if (this.options.renderer === 'Canvas') {
                this.layer.back.element.width = width;
                this.layer.back.element.height = height;
                this.layer.back.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

                this.layer.grid.element.width = width;
                this.layer.grid.element.height = height;
                this.layer.grid.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
                this.layer.grid.ctx.strokeStyle = MathLib.colorConvert(this.options.grid.color) || '#cccccc';

                this.layer.axes.element.width = width;
                this.layer.axes.element.height = height;
                this.layer.axes.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
                this.layer.axes.ctx.strokeStyle = MathLib.colorConvert(this.options.axes.color) || '#000000';

                this.layer.main.element.width = width;
                this.layer.main.element.height = height;
                this.layer.main.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            } else if (this.options.renderer === 'SVG') {
                this.element.setAttribute('width', width + 'px');
                this.element.setAttribute('height', height + 'px');
            }

            this.applyTransformation();
            this.draw();

            return this;
        };
        return Screen2D;
    })(MathLib.Screen);
    MathLib.Screen2D = Screen2D;
})(MathLib || (MathLib = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) {
        d[p] = b[p];
      }
    }
    function __() {
      this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    // A function converting arrays to THREE.js vectors
    var to3js = function (x) {
        if (x.length === 2) {
            return new THREE.Vector2(x[0], x[1]);
        } else if (x.length === 3) {
            return new THREE.Vector3(x[0], x[1], x[2]);
        }
    };

    /// import Screen
    /**
    * Three dimensional plotting
    *
    * @class
    * @augments Screen
    * @this {Screen3D}
    */
    var Screen3D = (function (_super) {
        __extends(Screen3D, _super);
        function Screen3D(id, options) {
            if (typeof options === "undefined") { options = {}; }
            _super.call(this, id, options);
            this.type = 'screen3D';

            var defaults = {
                anaglyphMode: false,
                axes: true,
                background: 0xffffff,
                camera: {
                    lookAt: [0, 0, 0],
                    position: [10, 10, 10]
                },
                controls: 'Trackball',
                grid: {
                    xy: {
                        angle: Math.PI / 8,
                        color: 0xcccccc,
                        type: 'none',
                        tick: { x: 1, y: 1, r: 1 }
                    },
                    xz: {
                        angle: Math.PI / 8,
                        color: 0xcccccc,
                        type: 'none',
                        tick: { x: 1, z: 1, r: 1 }
                    },
                    yz: {
                        angle: Math.PI / 8,
                        color: 0xcccccc,
                        type: 'none',
                        tick: { y: 1, z: 1, r: 1 }
                    }
                },
                height: 500,
                renderer: 'WebGL',
                width: 500
            }, opts = MathLib.extendObject(defaults, options), scene = new THREE.Scene(), camera, renderer, controls, viewAngle, aspect, near, far;

            this.options = opts;
            this.scene = scene;

            // Camera
            // ======
            viewAngle = 45;
            aspect = opts.width / opts.height;
            near = 0.1;
            far = 20000;

            camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
            camera.position = to3js(opts.camera.position);
            camera.lookAt(to3js(opts.camera.lookAt));
            camera.up = new THREE.Vector3(0, 0, 1);
            scene.add(camera);

            // Renderer
            // ========
            renderer = new THREE[opts.renderer + 'Renderer']({ antialias: true, preserveDrawingBuffer: true });

            // Remove the warning message.
            this.wrapper.innerHTML = '';
            this.wrapper.appendChild(renderer.domElement);

            // Storing the the original renderer to recover it easily when leaving anaglyph mode
            var origRenderer = renderer;

            // Overwrite the renderer with the anaglyph mode renderer
            if (opts.anaglyphMode) {
                renderer = new THREE.AnaglyphEffect(renderer);
            }

            renderer.setSize(opts.width, opts.height);

            // Controls
            // ========
            // Other possible values are: 'FirstPerson', 'Fly', 'Orbit', 'Path', 'Roll', 'Trackback' or false
            // MathLib defaults to the TrackballControls
            // move mouse and left   click (or hold 'A') to rotate
            //                middle click (or hold 'S') to zoom
            //                right  click (or hold 'D') to pan
            if (opts.controls) {
                controls = new THREE[opts.controls + 'Controls'](camera, renderer.domElement);
            } else {
                controls = {
                    update: function () {
                    }
                };
            }

            // Light
            // =====
            var light1 = new THREE.PointLight(0xffffff);
            light1.position.set(0, 0, 200);
            scene.add(light1);
            var light2 = new THREE.PointLight(0xffffff);
            light2.position.set(0, 0, -200);
            scene.add(light2);

            // Background
            // ==========
            renderer.setClearColorHex(opts.background, 1);
            renderer.clear();

            // Grid
            // ====
            if (opts.grid) {
                this.drawGrid();
            }

            // Axes
            // ====
            if (opts.axes) {
                var axes = new THREE.AxisHelper(10);
                scene.add(axes);
            }

            // Animate the scene
            // =================
            function animate () {
                requestAnimationFrame(animate);
                render();
                update();
            }

            function update () {
                //var delta = clock.getDelta();
                controls.update();
            }

            // Render the scene
            function render () {
                renderer.render(scene, camera);
            }

            // kick of the animation loop
            animate();

            this.options = opts;
            this.element = renderer.domElement;
            this.renderer = renderer;
            this.camera = camera;

            this.container.classList.add('MathLib_screen3D');
        }
        /**
        * Draws the grid.
        *
        * @return {Screen3D}
        */
        Screen3D.prototype.drawGrid = function () {
            if (!this.options.grid) {
                return this;
            }

            var _this = this, gridDrawer = function (opts, rotX, rotY) {
                var size = 10, grid = new THREE.Object3D(), color = new THREE.Color(opts.color), i, ii;

                if (opts.type === 'cartesian') {
                    var tickX = 'x' in opts.tick ? opts.tick.x : opts.tick.y, tickY = 'z' in opts.tick ? opts.tick.z : opts.tick.y, lines = new THREE.Shape();

                    for (i = -size; i <= size; i += tickX) {
                        lines.moveTo(-size, i);
                        lines.lineTo(size, i);
                    }

                    for (i = -size; i <= size; i += tickY) {
                        lines.moveTo(i, -size);
                        lines.lineTo(i, size);
                    }

                    grid.add(new THREE.Line(lines.createPointsGeometry(), new THREE.LineBasicMaterial({ color: color }), THREE.LinePieces));

                    grid.rotation.x = rotX;
                    grid.rotation.y = rotY;

                    _this.scene.add(grid);
                } else if (opts.type === 'polar') {
                    var circles = new THREE.Shape(), rays = new THREE.Shape();

                    for (i = 0; i <= size; i += opts.tick.r) {
                        circles.moveTo(i, 0);
                        circles.absarc(0, 0, i, 0, 2 * Math.PI + 0.001, false);
                    }
                    grid.add(new THREE.Line(circles.createPointsGeometry(), new THREE.LineBasicMaterial({ color: color })));

                    for (i = 0, ii = 2 * Math.PI; i < ii; i += opts.angle) {
                        rays.moveTo(0, 0);
                        rays.lineTo(size * Math.cos(i), size * Math.sin(i));
                    }

                    grid.add(new THREE.Line(rays.createPointsGeometry(), new THREE.LineBasicMaterial({ color: color })));

                    grid.rotation.x = rotX;
                    grid.rotation.y = rotY;

                    _this.scene.add(grid);
                }
            };

            gridDrawer(this.options.grid.xy, 0, 0);
            gridDrawer(this.options.grid.xz, Math.PI / 2, 0);
            gridDrawer(this.options.grid.yz, 0, Math.PI / 2);

            return this;
        };

        /**
        * Creates a parametric plot
        *
        * @param {function} f The function which is called on every argument
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        Screen3D.prototype.parametricPlot3D = function (f, options) {
            var defaults = {
                closed: false,
                debug: false,
                min: 0,
                max: 1,
                pointNum: 1000,
                radius: 0.05,
                segmentsRadius: 6,
                material: {
                    type: 'MeshLambert'
                }
            }, opts = MathLib.extendObject(defaults, options), Curve = THREE.Curve.create(function () {
            }, function (t) {
                t = (opts.max - opts.min) * t + opts.min;
                var ft = f(t);
                return new THREE.Vector3(ft[0], ft[1], ft[2]);
            }), mesh = new THREE.Mesh(new THREE.TubeGeometry(new Curve(), opts.pointNum, opts.radius, opts.segmentsRadius, opts.closed, opts.debug), new THREE[opts.material.type + 'Material'](opts.material));

            this.scene.add(mesh);

            /*
            guiObj = {
            color: [mesh.material.color.r, mesh.material.color.g, mesh.material.color.b]
            };
            
            
            var folder = _3D.datGUI.addFolder(options.name);
            folder.add(mesh, 'visible');
            folder.addColor(guiObj, 'color')
            .onChange(function (value) {mesh.material.color.setRGB(value[0] / 255, value[1] / 255, value[2] / 255);});
            */
            return this;
        };

        /**
        * Creates a plot of a three dimensional function
        *
        * @param {function} f The map for the height
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        Screen3D.prototype.plot3D = function (f, options) {
            return this.surfacePlot3D(function (u, v) {
                return [u, v, f(u, v)];
            }, options);
        };

        /**
        * Adjust the rendering if the screen is resized
        *
        * @param {number} width The new width
        * @param {number} height The new height
        * @return {Screen3D}
        */
        Screen3D.prototype.resize = function (width, height) {
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            return this;
        };

        /**
        * Creates a surface plot.
        *
        * @param {function} f The map for the surface
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        Screen3D.prototype.surfacePlot3D = function (f, options) {
            var defaults = {
                material: {
                    type: 'MeshLambert'
                },
                pointNumX: 100,
                pointNumY: 100,
                xmin: 0,
                xmax: 1,
                ymin: 0,
                ymax: 1
            }, opts = MathLib.extendObject(defaults, options), map = function (u, v) {
                u = (opts.xmax - opts.xmin) * u + opts.xmin;
                v = (opts.ymax - opts.ymin) * v + opts.ymin;
                var fuv = f(u, v);
                return new THREE.Vector3(fuv[0], fuv[1], fuv[2]);
            }, material = new THREE[opts.material.type + 'Material'](opts.material), mesh;

            material.side = THREE.DoubleSide;

            mesh = new THREE.Mesh(new THREE.ParametricGeometry(map, opts.pointNumX, opts.pointNumY, false), material);

            this.scene.add(mesh);

            // if (options.datGUI) {
            //   guiObj = {
            //     color: [mesh.material.color.r, mesh.material.color.g, mesh.material.color.b]
            //   };
            //   var folder = _3D.datGUI.addFolder(options.datGUI.name);
            //   if (options.datGUI.visible) {
            //     folder.add(mesh, 'visible');
            //   }
            //   if (options.datGUI.wireframe) {
            //     folder.add(mesh.material, 'wireframe');
            //   }
            //   if (options.datGUI.color) {
            //     color = mesh.material.color.getHex();
            //     var guiObj = {
            //       color: color
            //     };
            //     folder.addColor(guiObj, 'color').name('color')
            //       .onChange(function (value) {mesh.material.color = new THREE.Color(value);});
            //   }
            // }
            return this;
        };
        return Screen3D;
    })(MathLib.Screen);
    MathLib.Screen3D = Screen3D;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Functn
    /**
    * The vector implementation of MathLib makes calculations with vectors of
    * arbitrary size possible. The entries of the vector can be numbers and complex
    * numbers.
    *
    * It is as easy as
    * `new MathLib.Vector([1, 2, 3])`
    * to create the following vector:
    *    ⎛ 1 ⎞
    *    ⎜ 2 ⎟
    *    ⎝ 3 ⎠
    *
    * @class
    * @this {Vector}
    */
    var Vector = (function () {
        function Vector(coords) {
            var _this = this;
            this.type = 'vector';
            coords.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = coords.length;
        }
        /**
        * Compares two vectors.
        *
        * @param {Vector} v The vector to compare
        * @return {number}
        */
        Vector.prototype.compare = function (v) {
            var i, ii;

            if (this.length !== v.length) {
                return MathLib.sign(this.length - v.length);
            }

            for (i = 0, ii = this.length; i < ii; i++) {
                if (v[i] - this[i]) {
                    return MathLib.sign(this[i] - v[i]);
                }
            }

            return 0;
        };

        /**
        * Works like Array.prototype.every.
        *
        * @param {function} f The function to be applied to all the values
        * @return {boolean}
        */
        Vector.prototype.every = function (f) {
            return Array.prototype.every.call(this, f);
        };

        /**
        * Works like Array.prototype.forEach.
        *
        * @param {function} f The function to be applied to all the values
        */
        Vector.prototype.forEach = function (f) {
            Array.prototype.forEach.call(this, f);
        };

        /**
        * Determines if two vectors are equal
        *
        * @param {Vector} v The vector to compare
        * @return {boolean}
        */
        Vector.prototype.isEqual = function (v) {
            if (this.length !== v.length) {
                return false;
            }

            return this.every(function (x, i) {
                return MathLib.isEqual(x, v[i]);
            });
        };

        /**
        * Determines if the vector is the zero vector.
        *
        * @return {boolean}
        */
        Vector.prototype.isZero = function () {
            return this.every(MathLib.isZero);
        };

        /**
        * Works like Array.prototype.map.
        *
        * @param {function} f The function to be applied to all the values
        * @return {Vector}
        */
        Vector.prototype.map = function (f) {
            return new this['constructor'](Array.prototype.map.call(this, f));
        };

        /**
        * Calculates the difference of two vectors.
        *
        * @param {Vector} v The vector to be subtracted.
        * @return {Vector}
        */
        Vector.prototype.minus = function (v) {
            if (this.length === v.length) {
                return this.plus(v.negative());
            } else {
                MathLib.error({ message: 'Vector sizes not matching', method: 'Vector#minus' });
                return;
            }
        };

        /**
        * Returns the negative vector.
        *
        * @return {Vector}
        */
        Vector.prototype.negative = function () {
            return this.map(MathLib.negative);
        };

        /**
        * Calcultes the norm of the vector.
        *
        * @param {number} p The p for the p-norm
        * @return {number}
        */
        Vector.prototype.norm = function (p) {
            if (typeof p === "undefined") { p = 2; }
            if (p === 2) {
                return MathLib.hypot.apply(null, this.toArray());
            } else if (p === Infinity) {
                return Math.max.apply(null, this.map(Math.abs).toArray());
            } else {
                return MathLib.root(this.reduce(function (prev, curr) {
                    return prev + Math.pow(Math.abs(curr), p);
                }, 0), p);
            }
        };

        /**
        * Calculates the outer product of two vectors.
        *
        * @param {Vector} v The second vector to calculate the outer product with.
        * @return {Matrix}
        */
        Vector.prototype.outerProduct = function (v) {
            return new MathLib.Matrix(this.map(function (x) {
                return v.map(function (y) {
                    return MathLib.times(x, y);
                });
            }));
        };

        /**
        * Calculates the sum of two vectors.
        *
        * @param {Vector} v The vector to add to the current vector.
        * @return {Vector}
        */
        Vector.prototype.plus = function (v) {
            if (this.length === v.length) {
                return new MathLib.Vector(this.map(function (x, i) {
                    return MathLib.plus(x, v[i]);
                }));
            } else {
                MathLib.error({ message: 'Vector sizes not matching', method: 'Vector#plus' });
                return;
            }
        };

        /**
        * Works like Array.prototype.reduce.
        *
        * @return {any}
        */
        Vector.prototype.reduce = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.reduce.apply(this, args);
        };

        /**
        * Calculates the scalar product of two vectors.
        *
        * @param {Vector} v The second vector to calculate the scalar product with.
        * @return {number|Complex}
        */
        Vector.prototype.scalarProduct = function (v) {
            if (this.length === v.length) {
                return this.reduce(function (old, cur, i, w) {
                    return MathLib.plus(old, MathLib.times(w[i], v[i]));
                }, 0);
            } else {
                MathLib.error({ message: 'Vector sizes not matching', method: 'Vector#scalarProduct' });
                return;
            }
        };

        /**
        * Works like the Array.prototype.slice function
        *
        * @return {array}
        */
        Vector.prototype.slice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.slice.apply(this, args);
        };

        /**
        * Multiplies the vector by a (complex) number or a matrix.
        * The vector is multiplied from left to the matrix.
        * If you want to multiply it from the right use
        * matrix.times(vector) instead of vector.times(matrix)
        *
        * @param {number|Complex|Matrix} n The object to multiply to the vector
        * @return {Vector}
        */
        Vector.prototype.times = function (n) {
            var i, ii, colVectors, product = [];
            if (n.type === 'rational') {
                n = n.toNumber();
            }
            if (typeof n === 'number' || n.type === 'complex') {
                return this.map(function (x) {
                    return MathLib.times(n, x);
                });
            }
            if (n.type === 'matrix') {
                if (this.length === n.rows) {
                    colVectors = n.toColVectors();
                    for (i = 0, ii = colVectors.length; i < ii; i++) {
                        product[i] = this.scalarProduct(colVectors[i]);
                    }
                    return new MathLib.Vector(product);
                } else {
                    MathLib.error({ message: 'Vector/Matrix sizes not matching', method: 'Vector#times' });
                    return;
                }
            }
        };

        /**
        * Converts the vector to an array.
        *
        * @return {array}
        */
        Vector.prototype.toArray = function () {
            return Array.prototype.slice.call(this);
        };

        /**
        * Returns the content MathML representation of the vector.
        *
        * @return {string}
        */
        Vector.prototype.toContentMathML = function () {
            return this.reduce(function (old, cur) {
                return old + MathLib.toContentMathML(cur);
            }, '<vector>') + '</vector>';
        };

        /**
        * Returns a LaTeX representation of the vector.
        *
        * @return {string}
        */
        Vector.prototype.toLaTeX = function () {
            return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
                return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
            }) + '\n\\end{pmatrix}';
        };

        /**
        * Returns the (presentation) MathML representation of the vector.
        *
        * @return {string}
        */
        Vector.prototype.toMathML = function () {
            return this.reduce(function (old, cur) {
                return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
            }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
        };

        /**
        * Returns a string representation of the vector.
        *
        * @return {string}
        */
        Vector.prototype.toString = function () {
            return '(' + this.reduce(function (old, cur) {
                return old + ', ' + MathLib.toString(cur);
            }) + ')';
        };

        /**
        * Calculates the vector product of two vectors.
        *
        * @param {Vector} v The second vector to calculate the vector product with.
        * @return {Vector}
        */
        Vector.prototype.vectorProduct = function (v) {
            /* TODO: Implement vectorproduct for non three-dimensional vectors */
            if (this.length === 3 && v.length === 3) {
                return new MathLib.Vector([
                    MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])),
                    MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])),
                    MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0]))
                ]);
            } else {
                MathLib.error({ message: 'Vectors are not three-dimensional', method: 'Vector#vectorProduct' });
                return;
            }
        };
        Vector.areLinearIndependent = function (vectors) {
            var n = vectors.length, m = vectors[0].length;

            if (n > m) {
                return false;
            }

            if (!vectors.every(function (x) {
                return x.length === m;
            })) {
                return undefined;
            }

            return (new MathLib.Matrix(vectors)).rank() === n;
        };

        Vector.zero = function (n) {
            var vector = [], i;
            for (i = 0; i < n; i++) {
                vector.push(0);
            }
            return new MathLib.Vector(vector);
        };
        return Vector;
    })();
    MathLib.Vector = Vector;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Point
    /**
    * Creates a MathLib circle
    * MathLib.Circle expects two arguments.
    * First the center in the form of an Array or a MathLib.point.
    * The second argument should be the radius of the circle.
    * #### Simple use case:
    *
    * ```
    * // Create a circle with center (1, 2) and radius 3.
    * var c = new MathLib.Circle([1, 2], 3);
    * c.center                   // The center of the circle (point)
    * c.radius                   // returns the radius of the circle
    * ```
    *
    * @class
    * @this {Circle}
    */
    var Circle = (function () {
        function Circle(center, radius) {
            this.type = 'circle';
            if (center.type === undefined) {
                center = new MathLib.Point(center.concat(1));
            }

            this.center = center;
            this.radius = radius;
        }
        /**
        * Calculates the area of the circle.
        *
        * @return {number} The area of the circle
        */
        Circle.prototype.area = function () {
            return this.radius * this.radius * Math.PI;
        };

        /**
        * Calculates the circumference of the circle.
        *
        * @return {number} The circumference of the circle
        */
        Circle.prototype.circumference = function () {
            return 2 * this.radius * Math.PI;
        };

        /**
        * Compares two circles
        *
        * @param {Circle} circle The circle to compare
        * @return {number}
        */
        Circle.prototype.compare = function (circle) {
            return MathLib.sign(this.center.compare(circle.center)) || MathLib.sign(this.radius - circle.radius);
        };

        /**
        * Draw the circle onto the screen.
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {object} options Optional drawing options
        * @return {Circle} Returns the circle for chaining
        */
        Circle.prototype.draw = function (screen, options) {
            if (Array.isArray(screen)) {
                var circle = this;
                screen.forEach(function (x) {
                    x.circle(circle, options);
                });
            } else {
                screen.circle(this, options);
            }
            return this;
        };

        /**
        * Checks if two circles are equal
        *
        * @param {Circle} circle The circle to compare
        * @return {boolean}
        */
        Circle.prototype.isEqual = function (circle) {
            return MathLib.isEqual(this.radius, circle.radius) && this.center.isEqual(circle.center);
        };

        /**
        * Determine if a point is in, on or outside a circle.
        *
        * @param {Point} point The Point to determine the position of
        * @return {string}
        */
        Circle.prototype.positionOf = function (point) {
            var diff;
            if (point.type === 'point' && point.dimension === 2) {
                diff = point.distanceTo(this.center) - this.radius;
                if (MathLib.isZero(diff)) {
                    return 'on';
                } else if (diff < 0) {
                    return 'in';
                } else {
                    return 'out';
                }
            }
        };

        /**
        * Reflect the circle at a point or line
        *
        * @return {Circle}
        */
        Circle.prototype.reflectAt = function (a) {
            return new MathLib.Circle(this.center.reflectAt(a), this.radius);
        };

        /**
        * Returns a LaTeX expression of the circle
        *
        * @return {string}
        */
        Circle.prototype.toLaTeX = function () {
            return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
        };

        /**
        * Converts the circle to the corresponding matrix.
        *
        * @return {Matrix}
        */
        Circle.prototype.toMatrix = function () {
            var x = this.center[0] / this.center[2], y = this.center[1] / this.center[2], r = this.radius;
            return new MathLib.Matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x * x + y * y - r * r]]);
        };
        return Circle;
    })();
    MathLib.Circle = Circle;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Functn, Point
    /**
    * MathLib.Complex is the MathLib implementation of complex numbers.
    *
    * There are two ways of defining complex numbers:
    *
    * * Two numbers representing the real and the complex part.
    * * MathLib.Complex.polar(abs, arg)
    *
    * #### Simple example:
    * ```
    * // Create the complex number 1 + 2i
    * var c = new MathLib.Complex(1, 2);
    * ```
    *
    * @class
    * @this {Complex}
    */
    var Complex = (function () {
        function Complex(re, im) {
            if (typeof im === "undefined") { im = 0; }
            this.type = 'complex';
            if (MathLib.isNaN(re) || MathLib.isNaN(im)) {
                this.re = NaN;
                this.im = NaN;
            } else if (!MathLib.isFinite(re) || !MathLib.isFinite(im)) {
                this.re = Infinity;
                this.im = Infinity;
            } else {
                this.re = re;
                this.im = im;
            }
        }
        /**
        * Returns the absolute value of the number.
        *
        * @return {number}
        */
        Complex.prototype.abs = function () {
            return MathLib.hypot(this.re, this.im);
        };

        /**
        * Returns the inverse cosine of the number.
        *
        * @return {Complex}
        */
        Complex.prototype.arccos = function () {
            return MathLib.minus(Math.PI / 2, this.arcsin());
        };

        /**
        * Returns the inverse cotangent of the number.
        *
        * @return {Complex}
        */
        Complex.prototype.arccot = function () {
            if (this.isZero()) {
                return new MathLib.Complex(MathLib.sign(1 / this.re) * Math.PI / 2, -this.im);
            }
            return this.inverse().arctan();
        };

        /**
        * Returns the inverse cosecant of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arccsc = function () {
            // arccsc(0) = ComplexInfinity not ComplexNaN
            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return this.inverse().arcsin();
        };

        /**
        * Returns the inverse secant of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arcsec = function () {
            // arcsec(0) = ComplexInfinity not ComplexNaN
            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return this.inverse().arccos();
        };

        /**
        * Returns the inverse sine of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arcsin = function () {
            var a = this.re, b = this.im, aa = a * a, bb = b * b, sqrt = Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * bb), sgn = function (x) {
                if (x > 0) {
                    return 1;
                }
                if (x < 0) {
                    return -1;
                }
                if (1 / x === Infinity) {
                    return 1;
                }
                if (1 / x === -Infinity) {
                    return -1;
                }
            };

            if (a === Infinity) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(sgn(a) / 2 * MathLib.arccos(sqrt - (aa + bb)), sgn(b) / 2 * MathLib.arcosh(sqrt + (aa + bb)));
        };

        /**
        * Returns the inverse tangent of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arctan = function () {
            var res, iz = new MathLib.Complex(-this.im, this.re);

            if (this.isZero()) {
                return new MathLib.Complex(this.re, this.im);
            }

            res = MathLib.times(new MathLib.Complex(0, -0.5), MathLib.plus(1, iz).divide(MathLib.minus(1, iz)).ln());

            // Correct some values on the axis imaginary axis.
            // TODO: Are this all the wrong values?
            if (MathLib.isNegZero(this.re) && res.re !== Infinity && (this.im < 0 || this.im > 1)) {
                res.re = -res.re;
            }

            return res;
        };

        /**
        * Returns the argument (= the angle) of the complex number
        *
        * @return {number}
        */
        Complex.prototype.arg = function () {
            if (this.re === Infinity) {
                return NaN;
            }
            return Math.atan2(this.im, this.re);
        };

        /**
        * Returns the inverse hyperbolic tangent of the number
        *
        * @return {Complex}
        */
        Complex.prototype.artanh = function () {
            if (this.isZero()) {
                return new MathLib.Complex(this.re, this.im);
            }

            if (this.re === Infinity) {
                return new MathLib.Complex(NaN);
            }

            return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
        };

        /**
        * Compares two complex numbers
        *
        * @return {number}
        */
        Complex.prototype.compare = function (x) {
            var a = MathLib.sign(this.abs() - x.abs());

            if (MathLib.isNaN(this.re)) {
                if (MathLib.isNaN(x.re)) {
                    return 0;
                }
                return -1;
            }

            if (this.re === Infinity) {
                if (x.re === Infinity) {
                    return 0;
                }
                return 1;
            }

            return a ? a : MathLib.sign(this.arg() - x.arg());
        };

        /**
        * Calculates the conjugate of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.conjugate = function () {
            return new MathLib.Complex(this.re, MathLib.negative(this.im));
        };

        /**
        * Copies the complex number
        *
        * @return {Complex}
        */
        Complex.prototype.copy = function () {
            return new MathLib.Complex(MathLib.copy(this.re), MathLib.copy(this.im));
        };

        /**
        * Calculates the cosine of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.cos = function () {
            return new MathLib.Complex(MathLib.cos(this.re) * MathLib.cosh(this.im), -MathLib.sin(this.re) * MathLib.sinh(this.im));
        };

        /*
        * Calculates the hyperbolic cosine of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.cosh = function () {
            return new MathLib.Complex(MathLib.cos(this.im) * MathLib.cosh(this.re), MathLib.sin(this.im) * MathLib.sinh(this.re));
        };

        /**
        * Calculates the cotangent of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.cot = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cos(aa) - MathLib.cosh(bb);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(-MathLib.sin(aa) / d, MathLib.sinh(bb) / d);
        };

        /**
        * Calculates the hyperbolic cotangent of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.coth = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cosh(aa) - MathLib.cos(bb);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(MathLib.sinh(aa) / d, -MathLib.sin(bb) / d);
        };

        /**
        * Calculates the cosecant of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.csc = function () {
            var a = this.re, b = this.im, d = MathLib.cos(2 * a) - MathLib.cosh(2 * b);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(-2 * MathLib.sin(a) * MathLib.cosh(b) / d, 2 * MathLib.cos(a) * MathLib.sinh(b) / d);
        };

        /**
        * Calculates the hyperbolic cosecant of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.csch = function () {
            var a = this.re, b = this.im, d = MathLib.cosh(2 * a) - MathLib.cos(2 * b);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(2 * MathLib.sinh(a) * MathLib.cos(b) / d, -2 * MathLib.cosh(a) * MathLib.sin(b) / d);
        };

        /**
        * Divides a complex number by an other
        *
        * @param {number|Complex} divisor The divisor
        * @return {Complex}
        */
        Complex.prototype.divide = function (divisor) {
            return this.times(MathLib.inverse(divisor));
        };

        /**
        * Evaluates the exponential function with a complex argument
        *
        * @return {Complex}
        */
        Complex.prototype.exp = function () {
            return new MathLib.Complex(MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re) * MathLib.sin(this.im));
        };

        /**
        * Calculates the inverse of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.inverse = function () {
            var d = MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2));

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            if (this.re === Infinity) {
                return new MathLib.Complex(0);
            }

            return new MathLib.Complex(MathLib.divide(this.re, d), MathLib.divide(MathLib.negative(this.im), d));
        };

        /**
        * Determines if the complex number is equal to another number.
        *
        * @param {Complex|number|Rational} number The number to be compared
        * @return {boolean}
        */
        Complex.prototype.isEqual = function (number) {
            if (typeof number === 'number') {
                return MathLib.isEqual(this.re, number) && MathLib.isZero(this.im);
            }
            if (number.type === 'complex') {
                return MathLib.isEqual(this.re, number.re) && MathLib.isEqual(this.im, number.im);
            }
            return false;
        };

        /**
        * Determines if the complex number is finite.
        *
        * @return {boolean}
        */
        Complex.prototype.isFinite = function () {
            return MathLib.isFinite(this.re);
        };

        /**
        * Determines if the complex number is equal to 0.
        *
        * @return {boolean}
        */
        Complex.prototype.isZero = function () {
            return MathLib.isZero(this.re) && MathLib.isZero(this.im);
        };

        /*
        * Evaluates the natural logarithm with complex arguments
        *
        * @return {Complex}
        */
        Complex.prototype.ln = function () {
            if (this.re === Infinity) {
                return new MathLib.Complex(Infinity);
            }
            return new MathLib.Complex(MathLib.ln(this.abs()), this.arg());
        };

        /**
        * Calculates the difference of two complex numbers
        *
        * @param {number|Complex} subtrahend The subtrahend
        * @return {Complex}
        */
        Complex.prototype.minus = function (subtrahend) {
            return this.plus(MathLib.negative(subtrahend));
        };

        /**
        * Calculates the negative of the complex number
        *
        * @return {Complex}
        */
        Complex.prototype.negative = function () {
            return new MathLib.Complex(MathLib.negative(this.re), MathLib.negative(this.im));
        };

        /**
        * Add complex numbers
        *
        * @param {number|Complex|Rational} summand The number to be added
        * @return {Complex}
        */
        Complex.prototype.plus = function (summand) {
            if (summand.type === 'complex') {
                return new MathLib.Complex(MathLib.plus(this.re, summand.re), MathLib.plus(this.im, summand.im));
            } else if (summand.type === 'rational') {
                summand = summand.toNumber();
            }
            if (typeof summand === 'number') {
                return new MathLib.Complex(MathLib.plus(this.re, summand), this.im);
            }
        };

        /**
        * Calculates the complex number raised to some power
        *
        * @param {numeric} c The power to which the complex number should be raised
        * @return {Complex}
        */
        Complex.prototype.pow = function (c) {
            var re, im, abs, arg;

            if (MathLib.type(c) === 'complex') {
                re = c.re;
                im = c.im;
                abs = this.abs();
                arg = this.arg();

                // Fixes inf^(2+5i) = inf and 0^(2+5i) = 0
                if ((this.isZero() || this.re === Infinity) && !(c.isZero() || c.re === Infinity || MathLib.isNaN(c.re))) {
                    return new MathLib.Complex(this.re, this.im);
                }

                return MathLib.Complex.polar(MathLib.times(MathLib.pow(abs, re), MathLib.exp(MathLib.negative(MathLib.times(im, arg)))), MathLib.plus(MathLib.times(re, arg), MathLib.times(im, MathLib.ln(abs))));
            } else {
                // The naive pow method has some rounding errrors. For example
                // (2+5i)^3 = -142.00000000000006-64.99999999999999i
                // instead of -142-65i which are errors of magnitude around 1e-14.
                // This error increases quickly for increasing exponents.
                // (2+5i)^21 has an error of 5.8 in the real part
                // return MathLib.Complex.polar(MathLib.pow(abs, c), MathLib.times(arg, c));
                // The following algorithm uses a different approach for integer exponents,
                // where it yields exact results.
                // Non integer exponents are evaluated using the naive approach.
                // TODO: Improve the algorithm.
                var i, int = MathLib.floor(Math.abs(c)), res = new MathLib.Complex(1), power = this, bin = int.toString(2);

                // If the exponent is not an integer we use the naive approach
                if (c % 1) {
                    abs = this.abs();
                    arg = this.arg();
                    return MathLib.Complex.polar(MathLib.pow(abs, c), MathLib.times(arg, c));
                }

                // The imaginary part of (2+5i)^-0 should be -0 not +0.
                if (MathLib.isZero(c)) {
                    return new MathLib.Complex(1, c);
                }

                for (i = bin.length - 1; i >= 0; i--) {
                    if (bin[i] === '1') {
                        res = MathLib.times(res, power);
                    }
                    power = MathLib.times(power, power);
                }

                if (c < 0) {
                    res = res.inverse();
                }

                return res;
            }
        };

        /**
        * Calculates the secant of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sec = function () {
            var a = this.re, b = this.im, d = MathLib.cos(2 * a) + MathLib.cosh(2 * b);

            return new MathLib.Complex(2 * MathLib.cos(a) * MathLib.cosh(b) / d, 2 * MathLib.sin(a) * MathLib.sinh(b) / d);
        };

        /**
        * Calculates the hyperbolic secant of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sech = function () {
            var a = this.re, b = this.im, d = MathLib.cosh(2 * a) + MathLib.cos(2 * b);

            return new MathLib.Complex(2 * MathLib.cosh(a) * MathLib.cos(b) / d, -2 * MathLib.sinh(a) * MathLib.sin(b) / d);
        };

        /**
        * Calculates the signum of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sign = function () {
            if (this.isZero() || MathLib.isNaN(this.re)) {
                return this;
            } else if (this.re === Infinity) {
                return new MathLib.Complex(NaN);
            }
            return MathLib.Complex.polar(1, this.arg());
        };

        /**
        * Calculates the sine of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sin = function () {
            return new MathLib.Complex(MathLib.sin(this.re) * MathLib.cosh(this.im), MathLib.cos(this.re) * MathLib.sinh(this.im));
        };

        /**
        * Calculates the hyperbolic sine of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sinh = function () {
            return new MathLib.Complex(MathLib.cos(this.im) * MathLib.sinh(this.re), MathLib.sin(this.im) * MathLib.cosh(this.re));
        };

        /**
        * Takes the square root of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sqrt = function () {
            return MathLib.Complex.polar(Math.sqrt(this.abs()), this.arg() / 2);
        };

        /**
        * Calculates the tangent of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.tan = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cos(aa) + MathLib.cosh(bb);

            return new MathLib.Complex(MathLib.sin(aa) / d, MathLib.sinh(bb) / d);
        };

        /**
        * Calculates the hyperbolic tangent of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.tanh = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cosh(aa) + MathLib.cos(bb);

            return new MathLib.Complex(MathLib.sinh(aa) / d, MathLib.sin(bb) / d);
        };

        /**
        * Multiplies complex numbers
        *
        * @param {Complex|number|Rational} factor The number to be multiplied
        * @return {Complex}
        */
        Complex.prototype.times = function (factor) {
            if (factor.type === 'complex') {
                if (this.re === Infinity) {
                    if (factor.isZero() || MathLib.isNaN(factor.re)) {
                        return new MathLib.Complex(NaN);
                    } else {
                        return new MathLib.Complex(Infinity);
                    }
                }

                if (factor.re === Infinity) {
                    if (this.isZero() || MathLib.isNaN(this.re)) {
                        return new MathLib.Complex(NaN);
                    } else {
                        return new MathLib.Complex(Infinity);
                    }
                }

                return new MathLib.Complex(MathLib.minus(MathLib.times(this.re, factor.re), MathLib.times(this.im, factor.im)), MathLib.plus(MathLib.times(this.re, factor.im), MathLib.times(this.im, factor.re)));
            } else if (factor.type === 'rational') {
                factor = factor.toNumber();
            }
            if (typeof factor === 'number') {
                return new MathLib.Complex(MathLib.times(this.re, factor), MathLib.times(this.im, factor));
            }
        };

        /**
        * Returns the content MathML representation of the number
        *
        * @return {string}
        */
        Complex.prototype.toContentMathML = function () {
            if (!this.isFinite()) {
                return '<csymbol cd="nums1">' + (this.re === Infinity ? 'infinity' : 'NaN') + '</csymbol>';
            }

            return '<apply><plus />' + MathLib.toContentMathML(this.re) + '<apply><times />' + MathLib.toContentMathML(this.im) + '<imaginaryi /></apply></apply>';
        };

        /**
        * Returns the LaTeX representation of the complex number
        *
        * @return {string}
        */
        Complex.prototype.toLaTeX = function () {
            var str = '', reFlag = false;

            if (!this.isFinite()) {
                return '\\text{Complex' + this.re + '}';
            }

            if (!MathLib.isZero(this.re)) {
                str = MathLib.toLaTeX(this.re);
                reFlag = true;
            }
            if (!MathLib.isZero(this.im)) {
                str += MathLib.toLaTeX(this.im, reFlag) + 'i';
            }
            if (str.length === 0) {
                str = '0';
            }
            return str;
        };

        /**
        * Returns the (presentation) MathML representation of the number
        *
        * @return {string}
        */
        Complex.prototype.toMathML = function () {
            var str = '', reFlag = false;

            if (!this.isFinite()) {
                return '<mi>Complex' + this.re + '</mi>';
            }

            if (!MathLib.isZero(this.re)) {
                str = MathLib.toMathML(this.re);
                reFlag = true;
            }
            if (!MathLib.isZero(this.im)) {
                str += MathLib.toMathML(this.im, reFlag) + '<mo>&#x2062;</mo><mi>i</mi>';
            }
            if (str.length === 0) {
                str = '<mn>0</mn>';
            }
            return str;
        };

        /**
        * Interprets the complex number as point in the two dimensional plane
        *
        * @return {Point}
        */
        Complex.prototype.toPoint = function () {
            if (this.re == Infinity || MathLib.isNaN(this.re)) {
                return new MathLib.Point([0, 0, 0]);
            }

            return new MathLib.Point([this.re, this.im, 1]);
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Complex.prototype.toString = function () {
            var str = '';

            if (!this.isFinite()) {
                return 'Complex' + this.re;
            }

            if (!MathLib.isZero(this.re)) {
                str = MathLib.toString(this.re);
            }
            if (!MathLib.isZero(this.im)) {
                str += (this.im > 0 ? (str.length ? '+' : '') : '-') + MathLib.toString(Math.abs(this.im)) + 'i';
            }
            if (str.length === 0) {
                str = '0';
            }
            return str;
        };
        Complex.polar = function (abs, arg) {
            if (abs === Infinity) {
                return new MathLib.Complex(Infinity);
            }
            return new MathLib.Complex(abs * Math.cos(arg), abs * Math.sin(arg));
        };
        return Complex;
    })();
    MathLib.Complex = Complex;
})(MathLib || (MathLib = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) {
        d[p] = b[p];
      }
    }
    function __() {
      this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Functn, Vector
    /**
    * The line implementation of MathLib makes calculations with lines in the
    * real plane possible. (Higher dimensions will be supported later)
    *
    * @class
    * @augments Vector
    * @this {Line}
    */
    var Line = (function (_super) {
        __extends(Line, _super);
        function Line(coords) {
            _super.call(this, coords);
            this.type = 'line';
            this.dimension = 2;
        }
        /**
        * Draws the line on one or more screens
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {object} options Drawing options
        * @return {boolean}
        */
        Line.prototype.draw = function (screen, options) {
            if (Array.isArray(screen)) {
                var line = this;
                screen.forEach(function (x) {
                    x.line(line, options);
                });
            } else {
                screen.line(this, options);
            }
            return this;
        };

        /**
        * Determines if two lines are equal.
        *
        * @param {Line} l The line to compare with
        * @return {boolean}
        */
        Line.prototype.isEqual = function (l) {
            var p = this.normalize();
            l = l.normalize();

            if (this.length !== l.length) {
                return false;
            }

            return p.every(function (x, i) {
                return MathLib.isEqual(x, l[i]);
            });
        };

        /**
        * Determines if the line is finite
        *
        * @return {boolean}
        */
        Line.prototype.isFinite = function () {
            return !MathLib.isZero(this[0]) || !MathLib.isZero(this[1]);
        };

        /**
        * Determines if two lines are parallel.
        *
        * @param {Line} l The other line
        * @return {boolean}
        */
        Line.prototype.isParallelTo = function (l) {
            return MathLib.isZero(this[0] * l[1] - this[1] * l[0]);
        };

        /**
        * Calculates the meeting point of two lines
        *
        * @param {Line} l The line to intersect the current line with
        * @return {Point}
        */
        Line.prototype.meet = function (l) {
            var point, k = this;

            if (this.dimension === 2 && l.dimension === 2) {
                point = new MathLib.Point(this.vectorProduct(l).toArray());

                Object.defineProperties(point, {
                    '0': {
                        get: function () {
                            return k[1] * l[2] - k[2] * l[1];
                        },
                        set: function () {
                            MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet' });
                        },
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            return k[2] * l[0] - k[0] * l[2];
                        },
                        set: function () {
                            MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet' });
                        },
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            return k[0] * l[1] - k[1] * l[0];
                        },
                        set: function () {
                            MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet' });
                        },
                        enumerable: true
                    }
                });

                return point;
            }
        };

        /**
        * Normalizes the line.
        *
        * @return {Line}
        */
        Line.prototype.normalize = function () {
            var h = MathLib.hypot(this[0], this[1]);

            if (h !== 0) {
                return this.map(function (x) {
                    return x / h;
                });
            } else {
                return new MathLib.Line([0, 0, 1]);
            }
        };

        /**
        * Determines an parallel line through a given point.
        *
        * @param {Point} p The Point through which the line should go through
        * @return {Line}
        */
        Line.prototype.parallelThrough = function (p) {
            var l = this, parallel = new MathLib.Line([0, 0, 0]);

            Object.defineProperties(parallel, {
                '0': {
                    get: function () {
                        return -l[0] * p[2];
                    },
                    set: function () {
                        MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough' });
                    },
                    enumerable: true
                },
                '1': {
                    get: function () {
                        return -l[1] * p[2];
                    },
                    set: function () {
                        MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough' });
                    },
                    enumerable: true
                },
                '2': {
                    get: function () {
                        return l[1] * p[1] + l[0] * p[0];
                    },
                    set: function () {
                        MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough' });
                    },
                    enumerable: true
                }
            });

            return parallel;
        };
        return Line;
    })(MathLib.Vector);
    MathLib.Line = Line;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Functn, Permutation
    /**
    * The matrix implementation of MathLib makes calculations with matrices of
    * arbitrary size possible. The entries of a matrix can be numbers and complex
    * numbers.
    *
    * It is as easy as
    * ```
    * new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    * ```
    * to create the following matrix:
    *    ⎛ 1 2 3 ⎞
    *    ⎜ 4 5 6 ⎟
    *    ⎝ 7 8 9 ⎠
    *
    * @class
    * @this {Matrix}
    */
    var Matrix = (function () {
        function Matrix(matrix) {
            var _this = this;
            this.type = 'matrix';
            if (typeof matrix === 'string') {
                // If there is a < in the string we assume it's MathML
                if (matrix.indexOf('<') > -1) {
                    return MathLib.Expression.parseContentMathML(matrix).evaluate();
                } else {
                    matrix = matrix.trim().replace(/;?\n/g, '],[');
                    matrix = JSON.parse('[[' + matrix + ']]');
                }
            }
            matrix.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = matrix.length;
            this.cols = matrix[0].length;
            this.rows = matrix.length;
        }
        /**
        * Calculates the LU decomposition of a matrix
        * The result is cached.
        *
        * @return {Matrix}
        */
        Matrix.prototype.LU = function () {
            var i, j, k, t, p, LU = this.toArray(), m = this.rows, n = this.cols, permutation = [];

            for (k = 0; k < n; k++) {
                // Find the pivot
                p = k;
                for (i = k + 1; i < m; i++) {
                    if (Math.abs(LU[i][k]) > Math.abs(LU[p][k])) {
                        p = i;
                    }
                }

                // Exchange if necessary
                if (p !== k) {
                    permutation.unshift([p, k]);
                    t = LU[p];
                    LU[p] = LU[k];
                    LU[k] = t;
                }

                // The elimination
                if (LU[k][k] !== 0) {
                    for (i = k + 1; i < m; i++) {
                        LU[i][k] = MathLib.divide(LU[i][k], LU[k][k]);
                        for (j = k + 1; j < n; j++) {
                            LU[i][j] = MathLib.minus(LU[i][j], MathLib.times(LU[i][k], LU[k][j]));
                        }
                    }
                }
            }
            LU = new MathLib.Matrix(LU);
            this.LU = function () {
                return LU;
            };
            this.LUpermutation = new MathLib.Permutation(permutation);
            return LU;
        };

        /**
        * Calculates the adjoint matrix
        *
        * @return {Matrix}
        */
        Matrix.prototype.adjoint = function () {
            return this.map(MathLib.conjugate).transpose();
        };

        /**
        * Calculates the adjugate matrix
        *
        * @return {Matrix}
        */
        Matrix.prototype.adjugate = function () {
            return this.map(function (x, r, c, m) {
                return MathLib.times(m.remove(c, r).determinant(), 1 - ((r + c) % 2) * 2);
            });
        };

        /**
        * The cholesky decomposition of a matrix
        * using the Cholesky–Banachiewicz algorithm.
        * Does not change the current matrix, but returns a new one.
        * The result is cached.
        *
        * @return {Matrix}
        */
        Matrix.prototype.cholesky = function () {
            var i, ii, j, jj, k, kk, sum, choleskyMatrix, cholesky = [];

            for (i = 0, ii = this.rows; i < ii; i++) {
                cholesky.push([]);
            }

            for (i = 0, ii = this.rows; i < ii; i++) {
                for (j = 0; j < i; j++) {
                    sum = 0;
                    for (k = 0, kk = j; k < kk; k++) {
                        sum = MathLib.plus(sum, MathLib.times(cholesky[i][k], cholesky[j][k]));
                    }
                    cholesky[i][j] = (this[i][j] - sum) / cholesky[j][j];
                }

                sum = 0;
                for (k = 0, kk = j; k < kk; k++) {
                    sum = MathLib.plus(sum, MathLib.times(cholesky[i][k], cholesky[i][k]));
                }
                cholesky[i][j] = Math.sqrt(this[j][j] - sum);

                for (j++, jj = this.cols; j < jj; j++) {
                    cholesky[i][j] = 0;
                }
            }
            choleskyMatrix = new MathLib.Matrix(cholesky);

            this.cholesky = function () {
                return choleskyMatrix;
            };
            return choleskyMatrix;
        };

        /**
        * Compares the matrix to an other matrix.
        *
        * @param {Matrix} m The matrix to compare.
        * @return {number}
        */
        Matrix.prototype.compare = function (m) {
            var i, ii, j, jj;

            if (this.rows !== m.rows) {
                return MathLib.sign(this.rows - m.rows);
            }

            if (this.cols !== m.cols) {
                return MathLib.sign(this.cols - m.cols);
            }

            for (i = 0, ii = this.rows; i < ii; i++) {
                for (j = 0, jj = this.cols; j < jj; j++) {
                    if (this[i][j] - m[i][j]) {
                        return MathLib.sign(this[i][j] - m[i][j]);
                    }
                }
            }

            return 0;
        };

        /**
        * Copies the matrix
        *
        * @return {Matrix}
        */
        Matrix.prototype.copy = function () {
            return this.map(MathLib.copy);
        };

        /**
        * Calculates the determinant of the matrix via the LU decomposition.
        * The result is cached.
        *
        * @return {number|Complex}
        */
        Matrix.prototype.determinant = function () {
            var LU, determinant;

            if (!this.isSquare()) {
                MathLib.error({ message: 'Determinant of non square matrix', method: 'Matrix#determinant' });
                return;
            }

            if (this.rank() < this.rows) {
                determinant = 0;
            } else {
                LU = this.LU();
                determinant = MathLib.times(this.LUpermutation.sgn(), MathLib.times.apply(null, LU.diag()));
            }

            this.determinant = function () {
                return determinant;
            };
            return determinant;
        };

        /**
        * Returns the entries on the diagonal in an array
        *
        * @return {array}
        */
        Matrix.prototype.diag = function () {
            var diagonal = [], i, ii;
            for (i = 0, ii = Math.min(this.rows, this.cols); i < ii; i++) {
                diagonal.push(this[i][i]);
            }
            return diagonal;
        };

        /**
        * Multiplies the matrix by the inverse of a number or a matrix
        *
        * @return {Matrix|number} n The number or Matrix to be inverted and multiplied
        */
        Matrix.prototype.divide = function (n) {
            return this.times(MathLib.inverse(n));
        };

        /**
        * This function works like the Array.prototype.every function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        * @return {boolean}
        */
        Matrix.prototype.every = function (f) {
            return Array.prototype.every.call(this, function (x, i) {
                return Array.prototype.every.call(x, function (y, j) {
                    return f(y, i, j, this);
                });
            });
        };

        /**
        * This function works like the Array.prototype.forEach function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        */
        Matrix.prototype.forEach = function (f) {
            Array.prototype.forEach.call(this, function (x, i) {
                return Array.prototype.forEach.call(x, function (y, j) {
                    return f(y, i, j, this);
                });
            });
        };

        /**
        * Returns the Gershgorin circles of the matrix.
        *
        * @return {array} Returns an array of circles
        */
        Matrix.prototype.gershgorin = function () {
            var c = [], rc = [], rr = [], circles = [], i, ii;

            for (i = 0, ii = this.rows; i < ii; i++) {
                rc.push(0);
                rr.push(0);
            }

            this.forEach(function (x, i, j) {
                if (i === j) {
                    if (MathLib.is(x, 'complex')) {
                        c.push(x.toPoint());
                    } else {
                        c.push(new MathLib.Point([x, 0, 1]));
                    }
                } else {
                    rc[j] += MathLib.abs(x);
                    rr[i] += MathLib.abs(x);
                }
            });

            for (i = 0, ii = this.rows; i < ii; i++) {
                circles.push(new MathLib.Circle(c[i], Math.min(rc[i], rr[i])));
            }

            return circles;
        };

        /**
        * QR decomposition with the givens method.
        *
        * @return {[Matrix, Matrix]}
        */
        Matrix.prototype.givens = function () {
            var rows = this.rows, cols = this.cols, R = this.copy(), Q = MathLib.Matrix.identity(rows), c, s, rho, i, j, k, ri, rj, qi, qj;

            for (i = 0; i < cols; i++) {
                for (j = i + 1; j < rows; j++) {
                    if (!MathLib.isZero(R[j][i])) {
                        // We can't use the sign function here, because we want the factor
                        // to be 1 if A[i][i] is zero.
                        rho = (R[i][i] < 0 ? -1 : 1) * MathLib.hypot(R[i][i], R[j][i]);
                        c = R[i][i] / rho;
                        s = R[j][i] / rho;

                        // Apply the rotation
                        ri = [];
                        rj = [];
                        qi = [];
                        qj = [];

                        for (k = 0; k < cols; k++) {
                            ri.push(R[i][k]);
                            rj.push(R[j][k]);
                        }
                        for (k = 0; k < cols; k++) {
                            R[i][k] = rj[k] * s + ri[k] * c;
                            R[j][k] = rj[k] * c - ri[k] * s;
                        }

                        for (k = 0; k < rows; k++) {
                            qi.push(Q[k][i]);
                            qj.push(Q[k][j]);
                        }
                        for (k = 0; k < rows; k++) {
                            Q[k][i] = qi[k] * c + qj[k] * s;
                            Q[k][j] = -qi[k] * s + qj[k] * c;
                        }
                    }
                }
            }

            return [Q, R];
        };

        /**
        * Calculates the inverse matrix.
        *
        * @return {Matrix}
        */
        Matrix.prototype.inverse = function () {
            var i, ii, res, inverse, col = [], matrix = [], n = this.rows;

            if (!this.isSquare()) {
                MathLib.error({ message: 'Inverse of non square matrix', method: 'Matrix#inverse' });
                return;
            }

            for (i = 0, ii = n - 1; i < ii; i++) {
                matrix.push([]);
                col.push(0);
            }

            matrix.push([]);

            col.push(1);
            col = col.concat(col).slice(0, -1);

            for (i = 0, ii = n; i < ii; i++) {
                res = this.solve(col.slice(n - i - 1, 2 * n - i - 1));

                if (res === undefined) {
                    return;
                }

                res.forEach(function (x, i) {
                    matrix[i].push(x);
                });
            }

            inverse = new MathLib.Matrix(matrix);
            this.inverse = function () {
                return inverse;
            };
            return inverse;
        };

        /**
        * Determines if the matrix is a band matrix.
        *
        * @param {number} l The wished lower bandwidth
        * @param {number} u The wished upper bandwidth
        * @return {boolean}
        */
        Matrix.prototype.isBandMatrix = function (l, u) {
            // var i, j, ii, jj;
            if (arguments.length === 1) {
                u = l;
            }

            return this.every(function (x, i, j) {
                return (i - l <= j && i + u >= j) || MathLib.isZero(x);
            });
            // for (i = 0, ii = this.rows; i < ii; i++) {
            //   for (j = 0, jj = this.cols; j < jj; j++) {
            //     if (i - j < l && this[i][j] !== 0) {
            //       return false;
            //     }
            //   }
            // }
            // return true;
        };

        /**
        * Determines if the matrix is a diagonal matrix.
        *
        * @return {boolean}
        */
        Matrix.prototype.isDiag = function () {
            var i, j, ii, jj;
            if (Number(this.hasOwnProperty('isUpper') && this.isUpper()) + Number(this.hasOwnProperty('isLower') && this.isLower()) + Number(this.hasOwnProperty('isSymmetric') && this.isSymmetric()) > 1) {
                return true;
            }
            for (i = 0, ii = this.rows; i < ii; i++) {
                for (j = 0, jj = this.cols; j < jj; j++) {
                    if (i !== j && !MathLib.isZero(this[i][j])) {
                        return false;
                    }
                }
            }
            return true;
        };

        /**
        * Determines if the matrix is equal to an other matrix.
        *
        * @param {Matrix} matrix The matrix to compare with
        * @return {boolean}
        */
        Matrix.prototype.isEqual = function (matrix) {
            var i, j, ii, jj;
            if (this === matrix) {
                return true;
            }
            if (this.rows === matrix.rows && this.cols === matrix.cols) {
                for (i = 0, ii = this.rows; i < ii; i++) {
                    for (j = 0, jj = this.cols; j < jj; j++) {
                        if (!MathLib.isEqual(this[i][j], matrix[i][j])) {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        };

        /**
        * Determines if the matrix is a identity matrix.
        *
        * @return {boolean}
        */
        Matrix.prototype.isIdentity = function () {
            if (!this.isSquare()) {
                return false;
            }

            var isIdentity = this.every(function (x, r, c) {
                return r === c ? MathLib.isOne(x) : MathLib.isZero(x);
            });

            this.isIdentity = function () {
                return isIdentity;
            };
            return isIdentity;
        };

        /**
        * Determines if the matrix is invertible.
        *
        * @return {boolean}
        */
        Matrix.prototype.isInvertible = function () {
            return this.isSquare() && this.rank() === this.rows;
        };

        /**
        * Determines if the matrix is a lower triangular matrix.
        *
        * @return {boolean}
        */
        Matrix.prototype.isLower = function () {
            return this.slice(0, -1).every(function (x, i) {
                return x.slice(i + 1).every(MathLib.isZero);
            });
        };

        /**
        * Determines if the matrix is negative definite
        *
        * @return {boolean}
        */
        Matrix.prototype.isNegDefinite = function () {
            if (!this.isSquare()) {
                return;
            }
            if (this.rows === 1) {
                return this[0][0] < 0;
            }

            // Sylvester's criterion
            if (this.rows % 2 === 0) {
                return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
            } else {
                return this.determinant() < 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
            }
        };

        /**
        * Determines if the matrix is a orthogonal.
        *
        * @return {boolean}
        */
        Matrix.prototype.isOrthogonal = function () {
            return this.transpose().times(this).isIdentity();
        };

        /**
        * Determines if the matrix is a permutation matrix
        *
        * @return {boolean}
        */
        Matrix.prototype.isPermutation = function () {
            var rows = [], cols = [];

            return this.every(function (x, r, c) {
                if (MathLib.isOne(x)) {
                    if (rows[r] || cols[c]) {
                        return false;
                    } else {
                        rows[r] = true;
                        cols[c] = true;
                        return true;
                    }
                } else if (MathLib.isZero(x)) {
                    return true;
                }
                return false;
            }) && rows.length === this.rows && cols.length === this.cols;
        };

        /**
        * Determines if the matrix is positive definite
        *
        * @return {boolean}
        */
        Matrix.prototype.isPosDefinite = function () {
            if (!this.isSquare()) {
                return;
            }
            if (this.rows === 1) {
                return this[0][0] > 0;
            }

            // Sylvester's criterion
            return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isPosDefinite();
        };

        /**
        * Determines if the matrix has only real entries
        *
        * @return {boolean}
        */
        Matrix.prototype.isReal = function () {
            return this.every(MathLib.isReal);
        };

        /**
        * Determines if the matrix is a scalar matrix
        * (that is a multiple of the identity matrix)
        *
        * @return {boolean}
        */
        Matrix.prototype.isScalar = function () {
            var i, ii, diag = this.diag;
            if (this.hasOwnProperty('isIdentity') && this.hasOwnProperty('isZero')) {
                if (this.isIdentity() || this.isZero()) {
                    return true;
                } else {
                    return false;
                }
            }
            if (this.isDiag()) {
                for (i = 1, ii = this.rows; i < ii; i++) {
                    if (!MathLib.isEqual(diag[0], diag[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        };

        /**
        * Determines if the matrix is a square matrix
        *
        * @return {boolean}
        */
        Matrix.prototype.isSquare = function () {
            return this.cols === this.rows;
        };

        /**
        * Determines if the matrix is symmetric
        *
        * @return {boolean}
        */
        Matrix.prototype.isSymmetric = function () {
            var i, ii, j, jj, isSymmetric = true;

            if (!this.isSquare()) {
                isSymmetric = false;
            } else {
                lp:
                for (i = 0, ii = this.rows; i < ii; i++) {
                    for (j = i + 1, jj = this.cols; j < jj; j++) {
                        if (!MathLib.isEqual(this[i][j], this[j][i])) {
                            isSymmetric = false;
                            break lp;
                        }
                    }
                }
            }

            this.isSymmetric = function () {
                return isSymmetric;
            };
            return isSymmetric;
        };

        /**
        * Determines if the matrix is a upper triangular matrix
        *
        * @return {boolean}
        */
        Matrix.prototype.isUpper = function () {
            return this.slice(1).every(function (x, i) {
                return x.slice(0, i + 1).every(MathLib.isZero);
            });
        };

        /**
        * Determines if the matrix is a vector
        * (only one row or one column)
        *
        * @return {boolean}
        */
        Matrix.prototype.isVector = function () {
            return (this.rows === 1) || (this.cols === 1);
        };

        /**
        * Determines if the matrix the zero matrix
        * The result is cached.
        *
        * @return {boolean}
        */
        Matrix.prototype.isZero = function () {
            var isZero = this.every(MathLib.isZero);

            this.isZero = function () {
                return isZero;
            };
            return isZero;
        };

        /**
        * This function works like the Array.prototype.map function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        * @return {Matrix}
        */
        Matrix.prototype.map = function (f) {
            var m = this;
            return new MathLib.Matrix(Array.prototype.map.call(this, function (x, i) {
                return Array.prototype.map.call(x, function (y, j) {
                    return f(y, i, j, m);
                });
            }));
        };

        /**
        * Calculates a minor
        *
        * @param {number} r The row to be removed.
        * @param {number} c The column to be removed.
        * @return {Matrix}
        */
        Matrix.prototype.minor = function (r, c) {
            return this.remove(r, c).determinant();
        };

        /**
        * Calculates the difference of two matrices
        *
        * @param {Matrix} subtrahend The matrix to be subtracted.
        * @return {Matrix}
        */
        Matrix.prototype.minus = function (subtrahend) {
            if (this.rows === subtrahend.rows && this.cols === subtrahend.cols) {
                return this.plus(subtrahend.negative());
            } else {
                MathLib.error({ message: 'Matrix sizes not matching', method: 'Matrix#minus' });
                return;
            }
        };

        /**
        * Returns the negative matrix
        *
        * @return {Matrix}
        */
        Matrix.prototype.negative = function () {
            var i, ii, negative = [];

            for (i = 0, ii = this.rows; i < ii; i++) {
                negative.push(this[i].map(MathLib.negative));
            }
            return new MathLib.Matrix(negative);
        };

        /**
        * This function adds a matrix to the current matrix
        * and returns the result as a new matrix.
        *
        * @param {Matrix} summand The matrix to be added.
        * @return {Matrix}
        */
        Matrix.prototype.plus = function (summand) {
            var i, ii, j, jj, sum = [];

            if (this.rows === summand.rows && this.cols === summand.cols) {
                for (i = 0, ii = this.rows; i < ii; i++) {
                    sum[i] = [];
                    for (j = 0, jj = this.cols; j < jj; j++) {
                        sum[i][j] = MathLib.plus(this[i][j], summand[i][j]);
                    }
                }
                return new MathLib.Matrix(sum);
            } else {
                MathLib.error({ message: 'Matrix sizes not matching', method: 'Matrix#plus' });
                return;
            }
        };

        /**
        * Determines the rank of the matrix
        *
        * @return {number}
        */
        Matrix.prototype.rank = function () {
            var i, j, rank = 0, mat = this.rref();

            rankloop:
            for (i = Math.min(this.rows, this.cols) - 1; i >= 0; i--) {
                for (j = this.cols - 1; j >= i; j--) {
                    if (!MathLib.isZero(mat[i][j])) {
                        rank = i + 1;
                        break rankloop;
                    }
                }
            }

            this.rank = function () {
                return rank;
            };
            return rank;
        };

        /**
        * This function works like the Array.prototype.reduce function.
        *
        * @return {any}
        */
        Matrix.prototype.reduce = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.reduce.apply(this, args);
        };

        /**
        * This function removes the specified rows and/or columns for the matrix.
        *
        * @param {number|array} row The row(s) to be removed.
        * @param {number|array} col The column(s) to be removed.
        * @return {Matrix}
        */
        Matrix.prototype.remove = function (row, col) {
            var rest = this.toArray();

            if (row || row === 0) {
                if (typeof row === 'number') {
                    row = [row];
                }
                rest = rest.filter(function (x, i) {
                    return row.indexOf(i) === -1;
                });
            }

            if (col || col === 0) {
                if (typeof col === 'number') {
                    col = [col];
                }
                col = col.sort().reverse();
                col.forEach(function (n) {
                    rest = rest.map(function (x) {
                        x.splice(n, 1);
                        return x;
                    });
                });
            }

            return new MathLib.Matrix(rest);
        };

        /**
        * Calculate the reduced row echelon form (rref) of a matrix.
        *
        * @return {Matrix}
        */
        Matrix.prototype.rref = function () {
            var i, ii, j, jj, k, kk, pivot, factor, swap, lead = 0, rref = this.toArray();

            for (i = 0, ii = this.rows; i < ii; i++) {
                if (this.cols <= lead) {
                    return new MathLib.Matrix(rref);
                }

                // Find the row with the biggest pivot element
                j = i;
                while (rref[j][lead] === 0) {
                    j++;
                    if (this.rows === j) {
                        j = i;
                        lead++;
                        if (this.cols === lead) {
                            return new MathLib.Matrix(rref);
                        }
                    }
                }

                // Swap the pivot row to the top
                if (i !== j) {
                    swap = rref[j];
                    rref[j] = rref[i];
                    rref[i] = swap;
                }

                pivot = rref[i][lead];

                for (j = lead, jj = this.cols; j < jj; j++) {
                    rref[i][j] /= pivot;
                }

                for (j = 0, jj = this.rows; j < jj; j++) {
                    if (j === i) {
                        continue;
                    }
                    factor = rref[j][lead];
                    for (k = 0, kk = this.cols; k < kk; k++) {
                        rref[j][k] = MathLib.minus(rref[j][k], MathLib.times(factor, rref[i][k]));
                    }
                }
                lead++;
            }
            return new MathLib.Matrix(rref);
        };

        /**
        * This function works like the Array.prototype.slice function.
        *
        * @return {array}
        */
        Matrix.prototype.slice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.slice.apply(this, args);
        };

        /**
        * Solves the system of linear equations Ax = b
        * given by the matrix A and a vector or point b.
        *
        * @param {Vector} b The b in Ax = b
        * @return {Vector}
        */
        Matrix.prototype.solve = function (b) {
            // Ax = b -> LUx = b. Then y is defined to be Ux
            var LU = this.LU(), i, j, n = b.length, x = [], y = [];

            // Permutate b according to the LU decomposition
            b = this.LUpermutation.applyTo(b);

            for (i = 0; i < n; i++) {
                y[i] = b[i];
                for (j = 0; j < i; j++) {
                    y[i] = MathLib.minus(y[i], MathLib.times(LU[i][j], y[j]));
                }
            }

            for (i = n - 1; i >= 0; i--) {
                x[i] = y[i];
                for (j = i + 1; j < n; j++) {
                    x[i] = MathLib.minus(x[i], MathLib.times(LU[i][j], x[j]));
                }

                if (LU[i][i] === 0) {
                    if (x[i] !== 0) {
                        return undefined;
                    } else {
                        x[i] = x[i];
                    }
                } else {
                    x[i] = MathLib.divide(x[i], LU[i][i]);
                }
            }

            if (MathLib.type(b) === 'array') {
                return x;
            } else {
                return new b.constructor(x);
            }
        };

        /**
        * This function works like the Array.prototype.some function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        * @return {boolean}
        */
        Matrix.prototype.some = function (f) {
            return Array.prototype.some.call(this, function (x, i) {
                return Array.prototype.some.call(x, function (y, j) {
                    return f(y, i, j, this);
                });
            });
        };

        /**
        * Multiplies the current matrix with a number, a matrix, a point or a vector.
        *
        * @param {number|Matrix|Point|Rational|Vector} a The object to multiply to the current matrix
        * @return {Matrix|Point|Vector}
        */
        Matrix.prototype.times = function (a) {
            var i, ii, j, jj, k, kk, product = [], entry;

            if (a.type === 'rational') {
                a = a.toNumber();
            }
            if (typeof a === 'number' || a.type === 'complex') {
                return this.map(function (x) {
                    return MathLib.times(x, a);
                });
            } else if (a.type === 'matrix') {
                if (this.cols === a.rows) {
                    for (i = 0, ii = this.rows; i < ii; i++) {
                        product[i] = [];
                        for (j = 0, jj = a.cols; j < jj; j++) {
                            entry = 0;

                            for (k = 0, kk = this.cols; k < kk; k++) {
                                entry = MathLib.plus(entry, MathLib.times(this[i][k], a[k][j]));
                            }
                            product[i][j] = entry;
                        }
                    }
                    return new MathLib.Matrix(product);
                } else {
                    MathLib.error({ message: 'Matrix sizes not matching', method: 'Matrix#times' });
                    return;
                }
            } else if (a.type === 'point' || a.type === 'vector') {
                if (this.cols === a.length) {
                    for (i = 0, ii = this.rows; i < ii; i++) {
                        entry = 0;
                        for (j = 0, jj = this.cols; j < jj; j++) {
                            entry = MathLib.plus(entry, MathLib.times(this[i][j], a[j]));
                        }
                        product.push(entry);
                    }
                    return new a.constructor(product);
                }
            }
        };

        /**
        * Converts the matrix to a two-dimensional array
        *
        * @return {array}
        */
        Matrix.prototype.toArray = function () {
            return Array.prototype.map.call(this, function (x) {
                return Array.prototype.map.call(x, function (y) {
                    return MathLib.copy(y);
                });
            });
        };

        /**
        * Converts the columns of the matrix to vectors
        *
        * @return {array}
        */
        Matrix.prototype.toColVectors = function () {
            return this.transpose().toRowVectors();
        };

        /**
        * converting the matrix to content MathML
        *
        * @return {string}
        */
        Matrix.prototype.toContentMathML = function () {
            return this.reduce(function (str, x) {
                return str + x.reduce(function (prev, cur) {
                    return prev + MathLib.toContentMathML(cur);
                }, '<matrixrow>') + '</matrixrow>';
            }, '<matrix>') + '</matrix>';
        };

        /**
        * Converting the matrix to LaTeX
        *
        * @return {string}
        */
        Matrix.prototype.toLaTeX = function () {
            return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
                return str + x.reduce(function (prev, cur) {
                    return prev + ' & ' + MathLib.toLaTeX(cur);
                }) + '\\\n';
            }, '').slice(0, -2) + '\n\\end{pmatrix}';
        };

        /**
        * converting the matrix to (presentation) MathML
        *
        * @return {string}
        */
        Matrix.prototype.toMathML = function () {
            return this.reduce(function (str, x) {
                return str + x.reduce(function (prev, cur) {
                    return prev + '<mtd>' + MathLib.toMathML(cur) + '</mtd>';
                }, '<mtr>') + '</mtr>';
            }, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
        };

        /**
        * Converts the rows of the matrix to vectors
        *
        * @return {array}
        */
        Matrix.prototype.toRowVectors = function () {
            return this.toArray().map(function (v) {
                return new MathLib.Vector(v);
            });
        };

        /**
        * Creating a custom .toString() function
        *
        * @return {string}
        */
        Matrix.prototype.toString = function () {
            return this.reduce(function (str, x) {
                return str + x.reduce(function (prev, cur) {
                    return prev + '\t' + MathLib.toString(cur);
                }) + '\n';
            }, '').slice(0, -1);
        };

        /**
        * Calculating the trace of the matrix
        *
        * @return {number|Complex}
        */
        Matrix.prototype.trace = function () {
            var trace = MathLib.plus.apply(null, this.diag());

            this.trace = function () {
                return trace;
            };
            return trace;
        };

        /**
        * Calculating the transpose of the matrix
        * The result is cached.
        *
        * @return {Matrix}
        */
        Matrix.prototype.transpose = function () {
            var transposedMatrix, row, i, j, ii, jj, transpose = [];

            for (i = 0, ii = this.cols; i < ii; i++) {
                row = [];
                for (j = 0, jj = this.rows; j < jj; j++) {
                    row.push(this[j][i]);
                }
                transpose.push(row);
            }

            transposedMatrix = new MathLib.Matrix(transpose);
            this.transpose = function () {
                return transposedMatrix;
            };
            return transposedMatrix;
        };
        Matrix.givensMatrix = function (n, i, k, phi) {
            var givens = MathLib.Matrix.identity(n);
            givens[k][k] = givens[i][i] = Math.cos(phi);
            givens[i][k] = Math.sin(phi);
            givens[k][i] = -givens[i][k];
            return givens;
        };

        Matrix.identity = function (n) {
            var row = [], matrix = [], i, ii;
            n = n || 1;

            for (i = 0, ii = n - 1; i < ii; i++) {
                row.push(0);
            }
            row.push(1);
            row = row.concat(row);
            row = row.slice(0, -1);

            for (i = 0, ii = n; i < ii; i++) {
                matrix.push(row.slice(n - i - 1, 2 * n - i - 1));
            }

            return new MathLib.Matrix(matrix);
        };

        Matrix.numbers = function (n, r, c) {
            var i, ii, row = [], matrix = [];

            for (i = 0, ii = c || r || 1; i < ii; i++) {
                row.push(n);
            }
            for (i = 0, ii = r || 1; i < ii; i++) {
                matrix.push(row.slice(0));
            }
            return new MathLib.Matrix(matrix);
        };

        Matrix.one = function (r, c) {
            r = r || 1;
            c = c || 1;
            return MathLib.Matrix.numbers(1, r, c);
        };

        Matrix.random = function (r, c) {
            var row, matrix = [], i, j, ii, jj;
            for (i = 0, ii = r || 1; i < ii; i++) {
                row = [];
                for (j = 0, jj = c || r || 1; j < jj; j++) {
                    row.push(Math.random());
                }
                matrix.push(row);
            }
            return new MathLib.Matrix(matrix);
        };

        Matrix.zero = function (r, c) {
            r = r || 1;
            c = c || 1;
            return MathLib.Matrix.numbers(0, r, c);
        };
        return Matrix;
    })();
    MathLib.Matrix = Matrix;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Functn, Matrix
    /**
    * The permutation class for MathLib
    *
    * @class
    * @this {Permutation}
    */
    var Permutation = (function () {
        function Permutation(p) {
            var _this = this;
            this.type = 'permutation';
            var cycle, permutation;

            if (Array.isArray(p[0])) {
                cycle = p;
                permutation = Permutation.cycleToList(cycle);
            } else {
                permutation = p;
                cycle = Permutation.listToCycle(permutation);
            }

            permutation.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = permutation.length;
            this.cycle = cycle;
        }
        /**
        * Applies the permutation to a number or a array/matrix/point/vector
        *
        * @param {number|array|Matrix|Point|Vector} n The object to apply the permutation to
        * @return {number|array|Matrix|Point|Vector}
        */
        Permutation.prototype.applyTo = function (n) {
            var p, permutatedObj;
            if (typeof n === 'number') {
                if (n >= this.length) {
                    return n;
                }
                return this[n];
            } else {
                p = this;
                permutatedObj = n.map(function (x, i) {
                    return n[p.applyTo(i)];
                });

                return (n.type === undefined ? permutatedObj : new n.constructor(permutatedObj));
            }
        };

        /**
        * Compares two permutations.
        *
        * @param {Permutation} p The permutation to compare
        * @return {number}
        */
        Permutation.prototype.compare = function (p) {
            var i, ii;

            if (this.length !== p.length) {
                return MathLib.sign(this.length - p.length);
            }

            for (i = 0, ii = this.length; i < ii; i++) {
                if (p[i] - this[i]) {
                    return MathLib.sign(this[i] - p[i]);
                }
            }

            return 0;
        };

        /**
        * Converts a cycle representation to a list representation
        *
        * @param {array} cycle The cycle to be converted
        * @return {array}
        */
        Permutation.cycleToList = function (cycle) {
            var index, list = [], cur, i, ii, j, jj, max;

            max = cycle.map(function (b) {
                return Math.max.apply(null, b);
            });
            max = Math.max.apply(null, max);

            for (i = 0, ii = max; i <= ii; i++) {
                cur = i;
                for (j = 0, jj = cycle.length; j < jj; j++) {
                    index = cycle[j].indexOf(cur);
                    if (++index) {
                        cur = cycle[j][index % cycle[j].length];
                    }
                }
                list.push(cur);
            }
            return list;
        };

        /**
        * Calculates the inverse of the permutation
        *
        * @return {Permutation}
        */
        Permutation.prototype.inverse = function () {
            var cycle = this.cycle.slice(0);
            cycle.reverse().forEach(function (e) {
                e.reverse();
            });
            return new MathLib.Permutation(cycle);
        };

        /**
        * Converts a list representation to a cycle representation
        *
        * @param {array} list The list to be converted
        * @return {array}
        */
        Permutation.listToCycle = function (list) {
            var finished = [], cur, i, ii, cycle, cycles = [];

            for (i = 0, ii = list.length; i < ii; i++) {
                cur = i;
                cycle = [];
                while (!finished[cur]) {
                    finished[cur] = true;
                    cycle.push(cur);
                    cur = list[cur];
                }
                if (cycle.length) {
                    cycles.push(cycle);
                }
            }
            return cycles;
        };

        /**
        * Works like Array.prototype.map.
        *
        * @return {Permutation}
        */
        Permutation.prototype.map = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return new MathLib.Permutation(Array.prototype.map.apply(this, args));
        };

        /**
        * Calculates the signum of the permutation
        *
        * @return {number}
        */
        Permutation.prototype.sgn = function () {
            var i, ii, count = 0;

            for (i = 0, ii = this.cycle.length; i < ii; i++) {
                count += this.cycle[i].length;
            }
            count += this.cycle.length;
            return -2 * (count % 2) + 1;
        };

        /**
        * Multiplies two permutations
        *
        * @param {Permutation} p The permutation to multiply
        * @return {Permutation}
        */
        Permutation.prototype.times = function (p) {
            var a = this;
            return p.map(function (x) {
                return a[x];
            });
        };

        /**
        * Converts the permuatation to a matrix.
        *
        * @param {number} n The size of the matrix
        * @return {Matrix}
        */
        Permutation.prototype.toMatrix = function (n) {
            var row = [], matrix = [], index, i, ii;
            n = n || this.length;

            for (i = 0, ii = n - 1; i < ii; i++) {
                row.push(0);
            }
            row = row.concat([1]).concat(row);
            for (i = 0, ii = n; i < ii; i++) {
                index = n - this.applyTo(i) - 1;
                matrix.push(row.slice(index, index + n));
            }
            return new MathLib.Matrix(matrix);
        };

        /**
        * String representation of the permutation.
        *
        * @return {string}
        */
        Permutation.prototype.toString = function () {
            var str = '';
            this.cycle.forEach(function (elem) {
                str += '(' + elem.toString() + ')';
            });
            return str;
        };
        Permutation.id = new Permutation([[]]);
        return Permutation;
    })();
    MathLib.Permutation = Permutation;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Functn, Matrix
    /**
    * The conic implementation of MathLib makes calculations with conics possible.
    *
    * @class Conic
    * @this {Conic}
    */
    var Conic = (function () {
        function Conic(primal, dual) {
            this.type = 'conic';
            if (primal.type !== 'matrix') {
                primal = new MathLib.Matrix(primal);
            }
            this.primal = primal;

            //		if (!dual) {
            //			dual = primal.adjugate();
            //		}
            //		else if (!primal.times(dual).isScalar()) {
            //			// Throw error
            //		}
            if (primal.rank() > 1) {
                Object.defineProperties(this, {
                    'dual': {
                        get: function () {
                            return this.primal.adjugate();
                        },
                        set: function () {
                        },
                        enumerable: true,
                        configurable: true
                    }
                });
            } else {
                this.dual = dual;
            }
        }
        /**
        * Draws the conic on one or more screens
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {object} options Drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {boolean}
        */
        Conic.prototype.draw = function (screen, options, redraw) {
            if (typeof redraw === "undefined") { redraw = false; }
            if (Array.isArray(screen)) {
                var conic = this;
                screen.forEach(function (x) {
                    conic.draw(x, options);
                });
            } else {
                options.from = 0;
                options.to = 2 * Math.PI;
                options.conic = this;

                var lines, alpha, cos, sin, sgn, a = this.primal[0][0], b = this.primal[0][1] * 2, c = this.primal[1][1], d = this.primal[0][2] * 2, e = this.primal[1][2] * 2, disc = 4 * a * c - b * b, rank = this.primal.rank(), cx = (b * e - 2 * c * d) / (4 * a * c - b * b), cy = (b * d - 2 * a * e) / (4 * a * c - b * b), normalForm = this.normalize(), A = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[0][0])), C = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[1][1]));

                if (rank === 3) {
                    alpha = Math.atan2(b, a - c) / 2;
                    cos = Math.cos(alpha);
                    sin = Math.sin(alpha);

                    // Parabola
                    if (disc === 0) {
                        options.from = -10;
                        options.to = 10;

                        var param = -this.primal[1][2] / (2 * this.primal[0][0]);
                        cx = 0;
                        cy = this.primal[2][2] / this.primal[0][0];

                        screen.path([
                            function (t) {
                                return cx + cos * param * t * t - sin * 2 * param * t;
                            },
                            function (t) {
                                return cy + sin * param * t * t + cos * 2 * param * t;
                            }
                        ], options, redraw);
                    } else if (disc > 0) {
                        options.from = 0;
                        options.to = 2 * Math.PI;

                        screen.path([
                            function (t) {
                                return cx + cos * Math.cos(t) * A - sin * Math.sin(t) * C;
                            },
                            function (t) {
                                return cy + sin * Math.cos(t) * A + cos * Math.sin(t) * C;
                            }
                        ], options, redraw);
                    } else if (disc < 0) {
                        options.from = 0;
                        options.to = 2 * Math.PI;

                        // This function changes the direction of the path for the second branch.
                        // Otherwise we get some lines which shouldn't be there.
                        sgn = function (t) {
                            return +((t + Math.PI / 2) % (2 * Math.PI) < Math.PI) * 2 - 1;
                        };

                        if (normalForm.primal[2][2] * normalForm.primal[0][0] > 0) {
                            var swap = A;
                            A = C;
                            C = swap;

                            cos = Math.cos(alpha + Math.PI / 2);
                            sin = Math.sin(alpha + Math.PI / 2);
                        } else {
                            cos = Math.cos(alpha);
                            sin = Math.sin(alpha);
                        }

                        screen.path([
                            function (t) {
                                return cx + cos * MathLib.sec(t) * A - sin * MathLib.tan(t) * C * sgn(t);
                            },
                            function (t) {
                                return cy + sin * MathLib.sec(t) * A + cos * MathLib.tan(t) * C * sgn(t);
                            }
                        ], options, redraw);
                    }
                } else if (rank === 2) {
                    lines = this.splitDegenerated();

                    screen.line(lines[0], options);
                    screen.line(lines[1], options);
                } else if (rank === 1) {
                    lines = this.splitDegenerated();

                    screen.line(lines[0], options);
                }
            }
            return this;
        };

        /**
        * Calculates the eccentricity of a conic.
        *
        * @return {number}
        */
        Conic.prototype.eccentricity = function () {
            var normalform = this.normalize(), a = normalform.primal[0][0], c = normalform.primal[1][1];

            if (!this.isDegenerated()) {
                // parabola
                if (c === 0) {
                    return 1;
                }
                if (c > 0) {
                    return Math.sqrt(1 - c / a);
                }
                return Math.sqrt(1 - a / c);
            }
        };

        /**
        * Determines if a conic is degenerated.
        *
        * @return {boolean}
        */
        Conic.prototype.isDegenerated = function () {
            return this.primal.rank() !== 3;
        };

        /**
        * Determines if two conics are equal.
        *
        * @param {Conic} conic The conic to be compared
        * @return {boolean}
        */
        Conic.prototype.isEqual = function (conic) {
            if (this === conic) {
                return true;
            }

            var compare = function (M, N) {
                var i, j, m, n;

                if (M === N) {
                    return true;
                }

                nonZeroSearch:
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (M[i][j] !== 0) {
                            break nonZeroSearch;
                        }
                    }
                }

                if (N[i][j] === 0) {
                    return false;
                }

                m = M[i][j];
                n = N[i][j];

                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (n / m * M[i][j] !== N[i][j]) {
                            return false;
                        }
                    }
                }

                return true;
            };

            return compare(this.primal, conic.primal) && compare(this.dual, conic.dual);
        };

        /**
        * Calculates the latusRectum of a conic.
        *
        * @return {number}
        */
        Conic.prototype.latusRectum = function () {
            var normalForm = this.normalize(), a = normalForm.primal[0][0], c = normalForm.primal[1][1], min = Math.min(Math.abs(a), Math.abs(c)), max = Math.max(Math.abs(a), Math.abs(c));

            if (!this.isDegenerated()) {
                // Parabola
                if (c === 0) {
                    return -2 * normalForm.primal[1][2] / a;
                }

                return 2 * Math.sqrt(max) / min;
            }
        };

        /**
        * Calculates the linear eccentricity of a conic.
        *
        * @return {number}
        */
        Conic.prototype.linearEccentricity = function () {
            var normalForm = this.normalize(), a = normalForm.primal[0][0], c = normalForm.primal[1][1], max = Math.max(Math.abs(a), Math.abs(c)), min = Math.min(Math.abs(a), Math.abs(c));

            if (!this.isDegenerated()) {
                // parabola
                if (c === 0) {
                    return normalForm.primal[1][2] / (-2 * a);
                }

                if (c > 0) {
                    return Math.sqrt(1 / min - 1 / max);
                }
                return Math.sqrt(1 / max + 1 / min);
            }
        };

        /**
        * Calculates the meet of the conic with a line or a conic.
        *
        * @param {Line|Conic} x The line or conic to intersect with
        * @return {Point[]}
        */
        Conic.prototype.meet = function (x) {
            var B, C, alpha, i, j, p1, p2, Ml, a, b, c, d, Delta0, Delta1, lambda, degenerated, lines, A = this.primal;

            if (x.type === 'line') {
                var setter = function () {
                    MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Conic#meet' });
                }, recalculate = function () {
                    Ml = new MathLib.Matrix([[0, x[2], -x[1]], [-x[2], 0, x[0]], [x[1], -x[0], 0]]);
                    B = Ml.transpose().times(A).times(Ml);

                    if (!MathLib.isZero(x[0])) {
                        alpha = Math.sqrt(B[2][1] * B[1][2] - B[1][1] * B[2][2]) / x[0];
                    } else if (!MathLib.isZero(x[1])) {
                        alpha = Math.sqrt(B[0][2] * B[2][0] - B[2][2] * B[0][0]) / x[1];
                    } else {
                        alpha = Math.sqrt(B[1][0] * B[0][1] - B[0][0] * B[1][1]) / x[2];
                    }

                    C = Ml.times(alpha).plus(B);

                    nonZeroSearch:
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 3; j++) {
                            if (C[i][j] !== 0) {
                                break nonZeroSearch;
                            }
                        }
                    }
                };

                recalculate();

                p1 = new MathLib.Point(C[i]);
                Object.defineProperties(p1, {
                    '0': {
                        get: function () {
                            recalculate();
                            return C[i][0];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            recalculate();
                            return C[i][1];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            recalculate();
                            return C[i][2];
                        },
                        set: setter,
                        enumerable: true
                    }
                });

                p2 = new MathLib.Point([C[0][j], C[1][j], C[2][j]]);
                Object.defineProperties(p2, {
                    '0': {
                        get: function () {
                            recalculate();
                            return C[0][j];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            recalculate();
                            return C[1][j];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            recalculate();
                            return C[2][j];
                        },
                        set: setter,
                        enumerable: true
                    }
                });

                return [p1, p2];
            } else if (x.type === 'conic') {
                B = x.primal;
                a = A.determinant();
                b = (new MathLib.Matrix([A[0], A[1], B[2]])).plus(new MathLib.Matrix([A[0], B[1], A[2]])).plus(new MathLib.Matrix([B[0], A[1], A[2]])).determinant();
                c = (new MathLib.Matrix([A[0], B[1], B[2]])).plus(new MathLib.Matrix([B[0], A[1], B[2]])).plus(new MathLib.Matrix([B[0], B[1], A[2]])).determinant();
                d = B.determinant();
                Delta0 = b * b - 3 * a * c;
                Delta1 = 2 * b * b - 9 * a * b * c + 27 * a * a * d;
                C = MathLib.cbrt((Delta1 + Math.sqrt(Math.pow(Delta1, 2) - 4 * Math.pow(Delta0, 3))) / 2);
                lambda = -(b + C + Delta0 / C) / (3 * a);
                degenerated = new MathLib.Conic(B.times(lambda).plus(A));
                lines = degenerated.splitDegenerated();

                return this.meet(lines[0]).concat(this.meet(lines[1]));
            }
        };

        /**
        * Calculates the normal form of a conic.
        *
        * @return {Conic}
        */
        Conic.prototype.normalize = function () {
            var A = this.primal[0][0], B = this.primal[0][1] * 2, C = this.primal[1][1], D = this.primal[0][2] * 2, E = this.primal[1][2] * 2, F = this.primal[2][2], r = Math.atan2(B, A - C) / 2, cos = Math.cos(r), sin = Math.sin(r), a = A * cos * cos + B * sin * cos + C * sin * sin, c = A * sin * sin - B * sin * cos + C * cos * cos, d = D * cos + E * sin, e = E * cos - D * sin, f = F;

            if (a !== 0) {
                f += -d * d / (4 * a);
                d = 0;
            }

            if (c !== 0) {
                f += -e * e / (4 * c);
                e = 0;
            }

            if (f !== 0) {
                a = -a / f;
                c = -c / f;
                d = -d / f;
                e = -e / f;
                f = -1;
            }

            return new MathLib.Conic(new MathLib.Matrix([[a, 0, d / 2], [0, c, e / 2], [d / 2, e / 2, f]]));
        };

        /**
        * Calculates the four polarity of a conic.
        *
        * @return {Point[]}
        */
        Conic.prototype.polarity = function (x) {
            var object, m, c = this;

            if (x.type === 'line') {
                object = new MathLib.Point([0, 0, 0]);
                m = 'dual';
            } else if (x.type === 'point') {
                object = new MathLib.Line([0, 0, 0]);
                m = 'primal';
            }

            Object.defineProperties(object, {
                '0': {
                    get: function () {
                        return c[m][0][0] * x[0] + c[m][0][1] * x[1] + c[m][0][2] * x[2];
                    },
                    set: function () {
                        MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.', method: 'Conic#polarity' });
                    },
                    enumerable: true
                },
                '1': {
                    get: function () {
                        return c[m][1][0] * x[0] + c[m][1][1] * x[1] + c[m][1][2] * x[2];
                    },
                    set: function () {
                        MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.', method: 'Conic#polarity' });
                    },
                    enumerable: true
                },
                '2': {
                    get: function () {
                        return c[m][2][0] * x[0] + c[m][2][1] * x[1] + c[m][2][2] * x[2];
                    },
                    set: function () {
                        MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.', method: 'Conic#polarity' });
                    },
                    enumerable: true
                }
            });

            return object;
        };

        /**
        * Splits a conic into one or two lines if the conic is degenerated.
        *
        * @return {boolean}
        */
        Conic.prototype.splitDegenerated = function () {
            var n, i, j, B, C, p0, p1, p2, rank = this.primal.rank(), nonZeroSearch = function (C) {
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (C[i][j] !== 0) {
                            return;
                        }
                    }
                }
            };

            if (rank === 2) {
                if (this.dual[0][0] !== 0) {
                    n = 0;
                } else if (this.dual[1][1] !== 0) {
                    n = 1;
                } else {
                    n = 2;
                }

                if (this.dual[n][n] < 0) {
                    B = this.dual.negative();
                } else {
                    B = this.dual;
                }

                p0 = B[0][n] / Math.sqrt(B[n][n]);
                p1 = B[1][n] / Math.sqrt(B[n][n]);
                p2 = B[2][n] / Math.sqrt(B[n][n]);
                C = this.primal.plus(new MathLib.Matrix([[0, p2, -p1], [-p2, 0, p0], [p1, -p0, 0]]));

                nonZeroSearch(C);

                return [new MathLib.Line(C[i]), new MathLib.Line([C[0][j], C[1][j], C[2][j]])];
            } else if (rank === 1) {
                nonZeroSearch(this.primal);
                return [new MathLib.Line(this.primal[i]), new MathLib.Line(this.primal[i])];
            }
        };

        /**
        * Calculates the conic through five points.
        *
        * @param {Point} p The first point
        * @param {Point} q The second point
        * @param {Point} r The third point
        * @param {Point} s The fourth point
        * @param {Point} t The fifth point
        * @return {Conic}
        */
        Conic.throughFivePoints = function (p, q, r, s, t) {
            var conic = new MathLib.Conic(new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));

            Object.defineProperties(conic, {
                'primal': {
                    get: function () {
                        var G = p.vectorProduct(r).outerProduct(q.vectorProduct(s)), H = p.vectorProduct(s).outerProduct(q.vectorProduct(r)), M = G.times(t.times(H).scalarProduct(t)).minus(H.times(t.times(G).scalarProduct(t)));
                        return M.transpose().plus(M);
                    },
                    set: function () {
                    },
                    enumerable: true,
                    configurable: true
                }
            });

            return conic;
        };
        return Conic;
    })();
    MathLib.Conic = Conic;
})(MathLib || (MathLib = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) {
        d[p] = b[p];
      }
    }
    function __() {
      this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Complex, Vector
    /**
    * The point implementation of MathLib makes calculations with point in
    * arbitrary dimensions possible.
    *
    * MathLib uses the homogeneous form of a point for calculations and storage.
    *
    * To create the point (4, 2) on the two dimensional plane use
    * `new MathLib.Point([4, 2, 1])`
    * Alternatively you can use
    * `new MathLib.Point(4, 2)`
    * The 1 will be added for you.
    *
    * @class
    * @augments Vector
    * @this {Point}
    */
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point(coords) {
            _super.call(this, arguments.length > 1 ? Array.prototype.slice.call(arguments).concat(1) : coords);
            this.type = 'point';

            this.dimension = 2;
        }
        /**
        * Calculates the distance crossratio (A,B,C,D) of four points
        * as seen from the current point.
        *
        * @param {Point} a The point A
        * @param {Point} b The point B
        * @param {Point} c The point C
        * @param {Point} d The point D
        * @return {number}
        */
        Point.prototype.crossRatio = function (a, b, c, d) {
            var xa = this.vectorProduct(a), xb = this.vectorProduct(b);

            return xa.scalarProduct(c) * xb.scalarProduct(d) / (xa.scalarProduct(d) * xb.scalarProduct(c));
        };

        /**
        * Calculates the distance to an other point.
        * If no other point is provided, it calculates the distance to the origin.
        *
        * @param {Point} p The point to calculate the distance to
        * @return {number}
        */
        Point.prototype.distanceTo = function (p /*, geom = MathLib.Geometry.active*/ ) {
            if (arguments.length === 0) {
                return MathLib.hypot.apply(null, this.slice(0, -1)) / Math.abs(this[this.dimension]);
            }

            if (p.type === 'point' && this.dimension === p.dimension) {
                return MathLib.hypot.apply(null, this.normalize().minus(p.normalize()).slice(0, -1));
            }
            //	if (p.type === 'point' && this.dimension === p.dimension) {
            //		var Otp = this.times(geom.fundamentalConic.primal).times(p),
            //				Ott = this.times(geom.fundamentalConic.primal).times(this),
            //				Opp = p.times(geom.fundamentalConic.primal).times(p),
            //				Dtp = Math.sqrt(Otp * Otp - Ott * Opp);
            //
            //		return MathLib.Geometry.active.cDist * Math.log((Otp + Dtp) / (Otp - Dtp));
            //	}
        };

        /**
        * Draws the point on a canvas or svg element.
        *
        * @param {Screen} screen The screen to draw onto
        * @param {object} options Drawing options
        * @return {Point} The current point
        */
        Point.prototype.draw = function (screen, options) {
            if (Array.isArray(screen)) {
                var point = this;
                screen.forEach(function (x) {
                    x.point(point, options);
                });
            } else {
                screen.point(this, options);
            }

            return this;
        };

        /**
        * Determines if the point has the same coordinates as an other point
        *
        * @param {Point} q The point to compare
        * @return {boolean}
        */
        Point.prototype.isEqual = function (q) {
            var p = this.normalize();
            q = q.normalize();

            if (this.length !== q.length) {
                return false;
            }

            return p.every(function (x, i) {
                return MathLib.isEqual(x, q[i]);
            });
        };

        /**
        * Determines if the point is finite
        *
        * @return {boolean}
        */
        Point.prototype.isFinite = function () {
            return !MathLib.isZero(this[this.length - 1]);
        };

        /**
        * Calculates a line connecting two points
        *
        * @param {Point} q The point to calculate the line to
        * @return {Line}
        */
        Point.prototype.join = function (q) {
            var line, p = this;

            if (this.dimension === 2 && q.dimension === 2) {
                line = new MathLib.Line(this.vectorProduct(q).toArray());

                Object.defineProperties(line, {
                    '0': {
                        get: function () {
                            return p[1] * q[2] - p[2] * q[1];
                        },
                        set: function () {
                            MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Point#join' });
                        },
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            return p[2] * q[0] - p[0] * q[2];
                        },
                        set: function () {
                            MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Point#join' });
                        },
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            return p[0] * q[1] - p[1] * q[0];
                        },
                        set: function () {
                            MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Point#join' });
                        },
                        enumerable: true
                    }
                });

                return line;
            }
        };

        /**
        * Normalizes the point.
        *
        * @return {Point}
        */
        Point.prototype.normalize = function () {
            var last = this[this.dimension] || 1;
            return this.map(function (x) {
                return x / last;
            });
        };

        /**
        * Reflects the point at an other point
        *
        * @param {Point} q The point to reflect the current point at.
        * @return {Point}
        */
        Point.prototype.reflectAt = function (q) {
            var i, ii, reflectedPoint = [], p = this.normalize();

            if (q.type === 'point') {
                if (this.dimension === q.dimension) {
                    q = q.normalize();
                    for (i = 0, ii = this.dimension; i < ii; i++) {
                        reflectedPoint.push(2 * q[i] - p[i]);
                    }
                    reflectedPoint.push(1);
                    return new MathLib.Point(reflectedPoint);
                }
            }
        };

        /**
        * Restricts the point to a line.
        *
        * @param {Line} l The line to restrict the point to.
        */
        Point.prototype.restrictTo = function (l) {
            var p = this.slice();

            Object.defineProperties(this, {
                '0': {
                    get: function () {
                        return l[1] * l[1] * p[0] - l[0] * (l[1] * p[1] + l[2] * p[2]);
                    },
                    set: function (point) {
                        p[0] = point;
                    },
                    enumerable: true,
                    configurable: true
                },
                '1': {
                    get: function () {
                        return -l[1] * l[2] * p[2] + l[0] * (l[0] * p[1] - l[1] * p[0]);
                    },
                    set: function (point) {
                        p[1] = point;
                    },
                    enumerable: true,
                    configurable: true
                },
                '2': {
                    get: function () {
                        return l[1] * l[1] * p[2] + l[0] * l[0] * p[2];
                    },
                    set: function (point) {
                        p[2] = point;
                    },
                    enumerable: true,
                    configurable: true
                }
            });
        };

        /**
        * Converts a two dimensional point to the corresponding complex number.
        *
        * @return {Complex}
        */
        Point.prototype.toComplex = function () {
            if (this.dimension === 2) {
                if (MathLib.isZero(this[2])) {
                    return new MathLib.Complex(Infinity);
                }
                return new MathLib.Complex(this[0] / this[2], this[1] / this[2]);
            }
        };

        /**
        * TODO: implement
        * Returns content MathML representation of the point
        *
        * @return {string}
        */
        // toContentMathML(opt) {
        // }
        /**
        * Returns LaTeX representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        Point.prototype.toLaTeX = function (opt) {
            if (typeof opt === "undefined") { opt = false; }
            var p = opt ? this.toArray() : this.normalize().slice(0, -1);

            return '\\begin{pmatrix}' + p.reduce(function (old, cur) {
                return old + '\\\\' + MathLib.toLaTeX(cur);
            }) + '\\end{pmatrix}';
        };

        /**
        * Returns (presentation) MathML representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        Point.prototype.toMathML = function (opt) {
            if (typeof opt === "undefined") { opt = false; }
            var p = opt ? this.toArray() : this.normalize().slice(0, -1);

            return p.reduce(function (old, cur) {
                return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
            }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
        };

        /**
        * Returns string representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        Point.prototype.toString = function (opt) {
            if (typeof opt === "undefined") { opt = false; }
            var p = opt ? this.toArray() : this.normalize().slice(0, -1);

            return '(' + p.reduce(function (old, cur) {
                return old + ', ' + MathLib.toString(cur);
            }) + ')';
        };
        Point.I = new Point([new MathLib.Complex(0, -1), 0, 1]);

        Point.J = new Point([new MathLib.Complex(0, 1), 0, 1]);
        return Point;
    })(MathLib.Vector);
    MathLib.Point = Point;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Functn
    /**
    * The polynomial implementation of MathLib makes calculations with polynomials.
    * Both the coefficients and the arguments of a polynomial can be numbers,
    * complex numbers and matrices.
    *
    * It is as easy as
    * ```
    * new MathLib.Polynomial([1, 2, 3])
    * ```
    * to create the polynomial 1 + 2x + 3x²
    * The polynomial x¹⁰⁰ can be created with the following statement:
    * ```
    * new MathLib.Polynomial(100)
    * ```
    *
    * @class
    * @this {Polynomial}
    */
    var Polynomial = (function () {
        function Polynomial(polynomial) {
            var _this = this;
            this.type = 'polynomial';
            var coefficients = [];

            if (polynomial === undefined || polynomial.length === 0) {
                polynomial = [0];
            } else if (typeof polynomial === 'number') {
                while (polynomial--) {
                    coefficients.push(0);
                }
                coefficients.push(1);
                polynomial = coefficients;
            }

            polynomial.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = polynomial.length;
            this.deg = polynomial.length - 1;
            this.subdeg = (function (a) {
                var i = 0;
                if (a.length > 1 || a[0]) {
                    while (i < a.length && MathLib.isZero(a[i])) {
                        i++;
                    }
                    return i;
                }
                return Infinity;
            }(polynomial));
        }
        /**
        * Compares two polynomials.
        *
        * @param {Polynomial} p The polynomial to compare
        * @return {number}
        */
        Polynomial.prototype.compare = function (p) {
            var i, ii;

            if (this.length !== p.length) {
                return MathLib.sign(this.length - p.length);
            }

            for (i = 0, ii = this.length; i < ii; i++) {
                if (p[i] - this[i]) {
                    return MathLib.sign(this[i] - p[i]);
                }
            }

            return 0;
        };

        /**
        * Differentiates the polynomial
        *
        * @param {number} n the number of times to differentiate the polynomial.
        * @return {Polynomial}
        */
        Polynomial.prototype.differentiate = function (n) {
            if (typeof n === "undefined") { n = 1; }
            var i, ii, derivative = [];

            if (n === 0) {
                return this;
            }

            for (i = 0, ii = this.deg - n; i <= ii; i++) {
                derivative[i] = MathLib.times(this[i + n], MathLib.fallingFactorial(i + n, n));
            }
            return new MathLib.Polynomial(derivative);
        };

        /**
        * Draws the polynomial on the screen
        *
        * @param {Screen} screen The screen to draw the polynomial onto.
        * @param {object} options Optional drawing options.
        * @return {Polynomial}
        */
        Polynomial.prototype.draw = function (screen, options) {
            return this.toFunctn().draw(screen, options);
        };

        /**
        * Works like Array.prototype.every.
        *
        * @param {function} f The function to be applied to all the values
        * @return {boolean}
        */
        Polynomial.prototype.every = function (f) {
            return Array.prototype.every.call(this, f);
        };

        /**
        * Works like the Array.prototype.forEach function
        */
        Polynomial.prototype.forEach = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            Array.prototype.forEach.apply(this, args);
        };

        /**
        * Integrates the polynomial
        *
        * @param {number} n The number of times to integrate the polynomial.
        * @return {Polynomial}
        */
        Polynomial.prototype.integrate = function (n) {
            if (typeof n === "undefined") { n = 1; }
            var i, ii, antiderivative = [];

            if (MathLib.isZero(n)) {
                return this;
            }

            for (i = 0; i < n; i++) {
                antiderivative.push(0);
            }

            for (i = 0, ii = this.deg; i <= ii; i++) {
                antiderivative[i + n] = this[i] / MathLib.fallingFactorial(i + n, n);
            }
            return new MathLib.Polynomial(antiderivative);
        };

        /**
        * Interpolates points.
        *
        * @return {Polynomial}
        */
        Polynomial.interpolation = function (a, b) {
            var basisPolynomial, interpolant = new MathLib.Polynomial([0]), n = a.length, i, j;

            if (arguments.length === 2) {
                a = a.map(function (x, i) {
                    return [x, b[i]];
                });
            }

            for (i = 0; i < n; i++) {
                basisPolynomial = new MathLib.Polynomial([1]);
                for (j = 0; j < n; j++) {
                    if (i !== j) {
                        basisPolynomial = basisPolynomial.times(new MathLib.Polynomial([-a[j][0] / (a[i][0] - a[j][0]), 1 / (a[i][0] - a[j][0])]));
                    }
                }
                interpolant = interpolant.plus(basisPolynomial.times(a[i][1]));
            }
            return interpolant;
        };

        /**
        * Decides if two polynomials are equal.
        *
        * @param {Polynomial} p The polynomial to compare.
        * @return {boolean}
        */
        Polynomial.prototype.isEqual = function (p) {
            var i, ii;
            if (this.deg !== p.deg || this.subdeg !== p.subdeg) {
                return false;
            }
            for (i = 0, ii = this.deg; i <= ii; i++) {
                if (!MathLib.isEqual(this[i], p[i])) {
                    return false;
                }
            }
            return true;
        };

        /**
        * Works like the Array.prototype.map function
        *
        * @param {function} f The function to be applied to all the values
        * @return {Polynomial}
        */
        Polynomial.prototype.map = function (f) {
            return new MathLib.Polynomial(Array.prototype.map.call(this, f));
        };

        /**
        * Returns the negative polynomial
        *
        * @return {Polynomial}
        */
        Polynomial.prototype.negative = function () {
            return new MathLib.Polynomial(this.map(MathLib.negative));
        };

        /**
        * Adds a number or a polynomial
        *
        * @param {number|Polynomial} a The number or polynomial to add to the current polynomial
        * @return {Polynomial}
        */
        Polynomial.prototype.plus = function (a) {
            var plus = [], i;
            if (typeof a === 'number') {
                plus = this.slice();
                plus[0] = MathLib.plus(plus[0], a);
            } else if (a.type === 'polynomial') {
                for (i = 0; i <= Math.min(this.deg, a.deg); i++) {
                    plus[i] = MathLib.plus(this[i], a[i]);
                }
                plus = plus.concat((this.deg > a.deg ? this : a).slice(i));
            }
            return new MathLib.Polynomial(plus);
        };

        /**
        * Calculates the regression line for some points
        *
        * @param {array} x The x values
        * @param {array} y The y values
        * @return {Polynomial}
        */
        Polynomial.regression = function (x, y) {
            var length = x.length, xy = 0, xi = 0, yi = 0, x2 = 0, m, c, i;

            if (arguments.length === 2) {
                for (i = 0; i < length; i++) {
                    xy += x[i] * y[i];
                    xi += x[i];
                    yi += y[i];
                    x2 += x[i] * x[i];
                }
            } else {
                for (i = 0; i < length; i++) {
                    xy += x[i][0] * x[i][1];
                    xi += x[i][0];
                    yi += x[i][1];
                    x2 += x[i][0] * x[i][0];
                }
            }

            m = (length * xy - xi * yi) / (length * x2 - xi * xi);
            c = (yi * x2 - xy * xi) / (length * x2 - xi * xi);
            return new MathLib.Polynomial([c, m]);
        };

        /**
        * Returns a polynomial with the specified roots
        *
        * @param {array|Set} zeros The wished zeros.
        * @return {Polynomial}
        */
        Polynomial.roots = function (zeros) {
            var elemSymPoly, i, ii, coef = [];

            if (MathLib.type(zeros) === 'array') {
                zeros = new MathLib.Set(zeros);
            }

            elemSymPoly = zeros.powerset();
            for (i = 0, ii = zeros.card; i < ii; i++) {
                coef[i] = 0;
            }

            // Vieta's theorem
            elemSymPoly.slice(1).forEach(function (x) {
                coef[ii - x.card] = MathLib.plus(coef[ii - x.card], x.times());
            });

            coef = coef.map(function (x, i) {
                if ((ii - i) % 2) {
                    return MathLib.negative(x);
                }
                return x;
            });

            coef.push(1);
            return new MathLib.Polynomial(coef);
        };

        /**
        * Works like the Array.prototype.slice function
        *
        * @return {array}
        */
        Polynomial.prototype.slice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.slice.apply(this, args);
        };

        /**
        * Multiplies the polynomial by a number or an other polynomial
        *
        * @param {number|Polynomial} a The multiplicator
        * @return {Polynomial}
        */
        Polynomial.prototype.times = function (a) {
            var i, ii, j, jj, product = [];

            if (a.type === 'polynomial') {
                for (i = 0, ii = this.deg; i <= ii; i++) {
                    for (j = 0, jj = a.deg; j <= jj; j++) {
                        product[i + j] = MathLib.plus((product[i + j] ? product[i + j] : 0), MathLib.times(this[i], a[j]));
                    }
                }
                return new MathLib.Polynomial(product);
            } else if (a.type === 'rational') {
                a = a.toNumber();
            }

            // we we multiply it to every coefficient
            return this.map(function (b) {
                return MathLib.times(a, b);
            });
        };

        /**
        * Returns a content MathML representation of the polynomial
        *
        * @return {string}
        */
        Polynomial.prototype.toContentMathML = function (math) {
            var str = '<apply><csymbol cd="arith1">plus</csymbol>', i;
            for (i = this.deg; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    if (i === 0) {
                        str += MathLib.toContentMathML(this[i]);
                    } else {
                        str += '<apply><csymbol cd="arith1">times</csymbol>' + MathLib.toContentMathML(this[i], true);
                    }

                    if (i > 1) {
                        str += '<apply><csymbol cd="arith1">power</csymbol><ci>x</ci>' + MathLib.toContentMathML(i) + '</apply></apply>';
                    } else if (i === 1) {
                        str += '<ci>x</ci></apply>';
                    }
                }
            }

            str += '</apply>';

            //if (math) {
            //	str = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication>' + str + '</lambda></math>';
            //}
            return str;
        };

        /**
        * Custom toExpression function
        *
        * @return {Expression}
        */
        Polynomial.prototype.toExpression = function () {
            var content = [], sum, i;

            for (i = this.deg; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    if (i > 1) {
                        content.push(new MathLib.Expression({
                            subtype: 'naryOperator',
                            value: '^',
                            name: 'pow',
                            content: [
                                new MathLib.Expression({
                                    subtype: 'naryOperator',
                                    content: [
                                        new MathLib.Expression({
                                            subtype: 'number',
                                            value: this[i].toString()
                                        }),
                                        new MathLib.Expression({
                                            subtype: 'variable',
                                            value: 'x'
                                        })
                                    ],
                                    value: '*',
                                    name: 'times'
                                }),
                                new MathLib.Expression({
                                    subtype: 'number',
                                    value: i.toString()
                                })
                            ]
                        }));
                    } else if (i === 1) {
                        content.push(new MathLib.Expression({
                            subtype: 'naryOperator',
                            content: [
                                new MathLib.Expression({
                                    subtype: 'number',
                                    value: this[i].toString()
                                }),
                                new MathLib.Expression({
                                    subtype: 'variable',
                                    value: 'x'
                                })
                            ],
                            value: '*',
                            name: 'times'
                        }));
                    } else if (i === 0) {
                        content.push(new MathLib.Expression({
                            subtype: 'number',
                            value: this[i].toString()
                        }));
                    }
                }
            }

            sum = new MathLib.Expression({
                content: content,
                subtype: 'naryOperator',
                value: '+',
                name: 'plus'
            });

            return new MathLib.Expression({
                subtype: 'functionDefinition',
                arguments: ['x'],
                content: [sum]
            });
        };

        /**
        * Converts the polynomial to a functn
        *
        * @return {Functn}
        */
        Polynomial.prototype.toFunctn = function () {
            var str = '', i, ii;
            for (i = 0, ii = this.deg; i <= ii; i++) {
                if (!MathLib.isZero(this[i])) {
                    if (i === 0) {
                        str += MathLib.toString(this[i]);
                    } else {
                        str += MathLib.toString(this[i], true);
                    }

                    if (i > 1) {
                        str += ' * Math.pow(x, ' + MathLib.toString(i) + ')';
                    } else if (i === 1) {
                        str += ' * x';
                    }
                }
            }

            return MathLib.Functn(new Function('x', 'return ' + str), {
                expression: this.toExpression()
            });
        };

        /**
        * Returns a LaTeX representation of the polynomial
        *
        * @return {string}
        */
        Polynomial.prototype.toLaTeX = function () {
            var str = MathLib.toString(this[this.deg]) + 'x^{' + this.deg + '}', i;

            for (i = this.deg - 1; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    // if (i === 0) {
                    //   str += MathLib.toLaTeX(this[i]);
                    // }
                    // else {
                    str += MathLib.toLaTeX(this[i], true);

                    // }
                    if (i > 1) {
                        str += 'x^{' + MathLib.toLaTeX(i) + '}';
                    } else if (i === 1) {
                        str += 'x';
                    }
                }
            }
            return str;
        };

        /**
        * Returns a MathML representation of the polynomial
        *
        * @return {string}
        */
        Polynomial.prototype.toMathML = function () {
            var str = '<mrow>' + MathLib.toMathML(this[this.deg]) + '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(this.deg) + '</msup>', i;
            for (i = this.deg - 1; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    // if (i === 0) {
                    //   str += MathLib.toMathML(this[i]);
                    // }
                    // else {
                    str += MathLib.toMathML(this[i], true);

                    // }
                    if (i > 1) {
                        str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(i) + '</msup>';
                    } else if (i === 1) {
                        str += '<mo>&#x2062;</mo><mi>x</mi>';
                    }
                }
            }

            str += '</mrow>';

            return str;
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Polynomial.prototype.toString = function () {
            var str = MathLib.toString(this[this.deg]) + '*x^' + this.deg, i;
            for (i = this.deg - 1; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    str += MathLib.toString(this[i], true);

                    if (i > 1) {
                        str += '*x^' + MathLib.toString(i);
                    } else if (i === 1) {
                        str += '*x';
                    }
                }
            }
            return str;
        };

        /**
        * Evaluates the polynomial at a given point
        *
        * @param {number|Complex|Matrix} x The value to evaluate the polynomial at.
        * @return {number|Complex|Matrix}
        */
        Polynomial.prototype.valueAt = function (x) {
            // TODO: warn if x is non square matrix
            var pot = MathLib.is(x, 'matrix') ? MathLib.Matrix.identity(x.rows) : 1, value = MathLib.is(x, 'matrix') ? MathLib.Matrix.zero(x.rows, x.cols) : 0, i, ii;

            for (i = 0, ii = this.deg; i <= ii; i++) {
                value = MathLib.plus(value, MathLib.times(this[i], pot));
                pot = MathLib.times(pot, x);
            }
            return value;
        };
        Polynomial.one = new Polynomial([1]);

        Polynomial.zero = new Polynomial([0]);
        return Polynomial;
    })();
    MathLib.Polynomial = Polynomial;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// import Functn
    /**
    * MathLib.Rational is the MathLib implementation of rational numbers.
    *
    * #### Simple use case:
    * ```
    * // Create the rational number 2/3
    * var r = new MathLib.Rational(2, 3);
    * ```
    *
    * @class
    * @this {Rational}
    */
    var Rational = (function () {
        function Rational(numerator, denominator) {
            if (typeof denominator === "undefined") { denominator = 1; }
            this.type = 'rational';
            if (MathLib.isZero(denominator)) {
                MathLib.error({ message: 'The denominator cannot be zero.', method: 'Rational.constructor' });
                throw 'The denominator cannot be zero.';
            }
            this.numerator = numerator;
            this.denominator = denominator;
        }
        /**
        * Compares two rational numbers
        *
        * @param {Rational} rational The number to compare
        * @return {number}
        */
        Rational.prototype.compare = function (rational) {
            return MathLib.sign(this.numerator * rational.denominator - this.denominator * rational.numerator);
        };

        /**
        * Divides rational numbers
        *
        * @param {Rational|number} divisor The divisor
        * @return {Rational}
        */
        Rational.prototype.divide = function (divisor) {
            if (divisor.type === 'rational') {
                return new MathLib.Rational(MathLib.times(this.numerator, divisor.denominator), MathLib.times(this.denominator, divisor.numerator));
            } else if (typeof divisor === 'number') {
                return new MathLib.Rational(this.numerator, MathLib.times(this.denominator, divisor));
            } else {
                return divisor.inverse().times(this);
            }
        };

        /**
        * Calculates the inverse of a rational number
        *
        * @return {Rational}
        */
        Rational.prototype.inverse = function () {
            if (!MathLib.isZero(this.numerator)) {
                return new MathLib.Rational(this.denominator, this.numerator);
            }
        };

        /**
        * Checks if the rational number is equal to an other number
        *
        * @param {Rational} number The number to compare
        * @return {boolean}
        */
        Rational.prototype.isEqual = function (number) {
            return MathLib.isEqual(MathLib.times(this.numerator, number.denominator), MathLib.times(this.denominator, number.numerator));
        };

        /**
        * Checks if the rational number is zero
        *
        * @return {boolean}
        */
        Rational.prototype.isZero = function () {
            return MathLib.isZero(this.numerator);
        };

        /**
        * Subtracts rational numbers
        *
        * @param {Rational|number} subtrahend The number to be subtracted
        * @return {Rational}
        */
        Rational.prototype.minus = function (subtrahend) {
            var n = this.numerator, d = this.denominator;

            if (subtrahend.type === 'rational') {
                return new MathLib.Rational(MathLib.minus(MathLib.times(n, subtrahend.denominator), MathLib.times(d, subtrahend.numerator)), MathLib.times(d, subtrahend.denominator));
            } else if (typeof subtrahend === 'number') {
                return new MathLib.Rational(MathLib.minus(n, MathLib.times(subtrahend, d)), d);
            } else {
                return subtrahend.minus(this).negative();
            }
        };

        /**
        * Calculates the negative of a rational number
        *
        * @return {Rational}
        */
        Rational.prototype.negative = function () {
            return new MathLib.Rational(-this.numerator, this.denominator);
        };

        /**
        * Adds rational numbers
        *
        * @param {Rational|number} summand The number to be added
        * @return {Rational}
        */
        Rational.prototype.plus = function (summand) {
            var n = this.numerator, d = this.denominator;

            if (summand.type === 'rational') {
                return new MathLib.Rational(MathLib.plus(MathLib.times(d, summand.numerator), MathLib.times(n, summand.denominator)), MathLib.times(d, summand.denominator));
            } else if (typeof summand === 'number') {
                return new MathLib.Rational(MathLib.plus(n, MathLib.times(summand, d)), d);
            } else {
                return summand.plus(this);
            }
        };

        /**
        * Reduces the rational number
        *
        * @return {Rational}
        */
        Rational.prototype.reduce = function () {
            var gcd = MathLib.sign(this.denominator) * MathLib.gcd([this.numerator, this.denominator]);
            return new MathLib.Rational(this.numerator / gcd, this.denominator / gcd);
        };

        /**
        * Multiplies rational numbers
        *
        * @param {Rational|number} factor The number to be multiplied
        * @return {Rational}
        */
        Rational.prototype.times = function (factor) {
            if (factor.type === 'rational') {
                return new MathLib.Rational(MathLib.times(this.numerator, factor.numerator), MathLib.times(this.denominator, factor.denominator));
            } else if (typeof factor === 'number') {
                return new MathLib.Rational(MathLib.times(this.numerator, factor), this.denominator);
            } else {
                return factor.times(this);
            }
        };

        /**
        * Returns the Content MathML representation of the rational number
        *
        * @return {string}
        */
        Rational.prototype.toContentMathML = function () {
            return '<cn type="rational">' + this.numerator + '<sep/>' + this.denominator + '</cn>';
        };

        /**
        * Returns the LaTeX representation of the rational number
        *
        * @return {string}
        */
        Rational.prototype.toLaTeX = function () {
            return '\\frac{' + MathLib.toLaTeX(this.numerator) + '}{' + MathLib.toLaTeX(this.denominator) + '}';
        };

        /**
        * Returns the MathML representation of the rational number
        *
        * @return {string}
        */
        Rational.prototype.toMathML = function () {
            return '<mfrac>' + MathLib.toMathML(this.numerator) + MathLib.toMathML(this.denominator) + '</mfrac>';
        };

        /**
        * Returns the number represented by the rational number
        *
        * @return {number}
        */
        Rational.prototype.toNumber = function () {
            return this.numerator / this.denominator;
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Rational.prototype.toString = function () {
            return MathLib.toString(this.numerator) + '/' + MathLib.toString(this.denominator);
        };
        return Rational;
    })();
    MathLib.Rational = Rational;
})(MathLib || (MathLib = {}));

/// <reference path='reference.ts'/>
var MathLib;
(function (MathLib) {
    /// no import
    /**
    * The Implementation of sets in MathLib
    *
    * To generate the set {1, 2, 3, 4, 5} you simply need to type
    * ```
    * new MathLib.Set([1, 2, 3, 4, 5])
    * ```
    * @class
    * @this {Set}
    */
    var Set = (function () {
        function Set(elements) {
            var _this = this;
            this.type = 'set';
            /**
            * Returns the intersection of two sets.
            *
            * @param {Set} set The set to intersect the current set with.
            * @return {Set}
            */
            this.intersect = Set.createSetOperation(false, true, false);
            /**
            * Returns the union of two sets.
            *
            * @param {Set} set The set to join the current set with.
            * @return {Set}
            */
            this.union = Set.createSetOperation(true, true, true);
            /**
            * Returns all elements, which are in the first set, but not in the second.
            *
            * @param {Set} set The set whose elements should be removed from the current set.
            * @return {Set}
            */
            this.without = Set.createSetOperation(true, false, false);
            /**
            * Returns all elements which are in either the first or the second set.
            *
            * @param {Set} set The second set.
            * @return {Set}
            */
            this.xor = Set.createSetOperation(true, false, true);
            if (!elements) {
                elements = [];
            }

            elements = elements.sort(MathLib.compare).filter(function (x, i, a) {
                return (a.length === i + 1) || !MathLib.isEqual(x, a[i + 1]) || (typeof x.isEqual !== 'undefined' && !x.isEqual(a[i + 1]));
            });

            elements.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = elements.length;
            this.card = elements.length;
        }
        /**
        * Compare function for sets
        *
        * @param {Set} x The set to compare the current set to
        * @return {number}
        */
        Set.prototype.compare = function (x) {
            var a, i, ii;

            if (this.card !== x.card) {
                return MathLib.sign(this.card - x.card);
            } else {
                for (i = 0, ii = this.card; i < ii; i++) {
                    a = MathLib.compare(this[i], x[i]);
                    if (a !== 0) {
                        return a;
                    }
                }
                return 0;
            }
        };

        /**
        * Works like the Array.prototype.every function
        *
        * @return {boolean}
        */
        Set.prototype.every = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.every.apply(this, args);
        };

        /**
        * Works like the Array.prototype.filter function
        *
        * @return {Set}
        */
        Set.prototype.filter = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return new MathLib.Set(Array.prototype.filter.apply(this, args));
        };

        /**
        * Works like the Array.prototype.forEach function
        */
        Set.prototype.forEach = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            Array.prototype.forEach.apply(this, args);
        };

        /**
        * Works like the Array.prototype.indexOf function
        *
        * @return {number}
        */
        Set.prototype.indexOf = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.indexOf.apply(this, args);
        };

        /**
        * Inserts an element into the set.
        *
        * @param{any} x The element to insert in the set.
        * @return {Set} Returns the current set
        */
        Set.prototype.insert = function (x) {
            var i = this.locate(x);
            if (this[i] !== x) {
                this.splice(i, 0, x);
                this.card++;
            }
            return this;
        };

        /**
        * Determines if the set is empty.
        *
        * @return {boolean}
        */
        Set.prototype.isEmpty = function () {
            return this.card === 0;
        };

        /**
        * Determines if the set is equal to an other set.
        *
        * @param {Set} set The set to compare
        * @return {boolean}
        */
        Set.prototype.isEqual = function (set) {
            if (this.card !== set.card) {
                return false;
            } else {
                return this.every(function (y, i) {
                    return MathLib.isEqual(y, set[i]);
                });
            }
        };

        /**
        * Determines if the set is a subset of an other set.
        *
        * @param {Set} set The potential superset
        * @return {boolean}
        */
        Set.prototype.isSubsetOf = function (set) {
            return this.every(function (x) {
                return set.indexOf(x) !== -1;
            });
        };

        /**
        * Array.prototype.indexOf() returns only the position of an element in the
        * array and not the position where one should be inserted.
        *
        * @param {Set} x The element to locate
        * @return {number}
        */
        Set.prototype.locate = function (x) {
            var left = 0, right = this.card - 1, middle, i = this.indexOf(x);

            if (i !== -1) {
                return i;
            }

            while (left <= right) {
                middle = left + Math.floor((right - left) / 2);
                if (this[middle] < x) {
                    left = middle + 1;
                } else if (this[middle] > x) {
                    right = middle - 1;
                } else {
                    return middle;
                }
            }
            return left;
        };

        /**
        * Works like the Array.prototype.map function
        *
        * @param {function} The mapping function
        * @return {Set}
        */
        Set.prototype.map = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return new MathLib.Set(Array.prototype.map.apply(this, args));
        };

        /**
        * Adds the argument to all elements in the set,
        * or if no argument is provided adds up all the elements in the set.
        *
        * @param {number|MathLib object} n The object to add to the elements in the set.
        * @return {Set|any}
        */
        Set.prototype.plus = function (n) {
            var sum = [];
            if (!arguments.length) {
                return MathLib.plus.apply(null, this.toArray());
            } else if (n.type === 'set') {
                this.forEach(function (x) {
                    n.forEach(function (y) {
                        sum.push(MathLib.plus(x, y));
                    });
                });

                return new MathLib.Set(sum);
            } else {
                return this.map(function (x) {
                    return MathLib.plus(x, n);
                });
            }
        };

        /**
        * Returns the powerset
        *
        * @return {Set}
        */
        Set.prototype.powerset = function () {
            var flag, subset, i, ii, j, jj, powerset = [];

            for (i = 0, ii = Math.pow(2, this.card); i < ii; i++) {
                flag = i.toString(2).split('').reverse();
                subset = [];
                for (j = 0, jj = this.card; j < jj; j++) {
                    if (flag[j] === '1') {
                        subset.push(this[j]);
                    }
                }
                powerset.push(new MathLib.Set(subset));
            }

            return new MathLib.Set(powerset);
        };

        /**
        * Works like the Array.prototype.reduce function
        *
        * @return {any}
        */
        Set.prototype.reduce = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.reduce.apply(this, arguments);
        };

        /**
        * Removes a element from a set
        *
        * @param {any} element The element to remove from the set.
        * @return {Set}
        */
        Set.prototype.remove = function (element) {
            var i = this.indexOf(element);
            if (i !== -1) {
                this.splice(i, 1);
                this.card--;
            }
            return this;
        };

        /**
        * Works like the Array.prototype.slice function
        *
        * @return {array}
        */
        Set.prototype.slice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.slice.apply(this, args);
        };

        /**
        * Works like the Array.prototype.some function
        *
        * @return {boolean}
        */
        Set.prototype.some = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.some.apply(this, args);
        };

        /**
        * Works like the Array.prototype.splice function
        *
        * @return {Set}
        */
        Set.prototype.splice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.splice.apply(this, args);
        };

        /**
        * Multiplies all elements in the set if no argument is passed.
        * Multiplies all elements by a argument if one is passed.
        *
        * @param {number|MathLib object} n The object to multiply the elements with
        * @return {Set}
        */
        Set.prototype.times = function (n) {
            if (!arguments.length) {
                return MathLib.times.apply(null, this.toArray());
            } else {
                return this.map(function (x) {
                    return MathLib.times(x, n);
                });
            }
        };

        /**
        * Converts the set to an array
        *
        * @return {array}
        */
        Set.prototype.toArray = function () {
            return Array.prototype.slice.call(this);
        };

        /**
        * Returns the content MathML representation of the set
        *
        * @return {string}
        */
        Set.prototype.toContentMathML = function () {
            if (this.isEmpty()) {
                return '<emptyset/>';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toContentMathML(cur);
                }, '<set>') + '</set>';
            }
        };

        /**
        * Returns the LaTeX representation of the set
        *
        * @return {string}
        */
        Set.prototype.toLaTeX = function () {
            if (this.isEmpty()) {
                return '\\emptyset';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toLaTeX(cur) + ', ';
                }, '\\{').slice(0, -2) + '\\}';
            }
        };

        /**
        * Returns the (presentation) MathML representation of the set
        *
        * @return {string}
        */
        Set.prototype.toMathML = function () {
            if (this.isEmpty()) {
                return '<mi>&#x2205;</mi>';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toMathML(cur) + '<mo>,</mo>';
                }, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
            }
        };

        /**
        * Returns a string representation of the set
        *
        * @return {string}
        */
        Set.prototype.toString = function () {
            if (this.isEmpty()) {
                return '∅';
            }
            return '{' + Array.prototype.join.call(this, ', ') + '}';
        };
        Set.fromTo = function (start, end, step) {
            if (typeof step === "undefined") { step = 1; }
            var i, set = [];

            if (start <= end) {
                for (i = start; i <= end; i += step) {
                    set.push(i);
                }
                return new MathLib.Set(set);
            }
        };

        Set.createSetOperation = function (left, both, right) {
            return function (a) {
                var set = [], i = 0, j = 0, tl = this.card, al = a.card;

                while (i < tl && j < al) {
                    if (MathLib.compare(this[i], a[j]) < 0) {
                        if (left) {
                            set.push(this[i]);
                        }
                        i++;
                        continue;
                    }
                    if (MathLib.compare(this[i], a[j]) > 0) {
                        if (right) {
                            set.push(a[j]);
                        }
                        j++;
                        continue;
                    }
                    if (MathLib.isEqual(this[i], a[j])) {
                        if (both) {
                            set.push(this[i]);
                        }
                        i++;
                        j++;
                        continue;
                    }
                }
                if (left && j === al) {
                    set = set.concat(this.slice(i));
                } else if (right && i === tl) {
                    set = set.concat(a.slice(j));
                }
                return new MathLib.Set(set);
            };
        };
        return Set;
    })();
    MathLib.Set = Set;
})(MathLib || (MathLib = {}));
