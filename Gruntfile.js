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

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-jscs-checker');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-qunit-amd');
	grunt.loadNpmTasks('grunt-regex-replace');
	grunt.loadNpmTasks('grunt-saucelabs');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-stamp');
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
				'test/Complex/init.js', 'test/Complex/!(init).js', 'test/Complex/prototype/*.js',
				'test/Conic/init.js', 'test/Conic/!(init).js',
				'test/Expression/init.js', 'test/Expression/!(init).js',
				'test/Functn/init.js', 'test/Functn/!(init).js', 'test/Functn/*/*.js',
				'test/Integer/init.js', 'test/Integer/!(init).js', 'test/Integer/prototype/*.js',
				'test/Line/init.js', 'test/Line/!(init).js',
				'test/Matrix/init.js', 'test/Matrix/!(init).js',
				'test/Permutation/init.js', 'test/Permutation/!(init).js',
				'test/Point/init.js', 'test/Point/!(init).js',
				'test/Polynomial/init.js', 'test/Polynomial/!(init).js',
				'test/Rational/init.js', 'test/Rational/!(init).js', 'test/Rational/prototype/*.js',
				'test/Screen/init.js', 'test/Screen/!(init).js',
				'test/Set/init.js', 'test/Set/!(init).js',
				'test/Vector/init.js', 'test/Vector/!(init).js'
			];

	grunt.registerTask('help', function () {
		grunt.log.subhead('Release');
		grunt.log.writeln('grunt release\t\t\tRun this task before committing something. ');

		grunt.log.subhead('Building');
		grunt.log.writeln('grunt generateAll\t\tThis task generates all of the files mentioned below. ');
		grunt.log.writeln('grunt generatePlain\t\tThis task generates the plain JavaScript files. ');
		grunt.log.writeln('grunt generateCommonjs\t\tThis task generates the Commonjs JavaScript files. ');
		grunt.log.writeln('grunt generateAMD\t\tThis task generates the AMD JavaScript files. ');
		grunt.log.writeln('grunt generateES6\t\tThis task generates the ES6 JavaScript files. ');
		grunt.log.writeln('grunt generateDeclaration\tThis task generates the TypeScript declaration files. ');
		grunt.log.writeln('grunt generateTests\t\tThis task generates the JavaScript Test files. ');
		grunt.log.writeln('grunt generateCSS\t\tThis task generates the CSS file. ');
		grunt.log.writeln('grunt generateTemplate\t\tThis task generates the HTML template. ');
		grunt.log.writeln('grunt generateDocs\t\tThis task generates the documentation files. ');

		grunt.log.subhead('Tests');
		grunt.log.writeln('grunt testsAll\t\t\tRuns all the tests in all configurations');
		grunt.log.writeln('grunt testPlain\t\t\tRun the tests for the plain JavaScript files (Possible arguments: MathLib, min)');
		grunt.log.writeln('grunt testCommonjs\t\tRun the tests for the Commonjs JavaScript files');
		grunt.log.writeln('grunt testAMD\t\t\tRun the tests for the AMD JavaScript files');

		grunt.log.subhead('Code quality checks');
		grunt.log.writeln('grunt jshint\t\t\tRuns the JSHint (Possible arguments: MathLib, Tests, grunt)');
		grunt.log.writeln('grunt jscs\t\t\tRuns the JavaScript Code Style checker (Possible arguments: MathLib, Tests, grunt)');
	});


	grunt.registerTask('qunit_amd_warning', function () {
		grunt.log.subhead('The grunt qunit_amd task currently fails for an unknown reason.');
		grunt.log.subhead('Please check the passing of the tests by going to ./test/test.amd.html');
	});


	grunt.registerTask('generateTemplate', 'A simple task to convert HTML templates', function () {
		var template = grunt.file.read('src/Screen/template.hbs'),
			process = function (template) {
				var str = 'var template = function (data) {';

				str += 'var p = [];' +
				'p.push(\'' +
				template.replace(/[\r\t\n]/g, ' ')                                             // remove linebreaks etc.
								.replace(/\{\{!--[^\}]*--\}\}/g, '')                                   // remove comments
								.replace(/\{\{#if ([^\}]*)\}\}/g, '\');\nif (data.$1) {\n\tp.push(\'') // opening if
								.replace(/\{\{\/if\}\}/g, '\');\n}\np.push(\'')                        // closing if
								.replace(/\{\{/g, '\');\np.push(data.')
								.replace(/\}\}/g, ');\np.push(\'') +
				'\');\n' +
				'return p.join(\'\');\n}';

				return str;
			};

		grunt.file.write('src/Screen/template.ts', process(template));
		grunt.log.writeln('template.ts created successfully');
	});

	var sauceuser = null,
			saucekey = null;

	if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined') {
		saucekey = process.env.SAUCE_ACCESS_KEY;
	}

	if (typeof process.env.SAUCE_USERNAME !== 'undefined') {
		sauceuser = process.env.SAUCE_USERNAME;
	}


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		saucelabs: grunt.file.exists('saucelab.json') ? grunt.file.readJSON('saucelab.json') : '{}',

		concat: {
			options: {
				banner: '/// <reference path=\'reference.ts\'/>\nmodule MathLib {\n',
				footer: '\n}}'
			},
			meta: {
				src: ['src/meta/head.ts', 'src/meta/!(head).ts'],
				dest: 'build/plain/meta.ts',
				options: {
					footer: '\n\'export MathLib\';\n// end meta\n}'
				}
			},
			Interfaces: {
				src: ['src/Interfaces/*.ts'],
				dest: 'build/plain/Interfaces.ts',
				options: {
					banner: '',
					footer: ''
				}
			},
			Expression: {
				src: ['src/Expression/init.ts', 'src/Expression/!(init).ts'],
				dest: 'build/plain/Expression.ts'
			},
			Functn: {
				src: ['src/Functn/init.ts', 'src/Functn/*/*.ts', 'src/Functn/!(init).ts'],
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
				src: ['src/Complex/init.ts', 'src/Complex/!(init).ts', 'src/Complex/prototype/*.ts'],
				dest: 'build/plain/Complex.ts',
				options: {
					footer: '\n}}declare var Complex : Field'
				}
			},
			Integer: {
				src: ['src/Integer/init.ts', 'src/Integer/!(init).ts', 'src/Integer/prototype/*.ts'],
				dest: 'build/plain/Integer.ts',
				options: {
					footer: '\n}}declare var Integer : Ring'
				}
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
				src: ['src/Rational/init.ts', 'src/Rational/!(init).ts', 'src/Rational/prototype/*.ts'],
				dest: 'build/plain/Rational.ts',
				options: {
					footer: '\n}}declare var Rational : Field'
				}
			},
			Set: {
				src: ['src/Set/init.ts', 'src/Set/!(init).ts'],
				dest: 'build/plain/Set.ts'
			},

			plain: {
				src: ['build/plain/fullscreen.js', 'build/plain/lineDash.js', 'build/plain/meta.js', 'build/plain/Expression.js', 'build/plain/Functn.js',
					'build/plain/Screen.js', 'build/plain/Layer.js', 'build/plain/Canvas.js', 'build/plain/SVG.js', 'build/plain/Screen2D.js',
					'build/plain/Screen3D.js', 'build/plain/Vector.js', 'build/plain/Circle.js', 'build/plain/Complex.js', 'build/plain/Integer.js',
					'build/plain/Line.js', 'build/plain/Matrix.js', 'build/plain/Permutation.js', 'build/plain/Conic.js', 'build/plain/Point.js',
					'build/plain/Polynomial.js', 'build/plain/Rational.js', 'build/plain/Set.js'
				],
				dest: 'build/MathLib.js',
				options: {
					banner: banner,
					footer: ''
				}
			},

			declaration: {
				src: ['build/plain/meta.d.ts', 'build/plain/Expression.d.ts', 'build/plain/Functn.d.ts', 'build/plain/Screen.d.ts', 'build/plain/Layer.d.ts',
					'build/plain/Canvas.d.ts', 'build/plain/SVG.d.ts', 'build/plain/Screen2D.d.ts', 'build/plain/Screen3D.d.ts', 'build/plain/Vector.d.ts',
					'build/plain/Circle.d.ts', 'build/plain/Complex.d.ts', 'build/plain/Integer.d.ts', 'build/plain/Line.d.ts', 'build/plain/Matrix.d.ts', 'build/plain/Permutation.d.ts',
					'build/plain/Conic.d.ts', 'build/plain/Point.d.ts', 'build/plain/Polynomial.d.ts', 'build/plain/Rational.d.ts', 'build/plain/Set.d.ts'
				],
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
			},
			shims: {
				files: [
					{expand: true, cwd: './src/shims', src: ['./*.js'], dest: './build/plain', filter: 'isFile'}
				]
			}
		},



		/*

		Testing
		=======

		You can run all tests for all platforms using the command
			grunt testAll

		The tests for the plain JavaScript:
			grunt testPlain

		The tests for AMD modules:
			grunt testAMD

		The tests for Commonjs modules:
			grunt testCommonjs

		The test coverage:
			grunt karma

		*/

		connect: {
			server: {
				options: {
					port: 8000,
					hostname: 'localhost',
					base: '.'
				}
			}
		},


		qunit: {
			MathLib: {
				options: {
					urls: [
						'http://localhost:8000/test/test.html'
					]
				}
			},
			min: {
				options: {
					urls: [
						'http://localhost:8000/test/test.min.html'
					]
				}
			}
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
				//   SECURITY_ERR: DOM Exception 18: An attempt was made to break through the security policy of the user agent.
				browsers: ['Chrome']/*, 'PhantomJS'*/
			}
		},

		// Sauce Labs cross browser testing
		'saucelabs-qunit': {
			MathLib: {
				options: {
					username: sauceuser, //'<%= saucelabs.username %>',
					key: saucekey, //'<%= saucelabs.key %>',
					urls: ['http://localhost:8000/test/test.html'],
					concurrency: 3,
					detailedError: true,
					passed: true,
					build: 64,
					testReadyTimeout: 10000,
					testname: 'MathLib QUnit test suite',
					tags: ['MathLib', 'v<%= pkg.version %>'],
					browsers: grunt.file.readJSON('browsers.json')
				}
			}
		},




		/*
		Code Quality
		============

		Run jshint
			grunt jshint

		Run the JavaScript Code Style checker
			grunt jscs
		*/
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			MathLib: {
				src: ['build/MathLib.js']
			},
			Tests: {
				src: ['build/MathLib.test.js']
			},
			grunt: {
				src: ['Gruntfile.js']
			},
			/*
			es6: {
				files: {
					src: ['build/es6/*.js'],
				},
				options: {
					esnext: true
				}
			}
			*/
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
		shell: {
			doxx: {
				options: {
					stdout: true
				},
				command: 'doxx --template ./doxx.jade --source build/plain --target docs'
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
					declaration: true,
				}
			},
		},



		clean: {
			plain: ['build/plain'],
			reference: ['build/plain/reference.js', 'build/amd/reference.js', 'build/commonjs/reference.js'],
			tscommand: ['tscommand.tmp.txt'],
			interfacesJS: ['build/plain/Interfaces.js']
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
			plainHead: {
				src: ['build/plain/meta.js'],
				actions: [
					{
						name: '',
						search: /\/\/\/ <reference path='reference\.ts'\/>/,
						replace: '/**\n' +
						' *\n' +
						' * @module MathLib\n' +
						' */'
					},
					{
						name: '',
						search: '%MathLibVersion',
						replace: '<%= pkg.version %>'
					}
				]
			},


			plainBefore: {
				src: ['build/plain/*.js'],
				actions: [
					{
						search: '/// <reference path=\'reference.ts\'/>\n',
						replace: ''
					},
				]
			},

			plainAfter: {
				src: ['build/MathLib.js'],
				actions: [
					{
						name: '',
						search: /\t'export MathLib';/,
						replace: '',
						flag: 'g'
					}
				]
			},

			amdHead: {
				src: ['build/amd/meta.js'],
				actions: [
					{
						name: '',
						search: /var MathLib;\n\(function \(MathLib\) \{/,
						replace: 'define([], function () {\n\tvar MathLib = {};'
					},
					{
						name: '',
						search: /'export MathLib';/,
						replace: 'return MathLib;',
						flag: 'g'
					}
				]
			},
			amd: {
				src: ['build/amd/*.js'],
				actions: [
					{
						search: '/// <reference path=\'reference.ts\'/>\n',
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
						search: /\(function \(MathLib\) \{/,
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
						search: '/// <reference path=\'reference.ts\'/>\n',
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
				src: ['build/es6/!(MathLib).js'],
				actions: [
					{
						search: '/// <reference path=\'reference.ts\'/>\n',
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
						search: /    var version: string;/g,
						replace: 'declare module MathLib {\n    var version: string;'
					},
					{
						search: /public xor: \(a: any\) => Set;\n    \}/,
						replace: 'public xor: (a: any) => Set;\n    }\n}'
					}
				]
			},


			saucebuildnumber: {
				src: ['Gruntfile.js'],
				actions: [
					{
						search: /build: (\d+)/,
						replace: function (_, match) {
							return 'build: ' + (parseInt(match, 10) + 1);
						}
					},
				]
			}
		},

		watch: {
			src: {
				files: ['src/*/*.ts', 'src/*/*/*.ts'],
				tasks: ['generatePlain']
			},
			tests: {
				files: ['test/*/*.js', 'test/*/*/*.js'],
				tasks: ['generateTests']
			},
			scss: {
				files: ['src/scss/MathLib.scss'],
				tasks: ['generateCSS']
			},
			template: {
				files: ['src/Screen/template.hbs'],
				tasks: ['generateTemplate']
			}
		}

	});


	grunt.registerTask('generatePlain', ['clean:plain', 'newer:concat:meta', 'newer:concat:Interfaces',
		'newer:concat:Expression', 'newer:concat:Functn', 'newer:concat:Screen', 'newer:concat:Layer',
		'newer:concat:Canvas', 'newer:concat:SVG', 'newer:concat:Screen2D', 'newer:concat:Screen3D',
		'newer:concat:Vector', 'newer:concat:Circle', 'newer:concat:Complex', 'newer:concat:Integer',
		'newer:concat:Line', 'newer:concat:Matrix', 'newer:concat:Permutation', 'newer:concat:Conic',
		'newer:concat:Point', 'newer:concat:Polynomial', 'newer:concat:Rational', 'newer:concat:Set', 'ts',
		'copy:shims', 'concat:plain', 'uglify', 'regex-replace:plainHead', 'regex-replace:plainBefore',
		'clean:reference'
	]);
	grunt.registerTask('generateAMD', ['copy:amd', 'regex-replace:amdHead', 'regex-replace:amd']);
	grunt.registerTask('generateCommonjs', ['copy:commonjs', 'regex-replace:commonjsHead', 'regex-replace:commonjs']);
	grunt.registerTask('generateES6', ['copy:es6', 'regex-replace:es6Head', 'regex-replace:es6']);
	grunt.registerTask('generateDeclaration', ['concat:declaration', 'regex-replace:declaration']);
	grunt.registerTask('generateTests', ['newer:concat:tests', 'newer:concat:testsAmd', 'concat:testsCommonjs']);
	grunt.registerTask('generateAll', ['generatePlain', 'generateAMD', 'generateCommonjs', 'generateES6',
		'generateDeclaration', 'generateTests', 'generateCSS', 'generateTemplate', 'generateDocs',
		'regex-replace:plainAfter']);
	grunt.registerTask('generateCSS', ['compass', 'cssmin']);
	grunt.registerTask('generateDocs', ['clean:interfacesJS', 'shell:doxx']);

	grunt.registerTask('testPlain', ['connect', 'qunit']);
	grunt.registerTask('testCommonjs', ['nodeunit']);
	grunt.registerTask('testAMD', ['qunit_amd_warning', 'qunit_amd']);
	grunt.registerTask('testAll', ['testPlain', 'testCommonjs', 'testAMD']);


	grunt.registerTask('default', ['help']);
	grunt.registerTask('commit', ['generateAll', 'clean', 'testPlain', 'testCommonjs', 'jshint', 'jscs']);
	grunt.registerTask('release', ['generateAll', 'clean', 'testPlain', 'testCommonjs', /*'jshint', 'jscs',*/ 'regex-replace:saucebuildnumber']);/*, 'docco'*/

	grunt.registerTask('saucelabs', ['connect', 'saucelabs-qunit']);
	grunt.registerTask('continuousIntegration', ['nodeunit', /*'jshint', 'jscs',*/ 'saucelabs']);
};