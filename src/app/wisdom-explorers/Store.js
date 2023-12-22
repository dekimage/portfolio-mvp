// GameStore.js
import { makeAutoObservable } from "mobx";
import { allDecks } from "./data";

class GameStore {
  isGameStarted = false;
  playersCount = 0;
  players = [];

  activeCard = null;
  discardPile = [];

  selectedDecks = [];
  deck = [];

  players = [];
  activePlayerTurn = 0;

  globalRound = 1;
  totalVP = 0;

  vp = 0;
  turn = 1;

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
    this.setPlayersCount = this.setPlayersCount.bind(this);
    this.addOrUpdatePlayer = this.addOrUpdatePlayer.bind(this);
    this.playCard = this.playCard.bind(this);
  }

  initializeGame() {}

  get activePlayer() {
    return this.players[this.activePlayerTurn];
  }

  nextTurn() {
    if (this.activePlayerTurn < this.players.length - 1) {
      this.activePlayerTurn += 1;
    } else {
      this.activePlayerTurn = 0;
      this.globalRound += 1;
    }
  }

  playCard() {
    this.discardPile.push(this.activeCard);
    if (this.activeCard.rewardVp) {
      this.activePlayer.vp += this.activeCard.rewardVp;
      this.totalVP += this.activeCard.rewardVp;
    }
    this.activeCard = null;
  }

  addOrUpdatePlayer(player) {
    const existingPlayerIndex = this.players.findIndex(
      (p) => p.number === player.number
    );
    if (existingPlayerIndex >= 0) {
      this.players[existingPlayerIndex] = player;
    } else {
      this.players.push(player);
    }
  }

  get usedColors() {
    return this.players.map((player) => player.color);
  }

  isColorAvailable(color) {
    return !this.usedColors.includes(color);
  }

  setPlayersCount(playersCount) {
    this.playersCount = playersCount;
  }

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

  drawCard() {
    this.activeCard = this.deck.pop();
  }
}

export const gameStore = new GameStore(allDecks);
