export type User = {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  location: string;
  profilePic: string;
  bio: string;
  followers: [string];
  following: [string];
  createdAt: Date;
  updatedAt: Date;
};

export type AuthUser = {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  location: string;
  profilePic: string;
  bio: string;
  message: string;
};

export type Post = {
  author: {
    _id: string;
    username: string;
    displayName: string;
  };
  content: string;
  image: string;
  likes: [string];
  comments: [string];
  createdAt: Date;
  updatedAt: Date;
};
