import user from "@/models/user";

export interface UserState {
  loading: boolean;
  user: user | null;
}
