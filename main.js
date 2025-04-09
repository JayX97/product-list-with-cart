const itemContainer = document.getElementById('items-container'); // container to append items

let data;

fetch("./data.json")
    .then(response => response.json())
    .then(data => data.forEach(item => { // takes JSON file data from fetch function call and displays data to webpage
        const itemBox = document.createElement("div");
        itemBox.className = "item";
    
        itemBox.innerText = item.name;
        itemContainer.appendChild(itemBox);
    }))
    .catch(error => console.log(error));