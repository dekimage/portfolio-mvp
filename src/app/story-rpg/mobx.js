import { makeAutoObservable, runInAction } from "mobx";

import { rooms, items, stats } from "./data";

class Store {
  pages = rooms;
  items = items;
  stats = stats;

  inventory = [];
  usedOptions = [];

  activePage = this.pages[0];

  constructor() {
    makeAutoObservable(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.setActivePage = this.setActivePage.bind(this);
    this.updateStat = this.updateStat.bind(this);
    this.addItemToInventory = this.addItemToInventory.bind(this);
    this.isOptionUnlocked = this.isOptionUnlocked.bind(this);
    this.findItem = this.findItem.bind(this);
    this.findStat = this.findStat.bind(this);
    this.hasItem = this.hasItem.bind(this);
    this.meetsStatCondition = this.meetsStatCondition.bind(this);
    this.useOption = this.useOption.bind(this);
    this.getOptionUsage = this.getOptionUsage.bind(this);
  }

  useOption(optionIndex) {
    const pageUsage = this.usedOptions.find(
      (usage) => usage.page === this.activePage.page
    );
    if (pageUsage) {
      // If the page already has used options tracked, push the new optionIndex
      pageUsage.optionIndexes.push(optionIndex);
    } else {
      // If it's the first time an option on this page is used, add a new entry
      this.usedOptions.push({
        page: this.activePage.page,
        optionIndexes: [optionIndex],
      });
    }
  }

  getOptionUsage(optionIndex) {
    const pageUsage = this.usedOptions.find(
      (usage) => usage.page === this.activePage.page
    );
    if (!pageUsage) return 0; // If no usage found for the page, return 0
    return pageUsage.optionIndexes.filter((index) => index === optionIndex)
      .length;
  }

  findStat = (statId) => {
    return this.stats.find((stat) => stat.id === statId);
  };

  findItem = (itemId) => {
    return this.items.find((item) => item.id === itemId);
  };

  setActivePage = (page) => {
    const newPage = this.pages.find((p) => p.page === page);
    if (newPage) {
      runInAction(() => {
        this.activePage = newPage;
      });
    } else {
      console.log("Page not found");
    }
  };

  updateStat = (gain_stat) => {
    const statId = Object.keys(gain_stat)[0];
    const statIndex = this.stats.findIndex(
      (stat) => stat.id === parseInt(statId)
    );
    if (statIndex !== -1) {
      runInAction(() => {
        this.stats[statIndex].value += gain_stat[statId];
      });
    }
  };

  addItemToInventory = (gain_item) => {
    const itemToAdd = this.items.find((item) => item.id === gain_item);
    if (itemToAdd) {
      runInAction(() => {
        this.inventory.push(itemToAdd);
      });
    }
  };

  handleOptionClick = (option, optionIndex) => {
    const usageCount = this.getOptionUsage(optionIndex);
    if (option.uses && usageCount >= option.uses) {
      console.log("This option has been used the maximum number of times.");
      return;
    }

    if (option.uses) {
      this.useOption(optionIndex);
    }

    if (option.page) {
      this.setActivePage(option.page);
    }

    if (option.gain_stat) {
      this.updateStat(option.gain_stat);
    }

    if (option.gain_item) {
      this.addItemToInventory(option.gain_item);
    }
  };

  hasItem(itemId) {
    return this.inventory.some((item) => item.id === itemId);
  }

  meetsStatCondition(statCondition) {
    const [statId, operator, value] = statCondition;
    const stat = this.stats.find((stat) => stat.id === statId);

    if (!stat) return false; // Stat not found

    switch (operator) {
      case "<":
        return stat.value < value;
      case ">":
        return stat.value > value;
      case "=":
        return stat.value === value;
      default:
        console.error("Invalid operator", operator);
        return false; // Invalid operator
    }
  }

  isOptionUnlocked = (conditions) => {
    return conditions.every((condition) => {
      if (condition.item) {
        return this.hasItem(condition.item);
      }

      if (condition.stat) {
        return this.meetsStatCondition(condition.stat);
      }

      // Assuming every condition has either an item or stat check,
      // but adding a default true in case a new type of condition without checks is added.
      return true;
    });
  };

  // isOptionUnlocked = (conditions) => {
  //   for (let condition of conditions) {
  //     if (condition.item) {
  //       const hasItem = this.inventory.some(
  //         (item) => item.id === condition.item
  //       );
  //       if (!hasItem) return false;
  //     }

  //     if (condition.stat) {
  //       const [statId, operator, value] = condition.stat;
  //       const stat = this.stats.find((stat) => stat.id === statId);
  //       if (!stat) continue;

  //       switch (operator) {
  //         case "<":
  //           if (!(stat.value < value)) return false;
  //           break;
  //         case ">":
  //           if (!(stat.value > value)) return false;
  //           break;
  //         case "=":
  //           if (!(stat.value === value)) return false;
  //           break;
  //         default:
  //           console.error("Invalid operator", operator);
  //           return false;
  //       }
  //     }
  //   }

  //   return true;
  // };
}

const MobxStore = new Store();
export default MobxStore;
