/*!
 * MathLib JavaScript Library v0.7.3
 * http://mathlib.de/
 *
 * Copyright 2012 - 2014 Alexander Zeilmann
 * Released under the MIT license
 * http://mathlib.de/en/license
 *
 * build date: 2014-08-18
 */

declare module MathLib {
    var version: string;
    var apery: number;
    var e: number;
    var epsilon: number;
    var eulerMascheroni: number;
    var goldenRatio: number;
    var pi: number;
    var isNative: (fn: any) => any;
    var argToRgba: (h: number) => number[];
    var extendObject: (dest: any, src: any) => any;
    var colorConvert: (n: any) => string;
    var coerceTo: (obj: any, type: any) => any;
    var coerce: (...args: any[]) => any[];
    /**
    * ### [MathLib.on()](http://mathlib.de/en/docs/on)
    * Binds an event handler to an event.
    *
    * @param {string} type - The name of the event.
    * @param {function} callback - The callback function.
    */
    var on: (type: string, callback: any) => void;
    /**
    * ### [MathLib.off()](http://mathlib.de/en/docs/off)
    * Unbinds an event handler from an event.
    *
    * @param {string} type - The name of the event.
    * @param {function} callback - The callback function.
    */
    var off: (type: string, callback: any) => void;
    /**
    * ### MathLib.error()
    * Fires an error event.
    *
    * @param {oject} details - An object describing the error further.
    */
    var error: (details: any) => void;
    /**
    * ### MathLib.warning()
    * Fires a waring event.
    *
    * @param {object} details - An object describing the warning further.
    */
    var warning: (details: any) => void;
    /**
    * Custom toString function
    *
    * @param {any} x - The value to which the String should be generated
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    var toString: (x: any, options?: toPresentationOptions) => string;
    /**
    * A content MathML string representation
    *
    * @param {any} x - The value to which the MathML should be generated
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    var toContentMathML: (x: any, options?: toContentMathMLOptions) => string;
    /**
    * A LaTeX string representation
    *
    * @param {any} x - The value to which the LaTeX should be generated
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    var toLaTeX: (x: any, options?: toPresentationOptions) => string;
    /**
    * A presentation MathML string representation
    *
    * @param {any} x - The value to which the MathML should be generated
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    var toMathML: (x: any, options?: toPresentationOptions) => string;


    /**
    * MathLib.CoercionError is thrown if it is not possible to perform the coercion.
    *
    */
    var CoercionError: (message: string, options: any) => void;


    /**
    * MathLib.EvaluationError is thrown if it is not possible to perform the Evaluation.
    .*
    */
    var EvaluationError: (message: string, options: any) => void;


    /**
    * MathLib.Expression is the MathLib implementation of symbolic expressions
    *
    * @class
    * @this {Expression}
    */
    class Expression {
        public type: string;
        public args: any;
        public cdgroup: string;
        public content: any;
        public isMethod: boolean;
        public contentMathMLName: string;
        public mode: string;
        public name: string;
        public subtype: string;
        public value: any;
        constructor(expr?: {});
        /**
        * Constructs a constant expression.
        *
        * @param {String} n The constant to generate an expression from
        * @return {Expression}
        */
        static constant(n: any): Expression;
        /**
        * Constructs a number expression.
        *
        * @param {String} n The number to generate an expression from
        * @return {Expression}
        */
        static number(n: String): Expression;
        /**
        * Heavily based on Ariya Hidayat's [tapdigit library](https://code.google.com/p/tapdigit/)
        * and his series "math evaluator in javascript":
        * [Part 1: tokenizer](http://ariya.ofilabs.com/2011/08/math-evaluator-in-javascript-part1.html)
        * [Part 2: parser](http://ariya.ofilabs.com/2011/08/math-evaluator-in-javascript-part-2.html)
        * [Part 3: interpreter](http://ariya.ofilabs.com/2011/08/math-expression-evaluator-in-javascript-part-3.html)
        *
        * @param {string} str - The string to parse
        * @return {Expression}
        */
        static parse: (str: string) => Expression;
        /**
        * Parses a content MathML string and returns an Expression.
        *
        * @param {string} MathMLString The string to be parsed as MathML
        * @return {Expression}
        */
        static parseContentMathML(MathMLString: string): Expression;
        /**
        * Constructs a variable expression.
        *
        * @param {string} n - The variable to generate an expression from
        * @return {Expression}
        */
        static variable(n: string): Expression;
        /**
        * Stores all the values of variables in symbolic expressions.
        *
        * @return {Expression}
        */
        static variables: {};
        /**
        * Compares two expressions
        *
        * @param {Expression} expr The expression to compare
        * @return {number}
        */
        public compare(expr: Expression): number;
        /**
        * Copies the Expression
        * @return {Expression} The copied expression
        */
        public copy(): Expression;
        /**
        * Evaluates the symbolic expression
        *
        * @return {any}
        */
        public evaluate(): any;
        /**
        * Maps the expression tree over to an other expression tree.
        *
        * @param {function} f The function to apply to all the nodes in the tree.
        * @return {Expression}
        */
        public map(f: any): Expression;
        /**
        * Convert the Expression to MathML.
        *
        * @return {string}
        */
        public toContentMathML(): string;
        /**
        * Convert the expression to a LaTeX string
        *
        * @return {string}
        */
        public toLaTeX(): string;
        /**
        * Convert the Expression to MathML.
        *
        * @return {string}
        */
        public toMathML(): string;
        /**
        * A custom toString function
        *
        * @return {string}
        */
        public toString(): string;
    }


    /**
    * MathLib.Functn is the MathLib implementation of mathematical functions
    *
    * Because 'Function' is a reserved word in JavaScript,
    * the class is called 'Functn'.
    *
    * @class
    * @this {Functn}
    */
    var Functn: (f: any, options: any) => (...args: any[]) => any;
    var compare: (a: any, b: any) => any;
    var evaluate: (x: any) => any;
    var type: (x: any) => any;
    var is: (obj: any, type: any) => boolean;
    /**
    * Checks if MathML is supported by the browser.
    * Code stolen from [Modernizr](http://www.modernizr.com/)
    *
    * @return {boolean}
    */
    var isMathMLSupported: () => boolean;
    /**
    * ### MathLib.writeMathML()
    * Writes MathML to an element.
    *
    * @param {string} id The id of the element in which the MathML should be inserted.
    * @param {string} math The MathML to be inserted.
    */
    var writeMathML: (id: string, math: string) => void;
    /**
    * ### MathLib.loadMathJax()
    * Loads MathJax dynamically.
    *
    * @param {string} config Optional config options
    */
    var loadMathJax: (config: string) => void;
    var abs: any;
    var arccos: any;
    var arccot: any;
    var arccsc: any;
    var arcosh: any;
    var arcoth: any;
    var arcsch: any;
    var arcsec: any;
    var arcsin: any;
    var arctan: any;
    var arsech: any;
    var arsinh: any;
    var artanh: any;
    var binomial: any;
    var ceil: any;
    var cbrt: any;
    var conjugate: any;
    var copy: any;
    var cos: any;
    var cosh: any;
    var cot: any;
    var coth: any;
    var csc: any;
    var csch: any;
    var degToRad: any;
    var exp: any;
    var factorial: any;
    var floor: any;
    var identity: any;
    var inverse: any;
    var isFinite: any;
    var isInt: any;
    var isNaN: any;
    var isNegZero: any;
    var isOne: any;
    var isPosZero: any;
    var isPrime: any;
    var isReal: any;
    var isZero: any;
    var lg: any;
    var ln: any;
    var logGamma: any;
    var negative: any;
    var not: any;
    var radToDeg: any;
    var rem: any;
    var sec: any;
    var sech: any;
    var sign: any;
    var sin: any;
    var sinh: any;
    var sqrt: any;
    var tan: any;
    var tanh: any;
    var arctan2: any;
    var divide: any;
    var equivalent: any;
    var implies: any;
    var log: any;
    var minus: any;
    var mod: any;
    var pow: any;
    var root: any;
    var divisors: any;
    var factor: any;
    var fallingFactorial: any;
    var fibonacci: any;
    var risingFactorial: any;
    var round: any;
    var trunc: any;
    var and: any;
    var arithMean: any;
    var gcd: any;
    var geoMean: any;
    var harmonicMean: any;
    var hypot: any;
    var hypot2: any;
    var isEqual: any;
    var lcm: any;
    var max: any;
    var min: any;
    var or: any;
    var plus: any;
    var times: any;
    var xor: any;


