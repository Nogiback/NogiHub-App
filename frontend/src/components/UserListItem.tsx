import React from 'react';
import { User } from '../types/types';

type Props = {
  follower: User;
};

export default function UserListItem({ follower }: Props) {
  return <div>{follower._id}</div>;
}
