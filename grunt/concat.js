/* jshint node: true */

var grunt = require('../node_modules/grunt'),
		testFiles = [
			'test/meta/general.js', 'test/meta/!(general).js'
		],
		modules = [
			'Circle', 'CoercionError', 'Complex', 'Conic', 'Expression', 'EvaluationError', 'Functn', 'Integer',
			'Line', 'Matrix', 'Permutation', 'Point', 'Polynomial',
			'Rational', 'Screen', 'Screen2D', 'Set', 'Vector'
		],

		createModuleArray = function (module) {
			return ['src/' + module + '/init.ts', 'src/' + module + '/!(init).ts', 'src/' + module + '/*/*.ts'];
		};

modules.forEach(function (module) {
	testFiles.push('test/' + module + '/init.js', 'test/' + module + '/!(init).js', 'test/' + module + '/*/*.js');
});


module.exports = {
	options: {
		banner: '/// <reference path=\'reference.ts\'/>\nmodule MathLib {\n\t\'use strict\';\n',
		footer: '\n}}\n'
	},
	meta: {
		src: ['src/meta/head.ts', 'src/meta/errorSystem.ts', 'src/meta/toString.ts',
		'src/meta/toContentMathML.ts', 'src/meta/toLaTeX.ts', 'src/meta/toMathML.ts'],
		dest: 'build/plain/meta.ts',
		options: {
			footer: '\n\'export MathLib\';\n// end meta\n}\n'
		}
	},
	Interfaces: {
		src: ['src/Interfaces/*.ts'],
		dest: 'build/plain/Interfaces.ts',
		options: {
			banner: '',
			footer: '\n'
		}
	},
	CoercionError: {
		src: createModuleArray('CoercionError'),
		dest: 'build/plain/CoercionError.ts',
		options: {
			footer: '\n}\n'
		}
	},
	EvaluationError: {
		src: createModuleArray('EvaluationError'),
		dest: 'build/plain/EvaluationError.ts',
		options: {
			footer: '\n}\n'
		}
	},
	Expression: {
		src: createModuleArray('Expression'),
		dest: 'build/plain/Expression.ts'
	},
	Functn: {
		src: ['src/Functn/init.ts', 'src/Functn/*/*.ts', 'src/Functn/!(init).ts'],
		dest: 'build/plain/Functn.ts',
		options: {
			footer: '\n}\n'
		}
	},
	Screen: {
		src: ['src/Screen/template.ts', 'src/Screen/init.ts', 'src/Screen/!(init|template).ts', 'src/Screen/*/*.ts'],
		dest: 'build/plain/Screen.ts'
	},
	Layer: {
		src: createModuleArray('Layer'),
		dest: 'build/plain/Layer.ts'
	},
	Canvas: {
		src: ['src/Canvas/init.ts', 'src/Canvas/!(init).ts'],
		dest: 'build/plain/Canvas.ts'
	},
	SVG: {
		src: ['src/SVG/init.ts', 'src/SVG/!(init).ts'],
		dest: 'build/plain/SVG.ts'
	},
	Screen2D: {
		src: createModuleArray('Screen2D'),
		dest: 'build/plain/Screen2D.ts'
	},
	Screen3D: {
		src: createModuleArray('Screen3D'),
		dest: 'build/plain/Screen3D.ts'
	},
	Vector: {
		src: createModuleArray('Vector'),
		dest: 'build/plain/Vector.ts'
	},
	Circle: {
		src: createModuleArray('Circle'),
		dest: 'build/plain/Circle.ts'
	},
	Complex: {
		src: createModuleArray('Complex'),
		dest: 'build/plain/Complex.ts',
		options: {
			footer: '\n}}declare var Complex : Field;\n'
		}
	},
	Integer: {
		src: createModuleArray('Integer'),
		dest: 'build/plain/Integer.ts',
		options: {
			footer: '\n}}declare var Integer : Ring;\n'
		}
	},
	Line: {
		src: createModuleArray('Line'),
		dest: 'build/plain/Line.ts'
	},
	Matrix: {
		src: createModuleArray('Matrix'),
		dest: 'build/plain/Matrix.ts'
	},
	Permutation: {
		src: createModuleArray('Permutation'),
		dest: 'build/plain/Permutation.ts'
	},
	Conic: {
		src: createModuleArray('Conic'),
		dest: 'build/plain/Conic.ts'
	},
	Point: {
		src: createModuleArray('Point'),
		dest: 'build/plain/Point.ts'
	},
	Polynomial: {
		src: createModuleArray('Polynomial'),
		dest: 'build/plain/Polynomial.ts'
	},
	Rational: {
		src: createModuleArray('Rational'),
		dest: 'build/plain/Rational.ts',
		options: {
			footer: '\n}}declare var Rational : Field;\n'
		}
	},
	Set: {
		src: createModuleArray('Set'),
		dest: 'build/plain/Set.ts'
	},

	plain: {
		src: [
			'meta', 'CoercionError', 'EvaluationError', 'Expression', 'Functn', 'Screen', 'Layer', 'Canvas', 'SVG',
			'Screen2D', 'Screen3D', 'Vector', 'Circle', 'Complex', 'Integer', 'Line',
			'Matrix', 'Permutation', 'Conic', 'Point', 'Polynomial', 'Rational', 'Set'
		].map(function (module) {
			return 'build/plain/' + module + '.js';
		}),
		dest: 'build/MathLib.js',
		options: {
			banner: grunt.file.read('./grunt/banner.js'),
			footer: ''
		}
	},

	declaration: {
		src: ['meta', 'CoercionError', 'EvaluationError', 'Expression', 'Functn', 'Screen', 'Layer', 'Canvas', 'SVG',
			'Screen2D', 'Screen3D', 'Vector', 'Circle', 'Complex', 'Integer', 'Line',
			'Matrix', 'Permutation', 'Conic', 'Point', 'Polynomial', 'Rational', 'Set'
		].map(function (module) {
			return 'build/plain/' + module + '.d.ts';
		}),
		dest: 'build/MathLib.d.ts',
		options: {
			banner: grunt.file.read('./grunt/banner.js'),
			footer: ''
		}
	},


	// Generate the files for testing MathLib in different environments
	tests: {
		src: testFiles,
		dest: 'build/MathLib.test.js',
		options: {
			banner: grunt.file.read('./grunt/banner.js') + '\n',
			footer: ''
		}
	},

	testsAmd: {
		src: testFiles,
		dest: 'build/amd/MathLib.test.amd.js',
		options: {
			banner: grunt.file.read('./grunt/banner.js') + '\n' +
			'require([\'../build/amd/MathLib.js\'], function(MathLib) {\n',
			footer: '\n});'
		}
	},

	testsCommonjs: {
		// The Screen module is not yet supported in non browser environments.
		src: testFiles.filter(function (x) {return !x.match('Screen');}),
		dest: 'build/commonjs/MathLib.test.commonjs.js',
		options: {
			banner: grunt.file.read('./grunt/banner.js') + '\n' +
				'var MathLib = require(\'./MathLib.js\'),\n' +
				'\t\tcurModule = \'\',\n' +
				'\t\tmodule = function (module) {\n' +
				'\t\t\tcurModule = module;\n' +
				'\t\t},\n' +
				'\t\ttest = function (name, count, checks) {\n' +
				'\t\t\texports[curModule + \'_\' + name] = function (test) {\n' +
				'\t\t\t\tok = test.ok;\n' +
				'\t\t\t\tequal = test.equal;\n' +
				'\t\t\t\tthrows = test.throws;\n' +
				'\t\t\t\tdeepEqual = test.deepEqual;\n' +
				'\t\t\t\t\n' +
				'\t\t\t\ttest.expect(count);\n' +
				'\t\t\t\tchecks(test);\n' +
				'\t\t\t\ttest.done();\n' +
				'\t\t\t}\n' +
				'\t\t};\n',
			footer: ''
		}
	}
};
