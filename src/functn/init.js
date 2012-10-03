// ## <a id="Functions"></a>Functions
//
// Because 'function' is a reserved word in JavaScript the module is called 
// 'functn'.  
// More improvements to the module coming soon.


prototypes.functn = function(){}; //Object.getPrototypeOf(function(){});
MathLib.functn = function (f, options) {
  options = options || {};

  var functn = function (x) {
    if (typeof x === 'number') {
      return f.apply('', arguments);
    }
    else if (x.type === 'functn') {
      var outerVar = functn.contentMathML.childNodes[0].childNodes[0].childNodes[0].outerMathML,
          innerVar = x.contentMathML.childNodes[0].childNodes[0].childNodes[0].outerMathML,
          innerStr = x.contentMathML.childNodes[0].childNodes[2].outerMathML.replace('<bvar>' + innerVar + '</bvar>', ''), 
          outerStr = functn.contentMathML.childNodes[0].childNodes[2].outerMathML.replace(outerVar, innerStr),
          res = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>' + innerVar + '</bvar><domainofapplication><complexes/></domainofapplication>' + outerStr + '</lambda></math>';
      return MathLib.functn(function (y) {return f(x(y));}, {contentMathMLString: res});
    }
    else if (typeof x === 'function') {
      return function (y) {return f(x(y));};
    }
    else if(x.type === 'complex') {
      return x[options.name].apply(x, Array.prototype.slice.call(arguments, 1));
    }
    else {
      return x[options.name]();
    }
  };

  functn[proto] = prototypes.functn;

  var contentMathML = options.contentMathMLString || '';
  
  Object.defineProperties(functn, {
    id: { value: options.name},
    contentMathML: { value: MathLib.MathML(contentMathML) },
  });

  return functn;
};

// Setting the .constructor property to MathLib.functn
MathLib.extendPrototype('functn', 'constructor', MathLib.functn);

// Setting the .type property to 'functn'
MathLib.extendPrototype('functn', 'type', 'functn');