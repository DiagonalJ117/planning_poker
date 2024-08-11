class RoomController < ApplicationController
  def index
    @rooms = Room.all
  end

  def create
    @room = Room.new(name: params[:name])
    @room.save
    redirect_to room_index_path
  end

  def update
    @room = Room.find(params[:id])
    @room.update(name: params[:name])
    redirect_to room_index_path
  end

  def show
    @room = Room.find(params[:id])
  end

  def destroy
    @room = Room.find(params[:id])
    @room.destroy
    redirect_to room_index_path
  end
end
