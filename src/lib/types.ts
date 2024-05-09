import { SessionOptions } from "iron-session";
export interface SessionData {
  userId?: string;
  image?: string;
  username?: string;
  email?: string;
  role?: string;
  isLogedIn: boolean;
}

export const defaultSession: SessionData = {
  isLogedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "user-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
