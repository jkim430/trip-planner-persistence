function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

var days, currentDay;

$(document).ready(function () {
	$.get('/days', function(data) {
		
	})
	days = [];
	currentDay = new Day();
	currentDay.$button.addClass('current-day');
});