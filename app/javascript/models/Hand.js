import PlayingCard from './PlayingCard'

class Hand {
  constructor(cards) {
    this._cards = cards.map((card) => PlayingCard.fromJson(card))
  }

  cards() {
    return this._cards
  }

  count() {
    return this.cards().length
  }

  asObject() {
    return this.cards().reduce((obj, item) => {
      if (!obj[item.rank()]) obj[item.rank()] = [];
      obj[item.rank()].push(item);
      return obj
    }, {})
  }
}

export default Hand
