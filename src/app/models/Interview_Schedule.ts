export class Interview_Schedule
{
// Batch_Id:number;
// Batch_Name:string;
// User_Id:number;
// Start_Date:Date;
// End_Date:Date;
// BatchFollowUp:boolean;

Interview_Schedule_Date:string;
Applied_jobs :string;
Interview_Schedule_Description :string;
Login_User:number;
Student_Id:string;
Job_Id:number;

Interview_Location :string; 
Interview_Time :string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

