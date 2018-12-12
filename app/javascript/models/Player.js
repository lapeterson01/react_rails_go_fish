import Hand from './Hand'
import PlayingCard from './PlayingCard'

class Player {
  constructor(json) {
    this._id = json.id
    this._name = json.name
    this._hand = new Hand(json.hand)
    this._books = json.books
  }

  name() {
    return this._name
  }

  hand() {
    return this._hand
  }

  books() {
    return this._books
  }

  handCount() {
    return this.hand().count()
  }

  booksCount() {
    return this.books().length
  }

  handAsObject() {
    this.hand().asObject()
  }
}

export default Player
