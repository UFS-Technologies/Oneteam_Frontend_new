import { Job_Posting } from "./Job_Posting";
export class Job_Posting_Array
{
    Job_Posting_Array_Id:number;
    Job_Posting_Array_Name:string;
    Jobposting_Report_AppliedcountdetailsData:Job_Posting[];
    select_all_value:boolean;

Check_Data:boolean;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

