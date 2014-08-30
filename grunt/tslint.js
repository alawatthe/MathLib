/* jshint node: true */

var grunt = require('grunt');

module.exports = {
	options: {
		configuration: grunt.file.readJSON('.tslintrc')
	},
	files: {
		src: require('./modules.js').map(function (module) {
			return 'build/plain/' + module + '.ts';
		})
	}
};
