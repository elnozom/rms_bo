import Input from "@/utils/form/inputs/Input";
import Form from "@/utils/form/form";
import { FormInterface } from "@/types";
import { name, startTable, countTable } from "./inputs";

const inputs: Input[] = [
  new Input(name),
  new Input(startTable),
  new Input(countTable),
];

const params: FormInterface = {
  inputs,
};

const categoryForm = new Form(params);

export default categoryForm;
