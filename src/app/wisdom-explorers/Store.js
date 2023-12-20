// GameStore.js
import { makeAutoObservable } from "mobx";
import { allDecks } from "./data";

class GameStore {
  activeCard = null;
  discardPile = [];
  vp = 0;
  turn = 1;
  selectedDecks = [];
  deck = [];

  constructor(cards) {
    makeAutoObservable(this);

    this.deck = [];
    // this.initializeGame();
    this.nextTurn = this.nextTurn.bind(this);
    this.drawCard = this.drawCard.bind(this);
    this.completeCard = this.completeCard.bind(this);
    this.discardCard = this.discardCard.bind(this);
    this.createDeck = this.createDeck.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  initializeGame() {}

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createDeck(deckIds) {
    const combinedDeck = deckIds
      .map((deckId) => allDecks.find((deck) => deck.id === deckId))
      .reduce((acc, deck) => [...acc, ...deck.deck], []);
    this.deck = this.shuffle(combinedDeck);
    this.isGameStarted = true;
  }

  discardCard() {
    this.discardPile.push(this.activeCard);
    this.activeCard = null;
  }

  completeCard() {
    this.discardPile.push(this.activeCard);
    this.vp += this.activeCard.vpReward;
    this.activeCard = null;
  }

  nextTurn() {
    this.turn += 1;
  }

  drawCard() {
    this.activeCard = this.deck.pop();
  }
}

export const gameStore = new GameStore(allDecks);
