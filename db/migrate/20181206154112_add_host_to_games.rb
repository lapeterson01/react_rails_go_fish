class AddHostToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :host, :integer
  end
end
