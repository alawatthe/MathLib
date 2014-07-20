
/* jshint esnext:true */


import {sign} from 'Functn';
import {Matrix} from 'Matrix';


/**
* The permutation class for MathLib
*
* @class
* @this {Permutation}
*/
var Permutation = (function () {
    function Permutation(p) {
        var _this = this;
        this.type = 'permutation';
        var cycle, permutation;

        if (Array.isArray(p[0])) {
            cycle = p;
            permutation = Permutation.cycleToList(cycle);
        } else {
            permutation = p;
            cycle = Permutation.listToCycle(permutation);
        }

        permutation.forEach(function (x, i) {
            _this[i] = x;
        });
        this.length = permutation.length;
        this.cycle = cycle;
    }
    /**
    * Converts a cycle representation to a list representation
    *
    * @param {array} cycle The cycle to be converted
    * @return {array}
    */
    Permutation.cycleToList = function (cycle) {
        var index, list = [], cur, i, ii, j, jj, max;

        max = cycle.map(function (b) {
            return Math.max.apply(null, b);
        });
        max = Math.max.apply(null, max);

        for (i = 0, ii = max; i <= ii; i++) {
            cur = i;
            for (j = 0, jj = cycle.length; j < jj; j++) {
                index = cycle[j].indexOf(cur);
                if (++index) {
                    cur = cycle[j][index % cycle[j].length];
                }
            }
            list.push(cur);
        }
        return list;
    };

    /**
    * Converts a list representation to a cycle representation
    *
    * @param {array} list The list to be converted
    * @return {array}
    */
    Permutation.listToCycle = function (list) {
        var finished = [], cur, i, ii, cycle, cycles = [];

        for (i = 0, ii = list.length; i < ii; i++) {
            cur = i;
            cycle = [];
            while (!finished[cur]) {
                finished[cur] = true;
                cycle.push(cur);
                cur = list[cur];
            }
            if (cycle.length) {
                cycles.push(cycle);
            }
        }
        return cycles;
    };

    /**
    * Applies the permutation to a number or a array/matrix/point/vector
    *
    * @param {number|array|Matrix|Point|Vector} n The object to apply the permutation to
    * @return {number|array|Matrix|Point|Vector}
    */
    Permutation.prototype.applyTo = function (n) {
        var p, permutatedObj;
        if (typeof n === 'number') {
            if (n >= this.length) {
                return n;
            }
            return this[n];
        } else {
            p = this;
            permutatedObj = n.map(function (x, i) {
                return n[p.applyTo(i)];
            });

            return (n.type === undefined ? permutatedObj : new n.constructor(permutatedObj));
        }
    };

    /**
    * Compares two permutations.
    *
    * @param {Permutation} p The permutation to compare
    * @return {number}
    */
    Permutation.prototype.compare = function (p) {
        var i, ii;

        if (this.length !== p.length) {
            return sign(this.length - p.length);
        }

        for (i = 0, ii = this.length; i < ii; i++) {
            if (p[i] - this[i]) {
                return sign(this[i] - p[i]);
            }
        }

        return 0;
    };

    /**
    * Calculates the inverse of the permutation
    *
    * @return {Permutation}
    */
    Permutation.prototype.inverse = function () {
        var cycle = this.cycle.slice(0);
        cycle.reverse().forEach(function (e) {
            e.reverse();
        });
        return new Permutation(cycle);
    };

    /**
    * Works like Array.prototype.map.
    *
    * @return {Permutation}
    */
    Permutation.prototype.map = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        return new Permutation(Array.prototype.map.apply(this, args));
    };

    /**
    * Calculates the signum of the permutation
    *
    * @return {number}
    */
    Permutation.prototype.sgn = function () {
        var i, ii, count = 0;

        for (i = 0, ii = this.cycle.length; i < ii; i++) {
            count += this.cycle[i].length;
        }
        count += this.cycle.length;
        return -2 * (count % 2) + 1;
    };

    /**
    * Multiplies two permutations
    *
    * @param {Permutation} p The permutation to multiply
    * @return {Permutation}
    */
    Permutation.prototype.times = function (p) {
        var a = this;
        return p.map(function (x) {
            return a[x];
        });
    };

    /**
    * Converts the permuatation to a matrix.
    *
    * @param {number} n The size of the matrix
    * @return {Matrix}
    */
    Permutation.prototype.toMatrix = function (n) {
        var row = [], matrix = [], index, i, ii;
        n = n || this.length;

        for (i = 0, ii = n - 1; i < ii; i++) {
            row.push(0);
        }
        row = row.concat([1]).concat(row);
        for (i = 0, ii = n; i < ii; i++) {
            index = n - this.applyTo(i) - 1;
            matrix.push(row.slice(index, index + n));
        }
        return new Matrix(matrix);
    };

    /**
    * String representation of the permutation.
    *
    * @return {string}
    */
    Permutation.prototype.toString = function () {
        var str = '';
        this.cycle.forEach(function (elem) {
            str += '(' + elem.toString() + ')';
        });
        return str;
    };
    Permutation.id = new Permutation([[]]);
    return Permutation;
})();
export default Permutation;

