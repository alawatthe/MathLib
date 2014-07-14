test('.randomElement()', 68, function () {
	var sample, mean, variance, i, start, end,
			arr = [],
			n = 1000;

	// random numbers from -4 to +4
	start = new MathLib.Integer(-4);
	end = new MathLib.Integer(4);
	for (i = 0; i < n; i++) {
		sample = MathLib.Integer.randomElement(start, end);

		arr.push((sample.data[0] || 0) * (sample.sign === '+' ? 1 : -1));
	}

	for (i = 0; i < 10; i++) {
		ok(arr[i] <= 4);
		ok(arr[i] >= -4);
		ok(arr[i] % 1 === 0);
	}

	// 2*Math.sqrt((9*9-1)/12)/Math.sqrt(9) = 1.7213259316477407
	mean = arr.reduce(function (x, y) {
		return x + y;
	}) / n;
	ok(mean < +1.7213259316477407);
	ok(mean > -1.7213259316477407);

	variance = arr.reduce(function (x, y) {
		return x + y * y;
	}, 0) / n;
	ok(variance < 8.88888888888889);
	ok(variance > 4.444444444444445);



	// random numbers from 0 to 8
	arr = [];
	start = new MathLib.Integer(8);
	for (i = 0; i < n; i++) {
		sample = MathLib.Integer.randomElement(start);

		arr.push(sample.data[0] || 0);
	}

	for (i = 0; i < 10; i++) {
		ok(arr[i] <= 8);
		ok(arr[i] >= 0);
		ok(arr[i] % 1 === 0);
	}

	// 2*Math.sqrt((9*9-1)/12)/Math.sqrt(9) = 1.7213259316477407
	mean = arr.reduce(function (x, y) {
		return x + y;
	}) / n;
	ok(mean < 4 + 1.7213259316477407);
	ok(mean > 4 - 1.7213259316477407);

	variance = arr.reduce(function (x, y) {
		return x + Math.pow(y - 4, 2);
	}, 0) / n;
	ok(variance < 8.88888888888889);
	ok(variance > 4.444444444444445);
});
