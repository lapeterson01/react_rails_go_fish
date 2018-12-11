class SocketIdController < ApplicationController
  skip_before_action :clear_session_if_quit, :verify_authenticity_token, :require_authentication

  def socket_id
    session[:socket_id] = params[:socket_id]
  end
end
