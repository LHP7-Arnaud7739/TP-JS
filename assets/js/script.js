let count = 0
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
            } else {
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

    document.getElementById("content").addEventListener("click", (e) => {
        if(e.target.nodeName == "A") {
            count++
            document.getElementById("caddy").innerHTML = `Mon Panier (${count})`
            caddyArray.push(e.target.id.split("-").pop())
            console.log(caddyArray)
        }
    })
})



// document.getElementById("clothes").addEventListener("click", () => {
//     document.getElementById("content").innerHTML = 

//     `
//    <div class="card" style="width: 18rem;">
//         <img src="..." class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">Card title</h5>
//             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             <a href="#" class="btn btn-primary">Go somewhere</a>
//         </div>
//     </div>
//     `
// })