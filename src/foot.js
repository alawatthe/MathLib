  // ## Epilog

  // Add MathLib to the global namespace
  global.MathLib = MathLib;

  // ### MathLib.noConflict
  // Restores the original value of MathLib in the global namespace
  //
  // *@returns {object}* Returns a reference to this Mathlib library
  MathLib.noConflict = function () {
    global.MathLib = oldMathLib;
    return MathLib;
  };

}(document));
