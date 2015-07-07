$.post('/days',{
	number :2,
	hotel:'Double Tree',
	restaurants:['Tamarind','Bouley'],
	thingsToDo:['Ground Zero','Battery Park']
	},function(data){console.log(data)})


$.ajax({
  type: "POST",
  url: '/days',
  data: {
	number :2,
	hotel:'Double Tree',
	restaurants:['Tamarind','Bouley'],
	thingsToDo:['Ground Zero','Battery Park']
	},
  success: function(data){console.log(data)},
  dataType: 'json'
});

$.post('/days',{
	number :2
	},function(data){console.log(data)})

$.ajax({
	url:'/days/2',
	type:'delete',
	success:function(data){
		console.log(data);
	}
})

$.ajax({
  type: "POST",
  url: '/days/2/hotel',
  data: {
	hotel:'Double Tree'
	},
  success: function(data){console.log(data)},
  dataType: 'json'
});