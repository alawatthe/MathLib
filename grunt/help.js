/* jshint node: true */

var grunt = require('grunt');

module.exports = function () {
	grunt.log.subhead('Watching');
	grunt.log.writeln('grunt watch\t\t\tRun this task to watch for changes and trigger the appropriate tasks. ');

	grunt.log.subhead('Commiting');
	grunt.log.writeln('grunt commit\t\t\tRun this task before committing something. ');

	grunt.log.writeln('\n┌───────────────────────────────────────────────────────────────────────────────────────────────────────┐');
	grunt.log.writeln('│ You probably do not need to call the following tasks directly, if you use the watch and commit tasks. │');
	grunt.log.writeln('└───────────────────────────────────────────────────────────────────────────────────────────────────────┘');

	grunt.log.subhead('Building');
	grunt.log.writeln('grunt generateAll\t\tThis task runs all the generate* tasks. ');
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
	grunt.log.writeln('grunt jshint\t\t\tRuns JSHint (Possible arguments: MathLib, Tests, grunt)');
	grunt.log.writeln('grunt tslint\t\t\tRuns TSLint');
	grunt.log.writeln('grunt jscs\t\t\tRuns the JavaScript Code Style checker (Possible arguments: MathLib, Tests, grunt)');
};
