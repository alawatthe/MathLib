var errors = [],
		warnings = [];

/**
 * ### [MathLib.on()](http://mathlib.de/en/docs/on)
 * Binds an event handler to an event.
 * 
 * @param {string} type - The name of the event.  
 * @param {function} callback - The callback function.
 */
export var on = function (type : string, callback) {
	if (type === 'error') {
		console.warn('MathLib.on("error", fn) is deprecated');
		errors.push(callback);
	}
	else if (type === 'warning') {
		warnings.push(callback);
	}
};


/**
 * ### [MathLib.off()](http://mathlib.de/en/docs/off)
 * Unbinds an event handler from an event.
 *
 * @param {string} type - The name of the event.  
 * @param {function} callback - The callback function.
 */
export var off = function (type : string, callback) {
	if (type === 'error') {
		errors = errors.filter(x => x !== callback);
	}
	else if (type === 'warning') {
		warnings = warnings.filter(x => x !== callback);
	}
};


/**
 * ### MathLib.error()
 * Fires an error event.
 *
 * @param {oject} details - An object describing the error further.
 */
export var error = function (details) {
	errors.forEach(function (cb) {
		cb(details);
	});
};

/**
 * ### MathLib.warning()
 * Fires a waring event.
 *
 * @param {object} details - An object describing the warning further.
 */
export var warning = function (details) {
	warnings.forEach(function (cb) {
		cb(details);
	});
};