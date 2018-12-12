class Opponent {
  constructor(json) {
    this._id = json.id
    this._name = json.name
    this._handCount = json.handCount
    this._books = json.books
  }

  id() {
    return this._id
  }

  name() {
    return this._name
  }

  handCount() {
    return this._handCount
  }

  books() {
    return this._books
  }
}

export default Opponent
