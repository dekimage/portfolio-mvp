import { makeAutoObservable } from "mobx";
import axios from "axios";

class CardStore {
  cards = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchCards = async () => {
    try {
      const response = await axios.get(
        "https://backend-actionise.herokuapp.com/api/cards?populate=image&populate=realm&populate=realm.image&populate=actions&populate=actions.steps"
      );
      this.cards = response.data.data.map((card) => ({
        id: card.id,
        imageUrl: card.attributes.image?.data?.attributes?.url,
        realmName: card.attributes.realm?.data?.attributes?.name,
        realmImageUrl:
          card.attributes.realm?.data?.attributes?.image?.data?.attributes?.url,
        ...card.attributes,
        color: card.attributes.realm?.data?.attributes?.color,
        actions: card.attributes.actions.data.map((action) => ({
          id: action.id,
          ...action.attributes,
          steps: action.attributes.steps.map((step) => ({
            id: step.id,
            ...step,
          })),
        })),
      }));
    } catch (error) {
      console.error("Failed to fetch cards", error);
    }
  };
}

export const cardStore = new CardStore();
