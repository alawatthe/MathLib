module.exports = {
	amd: {
		files: [
			{expand: true, cwd: './build/plain', src: ['./*.js'], dest: './build/amd', filter: 'isFile'}
		]
	},
	commonjs: {
		files: [
			{expand: true, cwd: './build/plain', src: ['./*.js'], dest: './build/commonjs', filter: 'isFile'}
		]
	},
	es6: {
		files: [
			{expand: true, cwd: './build/plain', src: ['./*.js'], dest: './build/es6', filter: 'isFile'}
		]
	},
	shims: {
		files: [
			{expand: true, cwd: './src/shims', src: ['./*.js'], dest: './build/plain', filter: 'isFile'}
		]
	}
};
