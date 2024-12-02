import { makeAutoObservable } from 'mobx';

class Store {
    products = [];

    constructor() {
        makeAutoObservable(this);
    }

    setCards(cards) {
        this.products = cards;
    }

    getCards() {
        return this.products;
    }

    addCard(card) {
        this.products.push(card);
    }

    removeCard(cardId) {
        this.products = this.products.filter(product => product._id !== cardId);
    }

    updateCard(updatedCard) {
        const index = this.products.findIndex(product => product._id === updatedCard._id);
        if (index !== -1) {
            this.products[index] = updatedCard;
        }
    }
}

const store = new Store();
export default store;