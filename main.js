const itemContainer = document.getElementById('items-container'); // container to append items
const cart = document.getElementById('cart'); // cart

let cartArray = [];

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
    //if (cartArray.some((item) => item === newItem))
    cartArray.push(newItem);
    updateAddition(newItem);
    console.log(cartArray);
}

// DISPLAY INDIVIDUAL ITEMS AVAILABLE FROM DATABASE

fetch("./data.json") // fetch data from data.json using Fetch API
    .then(response => response.json())
    .then(data => data.forEach(item => { // takes JSON file data from fetch function call and displays data to webpage
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
            addToCart(item.name);
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

// empty cart div
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

// FUNCTIONS TO UPDATE CART CONTENTS
const updateAddition = (item) => {
    emptyCart.style.display = "none";

    const cartItem = document.createElement("div");
    cartItem.innerText = item;
    cartList.appendChild(cartItem);
};