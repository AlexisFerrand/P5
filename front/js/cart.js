let addProduit = JSON.parse(localStorage.getItem("product"));



const panierDisplay = async () => {
    
    if(addProduit){
         await addProduit;
         console.log(addProduit);

        let cart__items = document.getElementById('cart__items');

         cart__items.innerHTML = addProduit.map((product) => `
         <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
         <div class="cart__item__img">
          <img src="${product.img_url}" alt="Photographie du canapé ${product.name}">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__description">
             <h2>${product.name}</h2>
             <p>${product.color}</p>
             <p>${product.price} €</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : ${product.quantity}</p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
             </div>
             <div class="cart__item__content__settings__delete" data-id="${product._id}" data-color="${product.color}">
               <p class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article>`,);
        return;
       


    }
}
panierDisplay();


/*<article class=\"cart__item\" data-id=\"\" data-color=\"{product-color}\">
         <div class=\"cart__item__img\">
          <img src=\"\" alt=\"Photographie d\'un canapé\">
         </div>
         <div class=\"cart__item__content\">
           <div class=\"cart__item__content__description\">
             <h2>Nom du produit</h2>
             <p>Vert</p>
             <p>42,00 €</p>
           </div>
           <div class=\"cart__item__content__settings\">
             <div class=\"cart__item__content__settings__quantity\">
               <p>Qté : </p>
               <input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"42\">
             </div>
             <div class=\"cart__item__content__settings__delete\">
               <p class=\"deleteItem\">Supprimer</p>
             </div>
           </div>
         </div>
       </article>`;

       let test = localStorage.getItem("product");
       console.log(addProduit.name);
*/