// ## <a id="Set"></a>Set
//
// To generate the set {1, 2, 3, 4, 5} you simply need to type
// ```
// new MathLib.Set([1, 2, 3, 4, 5])
// ```

/// no import
export class Set {

	type = 'set';

	length: number;
	card: number;

	constructor (elements) {
		if (!elements) {
			elements = [];
		}
		
		elements = elements.sort(MathLib.compare)
			.filter(function (x, i, a) {
		 		return (a.length === i + 1) ||  !MathLib.isEqual(x, a[i + 1]) || (typeof x.isEqual !== 'undefined' && !x.isEqual(a[i + 1]));
			 });

		elements.forEach((x, i) => {this[i] = x;});
		this.length = elements.length;
		this.card = elements.length;
	}