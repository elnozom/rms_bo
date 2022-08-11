import store from "@/store";
import { dialogModel } from "./dialogbar";
export const openDialog = (Title: string, Msg: string) => {
  store.commit("ui/stopDialog");
  let dialog: dialogModel = {
    Active: true,
    Title,
    Msg,
  };
  store.commit("ui/setDialog", dialog);
};

export const closeSnack = (Title: string, Msg: string) => {
  store.commit("ui/stopDialog");
};
