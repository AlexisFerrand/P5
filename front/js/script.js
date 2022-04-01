let url = `http://localhost:3000/api/products`;

//Appel de l'API pour récupérer le tableau des produits
fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let items = document.querySelector('#items');
//Pour chaque produit présent dans le serveur les éléments ci dessous sont créés:
        for (let i of data){
        
            let a = document.createElement('a');
            a.href = `./product.html?id=${i._id}`;
            items.appendChild(a);

            let article = document.createElement('article');
            a.appendChild(article);

            let imgCrea = document.createElement('img');
            imgCrea.src = i.imageUrl;
            imgCrea.alt = i.altTxt;
            article.appendChild(imgCrea);

            let h3 = document.createElement('h3');
            h3.classList.add('productName');
            h3.textContent = i.name;
            article.appendChild(h3);

            let p = document.createElement('p');
            p.classList.add('productDescription');
            p.textContent = i.description; 
            article.appendChild(p);           
        }
    }).catch(function(error){
        console.log("Il y a eu une erreur dans l'importation des données :" + error);
    });
    

