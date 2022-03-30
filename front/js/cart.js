let someProduct = [];
let addProduct = JSON.parse(localStorage.getItem("product"));


/// Fonction d'ajout de produit au panier ///
const panierDisplay = async () => {
    
    if(addProduct){
         await addProduct;
         console.log(addProduct);

        let cart__items = document.getElementById('cart__items');

         cart__items.innerHTML = addProduct.map((product) => `
         <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
         <div class="cart__item__img">
          <img src="${product.img_url}" alt="Photographie du canapé ${product.name}">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__description">
             <h2>${product.name}</h2>
             <p>${product.color}</p>
             <p>${product.price * product.quantity } €</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : ${product.quantity}</p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
             </div>
             <div class="cart__item__content__settings__delete" data-id="${product._id}" data-color="${product.color}">
               <p class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article>`,);
        return;
        
    }


/// Fais le total article + total prix ///
    let totalQ = 0;
    let totalPrice = 0;
for(i = 0 ; i < addProduct.length; i++){
    totalQ += addProduct[i].quantity;
    document.querySelector('#totalQuantity').textContent = totalQ;
    
    totalPrice += addProduct[i].price * addProduct[i].quantity;
    console.log(totalPrice);
    document.querySelector('#totalPrice').textContent = totalPrice;
}
}

///// Fonction suppression de produit //////
const removeProduct = async (panierDisplay) => {
    await panierDisplay;
    console.log('salut');
    let corbeilles = document.querySelectorAll('.cart__item__content__settings__delete');
    console.log(corbeilles);

    corbeilles.forEach((corbeille) => {
        corbeille.addEventListener("click", function(){
            
            let removeAllProduct = addProduct.length;

            console.log("bonjour");
           
            addProduct = addProduct.filter(el => corbeille.dataset.id != el._id || corbeille.dataset.color != el.color);
            console.log(addProduct);
            localStorage.setItem("product", JSON.stringify(addProduct));
            window.location.href = "cart.html";    

            if(addProduct.length == 0){
                localStorage.clear("product");
                window.location.href = "index.html";
            }
        
        })
    })

    /// Fais le total article + total prix ///
    let totalQ = 0;
    let totalPrice = 0;
for(i = 0 ; i < addProduct.length; i++){
    totalQ += addProduct[i].quantity;
    document.querySelector('#totalQuantity').textContent = totalQ;
    
    totalPrice += addProduct[i].price * addProduct[i].quantity;
    console.log(totalPrice);
    document.querySelector('#totalPrice').textContent = totalPrice;
}
};




                // Validation Prénom //
let aFirstName = false;
const firstNameValidator = () => {
let firstName = document.querySelector('input[id="firstName"]');
firstName.addEventListener('change', function() {
    let firstNameRegEx = new RegExp("^[a-zA-Z\-']+$", "g");

    // On test l'expression régulaire //
    let testFirstName = firstNameRegEx.test(firstName.value);
    let msgError = document.querySelector('#firstNameErrorMsg');

    if(testFirstName){
         msgError.innerHTML = "Prénom valide";
         aFirstName = true;
    }
    else if(testFirstName == false){
        msgError.innerHTML = `<div style="color:red"><strong>Le prénom saisie n\'est pas valide veuillez le modifier</strong></div>`;
        aFirstName = false;
    }
    
})}



// Validation Nom //
let aLastName = false;
const lastNameValidator = () => {
let lastName = document.querySelector('input[id="lastName"]');
lastName.addEventListener('change', function() {
    let lastNameRegEx = new RegExp("^[a-zA-Z\-']+$", "g");

    // On test l'expression régulaire //
    let testLastName = lastNameRegEx.test(lastName.value);
    let msgError = document.querySelector('#lastNameErrorMsg');

    if(testLastName){
         msgError.innerHTML = "Nom valide";
         aLastName = true;
    }
    else if(testLastName == false){
        msgError.innerHTML = `<div style="color:red"><strong>Le nom saisie n\'est pas valide veuillez le modifier</strong></div>`;
        aLastName = false;
    }

})
}

// Validation Adresse //
let aAddress = false;
const addressValidator = () => {
let address = document.querySelector('input[id="address"]');
address.addEventListener('change', function() {
    let addressRegEx = new RegExp("^([a-zA-Z0-9\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z0-9\u0080-\u024F]*$" , "g");

    // On test l'expression régulaire //
    let testAddress = addressRegEx.test(address.value);
    let msgError = document.querySelector('#addressErrorMsg');

    if(testAddress){
         msgError.innerHTML = "Adresse valide";
         aAddress = true;
    }
    else if(testAddress == false){
        msgError.innerHTML = `<div style="color:red"><strong>L'adresse saisie n\'est pas valide veuillez la modifier</strong></div>`;
        aAddress = false;
    }

})
}

///VILLE
let aCity = false;
const cityValidator = () => {
    let city = document.querySelector('input[id="city"]');
    city.addEventListener('change', function() {
        let cityRegEx = new RegExp(`^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`,'g');
    
        // On test l'expression régulaire //
        let testCity = cityRegEx.test(city.value);
        let msgError = document.querySelector('#cityErrorMsg');
    
        if(testCity){
             msgError.innerHTML = "Adresse valide";
             aCity = true;
        }
        else if(testCity == false){
            msgError.innerHTML = `<div style="color:red"><strong>La ville saisie n\'est pas valide veuillez la modifier</strong></div>`;
            aCity = false;
        }
    
    })
    }


// Validation e-mail //
let aEmail = false;
const emailValidator = () => {
    let email = document.querySelector('input[id="email"]');
    email.addEventListener('change', function() {
        let emailRegEx = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    
        // On test l'expression régulaire //
        let testEmail = emailRegEx.test(email.value);
        let msgError = document.querySelector('#emailErrorMsg');
    
        if(testEmail){
             msgError.innerHTML = "E-mail valide";
             aEmail = true;
        }
        else if(testEmail == false){
            msgError.innerHTML = `<div style="color:red"><strong>L'adresse mail saisie n\'est pas valide veuillez la modifier</strong></div>`;
            aEmail = false;
        }
    
    })
    }
const validationSubmit = () => {
document.querySelector('input[type="submit"]').addEventListener('click', function (e){
    e.preventDefault();
    if(aFirstName == true && aLastName == true && aAddress == true && aCity == true && aEmail == true){
        const contact = {
            'firstName': document.querySelector('input[name="firstName"]').value,
            'lastName': document.querySelector('input[name="lastName"]').value,
            'address': document.querySelector('input[name="address"]').value,
            'city': document.querySelector('input[name="city"]').value,
            'email': document.querySelector('input[name="email"]').value,
        }
        

        const sendBack = {
            contact,
            addProduct,
        }

        localStorage.setItem('contact', JSON.stringify(contact));
        localStorage.setItem('addProduct', JSON.stringify(addProduct));
        

      /*  //Envoi de l'objet "sendBack" vers le serveur
        const promise01 = fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            body: JSON.stringify(sendBack),
            headers: {
                "Content-Type" : "application/json",
            },
        });

        promise01.then(async(response)=>{
            try{
                console.log("response");
                console.log(response);

                const contenu = await response.JSON();
                console.log(contenu);
            }catch(e){
                console.log(e);
            }
        })
    }else{
        
        
    }*/
}})
}

panierDisplay();
removeProduct();
firstNameValidator();
lastNameValidator();
addressValidator();
cityValidator();
emailValidator();
validationSubmit();


