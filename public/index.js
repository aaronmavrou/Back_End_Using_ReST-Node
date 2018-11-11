var myArray = [];

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function hola(){
    const url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/create';
    // The data we are going to send in our request
    var itemName = document.getElementById("productName").value;
    var itemPrice = document.getElementById("productPrice").value;
    var itemQuantity = document.getElementById("productQuantity").value;
    var itemTax = document.getElementById("productTax").value;
    
    alert(itemQuantity);
    
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
            alert("you maybe did it!");
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error', error));

        getAll();
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
             var thebuttonid = "button" + i;
             var e = document.createTextNode(data[i].name);
             var f = document.createTextNode(data[i].price);
             var g = document.createTextNode(data[i].quantity);
             var h = document.createTextNode(data[i].taxRate);
             var ee = document.createElement("div");
             var ff = document.createElement("div");
             var gg = document.createElement("div");
             var hh = document.createElement("div");
             ee.appendChild(e);
             ff.appendChild(f);
             gg.appendChild(g);
             hh.appendChild(h);
           myTable += "<tr><td>" + ee.innerHTML + "</td><td>" + ff.innerHTML + "</td><td>" + gg.innerHTML + "</td><td>" + hh.innerHTML +  
        "</td><td><button onclick='deleteProduct(" + i + ")'>Delete</button></td><td>" + "</td><td><input type='number' min = "+ 0 +" name='amount'></td><td>" +
        "</td><td><button onclick='quantityUpdate("+ i + ',' + startRow +")'>Update Quantity</button></td><td>" + "</td><td><input type='number' min = "+ 0 +" name='amount'></td><td>" +
        "</td><td><button onclick='taxRateUpdate(" + i + ',' + startRow + ")'>Update Tax (%)</button></td>"
        myArray[i]= data[i]._id;
        startRow = startRow+1;
        }
        document.getElementById("basket").innerHTML = myTable;
    })
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
    
    getAll();
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
    
    getAll();
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
    getAll();
}
