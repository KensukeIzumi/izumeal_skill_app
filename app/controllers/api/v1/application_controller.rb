module Api
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :expception
    skip_before_filter :verify_authenticity_token
  end
end
