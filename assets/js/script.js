let count = 0
let totalPrice = 0
let caddyArray = []

fetch("./assets/js/products.json")
.then(response => response.json())
.then(data => {
    document.getElementById("myLinks").addEventListener("click", (e) => {
        if(e.target.nodeName == "A") {
            let myData
            if(e.target.id == "clothes") {
                myData = data.clothes
            } else if (e.target.id == "figures") {
                myData = data.figures
            } else if (e.target.id == "goodies") {
                myData = data.goodies}
            else {
                myData = ""
            }
            console.log(myData)
            document.getElementById("contain").classList.add("container")
            document.getElementById("content").classList.add("bg-white", "mt-4")
            document.getElementById("content").innerHTML = ""
            myData.forEach((element, index) => {
                document.getElementById("content").innerHTML +=
                `
                <div class="col-4">
                    <div class="card m-auto mt-4 mb-4" style="width: 18rem;">
                        <img src="${element.img}" class="card-img-top" alt="Photo de T-Shirt Marvel ${index + 1}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">Prix : ${element.price}€</p>
                            <a href="#" class="btn btn-danger" id="button-${element.id}">Ajouter au panier</a>
                        </div>
                    </div>
                </div>
                `
            })
        }

    })

    document.getElementById("home").addEventListener("click", (e) => {
        if(e.target.nodeName == "A"){
            document.getElementById("contain").classList.remove("container")
            document.getElementById("content").classList.remove("bg-white", "mt-4")
            document.getElementById("content").innerHTML =
            `
            <div class="row justify-content-center" id="content">
                <div id="carouselExampleIndicators" class="carousel slide carousel-fade p-0 w-25 mt-5"
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
                <div class="col-5 bg-white mt-5 h2 text-center">
                    <br><br>
                    <p>Bienvenue sur le Marvel Store !!!</p>
                    <p>Ici vous pourrez acheter des vetements, des figurines ou des goodies crees autour de l'univers
                        Marvel.</p>
                    <p>Bonne visite à tous !!!</p>
                </div>
            </div>
            `
        }
    })

    document.getElementById("content").addEventListener("click", (e) => {
        if(e.target.nodeName == "A") {
            count++
            document.getElementById("caddy").innerHTML = `<i class="fas fa-shopping-basket h4 text-white mt-2"> Mon Panier (${count})</i>`
            let firstChar = e.target.id.split("-").pop().charAt(0)
            let lastChar = (e.target.id.split("-").pop().charAt(2)) - 1
            switch(firstChar) {
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
            console.log(caddyArray)
        }
    })

    document.getElementById("caddy").addEventListener("click", (e) => {

        if(e.target.nodeName == "I" && caddyArray[0] != undefined) {
            document.getElementById("contentCaddy").innerHTML = `<table class="table table-bordered"><tbody id="caddyTable"></tbody></table>`
            totalPrice = 0
            caddyArray.forEach(element => {
                document.getElementById("caddyTable").innerHTML +=
                `
                <tr class="align-baseline h5">
                    <td width="5%"><img class="mini" src=${element.img} alt="..."></td>
                    <td width="50%"><p>${element.title}</p></td>
                    <td width="20%"><p>${element.price}€</p></td>
                </tr>
                `
                totalPrice += element.price
            });
            document.getElementById("totalPrice").innerHTML = `Total : ${totalPrice}€`
        }
    })


})