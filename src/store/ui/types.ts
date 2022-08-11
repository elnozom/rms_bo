import { snackBarModel } from "@/utils/snack/snackbar.model";
import { dialogModel } from "@/utils/dialog/dialogbar";
export interface UiState {
  loading: boolean;
  dialog: dialogModel;
  snackBar: snackBarModel;
  respondModal: boolean;
  respondModalUserId: number;
}
