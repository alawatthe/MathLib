/*!
 * MathLib JavaScript Library v0.6.1
 * http://mathlib.de/
 *
 * Copyright 2012, 2013 Alexander Zeilmann
 * Released under the MIT license
 * http://mathlib.de/en/license
 *
 * build date: 2013-12-29
 */

var MathLib = require('./meta.js'),
		Functn = require('./Functn.js');

for (var prop in Functn) {
	MathLib[prop] = Functn[prop];
}

MathLib.CoercionError = require('./CoercionError.js');
MathLib.EvaluationError = require('./EvaluationError.js');
MathLib.Expression = require('./Expression.js');
MathLib.Screen = require('./Screen.js');
MathLib.Layer = require('./Layer.js');
MathLib.Canvas = require('./Canvas.js');
MathLib.SVG = require('./SVG.js');
MathLib.Screen2D = require('./Screen2D.js');
MathLib.Screen3D = require('./Screen3D.js');
MathLib.Vector = require('./Vector.js');
MathLib.Circle = require('./Circle.js');
MathLib.Complex = require('./Complex.js');
MathLib.Integer = require('./Integer.js');
MathLib.Line = require('./Line.js');
MathLib.Matrix = require('./Matrix.js');
MathLib.Permutation = require('./Permutation.js');
MathLib.Conic = require('./Conic.js');
MathLib.Point = require('./Point.js');
MathLib.Polynomial = require('./Polynomial.js');
MathLib.Rational = require('./Rational.js');
MathLib.Set = require('./Set.js');

module.exports = MathLib;
