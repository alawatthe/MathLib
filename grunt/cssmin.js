/* jshint node: true */

var grunt = require('../node_modules/grunt');

module.exports = {
	MathLib: {
		options: {
			banner: grunt.file.read('./grunt/banner.min.js')
		},
		files: {
			'build/MathLib.min.css': ['build/MathLib.css']
		}
	}
};
