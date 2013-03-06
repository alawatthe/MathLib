// ### Screen2D.prototype.getineEndPoint()
// Calculates the both endpoints for the line
// for drawing purposes
//
// *@param {line|array}*  
// *@returns {array}* The array has the format [[x1, y1], [x2, y2]]
getLineEndPoints (l) {
	if (l.type === 'line') {
		var 
				top    = (            - this.translation.y) / this.scale.y,
				bottom = (this.height - this.translation.y) / this.scale.y,
				left   = (            - this.translation.x) / this.scale.x,
				right  = (this.width  - this.translation.x) / this.scale.x,
				lineRight  = -(l[2] + l[0]* right)  / l[1],
				lineTop    = -(l[2] + l[1]* top)    / l[0],
				lineLeft   = -(l[2] + l[0]* left)   / l[1],
				lineBottom = -(l[2] + l[1]* bottom) / l[0],
				res = [];

		if (lineRight<top && lineRight>bottom) {
			res.push([right, lineRight]);
		}
		if (lineLeft<top && lineLeft>bottom) {
			res.push([left, lineLeft]);
		}
		if (lineTop<right && lineTop>left) {
			res.push([lineTop, top]);
		}
		if (lineBottom<right && lineBottom>left) {
			res.push([lineBottom, bottom]);
		}
		return res;
	}
	else {
		return l;
	}
}