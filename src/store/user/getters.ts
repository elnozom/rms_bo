import { GetterTree } from "vuex";
import { UserState } from "./types";
import { RootState } from "../types";
import user from "@/models/user";

export const getters: GetterTree<UserState, RootState> = {
  loading(state): boolean {
    return state.loading;
  },
  user(state): user | null {
    return state.user;
  },
};
