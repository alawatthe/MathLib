/*global module:true */
module.exports = function(grunt) {
  'use strict';

  grunt.loadTasks('node_modules/grunt-docco/tasks');

  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
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
            '// - [canvas](#Canvas "Jump to the canvas implementation")\n' +
            '// - [svg](#SVG "Jump to the svg implementation")\n' +
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
            '// - [set](#Set "Jump to the set implementation")\n',
      banner_min: '/*! MathLib v<%= pkg.version %> MathLib.de | MathLib.de/en/license */'
    },
    
    concat: {
      MathLib: {
        src: ['<banner:meta.banner>',

              'src/head.js',

              'src/MathML/init.js',
              'src/MathML/!(init).js',

              'src/functn/init.js',
              'src/functn/!(init).js',

              'src/screen/init.js',
              'src/screen/!(init).js',

              'src/canvas/init.js',
              'src/canvas/!(init).js',

              'src/svg/init.js',
              'src/svg/!(init).js',

              'src/vector/init.js',
              'src/vector/!(init).js',

              'src/circle/init.js',
              'src/circle/!(init).js',

              'src/complex/init.js',
              'src/complex/!(init).js',

              'src/line/init.js',
              'src/line/!(init).js',

              'src/matrix/init.js',
              'src/matrix/!(init).js',

              'src/permutation/init.js',
              'src/permutation/!(init).js',

              'src/point/init.js',
              'src/point/!(init).js',

              'src/polynomial/init.js',
              'src/polynomial/!(init).js',

              'src/set/init.js',
              'src/set/!(init).js',
              
              'src/foot.js'
              ],
        dest: 'build/<%= pkg.name %>.js',
        separator: '\n\n\n'
      },
      tests: {
        src: ['<banner:meta.banner_min>',
              'test/general/general.js',
              'test/circle/circle.js',
              'test/complex/complex.js',
              'test/functn/functn.js',
              'test/line/line.js',
              'test/MathML/MathML.js',
              'test/matrix/matrix.js',
              'test/permutation/permutation.js',
              'test/point/point.js',
              'test/polynomial/polynomial.js',
              'test/set/set.js',
              'test/vector/vector.js'
              ],
        dest: 'build/<%= pkg.name %>.test.js'
      }
    },
    
    min: {
      MathLib: {
        src: ['<banner:meta.banner_min>', '<config:concat.MathLib.dest>'],
        dest: 'build/<%= pkg.name %>.min.js'
      },
      tests: {
        src: ['<banner:meta.banner_min>', '<config:concat.tests.dest>'],
        dest: 'build/<%= pkg.name %>.test.min.js'
      }
    },

  
    watch: {
      concat: {
        files: ['src/*/*.js', 'test/*.js'],
        tasks: 'concat min lint'
      }
    },
    

    // Testing
    qunit: {
      index: ['test/test.html', 'test/test.min.html']
    },
    
    test: {
      files: ['test/*.js']
    },

    
    // Linting
    lint: {
      build: 'build/MathLib.js',
      grunt: 'grunt.js',
      tests: 'test/**/*.js'
    },

    jshint: (function() {
      function jshintrc( path ) {
        return grunt.file.readJSON( (path || '') + '.jshintrc' ) || {};
      }

      return {
        options: jshintrc(),
        build: jshintrc(),
        tests: jshintrc()
      };
    }()),


    // Minification
    uglify: {},

    
    // Documentation
    docco: {
			app: {
				src: ['build/MathLib.js']
      }
    }
  });

  grunt.registerTask('default', 'concat min lint qunit');
};