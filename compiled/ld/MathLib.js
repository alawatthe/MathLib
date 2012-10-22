var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var MathLib;
(function (MathLib) {
    var prototypes = {
        array: Object.getPrototypeOf([]),
        func: Object.getPrototypeOf(function () {
        }),
        object: Object.getPrototypeOf({
        })
    };
    var proto = '__proto__';

    MathLib.prototypes = prototypes;
    MathLib.extend = function (obj, name, prop, options) {
        options = options || {
            enumerable: true
        };
        var o = MathLib[obj] || MathLib;
        Object.defineProperty(o, name, {
            value: prop,
            writable: options.writable,
            enumerable: options.enumerable,
            configurable: options.configurable
        });
    };
    MathLib.extendPrototype = function (obj, name, prop, options) {
        options = options || {
            enumerable: true
        };
        Object.defineProperty(prototypes[obj], name, {
            value: prop,
            writable: options.writable,
            enumerable: options.enumerable,
            configurable: options.configurable
        });
    };
    var MathML = (function () {
        function MathML(MathMLString) {
            this.type = 'MathML';
        }
        MathML.prototype.isSupported = function () {
            var hasMathML = false;
            var ns;
            var div;
            var mfrac;

            if(document.createElementNS) {
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
        MathML.prototype.loadMathJax = function (config) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';
            config = config || 'MathJax.Hub.Config({' + 'config: ["MMLorHTML.js"],' + 'jax: ["input/TeX","input/MathML","output/HTML-CSS","output/NativeMML"],' + 'extensions: ["tex2jax.js","mml2jax.js","MathMenu.js","MathZoom.js"],' + 'TeX: {' + 'extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]' + '}' + '});';
            if(window.opera) {
                script.innerHTML = config;
            } else {
                script.text = config;
            }
            document.getElementsByTagName('head')[0].appendChild(script);
        };
        MathML.prototype.parse = function () {
            var handlers;
            var apply;
            var ci;
            var cn;
            var math;
            var matrixrow;
            var matrix;
            var parser;
            var set;
            var vector;
            var construct = false;
            var bvars = [];

            handlers = {
                apply: function (node) {
                    var children = node.childNodes;
                    var func = children.shift();
                    var funcName = func.nodeName;
                    var names = {
                        ident: 'identity',
                        power: 'pow',
                        rem: 'mod',
                        setdifference: 'without'
                    };

                    if(funcName in names) {
                        funcName = names[funcName];
                    }
                    if(construct) {
                        var innerFunc;
                        innerFunc = parser(children[0]);
                        if(innerFunc === undefined) {
                            return MathLib.functn(function (x) {
                                return MathLib[funcName](x);
                            }, {
                                contentMathMLString: '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication>' + node.outerMathML + '</lambda></math>'
                            });
                        } else {
                            return MathLib.functn(function (x) {
                                return MathLib[funcName](innerFunc(x));
                            }, {
                                contentMathMLString: node.outerMathML
                            });
                        }
                    } else {
                        if(funcName in MathLib) {
                            if(children.length === 1) {
                                return MathLib[funcName](parser(children[0]));
                            } else {
                                return MathLib[funcName].apply(null, children.map(parser));
                            }
                        } else {
                            var child = parser(children.shift());
                            if(children.length === 1) {
                                return child[funcName](parser(children[0]));
                            } else {
                                return child[funcName](children.map(parser));
                            }
                        }
                    }
                },
                ci: function (node) {
                    if(bvars.indexOf(node.innerMathML) === -1) {
                        return MathLib.MathML.variables[node.innerMathML];
                    } else {
                        return MathLib.functn(function (x) {
                            return x;
                        }, {
                            contentMathMLString: '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><ident/><ci>x</ci></apply></lambda></math>'
                        });
                    }
                },
                cn: function (node) {
                    var type = node.attributes.type ? node.attributes.type : 'number';
                    if(type === 'number') {
                        return +node.innerMathML;
                    } else {
                        if(type === 'complex-cartesian') {
                            return MathLib.complex([
                                +node.childNodes[0].outerMathML, 
                                +node.childNodes[2].outerMathML
                            ]);
                        } else {
                            if(type === 'complex-polar') {
                                return MathLib.complex(+node.childNodes[0].outerMathML, +node.childNodes[2].outerMathML);
                            }
                        }
                    }
                },
                cs: function (node) {
                    return node.innerMathML;
                },
                lambda: function (node) {
                    var domain;
                    var lambda;
                    var funcName;
                    var innerFunc;
                    var names;

                    bvars = bvars.concat(node.bvars);
                    domain = node.domainofapplication;
                    apply = node.apply;
                    funcName = apply.childNodes[0].nodeName;
                    construct = true;
                    names = {
                        ident: 'identity',
                        power: 'pow',
                        rem: 'mod',
                        setdifference: 'without'
                    };
                    if(funcName in names) {
                        funcName = names[funcName];
                    }
                    innerFunc = parser(apply.childNodes.slice(1));
                    if(innerFunc[0] === undefined) {
                        return MathLib.functn(function (x) {
                            return MathLib[funcName](x);
                        }, {
                            contentMathMLString: node.outerMathML,
                            domain: domain
                        });
                    } else {
                        return MathLib.functn(function (x) {
                            return MathLib[funcName].apply(null, innerFunc.map(function (f) {
                                return typeof f === 'function' ? f(x) : f;
                            }));
                        }, {
                            contentMathMLString: node.outerMathML,
                            domain: domain
                        });
                    }
                },
                math: function (node) {
                    return parser(node.childNodes[0]);
                },
                matrix: function (node) {
                    return MathLib.matrix(node.childNodes.map(handlers.matrixrow));
                },
                matrixrow: function (node) {
                    return node.childNodes.map(parser);
                },
                set: function (node) {
                    var type = node.attributes.type && node.attributes.type === 'multiset' ? true : false;
                    return MathLib.set(node.childNodes.map(parser), type);
                },
                'false': function () {
                    return false;
                },
                'true': function () {
                    return true;
                },
                exponentiale: function () {
                    return MathLib.e;
                },
                imaginaryi: function () {
                    return MathLib.complex([
                        0, 
                        1
                    ]);
                },
                notanumber: function () {
                    return NaN;
                },
                pi: function () {
                    return MathLib.pi;
                },
                eulergamma: function () {
                    return MathLib.eulerMascheroni;
                },
                infinity: function () {
                    return Infinity;
                },
                vector: function (node) {
                    return MathLib.vector(node.childNodes.map(parser));
                }
            };
            parser = function (node) {
                if(Array.isArray(node)) {
                    return node.map(parser);
                }
                return handlers[node.nodeName](node);
            };
            return parser(this);
        };
        MathML.prototype.toMathMLString = function () {
            var handlers = {
                apply: function (n) {
                    var f = n.childNodes[0];
                    var args = n.childNodes.slice(1).map(function (x) {
                        return handlers[x.nodeName](x);
                    });
                    var str = '';

                    if(f.nodeName === 'plus') {
                        str = '<mrow>' + args.join('<mo>+</mo>') + '</mrow>';
                    } else {
                        if(f.nodeName === 'times') {
                            str = '<mrow>' + args.join('<mo>*</mo>') + '</mrow>';
                        } else {
                            if(f.nodeName === 'power') {
                                str = '<msup>' + args[0] + args[1] + '</msup>';
                            } else {
                                str = '<mrow><mi>' + f.nodeName + '</mi><mo>&af;</mo><mfenced>' + args.join('') + '</mfenced></mrow>';
                            }
                        }
                    }
                    return str;
                },
                bvar: function () {
                    return '';
                },
                ci: function (n) {
                    return '<mi>' + n.innerMathML + '</mi>';
                },
                cn: function (n) {
                    return '<mn>' + n.innerMathML + '</mn>';
                },
                cs: function (n) {
                    return '<ms>' + n.innerMathML + '</ms>';
                },
                domainofapplication: function () {
                    return '';
                },
                lambda: function (n) {
                    return n.childNodes.reduce(function (old, cur) {
                        return old + handlers[cur.nodeName](cur);
                    }, '');
                },
                '#text': function (n) {
                    return n.innerMathML;
                }
            };
            return '<math xmlns="http://www.w3.org/1998/Math/MathML">' + handlers[this.childNodes[0].nodeName](this.childNodes[0]) + '</math>';
        };
        MathML.prototype.toString = function () {
            return this.outerMathML;
        };
        MathML.prototype.write = function (id, math) {
            var formula;
            document.getElementById(id).innerHTML = '<math>' + math + '</math>';
            if(typeof MathJax !== 'undefined') {
                formula = MathJax.Hub.getAllJax(id)[0];
                MathJax.Hub.Queue([
                    'Typeset', 
                    MathJax.Hub, 
                    id
                ]);
            }
        };
        return MathML;
    })();
    MathLib.MathML = MathML;    
    prototypes.functn = function () {
    };
    MathLib.functn = function (f, options) {
        options = options || {
        };
        var functn = function (x) {
            if(typeof x === 'number') {
                return f.apply('', arguments);
            } else {
                if(x.type === 'functn') {
                    var outerVar = functn.contentMathML.childNodes[0].childNodes[0].childNodes[0].outerMathML;
                    var innerVar = x.contentMathML.childNodes[0].childNodes[0].childNodes[0].outerMathML;
                    var innerStr = x.contentMathML.childNodes[0].childNodes[2].outerMathML.replace('<bvar>' + innerVar + '</bvar>', '');
                    var outerStr = functn.contentMathML.childNodes[0].childNodes[2].outerMathML.replace(outerVar, innerStr);
                    var res = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>' + innerVar + '</bvar><domainofapplication><complexes/></domainofapplication>' + outerStr + '</lambda></math>';

                    return MathLib.functn(function (y) {
                        return f(x(y));
                    }, {
                        contentMathMLString: res
                    });
                } else {
                    if(typeof x === 'function') {
                        return function (y) {
                            return f(x(y));
                        }
                    } else {
                        if(x.type === 'complex') {
                            return x[options.name].apply(x, Array.prototype.slice.call(arguments, 1));
                        } else {
                            return x[options.name]();
                        }
                    }
                }
            }
        };
        functn[proto] = prototypes.functn;
        var contentMathML = options.contentMathMLString || '';
        Object.defineProperties(functn, {
            id: {
                value: options.name
            },
            contentMathML: {
                value: MathLib.MathML(contentMathML)
            }
        });
        return functn;
    };
    MathLib.extendPrototype('functn', 'constructor', MathLib.functn);
    MathLib.extendPrototype('functn', 'type', 'functn');
    var mathStart = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><';
    var mathEnd = '/><ci>x</ci></apply></lambda></math>';

    var functionList = {
        abs: Math.abs,
        arccos: Math.acos,
        arccot: function (x) {
            return 1.5707963267948966 - Math.atan(x);
        },
        arccsc: function (x) {
            return Math.asin(1 / x);
        },
        arcosh: Math.acosh || function (x) {
            return Math.log(x + Math.sqrt(x * x - 1));
        },
        arcoth: function (x) {
            return 0.5 * Math.log((x + 1) / (x - 1));
        },
        arcsch: function (x) {
            return Math.log((1 + Math.sqrt(1 + x * x)) / (x));
        },
        arcsec: function (x) {
            return Math.acos(1 / x);
        },
        arcsin: Math.asin,
        arctan: Math.atan,
        arsech: function (x) {
            return Math.log((1 + Math.sqrt(1 - x * x)) / (x));
        },
        arsinh: Math.asinh || function (x) {
            return Math.log(x + Math.sqrt(x * x + 1));
        },
        artanh: Math.atanh || function (x) {
            return 0.5 * Math.log((1 + x) / (1 - x));
        },
        ceil: function (x) {
            if(x === 0) {
                return x;
            }
            return Math.ceil(x);
        },
        floor: Math.floor,
        cos: Math.cos,
        cosh: Math.cosh || function (x) {
            return (Math.exp(x) + Math.exp(-x)) / 2;
        },
        cot: function (x) {
            if(x === 0) {
                return 1 / x;
            }
            return Math.tan(1.5707963267948966 - x);
        },
        coth: function (x) {
            return (Math.exp(x) + Math.exp(-x)) / (Math.exp(x) - Math.exp(-x));
        },
        csc: function (x) {
            return 1 / Math.sin(x);
        },
        csch: function (x) {
            return 2 / (Math.exp(x) - Math.exp(-x));
        },
        exp: function (x) {
            return Math.exp(x);
        },
        inverse: function (x) {
            return 1 / x;
        },
        sec: function (x) {
            return 1 / Math.cos(x);
        },
        sech: function (x) {
            return 2 / (Math.exp(x) + Math.exp(-x));
        },
        sin: Math.sin,
        sinh: Math.sinh || function (x) {
            return (Math.exp(x) - Math.exp(-x)) / 2;
        },
        tan: Math.tan,
        tanh: Math.tanh || function (x) {
            return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
        }
    };
    for(var elemfn in functionList) {
        if(functionList.hasOwnProperty(elemfn)) {
            MathLib[elemfn] = functionList[elemfn];
        }
    }
    MathLib.identity = MathLib.functn(function identity(x) {
        return x;
    }, {
        contentMathMLString: mathStart + 'ident' + mathEnd
    });
    var functionList1 = {
        arctan2: Math.atan2,
        binomial: function (n, k) {
            var res = 1;
            var i;

            if(k < 0 || (n > 0 && k > n)) {
                return 0;
            }
            if(n < 0) {
                res = Math.pow(-1, k);
                n = k - n - 1;
            }
            if(k > n / 2) {
                k = n - k;
            }
            for(i = 1; i <= k; i++) {
                res *= (n + 1 - i) / i;
            }
            return res;
        },
        cbrt: function (x) {
            var a3;
            var a3x;
            var an;
            var a;

            if(x === 0 || x !== x || x === Infinity || x === -Infinity) {
                return x;
            }
            a = MathLib.sign(x) * Math.pow(Math.abs(x), 1 / 3);
            while(true) {
                a3 = Math.pow(a, 3);
                a3x = a3 + x;
                an = a * (a3x + x) / (a3x + a3);
                if(MathLib.isZero(an - a)) {
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
        degToRad: function (x) {
            return x * 0.017453292519943295;
        },
        digitsum: function (x) {
            var out = 0;
            while(x > 9) {
                out += x % 10;
                x = Math.floor(x / 10);
            }
            return out + x;
        },
        divide: function (a, b) {
            return MathLib.times(a, MathLib.inverse(b));
        },
        divisors: function (x) {
            var res = x === 1 ? [] : [
                1
            ];
            var i;
            var ii;

            for(i = 2 , ii = x / 2; i <= ii; i++) {
                if(x % i === 0) {
                    res.push(i);
                }
            }
            res.push(x);
            return MathLib.set(res);
        },
        factor: function (n) {
            var res = [];
            var i;

            n = Math.abs(n);
            while(n % 2 === 0) {
                n = n / 2;
                res.push(2);
            }
            i = 3;
            while(n !== 1) {
                while(n % i === 0) {
                    n = n / i;
                    res.push(i);
                }
                i += 2;
            }
            return MathLib.set(res, true);
        },
        factorial: function (x) {
            var out = 1;
            var i;

            for(i = 1; i <= x; i = i + 1) {
                out *= i;
            }
            return out;
        },
        fallingFactorial: function (n, m, s) {
            var res = 1;
            var j;

            s = s || 1;
            for(j = 0; j < m; j++) {
                res *= (n - j * s);
            }
            return res;
        },
        fibonacci: function (n) {
            return Math.floor(Math.pow(MathLib.goldenRatio, n) / Math.sqrt(5));
        },
        hypot: function (a, b) {
            var args;
            var x;
            var y;

            if(arguments.length === 1) {
                return Math.abs(a);
            }
            if(arguments.length > 2) {
                args = Array.prototype.slice.call(arguments);
                args.shift();
                b = MathLib.hypot.apply(null, args);
            }
            a = MathLib.abs(a);
            b = MathLib.abs(b);
            if(a === Infinity || b === Infinity) {
                return Infinity;
            }
            if(a === 0 && b === 0) {
                return 0;
            }
            x = Math.max(a, b);
            y = Math.min(a, b);
            return x * Math.sqrt(1 + Math.pow(y / x, 2));
        },
        hypot2: function () {
            var args = Array.prototype.slice.call(arguments);
            if(args.some(function (x) {
                return x === Infinity || x === -Infinity;
            })) {
                return Infinity;
            }
            return args.reduce(function (old, cur) {
                return old + cur * cur;
            }, 0);
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
            var sqrt = Math.sqrt(x);
            var i;

            if(x % 1 === 0 && x > 1) {
                if(x === 2) {
                    return true;
                }
                if(x % 2 === 0) {
                    return false;
                }
                for(i = 3; i <= sqrt; i += 2) {
                    if(x % i === 0) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        isReal: function (a) {
            return true;
        },
        isZero: function (x) {
            return Math.abs(x) < MathLib.epsilon;
        },
        lg: function (x) {
            return Math.log(x) / Math.ln10;
        },
        ln: Math.log,
        log: function (base, x) {
            if(arguments.length === 1) {
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
        negative: function (x) {
            return -x;
        },
        pow: function (x, y) {
            if(x === 1 || (x === -1 && (y === Infinity || y === -Infinity))) {
                return 1;
            }
            return Math.pow(x, y);
        },
        radToDeg: function (x) {
            return x * 57.29577951308232;
        },
        random: Math.random,
        risingFactorial: function (n, m, s) {
            var res = 1;
            var j;

            s = s || 1;
            for(j = 0; j < m; j++) {
                res *= (n + j * s);
            }
            return res;
        },
        round: function (x) {
            if(x === 0) {
                return x;
            }
            return Math.round(x);
        },
        root: function (x, root) {
            if(arguments.length === 1) {
                return Math.sqrt(x);
            }
            return Math.pow(x, 1 / root);
        },
        sign: function (x) {
            return x && (x < 0 ? -1 : 1);
        },
        sqrt: function (x) {
            if(x === 0) {
                return 0;
            }
            return Math.sqrt(x);
        },
        trunc: function (x, n) {
            return x.toFixed(n || 0);
        },
        toLaTeX: function (x, plus) {
            if(plus) {
                return (x < 0 ? '-' : '+') + Math.abs(x);
            } else {
                return (x < 0 ? '-' : '') + Math.abs(x);
            }
        },
        toMathMLString: function (x, plus) {
            if(plus) {
                return '<mo>' + (x < 0 ? '-' : '+') + '</mo><mn>' + Math.abs(x) + '</mn>';
            } else {
                return (x < 0 ? '<mo>-</mo>' : '') + '<mn>' + Math.abs(x) + '</mn>';
            }
        },
        toString: function (x, plus) {
            if(plus) {
                return (x < 0 ? '-' : '+') + Math.abs(x);
            } else {
                return (x < 0 ? '-' : '') + Math.abs(x);
            }
        }
    };
    MathLib.toContentMathMLString = function (x) {
        if(typeof x === 'number') {
            return '<cn>' + x + '</cn>';
        } else {
            return x.toContentMathML();
        }
    };
    MathLib.and = function () {
        return Array.prototype.slice.call(arguments).every(function (x) {
            return !!x;
        });
    };
    MathLib.or = function () {
        return Array.prototype.slice.call(arguments).some(function (x) {
            return !!x;
        });
    };
    MathLib.xor = function () {
        return Array.prototype.slice.call(arguments).reduce(function (x, y) {
            return x + y;
        }) % 2 !== 0;
    };
    MathLib.not = function (x) {
        return !x;
    };
    MathLib.compare = function (a, b) {
        if(MathLib.type(a) !== MathLib.type(b)) {
            return MathLib.sign(MathLib.type(a).localeCompare(MathLib.type(b)));
        } else {
            if(typeof a === 'number') {
                return MathLib.sign(a - b);
            } else {
                if(typeof a === 'string') {
                    return a.localeCompare(b);
                }
            }
        }
        return a.compare(b);
    };
    MathLib.type = function (x) {
        if(x === null) {
            return 'null';
        }
        if(x === undefined) {
            return 'undefined';
        }
        return x.type ? x.type : Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    };
    MathLib.is = function (obj, type) {
        do {
            if(MathLib.type(obj) === type) {
                return true;
            }
            obj = Object.getPrototypeOf(Object(obj));
        }while(obj)
        return false;
    };
    var functionList3 = {
        arithMean: function () {
            return MathLib.plus.apply(null, this) / this.length;
        },
        gcd: function () {
            var min;
            var a = this;
            var magic = function (x) {
                return x !== min ? x % min : x;
            };
            var isntZero = function (x) {
                return x !== 0;
            };

            a = a.filter(function (x) {
                if(x < 0) {
                    a.push(-x);
                    return false;
                }
                return x !== 0;
            });
            while(a.length > 1) {
                min = MathLib.min(a);
                a = a.map(magic).filter(isntZero);
            }
            return a[0] || min;
        },
        geoMean: function () {
            return MathLib.root(MathLib.times.apply(null, this), this.length);
        },
        harmonicMean: function () {
            return this.length / MathLib.plus.apply(null, Array.prototype.map.call(this, MathLib.inverse));
        },
        lcm: function () {
            return MathLib.times(this) / MathLib.gcd(this);
        },
        max: function (n) {
            if(n) {
                return this.sort(MathLib.compare)[this.length - n];
            }
            return Math.max.apply('Array', this);
        },
        min: function (n) {
            if(n) {
                return this.sort(MathLib.compare)[n - 1];
            }
            return Math.min.apply('Array', this);
        }
    };
    MathLib.plus = function () {
        return Array.prototype.slice.apply(arguments).reduce(function (a, b) {
            var f1;
            var f2;
            var astr;
            var bstr;

            if(typeof a === 'number' && typeof b === 'number') {
                return a + b;
            } else {
                if(a.type === 'functn' || b.type === 'functn') {
                    astr = a.type === 'functn' ? a.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(a);
                    bstr = b.type === 'functn' ? b.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(b);
                    f1 = a;
                    f2 = b;
                    if(a.type !== 'functn') {
                        f1 = function () {
                            return a;
                        };
                    } else {
                        if(b.type !== 'functn') {
                            f2 = function () {
                                return b;
                            };
                        }
                    }
                    var MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/>' + astr + bstr + '</apply></lambda></math>';
                    return MathLib.functn(function (x) {
                        return MathLib.plus(f1(x), f2(x));
                    }, {
                        contentMathMLString: MathML
                    });
                } else {
                    if(typeof a === 'object') {
                        return a.plus(b);
                    } else {
                        if(typeof b === 'object') {
                            return b.plus(a);
                        }
                    }
                }
            }
        });
    };
    MathLib.isEqual = function () {
        return flatten(Array.prototype.slice.apply(arguments)).every(function (a, i, arr) {
            if(a === arr[0]) {
                return true;
            } else {
                if(typeof a === 'number' && typeof arr[0] === 'number') {
                    return Math.abs(a - arr[0]) <= 3e-15;
                } else {
                    if(typeof a === 'object') {
                        return a.isEqual(arr[0]);
                    } else {
                        if(typeof arr[0] === 'object') {
                            return arr[0].isEqual(a);
                        }
                    }
                }
            }
            return false;
        });
    };
    MathLib.times = function () {
        return Array.prototype.slice.apply(arguments).reduce(function (a, b) {
            var f1;
            var f2;
            var astr;
            var bstr;

            if(typeof a === 'number' && typeof b === 'number') {
                return a * b;
            } else {
                if(a.type === 'functn' || b.type === 'functn') {
                    astr = a.type === 'functn' ? a.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(a);
                    bstr = b.type === 'functn' ? b.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(b);
                    f1 = a;
                    f2 = b;
                    if(a.type !== 'functn') {
                        f1 = function () {
                            return a;
                        };
                    } else {
                        if(b.type !== 'functn') {
                            f2 = function () {
                                return b;
                            };
                        }
                    }
                    var MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><times/>' + astr + bstr + '</apply></lambda></math>';
                    return MathLib.functn(function (x) {
                        return MathLib.times(f1(x), f2(x));
                    }, {
                        contentMathMLString: MathML
                    });
                } else {
                    if(typeof a === 'object') {
                        return a.times(b);
                    } else {
                        if(typeof b === 'object') {
                            return b.times(a);
                        }
                    }
                }
            }
        });
    };
    var createFunction1 = function (f, name) {
        return function (x) {
            if(typeof x === 'number') {
                return f.apply('', arguments);
            } else {
                if(typeof x === 'function') {
                    return function (y) {
                        return f(x(y));
                    }
                } else {
                    if(x.type === 'set') {
                        return MathLib.set(x.map(f));
                    } else {
                        if(x.type === 'complex') {
                            return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
                        } else {
                            if(Array.isArray(x)) {
                                return x.map(f);
                            } else {
                                return x[name]();
                            }
                        }
                    }
                }
            }
        }
    };
    var createFunction3 = function (f, name) {
        return function () {
            var arg = Array.prototype.slice.call(arguments);
            var set = arg.shift();

            return f.apply(set, arg);
        }
    };
    var func;
    var cur;

    for(func in functionList1) {
        if(functionList1.hasOwnProperty(func)) {
            cur = functionList1[func];
            Object.defineProperty(MathLib, func, {
                value: createFunction1(functionList1[func], func)
            });
        }
    }
    prototypes.set = [];
    for(func in functionList3) {
        if(functionList3.hasOwnProperty(func)) {
            cur = functionList3[func];
            Object.defineProperty(MathLib, func, {
                value: createFunction3(functionList3[func], func)
            });
            MathLib.extendPrototype('set', func, ((function (name) {
                return function (n) {
                    return MathLib[name](this, n);
                }
            })(func)));
        }
    }
    var Vector = (function () {
        function Vector(coords) {
            var _this = this;
            this.type = 'Vector';
            coords.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = coords.length;
        }
        Vector.prototype.conjugate = function () {
            return new MathLib.Vector(this.map(MathLib.conjugate));
        };
        Vector.prototype.every = function (f) {
            return Array.prototype.every.call(this, f);
        };
        Vector.prototype.isEqual = function (v) {
            if(this.length !== v.length) {
                return false;
            }
            return this.every(function (x, i) {
                return MathLib.isEqual(x, v[i]);
            });
        };
        Vector.prototype.isZero = function (v) {
            return this.every(MathLib.isZero);
        };
        Vector.prototype.map = function (f) {
            return new this.constructor(Array.prototype.map.call(this, f));
        };
        Vector.prototype.minus = function (m) {
            return this.plus(m.negative());
        };
        Vector.prototype.negative = function () {
            return this.map(MathLib.negative);
        };
        Vector.prototype.normalize = function () {
            return this.times(1 / this.size());
        };
        Vector.prototype.outerProduct = function (v) {
            return MathLib.matrix(this.map(function (x) {
                return v.map(function (y) {
                    return MathLib.times(x, y);
                });
            }));
        };
        Vector.prototype.plus = function (v) {
            if(this.length === v.length) {
                return new MathLib.vector(this.map(function (x, i) {
                    return MathLib.plus(x, v[i]);
                }));
            }
        };
        Vector.prototype.reduce = function (f) {
            return Array.prototype.reduce.call(this, f);
        };
        Vector.prototype.scalarProduct = function (v) {
            return this.reduce(function (old, cur, i, w) {
                return MathLib.plus(old, MathLib.times(w[i], v[i]));
            }, 0);
        };
        Vector.prototype.size = function () {
            return MathLib.hypot.apply(null, this);
        };
        Vector.prototype.times = function (n) {
            var res = [];
            var i;
            var ii;

            if(typeof n === "number" || n.type === "complex") {
                return this.map(function (x) {
                    return MathLib.times(x, n);
                });
            }
            if(n.type === "matrix") {
                res = n.toColVectors();
                for(i = 0 , ii = res.length; i < ii; i++) {
                    res[i] = this.scalarProduct(res[i]);
                }
                return new MathLib.Vector(res);
            }
        };
        Vector.prototype.toArray = function () {
            return this.slice();
        };
        Vector.prototype.toContentMathMLString = function () {
            return this.reduce(function (old, cur) {
                return old + MathLib.toContentMathMLString(cur);
            }, '<vector>') + '</vector>';
        };
        Vector.prototype.toLaTeX = function () {
            return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
                return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
            }) + '\n\\end{pmatrix}';
        };
        Vector.prototype.toMathMLString = function () {
            return this.reduce(function (old, cur) {
                return old + '<mtr><mtd>' + MathLib.toMathMLString(cur) + '</mtd></mtr>';
            }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
        };
        Vector.prototype.toString = function () {
            return '(' + this.reduce(function (old, cur) {
                return old + ', ' + MathLib.toString(cur);
            }) + ')';
        };
        Vector.prototype.vectorproduct = function (v) {
            var res = [];
            if(this.length === 3 && v.length === 3) {
                res.push(MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])));
                res.push(MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])));
                res.push(MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0])));
            }
            return new MathLib.Vector(res);
        };
        Vector.prototype.zero = function (n) {
            var res = [];
            var i;

            for(i = 0; i < n; i++) {
                res.push(0);
            }
            return new MathLib.Vector(res);
        };
        return Vector;
    })();
    MathLib.Vector = Vector;    
    var Circle = (function () {
        function Circle(radius, center) {
            this.radius = radius;
            this.center = center;
            this.type = 'Circle';
        }
        Circle.prototype.area = function () {
            return this.radius * this.radius * Math.PI;
        };
        Circle.prototype.circumference = function () {
            return 2 * this.radius * Math.PI;
        };
        Circle.prototype.draw = function (screen, options) {
            if(Array.isArray(screen)) {
                var circle = this;
                screen.forEach(function (x) {
                    x.circle(circle, options);
                });
            } else {
                screen.circle(this, options);
            }
            return this;
        };
        Circle.prototype.isEqual = function (c) {
            return MathLib.isEqual(this.radius, c.radius) && this.center.isEqual(c.center);
        };
        Circle.prototype.positionOf = function (p) {
            var diff;
            if(p.type === 'point' && p.dim === 2) {
                diff = p.distanceTo(this.center) - this.radius;
                if(MathLib.isZero(diff)) {
                    return 'on';
                } else {
                    if(diff < 0) {
                        return 'in';
                    } else {
                        return 'out';
                    }
                }
            }
        };
        Circle.prototype.reflectAt = function (a) {
            return new MathLib.Circle(this.center.reflectAt(a), this.radius);
        };
        Circle.prototype.toLaTeX = function () {
            return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
        };
        Circle.prototype.toMatrix = function () {
            var x = this.center[0] / this.center[2];
            var y = this.center[1] / this.center[2];
            var r = this.radius;

            return new MathLib.Matrix([
                [
                    1, 
                    0, 
                    -x
                ], 
                [
                    0, 
                    1, 
                    -y
                ], 
                [
                    -x, 
                    -y, 
                    x * x + y * y - r * r
                ]
            ]);
        };
        return Circle;
    })();
    MathLib.Circle = Circle;    
    var Complex = (function () {
        function Complex(re, im) {
            this.re = re;
            this.im = im;
            this.type = 'Complex';
        }
        Complex.prototype.abs = function () {
            return MathLib.hypot(this.re, this.im);
        };
        Complex.prototype.arccos = function () {
            return MathLib.minus(Math.PI / 2, this.arcsin());
        };
        Complex.prototype.arccot = function () {
            return MathLib.minus(Math.PI / 2, this.arctan());
        };
        Complex.prototype.arccsc = function () {
            return MathLib.times(MathLib.complex([
                0, 
                1
            ]), MathLib.ln(MathLib.plus(MathLib.sqrt(MathLib.minus(1, MathLib.divide(1, MathLib.times(this, this)))), MathLib.divide(MathLib.complex([
                0, 
                1
            ]), this))));
        };
        Complex.prototype.arcsin = function () {
            var a = this.re;
            var b = this.im;

            return MathLib.complex([
                MathLib.sign(a) / 2 * MathLib.arccos(Math.sqrt(Math.pow(a * a + b * b - 1, 2) + 4 * b * b) - (a * a + b * b)), 
                MathLib.sign(b) / 2 * MathLib.arcosh(Math.sqrt(Math.pow(a * a + b * b - 1, 2) + 4 * b * b) + (a * a + b * b))
            ]);
        };
        Complex.prototype.arctan = function () {
            var z = MathLib.complex(-this.im, this.re);
            return MathLib.times(MathLib.complex([
                0, 
                0.5
            ]), MathLib.ln(MathLib.divide(MathLib.plus(1, z), MathLib.minus(1, z))));
        };
        Complex.prototype.arg = function () {
            return Math.atan2(this.im, this.re);
        };
        Complex.prototype.artanh = function () {
            return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
        };
        Complex.prototype.compare = function (x) {
            var a = MathLib.sign(this.abs() - x.abs());
            return a ? a : MathLib.sign(this.arg() - x.arg());
        };
        Complex.prototype.conjugate = function () {
            return MathLib.complex([
                this.re, 
                MathLib.negative(this.im)
            ]);
        };
        Complex.prototype.copy = function () {
            return MathLib.complex([
                MathLib.copy(this.re), 
                MathLib.copy(this.im)
            ]);
        };
        Complex.prototype.cos = function () {
            return MathLib.complex([
                MathLib.cos(this.re) * MathLib.cosh(this.im), 
                -MathLib.sin(this.re) * MathLib.sinh(this.im)
            ]);
        };
        Complex.prototype.cosh = function () {
            return MathLib.complex([
                MathLib.cos(this.im) * MathLib.cosh(this.re), 
                MathLib.sin(this.im) * MathLib.sinh(this.re)
            ]);
        };
        Complex.prototype.divide = function (c) {
            return this.times(MathLib.inverse(c));
        };
        Complex.prototype.exp = function () {
            return MathLib.complex([
                MathLib.exp(this.re) * MathLib.cos(this.im), 
                MathLib.exp(this.re) * MathLib.sin(this.im)
            ]);
        };
        Complex.prototype.inverse = function () {
            return MathLib.complex([
                MathLib.divide(this.re, MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2))), 
                MathLib.divide(MathLib.negative(this.im), MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2)))
            ]);
        };
        Complex.prototype.isEqual = function (n) {
            if(typeof n === "number") {
                return MathLib.isEqual(this.re, n) && MathLib.isZero(this.im);
            }
            if(n.type === "complex") {
                return MathLib.isEqual(this.re, n.re) && MathLib.isEqual(this.im, n.im);
            }
            return false;
        };
        Complex.prototype.isFinite = function () {
            return MathLib.isFinite(this.re) && MathLib.isFinite(this.im);
        };
        Complex.prototype.isOne = function () {
            return MathLib.isOne(this.re) && MathLib.isZero(this.im);
        };
        Complex.prototype.isReal = function () {
            return MathLib.isZero(this.im);
        };
        Complex.prototype.isZero = function () {
            return MathLib.isZero(this.re) && MathLib.isZero(this.im);
        };
        Complex.prototype.ln = function () {
            return MathLib.complex([
                MathLib.ln(this.abs()), 
                this.arg()
            ]);
        };
        Complex.prototype.minus = function (c) {
            return this.plus(MathLib.negative(c));
        };
        Complex.prototype.mod = function (m) {
            return MathLib.complex([
                MathLib.mod(this.re, m), 
                MathLib.mod(this.im, m)
            ]);
        };
        Complex.prototype.negative = function () {
            return MathLib.complex([
                MathLib.negative(this.re), 
                MathLib.negative(this.im)
            ]);
        };
        Complex.one = new Complex([
            1, 
            0
        ]);
        Complex.prototype.plus = function (c) {
            if(c.type === "complex") {
                return MathLib.complex([
                    MathLib.plus(this.re, c.re), 
                    MathLib.plus(this.im, c.im)
                ]);
            } else {
                if(typeof c === "number") {
                    return MathLib.complex([
                        MathLib.plus(this.re, c), 
                        this.im
                    ]);
                }
            }
        };
        Complex.prototype.pow = function (n) {
            return MathLib.complex(Math.pow(this.abs(), n), n * this.arg());
        };
        Complex.prototype.sign = function () {
            return MathLib.complex(1, this.arg());
        };
        Complex.prototype.sin = function () {
            return MathLib.complex([
                MathLib.sin(this.re) * MathLib.cosh(this.im), 
                MathLib.cos(this.re) * MathLib.sinh(this.im)
            ]);
        };
        Complex.prototype.sinh = function () {
            return MathLib.complex([
                MathLib.cos(this.im) * MathLib.sinh(this.re), 
                MathLib.sin(this.im) * MathLib.cosh(this.re)
            ]);
        };
        Complex.prototype.times = function (c) {
            if(c.type === "complex") {
                return MathLib.complex([
                    MathLib.minus(MathLib.times(this.re, c.re), MathLib.times(this.im, c.im)), 
                    MathLib.plus(MathLib.times(this.re, c.im), MathLib.times(this.im, c.re))
                ]);
            } else {
                if(typeof c === "number") {
                    return MathLib.complex([
                        MathLib.times(this.re, c), 
                        MathLib.times(this.im, c)
                    ]);
                }
            }
        };
        Complex.prototype.toContentMathMLString = function () {
            return '<cn type="complex-cartesian">' + this.re + '<sep/>' + this.im + '</cn>';
        };
        Complex.prototype.toLaTeX = function () {
            var str = '';
            var reFlag = false;

            if(!MathLib.isZero(this.re)) {
                str = MathLib.toLaTeX(this.re);
                reFlag = true;
            }
            if(!MathLib.isZero(this.im)) {
                str += MathLib.toLaTeX(this.im, reFlag) + 'i';
            }
            if(str.length === 0) {
                str = '0';
            }
            return str;
        };
        Complex.prototype.toMathMLString = function () {
            var str = '';
            var reFlag = false;

            if(!MathLib.isZero(this.re)) {
                str = MathLib.toMathMLString(this.re);
                reFlag = true;
            }
            if(!MathLib.isZero(this.im)) {
                str += MathLib.toMathMLString(this.im, reFlag) + '<mo>&#x2062;</mo><mi>i</mi>';
            }
            if(str.length === 0) {
                str = '<mn>0</mn>';
            }
            return str;
        };
        Complex.prototype.toMatrix = function () {
            return MathLib.matrix([
                [
                    this.re, 
                    MathLib.negative(this.im)
                ], 
                [
                    this.im, 
                    this.re
                ]
            ]);
        };
        Complex.prototype.toPoint = function () {
            return MathLib.point(this.z.concat(1));
        };
        Complex.prototype.toString = function () {
            var str = '';
            if(!MathLib.isZero(this.re)) {
                str = MathLib.toString(this.re);
            }
            if(!MathLib.isZero(this.im)) {
                str += (this.im > 0 ? (str.length ? '+' : '') : '-') + MathLib.toString(Math.abs(this.im)) + 'i';
            }
            if(str.length === 0) {
                str = '0';
            }
            return str;
        };
        Complex.zero = new Complex([
            0, 
            0
        ]);
        return Complex;
    })();
    MathLib.Complex = Complex;    
    var Line = (function (_super) {
        __extends(Line, _super);
        function Line(re, im) {
        }
        Line.prototype.draw = function (screen, options) {
            if(Array.isArray(screen)) {
                var line = this;
                screen.forEach(function (x) {
                    x.line(line, options);
                });
            } else {
                screen.line(this, options);
            }
            return this;
        };
        Line.prototype.isEqual = function (q) {
            var p = this.normalize();
            q = q.normalize();
            if(this.dim !== q.dim) {
                return false;
            }
            return p.every(function (x, i) {
                return MathLib.isEqual(x, q[i]);
            });
        };
        Line.prototype.isFinite = function (q) {
            return !MathLib.isZero(this[this.length - 1]);
        };
        Line.prototype.isOrthogonalTo = function (l) {
            return MathLib.isEqual(MathLib.point([
                0, 
                0, 
                1
            ]).crossRatio(this.meet(MathLib.line([
                0, 
                0, 
                1
            ])), l.meet(MathLib.line([
                0, 
                0, 
                1
            ])), MathLib.point.I, MathLib.point.J), -1);
        };
        Line.prototype.isParallelTo = function (l) {
            return this.every(function (x, i) {
                return MathLib.isEqual(x, l[i]) || i === l.length - 1;
            });
        };
        Line.prototype.meet = function (l) {
            return MathLib.point([
                this[1] * l[2] - this[2] * l[1], 
                l[0] * this[2] - this[0] * l[2], 
                this[0] * l[1] - this[1] * l[0]
            ]);
        };
        Line.prototype.normalize = function (q) {
            var last = this[this.dim];
            return this.map(function (x) {
                return x / last;
            });
        };
        return Line;
    })(Vector);
    MathLib.Line = Line;    
    var Permutation = (function () {
        function Permutation(p) {
            this.type = 'Permutation';
            if(Array.isArray(p[0])) {
                cycle = p;
                permutation = MathLib.permutation.cycleToList(cycle);
            } else {
                permutation = p;
                cycle = MathLib.permutation.listToCycle(permutation);
            }
        }
        Permutation.prototype.applyTo = function (n) {
            var p;
            var res;

            if(typeof n === 'number') {
                if(n >= this.length) {
                    return n;
                }
                return this[n];
            } else {
                p = this;
                res = n.map(function (x, i) {
                    return n[p.applyTo(i)];
                });
                return (n.type === undefined ? res : n.constructor(res));
            }
        };
        Permutation.cycleToList = function cycleToList(cycle) {
            var index;
            var res = [];
            var cur;
            var i;
            var ii;
            var j;
            var jj;
            var max;

            max = cycle.map(function (b) {
                return Math.max.apply(null, b);
            });
            max = Math.max.apply(null, max);
            for(i = 0 , ii = max; i <= ii; i++) {
                cur = i;
                for(j = 0 , jj = cycle.length; j < jj; j++) {
                    index = cycle[j].indexOf(cur);
                    if(++index) {
                        cur = cycle[j][index % cycle[j].length];
                    }
                }
                res.push(cur);
            }
            return res;
        }
        Permutation.id = new Permutation([
            []
        ]);
        Permutation.prototype.inverse = function () {
            var cycle = this.cycle.slice();
            cycle.reverse().forEach(function (e) {
                e.reverse();
            });
            return MathLib.permutation(cycle);
        };
        Permutation.listToCycle = function listToCycle(list) {
            var finished = [];
            var cur;
            var i;
            var ii;
            var temp;
            var res = [];

            for(i = 0 , ii = list.length; i < ii; i++) {
                cur = i;
                temp = [];
                while(!finished[cur]) {
                    finished[cur] = true;
                    temp.push(cur);
                    cur = list[cur];
                }
                if(temp.length) {
                    res.push(temp);
                }
            }
            return res;
        }
        Permutation.prototype.map = function (f) {
            return this.constructor(Array.prototype.map.call(this, f));
        };
        Permutation.prototype.sgn = function () {
            var count = 0;
            var i;

            for(i = 0; i < this.cycle.length; i++) {
                count += this.cycle[i].length;
            }
            count += this.cycle.length;
            return -2 * (count % 2) + 1;
        };
        Permutation.prototype.times = function (p) {
            var a = this;
            return p.map(function (x) {
                return a[x];
            });
        };
        Permutation.prototype.toMatrix = function (n) {
            var arr = [];
            var res = [];
            var temp;
            var i;
            var ii;

            n = n || this.length;
            for(i = 0 , ii = n - 1; i < ii; i++) {
                arr.push(0);
            }
            arr = arr.concat([
                1
            ]).concat(arr);
            for(i = 0 , ii = n; i < ii; i++) {
                temp = n - this.applyTo(i) - 1;
                res.push(arr.slice(temp, temp + n));
            }
            return MathLib.matrix(res);
        };
        Permutation.prototype.toString = function () {
            var str = '';
            this.cycle.forEach(function (elem) {
                str += '(' + elem.toString() + ')';
            });
            return str;
        };
        return Permutation;
    })();
    MathLib.Permutation = Permutation;    
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point(radius, center) {
        }
        Point.prototype.crossRatio = function (a, b, c, d) {
            var x = this.toArray();
            var m1 = MathLib.matrix([
                x, 
                a, 
                c
            ]);
            var m2 = MathLib.matrix([
                x, 
                b, 
                d
            ]);
            var m3 = MathLib.matrix([
                x, 
                a, 
                d
            ]);
            var m4 = MathLib.matrix([
                x, 
                b, 
                c
            ]);

            return (m1.det() * m2.det()) / (m3.det() * m4.det());
        };
        Point.prototype.distanceTo = function (point) {
            var res = 0;
            var i;

            if(arguments.length === 0) {
                for(i = 0; i < this.dim; i++) {
                    res += Math.pow(this[i], 2);
                }
                return Math.sqrt(res);
            }
            if(point.type === 'point' && this.dim === point.dim) {
                for(i = 0; i < this.dim; i++) {
                    res += Math.pow(this[i] - point[i], 2);
                }
            }
            return Math.sqrt(res);
        };
        Point.prototype.draw = function (screen, options) {
            if(Array.isArray(screen)) {
                var point = this;
                screen.forEach(function (x) {
                    x.point(point, options);
                });
            } else {
                screen.point(this, options);
            }
            return this;
        };
        Point.prototype.isEqual = function (q) {
            var p = this.normalize();
            q = q.normalize();
            if(this.dim !== q.dim) {
                return false;
            }
            return p.every(function (x, i) {
                return MathLib.isEqual(x, q[i]);
            });
        };
        Point.prototype.isFinite = function (q) {
            return !MathLib.isZero(this[this.length - 1]);
        };
        Point.prototype.isInside = function (a) {
            if(a.type === 'circle') {
                return this.distanceTo(a.center) < a.radius;
            }
        };
        Point.prototype.isOn = function (a) {
            if(a.type === 'line') {
                return this.distanceTo(a.center) === a.radius;
            } else {
                if(a.type === 'circle') {
                    return this.distanceTo(a.center) === a.radius;
                }
            }
        };
        Point.prototype.isOutside = function (a) {
            if(a.type === 'circle') {
                return this.distanceTo(a.center) > a.radius;
            }
        };
        Point.prototype.lineTo = function (q) {
            if(this.dim === 2 && q.dim === 2) {
                return MathLib.line(this, q);
            }
        };
        Point.prototype.normalize = function (q) {
            var last = this[this.dim];
            return this.map(function (x) {
                return x / last;
            });
        };
        Point.prototype.reflectAt = function (a) {
            if(a.type === 'point') {
                if(this.dim === a.dim) {
                    var arr = [];
                    var i;
                    var p = this.normalize();

                    a = a.normalize();
                    for(i = 0; i < this.dim; i++) {
                        arr.push(2 * a[i] - p[i]);
                    }
                    arr.push(1);
                    return MathLib.point(arr);
                }
            }
        };
        Point.prototype.toArray = function () {
            var res = [];
            var i;
            var ii;

            for(i = 0 , ii = this.dim; i <= ii; i++) {
                res.push(this[i]);
            }
            return res;
        };
        Point.prototype.toComplex = function () {
            if(this.dim === 2) {
                return MathLib.complex(this[0] / this[2], this[1] / this[2]);
            }
        };
        Point.prototype.toLaTeX = function (opt) {
            var p = opt ? this : this.normalize().slice(0, -1);
            return '\\begin{pmatrix}' + p.reduce(function (old, cur) {
                return old + '\\\\' + MathLib.toLaTeX(cur);
            }) + '\\end{pmatrix}';
        };
        Point.prototype.toMathMLString = function (opt) {
            var p = opt ? this : this.normalize().slice(0, -1);
            return p.reduce(function (old, cur) {
                return old + '<mtr><mtd>' + MathLib.toMathMLString(cur) + '</mtd></mtr>';
            }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
        };
        Point.prototype.toString = function (opt) {
            var p = opt ? this : this.normalize().slice(0, -1);
            return '(' + p.reduce(function (old, cur) {
                return old + ', ' + MathLib.toString(cur);
            }) + ')';
        };
        return Point;
    })(Vector);
    MathLib.Point = Point;    
    var Polynomial = (function () {
        function Polynomial(polynomial) {
            this.type = 'Polynomial';
            this.zero = new MathLib.Polynomial([
                0
            ]);
        }
        Polynomial.prototype.content = function () {
            return MathLib.gcd(this);
        };
        Polynomial.prototype.differentiate = function (n) {
            if(n === 0) {
                return this;
            }
            if(n < 0) {
                return this.integrate(-n);
            }
            var temparr = [];
            var i;

            n = n || 1;
            for(i = 0; i <= this.deg - n; i++) {
                temparr[i] = MathLib.times(this[i + n], MathLib.fallingFactorial(i + n, n));
            }
            return MathLib.polynomial(temparr);
        };
        Polynomial.prototype.draw = function (screen, options) {
            var path = [];
            var i;
            var line = this;

            if(this.deg < 2) {
                if(Array.isArray(screen)) {
                    screen.forEach(function (x) {
                        x.line([
                            [
                                -50, 
                                line.valueAt(-50)
                            ], 
                            [
                                50, 
                                line.valueAt(50)
                            ]
                        ], options);
                    });
                } else {
                    screen.line([
                        [
                            -50, 
                            this.valueAt(-50)
                        ], 
                        [
                            50, 
                            this.valueAt(50)
                        ]
                    ], options);
                }
            } else {
                for(i = -50; i <= 50; i = Math.round((i + 0.01) * 100) / 100) {
                    path.push([
                        i, 
                        this.valueAt(i)
                    ]);
                }
                if(Array.isArray(screen)) {
                    screen.forEach(function (x) {
                        x.path(path, options);
                    });
                } else {
                    screen.path(path, options);
                }
            }
            return this;
        };
        Polynomial.prototype.integrate = function (n) {
            var temparr = [];
            var i;

            n = n || 1;
            if(MathLib.isZero(n)) {
                return this;
            }
            if(n < 0) {
                return this.differentiate(-n);
            }
            for(i = 0; i < n; i++) {
                temparr.push(0);
            }
            for(i = 0; i <= this.deg; i++) {
                temparr[i + n] = this[i] / MathLib.fallingFactorial(i + n, n);
            }
            return MathLib.polynomial(temparr);
        };
        Polynomial.prototype.interpolation = function (a, b) {
            var temp;
            var res = MathLib.polynomial([
                0
            ]);
            var n = a.length;
            var i;
            var j;
            var x;
            var y;

            if(arguments.length === 2) {
                a = a.map(function (x, i) {
                    return [
                        x, 
                        b[i]
                    ];
                });
            }
            for(i = 0; i < n; i++) {
                temp = MathLib.polynomial([
                    1
                ]);
                for(j = 0; j < n; j++) {
                    if(i !== j) {
                        temp = temp.times(MathLib.polynomial([
                            -a[j][0] / (a[i][0] - a[j][0]), 
                            1 / (a[i][0] - a[j][0])
                        ]));
                    }
                }
                res = res.plus(temp.times(a[i][1]));
            }
            return res;
        };
        Polynomial.prototype.isEqual = function (p) {
            var i;
            var ii;

            if(this.deg !== p.deg || this.subdeg !== p.subdeg) {
                return false;
            }
            for(i = 0 , ii = this.deg; i <= ii; i++) {
                if(!MathLib.isEqual(this[i], p[i])) {
                    return false;
                }
            }
            return true;
        };
        Polynomial.prototype.isPrimitive = function () {
            return MathLib.gcd(this) === 1;
        };
        Polynomial.prototype.isReal = function () {
            return this.every(MathLib.isReal);
        };
        Polynomial.prototype.map = function (f) {
            return MathLib.polynomial(Array.prototype.map.call(this, f));
        };
        Polynomial.prototype.mod = function (m) {
            return this.map(function (x) {
                return MathLib.mod(x, m);
            });
        };
        Polynomial.prototype.negative = function () {
            return MathLib.polynomial(this.map(MathLib.negative));
        };
        Polynomial.one = new MathLib.Polynomial([
            1
        ]);
        Polynomial.prototype.plus = function (a, all) {
            var temparr = [];
            var i;

            if(typeof a === 'number') {
                if(all) {
                    return this.map(function (b) {
                        return MathLib.plus(a, b);
                    });
                } else {
                    temparr = this.slice();
                    temparr[0] = MathLib.plus(temparr[0], a);
                }
            } else {
                if(a.type === 'polynomial') {
                    for(i = 0; i <= Math.min(this.deg, a.deg); i++) {
                        temparr[i] = MathLib.plus(this[i], a[i]);
                    }
                    temparr = temparr.concat((this.deg > a.deg ? this : a).slice(i));
                }
            }
            return MathLib.polynomial(temparr);
        };
        Polynomial.regression = function regression(x, y) {
            var length = x.length;
            var xy = 0;
            var xi = 0;
            var yi = 0;
            var x2 = 0;
            var m;
            var c;
            var i;

            if(arguments.length === 2) {
                for(i = 0; i < length; i++) {
                    xy += x[i] * y[i];
                    xi += x[i];
                    yi += y[i];
                    x2 += x[i] * x[i];
                }
            } else {
                for(i = 0; i < length; i++) {
                    xy += x[i][0] * x[i][1];
                    xi += x[i][0];
                    yi += x[i][1];
                    x2 += x[i][0] * x[i][0];
                }
            }
            m = (length * xy - xi * yi) / (length * x2 - xi * xi);
            c = (yi * x2 - xy * xi) / (length * x2 - xi * xi);
            return MathLib.polynomial([
                c, 
                m
            ]);
        }
        Polynomial.roots = function roots(roots) {
            var temp;
            var coef = [];
            var i;
            var ii;

            if(MathLib.type(roots) === 'array') {
                roots = MathLib.set(roots, true);
            }
            temp = roots.powerset();
            for(i = 0 , ii = roots.card; i < ii; i++) {
                coef[i] = 0;
            }
            temp.slice(1).forEach(function (x, i) {
                coef[ii - x.card] = MathLib.plus(coef[ii - x.card], x.times());
            });
            coef = coef.map(function (x, i) {
                if((ii - i) % 2) {
                    return MathLib.negative(x);
                }
                return x;
            });
            coef.push(1);
            return MathLib.polynomial(coef);
        }
        Polynomial.prototype.tangent = function (p) {
            var value = this.valueAt(p);
            var slope = this.differentiate().valueAt(p);

            return MathLib.polynomial([
                value - slope * p, 
                slope
            ]);
        };
        Polynomial.prototype.times = function (a) {
            var temparr = [];
            var i;
            var j;

            if(a.type === 'polynomial') {
                for(i = 0; i <= this.deg; i++) {
                    for(j = 0; j <= a.deg; j++) {
                        temparr[i + j] = MathLib.plus((temparr[i + j] ? temparr[i + j] : 0), MathLib.times(this[i], a[j]));
                    }
                }
            } else {
                temparr = this.map(function (b) {
                    return MathLib.times(a, b);
                });
            }
            return MathLib.polynomial(temparr);
        };
        Polynomial.prototype.toContentMathMLString = function (math) {
            var str = '<apply><plus/>';
            var i;

            for(i = this.deg; i >= 0; i--) {
                if(!MathLib.isZero(this[i])) {
                    if(i === 0) {
                        str += MathLib.toContentMathMLString(this[i]);
                    } else {
                        str += '<apply><times/>' + MathLib.toContentMathMLString(this[i], true);
                    }
                    if(i > 1) {
                        str += '<apply><power/><ci>x</ci>' + MathLib.toContentMathMLString(i) + '</apply></apply>';
                    } else {
                        if(i === 1) {
                            str += '<ci>x</ci></apply>';
                        }
                    }
                }
            }
            str += '</apply>';
            if(math) {
                str = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication>' + str + '</lambda></math>';
            }
            return str;
        };
        Polynomial.prototype.toFunctn = function () {
            var str = '';
            var i;
            var ii;

            for(i = 0 , ii = this.deg; i <= ii; i++) {
                if(!MathLib.isZero(this[i])) {
                    if(i === 0) {
                        str += MathLib.toString(this[i]);
                    } else {
                        str += MathLib.toString(this[i], true);
                    }
                    if(i > 1) {
                        str += '* Math.pow(x,' + MathLib.toString(i) + ')';
                    } else {
                        if(i === 1) {
                            str += '*x';
                        }
                    }
                }
            }
            return MathLib.functn(new Function('x', 'return ' + str), {
                contentMathMLString: this.toContentMathMLString(true)
            });
        };
        Polynomial.prototype.toLaTeX = function () {
            var str = MathLib.toString(this[this.deg]) + '*x^{' + this.deg + '}';
            var i;

            for(i = this.deg - 1; i >= 0; i--) {
                if(!MathLib.isZero(this[i])) {
                    str += MathLib.toLaTeX(this[i], true);
                    if(i > 1) {
                        str += 'x^{' + MathLib.toLaTeX(i) + '}';
                    } else {
                        if(i === 1) {
                            str += 'x';
                        }
                    }
                }
            }
            return str;
        };
        Polynomial.prototype.toMathMLString = function (math) {
            var str = '<mrow>' + MathLib.toMathMLString(this[this.deg], true) + '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathMLString(this.deg) + '</msup>';
            var i;

            for(i = this.deg - 1; i >= 0; i--) {
                if(!MathLib.isZero(this[i])) {
                    str += MathLib.toMathMLString(this[i], true);
                    if(i > 1) {
                        str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathMLString(i) + '</msup>';
                    } else {
                        if(i === 1) {
                            str += '<mo>&#x2062;</mo><mi>x</mi>';
                        }
                    }
                }
            }
            str += '</mrow>';
            if(math) {
                str = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + str + '</math>';
            }
            return str;
        };
        Polynomial.prototype.toString = function (opt) {
            var str = MathLib.toString(this[this.deg]) + '*x^' + this.deg;
            var i;

            for(i = this.deg - 1; i >= 0; i--) {
                if(!MathLib.isZero(this[i])) {
                    str += MathLib.toString(this[i], true);
                    if(i > 1) {
                        str += '*x^' + MathLib.toString(i);
                    } else {
                        if(i === 1) {
                            str += '*x';
                        }
                    }
                }
            }
            return str;
        };
        Polynomial.prototype.valueAt = function (x) {
            var pot = MathLib.is(x, 'matrix') ? MathLib.matrix.identity(x.rows, x.cols) : 1;
            var res = MathLib.is(x, 'matrix') ? MathLib.matrix.zero(x.rows, x.cols) : 0;
            var i;
            var ii;

            for(i = 0 , ii = this.deg; i <= ii; i++) {
                res = MathLib.plus(res, MathLib.times(this[i], pot));
                pot = MathLib.times(pot, x);
            }
            return res;
        };
        return Polynomial;
    })();
    MathLib.Polynomial = Polynomial;    
})(MathLib || (MathLib = {}));

