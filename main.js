const itemContainer = document.getElementById('items-container'); // container to append items
const cart = document.getElementById('cart'); // cart

const cartArray = []; // array of OBJECTS ---> { image, name, category, price, (NEW) ** QUANTITY ** }

// header
const header = document.createElement("h1");
header.innerText = "Desserts";
itemContainer.appendChild(header);

// items list
const itemsList = document.createElement("div");
itemsList.id = "items-list";
itemContainer.appendChild(itemsList);

// FUNCTIONS
const addToCart = (newItem) => {// added to add button event listener
    emptyCart.style.display = "none";
    endOfList.style.display = "flex";
    
    newItem.quantity++;
    updateAddition(newItem);

    cartHeader.innerText = "Your Cart (" + cartArray.length + ")";
    console.log(cartArray);
    console.log(newItem.quantity);
}

// DISPLAY INDIVIDUAL ITEMS AVAILABLE FROM DATABASE

fetch("./data.json") // fetch data from data.json using Fetch API
    .then(response => response.json())
    .then(data => data.forEach(item => { // takes JSON file data from fetch function call and displays data to webpage
        // add item to webpage menu
        item.quantity = 0; // initialize current quantity of item in cart to 0;
        // item container 
        const itemBox = document.createElement("div");
        itemBox.className = "item";

        // item image
        const itemImage = document.createElement("img");
        itemImage.className = "item-image";
        itemImage.src = item.image.desktop; // need to create conditional to generate different sizes based on screen size
        itemImage.alt = item.name;

        // add to cart button (will change to div with two buttons to increase/decrease item quantity)
        const addButton = document.createElement("button");
        addButton.innerHTML = "";
        addButton.addEventListener("click", (e) => { // anonymous function used to prevent default click behavior when page loads up
            e.preventDefault();
            addToCart(item);
        }); // adds item to cart
        
        // add cart icon for button
        const addCartIcon = document.createElement("img");
        addCartIcon.className = "add-cart-icon";
        addCartIcon.src = "./assets/images/icon-add-to-cart.svg"
        addCartIcon.alt = "Add to cart";
        addButton.appendChild(addCartIcon);
        
        addButton.innerHTML = addButton.innerHTML + " Add to Cart";
        addButton.className = "add-button";

        // item category
        const itemCategory = document.createElement("p");
        itemCategory.className = "item-category";
        itemCategory.innerText = item.category;

        // item name
        const itemName = document.createElement("p");
        itemName.className = "item-name";
        itemName.innerText = item.name;

        // item price
        const itemPrice = document.createElement("p");
        const priceDisplay = parseFloat(item.price).toFixed(2);
        itemPrice.className = "item-price";
        itemPrice.innerText = "$" + priceDisplay;

        // append elements to box
        itemBox.appendChild(itemImage);
        itemBox.appendChild(addButton);
        itemBox.appendChild(itemCategory);
        itemBox.appendChild(itemName);
        itemBox.appendChild(itemPrice);
    
        // append item box to list
        itemsList.appendChild(itemBox);
    }))
    .catch(error => console.log(error));

// CART

// cart header
const cartHeader = document.createElement("h3");
cartHeader.id = "cart-header";
cartHeader.innerText = "Your Cart (0)";
cart.appendChild(cartHeader);

// cart contents (empty cart content as placeholder)
const cartList = document.createElement("div"); // container containing list of items in cart
cartList.id = "cart-list";

// end of list contents (total, confirm order button)
const endOfList = document.createElement("div");
endOfList.id = "end-of-list";

const orderTotal = document.createElement("div"); // div containing order total label and total price
orderTotal.id = "order-total";
const totalLabel = document.createElement("p");
totalLabel.innerText = "Order Total";
const totalPrint = document.createElement("h3");
totalPrint.innerText = "$0.00"; // placeholder

orderTotal.appendChild(totalLabel);
orderTotal.appendChild(totalPrint);
endOfList.appendChild(orderTotal);

const ecoMessage = document.createElement("div"); // div stating that delivery is carbon-neutral
ecoMessage.id = "eco-message";
const ecoImage = document.createElement("img");
ecoImage.src = "./assets/images/icon-carbon-neutral.svg";
ecoImage.alt = "Carbon neutral";
const ecoMessageText = document.createElement("p");
ecoMessageText.innerHTML = "This is a <strong>carbon-neutral</strong> delivery";

ecoMessage.appendChild(ecoImage);
ecoMessage.appendChild(ecoMessageText);
endOfList.appendChild(ecoMessage);

const confirmOrderButton = document.createElement("button");
confirmOrderButton.id = "confirm-order";
confirmOrderButton.innerHTML = "Confirm Order";

endOfList.appendChild(confirmOrderButton);
endOfList.style.display = "none"; // HIDES END OF LIST SECTION OF CART WHEN CART IS EMPTY

// EMPTY CART DIV
const emptyCart = document.createElement("div");
emptyCart.id = "empty-cart";

const emptyCartImage = document.createElement("img");
emptyCartImage.id = "empty-cart-img";
emptyCartImage.src = "./assets/images/illustration-empty-cart.svg";
emptyCartImage.alt = "Empty cart";
emptyCart.appendChild(emptyCartImage);

const emptyCartMessage = document.createElement("p");
emptyCartMessage.id = "empty-cart-message";
emptyCartMessage.innerText = "Your added items will appear here";
emptyCart.appendChild(emptyCartMessage);

cartList.appendChild(emptyCart);
cart.appendChild(cartList);
cart.appendChild(endOfList);

// FUNCTIONS TO UPDATE CART CONTENTS
const updateAddition = (item) => { // method used to update cart after item addition
    const uniqueID = item.name.toLowerCase().split(" ").join("-"); // id used in specific item's element containing "quantity" class
    const uniqueIDTotal = uniqueID + "-total"; // id used in specific item's total based on quantity
    cartArray.push(item);
    
    const currentQuantity = item.quantity;

    const currentPrice = item.price * parseFloat(currentQuantity);

    if (currentQuantity === 1) { // item is not in cart before addition
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const cartItemDetails = document.createElement("div");
        cartItemDetails.className = "cart-item-details";
        // name
        const cartItemName = document.createElement("span");
        cartItemName.className = "cart-item-name";
        cartItemName.innerHTML = "<p><strong>" + item.name + "</strong></p>";
        // quantity/price section
        const cartItemPrice = document.createElement("span");
        cartItemPrice.className = "cart-item-price";
        cartItemPrice.innerHTML = `<p class= quantity id=${uniqueID}>` + currentQuantity + "x</p><p>@ $" + parseFloat(item.price).toFixed(2) + `</p><p class = quantity-price id=${uniqueIDTotal}>$` + parseFloat(currentPrice).toFixed(2) + "</p>";

        cartItemDetails.appendChild(cartItemName);
        cartItemDetails.appendChild(cartItemPrice);

        cartItem.appendChild(cartItemDetails);
        cartList.appendChild(cartItem);
    }

    else { // if item is present in cart before addition only increment the QUANTITY of item
        document.getElementById(uniqueID).innerText = currentQuantity + "x";
        document.getElementById(uniqueIDTotal).innerText = "$" + parseFloat(currentPrice).toFixed(2);
    }
};