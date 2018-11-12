setInterval(function(){ getAll(); }, 6000);
getAll();
var myArray = [];

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function addAnItem(){
    const url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/create';
    // The data we are going to send in our request
    var itemName = document.getElementById("productName").value;
    var itemPrice = document.getElementById("productPrice").value;
    var itemQuantity = document.getElementById("productQuantity").value;
    var itemTax = document.getElementById("productTax").value;
    
    if (itemName.length == 0 || itemPrice.length == 0){
        alert("Your item name or price cannot be empty. Please try again");
    }
    
    else{
        
        let data = {
            name: encodeHTML(itemName),
            price: encodeHTML(itemPrice),
            quantity: encodeHTML(itemQuantity),
            taxRate: encodeHTML(itemTax)
            }
        // The parameters we are gonna pass to the fetch function
        let fetchData = { 
            method: 'POST', 
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(url, fetchData)
        .then(function() {
            alert("Item has been added to the database!");
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error', error));
    }
}

function getAll(){
    removeAll();
    const url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/getall';
    fetch(url)
    .then((resp)=> resp.json())
    .then(function(data){
        var startRow = 1;
        var myTable = '<table id = "myTableId"><tr><th>Product Name</th><th>Price</th><th>Quantity</th><th>Tax Rate </th></tr>';
        for(i = 0; i< data.length; i++){
           myTable += "<tr><td>" + makeTextNode(document.createTextNode(data[i].name)) 
           + "</td><td>" + makeTextNode(document.createTextNode(data[i].price)) + "</td><td>" 
           + makeTextNode(document.createTextNode(data[i].quantity)) + "</td><td>" 
           + makeTextNode(document.createTextNode(data[i].taxRate)) +  
        "</td><td><button onclick='deleteProduct(" + i + ")'>Delete</button></td><td>" + 
        "</td><td><input type='number' min = "+ 0 +" name='amount'></td><td>" +
        "</td><td><button onclick='quantityUpdate("+ i + ',' + startRow +")'>Update Quantity</button></td><td>" +
        "</td><td><input type='number' min = "+ 0 +" name='amount'></td><td>" +
        "</td><td><button onclick='taxRateUpdate(" + i + ',' + startRow + ")'>Update Tax (%)</button></td>"
        myArray[i]= data[i]._id;
        startRow = startRow+1;
        }
        document.getElementById("basket").innerHTML = myTable;
    })
}

function makeTextNode(theItem){
    var a = document.createElement("div");
    a.appendChild(theItem);
    return a.innerHTML;
}

function removeAll(){
    const url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/getall';
    fetch(url)
    .then((resp)=> resp.json())
    .then(function(data){
        for (i=0;i<data.length;i++){
            removeElement((i).toString());
        }
    })
}

function removeElement(theid){
    var element = document.getElementById(theid);
    element.parentElement.removeChild(element);
}

function quantityUpdate(updateItemId, theRow){
    var url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/updateQuantity/' + myArray[updateItemId];
    var theTable = document.getElementById("myTableId");
    var theNewValue = theTable.rows[theRow].cells[6].children[0].value;
    
    var data = {
        quantity: encodeHTML(theNewValue)
    }
    
    let fetchData = { 
        method: 'PUT', 
        body: JSON.stringify(data),
        headers: new Headers({
        'Content-Type': 'application/json'
        })
    }

    fetch(url, fetchData)
    .then(function() {
        alert("Quantity Updated!");
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error', error));
}

function taxRateUpdate(updateTaxRateId, myRowNum){
    var url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/updateTaxRate/' + myArray[updateTaxRateId];
    var theTable = document.getElementById("myTableId");
    var theNewTaxRate = theTable.rows[myRowNum].cells[10].children[0].value;
    
    var data = {
        taxRate: encodeHTML(theNewTaxRate)
    }
    
    let fetchData = { 
        method: 'PUT', 
        body: JSON.stringify(data),
        headers: new Headers({
        'Content-Type': 'application/json'
        })
    }

    fetch(url, fetchData)
    .then(function() {
        alert("Tax Rate Updated!");
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error', error));
}

function deleteProduct(deleteItemIdId){
    var url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/delete/' + myArray[deleteItemIdId];    

    let fetchData = { 
        method: 'DELETE', 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    fetch(url, fetchData)
    .then(function() {
        alert("Item Deleted!");
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error', error));
}

function getItem(num){
    if (myArray.length == 0){
        alert("Database is empty. Add an item to the database");
    }
    else if(document.getElementById(num).value > (myArray.length -1)){
        alert("Please enter a value between: 0 and " + (myArray.length -1));
    }
    else{
        var itemValue = document.getElementById(num).value;
        var url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/oneItem/' + myArray[itemValue];
        fetch(url)
    .then((resp)=> resp.json())
    .then(function(data){
            alert("Item Name: " + data.name + "\nCost: " + data.price + "\nQuantity: " + data.quantity + "\nTax Rate: " + data.taxRate + "\nItem _id: " + myArray[itemValue]);
        });
    }
}