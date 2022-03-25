let params = new URL(document.location).searchParams;
let idUrl = params.get("id");

let url = `http://localhost:3000/api/products/${idUrl}`;

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

        let nameP = document.querySelector('h1');
        nameP.textContent = data.name;

        let priceP = document.querySelector('span#price');
        priceP.textContent = data.price;
        
        let predescription = document.querySelector('.item__content__description__title').nextElementSibling;
        predescription.textContent = data.description;

        //Couleurs
        const colorsP = data.colors;
        let optionM = document.querySelector('select#colors');
        
        for (let c of colorsP){
            let option = document.createElement('option');
            option.textContent = c;
            option.value = c;
            optionM.appendChild(option);
        }


       addBasket();
       
    })
    






    const addBasket = () => {
        //Boutton ajout au panier
        const button = document.querySelector('button');

        button.addEventListener('click', function(){
            //Selecteur qui contient le choix de la couleur
            let colors = document.querySelector('#colors');
            const colorChoise = colors.value;
            let quantity = document.querySelector('input').value;
            quantity = Number(quantity);
            let h1 = document.getElementById('title');
            let price = document.getElementById('price');
            let img = document.querySelector('.item__img img');

            //Récupération données produits dans l'objet
            const product ={
                "name": h1.innerText,
                "color": colorChoise,
                "price": price.innerText,
                "quantity": quantity,
                "_id": idUrl,
                "img_url": img.src,
            }
            

            //Vérifie si une couleur est sélectionnée(message d'erreur)
            if(product.color == ""){
                //let a = document.createElement()
                let label = document.querySelector('label[for="color-select"]');
                label.innerHTML = '<div style="color:red"><strong>Vous devez sélectionner une couleur pour continuer</strong></div>';
            }else{
                let label = document.querySelector('label[for="color-select"]');
                label.textContent = 'Choisir une couleur :'
            }

            //Vérifie si une quantité est sélectionnée(message d'erreur)
            if(product.quantity == 0){
                let label2 = document.querySelector('label[for="itemQuantity"]');
                label2.innerHTML = '<div style="color:red"><strong>Il faut aumoins 1 article</strong></div>';
    
            }else{
                let label2 = document.querySelector('label[for="itemQuantity"]');
                label2.textContent = 'Nombre d\'article(s) (1-100) :';
            }

            let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

            if(productInLocalStorage == null){
                productInLocalStorage = [];
                productInLocalStorage.push(product);
                console.log(productInLocalStorage);
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            }
            else if(productInLocalStorage != null ){
                for(i = 0 ; i < productInLocalStorage.length; i++){
                    if(productInLocalStorage[i]._id == product._id && productInLocalStorage[i].color == product.color){
                        return(
                            productInLocalStorage[i].quantity += product.quantity,
                            console.log("ESSAI"),
                            localStorage.setItem("product", JSON.stringify(productInLocalStorage)),
                            (productInLocalStorage = JSON.parse(localStorage.getItem("productInLocalStorage")))
                        );
                    }
                }
                for (i = 0; i < productInLocalStorage.length; i++){

                }
            }
             
        });
        return (productInLocalStorage = JSON.parse(localStorage.getItem("product")));
    };


    
    
//---------------------LOCAL STORAGE-------------------------- //
            //---------------------RECUPERATION DES DONNEES PANIER -------------//
/*s --------- VERIFIER SI IL Y A DEJA LE MËME PRODUIT DANS LE LOCAL STORAGE
            if(productInLocalStorage){
                productInLocalStorage = [];
                productInLocalStorage.push(product);
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            }
            else{
                productInLocalStorage = [];
                productInLocalStorage.push(product);
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                
            }
            console.log(localStorage);
*/