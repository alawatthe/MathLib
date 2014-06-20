/* jshint node: true */

var randomNumber = require('./utilities').randomNumber;

var tanpi2 = function (x) {
	// Handle ±0 separate, because tan(pi/2 ± 0) is not ±∞
	if (x === 0) {
		return 1 / x;
	}
	// cot(x) = tan(pi/2 - x) is better than 1/tan(x)
	return Math.tan(1.5707963267948966 - x);
};


var taninv = function (x) {
	return 1 / Math.tan(x);
};



var variations = [
		{
			name: '1 / tan(x)',
			fn: function () {
				return taninv(randomNumber());
			}
		},
		{
			name: 'tan(pi/2 - x)',
			implemented: true,
			fn: function () {
				return tanpi2(randomNumber());
			}
		}
	];


module.exports = {
	name: 'cot',
	variations: variations
};
