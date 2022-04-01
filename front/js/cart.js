const cartItems = document.getElementById("cart__items");
var productSaved = JSON.parse(localStorage.getItem('product'));

function panierDisplay() {
    if (productSaved == null || productSaved == [] || productSaved.length < 1) {
        cartItems.innerHTML = 'Votre panier est vide.';
        calculPrixTotal();
        document.getElementById('order').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Votre panier est vide.');
        })
    } else {
        cartItems.innerHTML = "";
        let counter = 0;
        productSaved.forEach(oneProduct => {
            let productId = oneProduct._id;
            fetch(`http://localhost:3000/api/products/${productId}`)
                .then(function(response) {
                    return response.json();
                }).then(function(resolve) {
                    let product = {
                        'color': oneProduct.color,
                        'quantity': parseInt(oneProduct.quantity),
                        'name': resolve.name,
                        'price': resolve.price,
                        'imgUrl': resolve.imageUrl,
                        '_id': productId,
                    };
                    cartItems.innerHTML += `
                    <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                    <div class="cart__item__img">
                    <img src="${product.imgUrl}" alt="Photographie du canapé ${product.name}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p id='productPrice_${product._id}_${product.color}'>${product.price * parseInt(product.quantity) } €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete" data-id="${product._id}" data-color="${product.color}">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>`;
                    counter++;
                    return counter;
                }).then(function(counter) {
                    if (counter == productSaved.length) {
                        calculPrixTotal();
                        changeQuantite();
                        removeProduct();
                    }
                })
        })
    }
}

const calculPrixTotal = () => {
    let total = 0;
    let qteTotal = 0;
    productSaved = JSON.parse(localStorage.getItem('product'));
    productSaved.forEach(oneProduct => {
        let productId = oneProduct._id;
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(item => item.json())
            .then(data => {
                total += data.price * parseInt(oneProduct.quantity);
                try {
                    document.getElementById('productPrice_' + productId + "_" + oneProduct.color).innerHTML = (data.price * parseInt(oneProduct.quantity)) + " €";
                } catch (error) { console.log(error) }
                qteTotal += parseInt(oneProduct.quantity);
                document.getElementById('totalPrice').innerHTML = total;
                document.getElementById('totalQuantity').innerHTML = qteTotal;
            })
    });
    if (productSaved.length < 1) {
        document.getElementById('totalPrice').innerHTML = 0;
        document.getElementById('totalQuantity').innerHTML = 0;
    }
}

const changeQuantite = () => {
    const quantityInputs = document.querySelectorAll('.itemQuantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const articleToRemove = input.closest('article');
            const idProductToChange = articleToRemove.getAttribute('data-id');
            const colorProductToChange = articleToRemove.getAttribute('data-color');
            let finalProductSave = [];
            productSaved.forEach(product => {
                if (product._id === idProductToChange && product.color === colorProductToChange) {
                    if (input.value < 0) {
                        finalProductSave.push(product);
                        alert("la quantite doit etre supérieure ou égale à zéro");
                    } else if (input.value == 0) {
                        articleToRemove.remove();
                    } else {
                        product.quantity = input.value;
                        finalProductSave.push(product);
                    }
                } else {
                    finalProductSave.push(product);
                }
                localStorage.setItem(('product'), JSON.stringify(finalProductSave));
                calculPrixTotal();
            });
        })
    })
}

///// Fonction suppression de produit //////
function removeProduct() {
    const deleteBtns = document.querySelectorAll('.deleteItem');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const articleToRemove = btn.closest('article');
            const idProductToDelete = articleToRemove.getAttribute('data-id');
            const colorProductToDelete = articleToRemove.getAttribute('data-color');
            productSaved = JSON.parse(localStorage.getItem('product'));
            let finalProductSave = [];
            productSaved.forEach(product => {
                if (product._id === idProductToDelete && product.color === colorProductToDelete) {
                    articleToRemove.remove();
                } else {
                    finalProductSave.push(product);
                }
            });
            console.log(finalProductSave);
            localStorage.setItem(('product'), JSON.stringify(finalProductSave));
            productSaved = JSON.parse(localStorage.getItem('product'));
            calculPrixTotal();
        });
    })
}


