class User < ApplicationRecord
  has_many :game_users, dependent: :destroy
  has_many :games, -> { distinct }, through: :game_users

  has_secure_password
end
