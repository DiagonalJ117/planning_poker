class RoomChannel < ApplicationCable::Channel

  @@rooms = {}

  def subscribed
    room_id = params[:room_id]
    stream_from "room_#{params[:room_id]}"

    @@rooms[room_id] ||= { users: [], votes: []}
    @@rooms[room_id][:users] << current_user.id
  end

  def unsubscribed
    room_id = params[:room_id]
    @@rooms[room_id][:users].delete(current_user.id)
  end

  def estimate(data)
    Vote.create!(value: data['value'], user_id: data['user_id'], room_id: params[:room_id])
    ActionCable.server.broadcast("room_#{params[:room_id]}", data)
  end

  def receive(data)
    room_id = params[:room_id]
    case data['type']
    when 'vote'
      vote = { user_id: current_user.id, vote: data['vote'] }
      @@rooms[room_id][:votes] << vote
      ActionCable.server.broadcast "room_#{room_id}", vote: vote
    end
  end

  private

  def current_user
    User.find(params[:user_id])
  end

  def speak(data)
    ActionCable.server.broadcast "room_#{params[:room_id]}", message: data['message']
  end
end
