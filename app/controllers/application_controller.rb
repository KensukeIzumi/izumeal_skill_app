class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :check_user_session
  include SessionsHelper
end
