

function hola(){
    const url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/create';
// The data we are going to send in our request
var itemName = document.getElementById("productName").value;
var itemPrice = document.getElementById("productPrice").value;
var itemQuantity = document.getElementById("productQuantity").value;
var itemTax = document.getElementById("productTax").value;
let data = {
    name: itemName,
    price: itemPrice,
    taxRate: itemQuantity,
    quantity: itemTax
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

var myArray = [];

function getAll(){
    removeAll();
    const url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/getall';
    fetch(url)
    .then((resp)=> resp.json())
    .then(function(data){
        for(i = 0; i< data.length; i++){
           createElement("LI",(i).toString(), data[i].name + "," + data[i].price + "," + data[i].taxRate + "," + data[i].quantity);
           myArray[i]= data[i]._id;
            console.log(data[i].name);
        }
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

function createElement(element, elementId, itemDetails){
   var a = document.createElement(element);
   var b = document.createTextNode(itemDetails);
   a.setAttribute('id', elementId);
   a.appendChild(b);
   document.body.appendChild(a);
}

function removeElement(theid){
    var element = document.getElementById(theid)
    element.parentElement.removeChild(element);
}

function quantityUpdate(updateItemId, newQuantity){
    var url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/update/' + updateItemId;
    
    var data = {
        quantity: newQuantity
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