    /**
    * This module contains the common methods of all drawing modules.
    *
    * @class
    * @this {Screen}
    */
    class Screen {
        public type: string;
        public container: any;
        public figure: any;
        public wrapper: any;
        public contextMenu: any;
        public contextMenuOverlay: any;
        public height: number;
        public width: number;
        public origHeight: number;
        public origWidth: number;
        public options: any;
        public renderer: any;
        public element: any;
        public innerHTMLContextMenu: string;
        public camera: any;
        constructor(id: string, options?: {});
        /**
        * Handles the contextmenu event
        *
        * @param {event} evt The event object
        */
        public oncontextmenu(evt: any): void;
    }


    /**
    * Layers for two dimensional plotting
    *
    * @class Layer
    * @this {Layer}
    */
    class Layer {
        public ctx: any;
        public element: any;
        public id: string;
        public screen: any;
        public zIndex: number;
        public stack: any;
        public transformation: Matrix;
        public applyTransformation: any;
        public draw: any;
        public circle: any;
        public line: any;
        public path: any;
        public pixel: any;
        public point: any;
        public text: any;
        constructor(screen: any, id: string, zIndex: any);
        /**
        * Clears the Layer
        *
        * @return {Layer} Returns the current Layer
        */
        public clear(): Layer;
    }


    /**
    * The Canvas renderer for 2D plotting
    */
    var Canvas: {
        applyTransformation: () => void;
        circle: (circle: Circle, options?: drawingOptions, redraw?: boolean) => Screen2D;
        clear: (layer: Layer) => void;
        convertOptions: (options: drawingOptions) => canvasDrawingOptions;
        line: (line: any, options?: drawingOptions, redraw?: boolean) => Screen2D;
        path: (curve: any, options?: pathDrawingOptions, redraw?: boolean) => Screen2D;
        pixel: (f: any, t: number, r: number, b: number, l: number, options?: drawingOptions, redraw?: boolean) => Screen2D;
        point: (point: Point, options?: drawingOptions, redraw?: boolean) => Screen2D;
        text: (str: string, x: number, y: number, options?: drawingOptions, redraw?: boolean) => Screen2D;
    };


    /**
    * The SVG renderer for 2D plotting
    */
    var SVG: {
        applyTransformation: () => void;
        circle: (circle: any, options?: drawingOptions, redraw?: boolean) => Screen2D;
        clear: (layer: Layer) => void;
        convertOptions: (options: drawingOptions) => svgDrawingOptions;
        line: (line: any, options?: drawingOptions, redraw?: boolean) => Screen2D;
        path: (curve: any, options?: pathDrawingOptions, redraw?: boolean) => Screen2D;
        pixel: (f: any, t: number, r: number, b: number, l: number, options?: drawingOptions, redraw?: boolean) => Screen2D;
        point: (point: any, options?: drawingOptions, redraw?: boolean) => Screen2D;
        text: (str: string, x: number, y: number, options?: drawingOptions, redraw?: boolean) => Screen2D;
    };


    /**
    * Two dimensional plotting
    *
    * @class
    * @augments Screen
    * @this {Screen2D}
    */
    class Screen2D extends Screen {
        public type: string;
        public applyTransformation: any;
        public background: any;
        public renderer: any;
        public axes: any;
        public grid: any;
        public layer: any;
        public element: any;
        public init: any;
        public redraw: any;
        public draw: any;
        public circle: any;
        public line: (line: any, options?: drawingOptions, redraw?: boolean) => Screen2D;
        public path: any;
        public pixel: any;
        public point: any;
        public text: any;
        public transformation: Matrix;
        public translation: any;
        public scale: any;
        public lookAt: any;
        public range: any;
        public interaction: any;
        public zoomSpeed: any;
        constructor(id: string, options?: {});
        /**
        * Draws the axes.
        *
        * @return {Screen2D}
        */
        public drawAxes(): Screen2D;
        /**
        * Draws the grid.
        *
        * @return {Screen2D}
        */
        public drawGrid(): Screen2D;
        /**
        * Creates a point based on the coordinates of an event.
        *
        * @param {event} evt The event object
        * @return {Point}
        */
        public getEventPoint(evt: MouseEvent): Point;
        /**
        * Calculates the both endpoints for the line
        * for drawing purposes
        *
        * @param {Line|array} l The Line to calculate the end points to
        * @return {array} The array has the format [[x1, y1], [x2, y2]]
        */
        public getLineEndPoints(l: any): number[];
        /**
        * Handles the keydown event
        *
        * @param {KeyboardEvent} evt The event object
        */
        public onkeydown(evt: KeyboardEvent): void;
        /**
        * Handles the mousedown event
        *
        * @param {MouseEvent} evt The event object
        */
        public onmousedown(evt: MouseEvent): void;
        /**
        * Handles the mousemove event
        *
        * @param {MouseEvent} evt The event object
        */
        public onmousemove(evt: MouseEvent): void;
        /**
        * Handles the mouseup event
        *
        * @param {MouseEvent} evt The event object
        */
        public onmouseup(evt: MouseEvent): void;
        /**
        * Handles the mousewheel event
        *
        * @param {MouseEvent} evt The event object
        */
        public onmousewheel(evt: MouseEvent): void;
        /**
        * Adjust the rendering if the screen is resized
        *
        * @param {number} width The new width
        * @param {number} height The new height
        * @return {Screen2D}
        */
        public resize(width: number, height: number): Screen2D;
    }


