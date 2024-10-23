export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignInData = {
  jwt: {
    accessToken: string;
    refreshToken: string;
  };
};

export type SignUpData = {
  [key: string]: string | File | null;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
