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
	})
	console.log($('#sel2').val().trim().toLowerCase())
}

// function searchMovie(argument) {
// 	var apikey = "36zcs2fpun2vtymn2qsvz6kd";
//     var baseUrl = "http://data.tmsapi.com/v1.1";
//     var showtimesUrl = baseUrl + '/movies/showings';
//     var zipCode = $('#input-zipCode').val().trim();
//     var d = new Date();
//     var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
//   	$.ajax({
//        	url: showtimesUrl,
//       	data: {	
//         	  	startDate: today,
//        	 	   	zip: zipCode,
//        	   	 	jsonp: "dataHandler",
//        	    	api_key: apikey,
//       		   },			
//     	dataType: "jsonp",
//      		// method: "GET",
//        	});
// }

function dataHandler(data){
	console.log(data)
}

$(document).ready(function() {
	console.log('js is working')
	$(document).on('click', '#search', searchRestaurant)
	// $(document).on('click', '#moviesearch', searchMovie)
	// $(document).on('click', '#search', searchMovie)
	//event.preventDefault();

})

//added a click buttin for when the user chooses to select their date night combo
//once you click selct the data will push to firebase and the table above
$("#select").on("click", function(event) {
var movie = $("#movieResult").val();
var restaurant = $("#yelpResults").val();

var dateNight = {
	movie: movie,
	restaurant: restaurant
}

 database.ref().push(dateNight);

 console.log(dateNight.movie); //data going to firebase but is " ". i think once we push the results it will show 
 console.log(dateNight.restaurant); //data going to firebase but is " ". i think once we push the results it will show 


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


