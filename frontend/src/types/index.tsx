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