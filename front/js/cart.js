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
//dans if addProduct ?
/*let ouai = document.querySelector('input[type="number"]');
console.log(ouai);
let quantity = document.querySelector('input').value;
document.querySelector('input[type="number"]').addEventListener('change', function (){
    console.log(ouai.value);
})*/

/*
let test = document.querySelectorAll('cart__item__content__settings__quantity.input');
console.log(test);
let quantitySelectorAll = document.getElementsByClassName('itemQuantity').value;
console.log(quantitySelectorAll);*/
/*
quantitySelectorAll.forEach((quantitySelector) =>{
    quantitySelector.addEventListener('change', function(){
        console.log('test');
})
})*/



//FORMULAIRE
let firstName = document.querySelector('input[id="firstName"]');
firstName.addEventListener('change', function() {
    let firstNameRegEx = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");

    let testFirstName = firstNameRegEx.test(firstName.value);
    let msgError = document.querySelector('#firstNameErrorMsg');

    if(testFirstName){
        
    }
    else if(testFirstName == false){
        msgError.innerHTML = `<div style="color:red"><strong>Le prénom saisie n\'est pas valide veuillez le modifie</strong></div>`;
    }

})




panierDisplay();
removeProduct();