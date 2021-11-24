let count = 0
let totalPrice = 0
let caddyArray = []

fetch("./assets/js/products.json")
    .then(response => response.json())
    .then(data => {

// Création des pages au clic sur liens de la navbar (vetements, figurines ou goodies)

        document.getElementById("myLinks").addEventListener("click", (e) => {
            if (e.target.nodeName == "A") {
                console.log(document.getElementById("myLinks"))
                e.target.classList.replace("text-white","text-danger")
                let myData
                if (e.target.id == "clothes") {
                    myData = data.clothes
                } else if (e.target.id == "figures") {
                    myData = data.figures
                } else if (e.target.id == "goodies") {
                    myData = data.goodies
                } else {
                    myData = ""
                }
                document.getElementById("contain").classList.add("container")
                document.getElementById("content").classList.add("bg-white", "mt-4")
                document.getElementById("content").innerHTML = ""
                myData.forEach((element, index) => {
                    document.getElementById("content").innerHTML +=
                        `
                <div class="col-lg-4">
                    <div class="card m-auto mt-4 mb-4" style="width: 18rem;">
                        <img src="${element.img}" class="card-img-top" alt="Photo de T-Shirt Marvel ${index + 1}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">Prix : ${element.price}€<br>Réf : ${element.id}</p>

                            <a href="#" class="btn btn-danger" id="button-${element.id}">Ajouter au panier</a>
                        </div>
                    </div>
                </div>
                `
                })
            }

        })

// Création de la page d'accueil à l'appui sur le logo du site

        document.getElementById("home").addEventListener("click", (e) => {
            if (e.target.nodeName == "A") {
                document.getElementById("contain").classList.remove("container")
                document.getElementById("content").classList.remove("bg-white", "mt-4")
                document.getElementById("content").innerHTML =
                `
                <div class="row justify-content-center m-0 p-0 mt-5" id="content">
                    <div id="carouselExampleIndicators" class="carousel slide carousel-fade p-0 col-lg-3"
                        data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="assets/img/carousel1.jpg" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="assets/img/carousel2.jpg" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="assets/img/carousel3.jpg" class="d-block w-100" alt="...">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div class="col-lg-5 bg-white text-center myText parent">
                        <p class="child">Bienvenue sur le Marvel Store !!!<br>
                        Ici vous pourrez acheter des vetements, des figurines ou des goodies crees autour de l'univers Marvel.<br>
                        Bonne visite à tous !!!</p>
                    </div>
                </div>
            `
            }
        })

// Placement des objets dans le panier grâce à un tableau et vérification si objet déjà présent ou non. Ajout de 1 a la quantité de cette objet dans le JSON

        document.getElementById("content").addEventListener("click", (e) => {
            if (e.target.nodeName == "A") {
                count++
                document.getElementById("caddy").innerHTML = `<i class="myLogo"><img src="https://img.icons8.com/material-outlined/24/ffffff/shopping-cart--v1.png"/><span>${count}</span></i>`
                let verifId = e.target.id.split("-").pop()
                let presentElement = 0
                caddyArray.forEach(element => {
                    if (verifId == element.id) {
                        presentElement++
                    }
                })

                let firstChar = e.target.id.split("-").pop().charAt(0)
                let lastChar = (e.target.id.split("-").pop().charAt(2)) - 1
                if (presentElement == 0) {
                    switch (firstChar) {
                        case "1":
                            caddyArray.push(data.clothes[lastChar])
                            break;
                        case "2":
                            caddyArray.push(data.figures[lastChar])
                            break;
                        case "3":
                            caddyArray.push(data.goodies[lastChar])
                            break;
                        default:
                            break;
                    }
                }
                switch (firstChar) {
                    case "1":
                        data.clothes[lastChar].qty++
                        break;
                    case "2":
                        data.figures[lastChar].qty++
                        break;
                    case "3":
                        data.goodies[lastChar].qty++
                        break;
                    default:
                        break;
                }
                
            }
        })

// Création du panier à l'appui sur le bouton "Mon Panier" à l'aide du tableau contenant les objets ajoutés.

        document.getElementById("caddy").addEventListener("click", (e) => {

            if (e.target.nodeName == "IMG" && caddyArray[0] != undefined) {
                document.getElementById("contentCaddy").innerHTML = `<table class="table table-bordered"><tbody id="caddyTable"></tbody></table>`
                totalPrice = 0
                caddyArray.forEach((element, index) => {
                    document.getElementById("caddyTable").innerHTML +=
                        `
                        <tr class="alignAll h5">
                            <td class="mediaQ"><img class="mini" src=${element.img} alt="..."></td>
                            <td width="25%" class="text-start"><p>${element.title} / Réf : ${element.id}</p></td>
                            <td width="10%" id="qtyObj${index}" class="text-center">
                                <a href="#" class="btn btn-secondary bg-secondary" id="qtyLess-${index}">-</a>
                                <span id="myQty${index}">${element.qty}</span>
                                <a href="#" class="btn btn-secondary bg-secondary" id="qtyMore-${index}">+</a>
                            </td>
                            <td width="10%" class="text-center"><p id="myPrice${index}">${Number(element.price * element.qty).toFixed(2)}€</p></td>
                        </tr>
                        `
                    totalPrice += element.price * element.qty
                });
                document.getElementById("totalPrice").innerHTML = `Total : ${Number(totalPrice).toFixed(2)}€ <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" id="valid">Commander</button>`
            }
        })

// Augmentation et diminution des quantités des objets du panier ou suppression de ces derniers lorsque le nombre atteint 0 

        document.getElementById("myModal").addEventListener("click", (e) => {
            if (e.target.nodeName == "A") {
                myIndex = e.target.id.split("-").pop()
                moreOrLess = e.target.id.split("-").shift()
                if (moreOrLess == "qtyMore") {
                    caddyArray[myIndex].qty++
                    count++
                } else if (moreOrLess == "qtyLess") {
                    caddyArray[myIndex].qty--
                    count--
                }
                if(count == 0){
                    document.getElementById("caddy").innerHTML = `<i class="myLogo"><img src="https://img.icons8.com/material-outlined/24/ffffff/shopping-cart--v1.png"/></i>`
                } else {
                    document.getElementById("caddy").innerHTML = `<i class="myLogo"><img src="https://img.icons8.com/material-outlined/24/ffffff/shopping-cart--v1.png"/><span>${count}</span></i>`
                }
                
                
                if (caddyArray[myIndex].qty < 1) {
                    if(myIndex == 0){
                        caddyArray.shift()
                    } else {
                        caddyArray.splice(myIndex, 1)
                    }
                    document.getElementById("contentCaddy").innerHTML = `<table class="table table-bordered"><tbody id="caddyTable"></tbody></table>`
                    totalPrice = 0
                    caddyArray.forEach((element, index) => {
                        document.getElementById("caddyTable").innerHTML +=
                            `
                            <tr class="align-baseline h5">
                                <td class="mediaQ"><img class="mini" src=${element.img} alt="..."></td>
                                <td width="25%" class="text-start"><p>${element.title} / Réf : ${element.id}</p></td>
                                <td width="10%" id="qtyObj${index}" class="text-center">
                                    <a href="#" class="btn btn-secondary bg-secondary" id="qtyLess-${index}">-</a>
                                    <span id="myQty${index}">${element.qty}</span>
                                    <a href="#" class="btn btn-secondary bg-secondary" id="qtyMore-${index}">+</a>
                                </td>
                                <td width="10%" class="text-center"><p id="myPrice${index}">${Number(element.price * element.qty).toFixed(2)}€</p></td>
                            </tr>
                            `
                        totalPrice += element.price * element.qty
                    });
                    document.getElementById("totalPrice").innerHTML = `Total : ${Number(totalPrice).toFixed(2)}€ <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" id="valid">Commander</button>`

                } else {
                    document.getElementById(`myQty${myIndex}`).innerHTML = caddyArray[myIndex].qty
                    document.getElementById(`myPrice${myIndex}`).innerHTML = `${(Number(caddyArray[myIndex].price * caddyArray[myIndex].qty).toFixed(2))}€`
                    totalPrice = 0
                    caddyArray.forEach((element) => {
                        totalPrice += element.price * element.qty
                    })
                    document.getElementById("totalPrice").innerHTML = `Total : ${Number(totalPrice).toFixed(2)}€ <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" id="valid">Commander</button>`
                }
                if(caddyArray[0] == undefined){
                    document.getElementById("contentCaddy").innerHTML = "Votre panier est vide"
                    document.getElementById("totalPrice").innerHTML = ""
                }
            }
        })
    })