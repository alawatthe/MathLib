/*

I want to generate a plain JavaScript, an AMD, a Commonjs and later an ES6 modules version of MathLib.

As far as my experiments go, TypeScript can not export plain JavaScript and AMD/Commonjs from the same source.
Furthermore TypeScript can not export ES6 modules right now.

There are basically three solutions to this problem:
1. Let TypeScript generate a plain version, modify the source and generate the AMD/Commonjs/ES6 versions.
2. Generate AMD/Commonjs and convert one of them to plain JavaScript.
3. Generate plain JavaScript and convert it to AMD/Commonjs/ES6.

I went with option 3 for now.

The build process works as follows:
* The files in the folders in 'src' are concated folder by folder and put into 'build/plain'
* These files in 'build/plain' are now transpiled with TypeScript to plain JavaScript files in the same folder
* The plain JavaScript files are concated to 'build/MathLib.js'
* The plain JavaScript files are copied to 'build/amd', 'build/commonjs' and 'build/es6'
* The files in 'build/amd', 'build/commonjs' and 'build/es6' are transformed to AMD, Commonjs modules and ES6 modules using RegExp replacements.
* The folder 'build/plain' is deleted

*/

/* jshint node:true */

module.exports = function (grunt) {
	'use strict';

	// require('time-grunt')(grunt);

	require('jit-grunt')(grunt, {
		qunit: 'grunt-qunit-istanbul',
		'saucelabs-qunit': 'grunt-saucelabs'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Code Generation
		// ===============

		// JavaScript
		concat: require('./grunt/concat.js'),
		ts: require('./grunt/ts.js'),
		copy: require('./grunt/copy.js'),
		uglify: require('./grunt/uglify.js'),
		'regex-replace': require('./grunt/regex-replace.js'),
		stamp: require('./grunt/stamp.js'),
		clean: require('./grunt/clean.js'),

		// CSS
		compass: require('./grunt/compass.js'),
		cssmin: require('./grunt/cssmin.js'),


		// Testing
		// =======
		connect: require('./grunt/connect.js'),
		qunit: require('./grunt/qunit.js'),
		qunit_amd: require('./grunt/qunit_amd.js'),
		nodeunit: require('./grunt/nodeunit.js'),
		coveralls: require('./grunt/coveralls.js'),
		'saucelabs-qunit': require('./grunt/saucelabs-qunit.js'),


		// Code Quality
		// ============
		jshint: require('./grunt/jshint.js'),
		tslint: require('./grunt/tslint.js'),
		jscs: require('./grunt/jscs.js'),


		// Miscellaneous
		// =============
		shell: require('./grunt/shell.js'),
		watch: require('./grunt/watch.js')
	});

	grunt.registerTask('help', require('./grunt/help.js'));


	grunt.registerTask('qunit_amd_warning', function () {
		grunt.log.subhead('The grunt qunit_amd task currently fails for an unknown reason.');
		grunt.log.subhead('Please check the passing of the tests by going to ./test/test.amd.html');
	});


	grunt.registerTask('generateTemplate', require('./grunt/generateTemplate.js'));


	grunt.registerTask('generatePlain', ['clean:plain', 'newer:concat:meta', 'newer:concat:Interfaces',
		'newer:concat:CoercionError', 'newer:concat:EvaluationError', 'newer:concat:Expression',
		'newer:concat:Functn', 'newer:concat:Screen', 'newer:concat:Layer',
		'newer:concat:Canvas', 'newer:concat:SVG', 'newer:concat:Screen2D', 'newer:concat:Screen3D',
		'newer:concat:Vector', 'newer:concat:Circle', 'newer:concat:Complex', 'newer:concat:Integer',
		'newer:concat:Line', 'newer:concat:Matrix', 'newer:concat:Permutation', 'newer:concat:Conic',
		'newer:concat:Point', 'newer:concat:Polynomial', 'newer:concat:Rational', 'newer:concat:Set', 'ts',
		'copy:shims', 'regex-replace:plainHead', 'concat:plain', 'uglify', 'regex-replace:plainBefore',
		'clean:reference'
	]);
	grunt.registerTask('generateAMD', ['copy:amd', 'regex-replace:amdHead', 'regex-replace:amd']);
	grunt.registerTask('generateCommonjs', ['copy:commonjs', 'regex-replace:commonjsHead', 'regex-replace:commonjs']);
	grunt.registerTask('generateES6', ['copy:es6', 'regex-replace:es6Head', 'regex-replace:es6Functn', 'regex-replace:es6']);
	grunt.registerTask('generateDeclaration', ['concat:declaration', 'regex-replace:declaration']);
	grunt.registerTask('generateTests', ['newer:concat:tests', 'newer:concat:testsAmd', 'concat:testsCommonjs']);
	grunt.registerTask('generateAll', [
		'generatePlain', 'generateAMD', 'generateCommonjs', 'generateES6', 'generateDeclaration',
		'generateTests', 'generateCSS', 'generateTemplate', 'generateDocs', 'regex-replace:plainAfter'
	]);
	grunt.registerTask('generateCSS', ['compass', 'cssmin']);
	grunt.registerTask('generateDocs', ['clean:beforeDoxx', 'shell:doxx']);

	grunt.registerTask('testPlain', ['connect', 'qunit']);
	grunt.registerTask('testCommonjs', ['nodeunit']);
	grunt.registerTask('testAMD', ['qunit_amd_warning', 'qunit_amd']);
	grunt.registerTask('testAll', ['testPlain', 'testCommonjs', 'testAMD']);


	grunt.registerTask('benchmarks', ['shell:benchmarks']);
	grunt.registerTask('default', ['help']);
	grunt.registerTask('commit', [
		'generatePlain', 'generateAMD', 'generateCommonjs', 'generateES6',
		'generateDeclaration', 'generateTests', 'generateCSS', 'generateTemplate', 'regex-replace:plainAfter',
		'clean', 'testPlain', 'testCommonjs', 'tslint', 'jshint', 'jscs', 'regex-replace:bower', 'regex-replace:saucebuildnumber'
	]);

	grunt.registerTask('continuousIntegration', ['testPlain', 'coveralls', 'tslint', 'jshint', 'jscs', 'saucelabs-qunit']);
};
