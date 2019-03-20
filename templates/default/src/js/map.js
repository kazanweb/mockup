(function() {

	var each = function(arr, callback) {
		Array.prototype.forEach.call(arr, function(node, index) {
			callback.call(node, index)
		});
	}

	var inputs = document.querySelectorAll('.js-map__inputs');
	var g = document.querySelectorAll('.js-map__point');

	each(inputs, function() {

		if(this.checked) {
			document.querySelector(this.getAttribute('data-point')).classList.add('active');
		}

		this.addEventListener('change', function() {
			each(g, function() {
				this.classList.remove('active');
			});
			document.querySelector(this.getAttribute('data-point')).classList.add('active');
		});

	});

})();