    /**
    * Three dimensional plotting
    *
    * @class
    * @augments Screen
    * @this {Screen3D}
    */
    class Screen3D extends Screen {
        public type: string;
        public grid: any;
        public axes: any;
        public render: any;
        public camera: any;
        public element: any;
        public scene: any;
        constructor(id: string, options?: {});
        /**
        * Draws the grid.
        *
        * @return {Screen3D}
        */
        public drawGrid(): Screen3D;
        /**
        * Creates a parametric plot
        *
        * @param {function} f The function which is called on every argument
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        public parametricPlot3D(f: any, options: any): Screen3D;
        /**
        * Creates a plot of a three dimensional function
        *
        * @param {function} f The map for the height
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        public plot3D(f: any, options: any): Screen3D;
        /**
        * Adjust the rendering if the screen is resized
        *
        * @param {number} width The new width
        * @param {number} height The new height
        * @return {Screen3D}
        */
        public resize(width: number, height: number): Screen3D;
        /**
        * Creates a surface plot.
        *
        * @param {function} f The map for the surface
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        public surfacePlot3D(f: any, options: any): Screen3D;
    }


    /**
    * The vector implementation of MathLib makes calculations with vectors of
    * arbitrary size possible. The entries of the vector can be numbers and complex
    * numbers.
    *
    * It is as easy as
    * `new MathLib.Vector([1, 2, 3])`
    * to create the following vector:
    *    ⎛ 1 ⎞
    *    ⎜ 2 ⎟
    *    ⎝ 3 ⎠
    *
    * @class
    * @this {Vector}
    */
    class Vector implements Printable {
        public type: string;
        public length: number;
        constructor(coords: number[]);
        /**
        * Checks if the vectors are linear independent.
        *
        * @param {array} vectors An array containing the vectors.
        * @return {boolean}
        */
        static areLinearIndependent: (vectors: Vector[]) => boolean;
        /**
        * Returns a zero vector of given size.
        *
        * @param {number} n The number of entries in the vector.
        * @return {Vector}
        */
        static zero: (n: number) => Vector;
        /**
        * Compares two vectors.
        *
        * @param {Vector} v The vector to compare
        * @return {number}
        */
        public compare(v: Vector): number;
        /**
        * Evaluates the entries of the vector
        *
        * @return {Vector}
        */
        public evaluate(): Vector;
        /**
        * Works like Array.prototype.every.
        *
        * @param {function} f The function to be applied to all the values
        * @return {boolean}
        */
        public every(f: (value: any, index: number, vector: Vector) => boolean): boolean;
        /**
        * Works like Array.prototype.forEach.
        *
        * @param {function} f The function to be applied to all the values
        */
        public forEach(f: (value: any, index: number, vector: Vector) => void): void;
        /**
        * Determines if two vectors are equal
        *
        * @param {Vector} v The vector to compare
        * @return {boolean}
        */
        public isEqual(v: Vector): boolean;
        /**
        * Determines if the vector is the zero vector.
        *
        * @return {boolean}
        */
        public isZero(): boolean;
        /**
        * Works like Array.prototype.map.
        *
        * @param {function} f The function to be applied to all the values
        * @return {Vector}
        */
        public map(f: (value: any, index: number, vector: Vector) => any): any;
        /**
        * Calculates the difference of two vectors.
        *
        * @param {Vector} v The vector to be subtracted.
        * @return {Vector}
        */
        public minus(v: Vector): Vector;
        /**
        * Returns the negative vector.
        *
        * @return {Vector}
        */
        public negative(): Vector;
        /**
        * Calcultes the norm of the vector.
        *
        * @param {number} p The p for the p-norm
        * @return {number}
        */
        public norm(p?: number): number;
        /**
        * Calculates the outer product of two vectors.
        *
        * @param {Vector} v The second vector to calculate the outer product with.
        * @return {Matrix}
        */
        public outerProduct(v: Vector): Matrix;
        /**
        * Calculates the sum of two vectors.
        *
        * @param {Vector} v The vector to add to the current vector.
        * @return {Vector}
        */
        public plus(v: Vector): Vector;
        /**
        * Works like Array.prototype.reduce.
        *
        * @return {any}
        */
        public reduce(...args: any[]): any;
        /**
        * Calculates the scalar product of two vectors.
        *
        * @param {Vector} v The second vector to calculate the scalar product with.
        * @return {number|Complex}
        */
        public scalarProduct(v: Vector): any;
        /**
        * Works like the Array.prototype.slice function
        *
        * @return {array}
        */
        public slice(...args: any[]): any[];
        /**
        * Multiplies the vector by a (complex) number or a matrix.
        * The vector is multiplied from left to the matrix.
        * If you want to multiply it from the right use
        * matrix.times(vector) instead of vector.times(matrix)
        *
        * @param {number|Complex|Matrix} n The object to multiply to the vector
        * @return {Vector}
        */
        public times(n: any): any;
        /**
        * Converts the vector to an array.
        *
        * @return {array}
        */
        public toArray(): any[];
        /**
        * Returns the content MathML representation of the vector.
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toContentMathML(options?: toContentMathMLOptions): string;
        /**
        * Returns a LaTeX representation of the vector.
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toLaTeX(options?: toPresentationOptions): string;
        /**
        * Returns the (presentation) MathML representation of the vector.
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toMathML(options?: toPresentationOptions): string;
        /**
        * Returns a string representation of the vector.
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toString(options?: toPresentationOptions): string;
        /**
        * Calculates the vector product of two vectors.
        *
        * @param {Vector} v The second vector to calculate the vector product with.
        * @return {Vector}
        */
        public vectorProduct(v: Vector): Vector;
    }


    /**
    * Creates a MathLib circle
    * MathLib.Circle expects two arguments.
    * First the center in the form of an Array or a MathLib.point.
    * The second argument should be the radius of the circle.
    * #### Simple use case:
    *
    * ```
    * // Create a circle with center (1, 2) and radius 3.
    * var c = new MathLib.Circle([1, 2], 3);
    * c.center                   // The center of the circle (point)
    * c.radius                   // returns the radius of the circle
    * ```
    *
    * @class
    * @this {Circle}
    */
    class Circle implements Drawable {
        public type: string;
        public center: Point;
        public radius: number;
        constructor(center: any, radius: number);
        /**
        * Calculates the area of the circle.
        *
        * @return {number} The area of the circle
        */
        public area(): number;
        /**
        * Calculates the circumference of the circle.
        *
        * @return {number} The circumference of the circle
        */
        public circumference(): number;
        /**
        * Compares two circles
        *
        * @param {Circle} circle The circle to compare
        * @return {number}
        */
        public compare(circle: Circle): number;
        /**
        * Draw the circle onto the screen.
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {drawingOptions} options Optional drawing options
        * @return {Circle} Returns the circle for chaining
        */
        public draw(screen: any, options: drawingOptions): Circle;
        /**
        * Checks if two circles are equal
        *
        * @param {Circle} circle The circle to compare
        * @return {boolean}
        */
        public isEqual(circle: Circle): boolean;
        /**
        * Determine if a point is in, on or outside a circle.
        *
        * @param {Point} point The Point to determine the position of
        * @return {string}
        */
        public positionOf(point: Point): string;
        /**
        * Reflect the circle at a point or line
        *
        * @return {Circle}
        */
        public reflectAt(a: any): Circle;
        /**
        * Returns a LaTeX expression of the circle
        *
        * @return {string}
        */
        public toLaTeX(): string;
        /**
        * Converts the circle to the corresponding matrix.
        *
        * @return {Matrix}
        */
        public toMatrix(): Matrix;
    }


