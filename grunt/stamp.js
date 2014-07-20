/* jshint node: true */

var grunt = require('../node_modules/grunt');

module.exports = {
	options: {
		banner: grunt.file.read('./grunt/banner.js')
	},
	MathLib: {
		files: {
			src: 'build/*/MathLib.js'
		}
	}
};
