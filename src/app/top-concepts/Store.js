// GameStore.js
import { makeAutoObservable } from "mobx";
import { data } from "./data";

class GameStore {
  allCards = data.allCards;
  hand = [];
  discardPile = [];
  deck = data.startingDeck;
  marketplace = [];
  gold = 0;
  turn = 1;
  HAND_SIZE = 3;

  constructor(cards) {
    makeAutoObservable(this);
    this.allCards = cards.allCards;
    this.deck = cards.startingDeck;
    this.initializeGame();

    this.nextTurn = this.nextTurn.bind(this);
    this.discardHand = this.discardHand.bind(this);
    this.drawCards = this.drawCards.bind(this);
    this.reshuffleDiscardIntoDeck = this.reshuffleDiscardIntoDeck.bind(this);
    this.buyCard = this.buyCard.bind(this);
    this.completeCard = this.completeCard.bind(this);
    this.drawRandomCards = this.drawRandomCards.bind(this);
  }

  drawRandomCards(sourceArray, number) {
    let result = [];
    let arrayCopy = [...sourceArray];

    for (let i = 0; i < number && arrayCopy.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);
      result.push(arrayCopy[randomIndex]);
      arrayCopy.splice(randomIndex, 1);
    }

    return [result, arrayCopy];
  }

  initializeGame() {
    let [marketCards, remainingCardsAfterMarket] = this.drawRandomCards(
      this.allCards,
      3
    );
    this.marketplace = marketCards;
    this.allCards = remainingCardsAfterMarket;

    let [handCards, remainingCardsAfterHand] = this.drawRandomCards(
      this.deck,
      this.HAND_SIZE
    );
    this.hand = handCards;
    this.deck = remainingCardsAfterHand;
  }

  completeCard(cardId) {
    const completedCard = this.hand.find((card) => card.id === cardId);
    this.hand = this.hand.filter((card) => card.id !== cardId);
    this.discardPile.push(completedCard);
    this.gold += completedCard.goldReward;
  }

  buyCard(cardId) {
    const cardToBuy = this.marketplace.find((card) => card.id === cardId);
    if (this.gold >= cardToBuy.goldCost) {
      this.deck.push(cardToBuy);
      this.marketplace = this.marketplace.filter((card) => card.id !== cardId);
      this.gold -= cardToBuy.goldCost;
    } else {
      // Handle insufficient gold - show message to user or similar
    }
  }

  reshuffleDiscardIntoDeck() {
    this.deck = [...this.deck, ...this.discardPile];
    this.deck.sort(() => Math.random() - 0.5); // Simple shuffle
    this.discardPile = [];
  }

  nextTurn() {
    this.turn += 1;
    this.discardHand();

    if (this.deck.length < this.HAND_SIZE) {
      this.drawCards(this.deck.length);
      this.reshuffleDiscardIntoDeck();
      this.drawCards(this.HAND_SIZE - this.deck.length);
    } else {
      this.drawCards(this.HAND_SIZE);
    }
  }

  discardHand() {
    this.discardPile.push(...this.hand);
    this.hand = [];
  }

  drawCards(numCards) {
    const drawnCards = this.deck.slice(0, numCards);
    this.hand.push(...drawnCards);
    this.deck = this.deck.slice(numCards);
  }
}

export const gameStore = new GameStore(data);
