// ### Complex.polar()
// Construct a complex number out of the absolute value and the argument
//
// *@returns {complex}*
static polar = function (abs, arg) : Complex {
	return new MathLib.Complex(abs * Math.cos(arg), abs * Math.sin(arg));
};