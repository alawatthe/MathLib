// ### MathML.prototype.toMathMLString()
// Converts the content MathMl to a presentation MathML string
// 
// *@return{string}*
toMathMLString() : string {
	var handlers = {
		apply: function (n) {
			var f = n.childNodes[0],
					args = n.childNodes.slice(1).map(function (x) {
						return handlers[x.nodeName](x);
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
			return n.childNodes.reduce(function (old, cur) {
				return old + handlers[cur.nodeName](cur);
			}, '');
		}, 
		'#text': function (n) {return n.innerMathML;}
	};

	return'<math xmlns="http://www.w3.org/1998/Math/MathML">' + handlers[this.childNodes[0].nodeName](this.childNodes[0]) + '</math>';
}