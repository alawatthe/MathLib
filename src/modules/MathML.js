// ## <a id="MathML"></a>MathML
// The MathML implementation of MathLib parses and creates content MathML.


prototypes.MathML = {};
var listPrototype = {
  toMathML: function () {
    var handlers = {
      apply: function (n) {
        var f = n.childNodes[0],
            args = n.childNodes.slice(1).map(function(x) {
              return x.toMathML();
            }),
            str = '';

        if (f.nodeName === 'plus') {
          str = '<mrow>' + args.join('<mo>+</mo>') + '</mrow>';
        }
        else if (f.nodeName === 'times') {
          str = '<mrow>' + args.join('<mo>*</mo>') + '</mrow>';
        }
        else if (f.nodeName === 'power') {
          str = '<msup>' + args[0] + args[1] + '</msup>';
        }
        else {
          str = '<mrow><mi>' + f.nodeName + '</mi><mo>&af;</mo><mfenced>' + args.join('') + '</mfenced></mrow>';
        }
        return str;
      },
      bvar: function () {return '';},
      ci: function (n) {return '<mi>' + n.innerMathML + '</mi>';},
      cn: function (n) {return '<mn>' + n.innerMathML + '</mn>';},
      cs: function (n) {return '<ms>' + n.innerMathML + '</ms>';},
      domainofapplication: function () {return '';},
      lambda: function (n) {
        return n.childNodes.reduce(function(old, cur) {
          return old + cur.toMathML();
        });
      }, 
      '#text': function (n) {return n.innerMathML;}
    };
    return handlers[this.nodeName](this);
  },


  toString: function () {
    var handlers = {
      apply: function (n) {
        var f = n.childNodes[0],
            args = n.childNodes.slice(1).map(function(x) {
              return x.toString();
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
      ci: function (n) {return n.innerMathML;},
      cn: function (n) {return n.innerMathML;},
      cs: function (n) {return n.innerMathML;},
      domainofapplication: function () {return '';},
      lambda: function (n) {
        return n.childNodes.reduce(function(old, cur) {
          return old + cur.toString();
        });
      }, 
      '#text': function (n) {return n.innerMathML;}
    };
    return handlers[this.nodeName](this);
  }
};




MathLib.MathML = function (MathMLString) {
  var tokenizer = new DOMParser(),
      MathMLdoc,
      MathML;

  if (typeof MathMLString !== 'string') {
    MathMLString = MathMLString.toContentMathML();
  }


  // Remove the Linebreaks ...
  MathMLString = MathMLString.replace(/\n/g, ''); 

  // ... and the unnecessary whitespace
  MathMLString = MathMLString.replace(/((?!cs)[^>]{2})>(\s)*</g, '$1><');
    
  // Gives an error in Firefox
  /* MathML = tokenizer.parseFromString(MathMLString, 'application/mathml+xml'); */
  MathMLdoc = tokenizer.parseFromString(MathMLString, 'application/xml');

  var createToken,
      curToken = null,
      tokenStack = [];


  createToken = function (t) {
    var attributes = {}, i, ii;
    if(t.attributes) {
      for (i=0, ii=t.attributes.length; i<ii; i++) {
        attributes[t.attributes[i].name] =  t.attributes[i].value;
      }
    }
    
    var newToken = Object.create(listPrototype, {
      attributes: {value: attributes},
      nodeName:   {value: t.nodeName},
      parentNode: {value: tokenStack[tokenStack.length-1]},
      prevNode:   {value: curToken}
    });


    if(curToken) {
      curToken.nextNode = newToken;
    }
    curToken = newToken;

    tokenStack.push(newToken);
    newToken.childNodes = Array.prototype.slice.call(t.childNodes).map(createToken);
    tokenStack.pop();

    var attributesString = function (x) {
      var str = '', attr;
      for (attr in x.attributes) {
        if (x.attributes.hasOwnProperty(attr)){
          str += ' ' + attr + '="' + x.attributes[attr] + '"'; 
        }
      }
      return str;
    };

    if (newToken.childNodes.length !== 0) {
      newToken.innerMathML = newToken.childNodes.reduce(function(prev, cur, index, array){return prev + cur.outerMathML;}, '');
    }
    else {
      newToken.innerMathML = '';
    }

    if (newToken.childNodes.length === 0) {
      if (newToken.nodeName === '#text') {
        newToken.outerMathML = t.textContent;
      }
      else {
        newToken.outerMathML = '<' + newToken.nodeName + attributesString(newToken) + '/>';
      }
    }
    else {
      newToken.outerMathML = '<' + newToken.nodeName + attributesString(newToken) + '>' + newToken.innerMathML + '</' + newToken.nodeName + '>';
    }

    if (newToken.nodeName === 'lambda') {
      newToken.bvars = [];
      for (i=0, ii=newToken.childNodes.length; i<ii; i++) {
        if (newToken.childNodes[i].nodeName === 'bvar') {
          newToken.bvars.push(newToken.childNodes[i].childNodes[0].innerMathML);
        }
        else if (newToken.childNodes[i].nodeName === 'domainofapplication') {
          newToken.domainofapplication = newToken.childNodes[i];
        }
        else if (newToken.childNodes[i].nodeName === 'apply') {
          newToken.apply = newToken.childNodes[i];
        }
      }
    }

    return newToken;
  };

  MathML = createToken(MathMLdoc.childNodes[0]);


  MathML[proto] = prototypes.MathML;
  var res = Object.create(prototypes.MathML, {
      attributes:  {value: MathML.attributes},
      childNodes:  {value: MathML.childNodes},
      innerMathML: {value: MathML.innerMathML},
      outerMathML: {value: MathML.outerMathML},
      nodeName:    {value: MathML.nodeName},
      nextNode:    {value: MathML.nextNode},
      parentNode:  {value: null},
      prevNode:    {value: null}
  });
  return res;
};



// Setting the .constructor property to MathLib.MathML  
MathLib.extendPrototype('MathML', 'constructor', MathLib.MathML);



// Setting the .type property to 'MathML'
MathLib.extendPrototype('MathML', 'type', 'MathML');



// ### MathML.prototype.parse()
// Parses the MathML.
//
// *@return{number|a MathLib object}*  The result of the parsing
MathLib.extendPrototype('MathML', 'parse', function () {
  var handlers, apply, ci, cn, math, matrixrow, matrix, parser, set, vector,
      construct = false,
      bvars = [];

  handlers = {
    apply: function (node) {
      var children = node.childNodes,
          func = children.shift(),
          funcName = func.nodeName,
          names = {
            ident: 'identity',
            power: 'pow',
            rem: 'mod',
            setdifference: 'without' 
          };

      if (funcName in names) {
        funcName = names[funcName];
      }

      if (construct) {
        var innerFunc;

        // func = node.childNodes[2];
        // funcName = func.childNodes[0].nodeName;
        innerFunc = parser(children[0]);

        
        if (innerFunc === undefined) {
          return MathLib.functn(function (x) {return MathLib[funcName](x);}, {
            MathMLString: '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication>' + node.outerMathML + '</lambda></math>'
          });
        }
        else {
          return MathLib.functn(function (x) {return MathLib[funcName](innerFunc(x));}, {
            MathMLString: node.outerMathML
          });
        }
        
      }
      else {
        if(funcName in MathLib) {
          if (children.length === 1) {
            return MathLib[funcName](parser(children[0]));
          }
          else {
            return MathLib[funcName].apply(null, children.map(parser));
          }
        }
        else {
          var child = parser(children.shift());
          if (children.length === 1) {
            return child[funcName](parser(children[0]));
          }
          else {
            return child[funcName](children.map(parser));
          }
        }
      }
    },

    ci: function (node) {
      if (bvars.indexOf(node.innerMathML) === -1) {
        return MathLib.MathML.variables[node.innerMathML];
      }
      else {
        return MathLib.functn(function (x) {return x;}, {MathMLString: '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><ident/><ci>x</ci></apply></lambda></math>'});
      }
    },

    cn: function (node) {
      var type = node.attributes.type ? node.attributes.type : 'number';

      if(type === 'number') {
        /* TODO: base conversions
        var base = node.getAttribute('base') !== null ? node.getAttributes('base') : '10'; */
        return +node.innerMathML;
      }
      else if (type === 'complex-cartesian') {
        return MathLib.complex([+node.childNodes[0].outerMathML, +node.childNodes[2].outerMathML]);
      }
      else if (type === 'complex-polar') {
        return MathLib.complex(+node.childNodes[0].outerMathML, +node.childNodes[2].outerMathML);
      }
    },

    cs: function (node) {
      return node.innerMathML;
    },

    lambda: function (node) {
      var domain, lambda, funcName, innerFunc, names;

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

      if (funcName in names) {
        funcName = names[funcName];
      }
     
      innerFunc = parser(apply.childNodes.slice(1));

      if (innerFunc[0] === undefined) {
        return MathLib.functn(function (x) {return MathLib[funcName](x);}, {
          MathMLString: node.outerMathML,
          domain: domain
        });
      }
      else {
        return MathLib.functn(function (x) {return MathLib[funcName].apply(null, innerFunc.map(function (f){
          return typeof f === 'function' ? f(x) : f;
        }));}, {
          MathMLString: node.outerMathML,
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

    "false": function () {
      return false;
    },
    "true": function () {
      return true;
    },
    exponentiale: function () {
      return MathLib.e;
    },
    imaginaryi: function () {
      return MathLib.complex([0,1]);
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
    if (Array.isArray(node)) {
      return node.map(parser);
    }
    return handlers[node.nodeName](node);
  };

  return parser(this);
});



// ### MathML.prototype.toContentMathML()
// Returns a presentation MathML string
// 
// *@return{string}*
MathLib.extendPrototype('MathML', 'toContentMathML', function () {
  return '<math xmlns="http://www.w3.org/1998/Math/MathML">' + this.childNodes[0].toMathML() +'</math>';
});



// ### MathML.prototype.toMathML()
// Returns a presentation MathML string
// 
// *@return{string}*
MathLib.extendPrototype('MathML', 'toMathML', function () {
  return '<math xmlns="http://www.w3.org/1998/Math/MathML">' + this.childNodes[0].toMathML() +'</math>';
});



// ### MathML.prototype.toString()
// Custom toString method
// 
// *@return{string}*
MathLib.extendPrototype('MathML', 'toString', function () {
  return this.childNodes[0].toString();
});



// ### MathML.isSupported()
// Checks if MathML is supported by the browser.  
// Code stolen from [Modernizr](http://www.modernizr.com/)
//
// *@return {boolean}*
MathLib.extend('MathML', 'isSupported', function () {
  var hasMathML = false,
      ns, div, mfrac;
  if ( document.createElementNS ) {
    ns = 'http://www.w3.org/1998/Math/MathML';
    div = document.createElement('div');
    div.style.position = 'absolute';
    mfrac = div.appendChild(document.createElementNS(ns,'math'))
                 .appendChild(document.createElementNS(ns,'mfrac'));
    mfrac.appendChild(document.createElementNS(ns,'mi'))
         .appendChild(document.createTextNode('xx'));
    mfrac.appendChild(document.createElementNS(ns,'mi'))
         .appendChild(document.createTextNode('yy'));
    document.body.appendChild(div);
    hasMathML = div.offsetHeight > div.offsetWidth;
    document.body.removeChild(div);
  }
  return hasMathML;
});



// ### MathML.loadMathJax()
// Loads MathJax dynamically.
//
// *@param{string}* [config] Optional config options
MathLib.extend('MathML', 'loadMathJax', function (config) {
  var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';

    config = config || 'MathJax.Hub.Config({' +
                         'config: ["MMLorHTML.js"],' +
                         'jax: ["input/TeX","input/MathML","output/HTML-CSS","output/NativeMML"],' +
                         'extensions: ["tex2jax.js","mml2jax.js","MathMenu.js","MathZoom.js"],' +
                         'TeX: {' +
                           'extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]' +
                         '}' +
                       '});';

    if (window.opera) {
      script.innerHTML = config;
    }
    else {
      script.text = config;
    }

    document.getElementsByTagName('head')[0].appendChild(script);
});



// ### MathML.variables
// Object for variable storage.
MathLib.extend('MathML', 'variables', {});



// ### MathML.write()
// Writes MathML to an element.
//
// *@param{id}* The id of the element in which the MathML should be inserted.  
// *@param{math}* The MathML to be inserted.
MathLib.extend('MathML', 'write', function (id, math) {
  var formula;
  document.getElementById(id).innerHTML = '<math>' + math + '</math>';
  if (typeof MathJax !== 'undefined') {
    formula = MathJax.Hub.getAllJax(id)[0];
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
  }
});
