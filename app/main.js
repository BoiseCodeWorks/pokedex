import PokemonController from "./components/PokemonController.js";


class App {
    constructor() {
        this.controllers = {
            pokeController: new PokemonController()
        }
    }
}

window['app'] = new App()