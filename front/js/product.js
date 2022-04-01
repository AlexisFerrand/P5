//Cherche le paramétre de l'url et en extrait ensuite l'ID
let params = new URL(document.location).searchParams;
let idUrl = params.get("id");

let url = `http://localhost:3000/api/products/${idUrl}`;
//Va chercher grâce à fetch les données spécifique sur le produit cliqué
fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let item = document.querySelector('.item__img');
        let img = document.createElement('img');
        img.src = data.imageUrl;
        img.alt = data.altTxt;
        item.appendChild(img);

        let nameP = document.querySelector('h1');
        nameP.textContent = data.name;

        let priceP = document.querySelector('span#price');
        priceP.textContent = data.price;

        let predescription = document.querySelector('.item__content__description__title').nextElementSibling;
        predescription.textContent = data.description;

        //Couleurs
        const colorsP = data.colors;
        let optionM = document.querySelector('select#colors');

        for (let c of colorsP) {
            let option = document.createElement('option');
            option.textContent = c;
            option.value = c;
            optionM.appendChild(option);
        }

//Appel la fonction d'ajout au panier 
        addBasket();

    }).catch(function(error){
        console.log("Il y a une erreur :" + error);
    })


const addBasket = () => {
    //Boutton ajout au panier
    const button = document.querySelector('button');
//L'ajout au panier est paramétré pour fonctionner seulement si certaines conditions sont respéctées (couleur et quantité sélectionnée)
    button.addEventListener('click', function() {
        let colors = document.querySelector('#colors');
        let quantity = parseInt(document.querySelector('input').value);
        if (colors.value == "") {
            let label = document.querySelector('label[for="color-select"]');
            label.innerHTML = '<div style="color:red"><strong>Vous devez sélectionner une couleur pour continuer</strong></div>';
            //label.textContent = 'Choisir une couleur :';
        } else {
            let label = document.querySelector('label[for="color-select"]');
            label.textContent = 'Choisir une couleur :';
        }

        if (quantity <= 0) {
            let label2 = document.querySelector('label[for="itemQuantity"]');
            label2.innerHTML = '<div style="color:red"><strong>Il faut aumoins 1 article</strong></div>';
            //label2.textContent = 'Nombre d\'article(s) (1-100) :';
        } else {
            let label2 = document.querySelector('label[for="itemQuantity"]');
            label2.textContent = 'Nombre d\'article(s) (1-100) :';
        }
        //Si les conditions sont bien respéctées à ce moment là seulement le produit sélectionné est mis dans le localstorage
        if (quantity > 0 && colors.value != "") {
            let products = JSON.parse(localStorage.getItem('product'));
            let product = {
                '_id': idUrl,
                'color': colors.value,
                'quantity': quantity,
            };
            if (products === null) {
                console.log("vide");
                products = [];
                products.push(product);
            } else {
                let found = false;
                products.forEach(prod => {
                    if (prod._id === idUrl && prod.color === colors.value) {
                        prod.quantity = quantity + parseInt(prod.quantity);
                        found = true;
                    }
                });
                if (!found) {
                    products.push(product);
                }
            }
            localStorage.setItem('product', JSON.stringify(products));
            redirectUser();
        }
    })
};

function redirectUser() {
    if (confirm("Votre produit a été ajouté au panier, voulez vous continuer dans votre panier ?") == true) {
        window.location.href = "cart.html";
    } else {
        window.location.href = "index.html";
    }
}