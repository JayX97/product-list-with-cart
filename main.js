const itemContainer = document.getElementById('items-container'); // container to append items

let data;

fetch("./data.json") // fetch data from data.json using Fetch API
    .then(response => response.json())
    .then(data => data.forEach(item => { // takes JSON file data from fetch function call and displays data to webpage
        // item container 
        const itemBox = document.createElement("div");
        itemBox.className = "item";

        //item image
        const itemImage = document.createElement("img");
        itemImage.class = "item-image";
        itemImage.src = item.image.desktop; // need to create conditional to generate different sizes based on screen size
        itemImage.alt = item.name;

        //item category
        const itemCategory = document.createElement("p");
        itemCategory.class = "item-category";
        itemCategory.innerText = item.category;

        //item name
        const itemName = document.createElement("p");
        itemName.class = "item-name";
        itemName.innerText = item.name;

        //item price
        const itemPrice = document.createElement("p");
        const priceDisplay = parseFloat(item.price).toFixed(2);
        itemPrice.class = "item-price";
        itemPrice.innerText = "$" + priceDisplay;

        //append elements to box
        itemBox.appendChild(itemImage);
        itemBox.appendChild(itemCategory);
        itemBox.appendChild(itemName);
        itemBox.appendChild(itemPrice);
    
        // append item box to web page
        itemContainer.appendChild(itemBox);
    }))
    .catch(error => console.log(error));