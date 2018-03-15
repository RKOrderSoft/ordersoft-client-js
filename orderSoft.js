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

// function for fetching from server
function getThing(thingToGet) {
	fetch(ip + thingToGet, { method: "POST" }).then(response => {
		thingGotten = response
	})

	return thingGotten
}

var orderSoftClient = {
	getOrderFromTableNum : function (tableNum) {
		
	}
}