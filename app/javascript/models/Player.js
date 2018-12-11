import Hand from './Hand'
import PlayingCard from './PlayingCard'

class Player {
  static fromJson(jsonPlayer) {
    let id, name, hand, books
    ({ id, name, hand, books } = jsonPlayer)
    return new this(id, name, hand, books)
  }

  constructor(id, name, hand, books) {
    this._id = id
    this._name = name
    this._hand = new Hand(hand)
    this._books = books
  }

  name() {
    return this._name
  }

  handKlass() {
    return this._hand
  }

  hand() {
    return this.handKlass().cards()
  }

  books() {
    return this._books
  }

  handCount() {
    return this.hand().length
  }

  booksCount() {
    return this.books().length
  }

  handAsObject() {
    this.hand().reduce((obj, item) => {
      if (!obj[item.rank()]) obj[item.rank()] = [];
      obj[item.rank()].push(item);
      return obj
    }, {})
  }
}

export default Player
