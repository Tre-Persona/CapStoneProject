class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  validates_presence_of   :avatar
  validates_integrity_of  :avatar
  validates_processing_of :avatar
  has_many :comments
  has_many :favorites
  has_many :questionnaires
end
