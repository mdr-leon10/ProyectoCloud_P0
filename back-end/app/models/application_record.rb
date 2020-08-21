class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  before_create -> { self.id = SecureRandom.uuid }
end
