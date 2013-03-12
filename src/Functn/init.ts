// ## <a id="Functions"></a>Functions
//
// Because 'Function' is a reserved word in JavaScript the module is called 
// 'Functn'.  
// More improvements to the module coming soon.

var functnPrototype:any = {};

MathLib.Functn = function (f, options) {
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
					res = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>' + innerVar + '</bvar><domainofapplication><reals/></domainofapplication>' + outerStr + '</lambda></math>';
			return new MathLib.Functn(function (y) {return f(x(y));}, {contentMathMLString: res});
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

	//functn[proto] = prototypes.functn;
	for (var name in functnPrototype) {
		if (functnPrototype.hasOwnProperty(name)) {
			functn[name] = functnPrototype[name];
		}
	}
	functn.type = 'functn';
	functn.constructor = MathLib.Functn;


	var contentMathML = options.contentMathMLString || '';
	
	Object.defineProperties(functn, {
		id: { value: options.name},
		contentMathML: { value: new MathLib.MathML(contentMathML) }
	});

	return functn;
};