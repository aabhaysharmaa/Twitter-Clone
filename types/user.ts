/* eslint-disable @typescript-eslint/no-explicit-any */
// types/index.ts
export interface User {
  id: string;
  name?: string;
  username?: string;
  bio?: string;
  email: string;
  image?: string;
  coverImage?: string;
  profileImage?: string;
  createdAt: string; // store as ISO string from backend
  updatedAt: string;
  followingIds?: string[];
  followerIds?: string[];
  hasNotifications?: boolean;
  posts?: any[]; // optional, can define Post type if needed
  comment?: any[]; // optional
  notifications?: any[]; // optional
}
