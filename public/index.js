

function hola(){
    const url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/create';
// The data we are going to send in our request
let data = {
    name: 'chrisssyyy',
    price: '77',
    taxRate: '9'
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
}).then(res => res.json()).success(function(data) {
          alert(data._id["$oid"]);
      })
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error))
}

function getAll(){
    removeAll();
    const url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/getall';
    fetch(url)
    .then((resp)=> resp.json())
    .then(function(data){
        if(data.length>0){
            for(i=0; i< data.length; i++){
                data[i]._id;
                console.log(i.toString(i));
            }
        }
        for(i = 0; i<data.length; i++){
           createElement("LI",(i).toString(), data[i].name + "," data[i].price + "," data[i].taxRate);
            console.log(data[i].name);
        }
    })
}

function removeAll(){
    //fetch url
    for (int i=0;i<data.length;i++){
        removeElement((i).toString());
    }
}

function createElement(element, elementId){
   var a = document.createElement(element);
   a.setAttribute('id', elementId);
   var b = document.createTextNode();
   a.appendChild(b);
}

function removeElement(theid){
    var element = document.getElementById(theid)
    element.parentElement.removeChild(element);
}
