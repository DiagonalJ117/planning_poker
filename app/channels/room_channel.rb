class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_${params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast "room_#{params[:room_id]}", message: data['message']
  end
end
