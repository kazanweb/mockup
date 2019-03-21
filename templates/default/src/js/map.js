(function() {

	var each = function(arr, callback) {
		Array.prototype.forEach.call(arr, function(node, index) {
			callback.call(node, index)
		});
	}

	var inputs = document.querySelectorAll('.js-map__inputs');
	var textChange = document.querySelectorAll('.js-map__changetext');
	var title = document.querySelector('[data-map-text]');
	var g = document.querySelectorAll('.js-map__point');

	each(inputs, function(index) {

		if(this.checked) {
			document.querySelector(this.getAttribute('data-point')).classList.add('active');
			title.innerHTML = textChange[index].innerHTML;
		}

		this.addEventListener('change', function() {
			each(g, function() {
				this.classList.remove('active');
			});
			document.querySelector(this.getAttribute('data-point')).classList.add('active');
			title.innerHTML = textChange[index].innerHTML;
		});

	});

})();
