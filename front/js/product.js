let params = new URL(document.location).searchParams;
let id = params.get("id");

let url = `http://localhost:3000/api/products/${id}`;

fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let item = document.querySelector('.item__img');
        let img = document.createElement('img'); 
        img.src = data.imageUrl;
        img.alt = data.altTxt;
        item.appendChild(img);

        let id = document.querySelector('h1');
        id.textContent = data.name;

        let prix = document.querySelector('span#price');
        prix.textContent = data.price;
        
        let Predescription = document.querySelector('.item__content__description__title').nextElementSibling;
        Predescription.textContent = data.description;

        //Couleurs
        const couleurs = data.colors;
        console.log(couleurs);
        let optionM = document.querySelector('select#colors');
        
        for (let c of couleurs){
            let option = document.createElement('option');
            option.textContent = c;
            optionM.appendChild(option);
        }

        //Bouton ajout au panier
       /* let  panier = document.querySelector('#addToCart');
        console.log(panier);
        panier.src = ".\html\cart.html";*/
    })



