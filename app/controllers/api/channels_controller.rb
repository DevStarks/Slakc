class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    @channel.users << current_user
    if @channel.save
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy
    render :show
  end

  def count
    render json: Channel.count
  end

  def search
    @channels = Channel.where("channels.name LIKE ?", "%#{params[:search_data]}%")
      .select("channels.*, count(users.id) as user_count")
      .joins(:users)
      .group("channels.id")
    render :index
  end

  def connect
    @channel = Channel.find(params[:channel_id])
    @channel.users << current_user
    render :show
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :purpose)
  end
end
