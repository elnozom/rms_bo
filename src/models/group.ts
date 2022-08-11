
export type groupsHierarchyResponse  = {
    groupCode:number
    name:string
    groupName:string
    groupNameEn:string
    parentCode:string
    code:string
    level:number
    childrenLength:number
    children:groupsHierarchyResponse[]
}

