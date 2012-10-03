// Returns the argument (= the angle) of the complex number
MathLib.extendPrototype('complex', 'arg', function () {
    return Math.atan2(this.im, this.re);
});