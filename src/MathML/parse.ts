// ### MathML.prototype.parse()
// Parses the MathML.
//
// *@return{number|a MathLib object}*  The result of the parsing
parse() {
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
            contentMathMLString: '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication>' + node.outerMathML + '</lambda></math>'
          });
        }
        else {
          return MathLib.functn(function (x) {return MathLib[funcName](innerFunc(x));}, {
            contentMathMLString: node.outerMathML
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
        return MathLib.functn(function (x) {return x;}, {contentMathMLString: '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><ident/><ci>x</ci></apply></lambda></math>'});
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
        return new MathLib.Complex(+node.childNodes[0].outerMathML, +node.childNodes[2].outerMathML);
      }
      else if (type === 'complex-polar') {
        return MathLib.Complex.polar(+node.childNodes[0].outerMathML, +node.childNodes[2].outerMathML);
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
          contentMathMLString: node.outerMathML,
          domain: domain
        });
      }
      else {
        return MathLib.functn(function (x) {return MathLib[funcName].apply(null, innerFunc.map(function (f){
          return typeof f === 'function' ? f(x) : f;
        }));}, {
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
      return new MathLib.Complex(0,1);
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
    if (Array.isArray(node)) {
      return node.map(parser);
    }
    return handlers[node.nodeName](node);
  };

  return parser(this);
}