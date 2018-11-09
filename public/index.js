

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
    const url = 'https://se3316-amavrou-lab3-amavrou.c9users.io/products/create';
    fetch(url)
    .then((resp)=> resp.json())
    .then(function(data){
        if(data.length>0){
            for(i=0; i< data.length; i++){
                console.log(i.toString(i));
                removeElement(String.toString(i));
            }
        }
        for(i = 0; i<data.length; i++){
            createElement("LI","1", data[i].name + "," data[i].price + "," data[i].taxRate);
            console.log(data[i].name);
        }
    })
}


