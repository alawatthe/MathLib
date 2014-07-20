module.exports = {
	src: {
		files: ['src/*/*.ts', 'src/*/*/*.ts'],
		tasks: ['generatePlain', 'tslint']
	},
	tests: {
		files: ['test/*/*.js', 'test/*/*/*.js'],
		tasks: ['generateTests', 'jshint:Tests', 'jscs:Tests']
	},
	grunt: {
		files: ['Gruntfile.js'],
		tasks: ['jshint:grunt', 'jscs:grunt']
	},
	scss: {
		files: ['src/scss/MathLib.scss'],
		tasks: ['generateCSS']
	},
	template: {
		files: ['src/Screen/template.hbs'],
		tasks: ['generateTemplate']
	},
	jade: {
		files: ['doxx.jade'],
		tasks: ['shell']
	}
};
