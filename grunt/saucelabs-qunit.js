/* jshint node: true */

var grunt = require('grunt');

module.exports = {
	MathLib: {
		options: {
			username: process.env.SAUCE_USERNAME,
			key: process.env.SAUCE_ACCESS_KEY,
			urls: ['http://localhost:8000/test/test.html'],
			concurrency: 3,
			detailedError: true,
			passed: true,
			build: 113,
			maxRetries: 3,
			'max-duration': 600,
			testReadyTimeout: 10000,
			testname: 'MathLib QUnit test suite',
			tags: ['MathLib', 'v<%= pkg.version %>'],
			browsers: grunt.file.readJSON('browsers.json')
		}
	}
};
