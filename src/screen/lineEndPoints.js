// ### Screen.prototype.lineEndPoint()
// Calculates the both endpoints for the line
// for drawing purposes
//
// *@param {line|array}*  
// *@returns {array}* The array has the format [[x1, y1], [x2, y2]]
MathLib.extendPrototype('screen', 'lineEndPoints', function (l) {
  if (l.type === 'line') {
    var right = -(l[2] + l[0]* 50) / l[1],
        up    = -(l[2] + l[1]* 50) / l[0],
        left  = -(l[2] + l[0]*-50) / l[1],
        down  = -(l[2] + l[1]*-50) / l[0],
        res = [];

    if (right<50 && right>-50) {
      res.push([50, right]);
    }
    if (left<50 && left>-50) {
      res.push([-50, left]);
    }
    if (up<50 && up>-50) {
      res.push([up, 50]);
    }
    if (down<50 && down>-50) {
      res.push([down, -50]);
    }
    return res;
  }
  else {
    return l;
  }
});