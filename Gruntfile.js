module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-saucelabs');
	grunt.loadNpmTasks('grunt-typescript');



	grunt.registerTask('template', 'A simple task to convert HTML templates', function() {
		var template = grunt.file.read('src/Screen/template.hbs'),
			process = function(template) {
				var str = 'var template = function (data) {';

				str += "var p = [];"
				str += "p.push('" +
				template.replace(/[\r\t\n]/g, ' ')                                           // remove linebreaks etc.
								.replace(/\{\{!--[^\}]*--\}\}/g, '')                                 // remove comments
								.replace(/\{\{#if ([^\}]*)\}\}/g, "');\nif (data.$1) {\n\tp.push('") // opening if
								.replace(/\{\{\/if\}\}/g, "');\n}\np.push('")                        // closing if
								.replace(/\{\{/g, "');\np.push(data.")
								.replace(/\}\}/g, ");\np.push('") +
				"');\n" +
				'return p.join("");\n}';

				return str;
			};

		grunt.file.write('src/Screen/template.ts', process(template));
		grunt.log.writeln('template.ts created successfully');
	});


	var banner = '/*! MathLib v<%= pkg.version %> MathLib.de | MathLib.de/en/license */';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		saucelabs: grunt.file.exists('saucelab.json') ? grunt.file.readJSON('saucelab.json') : '{}',

		concat: {
			MathLib: {
				src: ['src/meta/head.ts',
							'src/Screen/template.ts',
							'src/meta/errorSystem.ts',

							'src/Expression/init.ts',
							'src/Expression/!(init).ts',

							'src/Functn/init.ts',
							'src/Functn/!(init).ts',

							'src/Screen/init.ts',
							'src/screen/!(init|template).ts',

							'src/Layer/init.ts',
							'src/Layer/!(init).ts',

							'src/Canvas/init.ts',
							'src/Canvas/!(init).ts',

							'src/SVG/init.ts',
							'src/SVG/!(init).ts',

							'src/Screen2D/init.ts',
							'src/Screen2D/!(init).ts',

							'src/Screen3D/init.ts',
							'src/Screen3D/!(init).ts',

							'src/Vector/init.ts',
							'src/Vector/!(init).ts',

							'src/Circle/init.ts',
							'src/Circle/!(init).ts',

							'src/Complex/init.ts',
							'src/Complex/!(init).ts',

							'src/Line/init.ts',
							'src/Line/!(init).ts',

							'src/Matrix/init.ts',
							'src/Matrix/!(init).ts',

							'src/Permutation/init.ts',
							'src/Permutation/!(init).ts',

							'src/Conic/init.ts',
							'src/Conic/!(init).ts',

							'src/Point/init.ts',
							'src/Point/!(init).ts',

							'src/Polynomial/init.ts',
							'src/Polynomial/!(init).ts',

							'src/Rational/init.ts',
							'src/Rational/!(init).ts',

							'src/Set/init.ts',
							'src/Set/!(init).ts',

							'src/meta/foot.ts',
							
							'src/shims/*.ts'
							],
				dest: 'build/MathLib.ts',
				options: {
					process: function (src, filepath) {
						if (filepath.indexOf('init.ts') !== -1 && filepath.indexOf('Expression') === -1 && filepath.indexOf('Screen/') === -1) {
							return '}' + src;
						}
						return src;
					},
					separator: '\n\n\n',
					banner: '// MathLib.js is a JavaScript library for mathematical computations.\n' +
							'//\n' +
							'// ## Version\n' +
							'// v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>  \n' +
							'// MathLib is currently in public beta testing.\n' +
							'//\n' +
							'// ## License\n' +
							'// Copyright (c) <%= grunt.template.today("yyyy") %> Alexander Zeilmann  \n' +
							'// MathLib.js is [licensed under the MIT license](<http://MathLib.de/en/license>)\n' +
							'//\n' +
							'// ## Documentation\n' +
							'// The source code is annotated using [Docco](https://github.com/jashkenas/docco "View Docco on GitHub")\n' +
							'// (with a modified css-file).\n' +
							'// The syntax is more or less the JSDoc syntax.\n' +
							'// A more detailed documentation will be coming soon.\n' +
							'//\n' +
							'//\n' +
							'// ## Code structure\n' +
							'// The code is separated into several modules.\n' +
							'// The first module contains some internal functions\n' +
							'//\n' +
							'// Next is the [Expression](#Expression "Jump to the Expression implementation") module \n' +
							'// and the [functions](#Functn "Jump to the function implementation") module.\n' +
							'//\n' +
							'// Then drawing modules:\n' +
							'//\n' +
							'// - [screen](#Screen "Jump to the screen implementation")\n' +
							'// - [screen2D](#Screen2D "Jump to the implementation for 2D plotting")\n' +
							'// - [screen3D](#Screen3D "Jump to the implementation for 3D plotting")\n' +
							'//\n' +
							'// The next module is the [vector](#Vector "Jump to the vector implementation") module, because the Point and the Line module depend on it.\n' +
							'//\n' +
							'// And at last the other modules in alphabetic order:\n' +
							'//\n' +
							'// - [circle](#Circle "Jump to the circle implementation")\n' +
							'// - [complex](#Complex "Jump to the complex number implementation")\n' +
							'// - [expression](#Expression "Jump to the expression implementation")\n' +
							'// - [line](#Line "Jump to the line implementation")\n' +
							'// - [matrix](#Matrix "Jump to the matrix implementation")\n' +
							'// - [permutation](#Permutation "Jump to the permutation implementation")\n' +
							'// - [point](#Point "Jump to the point implementation")\n' +
							'// - [polynomial](#Polynomial "Jump to the polynomial implementation")\n' +
							'// - [rational](#Rational "Jump to the rational number implementation")\n' +
							'// - [set](#Set "Jump to the set implementation")\n'
				}
			},
			tests: {
				src: ['test/meta/general.js',
							'test/meta/!(general).js',

							'test/Circle/init.js',
							'test/Circle/!(init).js',

							'test/Complex/init.js',
							'test/Complex/!(init).js',

							'test/Conic/init.js',
							'test/Conic/!(init).js',

							'test/Expression/init.js',
							'test/Expression/!(init).js',

							'test/Functn/init.js',
							'test/Functn/!(init).js',

							'test/Line/init.js',
							'test/Line/!(init).js',

							'test/Matrix/init.js',
							'test/Matrix/!(init).js',

							'test/Permutation/init.js',
							'test/Permutation/!(init).js',

							'test/Point/init.js',
							'test/Point/!(init).js',

							'test/Polynomial/init.js',
							'test/Polynomial/!(init).js',

							'test/Rational/init.js',
							'test/Rational/!(init).js',

							'test/Screen/init.js',
							'test/Screen/!(init).js',

							'test/Set/init.js',
							'test/Set/!(init).js',
							
							'test/Vector/init.js',
							'test/Vector/!(init).js'
							],
				dest: 'build/MathLib.test.js',
				options: {
					banner: banner + '\n'
				}
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
		},
		

		// Testing
		qunit: {
			index: ['test/test.html', 'test/test.min.html']
		},


		karma: {
			unit: {
				configFile: 'karma.conf.js',
				runnerPort: 9999,
				singleRun: true,
				browsers: ['PhantomJS']
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
					build: 53,
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


		// Linting
		jshint: {
			all: ['Gruntfile.js', 'build/MathLib.js', 'build/MathLib.test.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},


		// Minification
		uglify: {
			MathLib: {
				options: {
					mangle: false,
					banner: banner
				},
				files: {
					'build/MathLib.min.js': ['build/MathLib.js']
				}
			},
			tests: {
				options: {
					mangle: false,
					banner: banner
				},
				files: {
					'build/MathLib.test.min.js': ['<%= concat.tests.dest %>']
				}
			}
		},

		cssmin: {
			MathLib: {
				options: {
					banner: banner
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
		typescript: {
			MathLib: {
				src: ['build/MathLib.ts'],
				dest: 'build',
				options: {
					comments: false,
					module: 'amd', //or commonjs
					base_path: 'build',
					sourcemap: true,
					declaration: true
				}
			}
		}
	});

	grunt.registerTask('default', ['concat', 'typescript', 'uglify', 'qunit']);
	grunt.registerTask('release', ['default', 'cssmin', 'docco', 'karma']);
	grunt.registerTask('saucelabs', ['connect', 'saucelabs-qunit']);
};