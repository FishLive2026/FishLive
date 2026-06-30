import EventBus from "./EventBus.js";
import GameEvents from "./GameEvents.js";

class Engine {

    constructor(){

        this.bus = new EventBus();

        this.events = GameEvents;

    }

    on(event, callback){

        this.bus.on(event, callback);

    }

    emit(event, data){

        this.bus.emit(event, data);

    }

}

export default new Engine();