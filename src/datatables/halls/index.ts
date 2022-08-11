import { HeaderInterface } from "@/types";
import { DatatableIntetrface }  from "@/types";
import TextHeader from "@/utils/table/header/textHeader";
import ActionsHeader from "@/utils/table/header/actions/actionsHeader.ts";
import dateHeader from "@/utils/table/header/dateHeader.ts";
import Datatable from "@/utils/table/table";
import filters from "./filters";
const headers: HeaderInterface[] = [
  new TextHeader("name"),
  new TextHeader("start table"),
  new dateHeader("created at"),
  new ActionsHeader("categories", { edit: true, delete: true }),
];
const url = "group/hierarchy?lang=en";
const params: DatatableIntetrface = {
  title: "Halls",
  headers,
  description: "categories_desc",
  searchable: true,
  url,
  filters,
 
 
  
};

const datatable = new Datatable(params);
export default datatable;
