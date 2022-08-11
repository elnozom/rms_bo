import { HeaderInterface } from "@/types";
import { DatatableIntetrface }  from "@/types";
import TextHeader from "@/utils/table/header/textHeader";
import ImgHeader from "@/utils/table/header/imgHeader";
import PriceHeader from "@/utils/table/header/priceHeader";
import DateHeader from "@/utils/table/header/dateHeader.ts";
import ActionsHeader from "@/utils/table/header/actions/actionsHeader.ts";
import Datatable from "@/utils/table/table";
import filters from "./filters";
const headers: HeaderInterface[] = [
  new TextHeader("name"),
  new ImgHeader("img"),
  new TextHeader("category"),
  new PriceHeader("price"),
  new TextHeader("estimated time"),
  new DateHeader("created at"),
  new ActionsHeader("categories", { edit: true, delete: true }),
];
const url = "group/hierarchy?lang=en";
const params: DatatableIntetrface = {
  title: "Tables",
  headers,
  description: "categories_desc",
  searchable: true,
  url,
  filters,
 
 
  
};

const datatable = new Datatable(params);
export default datatable;
