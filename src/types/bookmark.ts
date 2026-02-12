export interface Bookmark {
  id: string;
  user_id: string;
  title: string;
  url: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  avatar_url?: string;
  full_name?: string;
}
