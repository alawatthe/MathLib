/*global module:true */
module.exports = function(grunt) {
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

							'src/functn/init.ts',
							'src/functn/diff.ts',
							'src/functn/quad.ts',
							'src/functn/toContentMathML.ts',
							'src/functn/toContentMathMLString.ts',
							'src/functn/toLaTeX.ts',
							'src/functn/toMathML.ts',
							'src/functn/toMathMLString.ts',
							'src/functn/toString.ts',
							'src/functn/functnList.ts',

							'src/screen/init.ts',
							//'src/screen/enterFullscreen.ts',
							//'src/screen/exitFullscreen.ts',
							//'src/screen/oncontextmenu.ts',
							'src/meta/bracket2.ts',

							'src/layer/init.ts',
							'src/meta/bracket3.ts',

							'src/screen2D/drawAxis.ts',
							'src/screen2D/drawGrid.ts',
							'src/screen2D/canvas.ts',
							'src/screen2D/svg.ts',
							'src/screen2D/init.ts',
							'src/screen2D/getEventPoint.ts',
							'src/screen2D/getLineEndPoints.ts',
							'src/screen2D/onmousedown.ts',
							'src/screen2D/onmousemove.ts',
							'src/screen2D/onmouseup.ts',
							'src/screen2D/onmousewheel.ts',
							'src/meta/bracket4.ts',

							'src/screen3D/init.ts',
							'src/screen3D/!(init).ts',
							'src/meta/bracket5.ts',

							'src/vector/init.ts',
							'src/vector/!(init).ts',
							'src/meta/bracket6.ts',

							'src/circle/init.ts',
							'src/circle/!(init).ts',
							'src/meta/bracket7.ts',

							'src/complex/init.ts',
							'src/complex/!(init).ts',
							'src/meta/bracket8.ts',

							'src/line/init.ts',
							'src/line/!(init).ts',
							'src/meta/bracket9.ts',

							'src/matrix/init.ts',
							'src/matrix/!(init).ts',
							'src/meta/bracket10.ts',

							'src/permutation/init.ts',
							'src/permutation/!(init).ts',
							'src/meta/bracket11.ts',

							'src/point/init.ts',
							'src/point/!(init).ts',
							'src/meta/bracket12.ts',

							'src/polynomial/init.ts',
							'src/polynomial/!(init).ts',
							'src/meta/bracket13.ts',

							'src/rational/init.ts',
							'src/rational/!(init).ts',
							'src/meta/bracket14.ts',

							'src/set/init.ts',
							'src/set/!(init).ts',
							'src/meta/bracket15.ts',

							'src/meta/foot.ts'
							],
				dest: 'build/MathLib.ts',
				options: {
					separator: '\n\n\n',
					banner: '// MathLib.js is a JavaScript library for mathematical computations.\n'+
							'//\n'+
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

							'test/circle/init.js',
							'test/circle/!(init).js',

							'test/complex/complex.js',
							
							'test/functn/init.js',
							'test/functn/!(init).js',

							'test/line/line.js',
							'test/MathML/MathML.js',
							'test/matrix/matrix.js',
							'test/permutation/permutation.js',
							'test/point/point.js',
							'test/polynomial/polynomial.js',

							'test/rational/init.js',
							'test/rational/!(init).js',

							'test/set/set.js',
							
							'test/vector/init.js',
							'test/vector/!(init).js'
							],
				dest: 'build/MathLib.test.js',
				options: {
					banner: '/*! MathLib v<%= pkg.version %> MathLib.de | MathLib.de/en/license */\n\n'
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
					banner: '/*! MathLib v<%= pkg.version %> MathLib.de | MathLib.de/en/license */'
				},
				files: {
					'build/MathLib.test.min.js': ['<%= concat.tests.dest %>']
				}
			}
		},
		
		// Documentation
		docco: {
			app: {
				src: ['build/MathLib.ts']
			}
		},

		// Typescript
		typescript: {
			MathLib: {
				src: ['build/MathLib.ts'],
				dest: 'build',
				options: {
					comments: true,
					module: 'amd', //or commonjs
					base_path: 'build'
				}
			}
		}
	});

	grunt.registerTask('default', ['concat', 'typescript', 'qunit']);
};