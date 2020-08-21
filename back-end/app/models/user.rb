class User < ApplicationRecord
    has_many :events
    has_secure_password
    validates :email, uniqueness: {message: 'User with this email already exists'}
end
