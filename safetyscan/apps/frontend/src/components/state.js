import EmptyListResults from './EmptyResults';


let store = {
    state:{data:EmptyListResults},
    _paramRequest: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text:'propanol, ethanol, butanol, methanol'})
    },
    getState () {    
        // содержимое запроса
        fetch("api/test", this._paramRequest)
        .then(response => {return response.json();})
        .then((data) => {console.log(data);});
        //.then(data => this.state.data = data);
    },
    reRenderDOM () {


    },

    subscribe (observer) {
        this.reRenderDOM = observer;
    } 

}

export default store;
