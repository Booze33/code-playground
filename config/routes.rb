Rails.application.routes.draw do
  resources :user_codes
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    sessions: 'devise_token_auth/sessions'
  }

  delete '/auth/sign_out', to: 'application#logout'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
