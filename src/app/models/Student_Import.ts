import { Student_Import_Details } from './Student_Import_Details';
export class Student_Import
{
    By_User_Id:number;
    By_User_Name:string;
    Branch:number
    Department:number
    Status:number
    Status_Name:String
    To_User:number
    To_User_Name:string
    Enquiry_Source:number
    Enquiry_Source_Name:string
    Next_FollowUp_Date:Date
    Status_FollowUp:boolean;
    Remark:string
    
  


    Student_Import_Details: Student_Import_Details[];
    constructor(values: Object = {})  
        {
          Object.assign(this, values) 
        }
}

