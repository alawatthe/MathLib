// The MathLib module which wraps everything
module MathLib {


  // Typescript is throwing the following error otherwise:
  // The property 'methodname' does not exist on value of type 'MathLib'
  // see http://typescript.codeplex.com/discussions/397908
  declare var MathLib : any;
  declare var MathJax : any;
  declare var THREE : any;


  MathLib.version = '0.3.5';
  MathLib.apery = 1.2020569031595942;
  MathLib.e = Math.E;
  // Number.EPSILON is probably coming in ES6
  // (see section 15.7.3.7 in the current draft)
  MathLib.epsilon = Number.EPSILON || (function () {
      var next, result;
      for (next = 1; 1 + next !== 1; next = next / 2) {
        result = next;
      }
      return result;
    }());
  MathLib.eulerMascheroni = 0.5772156649015329;
  MathLib.goldenRatio = 1.618033988749895;
  MathLib.pi = Math.PI;
  MathLib.isArrayLike = function (x) {
    return typeof x === 'object' && 'length' in x;
  };

  var prototypes = {
        array: Object.getPrototypeOf([]),
        func: Object.getPrototypeOf(function (){}),
        object: Object.getPrototypeOf({}),
        functn: function(){}
      },
      proto = '__proto__',
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
      },
      extendObject = function(dest, src) {
        for (var prop in src) {
          if (typeof dest[prop] === 'object' && typeof src[prop] === 'object') {
            dest[prop] = extendObject(dest[prop], src[prop]);
          }
          else {
            dest[prop] = src[prop];
          }
        }
        return dest;
      },

      // A little function converting arrays to THREE.js vectors
      to3js = function (x) {
        if (x.length === 2) {
          return new THREE.Vector2(x[0], x[1]);
        }
        else if (x.length === 3) {
          return new THREE.Vector3(x[0], x[1], x[2]);
        }
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
