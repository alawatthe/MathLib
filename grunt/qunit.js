module.exports = {
	all: {
		options: {
			baseUrl: '.',
			'--web-security': 'no',
			coverage: {
				src: ['./build/MathLib.js'],
				instrumentedFiles: 'temp/',
				lcovReport: 'coverage',
				linesThresholdPct: 89,
				statementsThresholdPct: 89,
				functionsThresholdPct: 89,
				branchesThresholdPct: 82
			},
			urls: [
				'./test/test.all.html'
			]
		}
	}
};
