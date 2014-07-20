module.exports = {
	options: {
		jshintrc: '.jshintrc'
	},
	Tests: {
		src: ['build/MathLib.test.js']
	},
	visual: {
		src: ['test/visual/*.js']
	},
	grunt: {
		src: ['Gruntfile.js', 'grunt/*.js']
	},
	benchmarks: {
		src: ['benchmarks/*.js']
	},
	es6: {
		files: {
			src: ['build/es6/*.js']
		},
		options: {
			esnext: true
		}
	}
};
