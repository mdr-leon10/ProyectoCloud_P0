Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #config/routes.rb
  namespace :api do

    post '/api-auth', to: 'authentication#authenticate'
    post '/create-user', to: 'user#signup'
    post '/events', to: 'events#post_event'

    get '/events/(/:id)', to: 'events#get_events'
    get '/events/(/:id)', to: 'events#get_event'

    put '/events/(/:id)', to: 'events#put_event'

    delete '/events/(/:id)', to: 'events#delete_event'

  end
  
end
