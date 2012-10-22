var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var MathLib;
(function (MathLib) {
    MathLib.version = '0.3.5';
    MathLib.apery = 1.2020569031595942;
    MathLib.e = Math.E;
    MathLib.epsilon = Number.EPSILON || ((function () {
        var next;
        var result;

        for(next = 1; 1 + next !== 1; next = next / 2) {
            result = next;
        }
        return result;
    })());
    MathLib.eulerMascheroni = 0.5772156649015329;
    MathLib.goldenRatio = 1.618033988749895;
    MathLib.pi = Math.PI;
    var prototypes = {
        array: Object.getPrototypeOf([]),
        func: Object.getPrototypeOf(function () {
        }),
        object: Object.getPrototypeOf({
        })
    };
    var proto = '__proto__';
    var flatten = function (a) {
        var res = [];
        a.forEach(function (x) {
            if(Array.isArray(x)) {
                res = res.concat(flatten(x));
            } else {
                res.push(x);
            }
        });
        return res;
    };

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
            var tokenizer = new DOMParser();
            var MathMLdoc;
            var MathML;

            if(typeof MathMLString !== 'string') {
                MathMLString = MathMLString.toContentMathML();
            }
            MathMLString = MathMLString.replace(/\n/g, '');
            MathMLString = MathMLString.replace(/((?!cs)[^>]{2})>(\s)*</g, '$1><');
            MathMLString = MathMLString.replace(/&(\w*);/g, '#$1;');
            MathMLdoc = tokenizer.parseFromString(MathMLString, 'application/xml');
            var createToken;
            var curToken = null;
            var tokenStack = [];

            createToken = function (t) {
                var attributes = {
                };
                var i;
                var ii;

                if(t.attributes) {
                    for(i = 0 , ii = t.attributes.length; i < ii; i++) {
                        attributes[t.attributes[i].name] = t.attributes[i].value;
                    }
                }
                var newToken = Object.create({
                }, {
                    attributes: {
                        value: attributes
                    },
                    nodeName: {
                        value: t.nodeName
                    },
                    parentNode: {
                        value: tokenStack[tokenStack.length - 1]
                    },
                    prevNode: {
                        value: curToken
                    }
                });
                if(curToken) {
                    curToken.nextNode = newToken;
                }
                curToken = newToken;
                tokenStack.push(newToken);
                newToken.childNodes = Array.prototype.slice.call(t.childNodes).map(createToken);
                tokenStack.pop();
                var attributesString = function (x) {
                    var str = '';
                    var attr;

                    for(attr in x.attributes) {
                        if(x.attributes.hasOwnProperty(attr)) {
                            str += ' ' + attr + '="' + x.attributes[attr] + '"';
                        }
                    }
                    return str;
                };
                if(newToken.childNodes.length !== 0) {
                    newToken.innerMathML = newToken.childNodes.reduce(function (prev, cur, index, array) {
                        return prev + cur.outerMathML;
                    }, '');
                } else {
                    newToken.innerMathML = '';
                }
                if(newToken.childNodes.length === 0) {
                    if(newToken.nodeName === '#text') {
                        newToken.outerMathML = t.textContent.replace(/#(\w*);/g, '&$1;');
                    } else {
                        newToken.outerMathML = '<' + newToken.nodeName + attributesString(newToken) + '/>';
                    }
                } else {
                    newToken.outerMathML = '<' + newToken.nodeName + attributesString(newToken) + '>' + newToken.innerMathML + '</' + newToken.nodeName + '>';
                }
                if(newToken.nodeName === 'lambda') {
                    newToken.bvars = [];
                    for(i = 0 , ii = newToken.childNodes.length; i < ii; i++) {
                        if(newToken.childNodes[i].nodeName === 'bvar') {
                            newToken.bvars.push(newToken.childNodes[i].childNodes[0].innerMathML);
                        } else {
                            if(newToken.childNodes[i].nodeName === 'domainofapplication') {
                                newToken.domainofapplication = newToken.childNodes[i];
                            } else {
                                if(newToken.childNodes[i].nodeName === 'apply') {
                                    newToken.apply = newToken.childNodes[i];
                                }
                            }
                        }
                    }
                }
                return newToken;
            };
            MathML = createToken(MathMLdoc.childNodes[0]);
            this.attributes = MathML.attributes;
            this.childNodes = MathML.childNodes;
            this.innerMathML = MathML.innerMathML;
            this.outerMathML = MathML.outerMathML;
            this.nodeName = MathML.nodeName;
            this.nextNode = MathML.nextNode;
            this.parentNode = null;
            this.prevNode = null;
        }
        MathML.isSupported = function () {
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
                            return new MathLib.Complex(+node.childNodes[0].outerMathML, +node.childNodes[2].outerMathML);
                        } else {
                            if(type === 'complex-polar') {
                                return MathLib.Complex.polar(+node.childNodes[0].outerMathML, +node.childNodes[2].outerMathML);
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
                    return new MathLib.Matrix(node.childNodes.map(handlers.matrixrow));
                },
                matrixrow: function (node) {
                    return node.childNodes.map(parser);
                },
                set: function (node) {
                    var type = node.attributes.type && node.attributes.type === 'multiset' ? true : false;
                    return new MathLib.Set(node.childNodes.map(parser), type);
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
                    return new MathLib.Complex(0, 1);
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
                    return new MathLib.Vector(node.childNodes.map(parser));
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
        MathML.variables = {
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
                value: new MathLib.MathML(contentMathML)
            }
        });
        return functn;
    };
    MathLib.extendPrototype('functn', 'constructor', MathLib.functn);
    MathLib.extendPrototype('functn', 'type', 'functn');
    MathLib.extendPrototype('functn', 'draw', function (screen, options) {
        var path = [];
        var i;

        for(i = -50; i <= 50; i = Math.round((i + 0.01) * 100) / 100) {
            path.push([
                i, 
                this(i)
            ]);
        }
        if(Array.isArray(screen)) {
            screen.forEach(function (x) {
                x.path(path, options);
            });
        } else {
            screen.path(path, options);
        }
        return this;
    });
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
            MathLib.extend('', elemfn, MathLib.functn(functionList[elemfn], {
                name: elemfn,
                contentMathMLString: mathStart + elemfn + mathEnd
            }));
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
            return new MathLib.Set(res, true);
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
        return x.type ? x.type : x.constructor.name.toLowerCase();
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
    MathLib.extendPrototype('functn', 'toContentMathML', function () {
        return this.contentMathML;
    });
    MathLib.extendPrototype('functn', 'toContentMathMLString', function () {
        return this.contentMathML.outerMathML;
    });
    MathLib.extendPrototype('functn', 'toLaTeX', function (bvar) {
        var handlers = {
            apply: function (n) {
                var f = n.childNodes[0];
                var args = n.childNodes.slice(1).map(function (x) {
                    return handlers[x.nodeName](x);
                });
                var str = '';

                if(f.nodeName === 'plus') {
                    str = args.join('+');
                } else {
                    if(f.nodeName === 'times') {
                        str = args.join('*');
                    } else {
                        if(f.nodeName === 'power') {
                            str = args[0] + '^{' + args[1] + '}';
                        } else {
                            str = '\\' + f.nodeName + '(' + args.join(', ') + ')';
                        }
                    }
                }
                return str;
            },
            bvar: function () {
                return '';
            },
            ci: function (n) {
                return bvar || n.innerMathML;
            },
            cn: function (n) {
                return n.innerMathML;
            },
            cs: function (n) {
                return n.innerMathML;
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
        return handlers[this.contentMathML.childNodes[0].nodeName](this.contentMathML.childNodes[0]);
    });
    MathLib.extendPrototype('functn', 'toMathML', function () {
        return this.contentMathML.toMathML();
    });
    MathLib.extendPrototype('functn', 'toMathMLString', function () {
        return this.contentMathML.toMathMLString();
    });
    MathLib.extendPrototype('functn', 'toString', function (bvar) {
        var handlers = {
            apply: function (n) {
                var f = n.childNodes[0];
                var args = n.childNodes.slice(1).map(function (x) {
                    return handlers[x.nodeName](x);
                });
                var str = '';

                if(f.nodeName === 'plus') {
                    str = args.join('+');
                } else {
                    if(f.nodeName === 'times') {
                        str = args.join('*');
                    } else {
                        if(f.nodeName === 'power') {
                            str = args[0] + '^' + args[1];
                        } else {
                            str = f.nodeName + '(' + args.join(', ') + ')';
                        }
                    }
                }
                return str;
            },
            bvar: function () {
                return '';
            },
            ci: function (n) {
                return bvar || n.innerMathML;
            },
            cn: function (n) {
                return n.innerMathML;
            },
            cs: function (n) {
                return n.innerMathML;
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
        return handlers[this.contentMathML.childNodes[0].nodeName](this.contentMathML.childNodes[0]);
    });
    prototypes.screen = {
    };
    MathLib.screen = function (id, options) {
        if(arguments.length === 0) {
            return Object.create(prototypes.screen, {
            });
        }
        var element = document.getElementById(id);
        var screen = Object.create(prototypes.screen);
        var contextmenu;
        var set = {
            axisType: 'in',
            axisColor: 'black',
            axisLineWidth: 0.05,
            background: 'white',
            down: -5,
            drag: false,
            fillColor: 'rgba(0,255,0,0.1)',
            fillLeft: -5,
            fillRight: 5,
            fontSize: 10,
            gridAngle: Math.PI / 6,
            gridColor: '#cccccc',
            gridLineWidth: 0.05,
            gridType: 'cartesian',
            height: parseInt(element.getAttribute('height'), 10),
            label: true,
            labelColor: 'black',
            labelFont: 'Helvetica',
            labelFontSize: '16px',
            left: -5,
            pan: true,
            plotColor: 'blue',
            plotLineWidth: 0.05,
            right: 5,
            stepSizeX: 1,
            stepSizeY: 1,
            state: '',
            up: 5,
            width: parseInt(element.getAttribute('width'), 10),
            zoom: true,
            zoomSpeed: 0.2
        };

        for(var opt in options) {
            if(options.hasOwnProperty(opt)) {
                set[opt] = options[opt];
            }
        }
        set.id = id;
        set.element = element;
        set.type = element.localName;
        for(var prop in set) {
            if(set.hasOwnProperty(prop)) {
                Object.defineProperty(screen, prop, {
                    value: set[prop],
                    enumerable: true,
                    writable: true
                });
            }
        }
        var curTransformation = MathLib.matrix([
            [
                screen.width / ((screen.right - screen.left) * screen.stepSizeX), 
                0, 
                screen.width / 2
            ], 
            [
                0, 
                -screen.height / ((screen.up - screen.down) * screen.stepSizeY), 
                screen.height / 2
            ], 
            [
                0, 
                0, 
                1
            ]
        ]);
        Object.defineProperty(screen, 'curTransformation', {
            get: function () {
                return curTransformation;
            },
            set: function (x) {
                curTransformation = x;
                screen.applyTransformation();
            }
        });
        Object.defineProperty(screen, 'origTransformation', {
            value: MathLib.matrix([
                [
                    screen.width / ((screen.right - screen.left) * screen.stepSizeX), 
                    0, 
                    screen.width / 2
                ], 
                [
                    0, 
                    -screen.height / ((screen.up - screen.down) * screen.stepSizeY), 
                    screen.height / 2
                ], 
                [
                    0, 
                    0, 
                    1
                ]
            ])
        });
        Object.defineProperty(screen, 'curTranslateX', {
            get: function () {
                return screen.curTransformation[0][2];
            },
            set: function (x) {
                screen.curTransformation[0][2] = x;
                screen.applyTransformation();
            }
        });
        Object.defineProperty(screen, 'curTranslateY', {
            get: function () {
                return screen.curTransformation[1][2];
            },
            set: function (y) {
                screen.curTransformation[1][2] = y;
                screen.applyTransformation();
            }
        });
        Object.defineProperty(screen, 'origTranslateX', {
            get: function () {
                return screen.origTransformation[0][2];
            },
            set: function (x) {
                screen.origTransformation[0][2] = x;
            }
        });
        Object.defineProperty(screen, 'origTranslateY', {
            get: function () {
                return screen.origTransformation[1][2];
            },
            set: function (y) {
                screen.origTransformation[1][2] = y;
            }
        });
        Object.defineProperty(screen, 'curZoomX', {
            get: function () {
                return screen.curTransformation[0][0];
            },
            set: function (x) {
                screen.curTransformation[0][0] = x;
                screen.applyTransformation();
            }
        });
        Object.defineProperty(screen, 'curZoomY', {
            get: function () {
                return screen.curTransformation[1][1];
            },
            set: function (y) {
                screen.curTransformation[1][1] = y;
                screen.applyTransformation();
            }
        });
        Object.defineProperty(screen, 'origZoomX', {
            get: function () {
                return screen.origTransformation[0][0];
            },
            set: function (x) {
                screen.origTransformation[0][0] = x;
            }
        });
        Object.defineProperty(screen, 'origZoomY', {
            get: function () {
                return screen.origTransformation[1][1];
            },
            set: function (y) {
                set.origTransformation[1][1] = y;
            }
        });
        screen.screenWrapper = document.createElement('div');
        screen.screenWrapper.className = 'MathLib screenWrapper';
        element.parentNode.insertBefore(screen.screenWrapper, element);
        screen.screenWrapper.appendChild(element);
        screen.contextmenuWrapper = document.createElement('div');
        screen.contextmenuWrapper.className = 'MathLib contextmenuWrapper';
        screen.screenWrapper.appendChild(screen.contextmenuWrapper);
        contextmenu = document.createElement('ul');
        contextmenu.className = 'MathLib contextmenu';
        screen.contextmenuWrapper.appendChild(contextmenu);
        var coordinates = document.createElement('li');
        coordinates.className = 'MathLib menuitem';
        coordinates.innerHTML = '<span>Position</span><span style="float: right; padding-right: 10px">❯</span>';
        coordinates.onclick = function () {
            screen.contextmenuWrapper.style.setProperty('display', 'none');
        };
        contextmenu.appendChild(coordinates);
        var coordinatesSubmenu = document.createElement('ul');
        coordinatesSubmenu.className = 'MathLib contextmenu submenu';
        coordinates.appendChild(coordinatesSubmenu);
        var cartesian = document.createElement('li');
        cartesian.className = 'MathLib menuitem';
        cartesian.onclick = function () {
            screen.contextmenuWrapper.style.setProperty('display', 'none');
        };
        coordinatesSubmenu.appendChild(cartesian);
        var polar = document.createElement('li');
        polar.className = 'MathLib menuitem';
        polar.onclick = function () {
            screen.contextmenuWrapper.style.setProperty('display', 'none');
        };
        coordinatesSubmenu.appendChild(polar);
        var reset = document.createElement('li');
        reset.className = 'MathLib menuitem';
        reset.innerHTML = 'Reset View';
        reset.onclick = function () {
            screen.resetView();
            screen.contextmenuWrapper.style.setProperty('display', 'none');
        };
        contextmenu.appendChild(reset);
        if(document.webkitCancelFullScreen) {
            var fullscreen = document.createElement('li');
            fullscreen.className = 'MathLib menuitem';
            fullscreen.innerHTML = 'View full screen';
            fullscreen.onclick = function (evt) {
                if((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                    screen.enterFullscreen();
                } else {
                    screen.exitFullscreen();
                }
                screen.contextmenuWrapper.style.setProperty('display', 'none');
            };
            contextmenu.appendChild(fullscreen);
            var fullscreenchange = function (evt) {
                if((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                    fullscreen.innerHTML = 'View Fullscreen';
                    screen.resize(screen.width, screen.height);
                    screen.curTranslateX = screen.origTranslateX;
                    screen.curTranslateY = screen.origTranslateY;
                    screen.redraw();
                } else {
                    fullscreen.innerHTML = 'Exit Fullscreen';
                    screen.resize(window.outerWidth, window.outerHeight);
                    screen.curTranslateX = window.outerWidth / 2;
                    screen.curTranslateY = window.outerHeight / 2;
                    screen.redraw();
                }
            };
            if(document.webkitCancelFullScreen) {
                screen.screenWrapper.addEventListener('webkitfullscreenchange', fullscreenchange, false);
            } else {
                if(document.mozCancelFullScreen) {
                    screen.screenWrapper.addEventListener('mozfullscreenchange', fullscreenchange, false);
                }
            }
        }
        return screen;
    };
    MathLib.extendPrototype('screen', 'axis', function (options) {
        var type;
        var i;
        var axisOpt;
        var labelOpt;

        if(arguments.length === 0 || type === true) {
            axisOpt = {
                lineColor: this.axisColor,
                fillColor: 'rgba(255, 255, 255, 0)',
                layer: 'back',
                lineWidth: this.axisLineWidth
            };
            labelOpt = {
                color: this.labelColor,
                layer: 'back',
                font: this.labelFont,
                fontSize: this.labelFontSize
            };
            type = this.axisType;
        } else {
            axisOpt = {
                lineColor: options.color || this.axisColor,
                fillColor: 'rgba(255, 255, 255, 0)',
                layer: 'back',
                lineWidth: options.lineWidth || this.axisLineWidth
            };
            labelOpt = {
                color: options.textColor || this.labelColor,
                layer: 'back',
                font: options.font || this.labelFont,
                fontSize: options.font || this.labelFontSize
            };
            type = options.type || this.axisType;
            this.axisColor = axisOpt.lineColor;
            this.axisLineWidth = axisOpt.lineWidth;
            this.axisType = type;
            this.labelColor = labelOpt.color;
            this.labelFont = labelOpt.font;
            this.labelFontSize = labelOpt.fontSize;
        }
        if(type === 'in') {
            var lengthX = 10 / this.origZoomX;
            var lengthY = 10 / this.origZoomY;

            this.line([
                [
                    -50, 
                    0
                ], 
                [
                    50, 
                    0
                ]
            ], axisOpt);
            this.line([
                [
                    0, 
                    -50
                ], 
                [
                    0, 
                    50
                ]
            ], axisOpt);
            for(i = this.stepSizeX; i <= 50 * this.stepSizeX; i += this.stepSizeX) {
                this.line([
                    [
                        i, 
                        -lengthY
                    ], 
                    [
                        i, 
                        lengthY
                    ]
                ], axisOpt);
            }
            for(i = -this.stepSizeX; i >= -50 * this.stepSizeX; i -= this.stepSizeX) {
                this.line([
                    [
                        i, 
                        -lengthY
                    ], 
                    [
                        i, 
                        lengthY
                    ]
                ], axisOpt);
            }
            for(i = this.stepSizeY; i <= 50 * this.stepSizeY; i += this.stepSizeY) {
                this.line([
                    [
                        -lengthX, 
                        i
                    ], 
                    [
                        lengthX, 
                        i
                    ]
                ], axisOpt);
            }
            for(i = -this.stepSizeY; i >= -50 * this.stepSizeY; i -= this.stepSizeY) {
                this.line([
                    [
                        -lengthX, 
                        i
                    ], 
                    [
                        lengthX, 
                        i
                    ]
                ], axisOpt);
            }
            if(this.label) {
                for(i = this.stepSizeX; i <= 50 * this.stepSizeX; i += this.stepSizeX) {
                    this.text(i + '', i - lengthX / 2, -2.5 * lengthY, labelOpt);
                }
                for(i = -this.stepSizeX; i >= -50 * this.stepSizeX; i -= this.stepSizeX) {
                    this.text(i + '', i - lengthX / 2, -2.5 * lengthY, labelOpt);
                }
                for(i = this.stepSizeY; i <= 50 * this.stepSizeY; i += this.stepSizeY) {
                    this.text(i + '', -2.5 * lengthX, i - lengthY / 2, labelOpt);
                }
                for(i = -this.stepSizeY; i >= -50 * this.stepSizeY; i -= this.stepSizeY) {
                    this.text(i + '', -2.5 * lengthX, i - lengthY / 2, labelOpt);
                }
            }
        }
        return this;
    });
    MathLib.extendPrototype('screen', 'contextmenu', function (evt) {
        if(evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = false;
        var x = this.getX(evt);
        var y = this.getY(evt);

        var menu = this.contextmenuWrapper.childNodes[0];
        menu.style.setProperty('top', (evt.clientY - 20) + 'px');
        menu.style.setProperty('left', evt.clientX + 'px');
        var wrapper = this.contextmenuWrapper;
        wrapper.style.setProperty('display', 'block');
        wrapper.style.setProperty('width', '100%');
        wrapper.style.setProperty('height', '100%');
        menu.childNodes[0].childNodes[2].childNodes[0].innerHTML = 'cartesian: (' + MathLib.round(x, 2) + ', ' + MathLib.round(y, 2) + ')';
        menu.childNodes[0].childNodes[2].childNodes[1].innerHTML = 'polar: (' + MathLib.round(MathLib.hypot(x, y), 2) + ', ' + MathLib.round(Math.atan2(y, x), 2) + ')';
        var screen = this;
        var listener = function () {
            screen.contextmenuWrapper.style.setProperty('display', 'none');
            wrapper.style.setProperty('width', '0px');
            wrapper.style.setProperty('height', '0px');
            screen.contextmenuWrapper.removeEventListener('click', listener);
        };

        this.contextmenuWrapper.addEventListener('click', listener);
    });
    MathLib.extendPrototype('screen', 'enterFullscreen', function () {
        var elem = this.screenWrapper;
        if(elem.requestFullScreen) {
            elem.requestFullScreen();
        } else {
            if(elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else {
                if(elem.webkitRequestFullScreen) {
                    elem.webkitRequestFullScreen();
                }
            }
        }
        return this;
    });
    MathLib.extendPrototype('screen', 'exitFullscreen', function () {
        if(document.cancelFullScreen) {
            document.cancelFullScreen();
        } else {
            if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else {
                if(document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        }
        return this;
    });
    MathLib.extendPrototype('screen', 'getEventPoint', function (evt) {
        var x;
        var y;

        if(evt.offsetX) {
            x = evt.offsetX;
            y = evt.offsetY;
        } else {
            x = evt.layerX;
            y = evt.layerY;
        }
        return MathLib.point([
            x, 
            y, 
            1
        ]);
    });
    MathLib.extendPrototype('screen', 'getX', function (evt) {
        var osX;
        if(evt.offsetX) {
            osX = evt.offsetX;
        } else {
            osX = evt.layerX;
        }
        return (osX - this.curTranslateX) / this.curZoomX;
    });
    MathLib.extendPrototype('screen', 'getY', function (evt) {
        var osY;
        if(evt.offsetY) {
            osY = evt.offsetY;
        } else {
            osY = evt.layerY;
        }
        return (osY - this.curTranslateY) / this.curZoomY;
    });
    MathLib.extendPrototype('screen', 'grid', function (options) {
        var angle;
        var type;
        var i;
        var gridOpt;

        if(arguments.length === 0 || type === true) {
            gridOpt = {
                lineColor: this.gridColor,
                fillColor: 'rgba(255, 255, 255, 0)',
                layer: 'back',
                lineWidth: this.gridLineWidth
            };
            type = this.gridType;
            angle = this.gridAngle;
        } else {
            if(type !== false) {
                gridOpt = {
                    lineColor: options.color || this.gridColor,
                    fillColor: 'rgba(255, 255, 255, 0)',
                    layer: 'back',
                    lineWidth: options.lineWidth || this.gridLineWidth
                };
                type = options.type || this.gridType;
                angle = options.angle || this.gridAngle;
                this.girdColor = gridOpt.lineColor;
                this.gridLineWidth = gridOpt.lineWidth;
                this.gridType = type;
                this.gridAngle = angle;
            }
        }
        if(type === 'cartesian') {
            for(i = -50; i <= 50; i += this.stepSizeX) {
                this.line([
                    [
                        i, 
                        -50
                    ], 
                    [
                        i, 
                        50
                    ]
                ], gridOpt);
            }
            for(i = -50; i <= 50; i += this.stepSizeY) {
                this.line([
                    [
                        -50, 
                        i
                    ], 
                    [
                        50, 
                        i
                    ]
                ], gridOpt);
            }
        } else {
            if(type === 'polar') {
                for(i = 0; i < 2 * Math.PI; i += angle) {
                    this.line([
                        [
                            0, 
                            0
                        ], 
                        [
                            50 * Math.cos(i), 
                            50 * Math.sin(i)
                        ]
                    ], gridOpt);
                }
                for(i = 1; i < 60; i += 1) {
                    this.circle(MathLib.circle([
                        0, 
                        0, 
                        1
                    ], i), gridOpt);
                }
            }
        }
        return this;
    });
    MathLib.extendPrototype('screen', 'lineEndPoints', function (l) {
        if(l.type === 'line') {
            var right = -(l[2] + l[0] * 50) / l[1];
            var up = -(l[2] + l[1] * 50) / l[0];
            var left = -(l[2] + l[0] * -50) / l[1];
            var down = -(l[2] + l[1] * -50) / l[0];
            var res = [];

            if(right < 50 && right > -50) {
                res.push([
                    50, 
                    right
                ]);
            }
            if(left < 50 && left > -50) {
                res.push([
                    -50, 
                    left
                ]);
            }
            if(up < 50 && up > -50) {
                res.push([
                    up, 
                    50
                ]);
            }
            if(down < 50 && down > -50) {
                res.push([
                    down, 
                    -50
                ]);
            }
            return res;
        } else {
            return l;
        }
    });
    MathLib.extendPrototype('screen', 'onmousedown', function (evt) {
        if(evt.button !== 0) {
            return;
        }
        if(evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = false;
        if(evt.target.tagName === 'canvas' || evt.target.tagName === 'svg' || !this.drag) {
            this.interaction = 'pan';
            this.startPoint = this.getEventPoint(evt);
            this.startTransformation = this.curTransformation.copy();
        }
    });
    MathLib.extendPrototype('screen', 'onmousemove', function (evt) {
        var p;
        if(evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = false;
        if(this.interaction === 'pan' && this.pan) {
            p = this.getEventPoint(evt).minus(this.startPoint);
            this.curTranslateX = this.startTransformation[0][2] + p[0];
            this.curTranslateY = this.startTransformation[1][2] + p[1];
            this.redraw();
        }
    });
    MathLib.extendPrototype('screen', 'onmouseup', function (evt) {
        if(evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = false;
        if(this.interaction === 'pan' || this.interaction === 'drag') {
            this.interaction = '';
        }
    });
    MathLib.extendPrototype('screen', 'onmousewheel', function (evt) {
        var delta;
        var k;
        var p;
        var z;

        if(!this.zoom) {
            return;
        }
        if(evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = false;
        if(evt.wheelDelta) {
            delta = evt.wheelDelta / 360;
        } else {
            delta = evt.detail / -9;
        }
        z = Math.pow(1 + this.zoomSpeed, delta);
        p = this.curTransformation.inverse().times(this.getEventPoint(evt));
        k = MathLib.matrix([
            [
                z, 
                0, 
                p[0] - p[0] * z
            ], 
            [
                0, 
                z, 
                p[1] - p[1] * z
            ], 
            [
                0, 
                0, 
                1
            ]
        ]);
        this.curTransformation = this.curTransformation.times(k);
        this.redraw();
        if(typeof this.startTransformation === "undefined") {
            this.startTransformation = this.curTransformation.inverse();
        }
        this.startTransformation = this.startTransformation.times(k.inverse());
    });
    prototypes.canvas = MathLib.screen();
    MathLib.canvas = function (canvasId) {
        var canvas = MathLib.screen(canvasId);
        canvas[proto] = prototypes.canvas;
        Object.defineProperty(canvas, 'drawingStack', {
            value: []
        });
        var wrapperDiv = document.createElement('div');
        wrapperDiv.style.setProperty('width', '100%');
        wrapperDiv.style.setProperty('height', '100%');
        wrapperDiv.style.setProperty('position', 'relative');
        canvas.element.parentNode.insertBefore(wrapperDiv, canvas.element.wrapperDiv);
        var backLayer = document.createElement('canvas');
        backLayer.setAttribute('width', canvas.width + 'px');
        backLayer.setAttribute('height', canvas.height + 'px');
        backLayer.classList.add('MathLib-backLayer');
        backLayer.classList.add('MathLib-canvas');
        canvas.backLayer = {
            ctx: backLayer.getContext('2d'),
            element: backLayer
        };
        wrapperDiv.appendChild(backLayer);
        canvas.mainLayer = {
            ctx: document.getElementById(canvasId).getContext('2d'),
            element: document.getElementById(canvasId)
        };
        wrapperDiv.appendChild(canvas.mainLayer.element);
        var frontLayer = document.createElement('canvas');
        frontLayer.setAttribute('width', canvas.width + 'px');
        frontLayer.setAttribute('height', canvas.height + 'px');
        frontLayer.classList.add('MathLib-frontLayer');
        frontLayer.classList.add('MathLib-canvas');
        canvas.frontLayer = {
            ctx: frontLayer.getContext('2d'),
            element: frontLayer
        };
        wrapperDiv.appendChild(frontLayer);
        var layers = [
            canvas.mainLayer, 
            canvas.backLayer, 
            canvas.frontLayer
        ];
        layers.forEach(function (l) {
            l.ctx.save();
            l.ctx.transform(canvas.curZoomX, 0, 0, canvas.curZoomY, canvas.curTranslateX, canvas.curTranslateY);
            l.element.style.setProperty('position', 'absolute');
            l.element.style.setProperty('left', '0px');
            l.element.style.setProperty('top', '0px');
        });
        canvas.frontLayer.element.onselectstart = function () {
            return false;
        };
        canvas.frontLayer.element.onmousedown = function (evt) {
            canvas.onmousedown(evt);
        };
        canvas.frontLayer.element.oncontextmenu = function (evt) {
            canvas.oncontextmenu(evt);
        };
        canvas.frontLayer.element.onmousemove = function (evt) {
            canvas.onmousemove(evt);
        };
        canvas.frontLayer.element.onmouseup = function (evt) {
            canvas.onmouseup(evt);
        };
        if('onmousewheel' in canvas.frontLayer.element) {
            canvas.frontLayer.element.onmousewheel = function (evt) {
                canvas.onmousewheel(evt);
            };
        } else {
            canvas.frontLayer.element.DOMMouseScroll = function (evt) {
                canvas.onmousewheel(evt);
            };
        }
        return canvas;
    };
    MathLib.extendPrototype('canvas', 'applyTransformation', function () {
        this.clearLayer('back', 'main', 'front');
        var m = this.curTransformation;
        this.backLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
        this.mainLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
        this.frontLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
        return this;
    });
    MathLib.extendPrototype('canvas', 'circle', function (circle, userOpt) {
        var defaultOpt = {
            fillColor: 'rgba(0, 0, 255, 0.05)',
            lineColor: 'rgba(0, 0, 255, 1)',
            lineWidth: 0.05,
            dash: [],
            dashOffset: 0
        };
        var ctx;
        var prop;
        var opt;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            ctx = this[userOpt.layer + 'Layer'].ctx;
        } else {
            ctx = this.mainLayer.ctx;
        }
        if(userOpt.redraw) {
            opt = userOpt;
        } else {
            opt = this.normalizeOptions(defaultOpt, userOpt);
        }
        for(prop in opt) {
            if(opt.hasOwnProperty(prop)) {
                ctx[prop] = opt[prop];
            }
        }
        ctx.beginPath();
        ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        if(ctx === this.mainLayer.ctx && !opt.redraw) {
            opt.redraw = true;
            this.drawingStack.push({
                object: circle,
                options: opt,
                type: 'circle'
            });
        }
        return this;
    });
    MathLib.extendPrototype('canvas', 'clearLayer', function () {
        var canvas = this;
        var p1 = this.curTransformation.inverse().times(MathLib.point(this.element.width, 0));
        var p2 = this.curTransformation.inverse().times(MathLib.point(0, this.element.height));

        Array.prototype.forEach.call(arguments, function (layer) {
            canvas[layer + 'Layer'].ctx.clearRect(p1[0], p1[1], p2[0] - p1[0], p2[1] - p1[1]);
        });
        return this;
    });
    MathLib.extendPrototype('canvas', 'line', function (line, userOpt) {
        var defaultOpt = {
            fillColor: 'rgba(0, 0, 0, 0)',
            lineColor: 'rgba(0, 0, 0, 1)',
            lineWidth: 0.05,
            dash: [],
            dashOffset: 0
        };
        var points = this.lineEndPoints(line);
        var ctx;
        var prop;
        var opt;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            ctx = this[userOpt.layer + 'Layer'].ctx;
        } else {
            ctx = this.mainLayer.ctx;
        }
        if(userOpt.redraw) {
            opt = userOpt;
        } else {
            opt = this.normalizeOptions(defaultOpt, userOpt);
        }
        for(prop in opt) {
            if(opt.hasOwnProperty(prop)) {
                ctx[prop] = opt[prop];
            }
        }
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        ctx.lineTo(points[1][0], points[1][1]);
        ctx.stroke();
        ctx.closePath();
        if(ctx === this.mainLayer.ctx && !opt.redraw) {
            opt.redraw = true;
            this.drawingStack.push({
                object: line,
                options: opt,
                type: 'line'
            });
        }
        return this;
    });
    MathLib.extendPrototype('canvas', 'normalizeOptions', function (defaultOpt, userOpt) {
        return {
            fillStyle: userOpt.fillColor || userOpt.color || defaultOpt.fillColor || defaultOpt.color,
            lineWidth: userOpt.lineWidth || defaultOpt.lineWidth,
            font: userOpt.font || defaultOpt.font,
            fontSize: userOpt.fontSize || defaultOpt.fontSize,
            size: userOpt.size || defaultOpt.size,
            mozDash: userOpt.dash || defaultOpt.dash,
            mozDashOffset: userOpt.dashOffset || defaultOpt.dashOffset,
            strokeStyle: userOpt.lineColor || userOpt.color || defaultOpt.lineColor || defaultOpt.color,
            webkitLineDash: userOpt.dash || defaultOpt.dash,
            webkitLineDashOffset: userOpt.dashOffset || defaultOpt.dashOffset
        };
    });
    MathLib.extendPrototype('canvas', 'oncontextmenu', function (evt) {
        this.contextmenu(evt);
    });
    MathLib.extendPrototype('canvas', 'path', function (path, userOpt) {
        var defaultOpt = {
            fillColor: 'rgba(0, 0, 0, 0)',
            lineColor: 'rgba(0, 0, 255, 1)',
            lineWidth: 0.05,
            dash: [],
            dashOffset: 0
        };
        var ctx;
        var prop;
        var opt;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            ctx = this[userOpt.layer + 'Layer'].ctx;
        } else {
            ctx = this.mainLayer.ctx;
        }
        if(userOpt.redraw) {
            opt = userOpt;
        } else {
            opt = this.normalizeOptions(defaultOpt, userOpt);
        }
        for(prop in opt) {
            if(opt.hasOwnProperty(prop)) {
                ctx[prop] = opt[prop];
            }
        }
        ctx.beginPath();
        ctx.moveTo(path[0][0], path[0][1]);
        path.forEach(function (x) {
            ctx.lineTo(x[0], x[1]);
        });
        ctx.stroke();
        ctx.closePath();
        if(ctx === this.mainLayer.ctx && !opt.redraw) {
            opt.redraw = true;
            this.drawingStack.push({
                object: path,
                options: opt,
                type: 'path'
            });
        }
        return this;
    });
    MathLib.extendPrototype('canvas', 'point', function (point, userOpt) {
        var defaultOpt = {
            fillColor: 'rgba(0, 0, 0, 1)',
            lineColor: 'rgba(0, 0, 0, 1)',
            lineWidth: 0.05,
            dash: [],
            dashOffset: 0
        };
        var ctx;
        var prop;
        var opt;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            ctx = this[userOpt.layer + 'Layer'].ctx;
        } else {
            ctx = this.mainLayer.ctx;
        }
        if(userOpt.redraw) {
            opt = userOpt;
        } else {
            opt = this.normalizeOptions(defaultOpt, userOpt);
        }
        for(prop in opt) {
            if(opt.hasOwnProperty(prop)) {
                ctx[prop] = opt[prop];
            }
        }
        ctx.beginPath();
        ctx.arc(point[0] / point[2], point[1] / point[2], 0.05, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        if(ctx === this.mainLayer.ctx && !opt.redraw) {
            opt.redraw = true;
            this.drawingStack.push({
                object: point,
                options: opt,
                type: 'point'
            });
        }
        return this;
    });
    MathLib.extendPrototype('canvas', 'redraw', function () {
        var canvas = this;
        this.clearLayer('back', 'main', 'front');
        this.grid();
        this.axis();
        this.drawingStack.forEach(function (x, i) {
            canvas[x.type](x.object, x.options);
        });
        return this;
    });
    MathLib.extendPrototype('canvas', 'resetView', function () {
        this.curTransformation = this.origTransformation;
        this.redraw();
        return this;
    });
    MathLib.extendPrototype('canvas', 'resize', function (x, y) {
        [
            this.backLayer, 
            this.mainLayer, 
            this.frontLayer
        ].forEach(function (l) {
            l.element.setAttribute('width', x + 'px');
            l.element.setAttribute('height', y + 'px');
        });
        return this;
    });
    MathLib.extendPrototype('canvas', 'text', function (str, x, y, userOpt) {
        var defaultOpt = {
            font: 'Helvetica',
            fontSize: '16px',
            fillColor: 'rgba(0, 0, 0, 1)',
            lineColor: 'rgba(0, 0, 0, 1)',
            lineWidth: 0.05,
            dash: [],
            dashOffset: 0,
            size: 0.4
        };
        var ctx;
        var prop;
        var opt;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            ctx = this[userOpt.layer + 'Layer'].ctx;
        } else {
            ctx = this.mainLayer.ctx;
        }
        if(userOpt.redraw) {
            opt = userOpt;
        } else {
            opt = this.normalizeOptions(defaultOpt, userOpt);
        }
        for(prop in opt) {
            if(opt.hasOwnProperty(prop)) {
                ctx[prop] = opt[prop];
            }
        }
        ctx.font = opt.fontSize + ' ' + opt.font;
        ctx.save();
        ctx.transform(1 / this.origZoomX, 0, 0, 1 / this.origZoomY, 0, 0);
        ctx.fillText(str, x * this.origZoomX, -y * this.origZoomY);
        ctx.restore();
        if(ctx === this.mainLayer.ctx && !opt.redraw) {
            opt.redraw = true;
            this.drawingStack.push({
                object: str,
                options: opt,
                type: 'text'
            });
        }
        return this;
    });
    prototypes.svg = MathLib.screen();
    MathLib.svg = function (svgId) {
        var svgElement = document.getElementById(svgId);
        var svg = MathLib.screen(svgId);

        svg[proto] = prototypes.svg;
        var ctx = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        ctx.setAttributeNS(null, 'transform', 'matrix(' + svg.curZoomX + ',0, 0,' + svg.curZoomY + ', ' + svg.width / 2 + ', ' + svg.height / 2 + ')');
        svgElement.appendChild(ctx);
        svg.ctx = ctx;
        var backLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        backLayer.className.baseVal += ' MathLib-backLayer ';
        ctx.appendChild(backLayer);
        svg.backLayer = {
            element: backLayer
        };
        var mainLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        mainLayer.className.baseVal += ' MathLib-mainLayer ';
        ctx.appendChild(mainLayer);
        svg.mainLayer = {
            element: mainLayer
        };
        var frontLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        frontLayer.className.baseVal += ' MathLib-frontLayer ';
        ctx.appendChild(frontLayer);
        svg.frontLayer = {
            element: frontLayer
        };
        svgElement.onselectstart = function () {
            return false;
        };
        svgElement.onmousedown = function (evt) {
            svg.onmousedown(evt);
        };
        svgElement.oncontextmenu = function (evt) {
            svg.oncontextmenu(evt);
        };
        svgElement.onmousemove = function (evt) {
            svg.onmousemove(evt);
        };
        svgElement.onmouseup = function (evt) {
            svg.onmouseup(evt);
        };
        if('onmousewheel' in svgElement) {
            svgElement.onmousewheel = function (evt) {
                svg.onmousewheel(evt);
            };
        } else {
            svgElement.DOMMouseScroll = function (evt) {
                svg.onmousewheel(evt);
            };
        }
        return svg;
    };
    MathLib.extendPrototype('svg', 'applyTransformation', function () {
        var m = this.curTransformation;
        this.ctx.setAttribute('transform', 'matrix(' + m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2] + ')');
        return this;
    });
    MathLib.extendPrototype('svg', 'circle', function (circle, userOpt) {
        var svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        var defaultOpt = {
            fillColor: 'rgba(0, 0, 255, 0.05)',
            lineColor: 'rgba(0, 0, 255, 1)',
            lineWidth: '0.05'
        };
        var layer;
        var prop;
        var opt;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            layer = this[userOpt.layer + 'Layer'];
        } else {
            layer = this.mainLayer;
        }
        opt = this.normalizeOptions(defaultOpt, userOpt);
        for(prop in opt) {
            if(opt.hasOwnProperty(prop)) {
                svgCircle.setAttributeNS(null, prop, opt[prop]);
            }
        }
        svgCircle.setAttributeNS(null, 'cx', circle.center[0] / circle.center[2]);
        svgCircle.setAttributeNS(null, 'cy', circle.center[1] / circle.center[2]);
        svgCircle.setAttributeNS(null, 'r', circle.radius);
        layer.element.appendChild(svgCircle);
        return this;
    });
    MathLib.extendPrototype('svg', 'clearLayer', function () {
        var svg = this;
        Array.prototype.forEach.call(arguments, function (layer) {
            layer = svg[layer + 'Layer'].element;
            while(layer.hasChildNodes()) {
                layer.removeChild(layer.firstChild);
            }
        });
        return this;
    });
    MathLib.extendPrototype('svg', 'line', function (line, userOpt) {
        var svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        var points = this.lineEndPoints(line);
        var defaultOpt = {
            lineColor: 'rgba(0, 0, 0, 1)',
            lineWidth: '0.05'
        };
        var layer;
        var prop;
        var opt;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            layer = this[userOpt.layer + 'Layer'];
        } else {
            layer = this.mainLayer;
        }
        opt = this.normalizeOptions(defaultOpt, userOpt);
        for(prop in opt) {
            if(opt.hasOwnProperty(prop)) {
                svgLine.setAttributeNS(null, prop, opt[prop]);
            }
        }
        svgLine.setAttributeNS(null, 'x1', points[0][0]);
        svgLine.setAttributeNS(null, 'y1', points[0][1]);
        svgLine.setAttributeNS(null, 'x2', points[1][0]);
        svgLine.setAttributeNS(null, 'y2', points[1][1]);
        layer.element.appendChild(svgLine);
        return this;
    });
    MathLib.extendPrototype('svg', 'normalizeOptions', function (defaultOpt, userOpt) {
        return {
            fill: userOpt.fillColor || userOpt.color || defaultOpt.fillColor || defaultOpt.color,
            'font-family': userOpt.font || defaultOpt.font,
            'font-size': userOpt.fontSize || defaultOpt.fontSize,
            size: userOpt.size || defaultOpt.size,
            stroke: userOpt.lineColor || userOpt.color || defaultOpt.lineColor || defaultOpt.color,
            'stroke-dasharray': userOpt.dash || defaultOpt.dash,
            'stroke-dashoffset': userOpt.dashOffset || defaultOpt.dashOffset,
            'stroke-width': userOpt.lineWidth || defaultOpt.lineWidth
        };
    });
    MathLib.extendPrototype('svg', 'oncontextmenu', function (evt) {
        this.contextmenu(evt);
    });
    MathLib.extendPrototype('svg', 'path', function (path, userOpt) {
        var svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var pathString = 'M' + path.reduce(function (prev, cur) {
            return prev + ' L' + cur.join(' ');
        });
        var defaultOpt = {
            fillColor: 'rgba(255, 255, 255, 0)',
            lineColor: 'rgba(0, 0, 255, 1)',
            lineWidth: '0.05'
        };
        var layer;
        var prop;
        var opt;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            layer = this[userOpt.layer + 'Layer'];
        } else {
            layer = this.mainLayer;
        }
        opt = this.normalizeOptions(defaultOpt, userOpt);
        for(prop in opt) {
            if(opt.hasOwnProperty(prop)) {
                svgPath.setAttributeNS(null, prop, opt[prop]);
            }
        }
        svgPath.setAttributeNS(null, 'd', pathString);
        layer.element.appendChild(svgPath);
        return this;
    });
    MathLib.extendPrototype('svg', 'point', function (point, userOpt) {
        var svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        var defaultOpt = {
            fillColor: 'rgba(0, 0, 0, 1)',
            lineColor: 'rgba(0, 0, 0, 1)',
            lineWidth: '0.05'
        };
        var layer;
        var prop;
        var opt;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            layer = this[userOpt.layer + 'Layer'];
        } else {
            layer = this.mainLayer;
        }
        opt = this.normalizeOptions(defaultOpt, userOpt);
        for(prop in opt) {
            if(opt.hasOwnProperty(prop)) {
                svgPoint.setAttributeNS(null, prop, opt[prop]);
            }
        }
        svgPoint.setAttributeNS(null, 'cx', point[0] / point[2]);
        svgPoint.setAttributeNS(null, 'cy', point[1] / point[2]);
        svgPoint.setAttributeNS(null, 'r', 0.1);
        layer.element.appendChild(svgPoint);
        return this;
    });
    MathLib.extendPrototype('svg', 'redraw', function () {
        return this;
    });
    MathLib.extendPrototype('svg', 'resetView', function () {
        this.ctx.setAttribute('transform', 'matrix(' + this.origZoomX + ', 0, 0, ' + this.origZoomY + ', ' + this.origTranslateX + ', ' + this.origTranslateY + ')');
        return this;
    });
    MathLib.extendPrototype('svg', 'resize', function (x, y) {
        this.element.setAttribute('width', x + 'px');
        this.element.setAttribute('height', y + 'px');
        return this;
    });
    MathLib.extendPrototype('svg', 'text', function (str, x, y, userOpt) {
        var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        var defaultOpt = {
            font: 'Helvetica',
            fontSize: '16px',
            lineColor: 'rgba(0, 0, 0, 1)',
            lineWidth: 0.05
        };
        var layer;
        var prop;
        var opt;
        var size;

        userOpt = userOpt || {
        };
        if('layer' in userOpt) {
            layer = this[userOpt.layer + 'Layer'];
        } else {
            layer = this.mainLayer;
        }
        opt = this.normalizeOptions(defaultOpt, userOpt);
        size = 1 / (3 * parseFloat(opt['font-size']));
        for(prop in opt) {
            if(opt.hasOwnProperty(prop) && prop !== 'size') {
                svgText.setAttributeNS(null, prop, opt[prop]);
            }
        }
        svgText.setAttributeNS(null, 'transform', 'scale(' + size + ', -' + size + ')');
        svgText.textContent = str;
        svgText.setAttributeNS(null, 'x', 1 / size * x);
        svgText.setAttributeNS(null, 'y', 1 / size * y);
        layer.element.appendChild(svgText);
        return this;
    });
    var Vector = (function () {
        function Vector(coords) {
            var _this = this;
            this.type = 'vector';
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
        Vector.prototype.forEach = function (f) {
            Array.prototype.forEach.call(this, f);
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
            return new MathLib.Matrix(this.map(function (x) {
                return v.map(function (y) {
                    return MathLib.times(x, y);
                });
            }));
        };
        Vector.prototype.plus = function (v) {
            if(this.length === v.length) {
                return new MathLib.Vector(this.map(function (x, i) {
                    return MathLib.plus(x, v[i]);
                }));
            }
        };
        Vector.prototype.reduce = function () {
            return Array.prototype.reduce.apply(this, arguments);
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
            return Array.prototype.slice.call(this);
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
        Vector.zero = function (n) {
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
        function Circle(center, radius) {
            this.type = 'circle';
            if(center.type === undefined) {
                center = new MathLib.Point(center.concat(1));
            }
            this.center = center;
            this.radius = radius;
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
            this.type = 'complex';
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
            return MathLib.times(new MathLib.Complex(0, 1), MathLib.ln(MathLib.plus(MathLib.sqrt(MathLib.minus(1, MathLib.divide(1, MathLib.times(this, this)))), MathLib.divide(new MathLib.Complex(0, 1), this))));
        };
        Complex.prototype.arcsin = function () {
            var a = this.re;
            var b = this.im;

            return new MathLib.Complex(MathLib.sign(a) / 2 * MathLib.arccos(Math.sqrt(Math.pow(a * a + b * b - 1, 2) + 4 * b * b) - (a * a + b * b)), MathLib.sign(b) / 2 * MathLib.arcosh(Math.sqrt(Math.pow(a * a + b * b - 1, 2) + 4 * b * b) + (a * a + b * b)));
        };
        Complex.prototype.arctan = function () {
            var iz = new MathLib.Complex(-this.im, this.re);
            return MathLib.times(new MathLib.Complex(0, 0.5), MathLib.ln(MathLib.divide(MathLib.plus(1, iz), MathLib.minus(1, iz))));
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
            return new MathLib.Complex(this.re, MathLib.negative(this.im));
        };
        Complex.prototype.copy = function () {
            return new MathLib.Complex(MathLib.copy(this.re), MathLib.copy(this.im));
        };
        Complex.prototype.cos = function () {
            return new MathLib.Complex(MathLib.cos(this.re) * MathLib.cosh(this.im), -MathLib.sin(this.re) * MathLib.sinh(this.im));
        };
        Complex.prototype.cosh = function () {
            return new MathLib.Complex(MathLib.cos(this.im) * MathLib.cosh(this.re), MathLib.sin(this.im) * MathLib.sinh(this.re));
        };
        Complex.prototype.divide = function (c) {
            return this.times(MathLib.inverse(c));
        };
        Complex.prototype.exp = function () {
            return new MathLib.Complex(MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re) * MathLib.sin(this.im));
        };
        Complex.prototype.inverse = function () {
            return new MathLib.Complex(MathLib.divide(this.re, MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2))), MathLib.divide(MathLib.negative(this.im), MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2))));
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
            return new MathLib.Complex(MathLib.ln(this.abs()), this.arg());
        };
        Complex.prototype.minus = function (c) {
            return this.plus(MathLib.negative(c));
        };
        Complex.prototype.mod = function (m) {
            return new MathLib.Complex(MathLib.mod(this.re, m), MathLib.mod(this.im, m));
        };
        Complex.prototype.negative = function () {
            return new MathLib.Complex(MathLib.negative(this.re), MathLib.negative(this.im));
        };
        Complex.one = new Complex(1, 0);
        Complex.prototype.plus = function (c) {
            if(c.type === "complex") {
                return new MathLib.Complex(MathLib.plus(this.re, c.re), MathLib.plus(this.im, c.im));
            } else {
                if(typeof c === "number") {
                    return new MathLib.Complex(MathLib.plus(this.re, c), this.im);
                }
            }
        };
        Complex.polar = function (abs, arg) {
            return new MathLib.Complex(abs * Math.cos(arg), abs * Math.sin(arg));
        };
        Complex.prototype.pow = function (n) {
            return new MathLib.Complex(Math.pow(this.abs(), n), n * this.arg());
        };
        Complex.prototype.sign = function () {
            return MathLib.Complex.polar(1, this.arg());
        };
        Complex.prototype.sin = function () {
            return new MathLib.Complex(MathLib.sin(this.re) * MathLib.cosh(this.im), MathLib.cos(this.re) * MathLib.sinh(this.im));
        };
        Complex.prototype.sinh = function () {
            return new MathLib.Complex(MathLib.cos(this.im) * MathLib.sinh(this.re), MathLib.sin(this.im) * MathLib.cosh(this.re));
        };
        Complex.prototype.times = function (c) {
            if(c.type === "complex") {
                return new MathLib.Complex(MathLib.minus(MathLib.times(this.re, c.re), MathLib.times(this.im, c.im)), MathLib.plus(MathLib.times(this.re, c.im), MathLib.times(this.im, c.re)));
            } else {
                if(typeof c === "number") {
                    return new MathLib.Complex(MathLib.times(this.re, c), MathLib.times(this.im, c));
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
            return new MathLib.Matrix([
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
            return new MathLib.Point(this.re, this.im);
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
        Complex.zero = new Complex(0, 0);
        return Complex;
    })();
    MathLib.Complex = Complex;    
    var Line = (function (_super) {
        __extends(Line, _super);
        function Line(coords) {
                _super.call(this, coords);
            this.type = 'line';
            this.dim = 2;
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
            if(this.length !== q.length) {
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
            return MathLib.isEqual(new MathLib.Point([
                0, 
                0, 
                1
            ]).crossRatio(this.meet(new MathLib.Line([
                0, 
                0, 
                1
            ])), l.meet(new MathLib.Line([
                0, 
                0, 
                1
            ])), MathLib.Point.I, MathLib.Point.J), -1);
        };
        Line.prototype.isParallelTo = function (l) {
            return this.every(function (x, i) {
                return MathLib.isEqual(x, l[i]) || i === l.length - 1;
            });
        };
        Line.prototype.meet = function (l) {
            return new MathLib.Point([
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
    var Matrix = (function () {
        function Matrix(matrix) {
            var _this = this;
            this.type = 'matrix';
            if(typeof matrix === 'string') {
                if(matrix.indexOf('<') > -1) {
                    return new MathLib.MathML(matrix).parse();
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
        Matrix.prototype.adjoint = function (n) {
            return this.map(MathLib.conjugate).transpose();
        };
        Matrix.prototype.adjugate = function (n) {
            return this.map(function (x, r, c, m) {
                return MathLib.times(m.remove(c, r).determinant(), 1 - ((r + c) % 2) * 2);
            });
        };
        Matrix.prototype.cholesky = function () {
            var r;
            var rr;
            var cholesky = [];
            var k;
            var kk;
            var sum;
            var c;

            for(r = 0 , rr = this.rows; r < rr; r++) {
                cholesky.push([]);
            }
            for(r = 0 , rr = this.rows; r < rr; r++) {
                for(c = 0; c < r; c++) {
                    sum = 0;
                    for(k = 0 , kk = c; k < kk; k++) {
                        sum = MathLib.plus(sum, MathLib.times(cholesky[r][k], cholesky[c][k]));
                    }
                    cholesky[r][c] = (this[r][c] - sum) / cholesky[c][c];
                }
                sum = 0;
                for(k = 0 , kk = c; k < kk; k++) {
                    sum = MathLib.plus(sum, MathLib.times(cholesky[r][k], cholesky[r][k]));
                }
                cholesky[r][c] = Math.sqrt(this[c][c] - sum);
                for(c++; c < this.cols; c++) {
                    cholesky[r][c] = 0;
                }
            }
            cholesky = new MathLib.Matrix(cholesky);
            this.cholesky = function () {
                return cholesky;
            };
            return cholesky;
        };
        Matrix.prototype.copy = function () {
            return this.map(MathLib.copy);
        };
        Matrix.prototype.determinant = function () {
            if(this.isSquare()) {
                var arr;
                var determinant;

                if(this.rank() < this.rows) {
                    determinant = 0;
                } else {
                    arr = this.LU();
                    determinant = MathLib.times(this.LUpermutation.sgn(), MathLib.times.apply(null, arr.diag()));
                }
                this.determinant = function () {
                    return determinant;
                };
                return determinant;
            }
        };
        Matrix.prototype.diag = function () {
            var arr = [];
            var i;
            var ii;

            for(i = 0 , ii = Math.min(this.rows, this.cols); i < ii; i++) {
                arr.push(this[i][i]);
            }
            return arr;
        };
        Matrix.prototype.divide = function (n) {
            return this.times(MathLib.inverse(n));
        };
        Matrix.prototype.every = function (f) {
            return Array.prototype.every.call(this, function (x, i) {
                return Array.prototype.every.call(x, function (y, j) {
                    return f(y, i, j, this);
                });
            });
        };
        Matrix.prototype.forEach = function (f) {
            Array.prototype.forEach.call(this, function (x, i) {
                return Array.prototype.forEach.call(x, function (y, j) {
                    return f(y, i, j, this);
                });
            });
        };
        Matrix.prototype.gershgorin = function () {
            var c = [];
            var rc = [];
            var rr = [];
            var res = [];
            var i;
            var ii;

            for(i = 0 , ii = this.rows; i < ii; i++) {
                rc.push(0);
                rr.push(0);
            }
            this.forEach(function (x, i, j) {
                if(i === j) {
                    if(MathLib.is(x, 'complex')) {
                        c.push(x.toPoint());
                    } else {
                        c.push(new MathLib.Point([
                            x, 
                            0, 
                            1
                        ]));
                    }
                } else {
                    rc[j] += MathLib.abs(x);
                    rr[i] += MathLib.abs(x);
                }
            });
            for(i = 0 , ii = this.rows; i < ii; i++) {
                res.push(new MathLib.Circle(c[i], Math.min(rc[i], rr[i])));
            }
            return res;
        };
        Matrix.prototype.givens = function () {
            var rows = this.rows;
            var cols = this.cols;
            var R = this.copy();
            var Q = MathLib.Matrix.identity(rows);
            var c;
            var s;
            var rho;
            var i;
            var j;
            var k;
            var ri;
            var rj;
            var qi;
            var qj;

            for(i = 0; i < cols; i++) {
                for(j = i + 1; j < rows; j++) {
                    if(!MathLib.isZero(R[j][i])) {
                        rho = (R[i][i] < 0 ? -1 : 1) * MathLib.hypot(R[i][i], R[j][i]);
                        c = R[i][i] / rho;
                        s = R[j][i] / rho;
                        ri = [];
                        rj = [];
                        qi = [];
                        qj = [];
                        for(k = 0; k < cols; k++) {
                            ri.push(R[i][k]);
                            rj.push(R[j][k]);
                        }
                        for(k = 0; k < cols; k++) {
                            R[i][k] = rj[k] * s + ri[k] * c;
                            R[j][k] = rj[k] * c - ri[k] * s;
                        }
                        for(k = 0; k < rows; k++) {
                            qi.push(Q[k][i]);
                            qj.push(Q[k][j]);
                        }
                        for(k = 0; k < rows; k++) {
                            Q[k][i] = qi[k] * c + qj[k] * s;
                            Q[k][j] = -qi[k] * s + qj[k] * c;
                        }
                    }
                }
            }
            return [
                Q, 
                R
            ];
        };
        Matrix.givensMatrix = function (n, i, k, phi) {
            var givens = MathLib.Matrix.identity(n);
            givens[k][k] = givens[i][i] = Math.cos(phi);
            givens[i][k] = Math.sin(phi);
            givens[k][i] = -givens[i][k];
            return givens;
        };
        Matrix.identity = function (n) {
            var temp = [];
            var arr = [];
            var i;
            var ii;

            n = n || 1;
            for(i = 0 , ii = n - 1; i < ii; i++) {
                temp.push(0);
            }
            temp.push(1);
            temp = temp.concat(temp);
            temp = temp.slice(0, -1);
            for(i = 0 , ii = n; i < ii; i++) {
                arr.push(temp.slice(n - i - 1, 2 * n - i - 1));
            }
            return new MathLib.Matrix(arr);
        };
        Matrix.prototype.inverse = function () {
            if(!this.isSquare() && this.determinant()) {
                return;
            }
            return this.adjugate().divide(this.determinant());
        };
        Matrix.prototype.isBandMatrix = function (l, u) {
            var i;
            var j;
            var ii;
            var jj;

            if(arguments.length === 1) {
                u = l;
            }
            return this.every(function (x, i, j) {
                return (i - l <= j && i + u >= j) || MathLib.isZero(x);
            });
        };
        Matrix.prototype.isDiag = function () {
            var i;
            var j;
            var ii;
            var jj;

            if((this.hasOwnProperty('isUpper') && this.isUpper()) + (+(this.hasOwnProperty('isLower') && this.isLower())) + (+(this.hasOwnProperty('isSymmetric') && this.isSymmetric())) > 1) {
                return true;
            }
            for(i = 0 , ii = this.rows; i < ii; i++) {
                for(j = 0 , jj = this.cols; j < jj; j++) {
                    if(i !== j && this[i][j] !== 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        Matrix.prototype.isEqual = function (x) {
            var i;
            var j;
            var ii;
            var jj;

            if(this === x) {
                return true;
            }
            if(this.rows === x.rows && this.cols === x.cols) {
                for(i = 0 , ii = this.rows; i < ii; i++) {
                    for(j = 0 , jj = this.cols; j < jj; j++) {
                        if(!MathLib.isEqual(this[i][j], x[i][j])) {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        };
        Matrix.prototype.isIdentity = function () {
            if(!this.isSquare()) {
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
        Matrix.prototype.isInvertible = function () {
            return this.isSquare() && this.rank() === this.rows;
        };
        Matrix.prototype.isLower = function () {
            return this.slice(0, -1).every(function (x, i) {
                return x.slice(i + 1).every(MathLib.isZero);
            });
        };
        Matrix.prototype.isNegDefinite = function () {
            if(!this.isSquare()) {
                return;
            }
            if(this.rows === 1) {
                return this[0][0] < 0;
            }
            if(this.rows % 2 === 0) {
                return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
            } else {
                return this.determinant() < 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
            }
        };
        Matrix.prototype.isOrthogonal = function () {
            return this.transpose().times(this).isIdentity();
        };
        Matrix.prototype.isPermutation = function () {
            var rows = [];
            var cols = [];

            return this.every(function (x, r, c) {
                if(MathLib.isOne(x)) {
                    if(rows[r] || cols[c]) {
                        return false;
                    } else {
                        rows[r] = true;
                        cols[c] = true;
                        return true;
                    }
                } else {
                    if(MathLib.isZero(x)) {
                        return true;
                    }
                }
                return false;
            }) && rows.length === this.rows && cols.length === this.cols;
        };
        Matrix.prototype.isPosDefinite = function () {
            if(!this.isSquare()) {
                return;
            }
            if(this.rows === 1) {
                return this[0][0] > 0;
            }
            return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isPosDefinite();
        };
        Matrix.prototype.isReal = function () {
            return this.every(MathLib.isReal);
        };
        Matrix.prototype.isScalar = function () {
            var n = this.rows;
            var diag = this.diag;
            var i;

            if(this.hasOwnProperty('isIdentity') && this.hasOwnProperty('isZero')) {
                if(this.isIdentity() || this.isZero()) {
                    return true;
                } else {
                    return false;
                }
            }
            if(this.isDiag()) {
                for(i = 1; i < n; i++) {
                    if(!MathLib.isEqual(diag[0], diag[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        };
        Matrix.prototype.isSquare = function () {
            return this.cols === this.rows;
        };
        Matrix.prototype.isSymmetric = function () {
            var i;
            var j;
            var bool = true;

            if(!this.isSquare()) {
                bool = false;
            } else {
                lp:
for(i = 0; i < this.rows; i++) {
                    for(j = i + 1; j < this.cols; j++) {
                        if(!MathLib.isEqual(this[i][j], this[j][i])) {
                            bool = false;
                            break lp;
                        }
                    }
                }
            }
            this.isSymmetric = function () {
                return bool;
            };
            return bool;
        };
        Matrix.prototype.isUpper = function () {
            return this.slice(1).every(function (x, i) {
                return x.slice(0, i + 1).every(MathLib.isZero);
            });
        };
        Matrix.prototype.isVector = function () {
            return (this.rows === 1) || (this.cols === 1);
        };
        Matrix.prototype.isZero = function () {
            var isZero = this.every(MathLib.isZero);
            this.isZero = function () {
                return isZero;
            };
            return isZero;
        };
        Matrix.prototype.LU = function (dontSwapPivot) {
            var i;
            var j;
            var k;
            var t;
            var p;
            var LU = this.toArray();
            var m = this.rows;
            var n = this.cols;
            var permutation = [];

            for(k = 0; k < n; k++) {
                if(!dontSwapPivot) {
                    p = k;
                    for(i = k + 1; i < m; i++) {
                        if(Math.abs(LU[i][k]) > Math.abs(LU[p][k])) {
                            p = i;
                        }
                    }
                    if(p !== k) {
                        permutation.unshift([
                            p, 
                            k
                        ]);
                        t = LU[p];
                        LU[p] = LU[k];
                        LU[k] = t;
                    }
                }
                if(LU[k][k] !== 0) {
                    for(i = k + 1; i < m; i++) {
                        LU[i][k] = MathLib.divide(LU[i][k], LU[k][k]);
                        for(j = k + 1; j < n; j++) {
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
        Matrix.prototype.map = function (f) {
            var m = this;
            return new MathLib.Matrix(Array.prototype.map.call(this, function (x, i) {
                return Array.prototype.map.call(x, function (y, j) {
                    return f(y, i, j, m);
                });
            }));
        };
        Matrix.prototype.minor = function (r, c) {
            return this.remove(r, c).determinant();
        };
        Matrix.prototype.minus = function (m) {
            return this.plus(m.negative());
        };
        Matrix.prototype.negative = function () {
            var res = [];
            var i;
            var ii;

            for(i = 0 , ii = this.rows; i < ii; i++) {
                res.push(this[i].map(MathLib.negative));
            }
            return new MathLib.Matrix(res);
        };
        Matrix.numbers = function (n, r, c) {
            var help = [];
            var res = [];
            var i;
            var ii;

            for(i = 0 , ii = c || r || 1; i < ii; i++) {
                help.push(n);
            }
            for(i = 0 , ii = r || 1; i < ii; i++) {
                res.push(help.slice());
            }
            return new MathLib.Matrix(res);
        };
        Matrix.one = function (r, c) {
            r = r || 1;
            c = c || 1;
            return MathLib.Matrix.numbers(1, r, c);
        };
        Matrix.prototype.plus = function (m) {
            var res = [];
            var r = this.rows;
            var c = this.cols;
            var i;
            var j;

            for(i = 0; i < r; i++) {
                res[i] = [];
                for(j = 0; j < c; j++) {
                    res[i][j] = MathLib.plus(this[i][j], m[i][j]);
                }
            }
            return new MathLib.Matrix(res);
        };
        Matrix.random = function (r, c) {
            var temp;
            var arr = [];
            var i;
            var j;
            var ii;
            var jj;

            for(i = 0 , ii = r || 1; i < ii; i++) {
                temp = [];
                for(j = 0 , jj = c || r || 1; j < jj; j++) {
                    temp.push(Math.random());
                }
                arr.push(temp);
            }
            return new MathLib.Matrix(arr);
        };
        Matrix.prototype.rank = function () {
            var rank = 0;
            var mat;
            var i;
            var ii;
            var j;

            mat = this.rref();
            label:
for(i = Math.min(this.rows, this.cols) - 1; i >= 0; i--) {
                for(j = this.cols - 1; j >= i; j--) {
                    if(!MathLib.isZero(mat[i][j])) {
                        rank = i + 1;
                        break label;
                    }
                }
            }
            this.rank = function () {
                return rank;
            };
            return rank;
        };
        Matrix.prototype.reduce = function () {
            return Array.prototype.reduce.apply(this, arguments);
        };
        Matrix.prototype.remove = function (row, col) {
            var res = this.toArray();
            if(row || row === 0) {
                if(typeof row === 'number') {
                    row = [
                        row
                    ];
                }
                res = res.filter(function (x, i, arr) {
                    return row.indexOf(i) === -1;
                });
            }
            if(col || col === 0) {
                if(typeof col === 'number') {
                    col = [
                        col
                    ];
                }
                col = col.sort().reverse();
                col.forEach(function (n) {
                    res = res.map(function (x) {
                        x.splice(n, 1);
                        return x;
                    });
                });
            }
            return new MathLib.Matrix(res);
        };
        Matrix.prototype.rref = function () {
            var lead = 0;
            var rref = this.toArray();
            var i;
            var j;
            var r;
            var temp;
            var val;

            for(r = 0; r < this.rows; r++) {
                if(this.cols <= lead) {
                    return new MathLib.Matrix(rref);
                }
                i = r;
                while(rref[i][lead] === 0) {
                    i++;
                    if(this.rows === i) {
                        i = r;
                        lead++;
                        if(this.cols === lead) {
                            return new MathLib.Matrix(rref);
                        }
                    }
                }
                var tmp = rref[i];
                rref[i] = rref[r];
                rref[r] = tmp;
                val = rref[r][lead];
                for(j = 0; j < this.cols; j++) {
                    rref[r][j] /= val;
                }
                for(i = 0; i < this.rows; i++) {
                    if(i === r) {
                        continue;
                    }
                    val = rref[i][lead];
                    for(j = 0; j < this.cols; j++) {
                        rref[i][j] = MathLib.minus(rref[i][j], MathLib.times(val, rref[r][j]));
                    }
                }
                lead++;
            }
            return new MathLib.Matrix(rref);
        };
        Matrix.prototype.slice = function (f) {
            return Array.prototype.slice.apply(this, arguments);
        };
        Matrix.prototype.solve = function (b) {
            var LU = this.LU();
            var i;
            var j;
            var n = b.length;
            var x = [];
            var y = [];

            b = this.LUpermutation.applyTo(b);
            for(i = 0; i < n; i++) {
                y[i] = b[i];
                for(j = 0; j < i; j++) {
                    y[i] = MathLib.minus(y[i], MathLib.times(LU[i][j], y[j]));
                }
            }
            for(i = n - 1; i >= 0; i--) {
                x[i] = y[i];
                for(j = i + 1; j < n; j++) {
                    x[i] = MathLib.minus(x[i], MathLib.times(LU[i][j], x[j]));
                }
                x[i] = MathLib.divide(x[i], LU[i][i]);
            }
            return new b.constructor(x);
        };
        Matrix.prototype.some = function (f) {
            return Array.prototype.some.call(this, function (x, i) {
                return Array.prototype.some.call(x, function (y, j) {
                    return f(y, i, j, this);
                });
            });
        };
        Matrix.prototype.times = function (a) {
            var res = [];
            var temp;
            var i;
            var j;
            var k;

            if(typeof a === 'number' || a.type === 'complex') {
                return this.map(function (x) {
                    return MathLib.times(x, a);
                });
            } else {
                if(a.type === "matrix") {
                    if(this.cols === a.rows) {
                        for(i = 0; i < this.rows; i++) {
                            res[i] = [];
                            for(j = 0; j < a.cols; j++) {
                                temp = 0;
                                for(k = 0; k < this.cols; k++) {
                                    temp = MathLib.plus(temp, MathLib.times(this[i][k], a[k][j]));
                                }
                                res[i][j] = temp;
                            }
                        }
                        return new MathLib.Matrix(res);
                    }
                } else {
                    if(a.type === 'point' || a.type === 'vector') {
                        if(this.cols === a.length) {
                            for(j = 0; j < this.rows; j++) {
                                temp = 0;
                                for(k = 0; k < this.cols; k++) {
                                    temp = MathLib.plus(temp, MathLib.times(this[j][k], a[k]));
                                }
                                res.push(temp);
                            }
                            return new a.constructor(res);
                        }
                    }
                }
            }
        };
        Matrix.prototype.toArray = function () {
            return Array.prototype.map.call(this, function (x) {
                return Array.prototype.map.call(x, function (y) {
                    return MathLib.copy(y);
                });
            });
        };
        Matrix.prototype.toColVectors = function () {
            return this.transpose().toRowVectors();
        };
        Matrix.prototype.toComplex = function () {
            if(this.rows !== 2 || this.cols !== 2 || this[0][0] !== this[1][1] || this[0][1] !== MathLib.negative(this[1][0])) {
                return;
            }
            return new MathLib.Complex(this[0][0], this[1][0]);
        };
        Matrix.prototype.toContentMathMLString = function () {
            return this.reduce(function (str, x) {
                return str + x.reduce(function (prev, cur) {
                    return prev + MathLib.toContentMathMLString(cur);
                }, '<matrixrow>') + '</matrixrow>';
            }, '<matrix>') + '</matrix>';
        };
        Matrix.prototype.toLaTeX = function () {
            return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
                return str + x.reduce(function (prev, cur) {
                    return prev + ' & ' + MathLib.toLaTeX(cur);
                }) + '\\\n';
            }, '').slice(0, -2) + '\n\\end{pmatrix}';
        };
        Matrix.prototype.toMathMLString = function () {
            return this.reduce(function (str, x) {
                return str + x.reduce(function (prev, cur) {
                    return prev + '<mtd>' + MathLib.toMathMLString(cur) + '</mtd>';
                }, '<mtr>') + '</mtr>';
            }, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
        };
        Matrix.prototype.toRowVectors = function () {
            return this.toArray().map(function (v) {
                return new MathLib.Vector(v);
            });
        };
        Matrix.prototype.toString = function () {
            return this.reduce(function (str, x) {
                return str + x.reduce(function (prev, cur) {
                    return prev + '\t' + MathLib.toString(cur);
                }) + '\n';
            }, '').slice(0, -1);
        };
        Matrix.prototype.trace = function () {
            var trace = MathLib.plus.apply(null, this.diag());
            this.trace = function () {
                return trace;
            };
            return trace;
        };
        Matrix.prototype.transpose = function () {
            var transpose = [];
            var help;
            var i;
            var j;
            var ii;
            var jj;

            for(i = 0 , ii = this.cols; i < ii; i++) {
                help = [];
                for(j = 0 , jj = this.rows; j < jj; j++) {
                    help.push(this[j][i]);
                }
                transpose.push(help);
            }
            transpose = new MathLib.Matrix(transpose);
            this.transpose = function () {
                return transpose;
            };
            return transpose;
        };
        Matrix.zero = function (r, c) {
            r = r || 1;
            c = c || 1;
            return MathLib.Matrix.numbers(0, r, c);
        };
        return Matrix;
    })();
    MathLib.Matrix = Matrix;    
    var Permutation = (function () {
        function Permutation(p) {
            var _this = this;
            this.type = 'permutation';
            if(Array.isArray(p[0])) {
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
                return (n.type === undefined ? res : new n.constructor(res));
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
            return new MathLib.Permutation(cycle);
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
        Permutation.prototype.map = function () {
            return new this.constructor(Array.prototype.map.apply(this, arguments));
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
            return new MathLib.Matrix(res);
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
        function Point(coords) {
            if(arguments.length > 1) {
                coords = Array.prototype.slice.call(arguments);
                coords.push(1);
            }
                _super.call(this, coords);
            this.dim = 2;
            this.type = 'point';
        }
        Point.prototype.crossRatio = function (a, b, c, d) {
            var x = this.toArray();
            var m1 = new MathLib.Matrix([
                x, 
                a, 
                c
            ]);
            var m2 = new MathLib.Matrix([
                x, 
                b, 
                d
            ]);
            var m3 = new MathLib.Matrix([
                x, 
                a, 
                d
            ]);
            var m4 = new MathLib.Matrix([
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
        Point.I = new Point([
            new MathLib.Complex(0, -1), 
            0, 
            1
        ]);
        Point.prototype.isEqual = function (q) {
            var p = this.normalize();
            q = q.normalize();
            if(this.length !== q.length) {
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
        Point.J = new Point([
            new MathLib.Complex(0, 1), 
            0, 
            1
        ]);
        Point.prototype.lineTo = function (q) {
            if(this.dim === 2 && q.dim === 2) {
                return new MathLib.Line(this, q);
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
                    return new MathLib.Point(arr);
                }
            }
        };
        Point.prototype.slice = function () {
            return Array.prototype.slice.apply(this, arguments);
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
                return new MathLib.Complex(this[0] / this[2], this[1] / this[2]);
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
            var _this = this;
            this.type = 'polynomial';
            var temp = [];
            if(polynomial === undefined || polynomial.length === 0) {
                polynomial = [
                    0
                ];
            } else {
                if(typeof polynomial === 'number') {
                    while(polynomial--) {
                        temp.push(0);
                    }
                    temp.push(1);
                    polynomial = temp;
                }
            }
            polynomial.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = polynomial.length;
            this.deg = polynomial.length - 1;
            this.subdeg = ((function (a) {
                var i = 0;
                if(a.length > 1 || a[0]) {
                    while(i < a.length && MathLib.isZero(a[i])) {
                        i++;
                    }
                    return i;
                }
                return Infinity;
            })(polynomial));
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
            return new MathLib.Polynomial(temparr);
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
        Polynomial.prototype.forEach = function () {
            return Array.prototype.forEach.apply(this, arguments);
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
            return new MathLib.Polynomial(temparr);
        };
        Polynomial.prototype.interpolation = function (a, b) {
            var temp;
            var res = new MathLib.Polynomial([
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
                temp = new MathLib.Polynomial([
                    1
                ]);
                for(j = 0; j < n; j++) {
                    if(i !== j) {
                        temp = temp.times(new MathLib.Polynomial([
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
            return new MathLib.Polynomial(Array.prototype.map.call(this, f));
        };
        Polynomial.prototype.mod = function (m) {
            return this.map(function (x) {
                return MathLib.mod(x, m);
            });
        };
        Polynomial.prototype.negative = function () {
            return new MathLib.Polynomial(this.map(MathLib.negative));
        };
        Polynomial.one = new Polynomial([
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
            return new MathLib.Polynomial(temparr);
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
            return new MathLib.Polynomial([
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
            return new MathLib.Polynomial(coef);
        }
        Polynomial.prototype.slice = function () {
            return Array.prototype.slice.apply(this, arguments);
        };
        Polynomial.prototype.tangent = function (p) {
            var value = this.valueAt(p);
            var slope = this.differentiate().valueAt(p);

            return new MathLib.Polynomial([
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
            return new MathLib.Polynomial(temparr);
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
            var pot = MathLib.is(x, 'matrix') ? MathLib.Matrix.identity(x.rows, x.cols) : 1;
            var res = MathLib.is(x, 'matrix') ? MathLib.Matrix.zero(x.rows, x.cols) : 0;
            var i;
            var ii;

            for(i = 0 , ii = this.deg; i <= ii; i++) {
                res = MathLib.plus(res, MathLib.times(this[i], pot));
                pot = MathLib.times(pot, x);
            }
            return res;
        };
        Polynomial.zero = new Polynomial([
            0
        ]);
        return Polynomial;
    })();
    MathLib.Polynomial = Polynomial;    
    var Set = (function () {
        function Set(elements) {
            var _this = this;
            this.type = 'set';
            this.union = Set.createSetOperation(true, true, true);
            this.intersect = Set.createSetOperation(false, true, false);
            this.without = Set.createSetOperation(true, false, false);
            this.xor = Set.createSetOperation(true, false, true);
            if(!elements) {
                elements = [];
            }
            elements = elements.sort(MathLib.compare);
            elements = elements.filter(function (x, i, a) {
                return x !== a[i + 1];
            });
            elements.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = elements.length;
            this.card = elements.length;
        }
        Set.prototype.compare = function (x) {
            if(this.card !== x.card) {
                return MathLib.sign(this.card - x.card);
            } else {
                var res = 0;
                var stop = false;

                this.forEach(function (y, i) {
                    if(!stop) {
                        var a = MathLib.compare(y, x[i]);
                        if(a !== 0) {
                            res = a;
                            stop = true;
                        }
                    }
                });
                return res;
            }
        };
        Set.prototype.every = function () {
            return Array.prototype.every.apply(this, arguments);
        };
        Set.prototype.filter = function () {
            return new MathLib.Set(Array.prototype.filter.apply(this, arguments));
        };
        Set.prototype.forEach = function () {
            Array.prototype.forEach.apply(this, arguments);
        };
        Set.fromTo = function (f, t, s) {
            var i;
            var arr = [];

            s = s || 1;
            if(f <= t) {
                for(i = f; i <= t; i += s) {
                    arr.push(i);
                }
                return new MathLib.Set(arr);
            }
        };
        Set.prototype.indexOf = function () {
            return Array.prototype.indexOf.apply(this, arguments);
        };
        Set.prototype.insert = function (x) {
            var i = this.locate(x);
            if(this[i] !== x) {
                this.splice(i, 0, x);
                this.card++;
            }
            return this;
        };
        Set.prototype.isEmpty = function () {
            return this.card === 0;
        };
        Set.prototype.isEqual = function (x) {
            if(this.card !== x.card) {
                return false;
            } else {
                return this.every(function (y, i) {
                    return MathLib.isEqual(y, x[i]);
                });
            }
        };
        Set.prototype.isSubsetOf = function (a) {
            return this.every(function (x) {
                return a.indexOf(x) !== -1;
            });
        };
        Set.prototype.locate = function (x) {
            var left = 0;
            var right = this.card - 1;
            var middle;
            var i = this.indexOf(x);

            if(i !== -1) {
                return i;
            }
            while(left <= right) {
                middle = left + Math.floor((right - left) / 2);
                if(this[middle] < x) {
                    left = middle + 1;
                } else {
                    if(this[middle] > x) {
                        right = middle - 1;
                    } else {
                        return middle;
                    }
                }
            }
            return left;
        };
        Set.prototype.map = function (f) {
            return new MathLib.Set(Array.prototype.map.call(this, f));
        };
        Set.prototype.plus = function (n) {
            var res = [];
            if(!arguments.length) {
                return MathLib.plus.apply(null, this);
            } else {
                if(n.type === 'set') {
                    this.forEach(function (x) {
                        n.forEach(function (y) {
                            res.push(MathLib.plus(x, y));
                        });
                    });
                    return new MathLib.Set(res);
                } else {
                    return this.map(function (x) {
                        return MathLib.plus(x, n);
                    });
                }
            }
        };
        Set.prototype.powerset = function (a) {
            var res = [];
            var arr;
            var temp;
            var i;
            var ii;
            var j;
            var jj;

            for(i = 0 , ii = Math.pow(2, this.card); i < ii; i++) {
                arr = i.toString(2).split('').reverse();
                temp = [];
                for(j = 0 , jj = this.card; j < jj; j++) {
                    if(arr[j] === '1') {
                        temp.push(this[j]);
                    }
                }
                res.push(new MathLib.Set(temp));
            }
            return new MathLib.Set(res);
        };
        Set.prototype.reduce = function () {
            return Array.prototype.reduce.apply(this, arguments);
        };
        Set.prototype.remove = function (a) {
            var i = this.indexOf(a);
            if(i !== -1) {
                this.splice(i, 1);
                this.card--;
            }
            return this;
        };
        Set.createSetOperation = function (left, both, right) {
            return function (a) {
                var res = [];
                var i = 0;
                var j = 0;
                var tl = this.card;
                var al = a.card;

                while(i < tl && j < al) {
                    if(this[i] < a[j]) {
                        if(left) {
                            res.push(this[i]);
                        }
                        i++;
                        continue;
                    }
                    if(this[i] > a[j]) {
                        if(right) {
                            res.push(a[j]);
                        }
                        j++;
                        continue;
                    }
                    if(this[i] === a[j]) {
                        if(both) {
                            res.push(this[i]);
                        }
                        i++;
                        j++;
                        continue;
                    }
                }
                if(left && j === al) {
                    res = res.concat(this.slice(i));
                } else {
                    if(right && i === tl) {
                        res = res.concat(a.slice(j));
                    }
                }
                return new MathLib.Set(res);
            }
        };
        Set.prototype.slice = function () {
            return Array.prototype.slice.apply(this, arguments);
        };
        Set.prototype.splice = function () {
            return Array.prototype.splice.apply(this, arguments);
        };
        Set.prototype.times = function (n) {
            if(!arguments.length) {
                return MathLib.times.apply(null, this);
            } else {
                return this.map(function (x) {
                    return MathLib.times(x, n);
                });
            }
        };
        Set.prototype.toArray = function () {
            return Array.prototype.slice.call(this);
        };
        Set.prototype.toContentMathMLString = function () {
            if(this.isEmpty()) {
                return '<emptyset/>';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toContentMathMLString(cur);
                }, '<set>') + '</set>';
            }
        };
        Set.prototype.toLaTeX = function () {
            if(this.isEmpty()) {
                return '\\emptyset';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toLaTeX(cur) + ', ';
                }, '\\{').slice(0, -2) + '\\}';
            }
        };
        Set.prototype.toMathMLString = function () {
            if(this.isEmpty()) {
                return '<mi>&#x2205;</mi>';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toMathMLString(cur) + '<mo>,</mo>';
                }, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
            }
        };
        Set.prototype.toString = function () {
            if(this.isEmpty()) {
                return '∅';
            }
            return '(' + Array.prototype.join.call(this, ', ') + ')';
        };
        return Set;
    })();
    MathLib.Set = Set;    
})(MathLib || (MathLib = {}));

