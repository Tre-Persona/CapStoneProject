class Comment < ApplicationRecord
  belongs_to :user
  validates :post, :trail_id, :user_name, :trail_name, :avatar, presence: true
end
