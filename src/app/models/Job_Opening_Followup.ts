
export class Job_Opening_Followup
{
    
    Job_Opening_Followup_Id :number; 
    Job_Opening_Id :number; 
    Next_Followup_Date :Date; 
    Entry_Date :Date; 
    Employee_Status_Id :number; 
    Employee_Status_Name :string; 
    To_Staff_Id :number; 
    To_Staff_Name :string; 
    Remark :string; 
    By_User_Id:number; 
    By_User_Name:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