    /**
    * MathLib.Complex is the MathLib implementation of complex numbers.
    *
    * There are two ways of defining complex numbers:
    *
    * * Two numbers representing the real and the complex part.
    * * MathLib.Complex.polar(abs, arg)
    *
    * #### Simple example:
    * ```
    * // Create the complex number 1 + 2i
    * var c = new MathLib.Complex(1, 2);
    * ```
    *
    * @class
    * @this {Complex}
    */
    class Complex implements FieldElement, Printable {
        public type: string;
        public re: any;
        public im: any;
        constructor(re: any, im?: number);
        /**
        * The characteristic of the complex field is 0.
        *
        * @return {Integer}
        */
        static characteristic(): Integer;
        /**
        * Construct a complex number out of the absolute value and the argument
        *
        * @return {Complex}
        */
        static polar: (abs: any, arg: any) => Complex;
        /**
        * A content MathML string representation
        *
        * @return {string}
        */
        static toContentMathML(options?: toContentMathMLOptions): string;
        /**
        * A LaTeX string representation
        *
        * @return {string}
        */
        static toLaTeX(): string;
        /**
        * A presentation MathML string representation
        *
        * @return {string}
        */
        static toMathML(): string;
        /**
        * Custom toString function
        *
        * @return {string}
        */
        static toString(): string;
        /**
        * Returns the absolute value of the number.
        *
        * @return {number}
        */
        public abs(): number;
        /**
        * Returns the inverse cosine of the number.
        *
        * @return {Complex}
        */
        public arccos(): Complex;
        /**
        * Returns the inverse cotangent of the number.
        *
        * @return {Complex}
        */
        public arccot(): Complex;
        /**
        * Returns the inverse cosecant of the number
        *
        * @return {Complex}
        */
        public arccsc(): Complex;
        /**
        * Returns the inverse hyperbolic cosine of the number
        *
        * @return {Complex}
        */
        public arcosh(): Complex;
        /**
        * Returns the inverse hyperbolic cotangent of the number
        *
        * @return {Complex}
        */
        public arcoth(): Complex;
        /**
        * Returns the inverse hyperbolic cosecant of the number
        *
        * @return {Complex}
        */
        public arcsch(): Complex;
        /**
        * Returns the inverse secant of the number
        *
        * @return {Complex}
        */
        public arcsec(): Complex;
        /**
        * Returns the inverse sine of the number
        *
        * @return {Complex}
        */
        public arcsin(): Complex;
        /**
        * Returns the inverse tangent of the number
        *
        * @return {Complex}
        */
        public arctan(): Complex;
        /**
        * Returns the argument (= the angle) of the complex number
        *
        * @return {number}
        */
        public arg(): number;
        /**
        * Returns the inverse hyperbolic secant of the number
        *
        * @return {Complex}
        */
        public arsech(): Complex;
        /**
        * Returns the inverse hyperbolic sine of the number
        *
        * @return {Complex}
        */
        public arsinh(): Complex;
        /**
        * Returns the inverse hyperbolic tangent of the number
        *
        * @return {Complex}
        */
        public artanh(): Complex;
        /**
        * Coerces the complex number to some other data type
        *
        * @param {string} type The type to coerce the complex number into
        * @return {Rational|number|Complex}
        */
        public coerceTo(type: string): any;
        /**
        * Compares two complex numbers
        *
        * @param {Complex} x The complex number to compare the current number to
        * @return {number}
        */
        public compare(x: Complex): number;
        /**
        * Calculates the conjugate of a complex number
        *
        * @return {Complex}
        */
        public conjugate(): Complex;
        /**
        * Copies the complex number
        *
        * @return {Complex}
        */
        public copy(): Complex;
        /**
        * Calculates the cosine of a complex number
        *
        * @return {Complex}
        */
        public cos(): Complex;
        public cosh(): Complex;
        /**
        * Calculates the cotangent of a complex number
        *
        * @return {Complex}
        */
        public cot(): Complex;
        /**
        * Calculates the hyperbolic cotangent of a complex number
        *
        * @return {Complex}
        */
        public coth(): Complex;
        /**
        * Calculates the cosecant of a complex number
        *
        * @return {Complex}
        */
        public csc(): Complex;
        /**
        * Calculates the hyperbolic cosecant of a complex number
        *
        * @return {Complex}
        */
        public csch(): Complex;
        /**
        * Divides a complex number by an other
        *
        * @param {number|Complex} divisor The divisor
        * @return {Complex}
        */
        public divide(divisor: any): Complex;
        /**
        * Evaluates the exponential function with a complex argument
        *
        * @return {Complex}
        */
        public exp(): Complex;
        /**
        * Calculates the inverse of a complex number
        *
        * @return {Complex}
        */
        public inverse(): Complex;
        /**
        * Determines if the complex number is equal to another number.
        *
        * @param {Integer|Rational|number|Complex} n The number to be compared
        * @return {boolean}
        */
        public isEqual(n: any): boolean;
        /**
        * Determines if the complex number is finite.
        *
        * @return {boolean}
        */
        public isFinite(): boolean;
        /**
        * Determines if the complex number is equal to 0.
        *
        * @return {boolean}
        */
        public isZero(): boolean;
        public ln(): Complex;
        /**
        * Calculates the difference of two complex numbers
        *
        * @param {number|Complex} subtrahend The subtrahend
        * @return {Complex}
        */
        public minus(subtrahend: any): Complex;
        /**
        * Calculates the negative of the complex number
        *
        * @return {Complex}
        */
        public negative(): Complex;
        /**
        * Add complex numbers
        *
        * @param {Integer|Rational|number|Complex} summand The number to be added
        * @return {Complex}
        */
        public plus(summand: any): Complex;
        /**
        * Calculates the complex number raised to some power
        *
        * @param {numeric} c The power to which the complex number should be raised
        * @return {Complex}
        */
        public pow(c: any): Complex;
        /**
        * Calculates the secant of a complex number
        *
        * @return {Complex}
        */
        public sec(): Complex;
        /**
        * Calculates the hyperbolic secant of a complex number
        *
        * @return {Complex}
        */
        public sech(): Complex;
        /**
        * Calculates the signum of a complex number
        *
        * @return {Complex}
        */
        public sign(): Complex;
        /**
        * Calculates the sine of a complex number
        *
        * @return {Complex}
        */
        public sin(): Complex;
        /**
        * Calculates the hyperbolic sine of a complex number
        *
        * @return {Complex}
        */
        public sinh(): Complex;
        /**
        * Takes the square root of a complex number
        *
        * @return {Complex}
        */
        public sqrt(): Complex;
        /**
        * Calculates the tangent of a complex number
        *
        * @return {Complex}
        */
        public tan(): Complex;
        /**
        * Calculates the hyperbolic tangent of a complex number
        *
        * @return {Complex}
        */
        public tanh(): Complex;
        /**
        * Multiplies complex numbers
        *
        * @param {Complex|number|Rational} factor The number to be multiplied
        * @return {Complex}
        */
        public times(factor: any): Complex;
        /**
        * Returns the content MathML representation of the number
        *
        * @return {string}
        */
        public toContentMathML(): string;
        /**
        * Returns the LaTeX representation of the complex number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toLaTeX(options?: toPresentationOptions): string;
        /**
        * Returns the (presentation) MathML representation of the number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toMathML(options?: toPresentationOptions): string;
        /**
        * Interprets the complex number as point in the two dimensional plane
        *
        * @return {Point}
        */
        public toPoint(): Point;
        /**
        * Custom toString function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toString(options?: toPresentationOptions): string;
    }
declare var Complex: Field;


    /**
    * MathLib.Integer is the MathLib implementation of (arbitrary precision) integers.
    *
    *
    * #### Simple example:
    * ```
    * // Create the integer
    * var int = new MathLib.Integer('123456789');
    * ```
    *
    * @class
    * @this {Integer}
    */
    class Integer implements Printable, RingElement {
        public type: string;
        public data: number[];
        public sign: string;
        constructor(integer: any, options?: {});
        /**
        * The characteristic of the ring of integers is 0.
        *
        * @return {Integer}
        */
        static characteristic(): Integer;
        /**
        * Returns a random element of the ring of integers
        * in the intervall [start, end] (both endpoits included).
        * If the second argument is not provided, the intervall is
        * [start, 0] (if start is negative) or [0, start] (if start is positive).
        * Again, both endpoits are included.
        *
        * @param {start} Integer - the integer starting the intervall
        * @param {end} Integer - the integer ending the intervall
        * @return {Integer}
        */
        static randomElement(start: Integer, end?: Integer): Integer;
        /**
        * A content MathML string representation
        *
        * @return {string}
        */
        static toContentMathML(options?: toContentMathMLOptions): string;
        /**
        * A LaTeX string representation
        *
        * @return {string}
        */
        static toLaTeX(): string;
        /**
        * A presentation MathML string representation
        *
        * @return {string}
        */
        static toMathML(): string;
        /**
        * Custom toString function
        *
        * @return {string}
        */
        static toString(): string;
        /**
        * Calculates the absolute value of the integer
        *
        * @return {Integer}
        */
        public abs(): Integer;
        /**
        * Calculates the ceil of the integer
        *
        * @return {Integer}
        */
        public ceil(): Integer;
        /**
        * Coerces the integer to some other data type
        *
        * @param {string} type The type to coerce the integer into
        * @return {Integer|Rational|number|Complex}
        */
        public coerceTo(type: string): any;
        /**
        * Compares the integer
        *
        * @return {Integer}
        */
        public compare(n: Integer): number;
        /**
        * Calculates the complex conjugate of the integer
        *
        * @return {Integer}
        */
        public conjugate(): Integer;
        /**
        * Copy the integer
        *
        * @return {Integer}
        */
        public copy(): Integer;
        /**
        * Calculates the digit sum to a given base
        *
        * @param {number} [base=10] - The base
        * @return {Integer}
        */
        public digitSum(base?: number): Integer;
        /**
        * Returns the digits of the integer in a given base
        *
        * @param {number} [base=10] - The base
        * @return {number[]}
        */
        public digits(base?: number): number[];
        /**
        * Divides the integer by some other number.
        *
        * @param {Integer|Rational|number|Complex} divisor - The divisor
        * @return {Integer|Rational|number|Complex}
        */
        public divide(divisor: any): any;
        /**
        * Returns an array containing the quotient and the remainder of the division.
        *
        * Based on the "Schoolbook Division" in
        * Karl Hasselström's "Fast Division of Large Integers"
        * http://www.treskal.com/kalle/exjobb/original-report.pdf
        *
        * @param {Integer} divisor - The divisor
        * @return {Integer[]}
        */
        public divrem(divisor: Integer): Integer[];
        /**
        * Calculates the factorial of the integer
        *
        * @return {Integer}
        */
        public factorial(): RingElement;
        /**
        * Calculates the floor of the integer
        *
        * @return {Integer}
        */
        public floor(): Integer;
        /**
        * Checks if the current integer is equal to some other number
        *
        * @param {any} n The number to check
        * @return {boolean}
        */
        public isEqual(n: any): boolean;
        /**
        * All integers are finite
        *
        * @return {boolean}
        */
        public isFinite(): boolean;
        /**
        * No Integer is NaN
        *
        * @return {boolean}
        */
        public isNaN(): boolean;
        /**
        * Checks if the integer is a unit in the ring of integers or not
        *
        * @return {boolean}
        */
        public isUnit(): boolean;
        /**
        * Checks if the integer is zero or not
        *
        * @return {boolean}
        */
        public isZero(): boolean;
        /**
        * Calculates the floor of the square root of the integer
        *
        * @return {Integer}
        */
        public isqrt(): Integer;
        /**
        * Subtracts a number from the current integer
        *
        * @param {Integer|Rational|number|Complex} n - The number to subtract
        * @return {Integer}
        */
        public minus(n: any): Integer;
        /**
        * Reduces the integer modulo an other number.
        *
        * @param {Integer|number} n - The number with which the current integer should be reduced
        * @return {Integer|number}
        */
        public mod(n: Integer): any;
        /**
        * Calculates the negative integer
        *
        * @return {Integer}
        */
        public negative(): Integer;
        /**
        * Adds a number to the current integer
        *
        * @param {Integer|Rational|number|Complex} n - The number to add
        * @return {Integer}
        */
        public plus(n: any): Integer;
        /**
        * Raises the integer to a certain power.
        *
        * @param {Integer|Rational|number|Complex} exponent - The exponent
        * @return {Integer|Rational}
        */
        public pow(exponent: any): any;
        /**
        * Multiplies a number to the current integer
        *
        * @param {Integer|Rational|number|Complex} n - The number to multiply
        * @return {Integer}
        */
        public times(n: any): Integer;
        /**
        * A content MathML string representation
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toContentMathML(options?: toContentMathMLOptions): string;
        /**
        * A LaTeX string representation
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toLaTeX(options?: toPresentationOptions): string;
        /**
        * A presentation MathML string representation
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toMathML(options?: toPresentationOptions): string;
        /**
        * Custom toString function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toString(options?: toPresentationOptions): string;
    }
declare var Integer: Ring;


    /**
    * The line implementation of MathLib makes calculations with lines in the
    * real plane possible. (Higher dimensions will be supported later)
    *
    * @class
    * @augments Vector
    * @this {Line}
    */
    class Line extends Vector implements Drawable {
        public type: string;
        public dimension: number;
        constructor(coords: number[]);
        /**
        * Draws the line on one or more screens
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {object} options Drawing options
        * @return {Line} Returns the line for chaining
        */
        public draw(screen: any, options?: drawingOptions): Line;
        /**
        * Determines if two lines are equal.
        *
        * @param {Line} l The line to compare with
        * @return {boolean}
        */
        public isEqual(l: Line): boolean;
        /**
        * Determines if the line is finite
        *
        * @return {boolean}
        */
        public isFinite(): boolean;
        /**
        * Determines if two lines are parallel.
        *
        * @param {Line} l The other line
        * @return {boolean}
        */
        public isParallelTo(l: Line): boolean;
        /**
        * Calculates the meeting point of two lines
        *
        * @param {Line} l The line to intersect the current line with
        * @return {Point}
        */
        public meet(l: Line): Point;
        /**
        * Normalizes the line.
        *
        * @return {Line}
        */
        public normalize(): Line;
        /**
        * Determines an parallel line through a given point.
        *
        * @param {Point} p The Point through which the line should go through
        * @return {Line}
        */
        public parallelThrough(p: Point): Line;
    }


