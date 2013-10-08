module.exports = function (config) {
	config.set({
		files: [
			'build/MathLib.js',
			'test/vendor/qunit-image.js',
			'test/!(vendor)/*.js'
		],

		frameworks: ['qunit'],

		reporters: ['progress', 'coverage'],

		preprocessors: {
			'build/MathLib.js': ['coverage']
		},

		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		}
	});
};