import { makeAutoObservable } from 'mobx';

class Store {
    products = []

    constructor() {
        this.products = [];
        makeAutoObservable(this);
    }

    setCards(cards) {
        this.products = cards;
    }

    getCards() {
        return this.products;
    }
}

const store = new Store();
export default store;