// Validation Prénom //
let aFirstName = false;
const firstNameValidator = () => {
    let firstName = document.querySelector('input[id="firstName"]');
    firstName.addEventListener('change', function() {
        let firstNameRegEx = new RegExp("^[a-zA-Z\-']+$", "g");

        // On test l'expression régulaire //
        let testFirstName = firstNameRegEx.test(firstName.value);
        let msgError = document.querySelector('#firstNameErrorMsg');

        if (testFirstName) {
            msgError.innerHTML = "Prénom valide";
            aFirstName = true;
        } else if (testFirstName == false) {
            msgError.innerHTML = `<div style="color:red"><strong>Le prénom saisie n\'est pas valide veuillez le modifier</strong></div>`;
            aFirstName = false;
        }

    })
}



// Validation Nom //
let aLastName = false;
const lastNameValidator = () => {
    let lastName = document.querySelector('input[id="lastName"]');
    lastName.addEventListener('change', function() {
        let lastNameRegEx = new RegExp("^[a-zA-Z\-']+$", "g");

        // On test l'expression régulaire //
        let testLastName = lastNameRegEx.test(lastName.value);
        let msgError = document.querySelector('#lastNameErrorMsg');

        if (testLastName) {
            msgError.innerHTML = "Nom valide";
            aLastName = true;
        } else if (testLastName == false) {
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
        let addressRegEx = new RegExp("^([a-zA-Z0-9\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z0-9\u0080-\u024F]*$", "g");

        // On test l'expression régulaire //
        let testAddress = addressRegEx.test(address.value);
        let msgError = document.querySelector('#addressErrorMsg');

        if (testAddress) {
            msgError.innerHTML = "Adresse valide";
            aAddress = true;
        } else if (testAddress == false) {
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
        let cityRegEx = new RegExp(`^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`, 'g');

        // On test l'expression régulaire //
        let testCity = cityRegEx.test(city.value);
        let msgError = document.querySelector('#cityErrorMsg');

        if (testCity) {
            msgError.innerHTML = "Adresse valide";
            aCity = true;
        } else if (testCity == false) {
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

        if (testEmail) {
            msgError.innerHTML = "E-mail valide";
            aEmail = true;
        } else if (testEmail == false) {
            msgError.innerHTML = `<div style="color:red"><strong>L'adresse mail saisie n\'est pas valide veuillez la modifier</strong></div>`;
            aEmail = false;
        }

    })
}
const validationSubmit = () => {
    document.querySelector('input[type="submit"]').addEventListener('click', function(e) {
        e.preventDefault();
        if (aFirstName == true && aLastName == true && aAddress == true && aCity == true && aEmail == true) {
            const contact = {
                'firstName': document.querySelector('input[name="firstName"]').value,
                'lastName': document.querySelector('input[name="lastName"]').value,
                'address': document.querySelector('input[name="address"]').value,
                'city': document.querySelector('input[name="city"]').value,
                'email': document.querySelector('input[name="email"]').value,
            }
            const products = [];

            productSaved.forEach(prod => {
                products.push(prod._id);
            })

            const sendBack = {
                contact,
                products,
            }

            //Envoi de l'objet "sendBack" vers le serveur
            const promise01 = fetch('http://localhost:3000/api/products/order', {
                method: "POST",
                body: JSON.stringify(sendBack),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            promise01.then(async(response) => {
                try {
                    const contenu = await response.json();
                    localStorage.removeItem('product');
                    window.location.href = "confirmation.html?order=" + contenu.orderId;
                } catch (e) {
                    console.log(e);
                }
            })

        }
    })
}

panierDisplay();
firstNameValidator();
lastNameValidator();
addressValidator();
cityValidator();
emailValidator();
validationSubmit();