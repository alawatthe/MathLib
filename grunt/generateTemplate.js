/* jshint node: true */

var grunt = require('grunt');

module.exports = function () {
	var template = grunt.file.read('src/Screen/template.hbs'),
		process = function (template) {
			var str = '/* tslint:disable */\nvar template = function (data) {';

			str += 'var p = [];' +
			'p.push(\'' +
			template.replace(/[\r\t\n]/g, ' ')                                             // remove linebreaks etc.
							.replace(/\{\{!--[^\}]*--\}\}/g, '')                                   // remove comments
							.replace(/\{\{#if ([^\}]*)\}\}/g, '\');\nif (data.$1) {\n\tp.push(\'') // opening if
							.replace(/\{\{\/if\}\}/g, '\');\n}\np.push(\'')                        // closing if
							.replace(/\{\{/g, '\');\np.push(data.')
							.replace(/\}\}/g, ');\np.push(\'') +
			'\');\n' +
			'return p.join(\'\');\n};\n' +
			'/* tslint:enable */';

			return str;
		};

	grunt.file.write('src/Screen/template.ts', process(template));
	grunt.log.writeln('template.ts created successfully');
};
