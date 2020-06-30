class Favorite < ApplicationRecord
  belongs_to :user
  validates :fav_trail_id, presence: true
  validates :fav_trail_id, :uniqueness => { :scope => :user_id }
end
