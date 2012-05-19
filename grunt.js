module.exports = function(grunt) {

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
              '// MathLib.js is [dual licensed under the MIT and GPL licenses](<http://MathLib.de/en/license>)\n' +
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
              '<file_strip_banner:src/head.js>',
              '<file_strip_banner:src/modules/MathML.js>',
              '<file_strip_banner:src/modules/functions.js>',
              '<file_strip_banner:src/modules/screen.js>',
              '<file_strip_banner:src/modules/canvas.js>',
              '<file_strip_banner:src/modules/svg.js>',
              '<file_strip_banner:src/modules/vector.js>',
              '<file_strip_banner:src/modules/circle.js>',
              '<file_strip_banner:src/modules/complex.js>',
              '<file_strip_banner:src/modules/line.js>',
              '<file_strip_banner:src/modules/matrix.js>',
              '<file_strip_banner:src/modules/permutation.js>',
              '<file_strip_banner:src/modules/point.js>',
              '<file_strip_banner:src/modules/polynomial.js>',
              '<file_strip_banner:src/modules/set.js>',
              '<file_strip_banner:src/foot.js>'
              ],
        dest: 'build/<%= pkg.name %>.js'
      },
      tests: {
        src: ['<banner:meta.banner>',
              '<file_strip_banner:testing/general.js>',
              '<file_strip_banner:testing/circle.js>',
              '<file_strip_banner:testing/complex.js>',
              '<file_strip_banner:testing/functions.js>',
              '<file_strip_banner:testing/line.js>',
              '<file_strip_banner:testing/MathML.js>',
              '<file_strip_banner:testing/matrix.js>',
              '<file_strip_banner:testing/permutation.js>',
              '<file_strip_banner:testing/point.js>',
              '<file_strip_banner:testing/polynomial.js>',
              '<file_strip_banner:testing/set.js>',
              '<file_strip_banner:testing/vector.js>'
              ],
        dest: 'build/<%= pkg.name %>.testing.js'
      }
    },
    min: {
      MathLib: {
        src: ['<banner:meta.banner_min>', '<config:concat.MathLib.dest>'],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      index: ['testing/testing.html']
    },
    test: {
      files: ['test/*.js']
    },
    lint: {
      files: ['grunt.js', 'dist/MathLib.js', 'testing/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
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
    uglify: {}
  });

  grunt.registerTask('default', 'concat min lint qunit');
};
