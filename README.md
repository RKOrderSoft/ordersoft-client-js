* `init(ip)`

Initiates a test post request with the IP (string) given and checks whether it's an OrderSoft server. Returns promimse.

* `authenticate(username, password)`

Given a username (string) and password (string), will attempt to authenticate with server. Returns promise with response from the server. Will log an error and throw it if there are any issues.

* `logout()`

Logs out, clearing access level and session ID. Returns promise with response from the server.

* `openOrders()`

Returns promise. Response contains field openOrders, an array of orderIds (strings) of orders that are not complete. Returns promise with response from the server.

* `unpaidOrders()`

Returns promise. Response contains field unpaidOrders, an array of orderIds (strings) of orders that are complete but not yet paid. Returns promise with response from the server.

* `getOrder(reference, referenceNumber)`

Given a reference (string, either "tableNumber" or "orderId"), will retrieve order corresponding with the tableNumber or orderId. Returns promise with response from the server.

The below example retrieves the order by table number. Using the specified table number of 4.
```javascript
getOrder("tableNumber", 4);
```

* `setOrder(order)`

Given an order in JSON, will submit the order to the database. If the table number or order ID is not in the database, it will make a new order. If the table number or order ID is already in the database, it will update the order. Returns promise with response from the server.

* `markOrderMade(reference, referenceNum)`

Given a reference (string, either "tableNumber" or "orderId"), will mark the order as made. See getOrder example. Returnes promise with response from the server.

* `getDishes(parameters)`

Given optional parameters. Returns promise with response from the server with dishIds from database.





Random testing example code:

```javascript

const kitchen = new orderSoftClient();
kitchen.init("localhost:8080").then(resp => {
	console.log(resp);
});

setTimeout(() => {
	kitchen.getOrder("orderId","f4Ke-Uu2D").then(resp => {
		var order1 = resp.order;
		console.log(order1);
		order1.dishes = "13";
		kitchen.setOrder(order1);
	});
}, 1000);


kitchen.authenticate("JasonXiao", "glasses");

setTimeout(() => {
	kitchen.getOrder("tableNum", 4).then(resp => {
		orderToSend = resp.order;
		orderToSend.dishes = 5;
		kitchen.setOrder(orderToSend);

	})
}, 1000);


// henry this works, tested it, it returns an array of orders using the openOrders and getOrder methods

try {

	orders = [];
	var numOrders = 0;
	kitchen.openOrders().then(resp => {
		var orderIds = resp.openOrders;
		numOrders = orderIds.length;
		for (var i = 0; i < numOrders; i++) {
			kitchen.getOrder("orderId", orderIds[i]).then(order => {
				orders.push(order);
			})
		}
	});
} catch(err) {
	console.log(err);
}

```
