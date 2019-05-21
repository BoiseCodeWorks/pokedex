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
    document.getElementById("active-pokemon").innerHTML = _pokeService.ActivePokemon.getTemplate(`<button onclick="app.controllers.pokeController.addPokemon()">Add to Pokedex</button>`)
}

function _drawMyPokemon() {
    let pokemon = _pokeService.MyPokemon
    let template = ''
    for (let i = 0; i < pokemon.length; i++) {
        let poke = pokemon[i];
        template += poke.getTemplate(`
        <button onclick="app.controllers.pokeController.removePokemon('${poke._id}')">Remove from Pokedex</button>`)
    }
    document.getElementById('my-pokemon').innerHTML = template
}

//Public
export default class PokemonController {
    constructor() {
        //Register Subscribers
        _pokeService.addSubscribers('apiPokemon', _drawApiPokemon)
        _pokeService.addSubscribers('activePokemon', _drawActivePokemon)
        _pokeService.addSubscribers('myPokemon', _drawMyPokemon)

        //getData
        _pokeService.getApiPokemon()
        _pokeService.getMyPokemon()
    }

    getDetails(name) {
        _pokeService.getApiPokemon(name)
    }

    addPokemon() {
        _pokeService.addPokemon()
    }

    removePokemon(id) {
        _pokeService.removePokemon(id)
    }
}