    /**
    * The matrix implementation of MathLib makes calculations with matrices of
    * arbitrary size possible. The entries of a matrix can be numbers and complex
    * numbers.
    *
    * It is as easy as
    * ```
    * new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    * ```
    * to create the following matrix:
    *    ⎛ 1 2 3 ⎞
    *    ⎜ 4 5 6 ⎟
    *    ⎝ 7 8 9 ⎠
    *
    * @class
    * @this {Matrix}
    */
    class Matrix implements Printable {
        public type: string;
        public length: number;
        public cols: number;
        public rows: number;
        public LUpermutation: Permutation;
        constructor(matrix: any);
        /**
        * This function returns a givens matrix
        *
        * @param {number} n The size of the matrix.
        * @param {number} i The first row/column.
        * @param {number} k The second row/column.
        * @param {number} phi The angle (in radians).
        * @return {Matrix}
        */
        static givensMatrix: (n: any, i: any, k: any, phi: any) => Matrix;
        /**
        * Returns the identity matrix.
        *
        * @param {number} n The number of rows and columns.
        * @return {Matrix}
        */
        static identity: (n: number) => Matrix;
        /**
        * Returns a matrix consisting completely of a given number
        *
        * @param {number} n The number.
        * @param {number} r The number of rows.
        * @param {number} c The number of columns.
        * @return {Matrix}
        */
        static numbers: (n: any, r: number, c: number) => Matrix;
        /**
        * Returns a matrix consisting completely of ones.
        *
        * @param {number} r The number of rows.
        * @param {number} c The number of columns.
        * @return {Matrix}
        */
        static one: (r?: number, c?: number) => Matrix;
        /**
        * Returns a matrix consisting completely of random numbers between 0 and 1
        *
        * @param {number} r The number of rows.
        * @param {number} c The number of columns.
        * @return {Matrix}
        */
        static random: (r: number, c: number) => Matrix;
        /**
        * Returns a matrix consisting completely of zeros.
        *
        * @param {number} r The number of rows.
        * @param {number} c The number of columns.
        * @return {Matrix}
        */
        static zero: (r?: number, c?: number) => Matrix;
        /**
        * Calculates the LU decomposition of a matrix
        * The result is cached.
        *
        * @return {Matrix}
        */
        public LU(): any;
        /**
        * Calculates the adjoint matrix
        *
        * @return {Matrix}
        */
        public adjoint(): Matrix;
        /**
        * Calculates the adjugate matrix
        *
        * @return {Matrix}
        */
        public adjugate(): Matrix;
        /**
        * The cholesky decomposition of a matrix
        * using the Cholesky–Banachiewicz algorithm.
        * Does not change the current matrix, but returns a new one.
        * The result is cached.
        *
        * @return {Matrix}
        */
        public cholesky(): Matrix;
        /**
        * Compares the matrix to an other matrix.
        *
        * @param {Matrix} m The matrix to compare.
        * @return {number}
        */
        public compare(m: Matrix): number;
        /**
        * Copies the matrix
        *
        * @return {Matrix}
        */
        public copy(): Matrix;
        /**
        * Calculates the determinant of the matrix via the LU decomposition.
        * The result is cached.
        *
        * @return {number|Complex}
        */
        public determinant(): any;
        /**
        * Returns the entries on the diagonal in an array
        *
        * @return {array}
        */
        public diag(): any[];
        /**
        * Multiplies the matrix by the inverse of a number or a matrix
        *
        * @return {Matrix|number} n The number or Matrix to be inverted and multiplied
        */
        public divide(n: any): Matrix;
        /**
        * Evaluates the entries of the matrix
        *
        * @return {Matrix}
        */
        public evaluate(): Matrix;
        /**
        * This function works like the Array.prototype.every function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        * @return {boolean}
        */
        public every(f: any): boolean;
        /**
        * This function works like the Array.prototype.forEach function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        */
        public forEach(f: any): void;
        /**
        * Returns the Gershgorin circles of the matrix.
        *
        * @return {array} Returns an array of circles
        */
        public gershgorin(): any[];
        /**
        * QR decomposition with the givens method.
        *
        * @return {[Matrix, Matrix]}
        */
        public givens(): Matrix[];
        /**
        * Calculates the inverse matrix.
        *
        * @return {Matrix}
        */
        public inverse(): any;
        /**
        * Determines if the matrix is a band matrix.
        *
        * @param {number} l The wished lower bandwidth
        * @param {number} u The wished upper bandwidth
        * @return {boolean}
        */
        public isBandMatrix(l: number, u: number): boolean;
        /**
        * Determines if the matrix is a diagonal matrix.
        *
        * @return {boolean}
        */
        public isDiag(): boolean;
        /**
        * Determines if the matrix is equal to an other matrix.
        *
        * @param {Matrix} matrix The matrix to compare with
        * @return {boolean}
        */
        public isEqual(matrix: any): boolean;
        /**
        * Determines if the matrix is a identity matrix.
        *
        * @return {boolean}
        */
        public isIdentity(): boolean;
        /**
        * Determines if the matrix is invertible.
        *
        * @return {boolean}
        */
        public isInvertible(): boolean;
        /**
        * Determines if the matrix is a lower triangular matrix.
        *
        * @return {boolean}
        */
        public isLower(): boolean;
        /**
        * Determines if the matrix is negative definite
        *
        * @return {boolean}
        */
        public isNegDefinite(): boolean;
        /**
        * Determines if the matrix is a orthogonal.
        *
        * @return {boolean}
        */
        public isOrthogonal(): boolean;
        /**
        * Determines if the matrix is a permutation matrix
        *
        * @return {boolean}
        */
        public isPermutation(): boolean;
        /**
        * Determines if the matrix is positive definite
        *
        * @return {boolean}
        */
        public isPosDefinite(): boolean;
        /**
        * Determines if the matrix has only real entries
        *
        * @return {boolean}
        */
        public isReal(): boolean;
        /**
        * Determines if the matrix is a scalar matrix
        * (that is a multiple of the identity matrix)
        *
        * @return {boolean}
        */
        public isScalar(): boolean;
        /**
        * Determines if the matrix is a square matrix
        *
        * @return {boolean}
        */
        public isSquare(): boolean;
        /**
        * Determines if the matrix is symmetric
        *
        * @return {boolean}
        */
        public isSymmetric(): boolean;
        /**
        * Determines if the matrix is a upper triangular matrix
        *
        * @return {boolean}
        */
        public isUpper(): boolean;
        /**
        * Determines if the matrix is a vector
        * (only one row or one column)
        *
        * @return {boolean}
        */
        public isVector(): boolean;
        /**
        * Determines if the matrix the zero matrix
        * The result is cached.
        *
        * @return {boolean}
        */
        public isZero(): boolean;
        /**
        * This function works like the Array.prototype.map function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        * @return {Matrix}
        */
        public map(f: any): Matrix;
        /**
        * Calculates a minor
        *
        * @param {number} r The row to be removed.
        * @param {number} c The column to be removed.
        * @return {Matrix}
        */
        public minor(r: number, c: number): any;
        /**
        * Calculates the difference of two matrices
        *
        * @param {Matrix} subtrahend The matrix to be subtracted.
        * @return {Matrix}
        */
        public minus(subtrahend: any): Matrix;
        /**
        * Returns the negative matrix
        *
        * @return {Matrix}
        */
        public negative(): Matrix;
        /**
        * This function adds a matrix to the current matrix
        * and returns the result as a new matrix.
        *
        * @param {Matrix} summand The matrix to be added.
        * @return {Matrix}
        */
        public plus(summand: any): Matrix;
        /**
        * Determines the rank of the matrix
        *
        * @return {number}
        */
        public rank(): number;
        /**
        * This function works like the Array.prototype.reduce function.
        *
        * @return {any}
        */
        public reduce(...args: any[]): any;
        /**
        * This function removes the specified rows and/or columns for the matrix.
        *
        * @param {number|array} row The row(s) to be removed.
        * @param {number|array} col The column(s) to be removed.
        * @return {Matrix}
        */
        public remove(row: any, col: any): Matrix;
        /**
        * Calculate the reduced row echelon form (rref) of a matrix.
        *
        * @return {Matrix}
        */
        public rref(): Matrix;
        /**
        * This function works like the Array.prototype.slice function.
        *
        * @return {array}
        */
        public slice(...args: any[]): any;
        /**
        * Solves the system of linear equations Ax = b
        * given by the matrix A and a vector or point b.
        *
        * @param {Vector} b The b in Ax = b
        * @return {Vector}
        */
        public solve(b: any): any;
        /**
        * This function works like the Array.prototype.some function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        * @return {boolean}
        */
        public some(f: any): boolean;
        /**
        * Multiplies the current matrix with a number, a matrix, a point or a vector.
        *
        * @param {number|Matrix|Point|Rational|Vector} a The object to multiply to the current matrix
        * @return {Matrix|Point|Vector}
        */
        public times(a: any): any;
        /**
        * Converts the matrix to a two-dimensional array
        *
        * @return {array}
        */
        public toArray(): any;
        /**
        * Converts the columns of the matrix to vectors
        *
        * @return {array}
        */
        public toColVectors(): string;
        /**
        * converting the matrix to content MathML
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toContentMathML(options?: toContentMathMLOptions): string;
        /**
        * Converting the matrix to LaTeX
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toLaTeX(options?: toPresentationOptions): string;
        /**
        * converting the matrix to (presentation) MathML
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toMathML(options?: toPresentationOptions): string;
        /**
        * Converts the rows of the matrix to vectors
        *
        * @return {array}
        */
        public toRowVectors(): string;
        /**
        * Creating a custom .toString() function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toString(options?: toPresentationOptions): string;
        /**
        * Calculating the trace of the matrix
        *
        * @return {number|Complex}
        */
        public trace(): any;
        /**
        * Calculating the transpose of the matrix
        * The result is cached.
        *
        * @return {Matrix}
        */
        public transpose(): Matrix;
    }


