/**
 * Restricts the point to a line.
 *
 * @param {Line} l The line to restrict the point to.
 */
restrictTo(l : Line) {
	var p = this.slice();

	Object.defineProperties(this, {
		'0': {
			get : function () {
				return l[1] * l[1] * p[0] - l[0] * (l[1] * p[1] + l[2] * p[2]);
			},
			set : function (point) {
				p[0] = point;
			},
			enumerable : true,
			configurable : true
		},
		'1': {
			get : function () {
				return - l[1] * l[2] * p[2] + l[0] * (l[0] * p[1] - l[1] * p[0]);
			},
			set : function (point) {
				p[1] = point;
			},
			enumerable : true,
			configurable : true
		},
		'2': {
			get : function () {
				return l[1] * l[1] * p[2] + l[0] * l[0] * p[2];
			},
			set : function (point) {
				p[2] = point;
			},
			enumerable : true,
			configurable : true
		}
	});
}