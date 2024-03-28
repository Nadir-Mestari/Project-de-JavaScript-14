
// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

const ContriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const btnSort = document.querySelectorAll(".btnSort");

let pays = [];
let sortMethod = "alpha";



const trie = async () => {

    await fetch("https://restcountries.com/v3.1/all")
        .then((req) => req.json())
        .then((code) => pays = code)


    console.log(pays)
    dispalymap();

};

function dispalymap() {



    ContriesContainer.innerHTML = pays
        .filter((pay) =>
            pay.name.common.toLowerCase().includes(inputSearch.value.toLowerCase())

        )
        .sort((a, b) => {
            if (sortMethod === "minToMax") {
                return a.population - b.population
            } else if (sortMethod === "maxToMin") {
                return b.population - a.population
            } else if (sortMethod === "alpha") {
                return a.name.common.localeCompare(b.name.common)
            }
        })
        .slice(0, inputRange.value)

        .map(
            (pay) =>



                `
            <div class="card">
            <div class="image">
            <img src="${pay.flags.svg}" alt="darpeau du ${pay.flags.alt}" >
            </div> 
            <h2>${pay.name.common}</h2>
              <h3>The capital : ${pay.capital}</h3>
            <p>The population : ${pay.population.toLocaleString()}</p>
            </div>
    `

        ).join("");


}


inputSearch.addEventListener("input", dispalymap)

window.addEventListener("load", trie)

inputRange.addEventListener("change", (e) => {
    rangeValue.textContent = inputRange.value
    dispalymap();
})

btnSort.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        sortMethod = e.target.id;
        dispalymap()
    })
})