    /**
    * The permutation class for MathLib
    *
    * @class
    * @this {Permutation}
    */
    class Permutation {
        public type: string;
        public length: number;
        public cycle: any[];
        constructor(p: any);
        /**
        * Converts a cycle representation to a list representation
        *
        * @param {array} cycle The cycle to be converted
        * @return {array}
        */
        static cycleToList(cycle: any): number[];
        /**
        * The id permutation
        *
        * @return {Permutation}
        */
        static id: Permutation;
        /**
        * Converts a list representation to a cycle representation
        *
        * @param {array} list The list to be converted
        * @return {array}
        */
        static listToCycle(list: number[]): any;
        /**
        * Applies the permutation to a number or a array/matrix/point/vector
        *
        * @param {number|array|Matrix|Point|Vector} n The object to apply the permutation to
        * @return {number|array|Matrix|Point|Vector}
        */
        public applyTo(n: any): any;
        /**
        * Compares two permutations.
        *
        * @param {Permutation} p The permutation to compare
        * @return {number}
        */
        public compare(p: Permutation): number;
        /**
        * Calculates the inverse of the permutation
        *
        * @return {Permutation}
        */
        public inverse(): Permutation;
        /**
        * Works like Array.prototype.map.
        *
        * @return {Permutation}
        */
        public map(...args: any[]): Permutation;
        /**
        * Calculates the signum of the permutation
        *
        * @return {number}
        */
        public sgn(): number;
        /**
        * Multiplies two permutations
        *
        * @param {Permutation} p The permutation to multiply
        * @return {Permutation}
        */
        public times(p: Permutation): Permutation;
        /**
        * Converts the permuatation to a matrix.
        *
        * @param {number} n The size of the matrix
        * @return {Matrix}
        */
        public toMatrix(n: number): Matrix;
        /**
        * String representation of the permutation.
        *
        * @return {string}
        */
        public toString(): string;
    }


    /**
    * The conic implementation of MathLib makes calculations with conics possible.
    *
    * @class Conic
    * @this {Conic}
    */
    class Conic implements Drawable {
        public type: string;
        public primal: Matrix;
        public dual: Matrix;
        constructor(primal: Matrix, dual?: Matrix);
        /**
        * Calculates the conic through five points.
        *
        * @param {Point} p The first point
        * @param {Point} q The second point
        * @param {Point} r The third point
        * @param {Point} s The fourth point
        * @param {Point} t The fifth point
        * @return {Conic}
        */
        static throughFivePoints(p: Point, q: Point, r: Point, s: Point, t: Point): Conic;
        /**
        * Draws the conic on one or more screens
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {object} options Drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Conic} Returns the conic for chaining
        */
        public draw(screen: any, options?: pathDrawingOptions, redraw?: boolean): Conic;
        /**
        * Calculates the eccentricity of a conic.
        *
        * @return {number}
        */
        public eccentricity(): number;
        /**
        * Determines if a conic is degenerated.
        *
        * @return {boolean}
        */
        public isDegenerated(): boolean;
        /**
        * Determines if two conics are equal.
        *
        * @param {Conic} conic The conic to be compared
        * @return {boolean}
        */
        public isEqual(conic: Conic): boolean;
        /**
        * Calculates the latusRectum of a conic.
        *
        * @return {number}
        */
        public latusRectum(): number;
        /**
        * Calculates the linear eccentricity of a conic.
        *
        * @return {number}
        */
        public linearEccentricity(): number;
        /**
        * Calculates the meet of the conic with a line or a conic.
        *
        * @param {Line|Conic} x The line or conic to intersect with
        * @return {Point[]}
        */
        public meet(x: any): any;
        /**
        * Calculates the normal form of a conic.
        *
        * @return {Conic}
        */
        public normalize(): Conic;
        /**
        * Calculates the four polarity of a conic.
        *
        * @return {Point[]}
        */
        public polarity(x: any): any;
        /**
        * Splits a conic into one or two lines if the conic is degenerated.
        *
        * @return {boolean}
        */
        public splitDegenerated(): Line[];
    }


