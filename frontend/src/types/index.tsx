export type VoteButtonProps = {
  children: string;
}

export type UserVoteComponentProps = {
  name: string;
  vote: string;
}

export type IUser = {
  id: string;
  name: string;
  vote?: string;
  room: string;
}

export type CreateRoomInput = {
  roomName: string;
  votingSystem: string;
  isPrivate: boolean;
  password?: string;
}