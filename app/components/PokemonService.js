import Pokemon from "../models/Pokemon.js";

//Private
let _pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/MarkTest/pokemon'
})


let _state = { // data
    apiPokemon: [],
    activePokemon: {},
    myPokemon: []
}

let _subscribers = { //functions to run when data changes
    apiPokemon: [],
    myPokemon: [],
    activePokemon: []
}

function _setState(propName, data) {
    _state[propName] = data
    _subscribers[propName].forEach(fn => fn())
}

//Public
export default class PokemonService {

    addSubscribers(propName, fn) {
        _subscribers[propName].push(fn)
    }

    get ApiPokemon() {
        return _state.apiPokemon
    }

    get MyPokemon() {
        return _state.myPokemon.map(p => new Pokemon(p))
    }

    get ActivePokemon() {
        return new Pokemon(_state.activePokemon)
    }


    getApiPokemon(name) {
        name = name || ''
        _pokeApi.get(name) //send request to api
            .then(response => {
                let pokemonData = response.data
                if (!name) {
                    _setState('apiPokemon', pokemonData.results)
                } else {
                    _setState('activePokemon', new Pokemon(pokemonData))
                }
            })
    }

    addPokemon() {
        _sandbox.post('', _state.activePokemon) //create pokemon in database
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    deleteFromPokedex(id) {
        _sandbox.delete(id)
    }

}