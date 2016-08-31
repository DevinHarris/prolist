(function(window) {
	// init variable setup

	var cart = {
		items: [],
		promos: {
			"5percent": 0.05,
			"10percent": 0.10,
			"15percent": 0.15,
			"50percent": 0.5
		},
		total: 0
	},
	cartBtn = document.getElementById('cart'),
	addBtn = document.getElementsByClassName('add-cart'),
	shoppingCart = document.getElementById('shopping-cart'),
	itemCountEl = document.querySelector('.item-count'),
	totalEl = document.querySelector('.total'),
	promoCodeEl = document.querySelector('.promo-code'),
	promoBtn = document.querySelector('.apply-promo'),
	cartItems = document.getElementById('items');

	// don't display cart until product is added to it
	cartBtn.style.display = 'none';

	// addToCart function that accepts the addBtn's top most parent's ID to the get the info need for the item's obj
	function addToCart(id) {

		var productID = document.getElementById(id),
		productName = productID.querySelector('.product-name').innerText,
		quantity = 0,
		price = parseInt(productID.querySelector('.product-price').innerText.substr(1));

		cart.items.push({
			productID: productID.id,
			productName: productName,
			price: price,
			quantity: quantity
		});

		// display the cart because an item is being added to it
		cartBtn.style.display = 'inline-block';
		shoppingCart.style.display = 'inline-block';
		cartBtn.style.color = '#e8117f';
		itemCountEl.innerText = "Items: " + cart.items.length;
		cart.total+=cart.items[cart.items.length - 1].price;
		totalEl.innerText = "Total: " + "$" + cart.total;
		shoppingCartList();

	}

	promoBtn.addEventListener('click', function() {
		var promoCode = promoCodeEl.value,
		promoTotal = 0;

		for (var promo in cart.promos) {
			if (promoCode === promo) {
				promoTotal = cart.total - cart.promos[promo];
				
			}
		}

		totalEl.innerText = "Total: " + "$" + promoTotal.toFixed(2);
		
	});


	function toggleShoppingCart() {
		var shoppingCartStatus = shoppingCart.style.display;

		if (shoppingCartStatus === 'none') {
			shoppingCart.style.display = 'inline-block';
		} else {
			shoppingCart.style.display = 'none';
		}
	}

	function shoppingCartList() {
		cartItems.innerHTML += "<li class='item'>" + 
		"<h3 class='item-name'>" + cart.items[cart.items.length - 1].productName  + "</h3>" +
		"<span class='product-price'>$" + cart.items[cart.items.length - 1].price + "</span>" +
		"<input class='quantity' type='number' value='1'/>" +
		"<button class='quantity-btn'>Add</button>" +
		"<span class='quantity-count'>Quantity: " + cart.items[cart.items.length - 1].quantity + "</span>" +
		"<input class='item-promo' type='text' placeholder='Promo'>" +
		"<button class='item-promo-btn'>Apply</button>" +
		 "</li>";

		
	} 

	// add to cart button

	for (var i = 0; i < addBtn.length; i++) {
		addBtn[i].addEventListener('click', function() {
			addToCart(this.parentNode.parentNode.id);
		});
	}

	// toggle the shopping cart

	cartBtn.addEventListener('click', toggleShoppingCart);

})(window);