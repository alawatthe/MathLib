module.exports = {
	options: {
		config: '.jscsrc'
	},
	Tests: {
		files: {
			src: ['build/MathLib.test.js']
		}
	},
	visual: {
		files: {
			src: ['test/visual/*.js']
		}
	},
	grunt: {
		files: {
			src: ['Gruntfile.js', 'grunt/*.js']
		},
		options: {
			requireCamelCaseOrUpperCaseIdentifiers: 'ignoreProperties'
		}
	},
	benchmarks: {
		files: {
			src: ['benchmarks/*.js']
		}
	}
};
