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

/* jshint esnext:true */

import MathLib from './meta.js';
import Functn from './Functn.js';
import Expression from './Expression.js';
import Screen from './Screen.js';
import Layer from './Layer.js';
import Canvas from './Canvas.js';
import SVG from './SVG.js';
import Screen2D from './Screen2D.js';
import Screen3D from './Screen3D.js';
import Vector from './Vector.js';
import Circle from './Circle.js';
import Complex from './Complex.js';
import Line from './Line.js';
import Matrix from './Matrix.js';
import Permutation from './Permutation.js';
import Conic from './Conic.js';
import Point from './Point.js';
import Polynomial from './Polynomial.js';
import Rational from './Rational.js';
import Set from './Set.js';

MathLib.Expression = Expression;
MathLib.Screen = Screen;
MathLib.Layer = Layer;
MathLib.Canvas = Canvas;
MathLib.SVG = SVG;
MathLib.Screen2D = Screen2D;
MathLib.Screen3D = Screen3D;
MathLib.Vector = Vector;
MathLib.Circle = Circle;
MathLib.Complex = Complex;
MathLib.Line = Line;
MathLib.Matrix = Matrix;
MathLib.Permutation = Permutation;
MathLib.Conic = Conic;
MathLib.Point = Point;
MathLib.Polynomial = Polynomial;
MathLib.Rational = Rational;
MathLib.Set = Set;

for (var prop in Functn) {
	if (Functn.hasOwnProperty(prop)) {
		MathLib[prop] = Functn[prop];
	}
}

export default MathLib;
