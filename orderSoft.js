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
	requestFromServer(postUrl, body) {
		var status;

		return fetch(urlEndPoint + "/" + postUrl, {
			method : "POST",
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
				if (reason == undefined) { // if server gave no reason
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



	testPost() {
		var test = {
			"test" : true
		};

		this.requestFromServer("test", test).then(resp => {
			console.log("Test post successful");
			return resp;
		});
	}



	// given a username and password returns status
	authenticate(username, password) {

		var loginDetails = {
			"username" : username,
			"password" : password
		};

		var toReturn = "";

		this.requestFromServer("login", loginDetails).then(resp => {
			this._sessionID = resp.sessionId;
			this._accessLevel = resp.accessLevel;
			console.log("Login successful");
		});
	}



	// given tableNum, returns
	// response from server
	getOrder(tableNum) {
		var objectToSend = {
			"tableNum" : tableNum
		};

		requestFromServer("getOrder", objectToSend).then(resp => {
			status = handleResponse(resp);
			console.log("gerOrder status:");
			console.log(status); // prints status of response
			return resp;
		});
	}



	// given tableNum and the order as a javascript object, returns
	// response from server
	submitOrder(tableNum, order) {
		var objectToSend = {
			"tableNum" : tableNum,
			"order" : order
		};

		requestFromServer("submitOrder", objectToSend).then(resp => {
			status = handleResponse(resp);
			console.log("submitOrder status:");
			console.log(status);
			return resp;
		});
	}

	

	// given tableNum and item to change, will change it to "change"
	editOrder(tableNum, item, change) {
		var objectToSend = {
			"tableNum" : tableNum,
			"itemToChange" : item,
			"change" : change
		}

		requestFromServer("editOrder", objectToSend).resp(then => {
			status = handleResponse(resp);
			console.log("edirOrder status:");
			console.log(status);
			return resp;
		});
	}



	//
	markOrderMade(tableNum) {
		var objectToSend = {
			"tableNum" : tableNum
		};

		requestFromServer("markOrderMade", objectToSend).then(resp => {
			status = handleResponse(resp);
			console.log("markOrderMade status:");
			console.log(status);
			return resp;
		});

	}



	// 
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



	//
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



	//
	getDishes() {
		var objectToSend = {
		};

		requestFromServer("getDishes", objectToSend).then(resp => {
			status = handleResponse(resp);
			console.log("getDishes status:");
			console.log(status);
			return resp;
		});
	}



	//
	addDish(name, price, sizes, category, description) {
		var objectToSend = {
			"name" : name,
			"price" : price,
			"description" : description
		}

		requestFromServer("addDish", objectToSend).then(resp => {
			status = handleResponse(resp);
			console.log("addDish status:");
			console.log(status)
			return resp;
		});
	}



	//
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
	}
}




const kitchen = new orderSoftClient();
kitchen.testPost()
kitchen.authenticate("jason");

//kitchen.authenticate("jason", "jason");

