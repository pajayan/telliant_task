export interface ITableData {
    txdate: string;
    th: string;
    surface: string;
    code: string;
    procedure: string;
    plantype: string;
    visit : number;
    status: string;
    provider: string;
    office: string;
    dos: string;
}
export interface IFilterData {
        statusArr : Array<string>;
        thValue: string;
}
