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
			properties[prop] = this[prop];
		}
	}

	mappedProperties = f(properties);
	if (Array.isArray(this.content)) {
		mappedProperties.content = this.content.map(expr => expr.map(f));
	}
	else if (this.content) {
		mappedProperties.content = this.content.map(f);
	}

	return new MathLib.Expression(mappedProperties);
}