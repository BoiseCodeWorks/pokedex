export default class Pokemon {
    constructor(data) {
        this.name = data.name
        this.img = data.img || data.sprites.front_shiny
        this.description = data.description || ''
        this.weight = data.weight
        this.height = data.height
        this.types = data.types
    }

    get Template() {
        return `<div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${this.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">Height: ${this.height}</p>
                <p class="card-text">Weight: ${this.weight}</p>
                <button onclick="app.controllers.pokeController.addPokemon()">Add to Pokedex</button>
        </div>
      </div>`
    }
}