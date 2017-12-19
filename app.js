//adding JS

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAuFAnHqqcwCrlmw_BGAwAK2B44sL-6C6w",
    authDomain: "the-indecisive-dater.firebaseapp.com",
    databaseURL: "https://the-indecisive-dater.firebaseio.com",
    projectId: "the-indecisive-dater",
    storageBucket: "the-indecisive-dater.appspot.com",
    messagingSenderId: "312093581828"
  };
  firebase.initializeApp(config);

  var database = firebase.database();





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

		var results = response;
        console.log(results);
         
        //console.log('mathRandom', results.businesses[Math.floor((Math.random() * 19) + 1)]);
        var random = Math.floor((Math.random() * 19) + 1);
        var randomFoodResult = results.businesses[random];
        console.log('randomFoodResult', randomFoodResult);
        //Create variables from the ajax call to display restaurant info into the DOM
        var fName = randomFoodResult.name;
        var fLocation = randomFoodResult.location;
        var fRating = randomFoodResult.ratin;
        var fPhone = randomFoodResult.display_phone;
        
        //Display results in the DOM
        $('#yelpResults').append(fName);



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
       	})

       		
}


var movieArray=['']

function dataHandler(data){
	var movieGenre = $('#sel1').val()
	console.log(data)
	movieArray=[]
	for (var i = 0; i < data.length; i++) {
		if (typeof data[i].genres != "undefined") {
			if (data[i].genres.includes(movieGenre)) {
				console.log(data[i])
				movieArray.push(data[i])

			} 
		}
	}
	console.log(movieArray)
}

function randomMovie(argument) {
	console.log(movieArray)
	// var results = response;
 //    console.log(results);
     
 //    //console.log('mathRandom', results.businesses[Math.floor((Math.random() * 19) + 1)]);
 //    var random = Math.floor((Math.random() * 19) + 1);
 //    var randomFoodResult = results.businesses[random];
 //    console.log('randomFoodResult', randomFoodResult);
 //    //Create variables from the ajax call to display restaurant info into the DOM
 //    var fName = randomFoodResult.name;
 //    var fLocation = randomFoodResult.location;
 //    var fRating = randomFoodResult.ratin;
 //    var fPhone = randomFoodResult.display_phone;
    
 //    //Display results in the DOM
 //    $('#yelpResults').append(fName);
}



$(document).ready(function() {
	console.log('js is working')
	$(document).on('click', '#search', searchRestaurant)
	$(document).on('click', '#search', searchMovie)
	// event.preventDefault();
	$(document).on('click', '#viewOptions', searchRestaurant)
	$(document).on('click', '#viewOptions', function() {
		console.log(movieArray)
	})
})

//added a click buttin for when the user chooses to select their date night combo
//once you click selct the data will push to firebase and the table above
$("#select").on("click", function(event) {
var movie = $("#movieResult").text();
var restaurant = $("#yelpResults").text();

var dateNight = {
	movie: movie,
	restaurant: restaurant
}

 database.ref().push(dateNight);

 console.log(dateNight.movie); //data going to firebase 
 console.log(dateNight.restaurant); //data going to firebase 


database.ref().on("child_added", function(childSnapshot, prevChildKay){

console.log(childSnapshot.val()); 



var movie = childSnapshot.val().movie;
var restaurant = childSnapshot.val().restaurant;

  //pushes selected results into table
 $("#dateNightInfo > tbody").append("<tr><td>" + movie + "</td><td>" + restaurant + "</td><td>");
});

console.log("FB is working")

})
//firebase is working, just need to figure out how to select results.


