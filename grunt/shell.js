module.exports = {
	doxx: {
		options: {
			stdout: true
		},
		command: 'doxx --template ./doxx.jade --source build/plain --target docs'
	},
	benchmarks: {
		options: {
			stdout: true
		},
		command: 'node ./benchmarks/benchmarks.js'
	}
};
