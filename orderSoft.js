const urlEndPoint = "http://192.168.43.218:8080/api"; // url
const client = "js";
const status_OK = "OK";
const status_INVALID = "INVALID";
const status_SESSION_EXPIRED = "SESSION_EXPIRED";
const status_UNAUTHORISED = "UNAUTHORISED";

// helper function for fetching from server
// funct is string, body is javascript object
function requestFromServer(funct, body) {

	var toSend = JSON.stringify(body);

	fetch(urlEndPoint + "/" + funct, {
		method: "POST",
		body: toSend
	}).then(response => {
		return JSON.parse(response);
	});
}

class orderSoftClient {

	constructor() {
		this._sessionID;
	}

	// authentication method
	authenticate(username, password) {
		fetch(urlEndPoint + "/test", {
			method : "POST",
			headers: {
				"content-type": "application/json"
			},
			body : {
				"client" : client
			}
		}).then(response => {
			console.log(response.json());
			return fetch(urlEndPoint + "/login", {
				method : "POST",
				body : {
					"username" : username,
					"password" : password
				}
			}).then(response => {
				if (response.status == status_OK) {
					this._sessionID = response;
					return true;
				} else if (response.status == status_INVALID) {
					console.log("authentication invalid"); // debugging output
					console.log(response.reason); // reason for invalid authentication
					return false;
				} else if (response.status == status_SESSION_EXPIRED) {
					console.log("authentication session expired"); // debugging output
					return false;
				} else if (response.status == status_UNAUTHORISED) {
					console.log("authentication unauthorised"); // debugging output
					return false;
				} else {
					console.log("i have no idea what happened, server screwed up");
					return false;
				}
			})
		})
	}/*,

	getOrder(tableNum) {
		var toSend = { "tableNum" : tableNum };

		response = requestFromServer("getOrder", toSend);
		console.log(response); // order as javascript object
		return response;
	}

	submitOrder(order) {
		response = requestFromServer("submitOrder", order);
		console.log(response.status); // probably doesn't work
	}

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
kitchen.authenticate("name", "jeff");