import Hand from 'models/Hand'
import PlayingCard from 'models/PlayingCard'

describe('Hand', () => {
  let handJson, handArray, hand

  beforeEach(() => {
    handJson = [
      { rank: 'A', suit: 'S' },
      { rank: 'A', suit: 'H' },
      { rank: '2', suit: 'C' }
    ]
    handArray = [
      new PlayingCard({ rank: 'A', suit: 'S' }),
      new PlayingCard({ rank: 'A', suit: 'H' }),
      new PlayingCard({ rank: '2', suit: 'C' })
    ]
    hand = new Hand(handJson)
  })

  describe('#cards', () => {
    it('returns the cards in hand', () => {
      expect(hand.cards()).toEqual(handArray)
    })
  })

  describe('#count', () => {
    it('returns the length of the hand', () => {
      expect(hand.count()).toEqual(3)
    })
  })

  describe('#asObject', () => {
    it('returns an object of the hand sorted by rank', () => {
      const handObject = {
        A: [
          new PlayingCard({ rank: 'A', suit: 'S' }),
          new PlayingCard({ rank: 'A', suit: 'H' })
        ],
        2: [new PlayingCard({ rank: '2', suit: 'C' })]
      }
      expect(hand.asObject()).toEqual(handObject)
    })
  })
})
