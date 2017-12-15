//adding JS
		var apikey = "36zcs2fpun2vtymn2qsvz6kd";
        var baseUrl = "http://data.tmsapi.com/v1.1";
        var showtimesUrl = baseUrl + '/movies/showings';
        var zipCode = "94530";
        var d = new Date();
        var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
         
        $(document).ready(function() {         
// send AJAX request
           	$.ajax({
	         	url: showtimesUrl,
	            data: {	
	            	startDate: today,
	         	    zip: zipCode,
	         	    jsonp: "dataHandler",
	         	    api_key: apikey
	        	},			
         		dataType: "jsonp",
         		// method: "GET",
           	});
// for some reason this doesn't work????
           	// .done(function(response){
           	// 	var results = resonse.data
           	// 	console.log(results)
           	// })

         });
//console log the data
        function dataHandler(data){
           		console.log(data)
        }