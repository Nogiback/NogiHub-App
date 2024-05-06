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
  _id: string;
  author: {
    _id: string;
    username: string;
    displayName: string;
    profilePic: string;
  };
  content: string;
  image: string;
  likes: [string];
  comments: [Comment];
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  _id: string;
  author: {
    _id: string;
    username: string;
    displayName: string;
    profilePic: string;
  };
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginFormData = {
  username: string;
  password: string;
};

export type SignupFormData = {
  email: string;
  username: string;
  location: string;
  bio: string;
  password: string;
  confirmPassword: string;
};