    /**
    * The point implementation of MathLib makes calculations with point in
    * arbitrary dimensions possible.
    *
    * MathLib uses the homogeneous form of a point for calculations and storage.
    *
    * To create the point (4, 2) on the two dimensional plane use
    * `new MathLib.Point([4, 2, 1])`
    * Alternatively you can use
    * `new MathLib.Point(4, 2)`
    * The 1 will be added for you.
    *
    * @class
    * @augments Vector
    * @this {Point}
    */
    class Point extends Vector implements Drawable, Printable {
        public type: string;
        public dimension: number;
        constructor(coords: any[]);
        /**
        * The Point I = (-i, 0, 1).
        * This is NOT the complex number i.
        *
        * @static
        */
        static I: Point;
        /**
        * The Point J = (i, 0, 1).
        *
        * @static
        */
        static J: Point;
        /**
        * Calculates the distance crossratio (A,B,C,D) of four points
        * as seen from the current point.
        *
        * @param {Point} a The point A
        * @param {Point} b The point B
        * @param {Point} c The point C
        * @param {Point} d The point D
        * @return {number}
        */
        public crossRatio(a: Point, b: Point, c: Point, d: Point): number;
        /**
        * Calculates the distance to an other point.
        * If no other point is provided, it calculates the distance to the origin.
        *
        * @param {Point} p The point to calculate the distance to
        * @return {number}
        */
        public distanceTo(p: Point): number;
        /**
        * Draws the point on a canvas or svg element.
        *
        * @param {Screen} screen The screen to draw onto
        * @param {object} options Drawing options
        * @return {Point} Returns the point for chaining
        */
        public draw(screen: any, options?: drawingOptions): Point;
        /**
        * Determines if the point has the same coordinates as an other point
        *
        * @param {Point} q The point to compare
        * @return {boolean}
        */
        public isEqual(q: Point): boolean;
        /**
        * Determines if the point is finite
        *
        * @return {boolean}
        */
        public isFinite(): boolean;
        /**
        * Calculates a line connecting two points
        *
        * @param {Point} q The point to calculate the line to
        * @return {Line}
        */
        public join(q: Point): Line;
        /**
        * Normalizes the point.
        *
        * @return {Point}
        */
        public normalize(): Point;
        /**
        * Reflects the point at an other point
        *
        * @param {Point} q The point to reflect the current point at.
        * @return {Point}
        */
        public reflectAt(q: Point): Point;
        /**
        * Restricts the point to a line.
        *
        * @param {Line} l The line to restrict the point to.
        */
        public restrictTo(l: Line): void;
        /**
        * Converts a two dimensional point to the corresponding complex number.
        *
        * @return {Complex}
        */
        public toComplex(): Complex;
        /**
        * Returns LaTeX representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        public toLaTeX(opt?: boolean): string;
        /**
        * Returns (presentation) MathML representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        public toMathML(opt?: boolean): string;
        /**
        * Returns string representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        public toString(opt?: boolean): string;
    }


    /**
    * The polynomial implementation of MathLib makes calculations with polynomials.
    * Both the coefficients and the arguments of a polynomial can be numbers,
    * complex numbers and matrices.
    *
    * It is as easy as
    * ```
    * new MathLib.Polynomial([1, 2, 3])
    * ```
    * to create the polynomial 1 + 2x + 3x²
    * The polynomial x¹⁰⁰ can be created with the following statement:
    * ```
    * new MathLib.Polynomial(100)
    * ```
    *
    * @class
    * @this {Polynomial}
    */
    class Polynomial implements Drawable, Printable {
        public type: string;
        public deg: number;
        public length: number;
        public subdeg: number;
        constructor(polynomial: any);
        /**
        * Interpolates points.
        *
        * @return {Polynomial}
        */
        static interpolation(a: any, b: any): Polynomial;
        /**
        * Returns the one polynomial
        * @static
        */
        static one: Polynomial;
        /**
        * Calculates the regression line for some points
        *
        * @param {array} x The x values
        * @param {array} y The y values
        * @return {Polynomial}
        */
        static regression(x: any, y: any): Polynomial;
        /**
        * Returns a polynomial with the specified roots
        *
        * @param {array|Set} zeros The wished zeros.
        * @return {Polynomial}
        */
        static roots(zeros: any): Polynomial;
        /**
        * Returns the zero polynomial
        * @static
        */
        static zero: Polynomial;
        /**
        * Compares two polynomials.
        *
        * @param {Polynomial} p The polynomial to compare
        * @return {number}
        */
        public compare(p: Polynomial): number;
        /**
        * Differentiates the polynomial
        *
        * @param {number} n the number of times to differentiate the polynomial.
        * @return {Polynomial}
        */
        public differentiate(n?: number): Polynomial;
        /**
        * Draws the polynomial on the screen
        *
        * @param {Screen} screen The screen to draw the polynomial onto.
        * @param {object} options Optional drawing options.
        * @return {Polynomial} Returns the polynomial for chaining
        */
        public draw(screen: any, options?: pathDrawingOptions): Polynomial;
        /**
        * Works like Array.prototype.every.
        *
        * @param {function} f The function to be applied to all the values
        * @return {boolean}
        */
        public every(f: (value: any, index: number, vector: Vector) => boolean): boolean;
        /**
        * Works like the Array.prototype.forEach function
        */
        public forEach(...args: any[]): void;
        /**
        * Integrates the polynomial
        *
        * @param {number} n The number of times to integrate the polynomial.
        * @return {Polynomial}
        */
        public integrate(n?: number): Polynomial;
        /**
        * Decides if two polynomials are equal.
        *
        * @param {Polynomial} p The polynomial to compare.
        * @return {boolean}
        */
        public isEqual(p: Polynomial): boolean;
        /**
        * Works like the Array.prototype.map function
        *
        * @param {function} f The function to be applied to all the values
        * @return {Polynomial}
        */
        public map(f: any): Polynomial;
        /**
        * Returns the negative polynomial
        *
        * @return {Polynomial}
        */
        public negative(): Polynomial;
        /**
        * Adds a number or a polynomial
        *
        * @param {number|Polynomial} a The number or polynomial to add to the current polynomial
        * @return {Polynomial}
        */
        public plus(a: any): Polynomial;
        /**
        * Works like the Array.prototype.slice function
        *
        * @return {array}
        */
        public slice(...args: any[]): any[];
        /**
        * Multiplies the polynomial by a number or an other polynomial
        *
        * @param {number|Polynomial} a The multiplicator
        * @return {Polynomial}
        */
        public times(a: any): Polynomial;
        /**
        * Returns a content MathML representation of the polynomial
        *
        * @return {string}
        */
        public toContentMathML(): string;
        /**
        * Custom toExpression function
        *
        * @return {Expression}
        */
        public toExpression(): Expression;
        /**
        * Converts the polynomial to a functn
        *
        * @return {Functn}
        */
        public toFunctn(): (...args: any[]) => any;
        /**
        * Returns a LaTeX representation of the polynomial
        *
        * @return {string}
        */
        public toLaTeX(): string;
        /**
        * Returns a MathML representation of the polynomial
        *
        * @return {string}
        */
        public toMathML(): string;
        /**
        * Custom toString function
        *
        * @return {string}
        */
        public toString(): string;
        /**
        * Evaluates the polynomial at a given point
        *
        * @param {number|Complex|Matrix} x The value to evaluate the polynomial at.
        * @return {number|Complex|Matrix}
        */
        public valueAt(x: any): any;
    }


