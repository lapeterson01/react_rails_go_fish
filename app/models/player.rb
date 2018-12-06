class Player
  attr_reader :id

  def initialize(user, books = [])
    @id = user.id
    @name = user.name
    @hand = {}
    @books = books
  end
end
