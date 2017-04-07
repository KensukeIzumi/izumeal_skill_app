class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :check_user_session
  include SessionsHelper
end
