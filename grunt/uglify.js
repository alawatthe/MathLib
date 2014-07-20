/* jshint node: true */

var grunt = require('../node_modules/grunt');

module.exports = {
	MathLib: {
		options: {
			mangle: false,
			banner: grunt.file.read('./grunt/banner.min.js')
		},
		files: {
			'build/MathLib.min.js': ['build/MathLib.js']
		}
	}
};
