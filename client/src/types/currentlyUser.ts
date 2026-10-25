export type User = {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
};

export type responseUser = { info_user: User };
