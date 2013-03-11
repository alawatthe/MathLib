/*global module:true */
module.exports = function (grunt) {
	'use strict';
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-typescript');

	var banner = '/*! MathLib v<%= pkg.version %> MathLib.de | MathLib.de/en/license */';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		

		// This is a nasty hack with all the bracket files.
		// Revisit this once
		//   https://github.com/gruntjs/grunt-contrib-concat/pull/11
		// is done. 
		concat: {
			MathLib: {
				src: ['src/meta/head.ts',

							'src/MathML/init.ts',
							'src/MathML/!(init).ts',
							'src/meta/bracket1.ts',

							'src/Functn/init.ts',
							'src/Functn/diff.ts',
							'src/Functn/quad.ts',
							'src/Functn/toContentMathML.ts',
							'src/Functn/toContentMathMLString.ts',
							'src/Functn/toLaTeX.ts',
							'src/Functn/toMathML.ts',
							'src/Functn/toMathMLString.ts',
							'src/Functn/toString.ts',
							'src/Functn/functnList.ts',

							'src/Screen/init.ts',
							//'src/screen/enterFullscreen.ts',
							//'src/screen/exitFullscreen.ts',
							//'src/screen/oncontextmenu.ts',
							'src/meta/bracket2.ts',

							'src/Layer/init.ts',
							'src/meta/bracket3.ts',

							'src/Screen2D/drawAxis.ts',
							'src/Screen2D/drawGrid.ts',
							'src/Screen2D/canvas.ts',
							'src/Screen2D/svg.ts',
							'src/Screen2D/init.ts',
							'src/Screen2D/getEventPoint.ts',
							'src/Screen2D/getLineEndPoints.ts',
							'src/Screen2D/onmousedown.ts',
							'src/Screen2D/onmousemove.ts',
							'src/Screen2D/onmouseup.ts',
							'src/Screen2D/onmousewheel.ts',
							'src/meta/bracket4.ts',

							'src/Screen3D/init.ts',
							'src/Screen3D/!(init).ts',
							'src/meta/bracket5.ts',

							'src/Vector/init.ts',
							'src/Vector/!(init).ts',
							'src/meta/bracket6.ts',

							'src/Circle/init.ts',
							'src/Circle/!(init).ts',
							'src/meta/bracket7.ts',

							'src/Complex/init.ts',
							'src/Complex/!(init).ts',
							'src/meta/bracket8.ts',

							'src/Line/init.ts',
							'src/Line/!(init).ts',
							'src/meta/bracket9.ts',

							'src/Matrix/init.ts',
							'src/Matrix/!(init).ts',
							'src/meta/bracket10.ts',

							'src/Permutation/init.ts',
							'src/Permutation/!(init).ts',
							'src/meta/bracket11.ts',

							'src/Point/init.ts',
							'src/Point/!(init).ts',
							'src/meta/bracket12.ts',

							'src/Polynomial/init.ts',
							'src/Polynomial/!(init).ts',
							'src/meta/bracket13.ts',

							'src/Rational/init.ts',
							'src/Rational/!(init).ts',
							'src/meta/bracket14.ts',

							'src/Set/init.ts',
							'src/Set/!(init).ts',
							'src/meta/bracket15.ts',

							'src/meta/foot.ts'
							],
				dest: 'build/MathLib.ts',
				options: {
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
							'// Next is the [MathML](#MathML "Jump to the MathML implementation") module \n' +
							'// and the [functions](#Functions "Jump to the function implementation") module.\n' +
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
				src: ['test/general/general.js',
							'test/general/!(general).js',

							'test/Circle/init.js',
							'test/Circle/!(init).js',

							'test/Complex/complex.js',
							
							'test/Functn/init.js',
							'test/Functn/!(init).js',

							'test/Line/line.js',
							'test/MathML/MathML.js',
							'test/Matrix/matrix.js',
							'test/Permutation/permutation.js',
							'test/Point/point.js',
							'test/Polynomial/polynomial.js',

							'test/Rational/init.js',
							'test/Rational/!(init).js',

							'test/Set/set.js',
							
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
			concat: {
				files: ['src/*/*.ts'],
				tasks: ['concat', 'typescript', 'uglify']
			}
		},
		

		// Testing
		qunit: {
			index: ['test/test.html', 'test/test.min.html']
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
			testing: {
				options: {
					mangle: false,
					banner: banner
				},
				files: {
					'build/MathLib.test.min.js': ['<%= concat.tests.dest %>']
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
};