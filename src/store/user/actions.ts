import { ActionTree } from "vuex";
// import axios from 'axios';
import { UserState } from "./types";
import { RootState } from "../types";

export const actions: ActionTree<UserState, RootState> = {
  fetchData(): any {
    console.log("asdasd");
  },
};
