// ## The wrapping function
(function (document) {

  var name = 'MathLib',
      global = this,
      oldMathLib = global.MathLib,
      oldN = global[name],
      MathLib,
      proto = '__proto__',
      prototypes,
      flatten = function (a) {
        var res = [];
        a.forEach(function (x) {
          if (Array.isArray(x)) {
            res = res.concat(flatten(x));
          }
          else {
            res.push(x);
          }
        });
        return res;
      };



  MathLib = {
    version:          '0.3.1',
    apery:            1.2020569031595942,
    e:                Math.E,
    // Number.EPSILON is probably coming in ES6
    // (see section 15.7.3.7 in the current draft)
    epsilon: Number.EPSILON || (function () {
        var next, result;
        for (next = 1; 1 + next !== 1; next = next / 2) {
          result = next;
        }
        return result;
      }()),
    eulerMascheroni:  0.5772156649015329,
    goldenRatio:      1.618033988749895,
    pi:               Math.PI
  };

  prototypes = {
    array: Object.getPrototypeOf([]),
    func: Object.getPrototypeOf(function (){}),
    object: Object.getPrototypeOf({})
  };

  MathLib.prototypes = prototypes;

// ### MathLib.extend
// Extends a MathLib object with custom properties or methods
//
// *@param {string}* obj The name of the object be extended  
// *@param {string}* name The name of the new property of function  
// *@param {function|...}* prop The new function or property  
// *@param {object}* [options]  
// TODO: allow get & set
  MathLib.extend = function (obj, name, prop, options) {
    options = options || {enumerable: true};
    var o = MathLib[obj] || MathLib;

    Object.defineProperty(o, name, {
      value: prop,
      writable: options.writable,
      enumerable: options.enumerable,
      configurable: options.configurable
    });
  };


// ### MathLib.extendPrototype
// Extends the prototype of a MathLib object with custom properties or methods
//
// *@param {string}* obj The name of the object be extended  
// *@param {string}* name The name of the new property of function  
// *@param {function|...}* prop The new function or property  
// *@param {object}* [options]  
// TODO: allow get & set
  MathLib.extendPrototype = function (obj, name, prop, options) {
    options = options || {enumerable: true};

    Object.defineProperty(prototypes[obj], name, {
      value: prop,
      writable: options.writable,
      enumerable: options.enumerable,
      configurable: options.configurable
    });

  };
