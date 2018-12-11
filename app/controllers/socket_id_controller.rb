class SocketIdController < ApplicationController
  skip_before_action :clear_session_if_quit, only: %i[socket_id]
  skip_before_action :verify_authenticity_token, only: %i[socket_id]

  def socket_id
    session[:socket_id] = params[:socket_id]
  end
end
