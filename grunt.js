module.exports = function(grunt) {

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
              'testing/general/general.js',
              'testing/circle/circle.js',
              'testing/complex/complex.js',
              'testing/functn/functn.js',
              'testing/line/line.js',
              'testing/MathML/MathML.js',
              'testing/matrix/matrix.js',
              'testing/permutation/permutation.js',
              'testing/point/point.js',
              'testing/polynomial/polynomial.js',
              'testing/set/set.js',
              'testing/vector/vector.js'
              ],
        dest: 'build/<%= pkg.name %>.testing.js'
      }
    },
    min: {
      MathLib: {
        src: ['<banner:meta.banner_min>', '<config:concat.MathLib.dest>'],
        dest: 'build/<%= pkg.name %>.min.js'
      },
      tests: {
        src: ['<banner:meta.banner_min>', '<config:concat.tests.dest>'],
        dest: 'build/<%= pkg.name %>.testing.min.js'
      }
    },
    qunit: {
      index: ['testing/testing.html', 'testing/testing.min.html']
    },
    test: {
      files: ['test/*.js']
    },
    lint: {
      files: ['grunt.js', 'dist/MathLib.js', 'testing/*.js']
    },
    watch: {
      concat: {
        files: ['src/*/*.js', 'testing/*.js'],
        tasks: 'concat min lint'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        loopfunc: true,
        predef: [
          'deepEqual',
          'document',
          'DOMParser',
          'equal',
          'MathJax',
          'MathLib',
          'NodeFilter',
          'ok',
          'require',
          'test',
          'window'
        ]
      },
      globals: {
        exports: true,
        module: false
      }
    },
    uglify: {},
    docco: {
			app: {
				src: ['build/MathLib.js']
      }
    }
  });

  grunt.registerTask('default', 'concat min lint qunit');
};
