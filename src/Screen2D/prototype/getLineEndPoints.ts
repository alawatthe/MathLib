/**
 * Calculates the both endpoints for the line
 * for drawing purposes
 *
 * @param {Line|array} l The Line to calculate the end points to
 * @return {array} The array has the format [[x1, y1], [x2, y2]]
 */
getLineEndPoints (l) : number[] {
	if (l.type === 'line') {
		var top    = (            - this.translation.y) / this.scale.y,
				bottom = (this.height - this.translation.y) / this.scale.y,
				left   = (            - this.translation.x) / this.scale.x,
				right  = (this.width  - this.translation.x) / this.scale.x,
				lineRight  = -(l[2] + l[0] * right)  / l[1],
				lineTop    = -(l[2] + l[1] * top)    / l[0],
				lineLeft   = -(l[2] + l[0] * left)   / l[1],
				lineBottom = -(l[2] + l[1] * bottom) / l[0],
				points = [];

		if (lineRight <= top && lineRight >= bottom) {
			points.push([right, lineRight]);
		}
		if (lineLeft <= top && lineLeft >= bottom) {
			points.push([left, lineLeft]);
		}
		if (lineTop < right && lineTop > left) {
			points.push([lineTop, top]);
		}
		if (lineBottom < right && lineBottom > left) {
			points.push([lineBottom, bottom]);
		}
		return points;
	}
	else {
		return l;
	}
}