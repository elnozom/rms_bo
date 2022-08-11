import Form from "@/utils/form/form";
import { FormInterface } from "@/types";
import { Name, DateFrom, DateTo } from "../globalFilters";
import Input from "@/utils/form/inputs/Input";
const inputs: Input[] = [
  new Input(Name),
  new Input(DateFrom),
  new Input(DateTo),
];
const params: FormInterface = {
  inputs,
};

const rolesFilters = new Form(params);

export default rolesFilters;
