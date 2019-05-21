import PokemonService from "./PokemonService.js";

//Private

let _pokeService = new PokemonService()

function _drawApiPokemon() {
    let pokemon = _pokeService.ApiPokemon
    let template = ''
    for (let i = 0; i < pokemon.length; i++) {
        let poke = pokemon[i];
        template += `<li>${poke.name} <button onclick="app.controllers.pokeController.getDetails('${poke.name}')">Get Details</button></li>`
    }
    document.getElementById('api-pokemon').innerHTML = template
}

function _drawActivePokemon() {
    debugger
    document.getElementById("active-pokemon").innerHTML = _pokeService.ActivePokemon.Template
}

//Public
export default class PokemonController {
    constructor() {
        //Register Subscribers
        _pokeService.addSubscribers('apiPokemon', _drawApiPokemon)
        _pokeService.addSubscribers('activePokemon', _drawActivePokemon)
        //getData
        _pokeService.getApiPokemon()
    }

    getDetails(name) {
        _pokeService.getApiPokemon(name)
    }

    addPokemon() {
        _pokeService.addPokemon()
    }
}