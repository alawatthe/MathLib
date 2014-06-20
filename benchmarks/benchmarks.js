/* jshint node: true */

var Benchmark = require('benchmark'),
		clc = require('cli-color'),
		fs = require('fs'),
		suites = fs.readdirSync('./benchmarks').filter(function (fileName) {
			return fileName.match(/\.js$/) && fileName !== 'benchmarks.js' && fileName !== 'utilities.js';
		}),
		foundBetterImplementation = false,
		counter, i, j, implemented, suite, test;


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
