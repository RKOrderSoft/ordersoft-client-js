const urlEndPoint = "http://10.219.218.238:8080/api"; // url

/*
Links:
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
*/



/* functions to implement

authenticate

POS system:
get order by table number


waiter/waitress:
get all dishes (by category, by alphabetical order, by )
add order to database

Kitchen:
assign order complete
delete order from database



*/


// library example
/*
var orderSoftClient = {
	_request : function () { // server request helper function
		encodeURI
	},
	getOrderFromTableNum : function (tableNum) {
		// using tableNum get orderedDishes record
	},

}
*/

// less retarded library

// helper function for fetching from server
function requestFromServer(funct, body) {

	var toSend = body;

	fetch(ip + "/" + funct, {
		method: "POST",
		body: body
	}).then(response => {
		return response;
	});
}

var orderSoftClient = {
	/*authenticate : function () {

		fetch(ip + "/api/login", {
			method : "POST"
		})

	},*/

	getOrder : function (tableNum) {

		var toSend = { "tableNum" : tableNum };

		fetch(ip + "/getorder", { 
			method : "POST", 
			body : JSON.stringify(toSend)
		}).then(response => {
			order = JSON.parse(response);
			console.log(order); // debugging output
		});

		return order;
	},

	submitOrder : function (order) {

		fetch(ip + "/submitOrder", {
			method : "POST",
			body : JSON.stringify(order)
		}).then(response => {
			status = JSON.parse(response); // "OK", "INVALID FORMAT", "UNAUTHORISED", "COOKIE EXPIRED"
 			console.log(status); // debugging output
		})

		return status;
	},

	editOrder : function (tableNum, item, change) {

		var toSend = {
			"tableNum" : tableNum,
			"itemToChange" : item,
			"change" : change
	}

		fetch(ip + "/changeOrder", {
			method: "POST",
			body : JSON.stringify(toSend)
		}).then(response => {
			status = JSON.parse(response) // "OK", "INVALID FORMAT", "ORDER NOT FOUND", "COOKIE EXPIRED"
		})
	},

	markOrderMade : function (tableNum) {

		var toSend = { "tableNum" : tableNum }

		fetch(ip + "/markOrderMade", {
			method : "POST",
			body : JSON.stringify(toSend)
		})

	}


}