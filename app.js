//adding JS

// function to find restaurant
function searchRestaurant(argument) {
	//Yelp AJAX Call
	var foodZip =  $('#input-zipCode').val().trim();
	var foodCategory = $('#sel2').val().trim().toLowerCase()
	var url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurant&location="+foodZip+"&categories="+foodCategory
	var settings = {
		 "async": true,
		 "crossDomain": true,
		 "url": url,
		 "method": "GET",
		 "headers": {
		   "authorization": "Bearer S7Iu9qp-LWQHVALB4GweWmd0ngVavSMAcMatDXn6PFk6tXIFDWBa4uNxhawNkJllDGo5c5-JvrIjIBvf-581Y4jxpPpsQZKExlOMEtEgyC-4g4wq0zjxutTqeZY0WnYx",
		 }
	}
	$.ajax(settings).done(function (response) {
		console.log(response);
// test------code to isolate certain properties without having to make a request to showtimeAPI
		// var findstars = function(starnumber) {
		// 	// return response.businesses[0]
		//     for (var i = 0, len = response.businesses.length; i < len; i++) {
		//         if (response.businesses[i].rating === starnumber)
		//             console.log(response.businesses[i]); // Return as soon as the object is found
		//     } console(null); // The object was not found
		// }		 
		// console.log(findstars(4))
	})
	console.log(foodCategory)




}

function searchMovie(argument) {
	var apikey = "36zcs2fpun2vtymn2qsvz6kd";
    var baseUrl = "http://data.tmsapi.com/v1.1";
    var showtimesUrl = baseUrl + '/movies/showings';
    var zipCode = $('#input-zipCode').val().trim();
    var d = new Date();
    var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
  	$.ajax({
       	url: showtimesUrl,
      	data: {	
        	  	startDate: today,
       	 	   	zip: zipCode,
       	   	 	jsonp: "dataHandler",
       	    	api_key: apikey,
      		   },			
    	dataType: "jsonp",
       	});
}



function dataHandler(data){
	var movieGenre = $('#sel1').val()
	console.log(data)
	for (var i = 0; i < data.length; i++) {
		if (typeof data[i].genres != "undefined") {
			if (data[i].genres.includes(movieGenre)) {
				console.log(data[i])
			}
		}
	}
}

	 

$(document).ready(function() {
	console.log('js is working')
	$(document).on('click', '#search', searchRestaurant)
	// $(document).on('click', '#search', searchMovie)
})

