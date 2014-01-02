
    // ## <a id="Set"></a>Set
    //
    // To generate the set {1, 2, 3, 4, 5} you simply need to type
    // ```
    // new MathLib.Set([1, 2, 3, 4, 5])
    // ```
    define(['meta'], function(MathLib) {
    var Set = (function () {
        function Set(elements) {
            var _this = this;
            this.type = 'set';
            // ### Set.prototype.intersect()
            // Returns the intersection of two sets.
            //
            // *@param {Set}*
            // *@return {Set}*
            this.intersect = Set.createSetOperation(false, true, false);
            // ### Set.prototype.union()
            // Returns the union of two sets.
            //
            // *@param {Set}*
            // *@return {Set}*
            this.union = Set.createSetOperation(true, true, true);
            // ### Set.prototype.without()
            // Returns all elements, which are in the first set, but not in the second.
            //
            // *@param {Set}*
            // *@return {Set}*
            this.without = Set.createSetOperation(true, false, false);
            // ### Set.prototype.xor()
            // Returns all elements which are in either the first or the second set.
            //
            // *@param {Set}*
            // *@return {Set}*
            this.xor = Set.createSetOperation(true, false, true);
            if (!elements) {
                elements = [];
            }

            elements = elements.sort(MathLib.compare).filter(function (x, i, a) {
                return (a.length === i + 1) || !MathLib.isEqual(x, a[i + 1]) || (typeof x.isEqual !== 'undefined' && !x.isEqual(a[i + 1]));
            });

            elements.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = elements.length;
            this.card = elements.length;
        }
        // ### Set.prototype.compare()
        // Compare function for sets
        //
        // *@return {number}*
        Set.prototype.compare = function (x) {
            var a, i, ii;

            if (this.card !== x.card) {
                return MathLib.sign(this.card - x.card);
            } else {
                for (i = 0, ii = this.card; i < ii; i++) {
                    a = MathLib.compare(this[i], x[i]);
                    if (a !== 0) {
                        return a;
                    }
                }
                return 0;
            }
        };

        // ### Set.prototype.every()
        // Works like the Array.prototype.every function
        //
        // *@return {boolean}*
        Set.prototype.every = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.every.apply(this, args);
        };

        // ### Set.prototype.filter()
        // Works like the Array.prototype.filter function
        //
        // *@return {Set}*
        Set.prototype.filter = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return new MathLib.Set(Array.prototype.filter.apply(this, args));
        };

        // ### Set.prototype.forEach()
        // Works like the Array.prototype.forEach function
        //
        //
        Set.prototype.forEach = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            Array.prototype.forEach.apply(this, args);
        };

        // ### Set.prototype.indexOf()
        // Works like the Array.prototype.indexOf function
        //
        // *@return {number}*
        Set.prototype.indexOf = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.indexOf.apply(this, args);
        };

        // ### Set.prototype.insert()
        // Inserts an element into the set.
        //
        // *@return {Set}* Returns the current set
        Set.prototype.insert = function (x) {
            var i = this.locate(x);
            if (this[i] !== x) {
                this.splice(i, 0, x);
                this.card++;
            }
            return this;
        };

        // ### Set.prototype.isEmpty()
        // Determines if the set is empty.
        //
        // *@return {boolean}*
        Set.prototype.isEmpty = function () {
            return this.card === 0;
        };

        // ### Set.prototype.isEqual()
        // Determines if the set is equal to an other set.
        //
        // *@param {Set}* The set to compare
        // *@return {boolean}*
        Set.prototype.isEqual = function (x) {
            if (this.card !== x.card) {
                return false;
            } else {
                return this.every(function (y, i) {
                    return MathLib.isEqual(y, x[i]);
                });
            }
        };

        // ### Set.prototype.isSubsetOf()
        // Determines if the set is a subset of an other set.
        //
        // *@param {Set}* The potential superset
        // *@return {boolean}*
        Set.prototype.isSubsetOf = function (a) {
            return this.every(function (x) {
                return a.indexOf(x) !== -1;
            });
        };

        // ### Set.prototype.locate()
        // Array.prototype.indexOf() returns only the position of an element in the
        // array and not the position where one should be inserted.
        //
        // *@param {Set}* The element to locate
        // *@return {number}*
        Set.prototype.locate = function (x) {
            var left = 0, right = this.card - 1, middle, i = this.indexOf(x);

            if (i !== -1) {
                return i;
            }

            while (left <= right) {
                middle = left + Math.floor((right - left) / 2);
                if (this[middle] < x) {
                    left = middle + 1;
                } else if (this[middle] > x) {
                    right = middle - 1;
                } else {
                    return middle;
                }
            }
            return left;
        };

        // ### Set.prototype.map()
        // Works like the Array.prototype.map function
        //
        // *@param {function}* The mapping function
        // *@return {Set}*
        Set.prototype.map = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return new MathLib.Set(Array.prototype.map.apply(this, args));
        };

        // ### Set.prototype.plus()
        // Adds the argument to all elements in the set,
        // or if no argument is provided adds up all the elements in the set.
        //
        // *@param {number|MathLib object}*
        // *@return {Set|any}*
        Set.prototype.plus = function (n) {
            var sum = [];
            if (!arguments.length) {
                return MathLib.plus.apply(null, this.toArray());
            } else if (n.type === 'set') {
                this.forEach(function (x) {
                    n.forEach(function (y) {
                        sum.push(MathLib.plus(x, y));
                    });
                });

                return new MathLib.Set(sum);
            } else {
                return this.map(function (x) {
                    return MathLib.plus(x, n);
                });
            }
        };

        // ### Set.prototype.powerset()
        // Returns the powerset
        //
        // *@return {Set}*
        Set.prototype.powerset = function () {
            var flag, subset, i, ii, j, jj, powerset = [];

            for (i = 0, ii = Math.pow(2, this.card); i < ii; i++) {
                flag = i.toString(2).split('').reverse();
                subset = [];
                for (j = 0, jj = this.card; j < jj; j++) {
                    if (flag[j] === '1') {
                        subset.push(this[j]);
                    }
                }
                powerset.push(new MathLib.Set(subset));
            }

            return new MathLib.Set(powerset);
        };

        // ### Set.prototype.reduce()
        // Works like the Array.prototype.reduce function
        //
        // *@return {any}*
        Set.prototype.reduce = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.reduce.apply(this, arguments);
        };

        // ### Set.prototype.remove()
        // Removes a element from a set
        //
        // *@return {Set}*
        Set.prototype.remove = function (a) {
            var i = this.indexOf(a);
            if (i !== -1) {
                this.splice(i, 1);
                this.card--;
            }
            return this;
        };

        // ### Set.prototype.slice()
        // Works like the Array.prototype.slice function
        //
        // *@return {array}*
        Set.prototype.slice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.slice.apply(this, args);
        };

        // ### Set.prototype.some()
        // Works like the Array.prototype.some function
        //
        // *@return {boolean}*
        Set.prototype.some = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.some.apply(this, args);
        };

        // ### Set.prototype.splice()
        // Works like the Array.prototype.splice function
        //
        // *@return {Set}*
        Set.prototype.splice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.splice.apply(this, args);
        };

        // ### Set.prototype.times()
        // Multiplies all elements in the set if no argument is passed.
        // Multiplies all elements by a argument if one is passed.
        //
        // *@param {number|MathLib object}*
        // *@return {Set}*
        Set.prototype.times = function (n) {
            if (!arguments.length) {
                return MathLib.times.apply(null, this.toArray());
            } else {
                return this.map(function (x) {
                    return MathLib.times(x, n);
                });
            }
        };

        // ### Set.prototype.toArray()
        // Converts the set to an array
        //
        // *@return {array}*
        Set.prototype.toArray = function () {
            return Array.prototype.slice.call(this);
        };

        // ### Set.prototype.toContentMathML()
        // Returns the content MathML representation of the set
        //
        // *@return {string}*
        Set.prototype.toContentMathML = function () {
            if (this.isEmpty()) {
                return '<emptyset/>';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toContentMathML(cur);
                }, '<set>') + '</set>';
            }
        };

        // ### Set.prototype.toLaTeX()
        // Returns the LaTeX representation of the set
        //
        // *@return {string}*
        Set.prototype.toLaTeX = function () {
            if (this.isEmpty()) {
                return '\\emptyset';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toLaTeX(cur) + ', ';
                }, '\\{').slice(0, -2) + '\\}';
            }
        };

        // ### Set.prototype.toMathML()
        // Returns the (presentation) MathML representation of the set
        //
        // *@return {string}*
        Set.prototype.toMathML = function () {
            if (this.isEmpty()) {
                return '<mi>&#x2205;</mi>';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toMathML(cur) + '<mo>,</mo>';
                }, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
            }
        };

        // ### Set.prototype.toString()
        // Returns a string representation of the set
        //
        // *@return {string}*
        Set.prototype.toString = function () {
            if (this.isEmpty()) {
                return '∅';
            }
            return '{' + Array.prototype.join.call(this, ', ') + '}';
        };
        Set.fromTo = function (f, t, s) {
            if (typeof s === "undefined") { s = 1; }
            var i, set = [];
            if (f <= t) {
                for (i = f; i <= t; i += s) {
                    set.push(i);
                }
                return new MathLib.Set(set);
            }
        };

        Set.createSetOperation = function (left, both, right) {
            return function (a) {
                var set = [], i = 0, j = 0, tl = this.card, al = a.card;

                while (i < tl && j < al) {
                    if (MathLib.compare(this[i], a[j]) < 0) {
                        if (left) {
                            set.push(this[i]);
                        }
                        i++;
                        continue;
                    }
                    if (MathLib.compare(this[i], a[j]) > 0) {
                        if (right) {
                            set.push(a[j]);
                        }
                        j++;
                        continue;
                    }
                    if (MathLib.isEqual(this[i], a[j])) {
                        if (both) {
                            set.push(this[i]);
                        }
                        i++;
                        j++;
                        continue;
                    }
                }
                if (left && j === al) {
                    set = set.concat(this.slice(i));
                } else if (right && i === tl) {
                    set = set.concat(a.slice(j));
                }
                return new MathLib.Set(set);
            };
        };
        return Set;
    })();
    MathLib.Set = Set;
return MathLib;
});
