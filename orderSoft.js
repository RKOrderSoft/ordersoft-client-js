const urlEndPoint = "http://localhost:8080/api"; // url
const client = "js";
const status_OK = "OK";
const status_INVALID = "INVALID";
const status_SESSION_EXPIRED = "SESSION_EXPIRED";
const status_UNAUTHORISED = "UNAUTHORISED";

// helper function for fetching from server
// postURL is string, body is javascript object











class orderSoftClient {

	constructor() {
		this._sessionID;
		this._accessLevel;
	}



	// getters and setters
	get sessionID() {
		return this._sessionID;
	}

	get accessLevel() {
		return this._accessLevel;
	}


	// given the URL and body
	requestFromServer(postUrl, body, type) {
		var status;

		return fetch(urlEndPoint + "/" + postUrl, {
			method : type,
			headers : {
				"content-type" : "application/json",
				"client" : client,
				"sessionId" : this._sessionID
			},
			body : JSON.stringify(body)
		}).then(resp => {
			status = resp.status.toString()
			return resp.json();
		}).then(resp => {
			var reason = JSON.parse(resp).reason;
			if (status == 200) { 				// if status is OK
				return JSON.parse(resp);
			} else { 							// if status is not 200/not OK
				if (reason == undefined) { 		// if server gave no reason
					throw status + " no reason"
				} else { 						// if server gave reason
					throw status + " " + reason;
				}
			}
		});
			/*
			return response.json();
		}).then(resp => {
			return JSON.parse(resp);
		})*/
	}


	// given a response will check the status
	/*
	handleResponse(resp) {
		var respStatus = "";
		if (resp.status == status_OK) {
			respStatus = "duude it worked hooly";
		} else if (resp.status == status_INVALID) {
			respStatus = "duude i think your format's invalid haha";
		} else if (resp.status == status_SESSION_EXPIRED) {
			respStatus = "duude i think your authentication session expired haha";
		} else if (resp.status == status_UNAUTHORISED) {
			respStatus = "hooly, you realise you're not actually authorised right?";
		} else {
			respStatus = "i have no idea what the status is haha. maybe ask eddie or something idk";
		}
		return respStatus;
	}*/


	// DONE
	// TESTED
	testPost() {
		var test = {
			"test" : true
		};

		return this.requestFromServer("test", test, "POST");
	}



	// given a username and password returns response from server
	// if login is successful then the session ID and access level
	// will be set
	// NOT DONE
	// NOT TESTED
	authenticate(username, password) {
		var loginDetails = {
			"username" : username,
			"password" : password
		};


		this.requestFromServer("login", loginDetails, "POST").then(resp => {
			this._sessionID = resp.sessionId;
			this._accessLevel = resp.accessLevel;
		});
	}



	// given a reference of either "tableNum" or "orderId" and then
	// the reference number, returns response from server
	// DONE
	// NOT TESTED
	getOrder(reference, referenceNum) {
		if (reference == "tableNum") {
			var objToSend = {
				"tableNum" : referenceNum
			}
		} else if (reference = "orderId") {
			var objToSend = {
				"orderId" : referenceNum
			}
		} else {
			throw "must specify 'tableNum' or 'orderId' in first parameter";
		}

		return this.requestFromServer("order", objToSend, "GET");
		/*requestFromServer("order", objectToSend).then(resp => {
			return resp;
		});*/
	}

	/*
	incorporates both change and submit order
	given an order in JSON, will change/submit order to database
	if tableNum or orderId is not in the database, will make a new
	order. if tableNum or orderId is already in the database, will
	change the order. returns response from server
	*/
	submitOrder(order) {
		// error handling
		var undef = false
		if (order.tableNum == undefined) {
			undef = true
		} else if (order.orderId != undefined) {
			undef = false
		} else {
			undef = false
		}
		if (undef == true) {
			throw "orderId or tableNum must be defined in order";
		}

		return requestFromServer("order", order, "POST");
	}



	// given a reference of either "tableNum" or "orderId" and then
	// the reference number, returns response from server
	// NOT DONE, might be exact same as submitOrder?
	// NOT TESTED
	markOrderMade(reference, referenceNum) {
		if (reference == "tableNum") {
			var objToSend = {
				"tableNum" : referenceNum
			}
		} else if (reference = "orderId") {
			var objToSend = {
				"orderId" : referenceNum
			}
		} else {
			throw "must specify 'tableNum' or 'orderId' in first parameter";
		}

		requestFromServer("order", objToSend, "POST");
	}



	// might not need this? not in data dict
	// NOT DONE
	// NOT TESTED
	markDishMade(tableNum, dish) {
		var objectToSend = {
			"tableNum" : tableNum,
			"dish" : dish
		};

		requestFromServer("markDishMade", objectToSend).then(resp => {
			status = handleResponse(resp);
			console.log("markDishMade status:");
			console.log(status);
			return resp;
		});
	}



	// NOT DONE, might not need as exact same as markorderdone
	// NOT TESTED
	markOrderPaid(tableNum) {
		var objectToSend = {
			"tableNum" : tableNum,
			"dish" : dish
		};

		requestFromServer("markOrderPaid", objectToSend).then(resp => {
			status = handleResponse(resp);
			console.log("markDishMade status:");
			console.log(status);
			return resp;
		});
	}



	// returns all dishes in database
	getDishes() {
		/*var objToSend {
			"" : 
		}*/

		return requestFromServer("dishes", objToSend, "GET");
	}



	// adds dish to database given name, price, sizes, category
	// description, multiOptions and singleOptions
	// DONE
	// NOT TESTED
	addDish(name, price, sizes, category, description, /*image, */multiOptions, singleOptions) {
		var objToSend = {
			"name" : name,
			"price" : price,
			"sizes" : sizes,
			"category" : category,
			"description" : description,
			"multiOptions" : multiOptions,
			"singleOptions" :singleOptions
		}

		return requestFromServer("dishes", objToSend, "POST");
	}



	// NOT DONE, might be same as editDish
	// NOT TESTED
	editDish(name, itemToChange, change) {
		var objectToSend = {
			"name" : name,
			"itemToChange" : edit,
			"change" : change
		};

		requestFromServer("editDish", objectToSend).then(resp => {
			status = handleResponse(resp);
			console.log("editDish status:");
			console.log(status);
			return resp;
		})


	// KINDA DONE, may need security
	// NOT TESTED
	register(username, password) {
		var objectToSend = {
			"username" : username,
			"password" : password
		}

		return requestFromServer("admin", objToSend, "POST");
	}

	
	}
}




const kitchen = new orderSoftClient();
kitchen.testPost().then(resp => {
	console.log(resp);
});

var loggedIn = false;
var error = false;
var userName = prompt("username");
var pw = prompt("pw");
while (loggedIn == false) {
	try {
	error = false;
	kitchen.authenticate(userName, pw);
	}
	catch(err) {
		console.log(err);
		error = true
	}
	finally {
		if (error == true) {
			username = prompt("username");
			pw = prompt("pw");
		} else {
			loggedIn = true;
		}
	}
}

kitchen.authenticate("jason", "jason");
/*kitchen.authenticate("jason");
kitchen.getorder("tableNum", 31).then(resp => {
	console.log(order);
});*/

//kitchen.authenticate("jason", "jason");

