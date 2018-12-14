import PlayingCard from 'models/PlayingCard'

describe('PlayingCard', () => {
  let cardJson, card

  beforeEach(() => {
    cardJson = {
      rank: 'A',
      suit: 'S'
    }
    card = new PlayingCard(cardJson)
  })

  describe('#constructor', () => {
    it('has a rank and suit', () => {
      expect(card.rank()).toEqual(cardJson.rank)
      expect(card.suit()).toEqual(cardJson.suit)
    })
  })

  describe('#toString', () => {
    it('returns the card in string form', () => {
      expect(card.toString()).toEqual(`${cardJson.suit.toLowerCase()}${cardJson.rank.toLowerCase()}`)
    })
  })
})
