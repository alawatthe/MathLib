module.exports = {
	bower: {
		src: ['bower.json'],
		actions: [
			{
				search: /"version": "\d+.\d+.\d+",/,
				replace: '"version": "<%= pkg.version %>",'
			}
		]
	},

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
			}
		]
	},

	plainAfter: {
		src: ['build/MathLib.js'],
		actions: [
			{
				search: /\/\*\*\n \*\n \* @module MathLib\n \*\//,
				replace: '\nvar __extends = this.__extends || function (d, b) {\n' +
					'        for (var p in b) {\n' +
					'            /* istanbul ignore else */\n' +
					'            if (b.hasOwnProperty(p)) {\n' +
					'                d[p] = b[p];\n' +
					'            }\n' +
					'        }\n' +
					'        function __() {\n' +
					'            this.constructor = d;\n' +
					'        }\n' +
					'        __.prototype = b.prototype;\n' +
					'        d.prototype = new __();\n' +
					'	};\n\n' +
					'/**\n' +
					' *\n' +
					' * @module MathLib\n' +
					' */'
			},
			{
				name: '',
				search: /\t'export MathLib';/,
				replace: '',
				flag: 'g'
			},
			{
				search: /var __extends.*\n.*\n.*\n.*\n.*\n\};/g,
				replace: ''
			},
			{
				search: /\/\/\/ <reference path='reference.ts'\/>\nvar MathLib;/g,
				replace: ''
			},
			{
				search: /var MathLib;/g,
				replace: 'var MathLib = {};'
			},
			{
				search: / \|\| \(MathLib = \{\}\)/g,
				replace: ''
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
			},
			{
				search: /MathLib\.CoercionError\.prototype = new CustomError();/g,
				replace: 'MathLib.CoercionError.prototype = new CustomError();\nreturn MathLib;'
			},
			{
				search: /MathLib\.EvaluationError\.prototype = new CustomError();/g,
				replace: 'MathLib.EvaluationError.prototype = new CustomError();\nreturn MathLib;'
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
					}, '').slice(0, -1) + ';\n';
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
			},
			{
				search: /MathLib\.CoercionError = function/g,
				replace: 'module.exports = MathLib.CoercionError = function'
			},
			{
				search: /MathLib\.EvaluationError = function/g,
				replace: 'module.exports = MathLib.EvaluationError = function'
			}
		]
	},



	es6Head: {
		src: ['build/es6/meta.js'],
		actions: [
			{
				search: /var MathLib;/,
				replace: ''
			},
			{
				search: /\(function \(MathLib\) \{/,
				replace: ''
			},
			{
				search: '_MathLib',
				replace: 'MathLib',
				flag: 'g'
			},
			{
				search: '/// DOMParser',
				replace: ''
			},
			{
				search: /'export MathLib';/,
				replace: '',
				flag: 'g'
			},
			{
				search: /MathLib\.(\w+) =/g,
				replace: 'export var $1 ='
			}
		]
	},
	es6Functn: {
		src: ['build/es6/Functn.js'],
		actions: [
			{
				search: /MathLib\.(\w+) = function/g,
				replace: 'export var $1 = function'
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
				search: /\/\/\/ no import/g,
				replace: ''
			},
			{
				name: 'import Statements',
				search: /\/\/\/ import (.*)/g,
				replace: ''
			},
			{
				search: '/// DOMParser',
				replace: ''
			},
			{
				name: 'Export the contents',
				search: /MathLib\.([^ ]+) = \1;/,
				replace: 'export default $1;',
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
				search: /'use strict';/,
				replace: '/* jshint esnext:true */'
			},
			{
				search: /MathLib\.(\w+)/g,
				replace: '$1'
			},
			{
				search: /\/\*es6/g,
				replace: ''
			},
			{
				search: /es6\*\//g,
				replace: ''
			},
			{
				search: /var __extends.*\n.*\n.*\n.*\n.*\n\};/g,
				replace: 'var __extends = this.__extends || function (d, b) {\n' +
					'	for (var p in b) {\n' +
					'		if (b.hasOwnProperty(p)) {\n' +
					'			d[p] = b[p];\n' +
					'		}\n' +
					'	}\n' +
					'	function __() {\n' +
					'		this.constructor = d;\n' +
					'	}\n' +
					'	__.prototype = b.prototype;\n' +
					'	d.prototype = new __();\n' +
					'};\n'
			},
			{
				search: /(EvaluationError = error;)\n/g,
				replace: 'export var $1'
			},
			{
				name: 'remove closing parenthesis',
				search: /\}\)\(MathLib \|\| \(MathLib = \{\}\)\);/,
				replace: '',
				flags: 'g'
			},
			{
				search: /CoercionError = function/g,
				replace: 'var CoercionError = function'
			},
			{
				search: /EvaluationError = function/g,
				replace: 'var EvaluationError = function'
			},
			{
				search: /MathLib\.CoercionError\.prototype = new CustomError();/g,
				replace: 'MathLib.CoercionError.prototype = new CustomError();\nexport CoercionError;'
			},
			{
				search: /MathLib\.EvaluationError\.prototype = new CustomError();/g,
				replace: 'MathLib.EvaluationError.prototype = new CustomError();\nexport EvaluationError;'
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
		src: ['grunt/saucelabs-qunit.js'],
		actions: [
			{
				search: /build: (\d+)/,
				replace: function (_, match) {
					return 'build: ' + (parseInt(match, 10) + 1);
				}
			}
		]
	}
};
