import { Candidate_Job_Apply } from "./Candidate_Job_Apply";

export class Schedule_Interview
{
Job_Posting_Id:number;
Job_Title:string;
User_Id:number;
// Interview_Schedule_Details:Candidate_Job_Apply[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

