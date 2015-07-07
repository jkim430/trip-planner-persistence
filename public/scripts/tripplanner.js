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
	$.get('/days',function(data){
		// console.log(data);
		if(!data.length){
			currentDay = new Day();
			currentDay.$button.addClass('current-day');
			currentDay.switchTo();
			$.post("/days", {number: currentDay.number}, function(data) {
			});
		} else{
			
			// currentDay = new Day();
			 data.sort(function(a,b){return a.number-b.number})
			.map(function(day){
				var newDay = new Day();
				if (day.number === 1) {
					currentDay = newDay;
				}
				newDay.switchTo();
				
				if(day.hotel) {
					newDay.hotel = new Hotel(day.hotel);
					// console.log('hello')
				}
				if(day.restaurants.length){
					newDay.restaurants =day.restaurants.map(function(restaurant){
						return new Restaurant(restaurant); 
					});
				} 
				if(day.thingsToDo.length){ 
					newDay.thingsToDo = day.thingsToDo.map(function(thing){
						return new ThingToDo(thing);
					});
				} 
				newDay.number = day.number;
				// if(day.number===1) {
				// console.log(newDay);
				// }
				return newDay;

			})
			// console.log(days);
			// currentDay = days[0];
			// console.log(currentDay);

			// currentDay.switchTo();
		}


		
	})

	// $.post("/days", {number: currentDay.number}, function(data) {
	// 		// all_days[day.number] = data;
	// 	})

});