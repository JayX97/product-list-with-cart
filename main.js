const itemContainer = document.getElementById('items-container'); // container to append items
const cart = document.getElementById('cart'); // cart

let cartArray = []; // array of OBJECTS ---> { image, name, category, price, (NEW) ** QUANTITY ** }

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

    cartHeader.innerText = "Your Cart (" + totalCartQuantity() + ")";
    printTotal();
    console.log(cartArray);
    console.log(newItem.quantity);
}

const decrementItem = (item) => {
    item.quantity--;

    if (item.quantity === 0) removeCartItem(item);
    else updateSubtraction(item);

    cartHeader.innerText = "Your Cart (" + totalCartQuantity() + ")";
    printTotal();
    console.log(cartArray);
    console.log(item.quantity);
    // CREATE FUNCTION TO DECREMENT QUANTITY OF ITEM IN CART
}

const removeCartItem = (oldItem) => {// added to remove button event listener
    const oldItemID = oldItem.name.toLowerCase().split(" ").join("-") + "-div"; // obtain div with item details
    const oldItemDiv = document.getElementById(oldItemID);
    cartArray = cartArray.filter(item => item.name !== oldItem.name); // remove all items from cart array with same name

    oldItem.quantity = 0;
    oldItemDiv.remove();

    if (totalCartQuantity() === 0) {// replace cart list with empty cart image if cart quantity is 0
        endOfList.style.display = "none";
        emptyCart.style.display = "flex";
    }
    
    cartHeader.innerText = "Your Cart (" + totalCartQuantity() + ")";
    printTotal();
    console.log(cartArray);
    console.log(oldItem.quantity);
}

const totalCartQuantity = () => { // add up quantities of all items in cart
    return cartArray.reduce((total, currItem) => total + currItem.quantity, 0);
}

const printTotal = () => { // add up total from item quantities in cart
    const totalPrintDiv = document.getElementById("total-print");
    const grandTotal = cartArray.reduce((total, currItem) => total + (currItem.price * currItem.quantity), 0);

    totalPrintDiv.innerText = "$" + parseFloat(grandTotal).toFixed(2);
}

// ** ADD FUNCTIONS FOR ITEM INCREMENT/DECREMENT **

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

        // add invisible div for button functionality (to separate from other active event listeners on the button)
        const functionDiv = document.createElement("div");
        functionDiv.className = "function-div";
        functionDiv.addEventListener("click", (e) => { // anonymous function used to prevent default click behavior when page loads up
            e.preventDefault();
            addToCart(item);
            e.currentTarget.style.display = "none"; // remove visibility of initial button styling
            itemQuantity.style.display = "flex"; // add div to button for quantity increment/decrement
            amount.innerText = item.quantity;
        }); // adds item to cart
        
        // add cart icon for button
        const addCartIcon = document.createElement("img");
        addCartIcon.className = "add-cart-icon";
        addCartIcon.src = "./assets/images/icon-add-to-cart.svg"
        addCartIcon.alt = "Add to cart";
        addButton.appendChild(addCartIcon);
        
        addButton.innerHTML = addButton.innerHTML + " Add to Cart";
        addButton.className = "add-button";

        // ** DIV FOR ITEM QUANTITY ADJUSTMENT **
        const itemQuantity = document.createElement("div");
        itemQuantity.className = "adjust-quantity";

        const decrement = document.createElement("div");
        decrement.className = "decrement-button";
        decrement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>';
        decrement.addEventListener("click", (e) => {
            e.preventDefault();
            decrementItem(item);
            amount.innerText = item.quantity;
            
            if (item.quantity === 0) {
                e.currentTarget.parentNode.style.display = "none";
                functionDiv.style.display = "flex";
            }
        });

        itemQuantity.appendChild(decrement);

        const amount = document.createElement("p");
        amount.className = "item-current-quantity";
        amount.innerText = item.quantity;
        itemQuantity.appendChild(amount);

        const increment = document.createElement("div");
        increment.className = "increment-button";
        increment.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>';
        increment.addEventListener("click", (e) => {
            e.preventDefault();
            addToCart(item);
            amount.innerText = item.quantity;
        });
        
        itemQuantity.appendChild(increment);

        addButton.appendChild(functionDiv);
        addButton.appendChild(itemQuantity);

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
totalPrint.id = "total-print";
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
    
    if (!(cartArray.some(obj => obj.name === item.name))) cartArray.push(item);
    
    const currentQuantity = item.quantity;

    const currentPrice = item.price * parseFloat(currentQuantity);

    if (currentQuantity === 1) { // item is not in cart before addition
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.id = uniqueID + "-div"; // id used for remove method

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

        //remove button
        const removeButton = document.createElement("img");
        removeButton.className = "remove-button";
        removeButton.src = "./assets/images/icon-remove-item.svg";
        removeButton.alt = "Remove item";
        removeButton.addEventListener("click", (e) => {
            e.preventDefault();
            removeCartItem(item);
        });
        
        // add details and remove button to cart item
        cartItem.appendChild(cartItemDetails);
        cartItem.appendChild(removeButton);
        cartList.appendChild(cartItem);
    }

    else { // if item is present in cart before addition only increment the QUANTITY of item
        document.getElementById(uniqueID).innerText = currentQuantity + "x";
        document.getElementById(uniqueIDTotal).innerText = "$" + parseFloat(currentPrice).toFixed(2);
    }
};

const updateSubtraction = (item) => {
    const uniqueID = item.name.toLowerCase().split(" ").join("-"); // id used in specific item's element containing "quantity" class
    const uniqueIDTotal = uniqueID + "-total"; // id used in specific item's total based on quantity
    
    const currentQuantity = item.quantity;

    const currentPrice = item.price * parseFloat(currentQuantity);
    
    document.getElementById(uniqueID).innerText = currentQuantity + "x";
    document.getElementById(uniqueIDTotal).innerText = "$" + parseFloat(currentPrice).toFixed(2);
};