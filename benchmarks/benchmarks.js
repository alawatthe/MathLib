/* jshint node: true */

var Benchmark = require('benchmark'),
		clc = require('cli-color'),
		fs = require('fs'),
		suites = fs.readdirSync('./benchmarks').filter(function (fileName) {
			return fileName.match(/\.js$/) && fileName !== 'benchmarks.js' && fileName !== 'utilities.js';
		}),
		foundBetterImplementation = false,
		counter, i, j, implemented, suite, test,
		repeat = function (str, n) {
			var res = '';
			for (var i = 0; i < n; i++) {
				res += str;
			}
			return res;
		};


console.log(clc.bold('\nStarted benchmark suite'));
console.log('Please be patient as this takes some time to run.');

for (i = 0; i < suites.length; i++) {
	test = require('./' + suites[i].slice(0, -3));
	suite = new Benchmark.Suite();

	for (j = 0; j < test.variations.length; j++) {
		suite.add(test.variations[j]);
		if (test.variations[j].implemented) {
			implemented = test.variations[j].name;
		}
	}

	counter = 1;

	suite.on('start', function (event) {
		process.stdout.write('\n' + test.name + ': 0/' + event.currentTarget.length);
	})
	.on('cycle', function (event) {
		process.stdout.write('\r' + test.name + ': ' + (counter++) + '/' + event.currentTarget.length);
	})
	.on('complete', function () {
		if (this.filter('fastest').pluck('name')[0] !== implemented) {
			foundBetterImplementation = true;
			process.stdout.write(
				clc.redBright('\n  ► There is a faster implementation ("' +
					this.filter('fastest').pluck('name') + '") than the current implementation ("' +
					implemented + '").'
				)
			);

			var line;
			var fastest = this.filter('fastest').pluck('name');
			var slowest = this.filter('slowest').pluck('name');

			for (var i = 0; i < this.length; i++) {
				line = '\n' + this[i].name + repeat(' ', 20 - this[i].name.length) +
				repeat(' ', 12 - this[i].hz.toFixed(2).length) + this[i].hz.toFixed(2) + ' hz';

				if (fastest.indexOf(this[i].name) !== -1) {
					process.stdout.write(clc.greenBright(line));
				}
				else if (slowest.indexOf(this[i].name) !== -1) {
					process.stdout.write(clc.redBright(line));
				}
				else {
					process.stdout.write(line);
				}
			}
		}
	})
	.run({
		async: false
	});
}

console.log('\n\nBenchmark suite finished');

if (foundBetterImplementation) {
	console.log('There are faster implementations for some functions.');
}
else {
	console.log('There are currently no better implementations.');
}
