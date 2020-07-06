class Badge < ApplicationRecord
  belongs_to :user
  validates :level, presence: true
  validates :level, :uniqueness => { :scope => :user_id }
end
