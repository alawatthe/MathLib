// ### Functn.prototype.toLaTeX()
// Returns a LaTeX representation of the function
//
// *@param {string}* Optional: custom name for the bound variable (default: x)  
// *@returns {string}*
functnPrototype.toLaTeX = function(bvar = '') {

	// List of functions to be executed on the specified node type
	var handlers = {
		apply: function (n) {
			var f = n.childNodes[0],
					args = n.childNodes.slice(1).map(function(x) {
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
				// TODO: not all functions can be written like \sin some have to be written like \operatorname{argmax}
				str = '\\' +f.nodeName + '(' + args.join(', ') + ')';
			}
			return str;
		},
		bvar: function () {return '';},
		ci: function (n) {return bvar || n.innerMathML;},
		cn: function (n) {return n.innerMathML;},
		cs: function (n) {return n.innerMathML;},
		domainofapplication: function () {return '';},
		lambda: function (n) {
			return n.childNodes.reduce(function(old, cur) {
				return old + handlers[cur.nodeName](cur);
			}, '');
		},
		'#text': function (n) {return n.innerMathML;}
	};

	// Start the node handling with the first real element (not the <math> element)
	return handlers[this.contentMathML.childNodes[0].nodeName](this.contentMathML.childNodes[0]);
};