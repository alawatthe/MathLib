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

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-jscs-checker');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-qunit-amd');
	grunt.loadNpmTasks('grunt-regex-replace');
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-saucelabs');
	grunt.loadNpmTasks('grunt-stamp');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-ts');

	var bannerMin = '/*! MathLib v<%= pkg.version %> MathLib.de | MathLib.de/en/license */\n',
			banner = '/*!\n' +
								' * MathLib JavaScript Library v<%= pkg.version %>\n' +
								' * http://mathlib.de/\n' +
								' *\n' +
								' * Copyright 2012 - <%= grunt.template.today(\'yyyy\') %> Alexander Zeilmann\n' +
								' * Released under the MIT license\n' +
								' * http://mathlib.de/en/license\n' +
								' *\n' +
								' * build date: <%= grunt.template.today(\'yyyy-mm-dd\') %>\n' +
								' */\n',
			testFiles = [
				'test/meta/general.js', 'test/meta/!(general).js',
				'test/Circle/init.js', 'test/Circle/!(init).js',
				'test/Complex/init.js', 'test/Complex/!(init).js',
				'test/Conic/init.js', 'test/Conic/!(init).js',
				'test/Expression/init.js', 'test/Expression/!(init).js',
				'test/Functn/init.js', 'test/Functn/!(init).js',
				'test/Line/init.js','test/Line/!(init).js',
				'test/Matrix/init.js', 'test/Matrix/!(init).js',
				'test/Permutation/init.js', 'test/Permutation/!(init).js',
				'test/Point/init.js', 'test/Point/!(init).js',
				'test/Polynomial/init.js', 'test/Polynomial/!(init).js',
				'test/Rational/init.js', 'test/Rational/!(init).js',
				'test/Screen/init.js', 'test/Screen/!(init).js',
				'test/Set/init.js', 'test/Set/!(init).js',
				'test/Vector/init.js', 'test/Vector/!(init).js'
			];
			


	grunt.registerTask('template', 'A simple task to convert HTML templates', function () {
		var template = grunt.file.read('src/Screen/template.hbs'),
			process = function (template) {
				var str = 'var template = function (data) {';

				str += 'var p = [];' +
				'p.push(\'' +
				template.replace(/[\r\t\n]/g, ' ')                                           // remove linebreaks etc.
								.replace(/\{\{!--[^\}]*--\}\}/g, '')                                 // remove comments
								.replace(/\{\{#if ([^\}]*)\}\}/g, ');\nif (data.$1) {\n\tp.push(') // opening if
								.replace(/\{\{\/if\}\}/g, ');\n}\np.push(')                        // closing if
								.replace(/\{\{/g, ');\np.push(data.')
								.replace(/\}\}/g, ');\np.push(') +
				'\');\n' +
				'return p.join(\'\');\n}';

				return str;
			};

		grunt.file.write('src/Screen/template.ts', process(template));
		grunt.log.writeln('template.ts created successfully');
	});



	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		saucelabs: grunt.file.exists('saucelab.json') ? grunt.file.readJSON('saucelab.json') : '{}',

		concat: {
			options: {
				banner: '/// <reference path=\'reference.ts\'/>\nmodule MathLib {\n',
				footer: '\n}}'
			},
			meta: {
				src: ['src/meta/head.ts', 'src/meta/errorSystem.ts'],
				dest: 'build/plain/meta.ts',
				options: {
					footer: '\n// end meta\n}'
				}
			},
			Expression: {
				src: ['src/Expression/init.ts', 'src/Expression/!(init).ts'],
				dest: 'build/plain/Expression.ts'
			},
			Functn: {
				src: ['src/Functn/init.ts', 'src/Functn/!(init).ts'],
				dest: 'build/plain/Functn.ts',
				options: {
					footer: '\n}'
				}
			},
			Screen: {
				src: ['src/Screen/template.ts', 'src/Screen/init.ts', 'src/Screen/!(init|template).ts'],
				dest: 'build/plain/Screen.ts'
			},
			Layer: {
				src: ['src/Layer/init.ts', 'src/Layer/!(init).ts'],
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
				src: ['src/Screen2D/init.ts', 'src/Screen2D/!(init).ts'],
				dest: 'build/plain/Screen2D.ts'
			},
			Screen3D: {
				src: ['src/Screen3D/init.ts', 'src/Screen3D/!(init).ts'],
				dest: 'build/plain/Screen3D.ts'
			},
			Vector: {
				src: ['src/Vector/init.ts', 'src/Vector/!(init).ts'],
				dest: 'build/plain/Vector.ts'
			},
			Circle: {
				src: ['src/Circle/init.ts', 'src/Circle/!(init).ts'],
				dest: 'build/plain/Circle.ts'
			},
			Complex: {
				src: ['src/Complex/init.ts', 'src/Complex/!(init).ts'],
				dest: 'build/plain/Complex.ts'
			},
			Line: {
				src: ['src/Line/init.ts', 'src/Line/!(init).ts'],
				dest: 'build/plain/Line.ts'
			},
			Matrix: {
				src: ['src/Matrix/init.ts', 'src/Matrix/!(init).ts'],
				dest: 'build/plain/Matrix.ts'
			},
			Permutation: {
				src: ['src/Permutation/init.ts', 'src/Permutation/!(init).ts'],
				dest: 'build/plain/Permutation.ts'
			},
			Conic: {
				src: ['src/Conic/init.ts', 'src/Conic/!(init).ts'],
				dest: 'build/plain/Conic.ts'
			},
			Point: {
				src: ['src/Point/init.ts', 'src/Point/!(init).ts'],
				dest: 'build/plain/Point.ts'
			},
			Polynomial: {
				src: ['src/Polynomial/init.ts', 'src/Polynomial/!(init).ts'],
				dest: 'build/plain/Polynomial.ts'
			},
			Rational: {
				src: ['src/Rational/init.ts', 'src/Rational/!(init).ts'],
				dest: 'build/plain/Rational.ts'
			},
			Set: {
				src: ['src/Set/init.ts', 'src/Set/!(init).ts'],
				dest: 'build/plain/Set.ts'
			},

			plain: {
				src: ['build/plain/meta.js', 'build/plain/Expression.js', 'build/plain/Functn.js', 'build/plain/Screen.js', 'build/plain/Layer.js', 'build/plain/Canvas.js', 'build/plain/SVG.js', 'build/plain/Screen2D.js', 'build/plain/Screen3D.js', 'build/plain/Vector.js', 'build/plain/Circle.js', 'build/plain/Complex.js', 'build/plain/Line.js', 'build/plain/Matrix.js', 'build/plain/Permutation.js', 'build/plain/Conic.js', 'build/plain/Point.js', 'build/plain/Polynomial.js', 'build/plain/Rational.js', 'build/plain/Set.js'],
				dest: 'build/MathLib.d.ts',
				options: {
					banner: banner,
					footer: ''
				}
			},

			declaration: {
				src: ['build/plain/meta.d.ts', 'build/plain/Expression.d.ts', 'build/plain/Functn.d.ts', 'build/plain/Screen.d.ts', 'build/plain/Layer.d.ts', 
				'build/plain/Canvas.d.ts', 'build/plain/SVG.d.ts', 'build/plain/Screen2D.d.ts', 'build/plain/Screen3D.d.ts', 'build/plain/Vector.d.ts',
				'build/plain/Circle.d.ts', 'build/plain/Complex.d.ts', 'build/plain/Line.d.ts', 'build/plain/Matrix.d.ts', 'build/plain/Permutation.d.ts',
				'build/plain/Conic.d.ts', 'build/plain/Point.d.ts', 'build/plain/Polynomial.d.ts', 'build/plain/Rational.d.ts', 'build/plain/Set.d.ts'],
				dest: 'build/MathLib.d.ts',
				options: {
					banner: banner,
					footer: ''
				}
			},
			
			
			// Generate the files for testing MathLib in different environments
			tests: {
				src: testFiles,
				dest: 'build/MathLib.test.js',
				options: {
					banner: banner + '\n',
					footer: ''
				}
			},

			testsAmd: {
				src: testFiles,
				dest: 'build/amd/MathLib.test.amd.js',
				options: {
					banner: banner + '\n' +
					'require([\'../build/amd/MathLib.js\'], function(MathLib) {\n',
					footer: '\n});'
				}
			},
			
			testsCommonjs: {
				// The Screen module is not yet supported in non browser environments.
				src: testFiles.filter(function (x) {return !x.match('Screen');}),
				dest: 'build/commonjs/MathLib.test.commonjs.js',
				options: {
					banner: banner + '\n' +
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
		},

		copy: {
			amd: {
				files: [
					{expand: true, cwd: './build/plain', src: ['./*.js'], dest: './build/amd', filter: 'isFile'}
				]
			},
			commonjs: {
				files: [
					{expand: true, cwd: './build/plain', src: ['./*.js'], dest: './build/commonjs', filter: 'isFile'}
				]
			},
			es6: {
				files: [
					{expand: true, cwd: './build/plain', src: ['./*.js'], dest: './build/es6', filter: 'isFile'}
				]
			}
		},
	


		/*
		
		Testing
		=======
		
		You can run all tests for all platforms using the command
			grunt runTests
		
		The tests for the plain JavaScript:
			grunt qunit
		
		The tests for AMD modules:
			grunt qunit_amd
		
		The tests for Commonjs modules:
			grunt nodeunit
		
		The test coverage:
			grunt karma
		
		*/


		qunit: {
			index: ['test/test.html', 'test/test.min.html']
		},

		'qunit_amd': {
			MathLib: {
				include: [
					'build/amd/MathLib.js'
				],
				tests: [
					'build/amd/MathLib.test.amd.js'
				],
				require: {
					baseUrl: 'build/amd'
				}
			}
		},

		nodeunit: {
			files: ['build/commonjs/MathLib.test.commonjs.js']
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				runnerPort: 9999,
				singleRun: true,
				// PhantomJS currently complains about an security error:
				// 	 SECURITY_ERR: DOM Exception 18: An attempt was made to break through the security policy of the user agent.
				browsers: ['Chrome', /*'PhantomJS'*/]
			}
		},

		// Sauce Labs cross browser testing
		'saucelabs-qunit': {
			MathLib: {
				options: {
					username: '<%= saucelabs.username %>',
					key: '<%= saucelabs.key %>',
					urls: ['http://localhost:9999/test/test.html'],
					concurrency: 3,
					detailedError: true,
					passed: true,
					build: 54,
					testReadyTimeout: 10000,
					testname: 'MathLib QUnit test suite',
					tags: ['MathLib', 'v<%= pkg.version %>'],
					browsers: [
						// Chrome
						// ======
						{
							browserName: 'chrome',
							version: '27',
							platform: 'OS X 10.8'
						},
						{
							browserName: 'chrome',
							version: '27',
							platform: 'XP'
						},
						{
							browserName: 'chrome',
							version: '28',
							platform: 'Linux'
						},
						

						// Firefox
						// =======
						{
							browserName: 'firefox',
							version: '19',
							platform: 'OS X 10.6'
						},
						{
							browserName: 'firefox',
							version: '20',
							platform: 'OS X 10.6'
						},
						{
							browserName: 'firefox',
							version: '21',
							platform: 'OS X 10.6'
						},

						{
							browserName: 'firefox',
							version: '19',
							platform: 'XP'
						},
						{
							browserName: 'firefox',
							version: '20',
							platform: 'XP'
						},
						{
							browserName: 'firefox',
							version: '21',
							platform: 'XP'
						},


						// Safari
						// ======
						{
							browserName: 'safari',
							version: '5',
							platform: 'OS X 10.6'
						},
						{
							browserName: 'safari',
							version: '6',
							platform: 'OS X 10.8'
						},


						// Opera
						// =====
						// Opera does not work with the automated tests.
						// {
						//	browserName: 'opera',
						//	version: '11',
						//	platform: 'Windows 7'
						//},
						//{
						//	browserName: 'opera',
						//	version: '12',
						//	platform: 'Windows 7'
						//},

						//{
						//	browserName: 'opera',
						//	version: '12',
						//	platform: 'Linux'
						//},


						// Internet Explorer
						// =================
						//{
						//	browserName: 'internet explorer',
						//	version: '9',
						//	platform: 'Windows 7'
						//},
						{
							browserName: 'internet explorer',
							version: '10',
							platform: 'Windows 8'
						},


						// Android
						// =======
						// Android does not work with the automated tests.
						//{
						//	browserName: 'android',
						//	version: '4.0',
						//	platform: 'Linux'
						//},


						// iPhone
						// ======
						{
							browserName: 'iphone',
							version: '5.1',
							platform: 'OS X 10.8'
						},
						{
							browserName: 'iphone',
							version: '6',
							platform: 'OS X 10.8'
						},


						// iPad
						// ====
						{
							browserName: 'ipad',
							version: '5.1',
							platform: 'OS X 10.8'
						},
						{
							browserName: 'ipad',
							version: '6',
							platform: 'OS X 10.8'
						}
					]
				}
			}
		},

		connect: {
			server: {
				options: {
					base: '.',
					port: 9999
				}
			}
		},




		/*
		
		Testing
		=======
		
		You can run all tests for all platforms using the command
			grunt runTests
		
		The tests for the plain JavaScript:
			grunt qunit
		
		The tests for AMD modules:
		
		*/
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			MathLib: {
				src: ['build/MathLib.js', 'build/MathLib.test.js']
			},
			grunt: {
				src: ['Gruntfile.js']
			},
			es6: {
				files: {
					src: ['build/es6/*.js'],
				},
				options: {
					esnext: true
				}
			}
		},


		jscs: {
			options: {
				config: '.jscs.json',
			},
			MathLib: {
				files: {
					src: ['build/MathLib.js']
				}
			},
			Tests: {
				files: {
					src: ['build/MathLib.test.js']
				}
			},
			grunt: {
				files: {
					src: ['Gruntfile.js']
				}
			}
		},


		// Minification
		uglify: {
			MathLib: {
				options: {
					mangle: false,
					banner: bannerMin
				},
				files: {
					'build/MathLib.min.js': ['build/MathLib.js']
				}
			}
		},

		cssmin: {
			MathLib: {
				options: {
					banner: bannerMin
				},
				files: {
					'build/MathLib.min.css': ['build/MathLib.css']
				}
			}
		},


		// SCSS
		compass: {
			MathLib: {
				options: {
					sassDir: 'src/scss/',
					cssDir: 'build/',
					outputStyle: 'expanded',
					noLineComments: true
				}
			}
		},

		// Documentation
		docco: {
			MathLib: {
				src: ['build/MathLib.ts'],
				options: {
					output: 'docs/'
				}
			}
		},

		// Typescript
		ts: {
			plain: {
				src: ['build/plain/!(reference).ts'],
				reference: 'build/plain/reference.ts',
				outDir: 'build/plain',
				options: {
					compile: true,
					comments: true,
					target: 'es5',
					module: 'commonjs',
					// Enable sourcemaps as soon as one of
					// https://github.com/gruntjs/grunt-contrib-concat/issues/12
					// https://github.com/kozy4324/grunt-concat-sourcemap
					// has support for input sourcemaps
					sourceMap: false,
					sourceRoot: '',
					mapRoot: '',
					declaration: !false,
				}
			},
		},



		clean: {
			plain: ['build/plain'],
			reference: ['build/amd/reference.js', 'build/commonjs/reference.js'],
			tscommand: ['tscommand.tmp.txt']
		},



		stamp: {
			options: {
				banner: banner,
			},
			MathLib: {
				files: {
					src: 'build/*/MathLib.js'
				}
			}
		},


		'regex-replace': {
			amdHead: {
				src: ['build/amd/meta.js'],
				actions: [
					{
						name: '',
						search: /var MathLib;\n\(function \(_MathLib\) \{/,
						replace: 'define([], function () {\n\tvar _MathLib = {};'
					},
					{
						name: '',
						search: /'export MathLib';/,
						replace: '\treturn _MathLib;',
						flag: 'g'
					}
				]
			},
			amd: {
				src: ['build/amd/*.js'],
				actions: [
					{
						search: "/// <reference path='reference.ts'/>\n",
						replace: ''
					},
					{
						name: '',
						search: /var MathLib;\n\(function \(MathLib\) \{/,
						replace: ''
					},
					{
						name: 'no import Statements',
						search: /\/\/\/ no import/,
						replace: 'define([\'meta\'], function(MathLib) {',
						flags: 'g'
					},
					{
						name: 'import Statements',
						search: /\/\/\/ import (.*)/,
						replace: function (_, match) {
							return 'define([\'meta\', \'' + match.split(', ').join('\', \'') + '\'], function(MathLib) {';
						},
						flags: 'g'
					},
					{
						name: 'module end',
						search: /MathLib\.([^ ]+) = \1;/,
						replace: 'MathLib.$1 = $1;\nreturn MathLib;',
						flags: 'g'
					},
					{
						name: 'remove closing parenthesis',
						search: /\(MathLib \|\| \(MathLib = \{\}\)\)/,
						replace: '',
						flags: 'g'
					}
				]
			},



			commonjsHead: {
				src: ['build/commonjs/meta.js'],
				actions: [
					{
						name: '',
						search: /var MathLib;/,
						replace: 'var MathLib = {};'
					},
					{
						name: '',
						search: /\(function \(_MathLib\) \{/,
						replace: ''
					},
					{
						name: '',
						search: '_MathLib',
						replace: 'MathLib',
						flag: 'g'
					},
					{
						search: '/// DOMParser',
						replace: ''
					},
					{
						name: '',
						search: /'export MathLib';/,
						replace: 'module.exports = MathLib',
						flag: 'g'
					}
				]
			},
			commonjs: {
				src: ['build/commonjs/*.js'],
				actions: [
					{
						search: "/// <reference path='reference.ts'/>\n",
						replace: ''
					},
					{
						name: '',
						search: /var MathLib;\n\(function \(MathLib\) \{/,
						replace: ''
					},
					{
						name: 'no import Statements',
						search: /\/\/\/ no import/,
						replace: 'var MathLib = require(\'./meta.js\');',
						flags: 'g'
					},
					{
						name: 'import Statements',
						search: /\/\/\/ import (.*)/,
						replace: function (_, match) {
							return 'var MathLib = require(\'./meta.js\'),' +
								match.split(', ').reduce(function (old, cur) {
									return old + '\n\t\t' + cur  + ' = require(\'./' + cur + '\'),';
								}, '').slice(0,-1) + ';\n';
						},
						flags: 'g'
					},
					{
						search: '/// DOMParser',
						replace: 'var DOMParser = DOMParser || require(\'xmldom\').DOMParser;'
					},
					{
						name: 'Export the contents',
						search: /MathLib\.([^ ]+) = \1;/,
						replace: 'module.exports = MathLib.$1 = $1;',
						flags: 'g'
					},
					{
						name: 'remove closing parenthesis',
						search: /\}\)\(MathLib \|\| \(MathLib = \{\}\)\);/,
						replace: '',
						flags: 'g'
					}
				]
			},



			es6Head: {
				src: ['build/es6/meta.js'],
				actions: [
					{
						name: '',
						search: /var MathLib;/,
						replace: 'var MathLib = {};'
					},
					{
						name: '',
						search: /\(function \(_MathLib\) \{/,
						replace: ''
					},
					{
						name: '',
						search: '_MathLib',
						replace: 'MathLib',
						flag: 'g'
					},
					{
						search: '/// DOMParser',
						replace: ''
					},
					{
						name: '',
						search: /'export MathLib';/,
						replace: 'module.exports = MathLib',
						flag: 'g'
					}
				]
			},
			es6: {
				src: ['build/es6/*.js'],
				actions: [
					{
						search: "/// <reference path='reference.ts'/>\n",
						replace: ''
					},
					{
						search: /\n    /g,
						replace: '\n',
						flag: 'g'
					},
					{
						name: '',
						search: /var MathLib;\n\(function \(MathLib\) \{/,
						replace: ''
					},
					{
						name: 'no import Statements',
						search: /\/\/\/ no import/,
						replace: 'import MathLib from \'./meta.js\';',
						flags: 'g'
					},
					{
						name: 'import Statements',
						search: /\/\/\/ import (.*)/,
						replace: function (_, match) {
							return 'import MathLib from \'./meta.js\';' +
								match.split(', ').reduce(function (old, cur) {
									return old + '\nimport ' + cur  + ' from \'./' + cur + '\';';
								}, '').slice(0,-1) + ';\n';
						},
						flags: 'g'
					},
					{
						search: '/// DOMParser',
						replace: ''
					},
					{
						name: 'Export the contents',
						search: /MathLib\.([^ ]+) = \1;/,
						replace: 'export default = $1;',
						flags: 'g'
					},
					{
						search: /MathLib\.([^ ]+) = exports\.\1;/g,
						replace: 'export var $1 = exports.$1;'
					},
					{
						search: /MathLib\.(SVG|Canvas) = {/,
						replace: 'export var $1 = {'
					},
					{
						name: 'remove closing parenthesis',
						search: /\}\)\(MathLib \|\| \(MathLib = \{\}\)\);/,
						replace: '',
						flags: 'g'
					}
				]
			},



			declaration: {
				src: ['build/MathLib.d.ts'],
				actions: [
					{
						search: /\/\/\/ <reference path="reference\.d\.ts" \/>\n/g,
						replace: ''
					},
					{
						search: /declare module MathLib \{/g,
						replace: ''
					},
					{
						search: /\n\}/g,
						replace: ''
					},
					{
						search: /\*\/\n/g,
						replace: '*/\n\ndeclare module MathLib \{\n'
					},
					{
						search: /public xor: \(a: any\) => Set;\n    \}/,
						replace: 'public xor: (a: any) => Set;\n    }\n}'
					}
				]
			}
		},
		
		watch: {
			src: {
				files: ['src/*/*.ts'],
				tasks: ['concat:MathLib', 'typescript', 'uglify:MathLib']
			},
			tests: {
				files: ['test/*/*.js'],
				tasks: ['concat:tests', 'uglify:tests']
			},
			scss: {
				files: ['src/scss/MathLib.scss'],
				tasks: ['compass', 'cssmin']
			},
			handlebars: {
				files: ['src/Screen/template.hbs'],
				tasks: ['template']
			}
		}
		
	});


	grunt.registerTask('generatePlain', ['generateTestFiles', 'concat:meta', 'concat:Expression', 'concat:Functn', 'concat:Screen', 'concat:Layer',
			'concat:Canvas', 'concat:SVG', 'concat:Screen2D', 'concat:Screen3D', 'concat:Vector', 'concat:Circle', 'concat:Complex', 'concat:Line',
			'concat:Matrix', 'concat:Permutation', 'concat:Conic', 'concat:Point', 'concat:Polynomial', 'concat:Rational', 'concat:Set', 'ts', 'concat:plain', 'uglify']);
	grunt.registerTask('generateAMD', ['copy:amd', 'regex-replace:amdHead', 'regex-replace:amd']);
	grunt.registerTask('generateCommonjs', ['copy:commonjs', 'regex-replace:commonjsHead', 'regex-replace:commonjs']);
	grunt.registerTask('generateES6', ['copy:es6', 'regex-replace:es6Head', 'regex-replace:es6']);

	grunt.registerTask('generateAll', ['generatePlain', 'generateAMD', 'generateCommonjs', 'generateES6', 'clean']);


	grunt.registerTask('runTests', ['nodeunit', 'qunit', 'qunit_amd']);
	grunt.registerTask('generateTestFiles', ['concat:tests', 'concat:testsAmd', 'concat:testsCommonjs']);


	grunt.registerTask('default', ['generatePlain']);
	grunt.registerTask('release', ['generateAll', 'concat:declaration', 'regex-replace:declaration', 'cssmin' /*, 'docco'*/]);
	grunt.registerTask('saucelabs', ['connect', 'saucelabs-qunit']);
};