    /**
    * MathLib.Rational is the MathLib implementation of rational numbers.
    *
    * #### Simple use case:
    * ```
    * // Create the rational number 2/3
    * var r = new MathLib.Rational(2, 3);
    * ```
    *
    * @class
    * @this {Rational}
    */
    class Rational implements FieldElement, Printable {
        public type: string;
        public numerator: any;
        public denominator: any;
        constructor(numerator: any, denominator?: any);
        /**
        * The characteristic of the rational field is 0.
        *
        * @return {Integer}
        */
        static characteristic(): Integer;
        /**
        * A content MathML string representation
        *
        * @return {string}
        */
        static toContentMathML(options?: toContentMathMLOptions): string;
        /**
        * A LaTeX string representation
        *
        * @return {string}
        */
        static toLaTeX(): string;
        /**
        * A presentation MathML string representation
        *
        * @return {string}
        */
        static toMathML(): string;
        /**
        * Custom toString function
        *
        * @return {string}
        */
        static toString(): string;
        /**
        * Coerces the rational number to some other data type
        *
        * @param {string} type The type to coerce the rational number into
        * @return {Integer|Rational|number|Complex}
        */
        public coerceTo(type: string): any;
        /**
        * Compares two rational numbers
        *
        * @param {Rational} rational The number to compare
        * @return {number}
        */
        public compare(rational: Rational): number;
        /**
        * Copy the rational number
        *
        * @return {Rational}
        */
        public copy(): Rational;
        /**
        * Divides rational numbers
        *
        * @param {Rational|number} divisor The divisor
        * @return {Rational}
        */
        public divide(divisor: any): any;
        /**
        * Calculates the inverse of a rational number
        *
        * @return {Rational}
        */
        public inverse(): Rational;
        /**
        * Checks if the rational number is equal to an other number
        *
        * @param {Integer|Rational|number|Complex} n The number to compare
        * @return {boolean}
        */
        public isEqual(n: any): boolean;
        /**
        * Checks if the rational number is zero
        *
        * @return {boolean}
        */
        public isZero(): boolean;
        /**
        * Subtracts rational numbers
        *
        * @param {Rational|number} subtrahend The number to be subtracted
        * @return {Rational}
        */
        public minus(subtrahend: any): any;
        /**
        * Calculates the negative of a rational number
        *
        * @return {Rational}
        */
        public negative(): Rational;
        /**
        * Adds rational numbers
        *
        * @param {Integer|Rational|number|Complex} summand The number to be added
        * @return {Rational|number|Complex}
        */
        public plus(summand: any): any;
        /**
        * Reduces the rational number
        *
        * @return {Rational}
        */
        public reduce(): Rational;
        /**
        * Multiplies rational numbers
        *
        * @param {Rational|number} factor The number to be multiplied
        * @return {Rational}
        */
        public times(factor: any): any;
        /**
        * Returns the Content MathML representation of the rational number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toContentMathML(options?: toContentMathMLOptions): string;
        /**
        * Returns the LaTeX representation of the rational number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toLaTeX(options?: toPresentationOptions): string;
        /**
        * Returns the MathML representation of the rational number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toMathML(options?: toPresentationOptions): string;
        /**
        * Custom toString function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toString(options?: toPresentationOptions): string;
    }
declare var Rational: Field;


    /**
    * The Implementation of sets in MathLib
    *
    * To generate the set {1, 2, 3, 4, 5} you simply need to type
    * ```
    * new MathLib.Set([1, 2, 3, 4, 5])
    * ```
    * @class
    * @this {Set}
    */
    class Set implements Printable {
        public type: string;
        public length: number;
        public card: number;
        constructor(elements: any);
        /**
        * Function to create the intersect, union, without, xor methods
        *
        * @param {boolean} left Should the elements which are only in the left set be included in the result.
        * @param {boolean} both Should the elements which are in both sets be included in the result.
        * @param {boolean} right Should the elements which are only in the right set be included in the result.
        * @return {function}
        */
        static createSetOperation: (left: boolean, both: boolean, right: boolean) => (a: any) => Set;
        /**
        * Creates a set containing the numbers from a start value to a end value.
        *
        * @param {number} start The number to start from
        * @param {number} end The number to end with
        * @param {number} step The stepsize (default = 1)
        * @return {Set}
        */
        static fromTo: (start: number, end: number, step?: number) => Set;
        /**
        * Compare function for sets
        *
        * @param {Set} x The set to compare the current set to
        * @return {number}
        */
        public compare(x: Set): number;
        /**
        * Evaluates the elements of the set
        *
        * @return {Set}
        */
        public evaluate(): Set;
        /**
        * Works like the Array.prototype.every function
        *
        * @return {boolean}
        */
        public every(...args: any[]): boolean;
        /**
        * Works like the Array.prototype.filter function
        *
        * @return {Set}
        */
        public filter(...args: any[]): Set;
        /**
        * Works like the Array.prototype.forEach function
        */
        public forEach(...args: any[]): void;
        /**
        * Works like the Array.prototype.indexOf function
        *
        * @return {number}
        */
        public indexOf(...args: any[]): number;
        /**
        * Inserts an element into the set.
        *
        * @param {any} x The element to insert in the set.
        * @return {Set} Returns the current set
        */
        public insert(x: any): Set;
        /**
        * Returns the intersection of two sets.
        *
        * @param {Set} set The set to intersect the current set with.
        * @return {Set}
        */
        public intersect: (a: any) => Set;
        /**
        * Determines if the set is empty.
        *
        * @return {boolean}
        */
        public isEmpty(): boolean;
        /**
        * Determines if the set is equal to an other set.
        *
        * @param {Set} set The set to compare
        * @return {boolean}
        */
        public isEqual(set: Set): boolean;
        /**
        * Determines if the set is a subset of an other set.
        *
        * @param {Set} set The potential superset
        * @return {boolean}
        */
        public isSubsetOf(set: Set): boolean;
        /**
        * Array.prototype.indexOf() returns only the position of an element in the
        * array and not the position where one should be inserted.
        *
        * @param {Set} x The element to locate
        * @return {number}
        */
        public locate(x: any): number;
        /**
        * Works like the Array.prototype.map function
        *
        * @param {function} callback - The mapping function
        * @param {object} [thisArg] - The value to use as this when executing the callback.
        * @return {Set}
        */
        public map(callback: any, thisArg?: any): any;
        /**
        * Adds the argument to all elements in the set.
        *
        * @param {number|MathLib object} n The object to add to the elements in the set.
        * @return {Set|any}
        */
        public plus(n: any): any;
        /**
        * Returns the powerset
        *
        * @return {Set}
        */
        public powerset(): Set;
        /**
        * Works like the Array.prototype.reduce function
        *
        * @return {any}
        */
        public reduce(...args: any[]): any;
        /**
        * Removes a element from a set
        *
        * @param {any} element The element to remove from the set.
        * @return {Set}
        */
        public remove(element: any): Set;
        /**
        * Works like the Array.prototype.slice function
        *
        * @return {array}
        */
        public slice(...args: any[]): any;
        /**
        * Works like the Array.prototype.some function
        *
        * @return {boolean}
        */
        public some(...args: any[]): boolean;
        /**
        * Works like the Array.prototype.splice function
        *
        * @return {Set}
        */
        public splice(...args: any[]): any;
        /**
        * Multiplies all elements by an argument.
        *
        * @param {number|MathLib object} n The object to multiply the elements with
        * @return {Set}
        */
        public times(n: any): any;
        /**
        * Converts the set to an array
        *
        * @return {array}
        */
        public toArray(): any[];
        /**
        * Returns the content MathML representation of the set
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toContentMathML(options?: toContentMathMLOptions): string;
        /**
        * Returns the LaTeX representation of the set
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toLaTeX(options?: toPresentationOptions): string;
        /**
        * Returns the (presentation) MathML representation of the set
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toMathML(options?: toPresentationOptions): string;
        /**
        * Returns a string representation of the set
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        public toString(options?: toPresentationOptions): string;
        /**
        * Adds up all the elements in the set.
        *
        * @param {number|MathLib object} n The object to add to the elements in the set.
        * @return {Set|any}
        */
        public total(): any;
        /**
        * Returns the union of two sets.
        *
        * @param {Set} set The set to join the current set with.
        * @return {Set}
        */
        public union: (a: any) => Set;
        /**
        * Returns all elements, which are in the first set, but not in the second.
        *
        * @param {Set} set The set whose elements should be removed from the current set.
        * @return {Set}
        */
        public without: (a: any) => Set;
        /**
        * Returns all elements which are in either the first or the second set.
        *
        * @param {Set} set The second set.
        * @return {Set}
        */
        public xor: (a: any) => Set;
    }
}
