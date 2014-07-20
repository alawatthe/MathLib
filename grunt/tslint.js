/* jshint node: true */

var grunt = require('grunt');

module.exports = {
	options: {
		configuration: grunt.file.readJSON('.tslintrc')
	},
	files: {
		src: [
			'Circle', 'Complex', 'Conic', 'EvaluationError', 'Expression', 'Functn', 'Integer',
			'Line', 'Matrix', 'Permutation', 'Point', 'Polynomial',
			'Rational', 'Screen', 'Screen2D', 'Screen3D', 'Set', 'Vector'
		].map(function (module) {
			return 'build/plain/' + module + '.ts';
		})
	}
};
