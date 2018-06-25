const urlEndPoint = "http://192.168.43.218:8080/api"; // url
const client = "js";
const status_OK = "OK";
const status_INVALID = "INVALID";
const status_SESSION_EXPIRED = "SESSION_EXPIRED";
const status_UNAUTHORISED = "UNAUTHORISED";

// helper function for fetching from server
// postURL is string, body is javascript object

function requestFromServer(postUrl, body) {
	return fetch(urlEndPoint + "/" + postUrl, {
		method : "POST",
		headers : {
			"content-type" : "application/json"
		},
		body : JSON.stringify(body)
	}).then(response => {
		return response.json();
	}).then(resp => {
		return JSON.parse(resp);
	})
}

// given a response will check the status
function handleResponse(resp) {
	respStatus = "";
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
}



class orderSoftClient {

	constructor() {
		this._sessionID;
	}

	// getters and setters
	get sessionID() {
		return this._sessionID;
	}

	testPost() {
		var test = {
			"client" : client
		}

		requestFromServer("test", test).then(resp => {
			if (response.status = "OK") {
				console.log("Test Post Successful")
			}
		})
	}

	authenticate(username, password) {

		var loginDetails = {
			"client" : client,
			"username" : username,
			"password" : password
		}

		requestFromServer("login", loginDetails).then(resp => {
			
			if (resp.status == status_OK) {
				this._sessionID = resp.sessionId;
				console.log("duude it worked hooly");
				return true;
			} else if (resp.status == status_INVALID) {
				console.log("duude i think your format's invalid haha"); // debugging output
				console.log(resp.reason); // reason for invalid authentication
				return false;
			} else if (resp.status == status_SESSION_EXPIRED) {
				console.log("duude i think your authentication session expired haha"); // debugging output
				return false;
			} else if (resp.status == status_UNAUTHORISED) {
				console.log("hooly, you realise you're not actually authorised right? haha"); // debugging output
				return false;
			} else {
				console.log("duude, eddie, the server's not working");
				return false;
			}
		})
	}


	getOrder(tableNum) {
		var objectToSend = { 
			"client" : client,
			"sessionId" : this._sessionID,
			"tableNum" : tableNum
		};

		response = requestFromServer("getOrder", objectToSend);
		console.log(response); // order as javascript object
		return response;
	}

	submitOrder(tableNum, order) {
		var objectToSend = {
			"client" : client,
			"sessionId" : this._sessionID,
			"tableNum" : tableNum,
			"order" : order
		};
		response = requestFromServer("submitOrder", objectToSend);
		console.log(response.status);
	}

	/*

	editOrder(tableNum, item, change) {
		var toSend = {
			"tableNum" : tableNum,
			"itemToChange" : item,
			"change" : change
	}

		response = requestFromServer("editOrder", toSend);
		console.log(response.status); // probably doesn't work

	}

	markOrderMade(tableNum) {
		var toSend = { "tableNum" : tableNum };

		response = requestFromServer("markOrderMade", toSend);
		console.log(response.status) // probably doesn't work

	}

	//markDishMade(tableNum, dish) {}

	//markOrderPaid(tableNum, )

	*/

}




const kitchen = new orderSoftClient();

kitchen.testPost();

kitchen.authenticate("jason", "jason");

