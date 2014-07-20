module.exports = {
	MathLib: {
		include: [
			'build/amd/MathLib.js'
		],
		tests: [
			'build/amd/MathLib.test.amd.js'
		],
		require: {
			baseUrl: 'build/amd'
		}
	}
};
