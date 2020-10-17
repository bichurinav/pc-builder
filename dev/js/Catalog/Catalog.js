import Events from 'events';
import LoadComponents from './LoadComponents';


class Catalog extends Events {
    constructor() {
        super()
        this.loadComponents = new LoadComponents();

        this.on('utils', (params) => {
            this.loadComponents.emit('utils', params)
        })


    }
}

export default Catalog;