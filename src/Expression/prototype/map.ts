/**
 * Maps the expression tree over to an other expression tree.
 *
 * @param {function} f The function to apply to all the nodes in the tree.
 * @return {Expression}
 */
map(f) : Expression {
	var prop,
			properties = {},
			mappedProperties;

	for (prop in this) {
		if (this.hasOwnProperty(prop) && prop !== 'content') {
			if (Array.isArray(this[prop])) {
				properties[prop] = this[prop].map(f);
			}
			else {
				properties[prop] = this[prop];
			}
		}
	}

	mappedProperties = f(properties);
	if (Array.isArray(this.content)) {
		mappedProperties.content = this.content.map(function(expr) {
			if (expr.type === 'expression') {
				return expr.map(f);
			}
			else {
				return f(expr);
			}
		});
	}
	else if (this.content) {
		mappedProperties.content = this.content.map(f);
	}

	if (typeof mappedProperties === 'object') {
		return new MathLib.Expression(mappedProperties);
	}
	else {
		return mappedProperties;
	}
}